import { type TeamInteractionStateLogEntry } from "../../../lib/api/frontend_contract";
import { type RedisClient } from "../../api/redis";
import { fixTimestamp } from "../../utils/fixTimestamp";
import { type ExternalInteractionNode } from "./client-types";
import { type BoardwalkInteractionState } from "./interview_at_the_boardwalk/graph";
import {
  type InteractionGraph,
  type InteractionGraphNode,
  type InteractionGraphNodeChoice,
  isChoiceNode,
  isNextNode,
  isPluginNode,
  isTerminalNode,
  type InteractionCharacterState,
} from "./types";

// TODO: extract tallyResults to some sort of generic election handler?
type VoteResultEntry = {
  choice: string;
  votes: number;
};
export type VoteResults = {
  rankedOptions: VoteResultEntry[];
  winner?: string;
};
export type VoteCounts = Partial<Record<string, number>>;

export function countVotes(votes: Record<string, string>): VoteCounts {
  const results: VoteCounts = {};
  Object.entries(votes).forEach(([_sess_id, choice]) => {
    results[choice] = (results[choice] ?? 0) + 1;
  });
  return results;
}

// Returns an object containing:
// * the entry in validOptions that won
// * the vote counts of each validOption, sorted high-to-low
export function tallyResults(
  votes: VoteCounts,
  validOptions: string[],
): VoteResults {
  // TODO: maybe randomize tiebreaks?  I guess the given order is maybe ~random?
  const validOptionScores = validOptions
    .map((choice) => {
      return {
        choice,
        votes: votes[choice] ?? 0,
      };
    })
    .toSorted((a, b) => {
      return b.votes - a.votes;
    });

  return {
    rankedOptions: validOptionScores,
    winner: validOptionScores[0]?.choice,
  };
}

function indexedNodes<
  T extends object,
  R,
  S extends string,
  BG extends string,
  P,
>(
  graph: InteractionGraph<T, R, S, BG, P>,
): Record<string, InteractionGraphNode<T, R, S, BG, P>> {
  return Object.fromEntries(
    graph.nodes.map((node) => {
      return [node.id, node];
    }),
  );
}

type StartState<T> = {
  node: string;
  state: T;
};

type Next<T, R, S, BG, P> = {
  nextNode: InteractionGraphNode<T, R, S, BG, P>;
  nextState: T;
  previousVoteResult?: VoteResults;
};

export class VirtualInteractionHandler<
  T extends object,
  R,
  S extends string,
  BG extends string,
  P,
> {
  private name: string;
  private graph: InteractionGraph<T, R, S, BG, P>;
  private indexedNodes: Record<string, InteractionGraphNode<T, R, S, BG, P>>;
  constructor(name: string, graph: InteractionGraph<T, R, S, BG, P>) {
    this.name = name;
    this.graph = graph;
    this.indexedNodes = indexedNodes(graph);
  }

  public format(
    entry: TeamInteractionStateLogEntry,
  ): ExternalInteractionNode | undefined {
    const graphNode = this.indexedNodes[entry.node];
    if (!graphNode) return undefined;
    const ts = fixTimestamp(entry.timestamp);

    const speaker = this.graph.speaker_states[graphNode.speaker];
    const overlay = graphNode.overlay
      ? this.graph.bg_states[graphNode.overlay]
      : undefined;

    const partial: ExternalInteractionNode = {
      id: entry.id,
      ts: ts.getTime(), // When the node was entered
      node: graphNode.id,
      speaker: speaker.label,
      speakerImage: speaker.image,
      text: graphNode.text,
      textBubbleType: graphNode.textBubbleType,
      textEffect: graphNode.textEffect,
      sound: graphNode.sound.mp3, // We always use mp3 for browsers
      timeout_msec: graphNode.timeout_msec,
      background: this.graph.background,
      backgroundOverlay: overlay,
    };

    const data = entry.graph_state as T;

    if (isChoiceNode(graphNode)) {
      let choiceValues: InteractionGraphNodeChoice<T>[] = [];
      if (typeof graphNode.choices === "function") {
        choiceValues = graphNode.choices(data);
      } else {
        choiceValues = graphNode.choices;
      }
      partial.choices = choiceValues.map((choice) => {
        return {
          key: choice.next as string,
          text: choice.text,
          textEffect: choice.textEffect,
        };
      });
    } else if (isPluginNode(graphNode)) {
      partial.plugin = graphNode.plugin as string;
    } else if (isTerminalNode(graphNode)) {
      partial.result = graphNode.finalState(data) as string;
    }
    return partial;
  }

  public startState(): StartState<T> {
    return {
      node: this.graph.starting_node,
      state: this.graph.starting_state,
    };
  }

  public lookupNode(
    nodeId: string,
  ): InteractionGraphNode<T, R, S, BG, P> | undefined {
    return this.indexedNodes[nodeId];
  }

  public advanceAfterTime(
    nodeId: string,
    startedAt: number,
  ): number | undefined {
    const graphNode = this.indexedNodes[nodeId];
    if (!graphNode) return undefined;
    return startedAt + graphNode.timeout_msec;
  }

  public electionKey(
    teamId: number,
    node: InteractionGraphNode<T, R, S, BG, P>,
  ): string {
    return `/team/${teamId}/polls/${this.name}/${node.id}`;
  }

  public async voteCountsForNode(
    teamId: number,
    currentNode: InteractionGraphNode<T, R, S, BG, P>,
    redisClient: RedisClient,
  ): Promise<VoteCounts | undefined> {
    // Valid options may be limited by the current state, but we're trying to

    // Tally the votes in redis, pick the winner, and
    const redisKey = this.electionKey(teamId, currentNode);
    const votes = await redisClient.hGetAll(redisKey);
    const results = countVotes(votes);
    return results;
  }

  public async computeNext({
    teamId,
    currentNode,
    state,
    redisClient,
    maybeVoteCounts,
  }: {
    teamId: number;
    currentNode: InteractionGraphNode<T, R, S, BG, P>;
    state: T;
    redisClient: RedisClient;
    maybeVoteCounts?: VoteCounts;
  }): Promise<Next<T, R, S, BG, P> | undefined> {
    if (isNextNode(currentNode)) {
      let next = currentNode.next;
      if (typeof next === "function") {
        next = next(state);
      }
      const nextNode = this.lookupNode(next);
      if (nextNode) {
        return {
          nextNode,
          nextState: state,
        };
      } else {
        return undefined;
      }
    } else if (isChoiceNode(currentNode)) {
      let voteCounts = maybeVoteCounts;
      if (!voteCounts) {
        const redisKey = this.electionKey(teamId, currentNode);
        const votes = await redisClient.hGetAll(redisKey);
        voteCounts = countVotes(votes);
      }

      let choices = currentNode.choices;
      if (typeof choices === "function") {
        choices = choices(state);
      }
      const nextStateCandidates = Object.fromEntries(
        choices.map((choice) => {
          let key = choice.next;
          if (typeof key === "function") {
            key = key(state);
          }
          const candidateState = choice.stateEffect?.(state);
          return [key, candidateState ?? state];
        }),
      );
      const choiceKeys = Object.keys(nextStateCandidates);
      if (choiceKeys.length === 0) {
        console.error(
          `No valid choice options for interaction ${this.name} node ${currentNode.id} at state ${JSON.stringify(state)}`,
        );
        return undefined;
      }
      const voteResults = tallyResults(voteCounts, choiceKeys);
      if (voteResults.winner === undefined) {
        // Should be unreachable if choiceKeys was not empty
        return undefined;
      }

      const nextNode = this.lookupNode(voteResults.winner);
      if (nextNode === undefined) {
        console.error(
          `Winning vote ${voteResults.winner} for team ${teamId} node ${currentNode.id} was not a node known to graph ${this.name}`,
        );
        return undefined;
      }
      const nextState = nextStateCandidates[voteResults.winner];
      if (!nextState) {
        console.error(
          `Winning vote ${voteResults.winner} for team ${teamId} node ${currentNode.id} computed no next state`,
        );
        return undefined;
      }

      return {
        nextNode,
        nextState,
        // TODO: return full election results for archival?
      };
    } else if (isTerminalNode(currentNode)) {
      // Shouldn't be looking for a next node if this is a terminal node
      return undefined;
    } else if (isPluginNode(currentNode)) {
      // The contract with plugins (limited to BoardwalkInteractionGraph right now) is noted in the BoardwalkInteractionGraph:
      //   Each of these plugin nodes should update state.wins based on the outcome of the game and
      //   navigate to one of "first-win", "first-loss", "second-win", "second-loss", "third-win",
      //   or "third-loss" accordingly.
      let voteCounts = maybeVoteCounts;
      if (!voteCounts) {
        const redisKey = this.electionKey(teamId, currentNode);
        const votes = await redisClient.hGetAll(redisKey);
        voteCounts = countVotes(votes);
      }

      const choices = ["lose", "win"];
      const voteResults = tallyResults(voteCounts, choices);
      if (voteResults.winner === undefined) {
        // Should be unreachable if choiceKeys was not empty
        return undefined;
      }

      const success = voteResults.winner === "win";
      const boardwalkPluginState = state as BoardwalkInteractionState;
      const played =
        (boardwalkPluginState.played_lucky_duck ? 1 : 0) +
        (boardwalkPluginState.played_pop_the_balloon ? 1 : 0) +
        (boardwalkPluginState.played_skeeball ? 1 : 0);
      const nextState = {
        ...boardwalkPluginState,
        wins: boardwalkPluginState.wins + (success ? 1 : 0),
      };
      const wins = nextState.wins;
      const losses = played - wins;
      let nextNodeId: string | undefined;
      if (success) {
        nextNodeId = ["first-win", "second-win", "third-win"][wins - 1];
      } else {
        nextNodeId = ["first-loss", "second-loss", "third-loss"][losses - 1];
      }
      if (nextNodeId === undefined) {
        // should never happen
        return undefined;
      }

      const nextNode = this.lookupNode(nextNodeId);
      if (nextNode === undefined) {
        // Should also never happen
        return undefined;
      }
      return {
        nextNode,
        nextState,
      } as Next<T, R, S, BG, P>;
    }
    return undefined;
  }

  public finalState({
    nodeId,
    state,
  }: {
    nodeId: string;
    state: T;
  }): R | undefined {
    const node = this.lookupNode(nodeId);
    if (node && isTerminalNode(node)) {
      return node.finalState(state);
    }
    return undefined;
  }

  public forceGenerateFinalState(): R {
    const terminus = this.graph.nodes.find((node) => isTerminalNode(node));
    if (terminus === undefined) {
      throw new Error(
        `No terminal node found in graph ${this.name} to generate final state`,
      );
    }
    const state = this.finalState({
      nodeId: terminus.id,
      state: this.graph.starting_state,
    });
    if (!state) {
      throw new Error(
        `No final state generated for graph ${this.name} from terminal node ${terminus.id}`,
      );
    }
    return state;
  }

  public getPreloadImages(): string[] {
    const images: string[] = [];

    for (const [_, value] of Object.entries(this.graph.bg_states)) {
      images.push(value as string);
    }
    for (const [_, value] of Object.entries(this.graph.speaker_states)) {
      images.push((value as InteractionCharacterState).image);
    }

    return images;
  }
}

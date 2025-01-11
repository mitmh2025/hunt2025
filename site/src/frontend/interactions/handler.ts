import { type TeamInteractionStateLogEntry } from "../../../lib/api/frontend_contract";
import { type ExternalInteractionNode } from "./client-types";
import {
  type InteractionGraph,
  type InteractionGraphNode,
  type InteractionGraphNodeChoice,
  isChoiceNode,
  isPluginNode,
  isTerminalNode,
} from "./types";

function indexedNodes<T, R, S extends string, P>(graph: InteractionGraph<T, R, S, P>): Record<string, InteractionGraphNode<T, R, S, P>> {
  return Object.fromEntries(graph.nodes.map((node) => {
    return [node.id, node];
  }));
}

export class VirtualInteractionHandler<T, R, S extends string, P> {
  private graph: InteractionGraph<T, R, S, P>;
  private indexedNodes: Record<string, InteractionGraphNode<T, R, S, P>>;
  constructor(graph: InteractionGraph<T, R, S, P>) {
    this.graph = graph;
    this.indexedNodes = indexedNodes(graph);
  }

  public format(entry: TeamInteractionStateLogEntry): ExternalInteractionNode | undefined {
    const graphNode = this.indexedNodes[entry.node];
    if (!graphNode) return undefined;
    const partial: ExternalInteractionNode = {
      id: entry.id,
      ts: entry.timestamp.getTime(), // When the node was entered
      node: graphNode.id,
      speaker: graphNode.speaker,
      text: graphNode.text,
      textBubbleType: graphNode.textBubbleType,
      textEffect: graphNode.textEffect,
      sound: graphNode.sound.mp3, // We always use mp3 for browsers
      timeout_msec: graphNode.timeout_msec,
      overlay: graphNode.overlay,
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
        }
      });
    } else if (isPluginNode(graphNode)) {
      partial.plugin = graphNode.plugin as string;
    } else if (isTerminalNode(graphNode)) {
      partial.result = graphNode.finalState(data) as string;
    }
    return partial;
  }
}

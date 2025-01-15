import { test } from "@jest/globals";
import ArtGalleryInteractionGraph from "./interview_at_the_art_gallery/graph";
import BoardwalkInteractionGraph, {
  type BoardwalkInteractionState,
} from "./interview_at_the_boardwalk/graph";
import CasinoInteractionGraph from "./interview_at_the_casino/graph";
import JewelryStoreInteractionGraph from "./interview_at_the_jewelry_store/graph";
import {
  type InteractionGraph,
  type InteractionGraphNode,
  type NodeId,
  isNextNode,
  isChoiceNode,
  isPluginNode,
  isTerminalNode,
} from "./types";

function checkAllNodeIdsUnique<T extends object, R, S extends string, P>(
  graph: InteractionGraph<T, R, S, P>,
) {
  const seen = new Map<
    string,
    { node: InteractionGraphNode<T, R, S, P>; position: number }
  >();
  const errors: string[] = [];
  graph.nodes.forEach((node, i) => {
    const previouslySeen = seen.get(node.id);
    if (previouslySeen) {
      errors.push(
        `Duplicate node id ${node.id} at position ${i} (first seen at position ${previouslySeen.position} in nodes array)`,
      );
    } else {
      seen.set(node.id, { node, position: i });
    }
  });
  if (errors.length > 0) {
    throw new Error(
      `${errors.length} error${errors.length > 1 ? "s" : ""}:\n${errors.join("\n")}`,
    );
  }
}

function checkStartingNodePresent<T extends object, R, S extends string, P>(
  graph: InteractionGraph<T, R, S, P>,
  indexedNodes: Map<string, InteractionGraphNode<T, R, S, P>>,
) {
  if (!indexedNodes.has(graph.starting_node)) {
    throw new Error(
      `Starting node "${graph.starting_node}" not found in nodes`,
    );
  }
}

type ExecutionState<T extends object> = {
  current: NodeId;
  state: T;
  path: NodeId[];
};

type Path<R> = {
  path: NodeId[];
  result: R;
};

function allPaths<T extends object, R, S extends string, P>(
  graph: InteractionGraph<T, R, S, P>,
  indexedNodes: Map<string, InteractionGraphNode<T, R, S, P>>,
): Path<R>[] {
  const start = {
    current: graph.starting_node,
    state: graph.starting_state,
    path: [],
  };
  const paths: Path<R>[] = [];
  const queue: ExecutionState<T>[] = [start];
  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) {
      throw new Error("nothing left in the queue");
    }
    const { current, state, path } = item;
    // console.log("trace", path.join(" -- "));
    const currentNode = indexedNodes.get(current);
    if (!currentNode) {
      throw new Error(
        `cannot find referenced node "${current}" (execution state: ${JSON.stringify(item)}`,
      );
    }
    if (isNextNode(currentNode)) {
      const next =
        typeof currentNode.next === "string"
          ? currentNode.next
          : currentNode.next(state);
      // Then visit that node
      queue.push({
        current: next,
        state,
        path: [...path, current],
      });
    } else if (isChoiceNode(currentNode)) {
      const choices =
        typeof currentNode.choices === "function"
          ? currentNode.choices(state)
          : currentNode.choices;
      if (choices.length === 0) {
        throw new Error(`node ${current} provides zero options in choices`);
      }
      choices.forEach((choice) => {
        const next =
          typeof choice.next === "string" ? choice.next : choice.next(state);
        const nextState =
          choice.stateEffect !== undefined ? choice.stateEffect(state) : state;
        queue.push({
          current: next,
          state: nextState,
          path: [...path, current],
        });
      });
    } else if (isTerminalNode(currentNode)) {
      paths.push({
        path: [...path, current],
        result: currentNode.finalState(state),
      });
    } else if (isPluginNode(currentNode)) {
      // A pseudo implementation of what the plugin nodes are expected to do,
      // which is (maybe) increment state.wins and then jump to the
      // appropriate node for the Nth win or loss
      const biState = state as BoardwalkInteractionState;
      const played =
        (biState.played_skeeball ? 1 : 0) +
        (biState.played_lucky_duck ? 1 : 0) +
        (biState.played_pop_the_balloon ? 1 : 0);

      // Consider the branch where this visit wins, and the one where this visit loses
      // First, the win:
      const winState = {
        ...biState,
        wins: biState.wins + 1,
      };
      const winNode =
        winState.wins === 3
          ? "third-win"
          : winState.wins === 2
            ? "second-win"
            : "first-win";
      queue.push({
        current: winNode,
        state: winState as T,
        path: [...path, current],
      });

      // Then, the loss.  The loss state is unchanged from the current state.
      const losses = played - biState.wins;
      const lossNode =
        losses === 3
          ? "third-loss"
          : losses === 2
            ? "second-loss"
            : "first-loss";
      queue.push({
        current: lossNode,
        state,
        path: [...path, current],
      });
    } else {
      throw new Error("unreachable");
    }
  }
  return paths;
}

function checkAllNodesReachable<T extends object, R, S extends string, P>(
  graph: InteractionGraph<T, R, S, P>,
  paths: Path<R>[],
) {
  const reachable = new Set();
  paths.forEach((path) => {
    path.path.forEach((nodeId) => {
      reachable.add(nodeId);
    });
  });
  const known = graph.nodes.map((node) => node.id);
  const known_set = new Set(known);
  const unreachable = known_set.difference(reachable);
  const missing = Array.from(unreachable);
  if (missing.length > 0) {
    missing.sort();
    throw new Error(
      `Found ${missing.length} unreachable node${missing.length > 1 ? "s" : ""} in graph: ${missing.join(", ")}`,
    );
  }
}

function expectedTime<T extends object, R, S extends string, P>(
  indexedNodes: Map<string, InteractionGraphNode<T, R, S, P>>,
  path: Path<R>,
): number {
  // Compute the total of the timeout_msec for all the nodes visited along `path`
  const durations = path.path.map((nodeId) => {
    const node = indexedNodes.get(nodeId);
    if (!node) {
      throw new Error(`Couldn't find node with id ${nodeId}`);
    }
    return node.timeout_msec;
  });
  const sum = durations.reduce((acc, next) => acc + next, 0);
  return sum;
}

function printMinAndMaxRuntimes<T extends object, R, S extends string, P>(
  indexedNodes: Map<string, InteractionGraphNode<T, R, S, P>>,
  paths: Path<R>[],
) {
  const pathsWithTimes: [number, Path<R>][] = paths.map((path) => {
    return [expectedTime(indexedNodes, path), path];
  });
  pathsWithTimes.sort();
  const shortest = pathsWithTimes[0];
  const longest = pathsWithTimes[pathsWithTimes.length - 1];
  if (!shortest || !longest) {
    throw new Error(`Couldn't find shortest or longest path`);
  }
  console.log(
    `Shortest path: ${shortest[0] / 1000} seconds, path:`,
    shortest[1],
  );
  console.log(`Longest path: ${longest[0] / 1000} seconds, path:`, longest[1]);
}

function checkGraph<T extends object, R, S extends string, P>(
  graph: InteractionGraph<T, R, S, P>,
) {
  const indexedNodes = new Map<string, InteractionGraphNode<T, R, S, P>>();
  graph.nodes.forEach((node) => {
    indexedNodes.set(node.id, node);
  });
  checkAllNodeIdsUnique(graph);
  checkStartingNodePresent(graph, indexedNodes);
  const paths = allPaths(graph, indexedNodes);
  console.log("Total paths: ", paths.length);
  checkAllNodesReachable(graph, paths);
  printMinAndMaxRuntimes(indexedNodes, paths);
  // TODO: once sound files exist, check that no node has a sound file longer than its timeout_msec.
}

test("art gallery", () => {
  checkGraph(ArtGalleryInteractionGraph);
});

test("boardwalk", () => {
  checkGraph(BoardwalkInteractionGraph);
});

test("casino", () => {
  checkGraph(CasinoInteractionGraph);
});

test("jewelry store", () => {
  checkGraph(JewelryStoreInteractionGraph);
});

export type NodeId = string;

// Custom presentation of the text for the given line.
export type TextEffect = "span"; // Take all horizontal space available.

// Function which can decide which node to proceed to based on
export type StatefulDestinationSelector<T> = (state: T) => NodeId;

export type InteractionGraphNodeChoice<T> = {
  // The text displayed for this choice
  text: string;

  // If present, one of a set of visual presentation effects for this choice.
  textEffect?: TextEffect;

  // If this choice wins the vote, what NodeId should we navigate to next?
  // This can be either a static node, or it can be dynamically selected based
  next: NodeId | StatefulDestinationSelector<T>;

  // If this choice wins the vote, run this function which returns the next
  // interaction state.
  stateEffect?: (state: T) => T;
};

export type InteractionCharacterState = {
  // Label that should be displayed for lines delivered by this character.
  label: string;
  // Asset path of the image that should be shown for this charater state.
  image: string;
};

export type InteractionGraphNodeShared = {
  id: NodeId;

  // If present, the id of the matching InteractionCharacterState to present on
  // the left side of the UI until the next node which sets this value.
  char_left?: string | null;
  // If present, the id of the matching InteractionCharacterState to present on
  // the right side of the UI until the next node which sets this value.
  char_right?: string | null;

  // Which of the characters is speaking this particular line?
  speaker: "left" | "right";

  // The text to display being spoken (or thought) by the specified speaker
  text: string;
  // If present, the type of text bubble that will be used when displaying this line
  textBubbleType?: "speech" | "thought";
  // If present, an additional presentation effect for the text
  textEffect?: TextEffect;

  // If present, the asset path of the sound clip that should be played while
  // this node is active.
  sound: string;

  // The amount of time, in milliseconds, allotted for this particular view
  timeout_msec: number;
};

export type InteractionGraphNodeWithNext<T> = InteractionGraphNodeShared & {
  // If present, when this node has been active for its timeout, what node
  // should become the next current node?
  next: NodeId | StatefulDestinationSelector<T>;
};
export type InteractionGraphNodeWithChoices<T> = InteractionGraphNodeShared & {
  // If present, when this node is active, a vote between the choices offered
  // will be taken, and the winner's "next" will be the next current node.
  choices:
    | InteractionGraphNodeChoice<T>[]
    | ((state: T) => InteractionGraphNodeChoice<T>[]);
};
export type InteractionGraphNodeTerminal<T, R> = InteractionGraphNodeShared & {
  // If present, this node is a final state in the state graph.  When
  // completed, this function will be called with the state of the interaction,
  // and the result returned will be delivered as the final state back to the
  // API backend.
  finalState: (state: T) => R;
};

export type InteractionGraphNode<T, R> =
  | InteractionGraphNodeWithNext<T>
  | InteractionGraphNodeWithChoices<T>
  | InteractionGraphNodeTerminal<T, R>;

export function isNextNode<T, R>(
  node: InteractionGraphNode<T, R>,
): node is InteractionGraphNodeWithNext<T> {
  return Object.prototype.hasOwnProperty.call(node, "next");
}
export function isChoiceNode<T, R>(
  node: InteractionGraphNode<T, R>,
): node is InteractionGraphNodeWithChoices<T> {
  return Object.prototype.hasOwnProperty.call(node, "choices");
}
export function isTerminalNode<T, R>(
  node: InteractionGraphNode<T, R>,
): node is InteractionGraphNodeTerminal<T, R> {
  return Object.prototype.hasOwnProperty.call(node, "finalState");
}

export type InteractionGraph<T, R> = {
  // The universe of nodes that are reachable within this graph.
  nodes: InteractionGraphNode<T, R>[];

  // The id of the node at which this interaction starts.
  starting_node: NodeId;

  // The initial state object.
  starting_state: T;

  // A map from character state id to image asset for all character state ids
  // referenced by this interaction.
  character_states: Record<string, InteractionCharacterState>;

  // The asset path of the background image for this interaction.
  background: string;
};

export type NodeId = string;

// Custom presentation of the text for the given line.
export type TextEffect = "span"; // Take all horizontal space available.

// The asset paths of the sound clip that should be played while this node is
// active.
export type SoundFileset = {
  // The file at `mp3` should be encoded at 48k samplerate, 128kbps bitrate.  We
  // use mp3 in all browser clients for maximum compatibility, since it's the
  // only lossy audio codec that is supported without caveats in all browsers.
  // (To wit: Safari supports Opus only in a WebM container, and we're not doing
  // video.  Safari also supports Vorbis, but not the Ogg container format.
  // Firefox supports AAC only if you have a platform codec installed, and only
  // in mp4 files.  FLAC is widely supported but lossless.  WAV is widely
  // supported but uncompressed.)
  mp3: string;

  // The file at `opus` should be encoded at 48k samplerate and 24k bitrate.
  // This file will be cached on (limited!) local storage by the radio, which
  // is why we aggressively optimize for size.  Since the spoken lines are mono
  // speech, the low bitrate still generally sounds fine.
  opus: string;
};

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

export type InteractionGraphNodeShared<S> = {
  id: NodeId;

  // Which InteractionChacterState key are we setting the current overlay to?
  overlay?: string | null;
  // TODO: determine if we need additional overlay positioning logic

  // Which of the characters is speaking this particular line?  Must be a key in the graph's speaker_states.
  speaker: S;

  // TODO: maybe add speakerImage to control what picture is shown to the left of the dialog

  // The text to display being spoken (or thought) by the specified speaker
  text: string;
  // If present, the type of text bubble that will be used when displaying this line
  textBubbleType?: "speech" | "thought";
  // If present, an additional presentation effect for the text
  textEffect?: TextEffect;

  // What sound file(s) should be played as this node is presented?
  sound: SoundFileset;

  // The amount of time, in milliseconds, allotted for this particular view
  timeout_msec: number;
};

export type InteractionGraphNodeWithNext<T, S> =
  InteractionGraphNodeShared<S> & {
    // If present, when this node has been active for its timeout, what node
    // should become the next current node?
    next: NodeId | StatefulDestinationSelector<T>;
  };
export type InteractionGraphNodeWithChoices<T, S> =
  InteractionGraphNodeShared<S> & {
    // If present, when this node is active, a vote between the choices offered
    // will be taken, and the winner's "next" will be the next current node.
    choices:
      | InteractionGraphNodeChoice<T>[]
      | ((state: T) => InteractionGraphNodeChoice<T>[]);
  };
export type InteractionGraphNodeWithPlugin<S, P> =
  InteractionGraphNodeShared<S> & {
    plugin: P;
  };
export type InteractionGraphNodeTerminal<T, R, S> =
  InteractionGraphNodeShared<S> & {
    // If present, this node is a final state in the state graph.  When
    // completed, this function will be called with the state of the interaction,
    // and the result returned will be delivered as the final state back to the
    // API backend.
    finalState: (state: T) => R;
  };

// Notes on types:
// * T is the State type for the graph
// * R is the final Result type for the graph
// * S is the set of Speaker options
// * P is the set of Plugin options
export type InteractionGraphNode<T, R, S, P> =
  | InteractionGraphNodeWithNext<T, S>
  | InteractionGraphNodeWithChoices<T, S>
  | InteractionGraphNodeWithPlugin<S, P>
  | InteractionGraphNodeTerminal<T, R, S>;

export function isNextNode<T, R, S, P>(
  node: InteractionGraphNode<T, R, S, P>,
): node is InteractionGraphNodeWithNext<T, S> {
  return Object.prototype.hasOwnProperty.call(node, "next");
}
export function isChoiceNode<T, R, S, P>(
  node: InteractionGraphNode<T, R, S, P>,
): node is InteractionGraphNodeWithChoices<T, S> {
  return Object.prototype.hasOwnProperty.call(node, "choices");
}
export function isPluginNode<T, R, S, P>(
  node: InteractionGraphNode<T, R, S, P>,
): node is InteractionGraphNodeWithPlugin<S, P> {
  return Object.prototype.hasOwnProperty.call(node, "plugin");
}
export function isTerminalNode<T, R, S, P>(
  node: InteractionGraphNode<T, R, S, P>,
): node is InteractionGraphNodeTerminal<T, R, S> {
  return Object.prototype.hasOwnProperty.call(node, "finalState");
}

export type InteractionGraph<T, R, S extends string, P = never> = {
  // The universe of nodes that are reachable within this graph.
  nodes: InteractionGraphNode<T, R, S, P>[];

  // The id of the node at which this interaction starts.
  starting_node: NodeId;

  // The initial state object.
  starting_state: T;

  // A map from character state id to image asset for all character state ids
  // referenced by this interaction.
  speaker_states: Record<S, InteractionCharacterState>;

  // The asset path of the background image for this interaction.
  background: string;
};

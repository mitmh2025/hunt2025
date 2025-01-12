export type InteractionChoice = {
  key: string; // the value that should be voted.
  text: string; // the label that should be displayed.
  textEffect?: "span";
};

export type ExternalInteractionNode = {
  id: number; // The ID of the entry in the TeamInteractionStateLog
  ts: number; // The time at which this node was entered
  node: string; // The node id in the graph of the node
  speaker: string; // Which of the characters is speaking this particular line?  Must be a key in the graph's speaker_states.
  text: string; // What is the speaker saying?
  textBubbleType?: "speech" | "thought"; // If present, the type of text bubble that will be used when displaying this line
  textEffect?: "span"; // If present, an additional presentation effect for the text
  sound: string; // The URL of the mp3 audio file to be played
  timeout_msec: number; // The amount of time, in milliseconds, allotted for this particular view
  overlay?: string | null; // Which InteractionChacterState key are we setting the current overlay to?
  // TODO: maybe add speakerImage to control what picture is shown to the left of the dialog

  choices?: InteractionChoice[];
  plugin?: string;
  result?: string;
};

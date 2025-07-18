//import type { FunctionComponent } from "react";
import type { TeamHuntState } from "../../../../lib/api/client";

// An id unique within this graph of views.
export type NodeId = string;

// One of a set of plugins for which we have a static mapping from PluginName to FunctionComponent to be used for that interaction.
// We'll do...something to dynamically import their entrypoints?  Big TODO for the behaviors there.
export type PluginName =
  | "painting1"
  | "safe"
  | "painting2"
  | "rug"
  | "cryptex"
  | "deskdrawer"
  | "bookcase"
  | "extra"
  | "telephone";

export type ScreenArea = {
  // I'm doing scale-invariant coordinates for now, but maybe it will make more
  // sense to do this in raster with a particular number of pixels.
  // If rectangles are too simple, we can make this more complicated, but for
  // now I'll try keeping it simple
  left: number; // number between -1 (farthest left) and 1 (farthest right)
  right: number;
  top: number; // number between -1 (farthest bottom) and 1 (farthest top)
  bottom: number;
};

export type PlacedAsset = {
  area: ScreenArea;
  asset: string | null;
  extraAsset?: string; // blacklight overlay
};

export type PlacedAssetInternal = PlacedAsset & {
  // If present, only include the asset when condition (evaluated on the node's state) returns true
  includeIf?: (teamState: TeamHuntState) => boolean;
};

export type Navigation = {
  // Client-visible navigation information.

  area: ScreenArea; // Where on the screen should this navigation prompt?
  cursor: string; // What is the value of the CSS cursor property that we want for this area?
  destId: string; // What is the destination that we want to navigate to upon click in the area?
  sound?: string; // If present, sound effect that should be played when performing the navigation
};

export type Escape = {
  // For <a> tags that don't stay within SearchEngine, but do full browser navigations
  area: ScreenArea; // Where on the screen should this escape prompt?
  cursor: string; // What is the value of the CSS cursor property that we want for this area?
  href: string; // What is the href value of the a tag we'll use
};

export type NavigationInternal = Navigation & {
  // Internal data model may also specify a visibility-control function, but we
  // should not publish that to client code.

  // If present, only enable the navigation when condition (evaluated on the node's state) returns true
  includeIf?: (teamState: TeamHuntState) => boolean;
};

export type Interaction = {
  plugin: PluginName;
  overlay?: true;
};

export type InteractionInternal = Interaction & {
  // If present, only include the interaction when condition (evaluated on the node's state) returns true
  includeIf?: (teamState: TeamHuntState) => boolean;
};

export type ModalBase = {
  area: ScreenArea; // what area of the screen should be clickable to trigger showing this modal?
  zIndex?: number; // what z-index should this modal be shown at?
  asset: string; // what image should be shown when the modal is blown up large?
  altText: string; // what should be shown as the alt text for the asset?

  // By default the asset is shown in the clickable area to trigger the modal. If you
  // want some other behavior (a larger asset that is only partially clickable, for example)
  // you can override what gets shown and where when the modal is available, separate
  // from what area is clickable and what is shown in the modal
  placedAsset?: PlacedAsset;
};

export type ModalInternalExtra = {
  // blacklight overlay
  asset: string;
  altText: string;
  slotId: string;
  postCode: string;
  gateId: string;
};

export type ModalInternal = ModalBase & {
  // If present: only include this Modal in state served to the client if the
  // condition evaluates to true.
  includeIf?: (teamState: TeamHuntState) => boolean;

  // If present and true: include in interactionModals instead of modals
  ownedByInteraction?: boolean;

  // Which puzzle slot does this modal reference?
  slotId: string;

  // A unique random ID passed to the client if the puzzle in slot `slotId` is
  // not yet visible (because the gate is not satisfied)
  postCode: string;

  // The id of the gate we should mark as satisfied if we receive the postCode
  // POSTed back from the browser.  This should match the unlockable_if
  // gate_satisfied requirement on the puzzle with slot id `slotId`.
  gateId: string;

  solvedAssets?: {
    modalAsset?: string;
    placedAsset?: string;
    modalAltText?: string;
  };

  extra?: ModalInternalExtra;
};

export type PostcodeInitial = {
  // If we have not yet unlocked the target puzzle, we can't know its title or slug yet.
  // Instead, we pass the client the postCode which it will POST back to us
  // when the user requests for the modal to be displayed, and in response we'll
  // 1) mark the gate as satisfied, which should mark the puzzle as visible
  // 2) return the relevant puzzle title & slug.
  postCode: string;
};

export type PostcodeResponse = {
  // The fields we expect the response from posting the postCode from a ModalWithPostcode to the backend.
  title: string;
  slug: string;
  desc?: string;
};

export type ExtraPostcodeInitial = {
  extra?: { asset: string; altText: string } & PostcodeInitial;
};

export type ExtraPostcodeResponse = {
  extra?: { asset: string; altText: string } & PostcodeResponse;
};

export type ModalWithPostcode = ModalBase & PostcodeInitial;
export type ModalWithPuzzleFields = ModalBase & PostcodeResponse;
export type ModalWithExtraPostcode = ModalBase & ExtraPostcodeInitial;
export type ModalWithExtraPuzzleFields = ModalBase & ExtraPostcodeResponse;

export type Modal = (ModalWithPostcode | ModalWithPuzzleFields) &
  (ModalWithExtraPostcode | ModalWithExtraPuzzleFields);

export function hasPostCode(modal: Modal): modal is ModalWithPostcode {
  return Object.prototype.hasOwnProperty.call(modal, "postCode");
}
export function hasPuzzleFields(modal: Modal): modal is ModalWithPuzzleFields {
  return Object.prototype.hasOwnProperty.call(modal, "title");
}
export function hasExtraPostCode(
  modal: ModalBase & (ModalWithExtraPostcode | ModalWithExtraPuzzleFields),
): modal is ModalWithExtraPostcode {
  return Object.prototype.hasOwnProperty.call(modal.extra, "postCode");
}
export function hasExtraPuzzleFields(
  modal: ModalBase & (ModalWithExtraPostcode | ModalWithExtraPuzzleFields),
): modal is ModalWithExtraPuzzleFields {
  return Object.prototype.hasOwnProperty.call(modal.extra, "title");
}

export type NodeShared = {
  // The shape of the data which defines the behavior of a single node of the
  // point-and-click adventure.  Since modals and navigations may have
  // additional fields on the server, we have separate subtypes for Node and
  // NodeInternal.
  //
  // Stacking order is:
  // background on bottom, full area
  // placedAssets on top of background
  // navigations atop that
  // interactions atop that
  // modal triggers atop that
  // modal overlays full area atop everything

  id: NodeId;
  background: string; // Imported asset that is presented as the full-screen background for this view.
  title: string; // Imported asset that is presented as the title for the round, in the lower-right-hand corner of the viewport.
  // navigations added in subclass
  // interactions added in subclass
  // modals added in subclass
  sounds: string[]; // Mostly for prefetching, presumed to be used by one of the interactives or on navigation
  escapes?: Escape[];
};

export type NodeInternal = NodeShared & {
  navigations: NavigationInternal[];
  modals: ModalInternal[];
  placedAssets: PlacedAssetInternal[];
  interactions: InteractionInternal[];
  //scripts: string[]; // Additional script tags to inject into the page, I guess?  Or maybe that's implied by PluginName for interactions
};

export type Node = NodeShared & {
  navigations: Navigation[];
  modals: Modal[];
  interactions: Interaction[];
  interactionModals?: Modal[];
  placedAssets: PlacedAsset[];
};

export type InteractionComponent = (props: {
  node: Node;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  setNode: (node: Node) => void;
  navigate: (destId: string) => void;
  teamState: TeamHuntState;
}) => JSX.Element;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- augmenting global type
  interface Window {
    illegalSearchInteractions: Record<string, InteractionComponent>;
  }
}

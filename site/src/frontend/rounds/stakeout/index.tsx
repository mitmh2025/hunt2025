import React from "react";
import type { TeamState } from "../../../../lib/api/client";
//import RoundPuzzleList from "../../components/RoundPuzzleList";
import { PUZZLES } from "../../puzzles";
import StakeoutBody from "./StakeoutBody";
import metaEnvelope from "./assets/meta_envelope_full.png";
import polaroidDeveloping from "./assets/polaroid_developing_photo_only.png";
import polaroidSolvedPlaceholder from "./assets/polaroid_placeholder.png";
import { type StakeoutSlot, type StakeoutState } from "./types";

const DEVELOPED_PHOTO_IMAGES: Record<StakeoutSlot, string> = {
  sop01: polaroidSolvedPlaceholder, //
  sop02: polaroidSolvedPlaceholder,
  sop03: polaroidSolvedPlaceholder,
  sop04: polaroidSolvedPlaceholder,
  sop05: polaroidSolvedPlaceholder,
  sop06: polaroidSolvedPlaceholder,
  sop07: polaroidSolvedPlaceholder,
  sop08: polaroidSolvedPlaceholder,
  sop09: polaroidSolvedPlaceholder,
  sop10: polaroidSolvedPlaceholder,
  sop11: polaroidSolvedPlaceholder,
  sop12: polaroidSolvedPlaceholder,
  sop13: polaroidSolvedPlaceholder,
  sop14: polaroidSolvedPlaceholder,
  sop15: polaroidSolvedPlaceholder,
  sop16: polaroidSolvedPlaceholder,
  sop17: polaroidSolvedPlaceholder,
  sop18: polaroidSolvedPlaceholder,
  sop19: polaroidSolvedPlaceholder,
  sop20: polaroidSolvedPlaceholder,
  sop21: polaroidSolvedPlaceholder,
  sop22: polaroidSolvedPlaceholder,
  sop23: polaroidSolvedPlaceholder,
  sop24: polaroidSolvedPlaceholder,
  sop25: polaroidSolvedPlaceholder,
  sop26: polaroidSolvedPlaceholder,
  sop27: polaroidSolvedPlaceholder,
  sop28: polaroidSolvedPlaceholder,
  sop29: polaroidSolvedPlaceholder,
  sop30: polaroidSolvedPlaceholder,
  sop31: polaroidSolvedPlaceholder,
  sop32: polaroidSolvedPlaceholder,
  sop33: polaroidSolvedPlaceholder,
  sop34: polaroidSolvedPlaceholder,
  sop35: polaroidSolvedPlaceholder,
  sop36: polaroidSolvedPlaceholder,
  sop37: polaroidSolvedPlaceholder,
  sop38: polaroidSolvedPlaceholder,
  sop39: polaroidSolvedPlaceholder,
  sop40: polaroidSolvedPlaceholder,
  sop41: polaroidSolvedPlaceholder,
  sop42: polaroidSolvedPlaceholder,
  // Mapping from slot id to artwork.
  // TODO: import the 42 photos, once the art is ready.
};

function lookupSlug(slot: string, teamState: TeamState): string | undefined {
  const round = teamState.rounds.stakeout;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function stakeoutOverlay(teamState: TeamState): StakeoutState["overlay"] {
  const metaSlug = lookupSlug("som01", teamState);
  if (!metaSlug) return undefined;
  const metaPuzzleDefinition = PUZZLES[metaSlug];
  const title = metaPuzzleDefinition?.title ?? "Stub puzzle for slot som01";
  return {
    slug: metaSlug,
    label: title,
    asset: metaEnvelope,
    // Bottom and right are used to align the image to the bottom right space on the table
    bottom: "0px",
    right: "-90px",
    // Left, top, and transform are used to specify the offset for the puzzle link
    left: "87px",
    top: "157px",
    transform: "rotate(-17deg)",
  };
}

export function stakeoutState(teamState: TeamState): StakeoutState {
  return {
    photos: Object.entries(DEVELOPED_PHOTO_IMAGES).map((record) => {
      const slot = record[0] as StakeoutSlot;
      const solvedAsset = record[1];
      const slug = lookupSlug(slot, teamState);
      if (!slug) {
        // puzzle is unknown to teamState, thus it is locked
        return {
          slot,
          asset: "", // white fill.  TODO: get an actual asset for this?  Or make the field optional?
        };
      }
      const puzzleDefinition = PUZZLES[slug];
      const puzzleState = teamState.puzzles[slug];
      const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slot}`;
      if (!puzzleState) {
        // This should theoretically never happen but it's easier to write
        // the case out to prove it to the typechecker.
        return {
          slot,
          asset: "", // white fill
        };
      }
      if (puzzleState.locked === "unlocked") {
        // Unlocked and solved both feature the slug & title; solved puzzles
        // have a per-puzzle custom asset.
        return {
          slot,
          slug,
          title,
          asset: puzzleState.answer ? solvedAsset : polaroidDeveloping,
        };
      }
      // This is the "unlockable but not yet unlocked" case.
      return {
        slot,
        slug,
        title,
        asset: "", // white fill
      };
    }),
    overlay: stakeoutOverlay(teamState),
  };
}

const StakeoutRoundPage = ({ teamState }: { teamState: TeamState }) => {
  const state = stakeoutState(teamState);
  const inlineScript = `window.initialStakeoutState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="stakeout-root">
        <StakeoutBody state={state} teamState={teamState} />
      </div>
    </>
  );
};

export default StakeoutRoundPage;

import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
//import RoundPuzzleList from "../../components/RoundPuzzleList";
import { PUZZLES } from "../../puzzles";
import StakeoutBody from "./StakeoutBody";
import metaEnvelope from "./assets/meta_envelope_full.png";
import polaroidDeveloping from "./assets/polaroid_developing_photo_only.png";
import polaroidSolved01 from "./assets/solved/p1.jpg";
import polaroidSolved02 from "./assets/solved/p2.jpg";
import polaroidSolved03 from "./assets/solved/p3.jpg";
import polaroidSolved04 from "./assets/solved/p4.jpg";
import polaroidSolved05 from "./assets/solved/p5.jpg";
import polaroidSolved06 from "./assets/solved/p6.jpg";
import polaroidSolved07 from "./assets/solved/p7.jpg";
import polaroidSolved08 from "./assets/solved/p8.jpg";
import polaroidSolved09 from "./assets/solved/p9.jpg";
import polaroidSolved10 from "./assets/solved/p10.jpg";
import polaroidSolved11 from "./assets/solved/p11.jpg";
import polaroidSolved12 from "./assets/solved/p12.jpg";
import polaroidSolved13 from "./assets/solved/p13.jpg";
import polaroidSolved14 from "./assets/solved/p14.jpg";
import polaroidSolved15 from "./assets/solved/p15.jpg";
import polaroidSolved16 from "./assets/solved/p16.jpg";
import polaroidSolved17 from "./assets/solved/p17.jpg";
import polaroidSolved18 from "./assets/solved/p18.jpg";
import polaroidSolved19 from "./assets/solved/p19.jpg";
import polaroidSolved20 from "./assets/solved/p20.jpg";
import polaroidSolved21 from "./assets/solved/p21.jpg";
import polaroidSolved22 from "./assets/solved/p22.jpg";
import polaroidSolved23 from "./assets/solved/p23.jpg";
import polaroidSolved24 from "./assets/solved/p24.jpg";
import polaroidSolved25 from "./assets/solved/p25.jpg";
import polaroidSolved26 from "./assets/solved/p26.jpg";
import polaroidSolved27 from "./assets/solved/p27.jpg";
import polaroidSolved28 from "./assets/solved/p28.jpg";
import polaroidSolved29 from "./assets/solved/p29.jpg";
import polaroidSolved30 from "./assets/solved/p30.jpg";
import polaroidSolved31 from "./assets/solved/p31.jpg";
import polaroidSolved32 from "./assets/solved/p32.jpg";
import polaroidSolved33 from "./assets/solved/p33.jpg";
import polaroidSolved34 from "./assets/solved/p34.jpg";
import polaroidSolved35 from "./assets/solved/p35.jpg";
import polaroidSolved36 from "./assets/solved/p36.jpg";
import polaroidSolved37 from "./assets/solved/p37.jpg";
import polaroidSolved38 from "./assets/solved/p38.jpg";
import polaroidSolved39 from "./assets/solved/p39.jpg";
import polaroidSolved40 from "./assets/solved/p40.jpg";
import polaroidSolved41 from "./assets/solved/p41.jpg";
import polaroidSolved42 from "./assets/solved/p42.jpg";

import { type StakeoutSlot, type StakeoutState } from "./types";

const DEVELOPED_PHOTO_IMAGES: Record<StakeoutSlot, string> = {
  sop01: polaroidSolved01, //
  sop02: polaroidSolved02,
  sop03: polaroidSolved03,
  sop04: polaroidSolved04,
  sop05: polaroidSolved05,
  sop06: polaroidSolved06,
  sop07: polaroidSolved07,
  sop08: polaroidSolved08,
  sop09: polaroidSolved09,
  sop10: polaroidSolved10,
  sop11: polaroidSolved11,
  sop12: polaroidSolved12,
  sop13: polaroidSolved13,
  sop14: polaroidSolved14,
  sop15: polaroidSolved15,
  sop16: polaroidSolved16,
  sop17: polaroidSolved17,
  sop18: polaroidSolved18,
  sop19: polaroidSolved19,
  sop20: polaroidSolved20,
  sop21: polaroidSolved21,
  sop22: polaroidSolved22,
  sop23: polaroidSolved23,
  sop24: polaroidSolved24,
  sop25: polaroidSolved25,
  sop26: polaroidSolved26,
  sop27: polaroidSolved27,
  sop28: polaroidSolved28,
  sop29: polaroidSolved29,
  sop30: polaroidSolved30,
  sop31: polaroidSolved31,
  sop32: polaroidSolved32,
  sop33: polaroidSolved33,
  sop34: polaroidSolved34,
  sop35: polaroidSolved35,
  sop36: polaroidSolved36,
  sop37: polaroidSolved37,
  sop38: polaroidSolved38,
  sop39: polaroidSolved39,
  sop40: polaroidSolved40,
  sop41: polaroidSolved41,
  sop42: polaroidSolved42,
  // Mapping from slot id to artwork.
  // TODO: import the 42 photos, once the art is ready.
};

function lookupSlug(
  slot: string,
  teamState: TeamHuntState,
): string | undefined {
  const round = teamState.rounds.stakeout;
  const slotObj = round ? round.slots[slot] : undefined;
  return slotObj?.slug;
}

function stakeoutOverlay(teamState: TeamHuntState): StakeoutState["overlay"] {
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

export function stakeoutState(teamState: TeamHuntState): StakeoutState {
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

const StakeoutRoundPage = ({ teamState }: { teamState: TeamHuntState }) => {
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

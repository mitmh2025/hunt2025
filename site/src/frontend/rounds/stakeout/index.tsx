import React from "react";
import type { TeamHuntState, TeamInfo } from "../../../../lib/api/client";
import teamIsImmutable from "../../../utils/teamIsImmutable";
import { PUZZLES } from "../../puzzles";
import StakeoutBody from "./StakeoutBody";
import metaEnvelope from "./assets/meta_envelope.png";
import polaroidDeveloping from "./assets/polaroid_developing_photo_only.png";
import polaroidSolved01 from "./assets/stakeout_01.jpg";
import polaroidSolved02 from "./assets/stakeout_02.jpg";
import polaroidSolved03 from "./assets/stakeout_03.jpg";
import polaroidSolved04 from "./assets/stakeout_04.jpg";
import polaroidSolved05 from "./assets/stakeout_05.jpg";
import polaroidSolved06 from "./assets/stakeout_06.jpg";
import polaroidSolved07 from "./assets/stakeout_07.jpg";
import polaroidSolved08 from "./assets/stakeout_08.jpg";
import polaroidSolved09 from "./assets/stakeout_09.jpg";
import polaroidSolved10 from "./assets/stakeout_10.jpg";
import polaroidSolved11 from "./assets/stakeout_11.jpg";
import polaroidSolved12 from "./assets/stakeout_12.jpg";
import polaroidSolved13 from "./assets/stakeout_13.jpg";
import polaroidSolved14 from "./assets/stakeout_14.jpg";
import polaroidSolved15 from "./assets/stakeout_15.jpg";
import polaroidSolved16 from "./assets/stakeout_16.jpg";
import polaroidSolved17 from "./assets/stakeout_17.jpg";
import polaroidSolved18 from "./assets/stakeout_18.jpg";
import polaroidSolved19 from "./assets/stakeout_19.jpg";
import polaroidSolved20 from "./assets/stakeout_20.jpg";
import polaroidSolved21 from "./assets/stakeout_21.jpg";
import polaroidSolved22 from "./assets/stakeout_22.jpg";
import polaroidSolved23 from "./assets/stakeout_23.jpg";
import polaroidSolved24 from "./assets/stakeout_24.jpg";
import polaroidSolved25 from "./assets/stakeout_25.jpg";
import polaroidSolved26 from "./assets/stakeout_26.jpg";
import polaroidSolved27 from "./assets/stakeout_27.jpg";
import polaroidSolved28 from "./assets/stakeout_28.jpg";
import polaroidSolved29 from "./assets/stakeout_29.jpg";
import polaroidSolved30 from "./assets/stakeout_30.jpg";
import polaroidSolved31 from "./assets/stakeout_31.jpg";
import polaroidSolved32 from "./assets/stakeout_32.jpg";
import polaroidSolved33 from "./assets/stakeout_33.jpg";
import polaroidSolved34 from "./assets/stakeout_34.jpg";
import polaroidSolved35 from "./assets/stakeout_35.jpg";
import polaroidSolved36 from "./assets/stakeout_36.jpg";
import polaroidSolved37 from "./assets/stakeout_37.jpg";
import polaroidSolved38 from "./assets/stakeout_38.jpg";
import polaroidSolved39 from "./assets/stakeout_39.jpg";
import polaroidSolved40 from "./assets/stakeout_40.jpg";
import polaroidSolved41 from "./assets/stakeout_41.jpg";
import polaroidSolved42 from "./assets/stakeout_42.jpg";
import { type StakeoutSlot, type StakeoutState } from "./types";

const DEVELOPED_PHOTO_IMAGES: Record<StakeoutSlot, string> = {
  sop01: polaroidSolved01,
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
    top: "147px",
    transform: "rotate(-17deg)",
  };
}

export function stakeoutState(
  teamState: TeamHuntState,
  { username }: { username: string },
): StakeoutState {
  const immutable = teamIsImmutable(username);

  return {
    epoch: teamState.epoch,
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
      const desc = puzzleDefinition?.initial_description;
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
          asset:
            !!puzzleState.answer || (immutable && typeof window === "undefined")
              ? solvedAsset
              : polaroidDeveloping,
        };
      }
      // This is the "unlockable but not yet unlocked" case.
      return {
        slot,
        slug,
        title,
        asset: "", // white fill
        desc,
      };
    }),
    overlay: stakeoutOverlay(teamState),
  };
}

const StakeoutRoundPage = ({
  teamState,
  teamInfo,
}: {
  teamState: TeamHuntState;
  teamInfo: TeamInfo;
}) => {
  const state = stakeoutState(teamState, {
    username: teamInfo.teamUsername,
  });
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

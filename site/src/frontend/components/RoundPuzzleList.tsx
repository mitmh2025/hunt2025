import React from "react";
import type { TeamState } from "../../../lib/api/client";
import { PUZZLES } from "../puzzles";
import PuzzleLink from "./PuzzleLink";

const RoundPuzzleList = ({
  teamState,
  round,
}: {
  teamState: TeamState;
  round: string;
}) => {
  const rounds = teamState.rounds;
  const roundState = rounds[round];
  if (roundState === undefined) {
    return undefined;
  }
  const slots = roundState.slots;
  const entries = Object.keys(slots).map((slot) => {
    const slotObj = slots[slot];
    const slug = slotObj?.slug;
    // TODO: style metapuzzles differently
    // const _is_meta = slotObj?.is_meta ?? false;
    const puzzleDefinition = slug ? PUZZLES[slug] : undefined;
    const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slot}`;
    const item = slug ? (
      <PuzzleLink teamState={teamState} title={title} slug={slug} />
    ) : undefined;
    if (item) {
      return (
        <li key={slug} className="puzzle-list-item">
          {item}
        </li>
      );
    } else {
      return undefined;
    }
  });
  return <ul className="puzzle-list">{entries}</ul>;
};

export default RoundPuzzleList;

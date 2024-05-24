import React from "react";
import type { TeamState } from "../../../lib/api/client";
import { PUZZLES } from "../puzzles";

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
  const puzzleStates = teamState.puzzles;
  const entries = Object.keys(slots).map((slot) => {
    const slug = slots[slot];
    const puzzleState = slug ? puzzleStates[slug] : undefined;
    const puzzleDefinition = slug ? PUZZLES[slug] : undefined;
    const title = puzzleDefinition?.title ?? `Stub puzzle for slot ${slot}`;
    let item;
    if (puzzleState?.locked === "locked") {
      item = (
        <span className="puzzle-list-item-unlockable">{title} (locked)</span>
      );
    }
    if (puzzleState?.locked === "unlocked") {
      item = (
        <a className="puzzle-list-item-unlocked" href={`/puzzles/${slug}`}>
          {title}
        </a>
      );
    }
    if (item) {
      return <li key={slug}>{item}</li>;
    } else {
      return undefined;
    }
  });
  return <ul className="puzzle-list">{entries}</ul>;
};

export default RoundPuzzleList;

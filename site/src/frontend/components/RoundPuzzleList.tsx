import React from "react";
import type { TeamHuntState } from "../../../lib/api/client";
import { PUZZLES } from "../puzzles";
import PuzzleLink from "./PuzzleLink";

const RoundPuzzleList = ({
  teamState,
  round,
}: {
  teamState: TeamHuntState;
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
    const lockState =
      (slug ? teamState.puzzles[slug]?.locked : undefined) ?? "locked";
    const answer = slug ? teamState.puzzles[slug]?.answer : undefined;
    const item = slug ? (
      <PuzzleLink
        lockState={lockState}
        answer={answer}
        currency={teamState.currency}
        title={title}
        slug={slug}
      />
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

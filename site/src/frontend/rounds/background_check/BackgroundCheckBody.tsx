import React from "react";
import { type TeamState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { type BackgroundCheckState } from "./types";
import { Fridge } from "./Layout";

const BackgroundCheckBody = ({
  state,
  teamState,
}: {
  state: BackgroundCheckState;
  teamState: TeamState;
}) => {
  const items = (
    <ul>
      {state.items.map((item) => {
        const slug = item.slug;
        const puzzleState = teamState.puzzles[slug];
        return (
          <li key={item.slug}>
            <PuzzleLink
              lockState={puzzleState?.locked ?? "locked"}
              answer={puzzleState?.answer}
              currency={teamState.currency}
              title={item.title}
              slug={item.slug}
            />
          </li>
        );
      })}
    </ul>
  );
  return (
    <Fridge key="background-check">
      <h1>The Background Check</h1>
      {items}
    </Fridge>
  );
};

export default BackgroundCheckBody;

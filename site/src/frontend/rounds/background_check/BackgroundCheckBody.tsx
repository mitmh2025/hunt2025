import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { BackgroundCheckFonts } from "./BackgroundCheckFonts";
import { Fridge } from "./Layout";
import { type BackgroundCheckState } from "./types";

const BackgroundCheckBody = ({
  state,
  teamState,
}: {
  state: BackgroundCheckState;
  teamState: TeamHuntState;
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
      <BackgroundCheckFonts />
      <h1>The Background Check</h1>
      {items}
    </Fridge>
  );
};

export default BackgroundCheckBody;

import React, { Fragment } from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { type MissingDiamondState } from "./types";

const MissingDiamondBody = ({
  state,
  teamState,
}: {
  state: MissingDiamondState;
  teamState: TeamHuntState;
}) => {
  const items = (
    <ul>
      {state.items.map((item) => {
        const puzzleState = teamState.puzzles[item.slug];
        return (
          <li key={item.slug}>
            <PuzzleLink
              lockState={puzzleState?.locked ?? "locked"}
              answer={puzzleState?.answer}
              currency={teamState.currency}
              title={item.title}
              slug={item.slug}
              desc={item.desc}
            />
          </li>
        );
      })}
    </ul>
  );
  return (
    <Fragment key="shadow-diamond">
      <h1>The Missing Diamond</h1>
      {items}
    </Fragment>
  );
};

export default MissingDiamondBody;

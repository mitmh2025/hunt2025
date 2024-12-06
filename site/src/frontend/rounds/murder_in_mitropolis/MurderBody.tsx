import React, { Fragment } from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { MurderFonts } from "./MurderFonts";
import { type MurderState } from "./types";

const MurderBody = ({
  state,
  teamState,
}: {
  state: MurderState;
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
              desc={item.desc}
            />
          </li>
        );
      })}
    </ul>
  );
  return (
    <Fragment key="murder">
      <MurderFonts />
      <h1>The Murder round page</h1>
      {items}
    </Fragment>
  );
};

export default MurderBody;

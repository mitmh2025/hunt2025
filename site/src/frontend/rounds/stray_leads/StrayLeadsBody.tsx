import React, { Fragment } from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { type StrayLeadsState } from "./types";

const StrayLeadsBody = ({
  state,
  teamState,
}: {
  state: StrayLeadsState;
  teamState: TeamHuntState;
}) => {
  const items = (
    <ul>
      {state.leads.map((lead) => {
        const puzzleState = teamState.puzzles[lead.slug];
        return (
          <li key={lead.slug}>
            <PuzzleLink
              lockState={puzzleState?.locked ?? "locked"}
              answer={puzzleState?.answer}
              currency={teamState.currency}
              title={lead.title}
              slug={lead.slug}
            />
          </li>
        );
      })}
    </ul>
  );
  return (
    <Fragment key="stray-leads">
      <h1>Stray leads</h1>
      <p>
        Some leads may appear here when we are not yet sure which investigation
        they belong to.
      </p>
      {items}
    </Fragment>
  );
};

export default StrayLeadsBody;

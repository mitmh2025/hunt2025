import React, { Fragment } from "react";
import { type TeamState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { type PaperTrailState } from "./types";

const PaperTrailBody = ({
  state,
  teamState,
}: {
  state: PaperTrailState;
  teamState: TeamState;
}) => {
  const sections = state.groups.map((group) => {
    return (
      <Fragment key={`label-${group.label}`}>
        <h2>{group.label}</h2>
        <ul>
          {group.items.map((item) => {
            return (
              <li key={item.slug}>
                <PuzzleLink
                  teamState={teamState}
                  title={item.title}
                  slug={item.slug}
                />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  });
  return (
    <Fragment key="paper-trail">
      <h1>The Paper Trail</h1>
      {sections}
    </Fragment>
  );
};

export default PaperTrailBody;

import React, { Fragment } from "react";
import { type TeamState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { type ShadowDiamondState } from "./types";

const ShadowDiamondBody = ({
  state,
  teamState,
}: {
  state: ShadowDiamondState;
  teamState: TeamState;
}) => {
  const items = (
    <ul>
      {state.items.map((item) => {
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
  );
  return (
    <Fragment key="shadow-diamond">
      <h1>Shadow Diamond investigation</h1>
      {items}
    </Fragment>
  );
};

export default ShadowDiamondBody;

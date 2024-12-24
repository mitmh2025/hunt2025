import React from "react";
import { type HubState } from "./types";

const HubBody = ({ state }: { state: HubState }) => {
  return (
    <>
      <h1>Hub page</h1>
      <h2>Rounds</h2>
      <ul>
        {state.rounds.map((round) => {
          return (
            <li key={round.slug}>
              <a href={`/rounds/${round.slug}`}>{round.title}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default HubBody;

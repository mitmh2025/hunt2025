import React from "react";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import archiveMode from "../../utils/archiveMode";
import rootUrl from "../../utils/rootUrl";

const Arrow = styled.span`
  color: var(--gold-800);
`;

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const unlockedIKidEweKnot =
    teamState.rounds.murder_in_mitropolis?.gates?.includes("tmg01") ?? false;
  const unlockedStitchySituation =
    teamState.rounds.murder_in_mitropolis?.gates?.includes("tmg02") ?? false;

  return (
    <>
      <p className="puzzle-flavor">
        A gaugeless scarf, up to 6 times as long as it is wide.
        {archiveMode &&
          " Note that URLs within this puzzle will need to be adjusted in order to access additional content within the archives."}
      </p>
      {unlockedIKidEweKnot && (
        <p>
          <a href={`${rootUrl}/i_kid_ewe_knot`}>I Kid Ewe Knot</a>
          <Arrow>→</Arrow>
        </p>
      )}
      {unlockedStitchySituation && (
        <p>
          <a href={`${rootUrl}/stitchy_situation`}>Stitchy Situation</a>
          <Arrow>→</Arrow>
        </p>
      )}
      <p>
        Cast on 128 sts in white. In black, k128 p128 k128 p128. In white, k128
        p128. In black, k128 p128. In white, k128 p128 k128 p128. In black, k128
        p128. In white, k128 p128 k128 p128 k128 p128 k128 p128. In black, k128
        p128. In white, k128 p128 k128 p128. In black, k128 p128 k128 p128. In
        white, k128 p128 k128 p128 k128 p128 k128 p128. In black, k128 p128. In
        white, k128 p128. In black, k128 p128. In white, k128 p128 k128 p128. In
        black, k128 p128 k128 p128 k128 p128 k128 p128. In white, k128 p128. In
        black, k128 p128. In white, k128 p128 k128 p128. In black, k128 p128. In
        white, k128 p128 k128 p128. In black, k128 p128 k128 p128 k128 p128 k128
        p128. In white, k128 p128. In black, k128 p128. In white, k128 p128 k128
        p128. In black, k128 p128. In white, k128 p128. In black, k128 p128. In
        white, k128 p128 k128 p128. In black, k128 p128 k128 p128 k128 p128 k128
        p128. In white, k128 p128 k128 p128. In black, k128 p128. In white, k128
        p128. In black, k128 p128 k128 p128 k128 p128 k128 p128. In white, k128
        p128 k128 p128. In black, k128 p128. In white, k128 p128 k128 p128. In
        black, k128 p128 k128 p128 k128 p128. In white, k128 p128 k128 p128. In
        black, k128 p128. In white, k128 p128 k128 p128. In black, k128 p128
        k128 p128. In white, k128 p128. In black, k128 p128. In white, k128
        p128. In black, k128 p128 k128 p128 k128 p128. In white, k128 p128 k128
        p128. In black, k128 p128 k128 p128. In white, k128 p128 k128 p128. In
        black, k128 p128. In white, k128 p128. In black, k128 p128 k128 p128
        k128 p128. In white, k128 p128 k128 p128. In black, k128 p128 k128 p128.
        In white, k128 p128 k128 p128. In black, k128 p128. In white, k128 p128
        k128 p128. In black, k128 p128 k128 p128 k128 p128 k128 p128. In white,
        k128 p128. In black, k128 p128. In white, k128 p128 k128 p128. In black,
        k128 p128 k128 p128 k128 p128 k128 p128. In white, k128 p128 k128 p128.
        In black, k128 p128. In white, k128 p128. In black, k128 p128. In white,
        k128 p128 k128 p128. In black, k128 p128. In white, k128 p128 k128 p128
        k128 p128. In black, k128 p128 k128 p128 k128 p128 k128 p128. In white,
        k128 p128. In black, k128 p128. In white, k128 p128. In black, k128
        p128. In white, k128 p128 k128 p128. In black, k128 p128 k128 p128. In
        white, k128 p128. In black, k128 p128 k128 p128 k128 p128. In white,
        k128 p128 k128 p128. In black, k128 p128. In white, k128 p128. In black,
        k128 p128. In white, k128 p128 k128 p128. In black, k128 p128 k128 p128
        k128 p128 k128 p128. In white, k128 p128 k128 p128. In black, k128 p128.
        In white, k128 p128 k128 p128 k128 p128 k128 p128. In black, k128 p128
        k128 p128. In white, k128 p128. In black, k128 p128. In white, k128 p128
        k128 p128. In black, k128 p128. In white, k128 p128 k128 p128. In black,
        k128 p128 k128 p128. In white, k128 p128. In black, k128 p128 k128 p128
        k128 p128. In white, k128 p128 k128 p128. In black, k128 p128 k128 p128.
        In white, k128 p128 k128 p128 k128 p128 k128 p128. In black, k128 p128.
        In white, k128 p128. In black, k128 p128. In white, k128 p128 k128 p128.
        In black, k128 p128. In white, k128 p128 k128 p128 k128 p128. In black,
        k128 p128 k128 p128 k128 p128 k128 p128. In white, k128 p128. In black,
        k128 p128. In white, k128 p128. In black, k128 p128. In white, k128 p128
        k128 p128 k128 p128 k128 p128. In black, k128 p128 k128 p128. In white,
        k128 p128. In black, k128 p128. In white, k128 p128 k128 p128. In black,
        k128 p128. In white, k128 p128 k128 p128. In black, k128 p128. In white,
        k128 p128 k128 p128. In black, k128 p128 k128 p128 k128 p128 k128 p128.
        In white, k128 p128. In black, k128 p128. In white, k128 p128 k128 p128.
        In black, k128 p128 k128 p128. In white, k128 p128 k128 p128. In black,
        k128 p128 k128 p128 k128 p128. In white, k128 p128. In black, k128 p128.
        In white, k128 p128 k128 p128. In black, k128 p128. In white, k128 p128.
        In black, k128 p128 k128 p128. In white, k128 p128 k128 p128 k128 p128
        k128 p128. In black, k128 p128. In white, k128 p128 k128 p128. In black,
        k128 p128 k128 p128. In white, k128 p128. In black, k128 p128. In white,
        k128 p128 k128 p128 k128 p128 k128 p128. In black, k128 p128. In white,
        k128 p128. In black, k128 p128 k128 p128. In white, k128 p128 k128 p128.
        In black, k128 p128. In white, k128 p128 k128 p128 k128 p128 k128 p128.
        In black, k128 p128 k128 p128. In white, k128 p128 k128 p128 k128 p128
        k128 p128. In black, k128 p128. In white, k128 p128. In black, k128
        p128. In white, k128 p128 k128 p128. In black, k128 p128. In white, k128
        p128 k128 p128 k128 p128 k128 p128. In black, k128 p128. In white, k128
        p128. In black, k128 p128 k128 p128. In white, k128 p128 k128 p128. In
        black, k128 p128 k128 p128. In white, k128 p128. In black, k128 p128
        k128 p128. In white, k128 p128. In black, k128 p128 k128 p128 k128 p128
        k128 p128. In white, k128 p128. In black, k128 p128. In white, k128
        p128. In black, k128 p128 k128 p128 k128 p128. In white, k128 p128 k128
        p128. In black, k128 p128 k128 p128. In white, k128 p128 k128 p128. In
        black, k128 p128. In white, k128 p128 k128 p128 k128 p128 k128 p128. In
        black, k128 p128 k128 p128. In white, k128 p128. In black, k128 p128. In
        white, k128 p128 k128 p128. In black, k128 p128. In white, k128 p128. In
        black, k128 p128. In white, k128 p128 k128 p128. In black, k128 p128
        k128 p128. In white, k128 p128 k128 p128 k128 p128 k128 p128. In black,
        k128 p128 k128 p128. In white, k128 p128 k128 p128 k128 p128 k128 p128.
        In black, k128 p128. In white, k128 p128 k128 p128. In black, k128 p128.
        In white, k128 p128. In black, k128 p128. In white, k128 p128 k128 p128
        k128 p128 k128 p128. In black, k128 p128 k128 p128. In white, k128 p128.
        In black, k128 p128. In white, k128 p128 k128 p128. In black, k128 p128.
        In white, k128 p128 k128 p128 k128 p128 k128 p128. In black, k128 p128.
        In white, k128 p128 k128 p128. In black, k128 p128 k128 p128. In white,
        k128 p128. In black, k128 p128. In white, k128 p128. In black, k128
        p128. In white, k128 p128 k128 p128. In black, k128 p128 k128 p128. In
        white, k128 p128 k128 p128 k128 p128 k128 p128. In black, k128 p128. In
        white, k128 p128. In black, k128 p128 k128 p128. In white, k128 p128
        k128 p128. In black, k128 p128. In white, k128 p128 k128 p128 k128 p128
        k128 p128. In black, k128 p128 k128 p128 k128 p128 k128 p128. In white,
        k128 p128 k128 p128. In black, k128 p128. In white, k128 p128. In black,
        k128 p128. In white, k128 p128 k128 p128. In black, k128 p128. In white,
        k128 p128. In black, k128 p128 k128 p128. In white, k128 p128 k128 p128.
        In black, k128 p128. In white, k128 p128 k128 p128 k128 p128 k128 p128.
        In black, k128 p128. In white, k128 p128. In black, k128 p128. In white,
        k128 p128 k128 p128. In black, k128 p128 k128 p128. In white, k128 p128
        k128 p128 k128 p128 k128 p128. In black, k128 p128 k128 p128. In white,
        k128 p128 k128 p128 k128 p128 k128 p128. In black, k128 p128. In white,
        k128 p128 k128 p128. In black, k128 p128. In white, k128 p128. In black,
        k128 p128 k128 p128. In white, k128 p128 k128 p128 k128 p128 k128 p128.
        In black, k128 p128. In white, k128 p128. In black, k128 p128. In white,
        k128 p128 k128 p128. In black, k128 p128. In white, k128 p128 k128 p128
        k128 p128. In black, k128 p128 k128 p128 k128 p128 k128 p128. In white,
        k128 p128. In black, k128 p128. In white, k128 p128. In black, k128
        p128. In white, k128 p128 k128 p128. In black, k128 p128 k128 p128 k128
        p128 k128 p128. In white, k128 p128. In black, k128 p128. In white, k128
        p128 k128 p128. In black, k128 p128. In white, k128 p128. In black, k128
        p128 k128 p128 k128 p128 k128 p128. In white, k128 p128 k128 p128. In
        black, k128 p128. In white, k128 p128 k128 p128. In black, k128 p128
        k128 p128. In white, k128 p128 k128 p128 k128 p128. In black, k128 p128
        k128 p128 k128 p128. In white, k128 p128. In black, k128 p128. In white,
        k128 p128. In black, k128 p128 k128 p128. Cast off 128sts in white.
      </p>
    </>
  );
};

export default Puzzle;

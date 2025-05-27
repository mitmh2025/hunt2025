import React from "react";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
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
      {archiveMode && (
        <AuthorsNoteBlock>
          <p>
            This puzzle involves URLs which may no longer be available. We have
            included the original puzzle below, but have also produced an
            alternate version which will continue working with the Hunt as
            hosted in the archives:
          </p>

          <p>
            Cast on 128 sts in white. In black, k128 p128 k128 p128. Switch to
            white. k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128 k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128 k128 p128 k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128
            k128 p128. Switch to white. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128 k128 p128 k128 p128 k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128. Switch to white. k128 p128
            k128 p128. Switch to black. k128 p128. Switch to white. k128 p128
            k128 p128. Switch to black. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128 k128 p128. Switch to black. k128 p128 k128 p128 k128 p128 k128
            p128. Switch to white. k128 p128 k128 p128. Switch to black. k128
            p128 k128 p128 k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128 k128 p128. Switch to white. k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128 k128 p128 k128 p128. Switch to white. k128 p128
            k128 p128. Switch to black. k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128 k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128 k128 p128 k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128 k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128 k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to white. k128 p128. Switch to black.
            k128 p128 k128 p128. Switch to white. k128 p128. Switch to black.
            k128 p128 k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128. Switch to white. k128 p128. Switch to black. k128
            p128. Switch to white. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128 k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128
            k128 p128. Switch to white. k128 p128 k128 p128. Switch to black.
            k128 p128 k128 p128 k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128 k128 p128 k128 p128 k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128 k128 p128. Switch to
            white. k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128. Switch to black. k128 p128. Switch to white. k128 p128 k128
            p128 k128 p128 k128 p128. Switch to black. k128 p128 k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to white. k128 p128. Switch to black.
            k128 p128. Switch to white. k128 p128 k128 p128. Switch to black.
            k128 p128. Switch to white. k128 p128 k128 p128. Switch to black.
            k128 p128 k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128 k128 p128 k128 p128. Switch to white. k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128 k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128 k128 p128 k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128
            k128 p128. Switch to white. k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128
            k128 p128 k128 p128 k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128. Switch to white. k128 p128. Switch to black. k128
            p128 k128 p128 k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128 k128 p128. Switch to white. k128 p128
            k128 p128. Switch to black. k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128 k128 p128 k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128
            k128 p128. Switch to white. k128 p128. Switch to black. k128 p128
            k128 p128. Switch to white. k128 p128 k128 p128. Switch to black.
            k128 p128 k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128 k128 p128 k128 p128. Switch to white. k128 p128
            k128 p128. Switch to black. k128 p128. Switch to white. k128 p128.
            Switch to black. k128 p128 k128 p128. Switch to white. k128 p128.
            Switch to black. k128 p128 k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128 k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128 k128 p128. Switch to black. k128 p128
            k128 p128. Switch to white. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128 k128 p128 k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128 k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to white. k128 p128. Switch to black.
            k128 p128. Switch to white. k128 p128 k128 p128. Switch to black.
            k128 p128. Switch to white. k128 p128. Switch to black. k128 p128
            k128 p128 k128 p128. Switch to white. k128 p128 k128 p128. Switch to
            black. k128 p128 k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to black. k128 p128 k128 p128. Switch to
            white. k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128 k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128. Switch to black. k128 p128. Switch to white. k128 p128 k128
            p128. Switch to black. k128 p128 k128 p128. Switch to white. k128
            p128 k128 p128 k128 p128 k128 p128. Switch to black. k128 p128 k128
            p128. Switch to white. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128. Switch to white. k128 p128 k128 p128 k128 p128
            k128 p128. Switch to black. k128 p128 k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128. Switch to white. k128 p128
            k128 p128. Switch to black. k128 p128. Switch to white. k128 p128
            k128 p128 k128 p128 k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128 k128 p128. Switch to black. k128 p128 k128 p128. Switch to
            white. k128 p128 k128 p128 k128 p128 k128 p128. Switch to black.
            k128 p128. Switch to white. k128 p128. Switch to black. k128 p128
            k128 p128. Switch to white. k128 p128 k128 p128. Switch to black.
            k128 p128. Switch to white. k128 p128 k128 p128 k128 p128 k128 p128.
            Switch to black. k128 p128 k128 p128 k128 p128 k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128 k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128. Switch to black. k128 p128 k128 p128. Switch to white. k128
            p128 k128 p128. Switch to black. k128 p128. Switch to white. k128
            p128 k128 p128 k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128 k128 p128.
            Switch to white. k128 p128 k128 p128 k128 p128 k128 p128. Switch to
            black. k128 p128 k128 p128. Switch to white. k128 p128 k128 p128
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128. Switch to white.
            k128 p128. Switch to black. k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128 k128 p128 k128 p128. Switch to black. k128 p128.
            Switch to white. k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128. Switch to black. k128 p128. Switch to
            white. k128 p128 k128 p128 k128 p128. Switch to black. k128 p128
            k128 p128 k128 p128 k128 p128. Switch to white. k128 p128. Switch to
            black. k128 p128. Switch to white. k128 p128. Switch to black. k128
            p128. Switch to white. k128 p128 k128 p128. Switch to black. k128
            p128 k128 p128 k128 p128 k128 p128. Switch to white. k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128 k128 p128.
            Switch to black. k128 p128. Switch to white. k128 p128 k128 p128
            k128 p128. Switch to black. k128 p128. Switch to white. k128 p128
            k128 p128. Switch to black. k128 p128 k128 p128. Switch to white.
            k128 p128 k128 p128. Switch to black. k128 p128 k128 p128. Switch to
            white. k128 p128 k128 p128 k128 p128. Switch to black. k128 p128
            k128 p128 k128 p128. Switch to white. k128 p128. Switch to black.
            k128 p128. Switch to white. k128 p128. Switch to black. k128 p128
            k128 p128. Cast off 128sts in white.
          </p>
        </AuthorsNoteBlock>
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

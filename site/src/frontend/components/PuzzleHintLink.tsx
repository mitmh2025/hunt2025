import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../lib/api/client";
import rootUrl from "../utils/rootUrl";

const HintLinkWrapper = styled.div`
  margin-top: 1rem;
`;

export default function PuzzleHintLink({
  slug,
  puzzleState,
}: {
  slug: string;
  puzzleState: TeamHuntState["puzzles"][string];
}) {
  const hintsUnlockedAt = puzzleState.hints_unlocked_at;
  const solved = !!puzzleState.answer;

  const [unlocked, setUnlocked] = useState(
    hintsUnlockedAt && new Date(hintsUnlockedAt).getTime() < Date.now(),
  );

  useEffect(() => {
    if (hintsUnlockedAt && !unlocked) {
      const interval = setInterval(() => {
        if (new Date(hintsUnlockedAt).getTime() < Date.now()) {
          setUnlocked(true);
        }
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }

    return () => {
      // noop
    };
  }, [hintsUnlockedAt, unlocked]);

  if (solved || !hintsUnlockedAt) {
    return null;
  }

  if (unlocked) {
    return (
      <HintLinkWrapper>
        <a href={`${rootUrl}/puzzles/${slug}/hints`}>
          Hints are available for this puzzle.
        </a>
      </HintLinkWrapper>
    );
  }

  return (
    <HintLinkWrapper>
      Hints will be available for this puzzle at{" "}
      {new Date(hintsUnlockedAt).toLocaleString("en-US", {
        timeZone: "America/New_York",
      })}
    </HintLinkWrapper>
  );
}

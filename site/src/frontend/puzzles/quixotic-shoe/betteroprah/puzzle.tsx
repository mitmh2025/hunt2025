import React from "react";
import { styled } from "styled-components";
import { mainPuzzleAccessGates } from "..";
import type { TeamHuntState } from "../../../../../lib/api/client";
import Dropquote from "../../../components/Dropquote";
import { HScrollTableWrapper } from "../../../components/StyledUI";
import { BETTEROPRAH_LABELS } from "./data";

const LETTERBANKS = [
  "ACLNTU",
  "ENNOU",
  "CIIVY",
  "EHKMNOT",
  "ERUYY",
  "AILS",
  "CEFIIRS",
  "AEFL",
  "AABEFMN",
  "ERY",
  "FHLMS",
  "AAAAIOR",
  "ELOPTWY",
  "MNOPTV",
  "EEENT",
  "EHNRTT",
  "AHRST",
  "EHNOTU",
  "AEFIIK",
  "MNOT",
  "EFFPY",
  "AEOOR",
  "EINRTUV",
  "EGHPS",
  "AEFIRY",
  "OORVWY",
  "AEHRW",
  "CENOST",
  "EHIINRT",
  "HLNOOS",
  "ADGINOS",
  "LST",
  "DEEIOS",
  "IOPS",
  "ELPS",
  "IOOTVW",
  "AEHRV",
  "CEENNT",
].map((col) => col.split(""));

const Arrow = styled.span`
  color: var(--black);
`;

const StyledDropquote = styled(Dropquote)`
  width: 1520px;
`;

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const mainPuzzleUnlocked = (teamState.rounds.paper_trail?.gates ?? []).some(
    (gate) => mainPuzzleAccessGates.has(gate),
  );
  return (
    <>
      {mainPuzzleUnlocked && (
        <p>
          <Arrow>←</Arrow>{" "}
          <a href="/puzzles/and_now_a_puzzling_word_from_our_sponsors">
            Back to main puzzle
          </a>
        </p>
      )}
      <HScrollTableWrapper>
        <StyledDropquote
          letterbanks={LETTERBANKS}
          labels={BETTEROPRAH_LABELS}
        />
      </HScrollTableWrapper>
    </>
  );
};

export default Puzzle;

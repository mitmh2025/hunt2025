import React from "react";
import { styled } from "styled-components";
import Dropquote from "../../../components/Dropquote";
import { HScrollTableWrapper } from "../../../components/StyledUI";
import rootUrl from "../../../utils/rootUrl";
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
  "AEFIRT",
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

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a
          href={`${rootUrl}/puzzles/and_now_a_puzzling_word_from_our_sponsors`}
        >
          Back to main puzzle
        </a>
      </p>
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

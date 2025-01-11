import { styled } from "styled-components";
import Bg from "../rounds/paper_trail/assets/bg.png";
import BottomBg from "../rounds/paper_trail/assets/bottom.png";
import TopBg from "../rounds/paper_trail/assets/top.png";
import {
  PuzzleHeader,
  PuzzleMain,
  PuzzleWrapper,
  PuzzleFooter,
} from "./PuzzleLayout";
import { SolutionAnswer, SolutionAcknowledgementBlock } from "./SolutionLayout";

export const bg = "#403A36";
export const contentBg = "#E0D6D5";

export const PaperTrailWrapper = styled(PuzzleWrapper)`
  background-color: ${contentBg};
  background-image: url(${Bg}), url(${BottomBg});
  background-size: 100% auto;
  background-repeat: repeat-y, no-repeat;
  font-family: "Kiwi Maru";
`;

// This also relies on the PaperTrailFonts component
export const PaperTrailHeader = styled(PuzzleHeader)`
  background-color: transparent;
  background-image: url(${TopBg});
  background-size: 100% auto;
  background-repeat: no-repeat;

  h1 {
    margin-left: 40px;
    font-family: "Kiwi Maru";
    font-weight: 500;
  }

  .solved-stamp {
    opacity: 0.5;
  }

  #puzzle-guess-section {
    background-color: #65413ad0;
    margin-top: -8px;
    margin-left: 42px;
    color: var(--white);

    table {
      margin-left: 9px;
    }

    tr td {
      font-weight: 300;
    }

    .answer-attempt {
      font-weight: 500;
    }
  }
`;

export const PaperTrailMain = styled(PuzzleMain)`
  font-family: var(--body-font);
  padding: 2rem calc(2rem + 40px);
  padding-bottom: 5rem;
`;

export const PaperTrailFooter = styled(PuzzleFooter)`
  height: 91px;
  background-color: ${contentBg};
  background-image: url(${BottomBg});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const PaperTrailAnswer = styled(SolutionAnswer)`
  margin-left: 40px;
`;

export const PaperTrailAcknowledgementBlock = styled(
  SolutionAcknowledgementBlock,
)`
  margin-left: 40px;
`;

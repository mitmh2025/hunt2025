import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { Pin } from "../hub/HubBody";
import PinImg from "../hub/assets/pin_teal.png";
import { MissingDiamondPuzzleWitness } from "../rounds/missing_diamond/MissingDiamondBody";
import { type MissingDiamondState } from "../rounds/missing_diamond/types";
import { deviceMax } from "../utils/breakpoints";
import {
  PuzzleBacklink,
  PuzzleHeader,
  PuzzleMain,
  PuzzleTitle,
  PuzzleTitleWrapper,
  PuzzleWrapper,
} from "./PuzzleLayout";
import { SolutionAnswer, SolutionAcknowledgementBlock } from "./SolutionLayout";
import BgLeft from "./missingDiamondAssets/bg-left.png";
import BgRight from "./missingDiamondAssets/bg-right.png";
import HeaderBg from "./missingDiamondAssets/roads-header.png";

const MISSING_DIAMOND_SPECIAL_PURPLE = "#b295bf";

export const MissingDiamondWrapper = styled(PuzzleWrapper)`
  background: var(--white);
`;

export const MissingDiamondTitle = styled(PuzzleTitle)`
  padding-top: 0;
`;

export const MissingDiamondBacklink = styled(PuzzleBacklink)`
  &:hover {
    color: var(--gold-800) !important;
    text-decoration-color: var(--gold-800) !important;
  }
`;

export const MissingDiamondTitleWrapper = styled(PuzzleTitleWrapper)`
  padding-top: 1em;
`;

export const MissingDiamondHeaderWrapper = styled(PuzzleHeader)`
  position: relative;
  background-image: url(${HeaderBg}), url(${BgLeft}), url(${BgRight});
  background-position: top, left, right;
  background-size:
    contain,
    3.8% auto,
    3.8% auto;
  background-repeat: no-repeat, repeat-y, repeat-y;
  background-color: ${MISSING_DIAMOND_SPECIAL_PURPLE};
  padding-left: 5rem;
  min-height: calc(421 / 2128 * 1080px);

  .witness-assets {
    img {
      position: absolute;
      right: 80px;
      top: 50px;

      width: 96px;
    }

    h3 {
      position: absolute;
      right: 22px;
      top: 172px;
      font-family: "Reenie Beanie";
      font-size: 1.6rem;
      padding: 0 4px;
      line-height: 1;
      background-color: var(--gray-100);
    }
  }

  .solved-stamp {
    right: 5em;
  }

  @media ${deviceMax.md} {
    padding-left: 7vw;
    padding-right: 7vw;

    h1 {
      font-size: 1.8rem;
      max-width: 72vw;
      padding-top: 0.5em;
    }

    .witness-assets {
      background: ${MISSING_DIAMOND_SPECIAL_PURPLE};
      border: 2px solid #856114;
      box-shadow:
        0 0 0 4px #c29f3a,
        0 0 0 6px #856114;
      border-radius: 2px;
      padding: 0.5rem 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      justify-self: center;
      align-self: start;

      img {
        position: relative;
        width: 80px;
        right: auto;
        top: auto;
      }

      h3 {
        position: relative;
        font-size: 1.5rem;
        right: auto;
        top: auto;
      }
    }
  }

  @media ${deviceMax.sm} {
    .witness-assets {
      h3 {
        font-size: 1.5rem;
      }
    }
  }

  #puzzle-guess-section {
    border: 2px solid #856114;
    box-shadow:
      0 0 0 4px var(--gray-100),
      0 0 0 6px #856114,
      0 0 2.5rem #6f4b80;
    border-radius: 2px;
    background: #c29f3a;
  }
`;

const CornerPin = styled(Pin)<{ $x: number; $y: number; $right?: boolean }>`
  top: ${(props) => `${props.$y}px`};
  left: ${(props) => (props.$right ? "auto" : `${props.$x}px`)};
  right: ${(props) => (props.$right ? `${props.$x}px` : "auto")};
  width: 18px;
`;

export const MissingDiamondMain = styled(PuzzleMain)`
  background: url(${BgLeft}), url(${BgRight});
  /* linear-gradient(
      90deg,
      ${MISSING_DIAMOND_SPECIAL_PURPLE} 1%,
      rgba(from ${MISSING_DIAMOND_SPECIAL_PURPLE} r g b / 0) 1%,
      rgba(from ${MISSING_DIAMOND_SPECIAL_PURPLE} r g b / 0) 99%,
      ${MISSING_DIAMOND_SPECIAL_PURPLE} 99%
    ); */
  background-position: left, right, top;
  background-size:
    3.8% auto,
    3.8% auto,
    cover;
  background-repeat: repeat-y;
`;

export const MissingDiamondAnswer = styled(SolutionAnswer)`
  margin-top: -1.5rem;
`;

export const getMissingDiamondHeader = ({
  state,
  slug,
}: {
  state: MissingDiamondState;
  slug: string;
}) => {
  const inlineScript = `window.initialMissingDiamondState = ${JSON.stringify(state)}; window.missingDiamondSlug = ${JSON.stringify(slug)}`;
  return function MissingDiamondHeader({ children }: { children: ReactNode }) {
    return (
      <MissingDiamondHeaderWrapper>
        {children}
        <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
        <div id="missing-diamond-puzzle-witness-root">
          <MissingDiamondPuzzleWitness state={state} slug={slug} />
        </div>
        <CornerPin $x={16} $y={16} src={PinImg} />
        <CornerPin $x={16} $y={16} $right={true} src={PinImg} />
      </MissingDiamondHeaderWrapper>
    );
  };
};

export const MissingDiamondAcknowledgementBlock = styled(
  SolutionAcknowledgementBlock,
)`
  max-width: 600px;
`;

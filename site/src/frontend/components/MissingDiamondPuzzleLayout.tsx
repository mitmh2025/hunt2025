import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import Pin from "../hub/assets/pin_teal.png";
import { deviceMax } from "../utils/breakpoints";
import { PuzzleHeader, PuzzleMain, PuzzleWrapper } from "./PuzzleLayout";
import BgLeft from "./missingDiamondAssets/bg-left.png";
import BgRight from "./missingDiamondAssets/bg-right.png";
import HeaderBg from "./missingDiamondAssets/roads-header.png";

const MISSING_DIAMOND_SPECIAL_PURPLE = "#b295bf";

export const MissingDiamondWrapper = styled(PuzzleWrapper)`
  background: var(--white);
`;

const MissingDiamondHeaderWrapper = styled(PuzzleHeader)`
  position: relative;
  background-image: url(${Pin}), url(${Pin}), url(${HeaderBg}), url(${BgLeft}),
    url(${BgRight});
  background-position:
    top 16px left 16px,
    top 16px right 16px,
    top,
    left,
    right;
  background-size:
    18px,
    18px,
    contain,
    3.8% auto,
    3.8% auto;
  background-repeat: no-repeat, no-repeat, no-repeat, repeat-y, repeat-y;
  background-color: ${MISSING_DIAMOND_SPECIAL_PURPLE};
  padding-left: 5rem;

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

export const getMissingDiamondHeader = ({
  witnessName,
  asset,
}: {
  witnessName: string;
  asset: string;
}) => {
  return function MissingDiamondHeader({ children }: { children: ReactNode }) {
    return (
      <MissingDiamondHeaderWrapper>
        {children}
        <div className="witness-assets">
          <img src={asset} alt="" />
          <h3>{witnessName}</h3>
        </div>
      </MissingDiamondHeaderWrapper>
    );
  };
};

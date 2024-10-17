import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { StakeoutFonts } from "../rounds/stakeout/StakeoutFonts";
import { PuzzleHeader, PuzzleMain, PuzzleWrapper } from "./PuzzleLayout";
import Bg from "./stakeoutAssets/envelope-bg.png";

export const StakeoutWrapper = styled(PuzzleWrapper)`
  background-color: transparent;
`;

const StakeoutHeaderInner = styled(PuzzleHeader)`
  background-color: var(--white);
  background-image: url("${Bg}");
  background-repeat: repeat;
  transform: rotate(-2deg);
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.3);
  margin-right: 1rem;
  border-radius: 0.25rem;

  h1 {
    font-family: "Just Another Hand";
    font-size: 4.5rem;
    margin: -0.5rem;
    position: relative;
    text-align: center;
    color: var(--true-black);
  }

  h1::after {
    width: 82%;
    height: 0.9em;
    background-color: var(--highlighter);
    opacity: 0.5;
    content: " ";
    position: absolute;
    top: 0.6em;
    right: 10%;
    transform: rotate(-3deg);
  }

  #puzzle-guess-section {
    background-color: rgba(248, 248, 246, 0.85);
    transform: rotate(1deg) translateX(2rem);
    padding-bottom: 2rem;
  }
`;

export const StakeoutHeader = (props: { children: ReactNode }) => {
  const { children, ...rest } = props;
  return (
    <StakeoutHeaderInner {...rest}>
      <StakeoutFonts />
      {children}
    </StakeoutHeaderInner>
  );
};

export const StakeoutMain = styled(PuzzleMain)`
  border: 1.85rem solid var(--white);
  border-bottom-width: 5.85rem;
  padding: 0.15rem;
  border-radius: 0.5rem;
  background-color: #f8f8f6dd;
  background: linear-gradient(
    25deg,
    rgba(248, 248, 246, 0.98) 0%,
    rgba(248, 248, 246, 0.8) 80%
  );
`;

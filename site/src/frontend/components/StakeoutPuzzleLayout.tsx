import { styled } from "styled-components";
import { deviceMax } from "../utils/breakpoints";
import { PuzzleHeader, PuzzleMain, PuzzleWrapper } from "./PuzzleLayout";
import Bg from "./stakeoutAssets/envelope-bg.png";

export const StakeoutWrapper = styled(PuzzleWrapper)`
  background-color: transparent;
`;

export const StakeoutHeader = styled(PuzzleHeader)`
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

  .solved-stamp {
    top: 1em;
    transform: rotate(8deg);
  }

  #puzzle-guess-section {
    background-color: rgba(248, 248, 246, 0.85);
    transform: rotate(1deg) translateX(2rem);
    padding-bottom: 2rem;
  }
`;

export const StakeoutMain = styled(PuzzleMain)`
  border: 1.85rem solid var(--white);
  border-bottom-width: 5.85rem;
  border-radius: 0.5rem;

  @media (${deviceMax.sm}) {
    border-left-width: 0.25rem;
    border-right-width: 0.25rem;
  }

  background-image: linear-gradient(
    25deg,
    rgba(248, 248, 246, 0.98) 0%,
    rgba(248, 248, 246, 0.8) 80%
  );
  background-color: #ffffff00;
`;

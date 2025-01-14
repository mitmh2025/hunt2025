import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import BorderBottom from "../rounds/murder_in_mitropolis/assets/border-bottom.svg";
import BorderSide from "../rounds/murder_in_mitropolis/assets/border-side.svg";
import Border from "../rounds/murder_in_mitropolis/assets/border.svg";
import Skyline from "../rounds/murder_in_mitropolis/assets/skyline.svg";
import { deviceMax } from "../utils/breakpoints";
import {
  PuzzleBacklink,
  PuzzleHeader,
  PuzzleMain,
  PuzzleTitle,
  PuzzleTitleWrapper,
} from "./PuzzleLayout";
import { SolutionAnswer, SolutionAcknowledgementBlock } from "./SolutionLayout";
import Spoiler from "./Spoiler";
import { darkBgLinkStyles } from "./StyledUI";

// This also relies on the MurderFonts component
export const MurderHeader = styled(PuzzleHeader)`
  background-color: var(--purple-800);
  background-image: url(${Border}), url(${Skyline});
  background-repeat: repeat-x;
  background-position-y: top, bottom;
  background-position-x:
    0,
    -2rem;
  background-size:
    1.75rem auto,
    auto 11rem;

  @media ${deviceMax.md} {
    padding-top: 2rem;
  }

  @media ${deviceMax.sm} {
    padding-top: 1rem;
    background-size:
      1.25rem auto,
      auto 9rem;
  }

  h1 {
    font-family: "Eccentric";
    font-size: 3rem;
    color: var(--gold-500);
  }

  .solved-stamp {
    color: var(--red-500);
    fill: var(--red-500);
    opacity: 0.6;
  }

  #puzzle-guess-section {
    color: var(--gold-400);
    background-color: var(--teal-600);
    background-image: url(${BorderBottom}), url(${BorderBottom});
    background-repeat: repeat-x;
    background-position-y: top, bottom;
    background-size: 0.2rem auto;
    border-left: 1px solid var(--gold-700);
    border-right: 1px solid var(--gold-700);
    box-shadow: 0.5rem 0.5rem 0px #00000033;
    font-family: "Eccentric";
    font-size: 2rem;

    margin: 0 auto;
    max-width: 600px;

    label {
      margin-bottom: -0.5rem;
    }

    table {
      font-family: var(--body-font);
      font-size: 1rem;
    }

    a {
      font-family: var(--body-font);
      font-size: 1rem;
      ${darkBgLinkStyles}
    }
  }
`;

export const MurderTitleWrapper = styled(PuzzleTitleWrapper)`
  margin-top: 1rem;
`;

export const MurderTitle = styled(PuzzleTitle)`
  padding-top: 0;
`;

export const MurderBacklink = styled(PuzzleBacklink)`
  font-size: 1.25rem;
  font-family: "Eccentric";
  color: var(--teal-300);
  text-decoration-color: var(--teal-300);
  &:hover {
    color: var(--teal-200);
    text-decoration-color: var(--teal-200);
  }
`;

export const MurderMain = styled(PuzzleMain)`
  background-image: url(${BorderSide}), url(${BorderSide});
  background-repeat: repeat-y;
  background-position-x: left, right;
  background-position-y: -0.5rem;
  background-size: 2rem auto;
  padding-left: 3rem;
  padding-right: 3rem;
  border-top: 0.5rem solid var(--gold-700);
  border-bottom: 0.5rem solid var(--gold-700);
`;

export const MurderAnswer = styled(SolutionAnswer)`
  color: var(--gold-500);
`;

export const MurderAcknowledgementBlock = styled(SolutionAcknowledgementBlock)`
  color: var(--gold-500);
`;

export const MurderSpoiler = ({ children }: { children: ReactNode }) => {
  return <Spoiler opaqueColor="var(--gold-500)">{children}</Spoiler>;
};

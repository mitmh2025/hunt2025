import { styled } from "styled-components";
import { PuzzleHeader, PuzzleMain, PuzzleWrapper } from "./PuzzleLayout";
import { SolutionAnswer, SolutionAcknowledgementBlock } from "./SolutionLayout";

const BaseIllegalSearchHeader = styled(PuzzleHeader)`
  background: #65705699;

  h1 {
    @media screen {
      color: var(--white);
    }

    font-size: 3rem;
    padding-top: 0;
    padding-bottom: 0;
    font-weight: 400;
    font-family: "Alegreya SC";
  }

  .solved-stamp {
    color: var(--red-800);
    fill: var(--red-800);
    opacity: 0.8;
  }

  #puzzle-guess-section {
    background-color: #461f09;
    border: 0.5px solid #5b290f;
    border-top-width: 1px;
    border-bottom-width: 2px;
    box-shadow:
      0 -1px 0 2px #2e1101,
      0 1px 0 4px #2e1101,
      -3px 0 0 4px #3e1903,
      3px 0 0 4px #3e1903,
      -1px 0 0 6px #4d230d,
      1px 0 0 6px #4d230d,
      0 1px 0 6px #5b290f;
    font-family: "Alegreya SC";
    font-size: 1.25rem;
    color: var(--gray-100);

    input {
      background-color: var(--gray-100);
    }

    button {
      font-family: "Alegreya SC";
      font-size: 1.25rem;
    }
  }
`;

export const BlacklightIllegalSearchHeader = styled(BaseIllegalSearchHeader)`
  background: linear-gradient(
    61deg,
    #1313136b 0%,
    #1615166b 28%,
    rgba(72, 62, 80, 0) 58%,
    rgba(72, 62, 80, 0) 69%,
    #1615166b 94%,
    #1313136b 100%
  );

  h1 {
    text-shadow:
      0.25em 0.065em 0.06em #3d0a4933,
      -0.25em 0.06em 0.06em var(--purple-900),
      0 0 0.5em #e993ff,
      0 0 0.75em #ffffff88,
      0 0 1em black;
  }

  .blacklight-solved-stamp {
    color: #e993ff;
    fill: #e993ff;
    transform: rotate(-9deg);
    top: 1.2em;
    right: 1.5em;
  }

  #second-puzzle-guess-section {
    background-color: #e5ceef8e;
    background: linear-gradient(
      60deg,
      #1a032d9a 0%,
      #9348fc20 26%,
      #a673f31f 58%,
      #1a032d9a 90%
    );
    border: 2px dotted #e6bef4;
    box-shadow: 0 0 1rem #e993ffc4;
    font-size: 1.25rem;
    color: #f6dbff;
    letter-spacing: 1px;

    input {
      background-color: #19111c;
      color: #f9f5fc;
      letter-spacing: 1px;
    }

    button {
      font-family: "Alegreya SC";
      font-size: 1.25rem;
      letter-spacing: 1px;
    }
  }

  #puzzle-guess-section {
    background-color: #0f0f1a;
    background: linear-gradient(
      60deg,
      #14131b 0%,
      #15141b 26%,
      #2d2937 60%,
      #14131b 87%
    );
    border: 0.5px solid #161627;
    border-top-width: 1px;
    border-bottom-width: 2px;
    box-shadow:
      0 -1px 0 2px #15131f,
      0 1px 0 4px #15131f,
      -3px 0 0 4px #1f1c2d,
      3px 0 0 4px #1f1c2d,
      -1px 0 0 6px #2a273d,
      1px 0 0 6px #2a273d,
      0 1px 0 6px #302e3e,
      -2px 12px 10px 12px #05040799;
    font-size: 1.25rem;
    color: #d3cbdf;

    button {
      font-family: "Alegreya SC";
      font-size: 1.25rem;
    }
  }
`;

export const IllegalSearchHeader = styled(BaseIllegalSearchHeader)``;

const BaseIllegalSearchWrapper = styled(PuzzleWrapper)`
  background-color: #657056;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='88' viewBox='0 0 80 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 21.91V26h-2c-9.94 0-18 8.06-18 18 0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73 3.212-6.99 9.983-12.008 18-12.73V62h2c9.94 0 18-8.06 18-18 0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73-3.212 6.99-9.983 12.008-18 12.73zM54 58v4.696c-5.574 1.316-10.455 4.428-14 8.69-3.545-4.262-8.426-7.374-14-8.69V58h-5.993C12.27 58 6 51.734 6 44c0-7.732 6.275-14 14.007-14H26v-4.696c5.574-1.316 10.455-4.428 14-8.69 3.545 4.262 8.426 7.374 14 8.69V30h5.993C67.73 30 74 36.266 74 44c0 7.732-6.275 14-14.007 14H54zM42 88c0-9.94 8.06-18 18-18h2v-4.09c8.016-.722 14.787-5.738 18-12.73v7.434c-3.545 4.262-8.426 7.374-14 8.69V74h-5.993C52.275 74 46 80.268 46 88h-4zm-4 0c0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73v7.434c3.545 4.262 8.426 7.374 14 8.69V74h5.993C27.73 74 34 80.266 34 88h4zm4-88c0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73v-7.434c-3.545-4.262-8.426-7.374-14-8.69V14h-5.993C52.27 14 46 7.734 46 0h-4zM0 34.82c3.213-6.992 9.984-12.008 18-12.73V18h2c9.94 0 18-8.06 18-18h-4c0 7.732-6.275 14-14.007 14H14v4.696c-5.574 1.316-10.455 4.428-14 8.69v7.433z' fill='%23ffd65d' fill-opacity='0.48' fill-rule='evenodd'/%3E%3C/svg%3E");
`;

export const BlacklightIllegalSearchWrapper = styled(BaseIllegalSearchWrapper)`
  background-color: #232420;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='88' viewBox='0 0 80 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 21.91V26h-2c-9.94 0-18 8.06-18 18 0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73 3.212-6.99 9.983-12.008 18-12.73V62h2c9.94 0 18-8.06 18-18 0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73-3.212 6.99-9.983 12.008-18 12.73zM54 58v4.696c-5.574 1.316-10.455 4.428-14 8.69-3.545-4.262-8.426-7.374-14-8.69V58h-5.993C12.27 58 6 51.734 6 44c0-7.732 6.275-14 14.007-14H26v-4.696c5.574-1.316 10.455-4.428 14-8.69 3.545 4.262 8.426 7.374 14 8.69V30h5.993C67.73 30 74 36.266 74 44c0 7.732-6.275 14-14.007 14H54zM42 88c0-9.94 8.06-18 18-18h2v-4.09c8.016-.722 14.787-5.738 18-12.73v7.434c-3.545 4.262-8.426 7.374-14 8.69V74h-5.993C52.275 74 46 80.268 46 88h-4zm-4 0c0-9.943-8.058-18-18-18h-2v-4.09c-8.012-.722-14.785-5.738-18-12.73v7.434c3.545 4.262 8.426 7.374 14 8.69V74h5.993C27.73 74 34 80.266 34 88h4zm4-88c0 9.943 8.058 18 18 18h2v4.09c8.012.722 14.785 5.738 18 12.73v-7.434c-3.545-4.262-8.426-7.374-14-8.69V14h-5.993C52.27 14 46 7.734 46 0h-4zM0 34.82c3.213-6.992 9.984-12.008 18-12.73V18h2c9.94 0 18-8.06 18-18h-4c0 7.732-6.275 14-14.007 14H14v4.696c-5.574 1.316-10.455 4.428-14 8.69v7.433z' fill='%23decbdf' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
`;

export const IllegalSearchWrapper = styled(BaseIllegalSearchWrapper)``;

const BaseIllegalSearchMain = styled(PuzzleMain)`
  background-color: #ecd89dee;
  color: rgb(22, 9, 4);

  hr {
    border-color: #657056;
  }
`;

export const BlacklightIllegalSearchMain = styled(BaseIllegalSearchMain)`
  background-color: #dbc3fbe8;
`;

export const IllegalSearchMain = styled(BaseIllegalSearchMain)``;

export const IllegalSearchAnswer = styled(SolutionAnswer)`
  color: var(--white);
`;

export const IllegalSearchAcknowledgementBlock = styled(
  SolutionAcknowledgementBlock,
)`
  color: var(--white);
`;

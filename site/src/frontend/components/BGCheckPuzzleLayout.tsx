import { styled } from "styled-components";
import { PuzzleHeader, PuzzleMain, PuzzleWrapper } from "./PuzzleLayout";

export const BGCheckWrapper = styled(PuzzleWrapper)`
  background: #251214;
  color: #251214;

  a {
    color: #db5f00;
    text-decoration: underline dotted #db5f00;

    &:hover {
      color: rgb(229, 108, 15);
      text-decoration-color: rgb(229, 108, 15);
    }
  }
`;

export const BGCheckHeader = styled(PuzzleHeader)`
  background-color: #a4b9b9;
  font-family: "Marcellus", "Perpetua", "Times New Roman", "Times", serif;

  h1 {
    font-family: "Marcellus SC", "Perpetua", "Times New Roman", "Times", serif;
    letter-spacing: 3px;
  }

  #puzzle-guess-section {
    background-color: rgb(239, 232, 229);

    label,
    input[type="text"],
    button {
      font-family: "Marcellus", "Perpetua", "Times New Roman", "Times", serif;
      font-size: 1.2rem;
      line-height: 1.25;
    }

    button {
      font-family: "Marcellus SC", "Perpetua", "Times New Roman", "Times", serif;
      letter-spacing: 1px;
    }

    input {
      box-shadow: 0 0 0 2px #a4b9b9;

      &:focus-visible {
        outline-color: #fcb851;
      }
    }

    button {
      background: #fcb851;
      background: linear-gradient(180deg, #fcb851 0%, #e06e16 100%);
      color: #251214;
      border: none;
      height: 4rem;
      padding: 0.5rem 0.75rem;
      border-radius: 2rem;
      box-shadow: 0px 1px 3px hsl(from var(--black) h s l / 0.8);

      &:hover {
        background: #ffc555;
        background: linear-gradient(180deg, #ffc555 0%, #e08416 100%);
        color: var(--true-black);

        box-shadow: 0px 2px 8px hsl(from var(--black) h s l / 0.5);
      }

      &:focus-visible {
        box-shadow: 0 0 0 0.25rem #251214;
      }
    }
  }
`;

export const BGCheckMain = styled(PuzzleMain)`
  background-color: #cdd6d5;
  font-family: "Times New Roman", "Times", "Garamond", serif;
`;

import { styled } from "styled-components";
import BorderBottom from "../rounds/murder_in_mitropolis/assets/border-bottom.svg";
import BorderSide from "../rounds/murder_in_mitropolis/assets/border-side.svg";
import Border from "../rounds/murder_in_mitropolis/assets/border.svg";
import Skyline from "../rounds/murder_in_mitropolis/assets/skyline.svg";
import { PuzzleHeader, PuzzleMain } from "./PuzzleLayout";

// This also relies on the MurderFonts component
export const MurderHeader = styled(PuzzleHeader)`
  background-color: #2b1234;
  background-image: url(${Border}), url(${Skyline});
  background-repeat: repeat-x;
  background-position-y: top, bottom;
  background-position-x:
    0,
    -2rem;
  background-size:
    1.75rem auto,
    auto 11rem;

  h1 {
    font-family: "Eccentric";
    font-size: 3rem;
    color: var(--gold-500);
  }

  #puzzle-guess-section {
    color: #e8e2ea;
    background-color: #16494e;
    background-image: url(${BorderBottom}), url(${BorderBottom});
    background-repeat: repeat-x;
    background-position-y: top, bottom;
    background-size: 0.2rem auto;
    border-left: 1px solid var(--gold-700);
    border-right: 1px solid var(--gold-700);
    box-shadow: 0.5rem 0.5rem 0px #00000033;
    font-family: "Eccentric";
    font-size: 2rem;

    label {
      margin-bottom: -0.5rem;
    }

    table {
      font-family: var(--body-font);
      font-size: 1rem;
    }
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

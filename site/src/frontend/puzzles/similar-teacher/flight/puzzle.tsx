import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";
import back from "./assets/back.jpg";
import front from "./assets/front.jpg";

const ImagesWrapper = styled.p`
  display: flex;
  gap: 1em;
`;

const Arrow = styled.span`
  color: var(--red-500);
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a href="/puzzles/kindred_spirits">Back to main puzzle</a>
      </p>
      <AuthorsNoteBlock>
        <p>
          During Hunt, solvers who arrived at the Gala were given six mixtures
          labeled 1 through 6, each with three ingredients, all packaged in a
          silver paper wrapper. Solvers were provided with a list of possible
          ingredients, and warned not to consume any of the mixtures if they
          were allergic to or unwilling to consume any of said ingredients.
        </p>
        <ImagesWrapper>
          <LinkedImage src={front} alt="" />
          <LinkedImage src={back} alt="" />
        </ImagesWrapper>
        <p>
          For your convenience, here is the list of possible ingredients in
          text:
        </p>
        <p>
          Apple Juice, BBQ Sauce, Capers, Dill, Elderberry Juice, Fig Jam,
          Ginger, Horseradish, Instant Coffee, Jalapenos, Kale, Lime Juice,
          Mustard, Nutella, Olive Oil, Peppermint, Quail Egg, Rose Water,
          Sriracha, Tomato Juice, Urfa Biber, Vanilla Extract, Worcestershire
          Sauce, Xylitol, Yogurt, Za’atar
        </p>
        <p>
          If you would like to subject your fellow solvers to these “cocktails”,
          the recipes for each can be found below. Please note that we used
          regular ground coffee rather than instant coffee so that the grounds
          would be visible in the mixture.
        </p>
        <p>
          Drink 1:
          <ul>
            <li>1 oz elderberry juice</li>
            <li>2 oz lime juice</li>
            <li>40 g fig jam</li>
          </ul>
        </p>
        <p>
          Drink 2:
          <ul>
            <li>1 1/2 oz lime juice</li>
            <li>1 oz elderberry juice</li>
            <li>30 g Greek yogurt</li>
          </ul>
        </p>
        <p>
          Drink 3:
          <ul>
            <li>2 1/2 oz apple juice</li>
            <li>35 g Greek yogurt</li>
            <li>1 1/4 oz elderberry juice</li>
          </ul>
        </p>
        <p>
          Drink 4:
          <ul>
            <li>2 1/2 oz apple juice</li>
            <li>1 oz elderberry juice</li>
            <li>1 tsp rose water</li>
          </ul>
        </p>
        <p>
          Drink 5:
          <ul>
            <li>3 1/2 oz apple juice</li>
            <li>1/2 tsp ground coffee</li>
            <li>1 tsp rose water</li>
          </ul>
        </p>
        <p>
          Drink 6:
          <ul>
            <li>3 1/2 oz apple juice</li>
            <li>1/2 tsp ground coffee</li>
            <li>1 sprig dill</li>
          </ul>
        </p>
        <p>
          We used the following brands of packaged products:
          <ul>
            <li>Elderberry juice: Biotta</li>
            <li>Lime juice: ReaLime</li>
            <li>Fig jam: Dalmatia, until we ran out, then Bonne Maman</li>
            <li>
              Greek yogurt: mystery brand from Restaurant Depot; notably, it was
              overfat (10%)
            </li>
            <li>Apple juice: Mott’s</li>
            <li>Rose water: Fee Brothers</li>
            <li>Coffee: Folger’s</li>
          </ul>
        </p>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;

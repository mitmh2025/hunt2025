import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";
import Spoiler from "../../../components/Spoiler";
import back from "./assets/back.jpg";
import bottles from "./assets/bottles.jpg";
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
          <LinkedImage
            src={front}
            alt="A six-pack of small bottles wrapped in silver paper with an art deco design on them. The package is labeled Kindred Spirits."
          />
          <LinkedImage
            src={back}
            alt="A six-pack of small bottles wrapped in silver paper with an art deco design on them. The package reads: Kindred Spirits Flight Menu. As you’ve just learned, some of the best cocktails can be made with just 3 ingredients, and we’re trying to perfect our house gala cocktail in the same format. Taste these non-alcoholic drinks to learn what you’re meant to be. A menu of possible ingredients is below—please make sure that you are not allergic to or unwilling to consume any of the following ingredients before proceeding: Apple Juice, BBQ Sauce, Capers, Dill, Elderberry Juice, Fig Jam, Ginger, Horseradish, Instant Coffee, Jalapenos, Kale, Lime Juice, Mustard, Nutella, Olive Oil, Peppermint, Quail Egg, Rose Water, Sriracha, Tomato Juice, Urfa Biber, Vanilla Extract, Worcestershire Sauce, Xylitol, Yogurt, Za’atar"
          />
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
          the recipes for each can be found below, under the spoiler tags.
        </p>
        <p>
          When mixed, the cocktails should look approximately like the following
          (clockwise from bottom right: 1, 5, 6, 4, 2, 3):
        </p>
        <ImagesWrapper>
          <LinkedImage
            src={bottles}
            alt="Six small bottles, labeled 1-6, each of a rather unsettling color. A bunch of Mystery Hunters’ hands are visible around the cluster of bottles."
          />
        </ImagesWrapper>
        <p>
          <Spoiler>
            Please note that we used regular ground coffee rather than instant
            coffee so that the grounds would be visible in the mixture.
          </Spoiler>
        </p>
        <p>
          <Spoiler>Drink 1:</Spoiler>
          <ul>
            <li>
              <Spoiler>1 oz elderberry juice</Spoiler>
            </li>
            <li>
              <Spoiler>2 oz lime juice</Spoiler>
            </li>
            <li>
              <Spoiler>40 g fig jam</Spoiler>
            </li>
          </ul>
        </p>
        <p>
          <Spoiler>Drink 2:</Spoiler>
          <ul>
            <li>
              <Spoiler>1 1/2 oz lime juice</Spoiler>
            </li>
            <li>
              <Spoiler>1 oz elderberry juice</Spoiler>
            </li>
            <li>
              <Spoiler>30 g Greek yogurt</Spoiler>
            </li>
          </ul>
        </p>
        <p>
          <Spoiler>Drink 3:</Spoiler>
          <ul>
            <li>
              <Spoiler>2 1/2 oz apple juice</Spoiler>
            </li>
            <li>
              <Spoiler>35 g Greek yogurt</Spoiler>
            </li>
            <li>
              <Spoiler>1 1/4 oz elderberry juice</Spoiler>
            </li>
          </ul>
        </p>
        <p>
          <Spoiler>Drink 4:</Spoiler>
          <ul>
            <li>
              <Spoiler>2 1/2 oz apple juice</Spoiler>
            </li>
            <li>
              <Spoiler>1 oz elderberry juice</Spoiler>
            </li>
            <li>
              <Spoiler>1 tsp rose water</Spoiler>
            </li>
          </ul>
        </p>
        <p>
          <Spoiler>Drink 5:</Spoiler>
          <ul>
            <li>
              <Spoiler>3 1/2 oz apple juice</Spoiler>
            </li>
            <li>
              <Spoiler>1/2 tsp ground coffee</Spoiler>
            </li>
            <li>
              <Spoiler>1 tsp rose water</Spoiler>
            </li>
          </ul>
        </p>
        <p>
          <Spoiler>Drink 6:</Spoiler>
          <ul>
            <li>
              <Spoiler>3 1/2 oz apple juice</Spoiler>
            </li>
            <li>
              <Spoiler>1/2 tsp ground coffee</Spoiler>
            </li>
            <li>
              <Spoiler>1 sprig dill</Spoiler>
            </li>
          </ul>
        </p>
        <p>
          <Spoiler>We used the following brands of packaged products:</Spoiler>
          <ul>
            <li>
              <Spoiler>Elderberry juice: Biotta</Spoiler>
            </li>
            <li>
              <Spoiler>Lime juice: ReaLime</Spoiler>
            </li>
            <li>
              <Spoiler>
                Fig jam: Dalmatia, until we ran out, then Bonne Maman
              </Spoiler>
            </li>
            <li>
              <Spoiler>
                Greek yogurt: mystery brand from Restaurant Depot; notably, it
                was overfat (10%)
              </Spoiler>
            </li>
            <li>
              <Spoiler>Apple juice: Mott’s</Spoiler>
            </li>
            <li>
              <Spoiler>Rose water: Fee Brothers</Spoiler>
            </li>
            <li>
              <Spoiler>Coffee: Folger’s</Spoiler>
            </li>
          </ul>
        </p>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;

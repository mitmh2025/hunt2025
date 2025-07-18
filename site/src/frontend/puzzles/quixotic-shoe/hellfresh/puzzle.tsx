import React from "react";
import { styled } from "styled-components";
import rootUrl from "../../../utils/rootUrl";
import { HellfreshGrid } from "./HellfreshGrid";

const Arrow = styled.span`
  color: var(--black);
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a
          href={`${rootUrl}/puzzles/and_now_a_puzzling_word_from_our_sponsors`}
        >
          Back to main puzzle
        </a>
      </p>
      <HellfreshGrid />
      <h3>Ingredients</h3>
      <div>1 Leg on a tar fighter (4)</div>
      <div>4 Eddy curs (4)</div>
      <div>7 Cher-sighted glasses (5)</div>
      <div>9 PDAs (3)</div>
      <div>10 Bet ate letter scans (6)</div>
      <div>14 Seconds of are ray the incredible sway (8)</div>
      <div>17 Hairs from as a agonist in MLP: The Movie (6)</div>
      <div>20 Cups art is analgesic domes (3)</div>
      <div>21 Copies offal helter (5)</div>
      <div>22 Amp o’ Tex plosions (4)</div>
      <div>23 Ounces political camp AI tack ads (4)</div>
      <div>1 Jojo rub (4)</div>
      <div>2 Ounces my bags (3)</div>
      <div>3 Dashes CASSI tract (3)</div>
      <div>4 Mase do meters (5)</div>
      <div>5 Lin umber patterns (4)</div>
      <div>6 Ben, if rage beaks (4)</div>
      <div>8 Ounces stone pix preferably (5)</div>
      <div>11 Queens in DR., our age (5)</div>
      <div>13 Nary eBalls (5)</div>
      <div>14 Teaspoons Roma toes, diced (4)</div>
      <div>15 Logs from a wooded a own south (4)</div>
      <div>16 Stops at promote our locations (4)</div>
      <div>18 Of Imogen’s tech loves (3)</div>
      <div>19 Percent ambien employment (3)</div>
      <h3>Instructions</h3>
      <div>
        Grease all surfaces of your custom edges-and-pieces brownie pan.
      </div>
      <div>
        Start by arranging a portion of the ingredients across the dish, making
        sure to keep everything neat and symmetrical. There will be a few gaps,
        which is to be expected.
      </div>
      <div>
        Next arrange the remaining ingredients going down the dish. This should
        fill in all the gaps from the first layer and line up nicely with the
        rest.
      </div>
      <div>
        You should see a spot that’s a perfect fit for your secret ingredient,
        nestle it in there gently.
      </div>
      <div>
        Pop in a preheated oven at 350 degrees for around 40 minutes, or until a
        toothpick inserted in the center comes out clean.
      </div>
    </>
  );
};

export default Puzzle;

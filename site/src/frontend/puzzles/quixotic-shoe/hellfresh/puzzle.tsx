import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../../lib/api/client";
import Crossword, {
  calculateNumberLabels,
} from "../../../components/Crossword";

// | means a bar to the right of the cell.
const BARS_RIGHT = `
   |    
    |   
||      
        
        
     || 
  |     
   |    
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(8, " ").split(""));

// _ means a bar below the cell.
const BARS_DOWN = `
 _    _ 
      _ 
  __    
_ _  _ _
 _      
 _    _ 
        
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(8, " ").split(""));

// # means the cell has a number.
const LABELS = calculateNumberLabels(
  `
# #### #
##   #  
  #   # 
#  #    
# #    #
#   ##  
#  #    
#   #   
`
    .split("\n")
    .slice(1, -1)
    .map((row) => row.padEnd(8, " ").split("")),
);

export const HellfreshGrid = ({ fill }: { fill?: string[][] }) => (
  <Crossword
    labels={LABELS}
    fill={fill}
    getAdditionalCellStyles={({ row, column }) => {
      const styles: CSSProperties = {};
      if (column === 0) {
        styles.borderLeft = "3px solid black";
      }
      if (column === 7 || BARS_RIGHT[row]?.[column] === "|") {
        styles.borderRight = "3px solid black";
      }
      if (row === 0) {
        styles.borderTop = "3px solid black";
      }
      if (row === 7 || BARS_DOWN[row]?.[column] === "_") {
        styles.borderBottom = "3px solid black";
      }
      return styles;
    }}
  />
);

const Arrow = styled.span`
  color: var(--black);
`;

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const mainPuzzleUnlocked =
    teamState.rounds.paper_trail?.gates?.includes("ptg09");
  return (
    <>
      {mainPuzzleUnlocked && (
        <p>
          <Arrow>←</Arrow>{" "}
          <a href="/puzzles/and_now_a_puzzling_word_from_our_sponsors">
            Back to main puzzle
          </a>
        </p>
      )}
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

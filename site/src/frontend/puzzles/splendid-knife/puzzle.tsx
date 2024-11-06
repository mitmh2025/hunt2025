import React from "react";
import { styled } from "styled-components";
import image from "./assets/img.png";
import PuzzleImage from "../../components/PuzzleImage";

const StyledImageWrapper = styled.div`
  width: 100%;
`;

const ALT_TEXT =
  "A tournament bracket with rebuses at all leaf nodes. Each non-leaf node has two nodes pointing to it. Some nodes are highlighted in red and have a number next to them. The rightmost column of the bracket consists of a single red-highlighted node with the number 1. The second column of the bracket consists of two blank nodes pointing too the rightmost nodes. The third column of the bracket consists of four blank nodes in groups of two, each group pointing to a node in the second column. The bottommost node in the third column is highlighted in red with the number 4. The fourth column consists of eight nodes in groups of two, each group pointing to a node in the third column. From top to bottom, the fourth column's nodes contain the following content: a mostly-eaten apple running and wearing a dunce cap, blank, five 32-oz milk cartons, a red-highlighted node with the number 2 containing two stick figures with speech bubbles, two identical balls of brown clay attached to a benzene ring adjacent to each other, a blank red-highlighted node with the number 3, a clipart person wearing a bib and holding a fork and knife, a traffic ticket from the state of California for speeding in MITropolis. The fifth column consists of four nodes in two groups of two, each group pointing to a blank node in the fourth column. From top to bottom, the fifth column's nodes contain the following content: a football player throwing a toe, a cracked six-sided die taped together with band-aids, two sailboats being summed together with their headsails each highlighted in green, two photos of hardwood floors where one is installed correctly and one is installed incorrectly and the correct photo is circled in green.";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Some of these fighters are too soft to make it.
      </p>
      <StyledImageWrapper>
        <PuzzleImage src={image} alt={ALT_TEXT} />
      </StyledImageWrapper>
    </>
  );
};

export default Puzzle;

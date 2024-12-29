import React from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
`;

const StyledTd = styled.td`
  padding: 0px 8px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is about the Mohs hardness scale as hinted at in “Mo’s” and
        “too soft.”
      </p>
      <p>
        The Mohs hardness scale is based on 10 reference minerals. Each picture
        in the bracket represents a pun phrase of the respective mineral. The
        bracket winner is always the higher value on the Mohs scale. Four of the
        minerals are extracted and their hardness on the Mohs scale represents
        the alphabet letter extraction (A-Z =1-26). ?s represent the order for
        the extracted letters. From top to bottom in bracket:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Description</th>
            <th>Wordplay</th>
            <th>Mineral</th>
            <th>Mohs Hardness</th>
            <th>Node Number</th>
            <th>Extraction</th>
          </tr>
          <tr>
            <StyledTd>An apple core with a dunce cap, running</StyledTd>
            <StyledTd>Core Run Dumb</StyledTd>
            <StyledTd>Corundum</StyledTd>
            <StyledTd>9</StyledTd>
            <StyledTd></StyledTd>
            <StyledTd>-</StyledTd>
          </tr>
          <tr>
            <StyledTd>A football quarterback throwing a toe</StyledTd>
            <StyledTd>Toe Pass</StyledTd>
            <StyledTd>Topaz</StyledTd>
            <StyledTd>8</StyledTd>
            <StyledTd></StyledTd>
            <StyledTd>-</StyledTd>
          </tr>
          <tr>
            <StyledTd>A broken die patched up with bandages</StyledTd>
            <StyledTd>Die Mend</StyledTd>
            <StyledTd>Diamond</StyledTd>
            <StyledTd>10</StyledTd>
            <StyledTd>1</StyledTd>
            <StyledTd>J</StyledTd>
          </tr>
          <tr>
            <StyledTd>A bunch of milk quarts</StyledTd>
            <StyledTd>Quarts</StyledTd>
            <StyledTd>Quartz</StyledTd>
            <StyledTd>7</StyledTd>
            <StyledTd></StyledTd>
            <StyledTd>-</StyledTd>
          </tr>
          <tr>
            <StyledTd>Stick figures with speech bubbles</StyledTd>
            <StyledTd>Talk</StyledTd>
            <StyledTd>Talc</StyledTd>
            <StyledTd>1</StyledTd>
            <StyledTd>2</StyledTd>
            <StyledTd>A</StyledTd>
          </tr>
          <tr>
            <StyledTd>
              Two balls of clay in the ortho positions relative to each other on
              a benzene ring
            </StyledTd>
            <StyledTd>Ortho Clays</StyledTd>
            <StyledTd>Orthoclase</StyledTd>
            <StyledTd>6</StyledTd>
            <StyledTd></StyledTd>
            <StyledTd>-</StyledTd>
          </tr>
          <tr>
            <StyledTd>Two images of jib sails added together</StyledTd>
            <StyledTd>Jib Sum</StyledTd>
            <StyledTd>Gypsum</StyledTd>
            <StyledTd>2</StyledTd>
            <StyledTd></StyledTd>
            <StyledTd>-</StyledTd>
          </tr>
          <tr>
            <StyledTd>
              Two pictures of methods of flooring. One wrong and one correct.
              Correct image (which is on the right side) is circled.
            </StyledTd>
            <StyledTd>Floor Right</StyledTd>
            <StyledTd>Fluorite</StyledTd>
            <StyledTd>4</StyledTd>
            <StyledTd>3</StyledTd>
            <StyledTd>D</StyledTd>
          </tr>
          <tr>
            <StyledTd>A hungry person</StyledTd>
            <StyledTd>Appetite</StyledTd>
            <StyledTd>Apatite</StyledTd>
            <StyledTd>5</StyledTd>
            <StyledTd>4</StyledTd>
            <StyledTd>E</StyledTd>
          </tr>
          <tr>
            <StyledTd>A California Citation</StyledTd>
            <StyledTd>Cal Cite</StyledTd>
            <StyledTd>Calcite</StyledTd>
            <StyledTd>3</StyledTd>
            <StyledTd></StyledTd>
            <StyledTd>-</StyledTd>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
      The final answer is <PuzzleAnswer>JADE</PuzzleAnswer>.
    </>
  );
};

export default Solution;

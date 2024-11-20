import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  th,
  td {
    padding: 0px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The hearts each have a trigram on them, and when grouped by color, can
        be connected to read a franchise. Each franchise has a fictional
        character who has the last name Valentine; this is hinted at by the
        flavortext mentions of “name” and “something…in common,” as well as the
        theme of the puzzle.
      </p>
      <p>
        When the hearts for each franchise are connected in the correct trigram
        order, the lines form the shape of a numeral, which is used to index
        into the first name of the appropriate Valentine. The indexed letters
        are then ordered by the color order represented by the blank hearts at
        the bottom of the page, to yield the answer,{" "}
        <Mono>
          <strong>SAY YOU LOVE ME</strong>
        </Mono>
        .
      </p>
      <StyledTable>
        <tr>
          <th>Order</th>
          <th>Franchise</th>
          <th>Character</th>
          <th>Numeral (Index)</th>
          <th>Extraction</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Doug</td>
          <td>Skeeter Valentine</td>
          <td>1</td>
          <td>S</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Victorious</td>
          <td>Cat Valentine</td>
          <td>2</td>
          <td>A</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Trading Places</td>
          <td>Billy Ray Valentine</td>
          <td>5</td>
          <td>Y</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Sweet Charity</td>
          <td>Charity Hope Valentine</td>
          <td>7</td>
          <td>Y</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Josie And The Pussycats</td>
          <td>Melody Valentine</td>
          <td>4</td>
          <td>O</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Eastenders</td>
          <td>Aubrey Valentine</td>
          <td>2</td>
          <td>U</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Resident Evil</td>
          <td>Jill Valentine</td>
          <td>4</td>
          <td>L</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Kingsman: The Secret Service</td>
          <td>Richmond Valentine</td>
          <td>6</td>
          <td>O</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Soul Calibur</td>
          <td>Ivy Valentine</td>
          <td>2</td>
          <td>V</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Cowboy Bebop</td>
          <td>Faye Valentine</td>
          <td>4</td>
          <td>E</td>
        </tr>
        <tr>
          <td>11</td>
          <td>Yugioh</td>
          <td>Mai Valentine</td>
          <td>1</td>
          <td>M</td>
        </tr>
        <tr>
          <td>12</td>
          <td>Final Fantasy VII</td>
          <td>Vincent Valentine</td>
          <td>5</td>
          <td>E</td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;

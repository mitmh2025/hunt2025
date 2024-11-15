import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers first need to match the words in the word bank at the bottom to
        the answers at the top to form crossword-style clues for each answer.
        The enumerations (blanks) show the number of words per clue.
      </p>
      <p>
        Next they should notice that certain word spaces are highlighted, and
        that each set of highlighted words is exactly fourteen characters long.
        This is also useful for finishing and confirming the clue construction.
      </p>
      <p>
        The answers are all also fourteen characters long, including the space.
        So the answers must somehow be used with the highlighted clue words (“we
        went to great lengths”). If you use the position of the space in the
        answer word as an index into the highlighted clue words (“the spacing is
        all over”), the phrase <Mono>NUMBER FIVE</Mono> is extracted.
      </p>
      <p>
        As the “answers” were provided, the puzzle answer is indeed just number
        five:{" "}
        <Mono>
          <strong>PRIVATE SECTOR</strong>
        </Mono>
        , which was hiding in plain sight!
      </p>
      <table>
        <tr>
          <td>1.</td>
          <td>
            <Mono>POTTER VISCERA</Mono>
          </td>
          <td>
            <Mono>CERTAIN TEENAGE WIZARD INSIDES</Mono>
          </td>
        </tr>
        <tr>
          <td>2.</td>
          <td>
            <Mono>COVERT PARTIES</Mono>
          </td>
          <td>
            <Mono>SECRET FUN GROUP EVENTS</Mono>
          </td>
        </tr>
        <tr>
          <td>3.</td>
          <td>
            <Mono>TRAVERSE TOPIC</Mono>
          </td>
          <td>
            <Mono>GO ACROSS SUBJECT MATTER</Mono>
          </td>
        </tr>
        <tr>
          <td>4.</td>
          <td>
            <Mono>PIRATE VECTORS</Mono>
          </td>
          <td>
            <Mono>SEA ROBBER PATHS</Mono>
          </td>
        </tr>
        <tr>
          <td>5.</td>
          <td>
            <Mono>PRIVATE SECTOR</Mono>
          </td>
          <td>
            <Mono>ECONOMIC AREA NOT UNDER STATE CONTROL</Mono>
          </td>
        </tr>
        <tr>
          <td>6.</td>
          <td>
            <Mono>CATERER PIVOTS</Mono>
          </td>
          <td>
            <Mono>FOOD PROVIDER TURNS STANCE</Mono>
          </td>
        </tr>
        <tr>
          <td>7.</td>
          <td>
            <Mono>ACTIVE REPORTS</Mono>
          </td>
          <td>
            <Mono>LIVELY TPS FILES FOR EXAMPLE</Mono>
          </td>
        </tr>
        <tr>
          <td>8.</td>
          <td>
            <Mono>TAPER VORTICES</Mono>
          </td>
          <td>
            <Mono>GRADUALLY DIMINISH SPIRAL WATER POOLS</Mono>
          </td>
        </tr>
        <tr>
          <td>9.</td>
          <td>
            <Mono>REPEAT VICTORS</Mono>
          </td>
          <td>
            <Mono>PEOPLE WHO VANQUISH AGAIN</Mono>
          </td>
        </tr>
        <tr>
          <td>10.</td>
          <td>
            <Mono>CREATIVE PORTS</Mono>
          </td>
          <td>
            <Mono>UNUSUAL COMPUTER NETWORK CONNECTION POINTS</Mono>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Solution;

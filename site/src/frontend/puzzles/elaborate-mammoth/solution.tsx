import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const DATA = [
  ["1", "Daieisho", "Fukuoka", "11-Nov-2019", "oshidashi", 23, "W"],
  ["2", "Takayasu", "Fukuoka", "14-Nov-2014", "hatakikomi", 9, "I"],
  ["3", "Arawashi", "Tokyo", "15-Jan-2017", "yorikiri", 14, "N"],
  ["4", "Toyonoshima", "Tokyo", "19-Sep-2007", "oshidashi", 1, "A"],
  ["5", "Ichinojo", "Nagoya", "15-Jul-2019", "yorikiri", 20, "T"],
  ["6", "Abi", "Tokyo", "18-May-2018", "oshidashi", 19, "S"],
  ["7", "Kotoshogiku", "Nagoya", "20-Jul-2019", "yorikiri", 21, "U"],
  ["8", "Endo", "Fukuoka", "18-Nov-2016", "yorikiri", 13, "M"],
  ["9", "Takanoiwa", "Tokyo", "21-Jan-2017", "yorikiri", 15, "O"],
];

const StyledTable = styled.table`
  th:not(:last-child),
  td:not(:last-child) {
    padding-right: 1em;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle presents itself as a rhyming poem. (Someone who is better at
        poetry and/or who has an English degree could tell you what kind of poem
        it is, but <em>they</em> have yet to present themself, so there you go.)
        The poem describes nine rikishi reminiscing about a special victory, all
        seemingly talking about beating the same man. They refer to this as
        earning their “gold star.”
      </p>
      <p>
        From the context of the poem or through investigating the names of the
        men, teams can determine this is about sumo wrestling. Each of these men
        are sumo wrestlers who have during their careers earned a “gold star”
        victory.
      </p>
      <p>
        In sumo wrestling, the highest possible rank is yokozuna, who are
        expected to retire as soon as they cease being at the pinnacle of the
        sport. Below them in the top division are ozeki, sekiwake, and komusubi,
        followed by the rest of the top division, who are numerically ranked as
        maegashira. When a maegashira-ranked wrestler defeats a yokozuna, it is
        invariably an upset and marked as a special victory—a kinboshi. As a
        reward, this results in a permanent increase in a wrestler’s salary for
        the rest of their career.
      </p>
      <p>
        All nine wrestlers are describing their kinboshi. While they don’t name
        him, the poem makes clear as a throughline that they are all describing
        victories over the same man. This man is Hakuho Sho, inarguably the
        greatest sumo wrestler of the modern era and probably of all time, who
        won 45 tournaments and spent over 14 years as yokozuna before retiring.
        (And he retired on top—he won his last tournament in July 2021 15-0, his
        16th and final undefeated tournament victory.)
      </p>
      <p>
        The nine wrestlers speak in chronological order (reaffirmed by
        Toyonoshima referencing that he was first, and Daieisho commenting on
        how he was among the last). The true ordering is when the wrestlers sit
        down to have stew after their stories. The line in the last stanza, “As
        nine of—how many was it again?”, indicates that teams should consider
        the total kinboshi that Hakuho conceded. Teams investigating kinboshi
        and the common unsaid thread of Hakuho will discover that he gave up
        exactly 26 kinboshi in his career. If teams assign each wrestler’s
        victory a letter corresponding to the ordinal number in the list of
        kinboshi Hakuho conceded and use the final ordering, the letters spell
        <Mono>WIN AT SUMO</Mono>.
      </p>
      <p>
        When teams submit this instruction, they receive a request to go to the
        Gala and <Mono>WIN AT SUMO</Mono>. Upon arrival, teams play a D&amp;M
        team member in Sumo, a card game designed by koto konno, where players
        take tricks to push their opponent out of the ring. Each game takes a
        few minutes to play. Upon winning, the team receives the true answer of
        the puzzle, <PuzzleAnswer>BLANK TILE</PuzzleAnswer>.
      </p>
      <h3>Full Extraction</h3>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Order</th>
            <th>Winning Wrestler</th>
            <th>City</th>
            <th>Date</th>
            <th>Winning Move</th>
            <th>Kinboshi Number</th>
            <th>Extraction</th>
          </tr>
          {DATA.map(([order, wrestler, city, date, move, number, letter]) => (
            <tr key={order}>
              <td>{order}</td>
              <td>{wrestler}</td>
              <td>{city}</td>
              <td>{date}</td>
              <td>{move}</td>
              <td>{number}</td>
              <td>{letter}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;

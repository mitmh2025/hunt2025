import React from "react";
import { styled } from "styled-components";
import { PuzzleAnswer } from "../../components/StyledUI";

const StyledTh = styled.th`
  font-weight: bold;
`;

const StyledTd = styled.td`
  padding: 0px 8px;
`;

const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <StyledTh key={`header-cell-${i}`}>{header}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, j) => (
          <tr key={`table-row-${j}`}>
            {row.map((cell, k) => {
              let cellContent: string | JSX.Element = cell;
              if (k === 1) {
                cellContent = <a href={HF_LINKS[j]}>{cell}</a>;
              } else if (k === 5) {
                cellContent = <PuzzleAnswer>{cell}</PuzzleAnswer>;
              }
              return (
                <StyledTd key={`table-row-${j}-cell-${k}`}>
                  {cellContent}
                </StyledTd>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const HEADERS = [
  "Order",
  "Clip",
  "Fighter 1 Jersey Number",
  "Fighter 2 Jersey Number",
  "Diff",
  "Extraction",
];

const ROWS = [
  [
    "1",
    "Trent Frederic vs Andreas Englund, October 21, 2023",
    "11",
    "5",
    "6",
    "F",
  ],
  ["2", "Tanner Jeannot vs Ryan Reaves, April 3, 2024", "84", "75", "9", "I"],
  ["3", "Nick Seeler vs Jani Hakanpää, October 21, 2023", "24", "2", "22", "V"],
  [
    "4",
    "Conor Garland vs Brandon Tanev, February 22, 2024",
    "13",
    "8",
    "5",
    "E",
  ],
  [
    "5",
    "Brenden Dillon vs Sam Reinhart, November 24, 2023",
    "13",
    "5",
    "8",
    "H",
  ],
  ["6", "Sam Carrick vs Mathieu Olivier, March 7, 2024", "39", "24", "15", "O"],
  ["7", "Cole Smith vs Zach Bogosian, January 25, 2024", "36", "24", "12", "L"],
  [
    "8",
    "Max Pacioretty vs Tage Thompson, April 11, 2024",
    "72",
    "67",
    "5",
    "E",
  ],
];

const HF_LINKS = [
  "https://www.youtube.com/watch?v=85kGQpjfmvI",
  "https://www.youtube.com/watch?v=Pv0hTO9CMI0",
  "https://www.youtube.com/watch?v=kMwaLBEyCc8",
  "https://www.youtube.com/watch?v=NR1jrYv3zpU",
  "https://www.youtube.com/watch?v=69lJZOVyz7k",
  "https://www.youtube.com/watch?v=YHi7dYJZJI4",
  "https://www.youtube.com/watch?v=22QnJOdBWO8",
  "https://www.youtube.com/watch?v=vLfsvNZW6Bo",
];

const Solution = () => {
  return (
    <>
      <p>
        This puzzle is comprised of eight descriptions of medieval battles,
        including a formal blazon for each army and a detailed account of a
        specific incident within the battle. The descriptions correspond to
        eight hockey games from the 2023-2024 NHL season, the blazons describe
        the away and home team jerseys
        <sup>
          <a href="#footnote-1">1</a>
        </sup>{" "}
        respectively, and the incidents described are fights that occurred
        during the games. The name of the puzzle is a clue to this: a{" "}
        <a href="https://en.wikipedia.org/wiki/Fechtbüch">fechtbüch</a> is a
        late Medieval manuscript describing a martial art. The ‘author’ is a
        reference to{" "}
        <a href="https://en.wikipedia.org/wiki/George_Parros">George Parros</a>,
        a former NHL enforcer
        <sup>
          <a href="#footnote-2">2</a>
        </sup>{" "}
        and the current head of the NHL Department of Player Safety
        <sup>
          <a href="#footnote-3">3</a>
        </sup>
        .
      </p>
      <p>
        The teams can be identified by drawing the ‘coat of arms’ based on the
        blazon, or by just looking up the colors for each NHL team. The games
        can be identified by the flavor text, which tells solvers the games in
        question are from the 2023-2024 season, and the first sentence of each
        description, which indicates which game of the season series between the
        two teams is being described (e.g. ‘the second battle in the war between
        two noble houses’ = the second game these two teams were having this
        season.) As an additional checksum, the score of the game just before
        the fight is indicated in each description (e.g. ‘The invaders had the
        clear advantage, having outflanked the bedraggled defenders twice’
        indicating a score of 2-0).
      </p>
      <p>
        The descriptions describe a fight between two ‘knights’ in detail. As
        clued by the flavor text (‘knights settling their differences’), solvers
        must identify the two fighters and calculate the difference of their
        jersey numbers. Taken as A1Z26 in given order, this spells out{" "}
        <PuzzleAnswer>FIVE HOLE</PuzzleAnswer>.
      </p>
      <Table headers={HEADERS} rows={ROWS} />
      <p id="footnote-1">
        <sup>1</sup> which do not conform whatsoever to heraldry traditions,
        thus the author’s occasional value judgments thereof
      </p>
      <p id="footnote-2">
        <sup>2</sup> which means his job used to be to maul people
      </p>
      <p id="footnote-3">
        <sup>3</sup> which means his job is now to decide how long players get
        suspended for mauling each other
      </p>
    </>
  );
};

export default Solution;

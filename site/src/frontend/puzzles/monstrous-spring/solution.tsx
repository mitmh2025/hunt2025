import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const Answers: [
  outClue: string,
  outAnswer: string,
  inClue: string,
  inAnswer: string,
  shrunk: string,
][] = [
  ["Yankee Doodle’s “macaroni”", "FEATHER", "Phobia", "FEAR", "THE"],
  ["Like last week’s balloon", "DEFLATED", "Property record", "DEED", "FLAT"],
  ["Holy", "DIVINE", "Plummet", "DIVE", "IN"],
  ["Dried out", "WITHERED", "Not Bluetooth", "WIRED", "THE"],
  [
    "Revealed once more",
    "RESHOWED",
    "Wetland grass or college in Portland",
    "REED",
    "SHOW",
  ],
  ["Rotaries", "ROUNDABOUTS", "Security guard’s patrols", "ROUNDS", "ABOUT"],
  ["Under legal age", "MINOR", "Soviet space station", "MIR", "NO"],
  ["Scornfully", "SCATHINGLY", "Like a fish or lizard", "SCALY", "THING"],
  [
    "Non-existent places",
    "NOWHERES",
    "Toddlers’ favorite words",
    "NOS",
    "WHERE",
  ],
  ["To survive, as a storm or crisis", "WEATHER", "Don", "WEAR", "THE"],
  ["Jesus’s dozen", "APOSTLES", "Bitter and stout", "ALES", "POST"],
  [
    "Serious foodie",
    "GOURMAND",
    "Fruit that may be edible, decorative, or functional",
    "GOURD",
    "MAN",
  ],
  ["Terminating, with “out”", "PHASING", "Ask for an ack", "PING", "HAS"],
  ["Psychoactive resin", "HASHISH", "Chopped up leftovers", "HASH", "HIS"],
  ["Inserts [in]", "EMBEDS", "Typographical units", "EMS", "BED"],
  ["THE ANSWER, PART ONE", "", "Current events", "NEWS", ""],
  ["THE ANSWER, PART TWO", "", "Catkin, or Pearl Jam bassist", "AMENT", ""],
];

const SolutionTable = styled.table`
  margin: 0 auto;
  border-collapse: collapse;

  & th,
  & td {
    padding: 0 0.5em;
    border: 1px solid black;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        This is a puzzle about “shrinkage” from the{" "}
        <a href="https://www.youtube.com/watch?v=ldUZvxjKMGs">
          90s sitcom Seinfeld
        </a>
        . (Yes we’re very mature thank you for asking)
      </p>

      <p>
        Two sets of crossword clues are presented, one set listed inside a pool
        and one set listed outside the pool (in alphabetical order).
        Enumerations are given for the clues outside the pool. After solving
        both sets of clues, the answers can be paired, one from inside the pool
        and one from outside the pool. The answers in the pool resemble answers
        from out of the pool, but with some unfortunate shrinkage. In fact, each
        out-of-pool answer has had an entire word removed from its middle to
        become an in-the-pool answer.
      </p>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Out-of-pool clue</th>
              <th>Out-of-pool answer</th>
              <th>In-the-pool clue</th>
              <th>In-the-pool answer</th>
              <th>Shrunk word</th>
            </tr>
          </thead>
          <tbody>
            {Answers.map(
              ([outClue, outAnswer, inClue, inAnswer, shrunk], i) => (
                <tr key={i}>
                  <td>{outClue}</td>
                  <td>
                    <Mono>{outAnswer}</Mono>
                  </td>
                  <td>{inClue}</td>
                  <td>
                    <Mono>{inAnswer}</Mono>
                  </td>
                  <td>
                    <Mono>{shrunk}</Mono>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <p>
        There are two clues out of the pool which cannot yet be answered: THE
        ANSWER PART ONE and THE ANSWER PART TWO. Likewise there are two answers
        in the pool which have no matching out of the pool answer yet:{" "}
        <Mono>NEWS</Mono> and <Mono>AMENT</Mono>.
      </p>

      <p>
        Reordering the shrunk words by presentation order of the clues inside
        the pool gives the clue phrase{" "}
        <Mono>
          THE FLAT IN THE SHOW ABOUT NO THING WHERE THE POST MAN HAS HIS BED
        </Mono>
        . “The show about no thing” is cluing the show Seinfeld, and the name of
        the postal worker in Seinfeld is Newman. The shrunk words{" "}
        <Mono>NEWS</Mono> and <Mono>AMENT</Mono> from outside the pool can then
        be unshrunk using the clue phrase to give the final answer to the
        puzzle: <Mono>NEWMAN’S APARTMENT</Mono>. Further confirmation that this
        is the correct unshrinking is that the “shrunk” words are the words{" "}
        <PuzzleAnswer>MAN PART</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;

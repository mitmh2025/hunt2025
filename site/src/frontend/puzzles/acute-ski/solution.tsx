import React from "react";
import { styled } from "styled-components";
import solutionImage from "./assets/solution.png";

const solution: [
  word: string,
  comparative: string,
  year: number,
  superlative: string,
][] = [
  ["BUTT", "Churned from cream", 27, "...get kicked in the rear"],
  ["ENT", "Keyboard key", 56, "...moot up later"],
  ["FLOW", "Coming from an April shower", 57, "...drop some sick bars"],
  ["SHE", "Like many pantyhose", 36, "...be feminine"],
  ["LEAD", "Someone to follow", 37, "...lick the paint"],
  ["BROTH", "Monastery fellow", 28, "...make ramen"],
  ["ELM", "Mr. Fudd", 26, "...be a tree"],
  ["FIB", "High-speed internet", 26, "...tell lies"],
  ["ALT", "Change or edit", 46, "...listen to indie rock"],
  ["REF", "Pass on", 16, "...issue a red card"],
  ["CART", "Finster fiancé", 77, "...take a wagon"],
  ["AC", "Laptop brand", 35, "...stay cool in the summer"],
  ["CENT", "Middle alignment", 17, "...take a penny"],
  ["ARCH", "Sterling spy", 47, "...need orthotic inserts"],
  ["END", "Youngest Wiggin", 26, "...finish"],
  ["TRAIN", "Personal coach", 48, "...ride the rails"],
  ["QUART", "Washington coin", 18, "...have a couple pints"],
  ["SUP", "Like Clark Kent", 26, "...have an evening meal"],
  ["LETT", "A class year can help choose this", 27, "...be easy in Norwegian"],
];

const SolutionTable = styled.table`
  border: 1px black solid;
  border-collapse: collapse;
  margin-bottom: 1rem;

  & th,
  & td {
    border: 1px black solid;
    padding: 0.25rem;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        This is a puzzle about words ending -ER and -EST that are definitely not
        actual comparatives and superlatives. And also yearbooks.
      </p>

      <p>
        Solvers can solve many of the student/comparative clues normally to get
        actual English words, and maybe take a stab at some of the superlative
        clues, before discovering that the superlatives are all completely made
        up words and definitions. Each student can be paired with a superlative.
      </p>

      <p>
        The students are given in alphabetical order by their answer. Each
        student also has a class year. As clued by the clue for LETTER, the
        class year “can help choose” a letter from each superlative.
        Specifically, the class year’s 1’s digit is always the length of the
        superlative and the 10’s digit is always less than that, and can be used
        as an index. Indexing into all the superlatives, and reading in the
        order of the superlatives, spells out <code>USE EARLIER TECHNIQUE</code>
        .
      </p>

      <SolutionTable>
        <thead>
          <tr>
            <th>Student</th>
            <th>Clue</th>
            <th>Year</th>
            <th>Superlative</th>
            <th>Most likely to…</th>
            <th>Letter</th>
          </tr>
        </thead>
        <tbody>
          {solution.map(([word, comparative, year, superlative]) => (
            <tr key={word}>
              <td>
                <code>{word}ER</code>
              </td>
              <td>{comparative}</td>
              <td>{year}</td>
              <td>
                <code>{word}EST</code>
              </td>
              <td>{superlative}</td>
              <td>
                <code>{`${word}EST`[Math.floor(year / 10) - 1]}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </SolutionTable>

      <p>
        But because this is a puzzle about superlatives, that must be
        transformed to <code>USE EARLIEST TECHNIQUE</code>.
      </p>

      <p>
        Solvers must realize that “Technique” refers to the MIT student
        yearbook, and look up the earliest edition of in the archives. The
        earliest available edition is from 1885, and the first page of this
        edition is an advertisement for a steam pump company.
      </p>

      <p>
        The provided graphic at the bottom of the page can be overlaid with this
        page from the archive (with a silly additional superlative as
        confirmation), and the red numbers each overlap with a letter. Taking
        these letters in numeric order spells out the answer,{" "}
        <code>STUDENT BODY</code>.
      </p>

      <img
        width="50%"
        src={solutionImage}
        alt="The outline from the puzzle overlaid on the archival copy of the 1885 MIT Technique, with red numbers overlaid on specific letters to spell out the answer"
      />
    </>
  );
};

export default Solution;

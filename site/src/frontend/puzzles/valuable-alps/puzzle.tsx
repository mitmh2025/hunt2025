import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import crossDashWord from "./assets/cross-dash-word.pdf";
import { CLUES } from "./data";

const ClueGroup = styled.div`
  margin: 1em 0;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were instructed to visit us at the Gala to
          pick up the puzzle. When they did so, they received a paper envelope
          with 13 pieces of cardstock.
        </p>

        <p>
          If you’d like to print and cut your own set of shapes, a PDF is linked{" "}
          <a href={crossDashWord} target="_blank" rel="noreferrer">
            here
          </a>
          . It is formatted for 11”x17” paper and was printed on 90lb index
          cardstock; scaling down to thinner/smaller form factors may work well
          enough but has not been tested. The blue lines in this PDF are cut
          lines and were not printed on the production version; they were lifted
          out into a separate layer for a vinyl cutter, but can be cut with
          scisccors and a knife instead. (Be warned that cutting <strong>all</strong> of the
          lines by hand may take upwards of 2 hours.)
        </p>
      </AuthorsNoteBlock>
      {CLUES.map((group, i) => (
        <React.Fragment key={`group-${i}`}>
          <ClueGroup>
            {group.slice(0, 1).map(({ clue }, j) => (
              <div key={`clue-${i}-${j}`}>
                <strong>{clue}</strong>
              </div>
            ))}
            {group.slice(1).map(({ clue }, j) => (
              <div key={`clue-${i}-${j + 1}`}>{clue}</div>
            ))}
          </ClueGroup>
          <br className={COPY_ONLY_CLASS} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Puzzle;

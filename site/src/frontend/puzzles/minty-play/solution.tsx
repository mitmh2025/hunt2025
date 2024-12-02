import React from "react";
import { styled } from "styled-components";
import solution from "./assets/solution.pdf";

const FakeP = styled.div`
  margin-bottom: 1em;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <a href={solution} target="_blank" rel="noreferrer">
          Link to solution image
        </a>
      </p>
      <p>
        There are seven features on the puzzle box. In alphabetical order by
        title:
      </p>
      <FakeP>
        <div>An-Anagrams!</div>
        <div>
          The fruits unscrambled are Watermelon, Honeydew, Apple, Tangerine, and
          Strawberry, and taking the first letter of each gives{" "}
          <Mono>WHATS</Mono>.
        </div>
      </FakeP>
      <FakeP>
        <div>Breakfast Crosses</div>
        <div>
          Solving each clue for a cereal name and taking the crossed letters in
          reading orders gives <Mono>SNAP</Mono>.
        </div>
      </FakeP>
      <FakeP>
        <div>Chipmunk Maze</div>
        <div>
          Solving the maze, we see the path forms the shapes of the letters{" "}
          <Mono>CRACKLE</Mono>.
        </div>
      </FakeP>
      <FakeP>
        <div>Did U Know That…</div>
        <div>
          Each fact starts with a word that makes the sound of a letter:{" "}
          <Mono>A-N-D</Mono>.
        </div>
      </FakeP>
      <FakeP>
        <div>Expose Every Expression!</div>
        <div>
          Each given word in the word search can be found as the middle of a
          three word clue, with all words in a clue nearby and going in the same
          direction. All the clues are for the answer <Mono>POPS</Mono>.
        </div>
      </FakeP>
      <FakeP>
        <div>Frosted Figures!</div>
        <div>
          The completed dot-to-dot spells <Mono>ALMA</Mono> on top of the cake.
        </div>
      </FakeP>
      <FakeP>
        <div>Greedy Greedy Gremlins</div>
        <div>
          Each animal is connected via its path to an item whose name is a one
          letter deletion of the animal’s name. The deleted letters spell{" "}
          <Mono>MATER</Mono>.
        </div>
      </FakeP>
      <p>
        Putting together the clued words in alphabetical order by puzzle name,
        we have <Mono>WHAT’S SNAP CRACKLE AND POP’S ALMA MATER</Mono>?
      </p>
      <p>
        The well-known Rice Krispie mascots of course could only have attended{" "}
        <Mono>
          <strong>RICE UNIVERSITY</strong>
        </Mono>
        .
      </p>
    </>
  );
};

export default Puzzle;

import React from "react";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import solution from "./assets/solution.jpg";

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers receive a bag of popsicle sticks marked with words, letters, and
        boxes. Upon inspection, the sticks are covered in joke setups and
        punchlines in the style of (terrible, groan-inducing) jokes typically
        found on actual popsicle sticks. Each individual stick makes little
        sense but after some searching, solvers can find matching setups and
        punchlines on different popsicle sticks (e.g. “Why couldn’t the string
        ever win?” on one stick matches up with “It could only tie” on another).
      </p>
      <p>
        The popsicle sticks can be assembled into a jigsaw puzzle by matching
        setups to punchlines, yielding the arrangement below:
      </p>
      <LinkedImage
        src={solution}
        alt="A bunch of outlines of popsicle sticks with bad puns on them. Letters on the ends of the outermost popsicle sticks read DROP QUOTE. The arrangement of popsicle sticks does form a drop quote, with the top five rows of popsicle sticks having letter banks and the bottom five rows of popsicle sticks having white and black squares."
      />
      <p>
        The left and right sides of the puzzle clue that the so-far-unused large
        letters and boxes form a dropquote puzzle, which can be solved to obtain{" "}
        <Mono>WHAT IS LIZZIE BORDENS FAVORITE BODY SPRAY THREE</Mono>.
      </p>
      <p>
        Reading this as one final joke setup with enumeration (3) yields the
        punchline/solution: <PuzzleAnswer>AXE</PuzzleAnswer>.
      </p>
      <h3>Author’s Note</h3>
      <p>
        While this puzzle is borne out of my deep love of horrible jokes, it
        wasn’t until I gave it to my 10-year-old on a rainy day that I realized
        that I had created Dad Joke Fantasy Camp, where the solver is forced to
        endure 10-20 minutes of me telling them awful jokes in order to proceed.
      </p>
    </>
  );
};

export default Solution;

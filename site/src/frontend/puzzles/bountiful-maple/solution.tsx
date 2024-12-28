import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import solution from "./assets/solution.png";

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Solution = () => {
  return (
    <>
      <p>
        This meta-puzzle involves ingredients used in making glass. It uses the
        4 feeder answers <Mono>ST. PETER’S BASILICA</Mono>,{" "}
        <Mono>SCULLETT’S CONE</Mono>, <Mono>MARCUS O’DAY</Mono>, and{" "}
        <Mono>MILLIMETERS</Mono>. Punctuation is provided in the grid to assist
        with placing answers.
      </p>

      <Columns>
        <img
          src={solution}
          alt="Glass where each of four columns has repeating feeders entered into cells, with glass ingredients in the circled cells"
        />
        <div>
          <p>
            Each of the four columns repeat, with periods 7, 8, 9, and 13
            (ignoring the small digits in the grid for now)
          </p>
          <p>
            It is possible to fit answers into the grid if you treat glass
            ingredients (<Mono>SILICA</Mono>, <Mono>LIME</Mono>,{" "}
            <Mono>SODA</Mono>, <Mono>CULLET</Mono>) as taking up the space of
            one letter, as well as punctuation (apostrophes and periods), as
            shown in the grid. In the case of <Mono>MARCUS O’DAY</Mono>, the
            glass ingredient and the apostrophe overlap: <Mono>SO’DA</Mono>. The
            vertical shifts (phases) of the words in the grid must be determined
            by the locations of the glass ingredients and punctuation.
          </p>
          <p>
            Next, solvers must realize that the next part of the flavor text
            means that they need to figure out which row or rows would contain
            the word “pure” if the pattern was continued. Each row in the image
            is labeled with a four-digit number starting at 0001, so whatever
            row or rows have the word <Mono>PURE</Mono> will have four-digit
            numbers associated with them.
          </p>
          <p>
            The least common multiple of 7, 8, 9, and 13 is their product, 6552,
            so the pattern will repeat with that period. The location of the
            word <Mono>PURE</Mono> can be calculated using the Chinese Remainder
            Theorem or by brute force. The locations are 3154 and 9706. Using
            the small digits which haven’t been used to map these digits to
            letters spells <Mono>ACRY</Mono> and <Mono>LATE</Mono>, giving the
            answer <PuzzleAnswer>ACRYLATE</PuzzleAnswer>.
          </p>
        </div>
      </Columns>
    </>
  );
};

export default Solution;

import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 1px 8px;
  }
`;

const Mono = styled.span`
  font-family: monospace;
`;

const StyledImageWrapper = styled.div`
  width: 50%;
`;

const makeAltText = (word: string, letter: string): string => {
  return `A connect-the-dots labeled with letters instead of numbers. The dots for the word ${word} are connected, making the shape of a letter ${letter}.`;
};

const DATA: {
  animal: string;
  image: string;
  keywords: string;
  letter: string;
}[] = [
  { animal: "BEAR", image: image1, keywords: "endure", letter: "P" },
  {
    animal: "HOUND",
    image: image2,
    keywords: "follow incessantly",
    letter: "E",
  },
  { animal: "DUCK", image: image3, keywords: "drop out of view", letter: "S" },
  { animal: "CROW", image: image4, keywords: "brag so loudly", letter: "T" },
  {
    animal: "QUAIL",
    image: image5,
    keywords: "shrink back in fright",
    letter: "E",
  },
  { animal: "BAT", image: image6, keywords: "take a swat", letter: "R" },
  { animal: "BUCK", image: image7, keywords: "jump and twist", letter: "S" },
  { animal: "RAM", image: image8, keywords: "charge, headbutt", letter: "I" },
  { animal: "SNIPE", image: image9, keywords: "shoot", letter: "X" },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is about animal names that are also verbs (as hinted in the
        first verse). Each of the nine main verses in the poem (aside from the
        intro verse and the last verse) describe a behavior that is also an
        animal name verb:
      </p>
      <StyledTable>
        <tr>
          <th>Animal</th>
          <th>Key Words</th>
        </tr>
        {DATA.map(({ animal, keywords }) => (
          <tr key={animal}>
            <td>{animal}</td>
            <td>{keywords}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Each animal name can be spelled out on the connect the dots grid,
        forming a letter. Taken in order this gives <Mono>PESTER SIX</Mono>. A
        six-letter animal that also means “pester” is the final answer:{" "}
        <Mono>
          <strong>BADGER</strong>
        </Mono>
        .
      </p>
      {DATA.map(({ animal, image, letter }) => (
        <>
          <div>{animal}</div>
          <StyledImageWrapper>
            <LinkedImage src={image} alt={makeAltText(animal, letter)} />
          </StyledImageWrapper>
        </>
      ))}
      <h3>Author’s Note</h3>
      <p>
        This poem was inspired by{" "}
        <a
          href="https://www.youtube.com/watch?v=SDCqgHLX8Ys"
          target="_blank"
          rel="noreferrer"
        >
          Go the Fuck to Sleep
        </a>
        . I empathize much more strongly with the original poem than the one I
        wrote, as I got lucky with two pretty well-behaved kids. But I hope this
        still amuses parents who solve this puzzle.
      </p>
      <p>
        Bonus word of the day: “grawlix” is a string of of typographical symbols
        used to replace profanity.
      </p>
    </>
  );
};

export default Solution;

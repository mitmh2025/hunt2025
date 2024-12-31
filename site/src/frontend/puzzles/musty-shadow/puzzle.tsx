import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image10 from "./assets/image10.png";
import image11 from "./assets/image11.png";
import image12 from "./assets/image12.png";
import image13 from "./assets/image13.png";
import image14 from "./assets/image14.png";
import image15 from "./assets/image15.png";
import image16 from "./assets/image16.png";
import image17 from "./assets/image17.png";
import image18 from "./assets/image18.png";
import image19 from "./assets/image19.png";
import image2 from "./assets/image2.png";
import image20 from "./assets/image20.png";
import image21 from "./assets/image21.png";
import image22 from "./assets/image22.png";
import image23 from "./assets/image23.png";
import image24 from "./assets/image24.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";

export const GRAPH_ALT_TEXT =
  "A directed acyclic graph, the nodes of which use the colors from the image with the eleven squares above.";

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--monospace-font);
  margin-top: 2em;
  margin-bottom: 2em;
`;

const Blanks = styled.table`
  white-space: pre;
`;

// This seemed an appropriately thematic name
const Red = styled.td`
  background-color: red;
`;

export const ImageWrapper = styled.div`
  margin-bottom: 2em;
`;

export const SizedLinkedImage = styled(LinkedImage)<{ $width: number }>`
  display: inline-flex;
  justify-content: space-around;
  img {
    width: ${({ $width }) => $width}%;
  }
`;

const StyledImage = styled.img<{ $width: number }>`
  margin-bottom: 1em;
  width: ${({ $width }) => $width}px;
`;

const ScaledImage = styled.img`
  margin-bottom: 4em;
  transform: scale(0.5);
`;

const BLANKS: { characters: string; redIndex: number }[] = [
  { characters: "_________", redIndex: 2 },
  {
    characters: "___ ___ ___ __ __ ___ ____",
    redIndex: 0,
  },
  { characters: "____ __ ________", redIndex: 8 },
  { characters: "______ ____ _______", redIndex: 10 },
  { characters: "_____", redIndex: 1 },
  { characters: "___ _____ _ ____ ___", redIndex: 10 },
  { characters: "____ ____…__ ____", redIndex: 0 },
  { characters: "____ __ ____ ___ ____", redIndex: 5 },
  { characters: "_____ ______", redIndex: 6 },
  { characters: "___’_ _____ __", redIndex: 10 },
  { characters: "_______ ______", redIndex: 0 },
  { characters: "______ __ ___?", redIndex: 4 },
  { characters: "__ ____ ___ _ _____", redIndex: 4 },
  { characters: "_________________", redIndex: 0 },
  { characters: "_________ ______", redIndex: 15 },
  { characters: "_____", redIndex: 2 },
  { characters: "_________", redIndex: 6 },
  { characters: "____", redIndex: 1 },
  { characters: "____ _____", redIndex: 5 },
  { characters: "________", redIndex: 2 },
  { characters: "______", redIndex: 5 },
  {
    characters: "____’_ ____ (__ __ __ __)",
    redIndex: 1,
  },
  { characters: "_____ ____ __", redIndex: 12 },
  { characters: "_______ ___", redIndex: 1 },
  { characters: "________…?", redIndex: 1 },
  { characters: "…_____ ___ __?", redIndex: 2 },
  { characters: "_____ _____ ___ ____ __", redIndex: 2 },
  { characters: "_____ __ _____", redIndex: 0 },
  { characters: "____ _________", redIndex: 0 },
  { characters: "_________", redIndex: 0 },
  { characters: "____ __ ___", redIndex: 5 },
  { characters: "___ _______", redIndex: 5 },
  { characters: "___ ________", redIndex: 10 },
  { characters: "___ _____ __ __", redIndex: 4 },
  { characters: "___ ____ _____ _____", redIndex: 12 },
  { characters: "________", redIndex: 1 },
  { characters: "‘___ ___ ____ ______", redIndex: 3 },
  { characters: "_______ ______", redIndex: 1 },
  { characters: "___ ____ __ ____ ____", redIndex: 12 },
  { characters: "___’__ ___ _____", redIndex: 7 },
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        “We’re in our puzzle hunting era! (MIT’s Version)”
      </p>
      <hr />
      <ImageWrapper>
        <LinkedImage
          src={image1}
          alt="Eleven squares, each a different color, in a row. From left to right, colors are: teal, yellow, purple, red, light blue, black, pimk, gray, brown, dark blue, and off-white."
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={66.7}
          src={image2}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a soap emoji, and its rightmost node contains half of a piano emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={62.9}
          src={image3}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a sparkle emoji and a plane emoji, and its rightmost node contains a piano emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={78.7}
          src={image4}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a clock emoji, a confetti ball emoji, and a calendar emoji, and its rightmost node contains a guitar emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={75.2}
          src={image5}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains two wave emoji and a baby emoji, and its rightmost node contains half of a guitar emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={90.6}
          src={image6}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a one emoji, a four emoji, and a calendar emoji, and its rightmost node contains a guitar emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={84.7}
          src={image7}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a star emoji and a bulb emoji, and its rightmost node contains half of a piano emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={66.5}
          src={image8}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a purple square emoji and a cloud emoji, and its rightmost node contains a guitar emoij.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={72.8}
          src={image9}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains two crying emoji and a guitar emoji, and its rightmost node contains half of a guitar emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={71.9}
          src={image10}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a V sign emoji, and its rightmost node contains half of a guitar emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={82.1}
          src={image11}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a princess emoji, a Statue of Liberty emoji, a plus emoji, a broken heart emji, and a prince emoji, and its rightmost node contains a piano emoji.`}
        />
      </ImageWrapper>
      <ImageWrapper>
        <SizedLinkedImage
          $width={66.4}
          src={image12}
          alt={`${GRAPH_ALT_TEXT} The graph’s leftmost node contains a first place medal emoji and a dash emoji, and the rightmost node contains a piano emoji.`}
        />
      </ImageWrapper>
      <FlexWrapper>
        {BLANKS.map(({ characters, redIndex }, i) => (
          <Blanks key={`row-${i}`}>
            <tr>
              {characters.split("").map((char, j) =>
                j === redIndex ? (
                  <>
                    <Red key={`char${i}-${j}`}>{char}</Red>
                  </>
                ) : (
                  <>
                    <td key={`char-${i}-${j}`}>{char}</td>
                  </>
                ),
              )}
            </tr>
          </Blanks>
        ))}
      </FlexWrapper>
      <hr />
      <FlexWrapper>
        <StyledImage
          $width={184}
          src={image13}
          alt="A sleeveless orange dress"
        />
        <ScaledImage src={image14} alt="Two musical notes" />
        <StyledImage
          $width={130}
          src={image15}
          alt="A burgundy dress with off-the-shoulder sleeves"
        />
        <ScaledImage src={image14} alt="Two musical notes" />
        <StyledImage
          $width={184}
          src={image16}
          alt="A sleeveless royal blue dress"
        />
        <ScaledImage src={image17} alt="One musical note" />
        <StyledImage
          $width={130}
          src={image18}
          alt="A yellow dress with off-the-shoulder sleeves"
        />
        <ScaledImage src={image19} alt="Eleven musical notes" />
        <StyledImage
          $width={130}
          src={image20}
          alt="A navy blue dress with off-the-shoulder sleeves"
        />
        <ScaledImage src={image14} alt="Two musical notes" />
        <StyledImage
          $width={130}
          src={image21}
          alt="A green dress with off-the-shoulder sleeves"
        />
        <ScaledImage src={image22} alt="Six musical notes" />
        <StyledImage $width={184} src={image23} alt="A sleeveless pink dress" />
        <ScaledImage src={image24} alt="Five musical notes" />
      </FlexWrapper>
    </>
  );
};

export default Puzzle;

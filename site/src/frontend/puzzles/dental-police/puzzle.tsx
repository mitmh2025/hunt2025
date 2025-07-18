import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import { Errata } from "../../components/StyledUI";
import scene from "./assets/scene.png";
import setlist from "./assets/setlist.png";

const SizedImage = styled(LinkedImage)`
  display: block;
  max-width: 500px;
  margin: auto;
`;

const SETLIST_STRINGS = [
  "Set List.",
  "Cause of a fracture in something that…",
  "An element that…",
  "French art style that… (2 wds)",
  "A gait that…",
  "Lover of a guy who…",
  "Meat that…?",
  "Two-component salad dressing that… (3 wds)",
  "A reptile that…",
  "Constitutional section that…",
  "Long-running conflict that…",
  "Type of edible dip that…?",
  "Cartoon character who…",
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 24th",
            message:
              "After Mystery Hunt, we learned that an embedded color profile in the image of coats caused the colors to render slightly differently across different devices. We have removed the color profile and now believe that the colors should render as intended.",
          },
        ]}
      />
      <br />
      <LinkedImage
        className={NO_COPY_CLASS}
        src={scene}
        alt="Two rows of people in colorful coats. The top row has four people, and each person is playing an instrument. The bottom row has eight people. Each person has one or more musical notes hovering next to their head. Each coat is a different color and has a different icon on it."
      />
      <SizedImage
        className={NO_COPY_CLASS}
        src={setlist}
        alt={SETLIST_STRINGS.join(" ")}
      />
      <table className={COPY_ONLY_CLASS}>
        {SETLIST_STRINGS.map((string, i) => (
          <tr key={i}>
            <td>{string}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Puzzle;

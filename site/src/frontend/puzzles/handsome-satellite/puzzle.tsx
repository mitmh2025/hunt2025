import React from "react";
import { styled } from "styled-components";
import { CopyableBlanks } from "../../components/Blanks";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import img01 from "./assets/img01.png";
import img02 from "./assets/img02.png";
import img03 from "./assets/img03.png";
import img04 from "./assets/img04.png";
import img05 from "./assets/img05.png";
import img06 from "./assets/img06.png";
import img07 from "./assets/img07.png";
import img08 from "./assets/img08.png";
import img09 from "./assets/img09.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img14 from "./assets/img14.png";

const BLANKS: { structure: string; highlightIndex: number }[] = [
  { structure: "_________", highlightIndex: 6 },
  { structure: "__________________", highlightIndex: 12 },
  { structure: "_______________", highlightIndex: 13 },
  { structure: "____________", highlightIndex: 11 },
  { structure: "________________", highlightIndex: 13 },
  { structure: "_________________________________", highlightIndex: 28 },
  {
    structure: "________________________________________________________",
    highlightIndex: 50,
  },
  { structure: "______", highlightIndex: 5 },
  { structure: "________", highlightIndex: 4 },
  { structure: "__________", highlightIndex: 6 },
  { structure: "______________", highlightIndex: 8 },
  { structure: "________________________", highlightIndex: 23 },
  { structure: "____", highlightIndex: 3 },
];

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const makeAltText = (length: string, highlighted: string) => {
  return `A drawing of a black, vinyl record overlaid with ${length} crossword-style, black-outlined white squares. The ${highlighted} square is highlighted yellow.`;
};

const Puzzle = () => {
  return (
    <>
      <ul>
        <li>At a walking pace, musically</li>
        <li>1988 Tim Burton movie title</li>
        <li>It’s often confused with bison</li>
        <li>Farewell, casually</li>
        <li>Roman L</li>
        <li>Young women</li>
        <li>Turn signal, for example</li>
        <li>Whereabouts</li>
        <li>Red juice in a snowman-shaped bottle</li>
        <li>Vows</li>
        <li>Swing a club on the green</li>
        <li>Romantic partner (abbr.)</li>
        <li>Hole to get water</li>
      </ul>
      <FlexWrapper>
        <LinkedImage src={img01} alt={makeAltText("nine", "seventh")} />
        <LinkedImage src={img02} alt={makeAltText("eighteen", "thirteenth")} />
        <LinkedImage src={img03} alt={makeAltText("fifteen", "fourteenth")} />
        <LinkedImage src={img04} alt={makeAltText("twelve", "twelfth")} />
        <LinkedImage src={img05} alt={makeAltText("sixteen", "fourteenth")} />
        <LinkedImage
          src={img06}
          alt={makeAltText("thirty-three", "twenty-ninth")}
        />
        <LinkedImage
          src={img07}
          alt={makeAltText("fifty-six", "fifty-first")}
        />
        <LinkedImage src={img08} alt={makeAltText("six", "six")} />
        <LinkedImage src={img09} alt={makeAltText("eight", "fifth")} />
        <LinkedImage src={img10} alt={makeAltText("ten", "seventh")} />
        <LinkedImage src={img11} alt={makeAltText("fourteen", "ninth")} />
        <LinkedImage
          src={img12}
          alt={makeAltText("twenty-four", "twenty-fourth")}
        />
        <LinkedImage src={img13} alt={makeAltText("four", "fourth")} />
        <LinkedImage
          src={img14}
          alt="A drawing of a black, vinyl record overlaid with three blocks of crossword-style, black-outlined white squares. The first block is fifteen squares long, the second block is twelve squares long, and the third block is six squares long."
        />
      </FlexWrapper>
      {BLANKS.map(({ structure, highlightIndex }, i) => (
        <CopyableBlanks
          key={i}
          structure={structure.split("")}
          getAdditionalCellStyles={(index) =>
            index === highlightIndex ? { backgroundColor: "#ffff00" } : {}
          }
        />
      ))}
      <p className={COPY_ONLY_CLASS}>THE RERELEASED GREATEST HITS OF</p>
      <CopyableBlanks
        structure={"_______________ ____________ ______".split("")}
      />
    </>
  );
};

export default Puzzle;

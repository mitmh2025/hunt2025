import React from "react";
import { CopyableBlanks } from "../../components/Blanks";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { Errata } from "../../components/StyledUI";
import captions from "./assets/captions.vtt";
import pdf from "./assets/eponymous-forensic-accountant.pdf";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import video from "./assets/video.mp4";

const SUSPECTS_BLANKS: {
  structure: string;
  fill?: string;
  highlightIndices: number[];
}[] = [
  { structure: "______", highlightIndices: [0] },
  {
    structure: "______ _____",
    fill: "      -     ",
    highlightIndices: [0, 1, 2, 8],
  },
  { structure: "_____", highlightIndices: [0] },
  { structure: "_____", highlightIndices: [0] },
  { structure: "_____", highlightIndices: [4] },
  { structure: "_____", highlightIndices: [3] },
  { structure: "_______", highlightIndices: [5] },
  { structure: "_________", highlightIndices: [5] },
  { structure: "_ _______", fill: " ’       ", highlightIndices: [3] },
  { structure: "_______", highlightIndices: [4] },
  { structure: "______", highlightIndices: [4] },
  { structure: "______", highlightIndices: [3] },
  { structure: "______", highlightIndices: [1] },
  { structure: "____", highlightIndices: [2] },
  {
    structure: "______ ______",
    fill: "      -      ",
    highlightIndices: [0, 8, 11],
  },
  { structure: "______", highlightIndices: [5] },
  { structure: "_______", highlightIndices: [6] },
  {
    structure: "_______ _______",
    fill: "       -       ",
    highlightIndices: [4],
  },
  { structure: "____", highlightIndices: [0] },
  { structure: "___________", highlightIndices: [10] },
  { structure: "___ _______", highlightIndices: [7] },
  { structure: "____", highlightIndices: [0] },
];

const VICTIMS_BLANKS: {
  structure: string;
  fill?: string;
  highlightIndices: number[];
}[] = [
  { structure: "______", highlightIndices: [1] },
  { structure: "_________", highlightIndices: [0, 1, 2] },
  { structure: "_________", highlightIndices: [4] },
  { structure: "______", highlightIndices: [5] },
  { structure: "__________", highlightIndices: [8, 9] },
  { structure: "__ ______", highlightIndices: [3, 8] },
  {
    structure: "__ ____ __ ____",
    fill: "       -       ",
    highlightIndices: [0],
  },
  { structure: "_____", highlightIndices: [3] },
  {
    structure: "______ _______",
    fill: "      -       ",
    highlightIndices: [3],
  },
  { structure: "______", highlightIndices: [4] },
  { structure: "_____", highlightIndices: [1] },
  { structure: "_________", highlightIndices: [0, 2, 3] },
  { structure: "_____", highlightIndices: [1] },
  { structure: "__________", highlightIndices: [3, 4, 8] },
  { structure: "________", highlightIndices: [2] },
  { structure: "____", highlightIndices: [1] },
  { structure: "_____", highlightIndices: [2] },
  {
    structure: "_________ ______",
    fill: "         -      ",
    highlightIndices: [1, 5],
  },
  { structure: "________", highlightIndices: [0] },
  { structure: "______", highlightIndices: [5] },
  { structure: "_______", highlightIndices: [2, 4] },
  { structure: "__________", highlightIndices: [0, 4, 7] },
  { structure: "_________", highlightIndices: [3] },
  { structure: "_______", highlightIndices: [2] },
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 18th, at 18:40 PM",
            message:
              "The second-to-last row in the Suspects list previously copied to the clipboard incorrectly.  The image on the puzzle page was correct as given.  We have updated the copy-to-clipboard-button version to highlight the 7th underline in that row rather than the 8th.",
          },
        ]}
      />
      <AuthorsNoteBlock>
        <p>
          During Hunt, solvers were instructed to come to the Gala to pick up
          this puzzle, and to bring a bag. When they arrived, bartenders
          provided them with the physical component of this puzzle—56
          receipts—all in rapid succession, without much regard to whether
          solvers had brought a bag and whether that bag was appropriately
          sized. This resulted in some entertaining moments:
        </p>
        <p>
          <video controls>
            <source src={video} type="video/mp4" />
            <track
              label="English"
              kind="captions"
              srcLang="en"
              src={captions}
              default
            />
          </video>
        </p>
        <p>
          Regardless of whether you remembered to bring a bag, you may download
          a PDF of the contents of these receipts{" "}
          <a href={pdf} target="_blank" rel="noreferrer">
            here
          </a>
          . Each page of this PDF has four receipts that you will need to cut
          out.
        </p>
      </AuthorsNoteBlock>
      <p className="puzzle-flavor">
        To solve the case, narrow down to only the fraudulent receipts.
      </p>
      <LinkedImage
        className={NO_COPY_CLASS}
        src={image1}
        alt="A handwritten list of sets of blanks on ruled paper, labeled SUSPECTS."
      />
      <LinkedImage
        className={NO_COPY_CLASS}
        src={image2}
        alt="A handwritten list of sets of blanks on ruled paper, labeled VICTIMS."
      />
      <LinkedImage
        className={NO_COPY_CLASS}
        src={image3}
        alt="A Venn diagram. The sides are empty. The center contains comma-separated numbers."
      />
      <div className={COPY_ONLY_CLASS}>
        <h3>SUSPECTS</h3>
        {SUSPECTS_BLANKS.map(({ structure, fill, highlightIndices }, i) => (
          <CopyableBlanks
            key={i}
            structure={structure.split("")}
            fill={fill ? fill.split("") : undefined}
            fillCopyPosition="above"
            getAdditionalCellStyles={(index) =>
              highlightIndices.includes(index)
                ? { backgroundColor: "#ffff00" }
                : {}
            }
          />
        ))}
        <h3>VICTIMS</h3>
        {VICTIMS_BLANKS.map(({ structure, fill, highlightIndices }, i) => (
          <CopyableBlanks
            key={i}
            structure={structure.split("")}
            fill={fill ? fill.split("") : undefined}
            fillCopyPosition="above"
            getAdditionalCellStyles={(index) =>
              highlightIndices.includes(index)
                ? { backgroundColor: "#ffff00" }
                : {}
            }
          />
        ))}
        <div>1,</div>
        <div>5, 4,</div>
        <div>7, 2,</div>
        <div>1, 1,</div>
        <div>6, 2,</div>
        <div>3,</div>
      </div>
    </>
  );
};

export default Puzzle;

import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import art from "./assets/art.pdf";
import magnetsCricut from "./assets/magnets-cricut.png";
import magnetsPDF from "./assets/magnets.pdf";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <AuthorsNoteBlock>
        <p>
          This puzzle was provided as an envelope containing 116 pieces of
          (regular) paper and 40 magnets printed on magnetic sheets.
        </p>

        <p>
          If you’d like to try and solve it at home, you can print out the{" "}
          <a href={art} target="_blank" rel="noreferrer">
            paper
          </a>{" "}
          double-sided, flipping over the long edge, then cut into strips along
          the black outlines. You can also print out the “
          <a href={magnetsPDF} target="_blank" rel="noreferrer">
            magnets
          </a>
          ”, and then cut them out along their outlines (you should end up with
          40 clusters of words). These don‘t need to be printed out on magnetic
          sheets, although you certainly can, but if you do, make sure the
          sheets you use are appropriate for your printer.
        </p>

        <p>
          If you would alternatively like to solve this puzzle virtually, you
          can find a{" "}
          <a
            href="https://docs.google.com/presentation/d/1-PPLHPcn1oHFvXEbkixCOFomH_Gv9Fpiwe_11969ZXE/copy"
            target="_blank"
            rel="noreferrer"
          >
            digital version of the puzzle
          </a>{" "}
          with the same 156 pieces, adapted slightly for the “single-sided”
          nature of Google Slides.
        </p>

        <p>
          If you’re making a single copy of this puzzle, even if you want to
          strive for authenticity by using magnetic sheets, we would strongly
          recommend cutting out the magnets by hand. However, if you really love
          your Cricut (or other cutting plotter), we’ve included the{" "}
          <a href={magnetsCricut} target="_blank" rel="noreferrer">
            magnets in the format used to produce the puzzle
          </a>
          , which is squeezed together to fit on a Cricut cutting bed and
          formatted for import into Cricut Design Space. We will warn you that
          in our experience, producing the magnets using a Cricut did save
          direct human labor compared to cutting them out by hand, but did not
          save time.
        </p>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;

import { Math, MI } from "../../../components/MathML";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";
import Spoiler from "../../../components/Spoiler";
import { PuzzleAnswer } from "../../../components/StyledUI";
import rootUrl from "../../../utils/rootUrl";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        You’ve been practicing, right? He did say further demonstrations might
        be requested…
      </p>
      <AuthorsNoteBlock>
        <p>
          Successfully performing this task will not give you an answer used in
          any metapuzzle. Instead, you will receive one Key 🗝️.
        </p>
        <p>
          This task was released starting on Saturday morning to teams that had
          completed{" "}
          <a href={`${rootUrl}/puzzles/songs_on_the_radio`}>
            Songs on the Radio
          </a>
          . They were invited to use the radio’s{" "}
          <a href={`${rootUrl}/radio#station-pi`}>Instrumental Mode</a> to use
          the radio as a muscial instrument and perform for a member of the
          Press.
        </p>
        <p>
          Unless you have managed to{" "}
          <a href={`/2025/extras/radio`}>create your own radio</a> (or acquire
          one), this task is now impossible. However, if you are post-solving
          the Mystery Hunt and feel that you deserve an extra Key 🗝️, you can
          complete this task on any instrument (the weirder, the better) and
          judge for yourself if you’ve met the required criteria. The Press
          generally hoped to hear some rockets’ red glare.
        </p>
        <p>
          If you feel you’ve met a standard that we would have accepted, you can
          reward yourself an extra Key 🗝️ with the answer{" "}
          <Spoiler>
            <PuzzleAnswer>A TRUE VIRTUOSO</PuzzleAnswer>
          </Spoiler>
        </p>
      </AuthorsNoteBlock>
      <p>
        You will need to play the Star-Spangled Banner on your radio. Your radio
        must be tuned to station{" "}
        <Math>
          <MI>π</MI>
        </Math>
        .
      </p>
    </>
  );
};

export default Puzzle;

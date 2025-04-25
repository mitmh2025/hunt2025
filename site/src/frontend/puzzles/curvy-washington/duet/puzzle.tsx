import { Math, MI } from "../../../components/MathML";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";
import Spoiler from "../../../components/Spoiler";
import { PuzzleAnswer } from "../../../components/StyledUI";
import rootUrl from "../../../utils/rootUrl";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">You thought one was enough? It takes two.</p>
      <AuthorsNoteBlock>
        <p>
          Successfully performing this task will not give you an answer used in
          any metapuzzle. Instead, you will receive one Key 🗝️.
        </p>
        <p>
          This task was released starting on Sunday morning to teams that had
          completed{" "}
          <a href={`${rootUrl}/puzzles/songs_on_the_radio`}>
            Songs on the Radio
          </a>
          . They were invited to find a second team and use the radio’s{" "}
          <a href={`${rootUrl}/radio#station-pi`}>Instrumental Mode</a> to use
          the radio as a muscial instrument and perform for a member of the
          Press.
        </p>
        <p>
          Unless you have managed to{" "}
          <a href={`/2025/extras/radio`}>create your own radio</a> (or acquire
          one), this task is now impossible. However, if you are post-solving
          the Mystery Hunt and feel that you deserve an extra Key 🗝️, you can
          complete this task on any instrument (the weirder, the better,
          preferably with a second person) and judge for yourself if you’ve met
          the required criteria. The Press primarily was so delighted to see
          teams working together that their requirements were quite lenient,
          although at the same time teams were generally so skilled that the
          Press could have been quite strict with fairly little difference.
        </p>
        <p>
          If you feel you’ve met a standard that we would have accepted, you can
          reward yourself an extra Key 🗝️ with the answer{" "}
          <Spoiler>
            <PuzzleAnswer>TREBLE THREAT</PuzzleAnswer>
          </Spoiler>
        </p>
      </AuthorsNoteBlock>
      <p>
        You will need to play a song on your radio, as a duet with another team.
        Your radio must be tuned to station{" "}
        <Math>
          <MI>π</MI>
        </Math>
        . The choice of song is yours.
      </p>
    </>
  );
};

export default Puzzle;

import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote, AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { HScrollTableWrapper } from "../../components/StyledUI";
import rootUrl from "../../utils/rootUrl";
import "./assets/activation.opus";
import "./assets/completion-alt.opus";
import "./assets/completion.opus";
import footIcon from "./assets/foot.svg";
import headphonesIcon from "./assets/headphones.svg";
import lightIcon from "./assets/light.svg";
import magnetIcon from "./assets/magnet.svg";
import playIcon from "./assets/play.svg";
import questionIcon from "./assets/question.svg";
import radio from "./assets/radio.jpg";
import "./assets/stage-0-completion.opus";
import "./assets/stage-0-example.opus";
import "./assets/stage-0-intro.opus";
import "./assets/stage-1-completion.opus";
import "./assets/stage-1-example.opus";
import "./assets/stage-1-intro.opus";
import "./assets/stage-2-completion.opus";
import "./assets/stage-2-example.opus";
import "./assets/stage-2-intro.opus";
import "./assets/stage-3-completion.opus";
import "./assets/stage-3-example.opus";
import "./assets/stage-3-intro.opus";
import "./assets/stage-4-completion-alt.opus";
import "./assets/stage-4-completion.opus";
import "./assets/stage-4-example-alt.opus";
import "./assets/stage-4-example.opus";
import "./assets/stage-4-intro.opus";

const PuzzleTable = styled.table``;

const IconCell = styled.td`
  height: 2em;
  width: 2em;
  padding-right: 0.5em;
  padding-bottom: 0.5em;
`;

const Icon = styled.img`
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
`;

const ClueCell = styled.td`
  padding-bottom: 0.5em;
`;

const Puzzle = ({ teamState }: { teamState: TeamHuntState }) => {
  return (
    <>
      <NotoColorEmojiFont />
      {teamState.puzzles.songs_on_the_radio?.answer !== undefined && (
        <AuthorsNote>
          Congratulations on solving this puzzle! Your{" "}
          <a href={`${rootUrl}/radio`}>radio’s instruction manual</a> has been
          updated with instructions on how to make your own music with your
          radio.
        </AuthorsNote>
      )}
      <p className="puzzle-flavor">
        Where’s the grid for this criss-cross anyway?
      </p>

      <AuthorsNoteBlock>
        <p>
          This puzzle requires the <a href={`${rootUrl}/radio`}>radio</a> given
          to teams at kickoff in order to solve. If you’d like to solve the
          first part of the puzzle, you may find this photo of the back of the
          radio helpful:
        </p>

        <LinkedImage src={radio} alt="The back of the radio" />
      </AuthorsNoteBlock>

      <HScrollTableWrapper>
        <PuzzleTable>
          <tr>
            <IconCell />
            <ClueCell>If no one is 🎵 you, say, “Baby, I love you”</ClueCell>
          </tr>
          <tr>
            <IconCell>
              <Icon src={playIcon} alt="An icon" />
            </IconCell>
            <ClueCell>
              I‘m telling you to loosen up my 🎵s babe, but you keep fronting
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>She wanna rib you up to start a 🎵 war</ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>
              Rays of dust that wrap around your citizen, kind enough to 🎵
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>
              She used to meet me on the 🎵side, In the city where the sun don‘t
              set
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>
              You had a boyfriend, who looked like a girlfriend, that I had in
              🎵 of last year
            </ClueCell>
          </tr>
          <tr>
            <IconCell>
              <Icon src={footIcon} alt="An icon" />
            </IconCell>
            <ClueCell>Now I gotta cut loose, 🎵loose</ClueCell>
          </tr>
          <tr>
            <IconCell>
              <Icon src={headphonesIcon} alt="An icon" />
            </IconCell>
            <ClueCell>Got your Dre 🎵 with the left side on</ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>Please don‘t take 🎵 just because you can</ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>Losing him was blue, like I‘d never 🎵</ClueCell>
          </tr>
          <tr>
            <IconCell>
              <Icon src={lightIcon} alt="An icon" />
            </IconCell>
            <ClueCell>Come on baby 🎵 my fire</ClueCell>
          </tr>
          <tr>
            <IconCell>
              <Icon src={magnetIcon} alt="An icon" />
            </IconCell>
            <ClueCell>
              Push and pull like a 🎵 do, although my heart is fallin‘, too
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>
              You found a 🎵 girl, and it only took a couple weeks
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>
              Daytime friends and 🎵 lovers, hoping no one else discovers
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>
              And the sign said, “The words of the prophets are written on the
              🎵 walls…”
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell>
              And I know that he knows I‘m 🎵, and it kills him inside
            </ClueCell>
          </tr>
          <tr>
            <IconCell />
            <ClueCell />
          </tr>
          <tr>
            <IconCell>
              <Icon src={questionIcon} alt="An icon" />
            </IconCell>
            <ClueCell>🎵🎵🎵 (in tempo)</ClueCell>
          </tr>
        </PuzzleTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Puzzle;

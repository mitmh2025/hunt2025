import { styled } from "styled-components";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import Spoiler from "../../components/Spoiler";
import { PuzzleAnswer } from "../../components/StyledUI";
import morty from "./assets/morty.svg";

const StyledImg = styled.img`
  height: 7rem;
`;

const Puzzle = () => {
  return (
    <>
      <AuthorsNoteBlock>
        <p>
          This puzzle was an on-campus escape room-style interaction,
          experienced in-person by a single player from each team, with the
          remainder of the team helping (or at least “helping”) via a live
          stream. You can watch as team The Moment I Knew experiences Control
          Room for themselves:
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/5E__SIVPxqo"
          title="Control Room (Recap) - MITMH2025"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: "100%", height: "100%", aspectRatio: "16 / 9" }}
        ></iframe>

        <p>
          Unfortunately, due to the nature of this puzzle, there is no way to
          solve it after the fact. Teams were given the answer to the puzzle
          after successfully finishing the escape room experience, but if you
          are working through the puzzles now, you can submit the answer{" "}
          <Spoiler>
            <PuzzleAnswer>PIVOT TABLE</PuzzleAnswer>
          </Spoiler>
          .
        </p>

        <p>
          Additionally, if you participated in this puzzle (either as the player
          or the team guiding them), you can:
        </p>

        <p>
          <a
            href="https://morty.app/attraction/55472/control-room"
            target="_blank"
            rel="noreferrer"
          >
            <StyledImg src={morty} alt="Find us on Morty" />
          </a>
        </p>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;

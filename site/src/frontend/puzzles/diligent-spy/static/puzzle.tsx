import React from "react";
import { AuthorsNote } from "../../../components/PuzzleLayout";
import rootUrl from "../../../utils/rootUrl";
import staticAudio from "../assets/static.flac";

const Puzzle = () => {
  return (
    <>
      <p>
        <a href={`${rootUrl}/puzzles/can_do_transmissions`}>
          ← Back to the puzzle
        </a>
      </p>

      <AuthorsNote as="div">
        <p>
          During Mystery Hunt, teams would need to capture the static from their
          radios in order to complete this step of the puzzle. For convenience,
          we have reproduced the static below. You can return to the main puzzle
          page to submit the final answer.
        </p>

        <p>
          As with the numbers station, the radio would simulate the static as
          playing on a constant loop, which we have attempted to replicate
          below. And as with the numbers station, if you manually seek to any
          point in the audio file, the auto-seeking behavior should stop. We
          have also made no attempt to suppress downloading the audio file,
          which would certainly make analysis more straightforward than it was
          during Mystery Hunt.
        </p>

        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- no transcription */}
        <audio
          id="can-do-transmissions-audio"
          src={staticAudio}
          controls
          loop
        />
      </AuthorsNote>
    </>
  );
};

export default Puzzle;

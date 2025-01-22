import React from "react";
import { Math, MFrac, MI, MN, MRow } from "../../components/MathML";
import { AuthorsNote } from "../../components/PuzzleLayout";
import numbers from "./assets/numbers.mp3";
import "./assets/numbers.opus";
import "./assets/static.opus";

const station = (
  <Math>
    <MFrac>
      <MRow>
        <MN>37</MN>
        <MI>π</MI>{" "}
      </MRow>
      <MN>20</MN>
    </MFrac>
  </Math>
);

const Puzzle = () => (
  <>
    <p>
      Scanning late at night, you notice a faint signal from your radio on a
      MITropolis-based numbers station, PM {station}.
    </p>

    <AuthorsNote as="div">
      <p>
        During Mystery Hunt, when teams unlocked this puzzle, the new PM{" "}
        {station} station would become tunable on the radio, and teams would
        hear the following on loop. The radio simulated a continuous non-stop
        transmission, meaning that it would start at a “random” point. We have
        attempted to replicate this behavior below. However if you manually seek
        to any point in the audio file, the auto-seeking behavior should stop.
      </p>

      <p>
        (We have also included a transcript for the archives, but note that no
        transcript was available for radio broadcasts during Mystery Hunt, and
        an accurate transcription may help short-cut one or more steps of the
        puzzle.)
      </p>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- transcription below */}
      <audio id="can-do-transmissions-audio" src={numbers} controls loop />
      <details>
        <summary>Transcription</summary>

        <p>
          orchestral tuner 1 3 0 8 0<br />
          grandma’s nickname 7 1 7 0 7<br />
          echo prototype 2 3 2 4 0<br />
          container weight 7 0 2 0 6<br />
          list member 1 4 1 3 0<br />
          boxer tyson 7 2 0 2 3<br />
          commodores hit 1 1 2 1 0<br />
          singer gabriel 7 0 3 1 8<br />
          competent 2 2 0 8 0<br />
          man’s best friend 7 0 8 0 6<br />
          romantic couple 1 3 0 4 1<br />
          glucose 8 2 5 1 5<br />
          common vetch 2 1 0 6 1<br />
          now brown cow 8 1 4 2 2<br />
          staples button 1 1 0 9 0<br />
          moore bond 4 1 3 0 4<br />
          qualified 0 4 2 3 0<br />
          bounty hunter 0 0 6 0 5<br />
          news article 1 1 2 1 1<br />
          wind instrument 0 1 0 0 4<br />
          linebacker role 2 0 1 2 0<br />
          adept 1 1 8 0 0<br />
          zero over zero 1 9 2 4 1<br />
          aunt man 7 0 4 1 5<br />
          skilled 1 2 0 0 1<br />
          tennis score 7 1 5 1 7<br />
        </p>
      </details>
    </AuthorsNote>
  </>
);

export default Puzzle;

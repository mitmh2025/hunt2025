import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

export default function Puzzle() {
  return (
    <>
      <p className="puzzle-flavor">
        What is needed from any good P.I. when putting together the pieces?
      </p>

      <AuthorsNoteBlock>
        <p>
          For this event, teams had to work together to solve a murder. By using
          and rearranging a set of colored paper cutouts to tell a story, they
          had to convince a team of hapless detectives (i.e. us) who had died,
          how they had died, and why they had died. After each round, the
          detectives picked the image (and answer) they liked the most, which
          became canon going forward.
        </p>
        <p>
          You can watch a recap of the event and see some of the resulting
          artwork (and the resulting answer) here:
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6YReAABmE6A"
          title="Seeing the Big Picture (Recap) - MITMH2025"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p>
          (Still photographs were taken by Sam Freilich, Keri Ashton Fullwood,
          Wesley Graybill. Our thanks to Steve Ewing of Stand Inside Media who
          joined us for the weekend as our official videographer; all of the
          video footage in this recap was taken by him.)
        </p>
      </AuthorsNoteBlock>
    </>
  );
}

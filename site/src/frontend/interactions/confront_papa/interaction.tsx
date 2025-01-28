import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

const Interaction = () => {
  return (
    <>
      <p className="puzzle-flavor">
        It’s time to confront Papa with what you’ve learned.
      </p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were instructed to find Papa at the Gala
          and discreetly let him know that you know his secret, or ask around at
          the bar if they didn’t see him.
        </p>

        <p>
          While confronting Papa, teams had to perform a short activity to
          assemble an IOU, since Papa owed them a favor for keeping this quiet.
          A video recording of the remainder of the confrontation is below.
        </p>
      </AuthorsNoteBlock>

      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/tL_bBh4GHCU"
          title="Confronting Papa"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </p>
    </>
  );
};

export default Interaction;

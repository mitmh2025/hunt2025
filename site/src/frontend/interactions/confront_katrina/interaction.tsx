import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

const Interaction = () => {
  return (
    <>
      <p className="puzzle-flavor">
        It’s time to confront Katrina with what you’ve learned.
      </p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were instructed to find Katrina at the Gala
          and discreetly let her know that you know her secret, or ask around at
          the bar if they didn’t see her.
        </p>

        <p>
          While confronting Katrina, teams had to perform a short activity to
          track down a dirty cop, which put Katrina in their debt. A video
          recording of the remainder of the confrontation is below.
        </p>
      </AuthorsNoteBlock>

      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6XE5GnTGcTk"
          title="Confronting Katrina"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: "100%", height: "100%", aspectRatio: "16 / 9" }}
        ></iframe>
      </p>
    </>
  );
};

export default Interaction;

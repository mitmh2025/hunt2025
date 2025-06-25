import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

const Interaction = () => {
  return (
    <>
      <p className="puzzle-flavor">
        It’s time to confront Carter with what you’ve learned.
      </p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were instructed to find Carter at the Gala
          and discreetly let him know that you know his secret, or ask around at
          the bar if they didn’t see him.
        </p>

        <p>
          While confronting Carter, teams had to help him escape a tail by
          disguising one of themselves as him using a collection of clothes. A
          video recording of the remainder of the confrontation is below.
        </p>
      </AuthorsNoteBlock>

      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/LiZTxxRUhe0"
          title="Confronting Carter"
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

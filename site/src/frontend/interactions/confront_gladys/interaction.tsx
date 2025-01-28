import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

const Interaction = () => {
  return (
    <>
      <p className="puzzle-flavor">
        It’s time to confront Gladys with what you’ve learned.
      </p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were instructed to find Gladys at the Gala
          and discreetly let her know that you know her secret, or ask around at
          the bar if they didn’t see her.
        </p>

        <p>
          While confronting Gladys, teams had to look through her purse in order
          to discover proof of her counterfeit operation. A video recording of
          the remainder of the confrontation is below.
        </p>
      </AuthorsNoteBlock>

      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/U0wNKdgCnFg"
          title="Confronting Gladys"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </p>
    </>
  );
};

export default Interaction;

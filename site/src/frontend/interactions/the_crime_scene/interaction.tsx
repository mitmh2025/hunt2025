import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

const Interaction = () => {
  return (
    <>
      <p>It’s time to confront Sidecar with what you’ve learned.</p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams would receive a phone call from an
          associate of the Two P.I. Noir Detective Agency to schedule a meeting
          with Billie. They would meet Baby at the Gala, who would take them to
          the Speakeasy where they were to confront Sidecar.
        </p>

        <p>A video recording of the resulting scene is below.</p>
      </AuthorsNoteBlock>

      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/y42_hlCgy1s"
          title="The Crime Scene"
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

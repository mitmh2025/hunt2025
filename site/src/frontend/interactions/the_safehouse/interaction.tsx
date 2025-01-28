import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

const Interaction = () => {
  return (
    <>
      <p>It’s time to bring Rover in.</p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams would receive a call from the Two P.I. Noir
          Detective Agency to schedule a meeting with Billie; Billie and Baby
          would take the team to Rover’s hiding spot.
        </p>

        <p>A video recording of the resulting scene is below.</p>
      </AuthorsNoteBlock>

      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/rPZqjz7Jonw"
          title="The Safehouse"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </p>
    </>
  );
};

export default Interaction;

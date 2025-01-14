import React from "react";
import img1 from "./assets/solution-1.png";
import img2 from "./assets/solution-2.png";

export default function Solution() {
  return (
    <>
      <p>
        When participants arrived, they were split up into groups and presented
        with a crime scene constructed as a collage of a number of cutouts that
        they could rearrange. This was the scene they were presented with:
      </p>

      <img src={img1} alt="A crime scene collage" style={{ width: "100%" }} />

      <p>
        They were then told that it’s up to them to figure out who the victim
        was, how they were killed, and why. They were asked to rearrange the
        collage that they were given to illustrate a story about the victim of
        the crime scene. In sequence, they were asked the questions:
      </p>

      <ul>
        <li>Who is the victim? Give a snapshot of their typical day.</li>
        <li>How were they killed? Illustrate their final moments.</li>
        <li>Why were they killed? Show a scene motivating their murder.</li>
      </ul>

      <p>
        Once participant teams presented all of their scenes, each was handed a
        piece of jigsaw puzzle. The teams then needed to assemble their pieces
        together into the completed jigsaw, which displayed the answer for the
        event.
      </p>

      <img
        src={img2}
        alt="A collage reading “THE OLD COLLAGE TRY”"
        style={{ width: "100%" }}
      />
    </>
  );
}

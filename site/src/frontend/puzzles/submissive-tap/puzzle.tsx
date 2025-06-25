import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

export default function Puzzle() {
  return (
    <>
      <p className="puzzle-flavor">
        That was a lot of effort to get one piece of information, wasn’t it?
      </p>
      <AuthorsNoteBlock>
        <p>
          For this event, teams had to follow a suspect around MITropolis. The
          suspect turned out to be quite loose-lipped when they thought nobody
          was around, and teams were provided with a set of instructions for how
          to render themselves invisible, at least as far as the suspect could
          tell. Teams had to follow the suspect around, remain hidden, and learn
          what they could from the suspect’s conversations.
        </p>

        <p>
          In this video, you can watch as one set of teams follows their lead
          (mostly successfully). When all was said and done, teams could use the
          information they had gathered to come up with the answer for this
          event; there should be enough information in the video for you to
          figure it out as well, so the video doesn’t spell out the answer for
          you.
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dHqM3H2vmHg"
          title="Tailing a Lead (Recap) - MITMH2025"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: "100%", height: "100%", aspectRatio: "16 / 9" }}
        />

        <p>
          (During Mystery Hunt, we provided a more streamlined and less
          informative video for teams who were participating remotely. You will
          likely find it easier to solve the puzzle using our updated video
          above, but you can also still{" "}
          <a
            href="https://www.youtube.com/watch?v=Ka2V--_PxXw"
            target="_blank"
            rel="noreferrer"
          >
            watch the original
          </a>{" "}
          if you’d like.)
        </p>
      </AuthorsNoteBlock>
    </>
  );
}

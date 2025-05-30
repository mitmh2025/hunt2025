import React from "react";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

export default function Puzzle() {
  return (
    <>
      <p className="puzzle-flavor">
        What will help you fit in with high society?
      </p>

      <AuthorsNoteBlock>
        <p>
          For this event, teams had to successfully schmooze members of the
          elite, or at least our practice members of the elite, by making them a
          drink that would lubricate the conversation. Each of the “marks” had
          their own taste, requiring a specific color of glass, garnish,
          cocktail sword, and liquid, and would give off subtle cues to guide
          teams on what they wanted.
        </p>
        <p>
          You can watch a recap of the event and see if you can figure out for
          yourself how the marks were communicating in this video (which also
          includes the eventual answer that teams received):
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/184OMCwjOJ4"
          title="Navigating High Society (Recap) - MITMH2025"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </AuthorsNoteBlock>
    </>
  );
}

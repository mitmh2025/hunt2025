import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";

export default function Puzzle({ teamState }: { teamState: TeamHuntState }) {
  const eventConcluded = teamState.rounds.events?.gates?.includes("evg01");

  return (
    <>
      <p className="puzzle-flavor">
        That was a lot of effort to get one piece of information, wasn’t it?
      </p>
      {eventConcluded && (
        <>
          <p>
            For your convenience, this is a recording of what all teams that
            participated in the event live should have encountered. All teams
            received the same content.
          </p>
          <p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Ka2V--_PxXw?si=_PrJyatdoplR7rac"
              title="Tailing a Lead"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </p>
        </>
      )}
    </>
  );
}

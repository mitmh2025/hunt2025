import React from "react";
import { type TeamInfo, type TeamHuntState } from "../../../../lib/api/client";
import HUNT from "../../../huntdata";
import { PUZZLES } from "../../puzzles";
import EventsBody from "./EventsBody";
import { eventDataForTeam } from "./eventData";
import { type EventsState } from "./types";

const BUYABLE_ANSWERS: Record<string, { title: string; slug: string }> = {};

HUNT.rounds.forEach((round) => {
  if (round.slug === "events") {
    return;
  }

  round.puzzles.forEach((puzzle) => {
    if (
      puzzle.is_meta === true ||
      puzzle.is_supermeta === true ||
      !puzzle.slug
    ) {
      return;
    }

    const puzzleDef = PUZZLES[puzzle.slug];
    if (!puzzleDef) {
      return;
    }

    BUYABLE_ANSWERS[puzzle.slug] = {
      title: puzzleDef.title,
      slug: puzzle.slug,
    };
  });
});

export function eventsState(
  teamState: TeamHuntState,
  { username }: { username: string },
): EventsState {
  const events = eventDataForTeam(username).map((event) => {
    return {
      ...event,
      locked:
        teamState.puzzles[event.slug]?.locked === "unlocked"
          ? "unlocked"
          : "locked",
      answer: teamState.puzzles[event.slug]?.answer,
    } as const;
  });

  const strongCurrency = teamState.strong_currency;

  const puzzlesCanBuyAnswerTo = [];
  for (const [slug, puzzle] of Object.entries(teamState.puzzles)) {
    if (puzzle.answer !== undefined || puzzle.locked !== "unlocked") {
      continue;
    }

    const buyableAnswer = BUYABLE_ANSWERS[slug];
    if (buyableAnswer) {
      puzzlesCanBuyAnswerTo.push(buyableAnswer);
    }
  }

  puzzlesCanBuyAnswerTo.sort((a, b) => a.title.localeCompare(b.title));

  return {
    epoch: teamState.epoch,
    events,
    strongCurrency,
    puzzlesCanBuyAnswerTo,
  };
}

const EventsRoundPage = ({
  teamState,
  teamInfo,
}: {
  teamState: TeamHuntState;
  teamInfo: TeamInfo;
}) => {
  const state = eventsState(teamState, { username: teamInfo.teamUsername });

  const inlineScript = `window.initialEventsState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="events-root">
        <EventsBody state={state} />
      </div>
    </>
  );
};

export default EventsRoundPage;

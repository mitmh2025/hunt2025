import React from "react";
import { styled } from "styled-components";
import {
  PuzzleMain,
  PuzzleHeader,
  PuzzleTitle,
  PuzzleWrapper,
} from "../../components/PuzzleLayout";
import { PuzzleIcon } from "../../components/PuzzleLink";
import CluesManager from "./CluesManager";
import { EventsFonts } from "./EventsFonts";
import { type EventSlug, type EventsState } from "./types";

const puzzleDescriptions: { [K in EventSlug]: JSX.Element } = {
  making_contact_with_an_informant: <>Some description goes here!</>,
  navigating_high_society: <>Some description goes here!</>,
  seeing_the_big_picture: <>Some description goes here!</>,
  tailing_a_lead: <>Some description goes here!</>,
};

const PuzzleDescription = styled.p`
  font-style: italic;
`;

const EventsDescription = styled.p`
  font-style: italic;
`;

const EventsHeader = styled(PuzzleHeader)`
  display: block;
`;

const EventsMain = styled(PuzzleMain)`
  h2 {
    font-family: "Eccentric", "Noto Color Emoji";
    font-size: 3rem;
    padding: 0;
  }

  h3 {
    font-family: "Playwrite";
  }
`;

const EventListing = styled.div`
  margin-bottom: 2rem;
`;

const PuzzleLink = styled.div`
  .puzzle-link-status-icon {
    margin-right: 0.5rem;
    margin-top: -0.25rem;
  }
`;

export default function EventsBody({ state }: { state: EventsState }) {
  return (
    <PuzzleWrapper>
      <EventsFonts />
      <EventsHeader>
        <PuzzleTitle>Events</PuzzleTitle>
        <EventsDescription>
          This is some text about events. It probably also talks about clues.
        </EventsDescription>
      </EventsHeader>

      <EventsMain>
        <h2>🔎 Clues</h2>
        {state.strongCurrency > 0 ? (
          <CluesManager state={state} />
        ) : (
          <PuzzleDescription>
            You do not have any clues available.
          </PuzzleDescription>
        )}

        <h2 style={{ marginTop: "3rem" }}>Event Schedule</h2>
        {state.events.map((event) => {
          return (
            <EventListing key={event.slug}>
              <h3>{event.name}</h3>
              <p>
                {event.time}
                <br />
                {event.location}
              </p>
              <PuzzleDescription>
                {puzzleDescriptions[event.slug]}
              </PuzzleDescription>
              {event.locked === "locked" ? (
                <PuzzleLink>
                  Answer submission will be available shortly after all teams
                  have completed the event.
                </PuzzleLink>
              ) : event.answer ? (
                <PuzzleLink>
                  <a href={`/puzzles/${event.slug}`}>
                    <PuzzleIcon
                      lockState={event.locked}
                      answer={event.answer}
                    />
                    <code style={{ fontWeight: "bold" }}>{event.answer}</code>
                  </a>
                </PuzzleLink>
              ) : (
                <PuzzleLink>
                  <a href={`/puzzles/${event.slug}`}>
                    <PuzzleIcon
                      lockState={event.locked}
                      answer={event.answer}
                    />
                    Submit an answer
                  </a>
                </PuzzleLink>
              )}
            </EventListing>
          );
        })}
      </EventsMain>
    </PuzzleWrapper>
  );
}

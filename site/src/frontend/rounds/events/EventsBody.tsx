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
import { lightBgLinkStyles } from "../../components/StyledUI";

const puzzleDescriptions: { [K in EventSlug]: JSX.Element } = {
  making_contact_with_an_informant: (
    <>
      We’ve learned that an informant is interested in giving up some
      information. Please send 1–2 trainees who like to make connections and
      make new friends, and who can move around a room for the duration of the
      event. Please arrive promptly; participation cannot be guaranteed for late
      arrivals.
    </>
  ),

  tailing_a_lead: (
    <>
      Please send 1–2 trainees who can think on their feet, are masters of
      disguise, and have a sixth sense for sneakiness. Each person should bring
      a towel–a most massively useful thing. Paper, a writing utensil, and a
      clipboard could also come in handy. They’ll be tailing a lead for a while,
      so they should be comfortable with moderate physical activity, including
      navigating stairs.
    </>
  ),

  navigating_high_society: (
    <>
      Please send 1–2 trainees with an eye for detail. They’ll be handing
      lemons, limes, oranges, cherries, and grapes; although nothing will be
      consumed, do not send anyone with food allergies to this event. Please
      note that this event is not colorblind-friendly.
    </>
  ),

  seeing_the_big_picture: (
    <>
      Please send 1–2 trainees with a flair for creativity, who can assess a
      crime scene and see things in new ways.
    </>
  ),
};

const PuzzleDescription = styled.p`
  font-style: italic;
`;

const EventsDescription = styled.p`
  font-style: italic;
`;

const EventsHeader = styled(PuzzleHeader)`
  display: block;

  a {
    ${lightBgLinkStyles}
  }
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

  a {
    ${lightBgLinkStyles}
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
          <p>
            Billie and the Two P.I. Noir Detective Agency are counting on you to
            get to the bottom of this case. To support you in becoming the best
            detective you can be, Billie has organized a crash course of
            training sessions on how to be a P.I. Come hone your skills with
            valuable lessons to help you along in your investigation.
          </p>
          <p>
            At the completion of each training session, you’ll earn a Clue{" "}
            <span style={{ fontStyle: "normal" }}>🔎</span>, a valuable tool in
            your overall ability to proceed in your investigation. Please see{" "}
            <a href="/about">the About page</a> for more information about Clues{" "}
            <span style={{ fontStyle: "normal" }}>🔎</span>.
          </p>
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

import React from "react";
import { styled } from "styled-components";
import "./assets/waypoint0.opus";
import "./assets/waypoint1.opus";
import "./assets/waypoint10.opus";
import "./assets/waypoint11.opus";
import "./assets/waypoint12.opus";
import "./assets/waypoint13.opus";
import "./assets/waypoint14.opus";
import "./assets/waypoint15.opus";
import "./assets/waypoint16.opus";
import "./assets/waypoint17.opus";
import "./assets/waypoint18.opus";
import "./assets/waypoint19.opus";
import "./assets/waypoint2.opus";
import "./assets/waypoint20.opus";
import "./assets/waypoint21.opus";
import "./assets/waypoint22.opus";
import "./assets/waypoint23.opus";
import "./assets/waypoint24.opus";
import "./assets/waypoint25.opus";
import "./assets/waypoint26.opus";
import "./assets/waypoint27.opus";
import "./assets/waypoint28.opus";
import "./assets/waypoint3.opus";
import "./assets/waypoint4.opus";
import "./assets/waypoint5.opus";
import "./assets/waypoint6.opus";
import "./assets/waypoint7.opus";
import "./assets/waypoint8.opus";
import "./assets/waypoint9.opus";
import type { TeamHuntState } from "../../../../lib/api/client";
import { Math, MFrac, MI, MN, MRow } from "../../components/MathML";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { MailtoLink } from "../../components/StyledUI";

const Note = styled.p`
  margin: 0 2em;
  font-size: 24px;
  font-family: "Reenie Beanie";
`;

const Puzzle = ({
  teamName,
  teamState,
}: {
  teamName: string;
  teamState: TeamHuntState;
}) => {
  const videoReleased =
    teamState.rounds.missing_diamond?.gates?.includes("mdg12") ?? false;

  return (
    <>
      <p className="puzzle-flavor">We need to speak with Billie right away.</p>

      <AuthorsNoteBlock>
        <p>
          Send 2-4 investigators with no mobility or hearing impairments to the
          Gala, and tell a bartender that you’re looking for Billie. Your
          investigators will need your team’s radio. They will need to be able
          to do quite a bit of walking, but very little of it outside. They may
          be out of your office for an hour or so with the radio, so remember to
          tune to 2π in your browser.
        </p>

        <p>
          If you cannot do this on-campus activity due to campus availability or
          accessibility concerns, or you are stuck or not having fun, you may
          contact HQ if this puzzle has been open for at least 3 hours and we
          will arrange an alternative for you. To do this, send an email to
          <MailtoLink subject={"THE FINAL WITNESS"} /> with the subject line
          “THE FINAL WITNESS” (that’s not an answer, it just helps us with
          dispatch). However, we strongly recommend you experience it in person
          if possible.
        </p>
      </AuthorsNoteBlock>

      <p className="puzzle-flavor">How should we confront the thief?</p>

      {videoReleased && (
        <>
          <hr />
          <p>
            When you arrived at the Gala, a paralegal met you with a note from
            Billie:
          </p>
          <Note>
            <i>Dear {teamName}:</i>
            <br />
            <i>
              I need your help with something. There’s one more witness we need
              to track down. But there’s too many open ears in this place, so
              let’s meet somewhere a little more private. First things first,
              give my associate that radio.
            </i>
          </Note>
          <p>
            The paralegal then took your radio and tuned it to{" "}
            <Math>
              <MFrac>
                <MRow>
                  <MN>17</MN>
                  <MI>π</MI>
                </MRow>
                <MRow>
                  <MN>10</MN>
                </MRow>
              </MFrac>
            </Math>{" "}
            before returning it to you and continuing to read:
          </p>
          <Note>
            <i>
              Make a note, kid; this is the best station for catching crooks. I
              have some last minute business to take care of nearby, but head
              down those stairs and out the door and I’ll meet you there in a
              minute.
            </i>
          </Note>
          <p>
            You then left down the stairs to find Billie, but when you got to
            the bottom of the staircase, Billie’s voice came to you over the
            radio:
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/9XjTJp2fDPQ?"
            title="The Runaround"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </>
      )}
    </>
  );
};

export default Puzzle;

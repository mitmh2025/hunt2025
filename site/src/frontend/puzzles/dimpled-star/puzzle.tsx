import React from "react";
import { styled } from "styled-components";
import { Math, MFrac, MI, MN, MRow } from "../../components/MathML";
import { AuthorsNote, AuthorsNoteBlock } from "../../components/PuzzleLayout";
import archiveMode from "../../utils/archiveMode";
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

const Note = styled.p`
  margin: 0 2em;
  font-size: 24px;
  font-family: "Reenie Beanie";
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">We need to speak with Billie right away.</p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams were told to send 2-4 investigators with no
          mobility or hearing impairments to the Gala, and tell a bartender that
          they were looking for Billie. They were told that investigators would
          need your team’s radio, and that they would need to be able to do
          quite a bit of walking, but very little of it outside. Teams were also
          reminded to tune to 2π in their browser while the investigators were
          out of the office with the radio.
        </p>
      </AuthorsNoteBlock>

      <p className="puzzle-flavor">How should we confront the thief?</p>

      <hr />

      <AuthorsNoteBlock>
        <p>
          When teams arrived at the Gala, a bartender informed them that Billie
          had left a note behind <em>specifically</em> for them, and proceeded
          to read it exactly as written:
        </p>
      </AuthorsNoteBlock>

      <Note>
        <i>Dear [insert team name here]:</i>
        <br />
        <i>
          I need your help with something. There’s one more witness we need to
          track down. But there’s too many open ears in this place, so let’s
          meet somewhere a little more private. First things first, give my
          associate that radio.
        </i>
      </Note>
      <AuthorsNote>
        At this point, the bartender took the radio and tuned it to{" "}
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
        before returning it and continuing to read:
      </AuthorsNote>
      <Note>
        <i>
          Make a note, kid; this is the best station for catching crooks. I have
          some last minute business to take care of nearby, but head down those
          stairs and out the door and I’ll meet you there in a minute.
        </i>
      </Note>

      <AuthorsNoteBlock>
        <p>
          After this briefing, teams left down the stairs out of the Gala to
          find Billie. However, when they reached the bottom of the staircase,
          Billie’s voice suddenly began speaking to them through their radio. As
          they followed Billie around campus via the narration, they would
          receive additional instruction via radio voiceover.
        </p>

        <p>
          These messages were triggered by BlueTooth Low Energy beacons
          configured as iBeacons and placed around campus. Because the beacons
          were quite small — roughly 50mm×50mm×20mm — they could be hidden out
          of sight, while still being detectable from a roughly 3 meter radius.
          When tuned to{" "}
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
          </Math>
          , the radio would aggressively scan for these beacons, keep track of
          the highest beacon that it had seen (only incrementing the counter by
          one at a time to avoid accidentally skipping forward), and play the
          corresponding audio file when a new beacon was detected. In order to
          avoid issues with wireless connectivity, all of the audio clips were
          stored locally on the radio’s flash.
        </p>

        {archiveMode && (
          <p>
            (If you’d like to read more about the radio’s hardware and software
            design, there is <a href="/2025/extras/radio">an entire page</a>{" "}
            with additional details.)
          </p>
        )}

        <p>
          The following video shows the path around campus, with the voiceover
          that would have come from the radio. During Mystery Hunt, it was be
          released to teams on request once at least 3 hours had passed since
          the puzzle was unlocked.
        </p>
      </AuthorsNoteBlock>
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
  );
};

export default Puzzle;

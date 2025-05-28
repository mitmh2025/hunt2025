import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import game from "./assets/game.mp3";
import image from "./assets/image.png";
import phone from "./assets/phone.jpg";
import worksheetBack from "./assets/worksheet-back.png";
import worksheetFront from "./assets/worksheet-front.svg";

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 350px;
  margin: auto;
`;

const WorksheetContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.5em;

  & > div {
    flex-basis: 50%;

    & a {
      display: flex;
      align-items: center;
      height: 100%;
      background: white;
    }
  }
`;

const Caption = styled.span`
  font-style: italic;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>You find a note slipped under your door:</p>
      <SizedImage
        src={image}
        alt="I have some information on your case you might find useful. Call me, but stay safe—there’s a phone behind the bar at the Gala you can use. Just tell the bartender you want to call extension Carousel-18576. - a friend"
      />

      <br />

      <AuthorsNote as="div">
        <p>
          During Mystery Hunt, teams were instructed to send exactly three
          people with a tolerance for loud noises. However, upon arriving at the
          Gala, the bartenders informed them that the phone behind the bar was
          broken.
        </p>

        <p>
          <center>
            <LinkedImage
              src={phone}
              alt="A photo of someone receiving a phone call at the bar."
            />
            <br />
            <Caption>
              (It seems to be working right now, but we can assure you that it
              wasn’t by the time you arrived.)
            </Caption>
          </center>
        </p>

        <p>
          Bartenders would instead ask teams if they could stop by one of the
          two nearest exchange offices to look into it.
        </p>

        <p>
          Arriving at one of the “exchange offices,” teams were given fairly
          little instruction but thrown in front of a “switchboard” and asked to
          do their best to fix it. Here’s what that experience would have been
          like:
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/0Wn6G6as9xY"
          title="In Communicado Tonight - MH2025"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <p>
          The team member with headphones would hear incoming call requests, but
          if the team did a poor job of playing the game, the requests would be
          increasingly muffled to the point of incomprehensible.
        </p>

        <p>
          If you’d like to try and solve the puzzle, we’ll give you the benefit
          of the doubt. Because you were a true Switchboard Hero, we’ve included
          the audio you would have heard below, along with some additional help:
          the headphones you would have been wearing have muffled the music and
          assorted noisemakers, and your excellent performance has yielded a
          transcript that was definitely not provided to teams.
        </p>

        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- transcription below */}
        <audio src={game} controls loop />
        <details>
          <summary>Transcription</summary>

          <p>
            <em>[music]</em>
          </p>

          <p>
            Voice 1: Operator? Cambridge-62491, please. Yes, Cambridge-62491.
          </p>

          <p>
            Voice 2: Hello! Be a dear and connect me to Coulomb-12367, please.
            Yes, that’s right — Coulomb-12367
          </p>

          <p>
            Voice 3: Yeah, I need to call Dictionary-71236? Yes, exactly.
            Dictionary-71236.
          </p>

          <p>
            Voice 4: Gladstone-98432, and make it snappy! Yeah, you got it.
            Gladstone-98432.
          </p>

          <p>
            Voice 5: Hello! Can you please connect me to Hyacinth-71364?
            Perfect. Yes, Hyacinth-71364.
          </p>

          <p>
            Voice 6: Operator? Please give me a line to Cornbluth-21865. Yes,
            that’s right. Cornbluth-21865.
          </p>

          <p>
            Voice 7: I’d like to place a call to Pioneer-34173. Exactly.
            Pioneer-34173.
          </p>

          <p>
            Voice 8: Hello, operator. Please place a call to Solidworks-62259.
            Yes, Solidworks-62259.
          </p>

          <p>
            Voice 9: Yes, thank you. Songwriter-28234, please. That’s right.
            Songwriter-28234.
          </p>

          <p>
            Voice 10: Hello, operator. Please connect me to Spectrum-23453.
            Correct! Spectrum-23453.
          </p>

          <p>
            <em>[music ends]</em>
          </p>
        </details>

        <br />

        <p>
          Teams also would have been provided with the following worksheet. It
          was printed double-sided, and we have reproduced both sides below:
        </p>

        <WorksheetContainer>
          <div>
            <LinkedImage
              src={worksheetFront}
              alt="Diodes & Microcircuits Telephone. Switchboard troubleshooting worksheet. (technician use only). Remember: Record all incoming switchboard requests accurately. Without this information our troubleshooters will be unable to find a solution. Coulomb—12367. Cambridge—62491. Pioneer—34173. Spectrum—23453. Dictionary—71236. Hyacinth—71364. Kornbluth—21865. Songwriter—28234. Solidworks—62259. Gladstone—98432. © D&M Telephone, a wholly owned subsidiary of Diodes and Microcircuits."
            />
          </div>
          <div>
            <LinkedImage
              src={worksheetBack}
              alt="A diagram of historic telephone exchanges, showing which neighborhoods of the greater Boston area each exchange covers."
            />
          </div>
        </WorksheetContainer>
      </AuthorsNote>
    </>
  );
};

export default Puzzle;

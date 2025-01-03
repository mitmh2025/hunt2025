import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import puzzle from "./assets/mellow-planet.pdf";

const DATA: [string, string][] = [
  ["- .... .. ...", "2024 Olympian Nedoroscik’s specialty, for short"],
  ["Amnesiac FFVII hero", "An iron one sang ”In-A-Gadda-Da-Vida”"],
  ["CTRL-C, CTRL-V", "Black and white cat variety"],
  [
    "Darla, Angel, or Spike, e.g.",
    "“I’m A Believer” band member, autocorrected",
  ],
  ["Fashion statement for hunters", "Karen or Richard of 70’s pop"],
  ["Game developer that created Spyro the Dragon", "Linguine’s wider cousin"],
  ["Japanese wrestling art", "Miami football player"],
  ["Like a usable air mattress", "Mythical equine visible to virgins"],
  ["Magnify or reduce an image", "One who perspires"],
  ["Nasal discharge, to a kindergartener", "Renaissance tenor cornett"],
  ["Notable clash in a war", "Swashbuckling debtor to heartless Jones"],
  [
    "O at the bottom of a letter, perhaps",
    "Sylvester, Felix, or Garfield, e.g.",
  ],
  ["Olaf and Sven’s movie", "TANGY palindromic completer"],
  ["Pre-workout motion", "Tapestry maker, perhaps"],
  ["Slasher flick “A ___ on Elm Street”", "This crushes scissors"],
  ["Wardenclyffe Tower creator", "Tomato in a sewing kit"],
  ["Will be tense?", "Unwelcome picnic guest"],
  [
    "Without permission, as a biography",
    "You might be wearing a brass one right now",
  ],
];

const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 8.5/11;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <StyledIframe src={puzzle} />
      <p className={`puzzle-flavor ${COPY_ONLY_CLASS}`}>
        In their eyes, penguins should be at the top of the food chain.
      </p>
      <table className={COPY_ONLY_CLASS}>
        {DATA.map(([left, right], i) => (
          <tr key={i}>
            <td>{left}</td>
            <td>{right}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Puzzle;

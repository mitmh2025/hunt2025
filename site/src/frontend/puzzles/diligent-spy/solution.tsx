import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import spectrogram from "./assets/static-spectrogram.png";

const SolutionTable = styled.table`
  border-collapse: collapse;
  & td,
  & th {
    padding: 0 0.5em;
    border: 1px black solid;
  }
`;

const NumbersIdentifiers: [string, string, string][] = [
  ["O", "Oboe", "Orchestral tuner"],
  ["N", "Nan", "Grandma’s nickname"],
  ["E", "Easy", "Echo prototype"],
  ["T", "Tare", "Container weight"],
  ["I", "Item", "List member"],
  ["M", "Mike", "Boxer Tyson"],
  ["E", "Easy", "Commodores hit"],
  ["P", "Peter", "Singer Gabriel"],
  ["A", "Able", "Competent"],
  ["D", "Dog", "Man’s best friend"],
  ["I", "Item", "Romantic couple"],
  ["S", "Sugar", "Glucose"],
  ["T", "Tare", "Common vetch"],
  ["H", "How", "Now brown cow"],
  ["E", "Easy", "Staples button"],
  ["R", "Roger", "Moore Bond"],
  ["A", "Able", "Qualified"],
  ["D", "Dog", "Bounty hunter"],
  ["I", "Item", "News article"],
  ["O", "Oboe", "Wind instrument"],
  ["M", "Mike", "Linebacker role"],
  ["A", "Able", "Adept"],
  ["N", "Nan", "Zero over zero"],
  ["U", "Uncle", "Aunt man"],
  ["A", "Able", "Skilled"],
  ["L", "Love", "Tennis Score"],
];

const Solution = () => {
  return (
    <>
      <p>
        This is a puzzle about{" "}
        <a href="https://en.wikipedia.org/wiki/Numbers_station">
          Numbers Stations
        </a>
        , a common form of military and intelligence communication using actual
        radios, and especially prevalent during WWII.
      </p>

      <p>
        Upon opening, solvers are instructed to tune to a particular frequency,
        where a stream is repeating on loop. It consists of 2-3 word statements,
        followed by sequences of 5 numbers, emulating the typical broadcast
        format of number stations.
      </p>

      <p>
        Solvers can discover that the “station identifiers” are actually
        crossword clues for simple words, and that these words were all part of
        the{" "}
        <a href="https://en.wikipedia.org/wiki/Allied_military_phonetic_spelling_alphabets#WWII_CCB_(ICAO)_and_NATO_alphabets">
          Allied Phonetic Alphabet
        </a>
        . These spell out (in phonetic alphabet){" "}
        <Mono>ONE TIME PAD IS THE RADIO MANUAL</Mono>.
      </p>

      <SolutionTable>
        <thead>
          <tr>
            <th>Clue</th>
            <th>Answer</th>
            <th>Letter</th>
          </tr>
        </thead>
        <tbody>
          {NumbersIdentifiers.map(([letter, answer, clue], i) => (
            <tr key={i}>
              <td>{clue}</td>
              <td>{answer}</td>
              <td>{letter}</td>
            </tr>
          ))}
        </tbody>
      </SolutionTable>

      <p>
        It is generally believed that most Numbers Stations’ broadcasts were
        (and still are!) encrypted codes using one-time pad cryptography. This
        is effectively a Vigenere Cipher, but instead of a repeating key, the
        one-time pad must be at least as long as the ciphertext, and is used
        once and thrown away. Solvers can take the numbers read out from the
        Numbers Station feed and decrypt it using the provided Radio Manual on
        the Hunt website as a one-time pad.
      </p>

      <p>
        Note: decrypting these can be a little tricky and unintuitive, because
        cryptographers are weird. The text is broken into 5-digit sequences, but
        actually needs to be treated as a contiguous string. Letters are all
        consistently presented as two-digit sequences of numbers, including
        leading zeroes. And Vigenere/One-Time Pad ciphers use a zero-indexed
        alphabet, A=00…Z=25. The easiest way to decode is to plug the ciphertext
        into one of many online Vigenere tools.
      </p>

      <p>
        Decrypting the number sequences provides the cluephrase{" "}
        <Mono>
          READ STATIC BETWEEN PM STATIONS ON LINEAR SCALE NEW PAD IS RADIO
          MANUFACTURER
        </Mono>
        .
      </p>

      <p>
        Recording the static between stations and looking at the spectrogram
        (free tools like Audacity can do this easily) shows an image like the
        following:
      </p>

      <LinkedImage
        src={spectrogram}
        alt="Spectrogram of static showing image of an IBM punchcard"
      />

      <p>
        This image should evoke the concept of a{" "}
        <a href="https://en.wikipedia.org/wiki/Punched_card">punchcard</a>,
        which was another common communications and encoding technique in the
        1940s.
      </p>

      <p>
        Reading it out as a standard IBM 12-row punch provides the text{" "}
        <Mono>EMOXXARCNWFKMEFMPBH</Mono>. This is garbage, but as the previous
        cluephrase said, it’s been encrypted with a new one-time pad. Using the
        name of the radio manufacturer <Mono>DIODES&amp;MICROCIRCUITS</Mono>{" "}
        (skipping the ampersand) as the key, you can decrypt it to the final
        answer, <PuzzleAnswer>BEAUTIFUL FRIENDSHIP</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;

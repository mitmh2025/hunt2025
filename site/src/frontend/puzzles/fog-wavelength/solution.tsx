import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import flute from "./assets/flute.png";
import piano1 from "./assets/piano1.png";
import piano2 from "./assets/piano2.png";
import tuba from "./assets/tuba.png";

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  td {
    align-text: center;
  }
  th,
  td {
    padding: 1px 8px;
  }
`;

const TUNING_DATA: { name: string; usualNote: string; frequency: string }[] = [
  { name: "A", usualNote: "A", frequency: "440 / 880" },
  { name: "B", usualNote: "high A (+46 ¢)", frequency: "451.9 / 903.8" },
  { name: "C", usualNote: "B♭ (-8 ¢)", frequency: "464.1 / 928.2" },
  { name: "D", usualNote: "high B♭ (+38 ¢)", frequency: "476.6 / 953.3" },
  { name: "E", usualNote: "low B (-15 ¢)", frequency: "489.5 / 979.0" },
  { name: "F", usualNote: "high B (+31 ¢)", frequency: "502.7 / 1005.5" },
  { name: "G", usualNote: "low C (-23 ¢)", frequency: "516.3 / 1032.6" },
  { name: "H", usualNote: "high C (+23 ¢)", frequency: "530.3 / 1060.5" },
  { name: "I", usualNote: "low C# (-31 ¢)", frequency: "544.6 / 1089.2" },
  { name: "J", usualNote: "high C# (+15 ¢)", frequency: "559.3 / 1118.6" },
  { name: "K", usualNote: "low D (-38 ¢)", frequency: "574.4 / 1148.8" },
  { name: "L", usualNote: "D (+ 8 ¢)", frequency: "589.9 / 1179.9" },
  { name: "M", usualNote: "high D (+ 53 ¢)", frequency: "605.9 / 1211.8" },
  { name: "N", usualNote: "E♭", frequency: "622.2" },
  { name: "O", usualNote: "low E (-53 ¢)", frequency: "639.1" },
  { name: "P", usualNote: "E (-8 ¢)", frequency: "656.3" },
  { name: "Q", usualNote: "high E (+38 ¢)", frequency: "674.1" },
  { name: "R", usualNote: "low F (-15 ¢)", frequency: "692.3" },
  { name: "S", usualNote: "high F (+31 ¢)", frequency: "711" },
  { name: "T", usualNote: "low F# (-23 ¢)", frequency: "730.2" },
  { name: "U", usualNote: "high F# (+23 ¢)", frequency: "749.9" },
  { name: "V", usualNote: "low G (-31 ¢)", frequency: "770.2" },
  { name: "W", usualNote: "high G (+15 ¢)", frequency: "791" },
  { name: "X", usualNote: "low G# (-38 ¢)", frequency: "812.4" },
  { name: "Y", usualNote: "G# (+8 ¢)", frequency: "834.3" },
  { name: "Z", usualNote: "low A (-46 ¢)", frequency: "856.8" },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle presentation, score sample, and audio point to peculiarities
        of this three-part music piece:
      </p>
      <ul>
        <li>
          The provided MP3 has the piano (almost) exclusively in the left audio
          channel and the flute & tuba parts (almost) exclusively in the right
          audio channel, making it easier to separate the parts (either with
          audio software or by listening with one headphone).
        </li>
        <li>
          The flute part is out of tune in rather peculiar ways; the unusual
          alteration in the provided score and the way some of the music sounds
          suggest that it may be microtonal (i.e., have more than the usual 12
          tones in an octave).
        </li>
        <li>
          The piano part consists of arpeggiated chords with some notes present
          and others missing; there are very low notes, mid-range notes, and
          very high notes, at most one of each per chord. And there are two such
          chords for each flute note. The provided score suggests these can be
          assembled into 2x3 blocks, and the flavor text hints at Braille code
          (“blindly”, “couldn’t see”).
        </li>
        <li>
          The bass line (tuba part) consists of short and long notes, of varying
          total duration, under each flute note. It may be natural to think of
          Morse code.
        </li>
      </ul>
      <p>
        The scores for the three parts each encode text in a different way; the
        Morse code is probably the most apparent to the casual listener, though
        the provided score and flavor text clue Braille, so both are plausible
        starting points for solving this puzzle. (Each part contains
        instructions about how to decode another part, making it enough to
        figure out one of the encodings on one’s own.)
      </p>
      <p>
        <strong>Decoding the bass line (tuba)</strong> as Morse code (listening
        to right audio channel only to filter out the piano chords) gives:
      </p>
      <p>
        <Mono>
          THEFLUTE26EDONOTESMAKELETTERSATOZANSWERPART1ANDPART2LENGTHSSEVENTHREESEVEN
        </Mono>
      </p>
      <p>
        Or: “The flute 26edo notes make letters A to Z. Answer part 1 and part
        2, lengths seven three seven”.
      </p>
      <p>
        <strong>Decoding the flute melody</strong> as 26edo notes:
      </p>
      <p>
        Looking up 26edo, one finds that it is a tuning system that divides the
        octave into 26 equal parts of about 46.2 cents each (100 ¢ = 1
        half-tone). Each step represents a frequency ratio of 2^(1/26) (as
        opposed to 2^(1/12) in the usual 12edo tuning system). The scale having
        26 notes suggests that these can be labeled from A to Z; it is natural
        to guess that A might correspond to A—or one might notice that the
        letter T is provided in the given score for the initial note of the
        melody and work out the tuning from there.
      </p>
      <p>
        The notes can be figured out by ear (for those without absolute pitch,
        likely with the help of a tuning app, a tone generator, or a musical
        instrument for comparing the notes to the usual scale), or by using
        spectral analysis software. (In either case, possible errors by ±1
        letter are easy to make but straightforward to correct). Here is a
        conversion table:
      </p>
      <StyledTable>
        <tr>
          <th>26edo</th>
          <th>Usual note</th>
          <th>Freq. (Hz)</th>
        </tr>
        {TUNING_DATA.map(({ name, usualNote, frequency }) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{usualNote}</td>
            <td>{frequency}</td>
          </tr>
        ))}
      </StyledTable>
      <p>The flute part decodes to:</p>
      <p>
        <Mono>
          THECHORDSMAKEBRAILLEANSWERPARTONECHOPINWROTEMANYOFTHESEINCLUDINGAMINUTEONE
        </Mono>
      </p>
      <p>
        Or: “The chords make Braille. Answer part one: Chopin wrote many of
        these including a minute one.” This refers to Chopin’s Minute Waltz and
        clues <Mono>WALTZES.</Mono>
      </p>
      <p>
        <strong>Decoding the piano chords</strong> as Braille: as in the
        provided sample score, we think of each piano chord as having the low,
        medium and high notes missing (white) or present (black), and use two
        such chords (corresponding to one flute note) as a 2x3 block
        representing a Braille character. With this understood, the chords
        decode to:
      </p>
      <p>
        <Mono>
          THE BASS LINE IS MORSE CODE ANSWER PART TWO THIRD MONTHS OR MILITARY
          WALKS
        </Mono>
      </p>
      <p>
        This clues <Mono>MARCHES</Mono>.
      </p>
      <p>
        Assembling part 1 “AND” part 2 as clued by the bass line, we arrive at
        the answer:{" "}
        <Mono>
          <strong>WALTZES AND MARCHES</strong>
        </Mono>
        , matching the provided enumeration 7 3 7.
      </p>
      <p>
        For completeness, here are the actual music scores for the three parts.
        (Note: the actual notes played by the flute are not exactly as shown –
        the score doesn’t include the precise tuning). The actual notes played
        by the tuba and piano are not puzzle content, they only change so that
        the overall piece sounds like a plausible, albeit very strange, musical
        composition.
      </p>
      <h4>Flute</h4>
      <LinkedImage
        src={flute}
        alt="A score for flute. Letters below each note spell out THE CHORDS MAKE BRAILLE ANSWER PART ONE CHOPIN WROTE MANY OF THESE INCLUDING A MINUTE ONE"
      />
      <h4>Tuba</h4>
      <LinkedImage
        src={tuba}
        alt="A score for tuba. Letters below each measure spell out THE FLUTE 26EDO NOTES MAKE LETTERS A TO Z ANSWER PART 1 AND ANSWER PART 2 LENGTHS SEVEN THREE SEVEN"
      />
      <h4>Piano</h4>
      <LinkedImage
        src={piano1}
        alt="A score for piano. Letters below each chord spell out THE BASS LINE IS MORSE CODE ANSWE"
      />
      <LinkedImage
        src={piano2}
        alt="A score for piano. Letters below each chord spell out R PART TWO THIRD MONTH OR MILITARY WALKS"
      />
    </>
  );
};

export default Solution;

import React from "react";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import { HScrollTableWrapper, Mono } from "../../components/StyledUI";
import activation from "./assets/activation.mp3";
import activationCaptions from "./assets/activation.vtt";
import footIcon from "./assets/foot.svg";
import headphonesIcon from "./assets/headphones.svg";
import lightIcon from "./assets/light.svg";
import magnetIcon from "./assets/magnet.svg";
import playIcon from "./assets/play.svg";
import questionIcon from "./assets/question.svg";
import radio from "./assets/radio.png";

const PuzzleTable = styled.table`
  border-collapse: collapse;
  td,
  th {
    padding: 1px 8px;
    border: 1px solid var(--black);
  }

  tbody tr td:nth-child(2) {
    font-family: "Roboto Mono", monospace;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin: 1em 0;
`;

const CrissCrossTable = styled.table`
  margin: 1em auto;
  font-family: "Roboto Mono", monospace;
  border-collapse: collapse;

  td {
    height: 1.5em;
    width: 1.5em;
    text-align: center;
    vertical-align: middle;

    &.filled {
      border: 1px solid var(--black);
    }

    &.cross {
      background-color: #a1bcbb;
    }
  }
`;

const IconImage = styled.img`
  height: 1em;
  width: 1em;
`;

const CRISS_CROSS_GRID = `
H     K  L     
E    UNFAITHFUL
A  M  O  G  E  
DISAVOW  H  B  
P  G  N  T  R  
H  N        U  
O  E      F A  
N  T   S  O R  
E     CUSTODY  
S      B  T    
     NEW       
       AROUND  
       Y   I   
           G   
           H   
        BUTTON 
           T   
           I   
         HIM   
           EAST
`
  .trim()
  .split("\n");

const isCross = (row: number, col: number) => {
  if ((CRISS_CROSS_GRID[row]?.[col] ?? " ") === " ") {
    return false;
  }

  const verticalCells = [
    (CRISS_CROSS_GRID[row - 1] ?? "")[col],
    (CRISS_CROSS_GRID[row + 1] ?? "")[col],
  ].filter((c) => c !== undefined);
  const horizontalCells = [
    (CRISS_CROSS_GRID[row] ?? "")[col - 1],
    (CRISS_CROSS_GRID[row] ?? "")[col + 1],
  ].filter((c) => c !== undefined);

  return (
    verticalCells.some((cell) => cell !== " ") &&
    horizontalCells.some((cell) => cell !== " ")
  );
};

const Solution = () => {
  return (
    <>
      <NotoColorEmojiFont />

      <p>
        This is a puzzle about music lyrics that transitions into an opportunity
        for teams to play with their new radio.
      </p>

      <p>
        The first step in this puzzle is to solve the provided clues. Each of
        the clues refers to song lyrics, with the “🎵” taking the place of a
        single word:
      </p>

      <HScrollTableWrapper>
        <PuzzleTable>
          <thead>
            <tr>
              <th>Clue</th>
              <th>Word</th>
              <th>Song</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tr>
            <td>If no one is 🎵 you, say, “Baby, I love you”</td>
            <td>AROUND</td>
            <td>Say My Name</td>
            <td>Destiny‘s Child</td>
          </tr>
          <tr>
            <td>
              I‘m telling you to loosen up my 🎵s baby, but you keep fronting
            </td>
            <td>BUTTON</td>
            <td>Buttons</td>
            <td>The Pussycat Dolls</td>
          </tr>
          <tr>
            <td>She wanna rib you up to start a 🎵 war</td>
            <td>CUSTODY</td>
            <td>Ms. Jackson</td>
            <td>OutKast</td>
          </tr>
          <tr>
            <td>
              Rays of dust that wrap around your citizen, kind enough to 🎵
            </td>
            <td>DISAVOW</td>
            <td>Stadium Arcadium</td>
            <td>Red Hot Chili Peppers</td>
          </tr>
          <tr>
            <td>
              She used to meet me on the 🎵side, In the city where the sun don‘t
              set
            </td>
            <td>EAST</td>
            <td>Eastside</td>
            <td>Benny Blanco, Halsey, Khalid</td>
          </tr>
          <tr>
            <td>
              You had a boyfriend, who looked like a girlfriend, that I had in
              🎵 of last year
            </td>
            <td>FEBRUARY</td>
            <td>Somebody Told Me</td>
            <td>The Killers</td>
          </tr>
          <tr>
            <td>Now I gotta cut loose, 🎵loose</td>
            <td>FOOT</td>
            <td>Footloose</td>
            <td>Kenny Loggins</td>
          </tr>
          <tr>
            <td>Got your Dre 🎵 with the left side on</td>
            <td>HEADPHONES</td>
            <td>Starstruck</td>
            <td>Lady Gaga</td>
          </tr>
          <tr>
            <td>Please don‘t take 🎵 just because you can</td>
            <td>HIM</td>
            <td>Jolene</td>
            <td>Dolly Parton</td>
          </tr>
          <tr>
            <td>Losing him was blue, like I‘d never 🎵</td>
            <td>KNOWN</td>
            <td>Red</td>
            <td>Taylor Swift</td>
          </tr>
          <tr>
            <td>Come on baby 🎵 my fire</td>
            <td>LIGHT</td>
            <td>Light My Fire</td>
            <td>The Doors</td>
          </tr>
          <tr>
            <td>
              Push and pull like a 🎵 do, although my heart is fallin‘, too
            </td>
            <td>MAGNET</td>
            <td>Shape of You</td>
            <td>Ed Sheeran</td>
          </tr>
          <tr>
            <td>You found a 🎵 girl, and it only took a couple weeks</td>
            <td>NEW</td>
            <td>Good 4 U</td>
            <td>Olivia Rodrigo</td>
          </tr>
          <tr>
            <td>Daytime friends and 🎵 lovers, hoping no one else discovers</td>
            <td>NIGHTTIME</td>
            <td>Daytime Friends</td>
            <td>Kenny Rogers</td>
          </tr>
          <tr>
            <td>
              And the sign said, “The words of the prophets are written on the
              🎵 walls…”
            </td>
            <td>SUBWAY</td>
            <td>Sound of Silence</td>
            <td>Simon &amp; Garfunkel</td>
          </tr>
          <tr>
            <td>And I know that he knows I‘m 🎵, and it kills him inside</td>
            <td>UNFAITHFUL</td>
            <td>Unfaithful</td>
            <td>Rihanna</td>
          </tr>
        </PuzzleTable>
      </HScrollTableWrapper>

      <p>
        As suggested by the flavortext, these words form a{" "}
        <a href="https://www.puzzles.wiki/wiki/Criss-Cross">
          Criss-Cross puzzle
        </a>
        . The title answers the question from the flavortext — the grid can be
        found on the back of the radio that teams were provided with at the
        start of the Hunt:
      </p>

      <Image
        src={radio}
        alt="A pre-production rendering of the back of the radio"
      />

      <p>
        By using the relative lengths of the lines in the design on the radio
        (the lines have a unit length of 6mm per letter), teams can assemble the
        complete Criss-Cross, using the two symbols on the back plate as
        additional confirmation of placement:
      </p>

      <HScrollTableWrapper>
        <CrissCrossTable>
          {CRISS_CROSS_GRID.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.split("").map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`${isCross(rowIndex, colIndex) ? "cross" : ""} ${cell !== " " ? "filled" : ""}`}
                >
                  {cell === " " ? null : cell}
                </td>
              ))}
            </tr>
          ))}
        </CrissCrossTable>
      </HScrollTableWrapper>

      <p>
        The circles around the points where two words intersect indicate that
        teams should read those letters. Reading them in order starting from the
        top-left yields the phrase: <Mono>DAWN IF YOU WANT ME</Mono>. This is a
        reference to a song by Tony Orlando and Dawn whose title,{" "}
        <Mono>KNOCK THREE TIMES</Mono>, forms the final, three-music-note answer
        from the originally provided list.
      </p>

      <p>
        This is an instruction for teams, and, once again, the title of the
        puzzle provides a hint for how to apply it. If solvers knock three times
        on the radio at roughly the tempo of the song, the radio will interrupt
        the broadcast to play a clip of the song and instruct you to re-tune the
        radio to a newly unlocked station:
      </p>

      <p>
        <audio controls src={activation}>
          <track
            default
            kind="captions"
            srcLang="en"
            src={activationCaptions}
          />
        </audio>
      </p>

      <p>
        Once they’ve tuned their radio to the newly unlocked station, the radio
        plays a short clip of a song (initially, Mary Had a Little Lamb) and
        instructs them to repeat it back. Teams must discover that their radio
        is now a musical instrument, whose “keys” were indicated in the original
        puzzle by the clues with icons next to them. These keys are:
      </p>

      <ul>
        <li>
          <IconImage src={lightIcon} /> (<Mono>LIGHT</Mono>): Shine a light into
          the hole on the rear of the radio
        </li>
        <li>
          <IconImage src={footIcon} /> (<Mono>FOOT</Mono>): Touch any of the
          bolt heads on the bottom of the radio’s feet
        </li>
        <li>
          <IconImage src={playIcon} /> (<Mono>BUTTON</Mono>): Press the button
          labeled with a triangle on the front of the radio
        </li>
        <li>
          <IconImage src={questionIcon} /> (<Mono>KNOCK THREE TIMES</Mono>):
          Knock on the radio (for this stage, only a single knock is required)
        </li>
        <li>
          <IconImage src={magnetIcon} /> (<Mono>MAGNET</Mono>): Hold a magnet
          against the symbol on the back of the radio
        </li>
        <li>
          <IconImage src={headphonesIcon} /> (<Mono>HEADPHONES</Mono>): Insert a
          headphone plug into the 3.5mm jack on the side of the radio
        </li>
      </ul>

      <p>
        The light, foot, button, and knock inputs each play a note of the scale.
        The magnet input shifts these notes down by 3 steps (a perfect fourth).
        The headphone jack shifts the four notes up by a perfect fifth. Using
        the two together shifts the four notes up by an octave. Thus, by
        combining the notes and the two “shift” inputs, the radio can play any
        note in the major scale over a two octave range. (The radio is tuned to
        the key of G and can play any note in the major G scale between D4 and
        C6)
      </p>

      <p>
        Once teams have learned how to play their instrument and the requested
        song (Mary Had a Little Lamb), the radio requests 4 additional songs
        (Never Gonna Give You Up, Somewhere Over the Rainbow, Hot to Go, and The
        Final Countdown). Once they’ve completed those, they are rewarded with
        the puzzle‘s answer plus one additional feature: the radio’s tilt sensor
        now acts as a pitch bend, allowing them to play notes outside of the
        major scale.
      </p>
    </>
  );
};

export default Solution;

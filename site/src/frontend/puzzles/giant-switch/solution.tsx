import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";
import interrupt1011 from "./assets/interrupt-1011.opus";
import interrupt1051 from "./assets/interrupt-1051.opus";
import interrupt1063 from "./assets/interrupt-1063.opus";
import interrupt891 from "./assets/interrupt-891.opus";
import interrupt905 from "./assets/interrupt-905.opus";
import interrupt917 from "./assets/interrupt-917.opus";
import interrupt933 from "./assets/interrupt-933.opus";
import interrupt965 from "./assets/interrupt-965.opus";
import interrupt987 from "./assets/interrupt-987.opus";

const LOCATION_TABLE: {
  href: string;
  location: string;
  description: ReactNode;
  descriptionHref?: string;
}[] = [
  {
    href: img1,
    location: "2-1",
    description: <i>Chord</i>,
    descriptionHref: "https://listart.mit.edu/art-artists/chord-2015",
  },
  { href: img2, location: "4-0", description: "MIT Glass Lab" },
  { href: img3, location: "7-1", description: "Lobby 7" },
  {
    href: img4,
    location: "12-1",
    description: <i>Northwest Passage</i>,
    descriptionHref:
      "https://listart.mit.edu/art-artists/northwest-passage-2018",
  },
  { href: img5, location: "13-1", description: "Lobby 13" },
  { href: img6, location: "32-123", description: "Kirsch Auditorium" },
  { href: img7, location: "34-1", description: "Lobby 34" },
  { href: img8, location: "36-00", description: "Two-story basement" },
  {
    href: img9,
    location: "66-00",
    description: "Point stairwell (triangular)",
  },
];

const STINGER_TABLE: [string, string, string, string][] = [
  [
    "2-1",
    "90.5",
    "A",
    "Coming up next as the conclusion of today’s program, Symphony in D Minor by César Franck. A remarkable piece, published only a few years before his death. Thank you for being here with me today, your host on Classical 90.5.",
  ],
  [
    "4-0",
    "89.1",
    "B",
    "Hey there my lovely Swifties. This is Tay Tay 89, all Taylor all the time, and I probably don’t even need to tell you that we’re about to play one of her more recent works. Here comes Fortnight.",
  ],
  [
    "7-1",
    "106.3",
    "H",
    "You’re listening to 106.3, bringing you the best syncopated beats this side of the Mississippi. Now, here is The Original Dixieland One Step, all the way back from the era of The Great War.",
  ],
  [
    "12-1",
    "93.3",
    "U",
    "The hottest pop… the biggest hits. Up next, you know it, you love it, it’s Gangnam Style, here on K-Pop 93.3.",
  ],
  [
    "13-1",
    "91.7",
    "I",
    "Up next, here’s Gloria Gaynor with I Will Survive. Do you remember when hits like that used to come out on vinyl? Well, you too will survive, if you just keep your dance shoes on and ready to boogie, here on Disco 91.7.",
  ],
  [
    "32-123",
    "101.1",
    "L",
    "Coming up, from the height of the second world war, we’ve got Ernest Tubb’s Walking The Floor Over You. After that, from many decades later, The Dixie Chicks’ Not Ready To Make Nice — two country hits from very different times, right here on Country 101.",
  ],
  [
    "34-1",
    "105.1",
    "E",
    "Don’t sit down yet, this is 105.1, where the hips never stop shakin’! Next up is the King, with everyone’s favorite, Jailhouse Rock.",
  ],
  [
    "36-00",
    "96.5",
    "T",
    "Coming up next we’ve got a double header - first up Ramblin’ by Ornette Coleman, followed up by W.C. Handy’s The Memphis Blues, right here on Just Jazz 96.5.",
  ],
  [
    "66-00",
    "98.7",
    "C",
    "This is Boy Band 98.7. I’d like to personally thank all five of you who are still listening to us here after all these years. <pause> Wait, I’m being informed it’s now three of you. Well, let’s keep it rolling with Invisible Man by 98 Degrees and after that, Crash and Burn by Savage Garden.",
  ],
];

const EXTRACTION_TABLE: [string, string, string, string][] = [
  ["A", "Classical", "Symphony in D Minor by César Franck", "1888"],
  ["T", "Just Jazz", "The Memphis Blues - W.C. Handy", "1912"],
  ["H", "Ragtime", "The Original Dixieland One Step", "1917"],
  ["L", "Country", "Walking The Floor Over You", "1941"],
  ["E", "Hip Radio", "Jailhouse Rock - Elvis Presley", "1957"],
  ["T", "Just Jazz", "Ramblin’ - Ornette Coleman", "1959"],
  ["I", "Disco", "I Will Survive - Gloria Gaynor", "1978"],
  ["C", "Boy Band", "Invisible Man - 98 Degrees", "1997"],
  ["C", "Boy Band", "Crash and Burn - Savage Garden", "1999"],
  ["L", "Country", "Not Ready To Make Nice - The Dixie Chicks", "2006"],
  ["U", "K-Pop", "Gangnam Style", "2012"],
  ["B", "T Swift", "Fortnight", "2024"],
];

const REEXTRACTION_TABLE: [string, string, string][] = [
  [
    "2-1",
    "We interrupt this program to inform you that letter 1 is B and letter 10 is N.",
    interrupt905,
  ],
  [
    "4-0",
    "We interrupt this program to inform you that letter 9 is T and letter 5 is D.",
    interrupt891,
  ],
  [
    "7-1",
    "We interrupt this program to inform you that letter 3 is O and letter 7 is A.",
    interrupt1063,
  ],
  [
    "12-1",
    "We interrupt this program to inform you that letter 10 is N and letter 13 is S.",
    interrupt933,
  ],
  [
    "13-1",
    "We interrupt this program to inform you that letter 8 is S and letter 6 is C.",
    interrupt917,
  ],
  [
    "32-123",
    "We interrupt this program to inform you that letter 4 is A and letter 1 is B.",
    interrupt1011,
  ],
  [
    "34-1",
    "We interrupt this program to inform you that letter 5 is D and letter 12 is W.",
    interrupt1051,
  ],
  [
    "36-00",
    "We interrupt this program to inform you that letter 13 is S and letter 2 is R.",
    interrupt965,
  ],
  [
    "66-00",
    "We interrupt this program to inform you that letter 11 is E and letter 8 is S.",
    interrupt987,
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
  th {
    text-align: left;
  }
  th,
  td {
    padding-right: 8px;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        The puzzle contains a set of 9 photos and an image of a radio dial with
        letters A-Z placed randomly around the dial. As hinted by the title (we
        have given “up”), each photo is a recognizable ceiling at MIT:
      </p>
      <StyledTable>
        <tr>
          <th>Photo</th>
          <th>Location</th>
          <th>Description</th>
        </tr>
        {LOCATION_TABLE.map(
          ({ href, location, description, descriptionHref }, i) => (
            <tr key={i}>
              <td>
                <a href={href} target="_blank" rel="noreferrer">
                  Photo
                </a>
              </td>
              <td>{location}</td>
              <td>
                {descriptionHref ? (
                  <a href={descriptionHref} target="_blank" rel="noreferrer">
                    {description}
                  </a>
                ) : (
                  description
                )}
              </td>
            </tr>
          ),
        )}
      </StyledTable>
      <p>
        The radio dial indicates that solvers should go to each of the locations
        with the hunt radio set to FM. Scanning the dial for FM stations, they
        will hear normal broadcast stations and one station that stands out—each
        location has an FM station broadcasting Never Gonna Give You Up by Rick
        Astley.
      </p>
      <p>
        At the conclusion of each song, the hunt radio station broadcasts a
        stinger that very clearly lists the frequency and one or two song
        titles. The frequency points to a single letter on the dial image in the
        puzzle.
      </p>
      <StyledTable>
        <tr>
          <th>Location</th>
          <th>Frequency</th>
          <th>Letter</th>
          <th>Text</th>
        </tr>
        {STINGER_TABLE.map(([location, frequency, letter, text], i) => (
          <tr key={i}>
            <td>{location}</td>
            <td>{frequency}</td>
            <td>{letter}</td>
            <td>{text}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        After solvers have collected the information (frequency and song
        titles), they can use the dial image in the puzzle to identify a letter
        for each location. They can order the songs by release date (or the date
        they peaked on the Billboard charts, which gives the same result), which
        allows for duplicated letters, and the resulting sequence of letters is
        the answer: <PuzzleAnswer>ATHLETIC CLUB</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <th>Letter</th>
          <th>Station</th>
          <th>Song</th>
          <th>Year</th>
        </tr>
        {EXTRACTION_TABLE.map(([letter, station, song, year], i) => (
          <tr key={i}>
            <td>{letter}</td>
            <td>{station}</td>
            <td>{song}</td>
            <td>{year}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        After solving Papa’s Stash, teams receive the clue phrase{" "}
        <Mono>SAME LOCATIONS TUNED TO PM 23pi/20</Mono>. After returning to the
        locations and tuning to 23pi/20, there is now a second broadcast of
        Never Gonna Give You Up. Every few seconds, an announcer says a pair of
        letters in the answer.
      </p>
      <StyledTable>
        <tr>
          <th>Location</th>
          <th>Message</th>
          <th>Audio</th>
        </tr>
        {REEXTRACTION_TABLE.map(([location, message, audio], i) => (
          <tr key={i}>
            <td>{location}</td>
            <td>{message}</td>
            <td>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption -- written inline above */}
              <audio controls src={audio} />
            </td>
          </tr>
        ))}
      </StyledTable>
      <p>
        After visiting enough locations, they’ll have the final answer,{" "}
        <PuzzleAnswer>BROADCAST NEWS</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;

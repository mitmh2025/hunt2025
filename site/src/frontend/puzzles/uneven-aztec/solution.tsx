import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding-right: 8px;
  }
`;

const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}): JSX.Element => {
  return (
    <HScrollTableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={`header-cell-${i}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, j) => (
            <tr key={`table-row-${j}`}>
              {row.map((cell, k) => (
                <td key={`table-row-${j}-cell-${k}`}>
                  {k === 2 ? <Mono>{cell}</Mono> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </HScrollTableWrapper>
  );
};

const HEADERS = [
  "Disc",
  "Track",
  "Letter",
  "Song title",
  "Paper title",
  "Author",
];

const ROWS = [
  [
    "1",
    "13",
    "M",
    "Minimum Wage",
    "Supply and Demand in the Labor Market",
    "J. Adam",
  ],
  [
    "1",
    "1",
    "A",
    "Birdhouse in Your Soul",
    "Metaphysical Kinematics of Passerine Habitation",
    "J. Anhinga",
  ],
  [
    "1",
    "20",
    "T",
    "Twisting",
    "Methods of Improving Tensile Strength of Natural Fibers",
    "J. Ariadne",
  ],
  [
    "2",
    "3",
    "C",
    "James K. Polk",
    "Lesser Known Leaders of the Americas in the 19th Century",
    "J. Bush",
  ],
  [
    "1",
    "8",
    "H",
    "The Guitar (The Lion Sleeps Tonight)",
    "Investigating Polyphonic String Instruments",
    "J. Allman",
  ],
  [
    "2",
    "8",
    "H",
    "I Can Hear You",
    "A Statistical Overview of Auditory Thresholds in Healthy Adults",
    "J. Bruit",
  ],
  [
    "2",
    "15",
    "O",
    "Exquisite Dead Guy",
    "Recent Advances in Embalming Technology",
    "J. Bury",
  ],
  [
    "2",
    "22",
    "V",
    "Hey Mr. DJ, I Thought You Said We Had a Deal",
    "Negotiation Strategies to Protect Against Bargainers in Bad Faith",
    "J. Buuren",
  ],
  ["2", "5", "E", "Mammal", "An Ontology of Charismatic Fauna", "J. Blåhval"],
  [
    "2",
    "18",
    "R",
    "S-E-X-X-Y",
    "An Analysis of Common Spelling Bee Errors",
    "J. Bawd",
  ],
  [
    "1",
    "9",
    "I",
    "Dr. Evil",
    "Antagonist Archetypes in Genre Film",
    "J. Auric",
  ],
  [
    "2",
    "14",
    "N",
    "Stormy Pinkness (live)",
    "Atypical Color Phenomena in Extreme Weather Events",
    "J. Bloom",
  ],
  [
    "2",
    "7",
    "G",
    "No!",
    "Behavioral Studies of Children Exhibiting Characteristics of Oppositional Defiant Disorder",
    "J. Belligerent",
  ],
  [
    "2",
    "19",
    "S",
    "Number Three",
    "Meaningful Numerals in Ancient and Modern Religion",
    "J. Bronze",
  ],
  [
    "1",
    "15",
    "O",
    "We’re the Replacements",
    "Societal Effects of Inherited Positions in Post-Industrial Organizations",
    "J. Alt",
  ],
  [
    "2",
    "13",
    "M",
    "Spy (Original Version)",
    "Characteristics of Successful Deep-Cover Agents Throughout History",
    "J. Berg",
  ],
  [
    "1",
    "2",
    "B",
    "Ana Ng",
    "Naming Patterns in Cantonese-Speaking American Immigrants",
    "J. Apelido",
  ],
  ["1", "18", "R", "Bangs", "Hairstyles Through the Ages", "J. Antoinette"],
  [
    "1",
    "5",
    "E",
    "Older",
    "Comparison of Experiences of Octogenarians and Nonagenarians",
    "J. Alter",
  ],
  [
    "2",
    "18",
    "R",
    "S-E-X-X-Y",
    "Chromosomal Abnormalities in Adults",
    "J. Broad",
  ],
  [
    "1",
    "15",
    "O",
    "We’re the Replacements",
    "A Polemic on the Virtues of Crossing Picket Lines",
    "J. America",
  ],
  [
    "1",
    "12",
    "L",
    "Cyclops Rock",
    "Accessibility Options for Musicians with Limited Vision",
    "J. Astley",
  ],
  [
    "2",
    "25",
    "Y",
    "Purple Toupee",
    "Usage of Hair Dye in Patients with Male-Pattern Baldness",
    "J. Bezos",
  ],
  [
    "1",
    "18",
    "R",
    "Bangs",
    "Exploring the Use of Onomatopoeias in Visual Media",
    "J. Asterix",
  ],
  [
    "2",
    "9",
    "I",
    "Spider",
    "Arachnids Commonly Found in Subterranean Levels of Human Living Spaces",
    "J. Babe",
  ],
  [
    "1",
    "3",
    "C",
    "Don’t Let’s Start (single remix)",
    "Origins and Development of Negatory Slang Terminology",
    "J. Aint",
  ],
  [
    "1",
    "19",
    "S",
    "Snail Shell",
    "Protective Adaptations of Terrestrial Gastropods",
    "J. Angulata",
  ],
];

export default function Solution(): JSX.Element {
  return (
    <>
      <p>
        At first glance, the puzzle appears to be a paywalled academic paper
        with only the title, authors, abstract, and references in front of the
        paywall. The paper’s reference ID is <em>Mystery</em> vol 718 issue 3
        pages 876-962.
      </p>
      <p>
        The references have obscure and lengthy paper titles which do not appear
        to have any bearing on the abstract. Strangely, their reference IDs are
        all identical to this abstract. When concatenated, the numbers in the
        reference ID form the phone number to call to reach the They Might Be
        Giants Dial a Song service, 718-387-6962. Dial-a-Song is also the title
        of a two-disc compilation album from 2002 (clued by the year in the
        title of the abstract). Each reference title refers to a track off this
        album, and using the last initial of the author directs solvers to disc
        1 or disc 2. As there are 26 tracks per disc, solvers can use A-Z 1-26
        to solve to the clue phrase <Mono>MATCH HOVERING SOMBRERO LYRICS</Mono>.
      </p>
      <Table headers={HEADERS} rows={ROWS} />
      <p>
        The authors of the abstract, Scott Redd and Brad Will, are the founders
        of “This Might Be a Wiki”, which collects TMBG lyrics. Solvers can visit
        the wiki to find the lyrics to Hovering Sombrero. When placed side by
        side, the abstract text and the lyrics have exactly the same number of
        words, and the sentence lengths of the abstract matches the length of
        the verses. Some words appear at the same position in the abstract and
        the song:
      </p>
      <p>
        <div>
          <strong>R</strong>EJECTED
        </div>
        <div>
          <strong>A</strong>ND
        </div>
        <div>
          <strong>P</strong>AGES
        </div>
        <div>
          <strong>O</strong>F
        </div>
        <div>
          <strong>F</strong>LYING
        </div>
        <div>
          <strong>F</strong>AMILIAR
        </div>
        <div>
          <strong>K</strong>EEPS
        </div>
        <div>
          <strong>E</strong>MBITTERED
        </div>
        <div>
          <strong>Y</strong>OU
        </div>
      </p>
      <p>
        The first answers of the matching words spell the answer,{" "}
        <PuzzleAnswer>RAP OFF KEY</PuzzleAnswer>.
      </p>
    </>
  );
}

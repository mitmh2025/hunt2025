import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";

const DATA: [
  string,
  number,
  string,
  string,
  string,
  string,
  number,
  number,
  string,
][] = [
  [
    "“Hooked large-mouth”",
    1,
    "Maxistoma uncinata",
    "https://www.horg.com/horg/?page_id=845",
    "M",
    "Tridentidae",
    21,
    22,
    "C",
  ],
  [
    "“Column-like stretched-claw”",
    2,
    "Orectochela columnaris",
    "https://www.horg.com/horg/?page_id=2373",
    "O",
    "Tridentidae",
    42.8,
    22.3,
    "H",
  ],
  [
    "“closed little claw”",
    3,
    "Ungella adopertus",
    "https://www.horg.com/horg/?page_id=2617",
    "U",
    "Haplognathidae",
    21.6,
    17.5,
    "E",
  ],
  [
    "“Orange rounded-corners”",
    4,
    "Terenoquetra aurantium",
    "https://www.horg.com/horg/?page_id=2518",
    "T",
    "Toxodentidae",
    25.3,
    25.4,
    "E",
  ],
  [
    "“Small-heart circlet-hole”",
    5,
    "Halotrema corculum",
    "https://www.horg.com/horg/?page_id=3364",
    "H",
    "Archignathidae",
    35,
    21.5,
    "S",
  ],
  [
    "“Rough-skinned acorn-mouth”",
    6,
    "Scabroderma balaniphagus",
    "https://www.horg.com/horg/?page_id=298",
    "S",
    "Archignathidae",
    26,
    21,
    "E",
  ],
  [
    "“Broad-wing blunt-claw”",
    7,
    "Alatilatus hebechela",
    "https://www.horg.com/horg/?page_id=2932",
    "A",
    "Tridentidae",
    21.7,
    24.3,
    "V",
  ],
  [
    "“Potato saw-tile”",
    8,
    "Serrategula kartoffelensis",
    "https://www.horg.com/horg/?page_id=2181",
    "S",
    "Tridentidae",
    33.6,
    24.9,
    "E",
  ],
  [
    "“Bottle-mystery forceps”",
    9,
    "Ampullaenigma thermastris",
    "https://www.horg.com/horg/?page_id=2506",
    "A",
    "Archignathidae",
    42.6,
    35,
    "N",
  ],
  [
    "“Horizontal wide boy”",
    10,
    "Latifilius horizontalis",
    "https://www.horg.com/horg/?page_id=3004",
    "L",
    "Toxodentidae",
    21.6,
    33.6,
    "D",
  ],
  [
    "“citron-like bowed changing-body”",
    11,
    "E. arcuatis citrops",
    "https://www.horg.com/horg/?page_id=3231",
    "E",
    "Toxodentidae",
    51,
    41.3,
    "O",
  ],
  [
    "“Snow-faced mouth-heart”",
    12,
    "Niphofacies buccacoris",
    "https://www.horg.com/horg/?page_id=362",
    "N",
    "Archignathidae",
    21,
    23,
    "R",
  ],
  [
    "“Yawning spongy page”",
    13,
    "Spongipaginus hiatus",
    "https://www.horg.com/horg/?page_id=2031",
    "S",
    "Haplognathidae",
    23,
    21.6,
    "S",
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-spacing: 1em 0;
  td {
    text-align: center;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This is a physical puzzle. During hunt, solvers received a small plastic
        bag containing images on separate pieces of paper and tied closed with
        several bread tags.
      </p>
      <p>
        To solve the puzzle, hunters notice that 13 of the images are quirky
        drawings and one image is a grid with letters randomly scattered over
        it.
      </p>
      <p>
        Hunters use the puzzle title to realize that this puzzle is about the{" "}
        <a href="https://www.horg.com/horg/" target="_blank" rel="noreferrer">
          Holotypic Occlupanid Research Group (HORG)
        </a>
        , a fictional organization that classifies bread tags based on the shape
        of their “oral grooves”.{" "}
      </p>
      <p>
        Hunters realize that each of the 13 quirky drawings is an illustration
        of the English name of a bread tag. For example, the drawing of the red
        crab with the small claw is the bread tag,{" "}
        <a
          href="https://www.horg.com/horg/?page_id=2617"
          target="_blank"
          rel="noreferrer"
        >
          <i>Ungella adopertus</i>{" "}
        </a>{" "}
        or “closed little claw”. Hunters record the genus and species for each
        illustrated bread tag and order them by the number of bread slices in
        the loaf on the bottom right-hand corner of each drawing.
      </p>
      <p>
        Hunters then read off the first letter of the genera to get the clue
        phrase: <Mono>MOUTHS AS A LENS</Mono> which indicates that they should
        somehow use the physical bread tags’ “oral grooves” or mouths as lenses
        on the letter grid.
      </p>
      <p>
        Hunters notice that on the HORG webpage for each bread tag, there is a
        photo of the tag measuring its dimensions on a grid that looks
        remarkably like the grid with the scattered letters they received. They
        also notice that the four physical bread tags they received have “oral
        grooves” that match four of the families depicted on the{" "}
        <a
          href="https://www.horg.com/horg/?page_id=177"
          target="_blank"
          rel="noreferrer"
        >
          HORG Taxonomic Classification
        </a>{" "}
        page. Finally, they notice that the illustrated bread tags each belong
        to one of those four families.
      </p>
      <p>
        Using the observations above, hunters then have all the information they
        need to use the <Mono>MOUTHS AS A LENS</Mono>. For each illustrated
        bread tag, they select the physical bread tag of the corresponding
        taxonomic family. They orient the physical bread tag with the “oral
        groove” facing down as depicted in the bread tag photos on the HORG
        website. Hunters then place the physical bread tag on the grid of
        scattered letters so that the upper right-hand corner of the tag is at
        the height and width of the illustrated bread tag’s dimensions. They
        then read off the letter that is revealed in the center of the physical
        bread tag’s mouth. As a helpful hint, if hunters reverse the x- and
        y-coordinates when orienting the bread tags they get the phrase ORDER IS
        Y THEN X directing them to swap the coordinates.
      </p>
      <p>
        Hunters order the revealed letters by the same ordering used to read out
        the clue phrase and get the answer:{" "}
        <PuzzleAnswer>CHEESE VENDORS</PuzzleAnswer>.
      </p>
      <h3>Full data set</h3>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>English Phrase</th>
            <th># Slices</th>
            <th>Genus and Species</th>
            <th>Clue Phrase</th>
            <th>Family</th>
            <th>Height</th>
            <th>Width</th>
            <th>Letter Revealed</th>
          </tr>
          {DATA.map(
            ([
              phrase,
              slices,
              species,
              link,
              cluephrase,
              family,
              height,
              innerWidth,
              letter,
            ]) => (
              <tr key={slices}>
                <td>{phrase}</td>
                <td>{slices}</td>
                <td>
                  <a href={link} target="_blank" rel="noreferrer">
                    {species}
                  </a>
                </td>
                <td>{cluephrase}</td>
                <td>{family}</td>
                <td>{height}</td>
                <td>{innerWidth}</td>
                <td>{letter}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <h3>Bread tags</h3>
      <StyledTable>
        <tr>
          <th>Tag</th>
          <th>Family</th>
        </tr>
        <tr>
          <td>
            <img
              src={image1}
              alt="The silhouette of a bread tag with an oval, rounded mouth."
            />
          </td>
          <td>Archignathidae</td>
        </tr>
        <tr>
          <td>
            <img
              src={image2}
              alt="The silhouette of a bread tag with a mouth shaped like an upside-down apple."
            />
          </td>
          <td>Haplognathidae</td>
        </tr>
        <tr>
          <td>
            <img
              src={image3}
              alt="The silhouette of a bread tag with an oval mouth with two inward-facing prongs."
            />
          </td>
          <td>Toxodentidae</td>
        </tr>
        <tr>
          <td>
            <img
              src={image4}
              alt="The silhouette of a bread tag with a mouth with three inward-facing prongs."
            />
          </td>
          <td>Tridentidae</td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;

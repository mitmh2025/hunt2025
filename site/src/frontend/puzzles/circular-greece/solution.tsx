import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import pdf_motifs from "./assets/motifs.pdf";
import model_3mf from "./assets/rings-with-detentes-postsolve.3mf";
import model_stl from "./assets/rings-with-detentes-postsolve.stl";
import png_rod_sticker_single from "./assets/rod-sticker-one.png";
import pdf_sticker from "./assets/rod-sticker.pdf";

const TopTable = styled.table`
  border-spacing: 1rem 0;
  tbody tr td {
    text-align: center;
  }
`;

const BottomTable = styled.table`
  border-spacing: 1rem 0;
  tbody tr td:nth-child(1) {
    text-align: right;
  }
  tbody tr td:nth-child(2) {
    text-align: right;
  }
  tbody tr td:nth-child(3) {
    text-align: center;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        This puzzle consists of 45 3D printed pieces and a 12 inch wooden dowel
        with a sticker.
      </p>

      <p>
        The pieces can be assembled into 15 Brass Rats, each of which contains
        two band pieces and one bezel piece. The band pieces are uniquely
        matched via the geometric jigsaw pattern on the back. Correct assembly
        of two band pieces is confirmed when a valid word is spelled on the back
        of the band.
      </p>

      <p>
        Each ring must now be completed by adding the correct bezel piece. Every
        completed band has a symbol which has been traced from either the seal
        shank or class shank of one of the 15 most recent Brass Rats, and must
        be matched with a bezel piece containing a symbol traced from that
        year’s bezel.{" "}
        <a href="https://brassrat.mit.edu/archive">
          https://brassrat.mit.edu/archive
        </a>{" "}
        is a helpful resource in identifying these! The pictograms for each ring
        are shown here: <a href={pdf_motifs}>motifs.pdf</a>.
      </p>

      <p>
        When the correctly assembled rings are lined up on the provided rod
        (with the oldest ring at the top and the newest ring on the bottom), the
        center letter of each band word spells <Mono>SPIN RINGS PER ROD</Mono>.
      </p>

      <img
        src={png_rod_sticker_single}
        alt="A text label PAST, a series of 13 arrows pointing either left or right from a central point, with length of either 1 unit or 2 in that direction, a text label PRESENT, 2 more arrows, and a text label FUTURE"
      />

      <p>
        The arrows on the rod indicate the direction and number of letters each
        ring must be spun, revealing a new message down the center. (For
        example, the word <Mono>MASON</Mono> must be spun two places to the
        right, so that the “center” position which had previously been “S” is
        now “M.”) Now the center letters spell “<Mono>MOVEBEZELSUPTGR</Mono>.”
        Clearly something is going on with the last two rings.
      </p>

      <p>
        The word <Mono>PRESENT</Mono> on the rod should remind solvers that the
        most recent two rings are currently being worn by MIT undergrads. Per
        MIT lore, classes that have not yet graduated wear a Brass Rat “upside
        down” relative to already-graduated classes, and flip their rings over
        during Commencement (as an Educational Rite of Passage).
      </p>

      <p>
        Therefore, the rings from 2025 and 2026 must be flipped upside down
        before applying the transformation shifts from the rod. (These words are
        indicated with a * on the table below.) Note that when flipped, the{" "}
        <Mono>M</Mono> in <Mono>GLOOM</Mono> becomes a <Mono>W</Mono>.
      </p>

      <HScrollTableWrapper>
        <TopTable>
          <thead>
            <tr>
              <th>Year</th>
              <th>Word</th>
              <th>Middle</th>
              <th>Rod cue</th>
              <th>2nd step</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2012</td>
              <td>MASON</td>
              <td>S</td>
              <td>→ →</td>
              <td>M</td>
            </tr>
            <tr>
              <td>2013</td>
              <td>HIPPO</td>
              <td>P</td>
              <td>← ←</td>
              <td>O</td>
            </tr>
            <tr>
              <td>2014</td>
              <td>ALIVE</td>
              <td>I</td>
              <td>←</td>
              <td>V</td>
            </tr>
            <tr>
              <td>2015</td>
              <td>TONER</td>
              <td>N</td>
              <td>←</td>
              <td>E</td>
            </tr>
            <tr>
              <td>2016</td>
              <td>CAROB</td>
              <td>R</td>
              <td>← ←</td>
              <td>B</td>
            </tr>
            <tr>
              <td>2017</td>
              <td>WEIRD</td>
              <td>I</td>
              <td>→</td>
              <td>E</td>
            </tr>
            <tr>
              <td>2018</td>
              <td>ZONES</td>
              <td>N</td>
              <td>→ →</td>
              <td>Z</td>
            </tr>
            <tr>
              <td>2019</td>
              <td>ANGER</td>
              <td>G</td>
              <td>←</td>
              <td>E</td>
            </tr>
            <tr>
              <td>2020</td>
              <td>LASER</td>
              <td>S</td>
              <td>→ →</td>
              <td>L</td>
            </tr>
            <tr>
              <td>2021</td>
              <td>SUPER</td>
              <td>P</td>
              <td>→ →</td>
              <td>S</td>
            </tr>
            <tr>
              <td>2022</td>
              <td>GUESS</td>
              <td>E</td>
              <td>→</td>
              <td>U</td>
            </tr>
            <tr>
              <td>2023</td>
              <td>PARTY</td>
              <td>R</td>
              <td>→ →</td>
              <td>P</td>
            </tr>
            <tr>
              <td>2024</td>
              <td>STRIP</td>
              <td>R</td>
              <td>→</td>
              <td>T</td>
            </tr>
            <tr>
              <td>2025</td>
              <td>GLOOM*</td>
              <td>O</td>
              <td>→ →</td>
              <td>W</td>
            </tr>
            <tr>
              <td>2026</td>
              <td>ORDER*</td>
              <td>D</td>
              <td>← ←</td>
              <td>O</td>
            </tr>
          </tbody>
        </TopTable>
      </HScrollTableWrapper>

      <p>
        The new message reads <Mono>MOVE BEZELS UP TWO</Mono>. After bezels have
        been moved, solvers must apply the numerical transformation on the band
        to the letter on the reverse side of the bezel, as indicated in the
        table below to get the puzzle answer,{" "}
        <PuzzleAnswer>RAW ANTIQUE BRASS</PuzzleAnswer>.
      </p>

      <HScrollTableWrapper>
        <BottomTable>
          <thead>
            <tr>
              <th>Letter on bezel</th>
              <th>Shift</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S</td>
              <td>-1</td>
              <td>R</td>
            </tr>
            <tr>
              <td>R</td>
              <td>9</td>
              <td>A</td>
            </tr>
            <tr>
              <td>J</td>
              <td>-13</td>
              <td>W</td>
            </tr>
            <tr>
              <td>L</td>
              <td>-11</td>
              <td>A</td>
            </tr>
            <tr>
              <td>U</td>
              <td>-7</td>
              <td>N</td>
            </tr>
            <tr>
              <td>Y</td>
              <td>-5</td>
              <td>T</td>
            </tr>
            <tr>
              <td>M</td>
              <td>-4</td>
              <td>I</td>
            </tr>
            <tr>
              <td>C</td>
              <td>-12</td>
              <td>Q</td>
            </tr>
            <tr>
              <td>T</td>
              <td>1</td>
              <td>U</td>
            </tr>
            <tr>
              <td>F</td>
              <td>-1</td>
              <td>E</td>
            </tr>
            <tr>
              <td>Z</td>
              <td>2</td>
              <td>B</td>
            </tr>
            <tr>
              <td>P</td>
              <td>2</td>
              <td>R</td>
            </tr>
            <tr>
              <td>Y</td>
              <td>2</td>
              <td>A</td>
            </tr>
            <tr>
              <td>N</td>
              <td>5</td>
              <td>S</td>
            </tr>
            <tr>
              <td>R</td>
              <td>1</td>
              <td>S</td>
            </tr>
          </tbody>
        </BottomTable>
      </HScrollTableWrapper>

      <h4>Production notes</h4>
      <p>
        This puzzle consisted of 45 3D printed pieces and a 12” long, ¾”
        diameter wooden dowel with a sticker. If you’d like to solve this
        puzzle, you can find the sticker for the dowel{" "}
        <a href={pdf_sticker}>here</a> and the source file for the 3D printed
        pieces <a href={model_3mf}>here</a> (in 3MF format) or{" "}
        <a href={model_stl}>here</a> (in STL format). For Hunt, the puzzle was
        printed using Hatchbox’s{" "}
        <a href="https://www.hatchbox3d.com/collections/pla-1-75mm/products/3d-pla-1kg1-75-shny-brnz">
          metallic finish bronze PLA filament
        </a>
        ; it should be solvable with any material, but it may be more difficult
        to see fine details with white or black. The 3MF file also reflects the
        settings we used for printing the puzzle using a Bambu X1-series
        printer; you may need to make adjustments for different printers. We
        recommend printing with supports enabled for the best solving
        experience, although they are not strictly necessary.
      </p>
    </>
  );
};

export default Solution;

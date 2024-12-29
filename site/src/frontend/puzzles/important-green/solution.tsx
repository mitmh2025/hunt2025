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
    padding: 1px 8px;
    &:first-child {
      padding-left: 0px;
    }
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle presents twenty clues with an odd presentation–they are in
        all caps, and all U’s are replaced with V’s. Additionally, the first ten
        clues are in a larger font size than the last ten.
      </p>
      <p>
        The first ten clues indicate a scientific theory or discovery famously
        associated with a specific scientist:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Clue</th>
            <th>Scientist</th>
          </tr>
          <tr>
            <td>EARTH AIR FIRE WATER QVINTESSENCE</td>
            <td>Aristotle</td>
          </tr>
          <tr>
            <td>BVOYANT FORCES</td>
            <td>Archimedes</td>
          </tr>
          <tr>
            <td>THE VITRVVIAN MAN</td>
            <td>Leonardo da Vinci</td>
          </tr>
          <tr>
            <td>FOOD PRESERVATION VSING HIGH HEAT</td>
            <td>Louis Pasteur</td>
          </tr>
          <tr>
            <td>ELECTRICITY WITHIN A THVNDERSTORM</td>
            <td>Benjamin Franklin</td>
          </tr>
          <tr>
            <td>INFINITESIMAL CALCVLVS</td>
            <td>Isaac Newton</td>
          </tr>
          <tr>
            <td>MVTVAL INDVCTANCE</td>
            <td>Michael Faraday</td>
          </tr>
          <tr>
            <td>HELIOCENTRIC MODEL OF THE VNIVERSE</td>
            <td>Nicolaus Copernicus</td>
          </tr>
          <tr>
            <td>CHEMICAL NOMENCLATVRE</td>
            <td>Antoine Lavoisier</td>
          </tr>
          <tr>
            <td>EVOLVTIONARY BIOLOGY</td>
            <td>Charles Darwin</td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        As hinted by the all-caps and the U/V substitutions, these first ten
        clues all give names of scientists who are present as “headliners” on
        the{" "}
        <a
          href="https://web.archive.org/web/20100519104929/http://libraries.mit.edu/archives/exhibits/names/index.html"
          target="_blank"
          rel="noreferrer"
        >
          friezes (“pavilion attics”) in Killian Court
        </a>
        . Each frieze has one scientist’s name in larger letters, and then a
        number of other scientist names in smaller letters.
      </p>
      <p>The last ten clues give words or phrases:</p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Clue</th>
            <th>Answer</th>
          </tr>
          <tr>
            <td>BREED OF GOAT THAT PRODVCES MOHAIR</td>
            <td>ANGORA</td>
          </tr>
          <tr>
            <td>CVTESY WAY TO TALK ABOVT LEPORIDAE</td>
            <td>BUNNIES</td>
          </tr>
          <tr>
            <td>FIRST NAME OF GVS ACTOR IN BETTER CALL SAVL</td>
            <td>GIANCARLO</td>
          </tr>
          <tr>
            <td>SVBJECTS LIKE HISTORY OR LITERATVRE</td>
            <td>HUMANITIES</td>
          </tr>
          <tr>
            <td>SVRNAME OF TOLSTOY PROTAGONIST</td>
            <td>KARENINA</td>
          </tr>
          <tr>
            <td>CROWDS CHANT YOV SVCK IN TIME WITH THIS WRESTLERS MVSIC</td>
            <td>KURT ANGLE</td>
          </tr>
          <tr>
            <td>ANCIENT JVDEAN FORTRESS ON A PLATEAV</td>
            <td>MASADA</td>
          </tr>
          <tr>
            <td>CONSVME ALCOHOL BEFORE THE PARTY</td>
            <td>PREGAME</td>
          </tr>
          <tr>
            <td>THE QVALITY OF BEING SVRREPTITIOVS</td>
            <td>STEALTH</td>
          </tr>
          <tr>
            <td>ONE OF THIRTY TWO IN ADVLT HVMAN MOVTHS</td>
            <td>TOOTH</td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        These clues give words that are transadditions (add a letter and
        anagram) of other names present on the pavilion attics, as hinted by the
        flavortext “embellish a little bit”. Each of those names appears on a
        different frieze.
      </p>
      <p>
        Match up the answers from each set and order by the given “headliner”
        names. Then extract the extra letters:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Headliner</th>
            <th>Smaller Name</th>
            <th>Clue Word</th>
            <th>Extra Letter</th>
          </tr>
          <tr>
            <td>Aristotle</td>
            <td>Thales</td>
            <td>
              <Mono>STEALTH</Mono>
            </td>
            <td>
              <Mono>T</Mono>
            </td>
          </tr>
          <tr>
            <td>Archimedes</td>
            <td>Otto</td>
            <td>
              <Mono>TOOTH</Mono>
            </td>
            <td>
              <Mono>H</Mono>
            </td>
          </tr>
          <tr>
            <td>Leonardo da Vinci</td>
            <td>Anthemius</td>
            <td>
              <Mono>HUMANITIES</Mono>
            </td>
            <td>
              <Mono>I</Mono>
            </td>
          </tr>
          <tr>
            <td>Pasteur</td>
            <td>Agricola</td>
            <td>
              <Mono>GIANCARLO</Mono>
            </td>
            <td>
              <Mono>N</Mono>
            </td>
          </tr>
          <tr>
            <td>Franklin</td>
            <td>Regnault</td>
            <td>
              <Mono>KURT ANGLE</Mono>
            </td>
            <td>
              <Mono>K</Mono>
            </td>
          </tr>
          <tr>
            <td>Newton</td>
            <td>Adams</td>
            <td>
              <Mono>MASADA</Mono>
            </td>
            <td>
              <Mono>A</Mono>
            </td>
          </tr>
          <tr>
            <td>Faraday</td>
            <td>Ampere</td>
            <td>
              <Mono>PREGAME</Mono>
            </td>
            <td>
              <Mono>G</Mono>
            </td>
          </tr>
          <tr>
            <td>Copernicus</td>
            <td>Rankine</td>
            <td>
              <Mono>KARENINA</Mono>
            </td>
            <td>
              <Mono>A</Mono>
            </td>
          </tr>
          <tr>
            <td>Lavoisier</td>
            <td>Bunsen</td>
            <td>
              <Mono>BUNNIES</Mono>
            </td>
            <td>
              <Mono>I</Mono>
            </td>
          </tr>
          <tr>
            <td>Darwin</td>
            <td>Arago</td>
            <td>
              <Mono>ANGORA</Mono>
            </td>
            <td>
              <Mono>N</Mono>
            </td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        The answer is <PuzzleAnswer>THINK AGAIN</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;

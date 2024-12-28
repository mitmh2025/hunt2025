import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import biomuseo from "./assets/biomuseo.png";
import chauChakWing from "./assets/chau-chak-wing.png";
import dancingHouse from "./assets/dancing-house.png";
import disney from "./assets/disney.png";
import fiveHole from "./assets/five-hole.png";
import gehry from "./assets/gehry.png";
import luma from "./assets/luma.png";
import marquesDeRiscal from "./assets/marques-de-riscal.png";
import mopop from "./assets/mopop.png";
import stata from "./assets/stata.png";

const StyledImage = styled(LinkedImage)`
  margin-bottom: 1em;
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  padding: 1px 8px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are given 10 transparent sheets containing cut-out images of
        buildings, as well as random lines and letters. As the sheets are
        transparent, they can be stacked to overlap designs. Overlapping the box
        containing a letter on each sheet spells out Frank Gehry.
      </p>
      <StyledImage
        src={gehry}
        alt="Chopped up bits of Frank Gehry buildings and scattered black lines and dots surround a black box with block text reading Frank Gehry."
      />
      <p>
        This puzzle involves arranging and overlapping these sheets to
        reconstruct buildings designed by Frank Gehry (the most recognisable one
        being the MIT Stata building). To assist this, 9 building outlines are
        provided on paper, helping solvers jigsaw together the pieces or making
        it easier to identify buildings. Each building, when properly assembled,
        reveals a set of letters in the pigpen cipher (clued by the flavor “it’s
        kind of muddy”). When the buildings are ordered according to their
        letter markings (which also order the building names alphabetically),
        the pigpen letters formed spell out{" "}
        <Mono>ORIGINAL CHIAT DAY SYMBOL SEVEN FIVE</Mono>. This refers to the
        Binoculars Building, also designed by Gehry for the agency
        TBWA\Chiat\Day, formerly known as the Chiat/Day Building. This clues the
        answer <PuzzleAnswer>FORWARD SLASH</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <th>Building Name</th>
          <th>Pigpen Letters</th>
        </tr>
        <tr>
          <td>Biomuseo</td>
          <td>ORIGI</td>
        </tr>
        <tr>
          <td>Dancing House</td>
          <td>NAL</td>
        </tr>
        <tr>
          <td>Dr. Chau Chak Wing Building</td>
          <td>CHI</td>
        </tr>
        <tr>
          <td>Five Hole Warming Hut</td>
          <td>ATDA</td>
        </tr>
        <tr>
          <td>LUMA Tower</td>
          <td>YSY</td>
        </tr>
        <tr>
          <td>Marqués de Riscal Hotel</td>
          <td>MBO</td>
        </tr>
        <tr>
          <td>Museum of Pop Culture</td>
          <td>LS</td>
        </tr>
        <tr>
          <td>Ray and Maria Stata Center</td>
          <td>EVEN</td>
        </tr>
        <tr>
          <td>Walt Disney Concert Hall</td>
          <td>FIVE</td>
        </tr>
      </StyledTable>
      <h3>Reconstructed Building Images</h3>
      <p>Biomuseo</p>
      <StyledImage
        src={biomuseo}
        alt="Chopped up bits of Frank Gehry builidings surrounding the Biomuseo. It is a many-angled building with many-angled roofs and awnings (yes, plural roofs and awnings). Every section of the building is painted a different color of the rainbow. Below the building are the letters ORIGI in the Pigpen cipher."
      />
      <p>Dancing House</p>
      <StyledImage
        src={dancingHouse}
        alt="Chopped up bits of Frank Gehry buildings surrounding the Dancing House. It is a round building with two towers that superficially resemble two people dancing. The tower on the left is glass, and is skewed out to the left, like a swishy skirt. The tower on the right is concrete, and has a wispy sculpture on the top, like a hat or toupee. Below the building are the letters NAL in the Pigpen cipher."
      />
      <p>Dr. Chau Chak Wing Building</p>
      <StyledImage
        src={chauChakWing}
        alt="Chopped up bits of Frank Gehry buildings surrounding the Dr. Chau Chak Wing building. It has two brown brick facades on either side of an angular glass center. The facade on the left is curved; sheet glass windows protrude from it slightly. The facade on the left is wavy; sheet glass windows and random bricks protrude from it dramatically, at many angles. Above the building are the letters CSI in the Pigpen cipher."
      />
      <p>Five Hole Warming Hut</p>
      <StyledImage
        src={fiveHole}
        alt="Chopped up bits of Frank Gehry buildings surrounding Five Hole Warming Hut. It is quite literally a pile of ice blocks and lumber, messily bolted together, surrounding a live metal firepit. Below the ostensible building are the letters ATDA in the Pigpen cipher."
      />
      <p>LUMA Tower</p>
      <StyledImage
        src={luma}
        alt="Chopped up bits of Frank Gehry buildings surrounding the LUMA tower. It is a tall building that looks like it has been constructed from shiny metal LEGO bricks attached to each other at improbable angles. It has multi-paned windows protruding from it in multiple different directions. Above the building are the letters YSY in the Pigpen cipher."
      />
      <p>Marqués de Riscal Hotel</p>
      <StyledImage
        src={marquesDeRiscal}
        alt="Chopped up bits of Frank Gehry buildings surrounding the Marqués de Riscal Hotel. It is a long building that looks like it is made of bent sheets of purplish iridescent metal. Above the building are the letters MBO in the Pigpen cipher."
      />
      <p>Museum of Pop Culture</p>
      <StyledImage
        src={mopop}
        alt="Chopped up bits of Frank Gehry buildings surrounding the Museum of Pop Culture. It resembles the steam towers of a nuclear power plant, if one made nuclear power plants out of iridescent sheet metal. Below the building are the letters LS in the Pigpen cipher."
      />
      <p>Ray and Maria Stata Center</p>
      <StyledImage
        src={stata}
        alt="Chopped up bits of Frank Gehry buildings surrounding the Stata center. It looks like five or ten brick and metal buildings smushed together like Play-Doh. Below the building are the letters EVEN in the Pigpen cipher."
      />
      <p>Walt Disney Concert Hall</p>
      <StyledImage
        src={disney}
        alt="Chopped up bits of Frank Gehry buildings surrounding the Walt Disney Concert Hall. It looks like a bunch of very well polished battleships got into a multi-vehicle pileup on the freeway. Below the building are the letters FIVE in the Pigpen cipher."
      />
      <h2>Author’s Note</h2>
      <p>
        This puzzle is a spiritual successor to 2018’s{" "}
        <a
          href="https://puzzles.mit.edu/2018/full/puzzle/its_not_normal.html"
          target="_blank"
          rel="noreferrer"
        >
          It’s Not Normal
        </a>
        , as hinted by the title.
      </p>
    </>
  );
};

export default Solution;

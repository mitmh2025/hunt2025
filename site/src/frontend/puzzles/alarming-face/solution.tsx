import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import grandpre from "./assets/grandpre.png";

const DERBY_TABLE: [number, string, string, number, string][] = [
  [1, "Monaco", "North Light", 2004, "Trulli"],
  [2, "Sepang", "Camelot", 2012, "Alonso"],
  [3, "Hungaroring", "Reference Point", 1987, "Piquet"],
  [4, "A1 Ring", "Oath", 1999, "Irvine"],
  [5, "Zandvoort", "City of Troy", 2024, "Norris"],
  [6, "Monza", "Mill Reef", 1971, "Gethin"],
];

const TOUR_TABLE: [number, string, string, string][] = [
  [421, "Michigan City", "Monon", "United States"],
  [325, "Sainte-Justine-de-Newton", "Rivière-Beaudette", "Canada"],
  [642, "Montebello", "Florida", "Puerto Rico"],
  [134, "Stoke Ferry", "Stradsett", "United Kingdom"],
  [563, "Milltown", "Aghadoe", "Ireland"],
  [612, "Goongerah", "Orbost", "Australia"],
  [552, "Lahar", "Bhander", "India"],
  [166, "Iitakacho Nanukaichi", "Takami-no-Sato", "Japan"],
];

const GRANDPRE_SQUARE = `TRULLI
ALONSO
PIQUET
IRVINE
NORRIS
GETHIN
`;

const StyledTable = styled.table`
  margin: 1em 0;
  border-spacing: 16px 0px;
`;

const GranpreSquare = styled.pre`
  margin-bottom: 1em;
  font-family: "Roboto Mono", monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is about Formula One (F1) racing, and winners in general.
        Solvers are presented with six videos of a car driving around a circuit.
        Each circuit matches a real circuit that has hosted F1 Grands Prix. The
        first task is to identify each circuit based on the turns/layout:
      </p>
      <ol>
        <li>Circuit de Monaco (aka Monaco)</li>
        <li>Sepang International Circuit</li>
        <li>Hungaroring</li>
        <li>A1-Ring (currently named Red Bull Ring)</li>
        <li>Circuit Zandvoort</li>
        <li>Autodromo Nazionale di Monza (aka Monza)</li>
      </ol>
      <p>
        Additionally, each track has a prominent billboard with unusual art.
        Immediately preceding the billboard is a series of flags, each with a
        horse silhouette in the center. Continuing the theme of “winners,” the
        billboards hint the identity of a Derby winner (the Epsom Derby, aka The
        Derby, as hinted by “salt” in the flavor text). The flags show the
        design of the jockey silks for the winner as a confirmation/hint.
      </p>
      <p>
        The derby winner gives a unique year (as each horse can only run in The
        Derby once). Together, the circuit and the year identify an F1 driver
        who won at that track in that year in the F1 series. As an additional
        confirmation, the car for each track uses the “skin” (design) of the
        winning driver’s nationality.
      </p>
      <StyledTable>
        <tr>
          <th>Num</th>
          <th>F1 Circuit</th>
          <th>Horse</th>
          <th>Year</th>
          <th>F1 Driver</th>
        </tr>
        {DERBY_TABLE.map(([num, circuit, horse, year, driver]) => (
          <tr key={`derby-${num}`}>
            <td>{num}</td>
            <td>{circuit}</td>
            <td>{horse}</td>
            <td>{year}</td>
            <td>{driver}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        The last track is different, and shows a first-person view of a car
        driving around a very twisty track, with many billboards with city names
        in various countries. Tracing this track, solvers should identify the
        layout as cursive writing (hinted by “scripted” in the flavor) spelling
        GRANDPRÉ. The car drives as the word would be written in cursive,
        including double-backs for the A, N, D, and P.
      </p>
      <LinkedImage
        src={grandpre}
        alt="A driving track spelling out Grandpré in cursive"
      />
      <p>
        The billboards are arranged as pairs, with the first in each saying
        “thanks for visiting” and the second saying “welcome to.” Between each
        is a blank highway sign matching the style of the country’s highway
        signs. Looking at a map, the most direct route between the first/origin
        city and second/destination city is a single highway, as hinted by the
        blank sign. These then give eight three-digit numbers:
      </p>
      <StyledTable>
        <tr>
          <th>Route</th>
          <th>Origin City</th>
          <th>Destination City</th>
          <th>Country/Territory</th>
        </tr>
        {TOUR_TABLE.map(([route, origin, destination, country]) => (
          <tr key={`tour-${route}`}>
            <td>{route}</td>
            <td>{origin}</td>
            <td>{destination}</td>
            <td>{country}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Along with the image of Cypher from the matrix on the last billboard,
        this video tells solvers to use the Grandpré cipher, which always
        consists of a square of letters comprising equal-length words, the first
        letter of each spelling another word. Our six winning drivers all have
        last names of exactly six letters, giving the following square:
      </p>
      <GranpreSquare>{GRANDPRE_SQUARE}</GranpreSquare>
      <p>
        Using the code numbers from the route numbers—taken two at a time—to
        decode this Grandpré square gives the final hint:{" "}
        <Mono>RUSH AUSTRIAN</Mono>. Looking that up, solvers will see that the
        Austrian driver in the movie biopic Rush is{" "}
        <PuzzleAnswer>NIKI LAUDA</PuzzleAnswer>, which is the answer to the
        puzzle.
      </p>
      <h3>Author’s Note</h3>
      <p>
        The original idea for this puzzle was very simple and consisted solely
        of spelling words via custom race tracks. When an F1-related answer
        popped up in a late round, we thought taking that idea and adding to it
        would be appropriate.
      </p>
      <p>
        Looking at various ciphers (F1 made me think of hex-based encodings), I
        discovered the Grandpré cipher which seemed like a fun coincidence/pun.
        I knew nothing about Formula One, though, so much research ensued. After
        constructing the puzzle, I was inspired to watch{" "}
        <i>Formula One: Drive to Survive</i> on Netflix, and I enjoyed seeing
        the real drivers and their stories behind the otherwise prosaic
        spreadsheet data. I highly recommend this series whether you previously
        had any interest in Formula One or not.
      </p>
      <p>
        I’d like to thank my son Tyler for doing all the driving and recording
        for the videos (over and over as I made adjustments to the tracks). I’d
        also like to thank my wife Susan for creating most of the custom
        Grandpré track layout; the Trackmania editor is <em>not</em> easy to
        use, as we belatedly discovered. And, of course, the editors; this
        puzzle needed quite a bit of collaborative brainstorming as it evolved!
      </p>
    </>
  );
};

export default Solution;

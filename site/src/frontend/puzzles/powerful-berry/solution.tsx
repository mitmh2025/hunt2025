import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const TAGS_DATA: [number, string, string][] = [
  [39.9, "Stadsmuseet Stockholm", ""],
  [70.2, "Chemin de l’Observatoire", ""],
  [100.1, "NCN Route 65", ""],
  [152.3, "21 Tkalčićeva ulica", ""],
  [192.7, "Flag of Croatia", "↻40°.7"],
  [515.8, "Rua da Sra. dos Caminhos", ""],
  [660.4, "Flag of Sweden", "↺81.4°"],
  [877.4, "Flag of United States", "↻46.7°"],
  [965.3, "Pitäjänmäentien ja Höyläämötien kulmassa", ""],
  [1252.7, "Flag of United Kingdom", "↺103.1°"],
  [1918.5, "Thompson Park", ""],
  [2170.2, "MIT logo", "0.0° ↓𓊍"],
  [2808.4, "Flag of Washington, DC", "↺27.9°"],
  [3008.1, "Arts and Industries Building", ""],
  [3665.4, "Flag of Canada", "↻158.0°"],
  [3707.3, "Flag of Portugal", "↻56.0°"],
  [3771.7, "Flag of Finland", "↻13.5°"],
  [3950.6, "8-322", ""],
];

const SOLAR_SYSTEMS_DATA: [string, string, string, string, number][] = [
  ["Mercury", "Stadsmuseet Stockholm", "Sweden Solar System", "Sweden", 2990],
  [
    "Venus",
    "Chemin de l’Observatoire",
    "Mont Megantic Dark Sky Reserve Great Solar System",
    "Parc National du Mont Megantic, Quebec, Canada",
    1050,
  ],
  [
    "Earth",
    "NCN Route 65",
    "York’s Solar System Model",
    "York, England, UK",
    260,
  ],
  ["Mars", "21 Tkalčićeva ulica", "Nine Views", "Zagreb, Croatia", 335],
  [
    "Jupiter",
    "Rua da Sra. dos Caminhos",
    "Trilho do Sistema Solar",
    "Paredes de Coura, Portugal",
    929,
  ],
  [
    "Saturn",
    "Pitäjänmäentien ja Höyläämötien kulmassa",
    "Pajamäki Solar System Scale Model",
    "Helsinki, Finland",
    1444,
  ],
  [
    "Uranus",
    "Thompson Park",
    "The Sagan Planet Walk",
    "Ithaca, NY, United States",
    574.2,
  ],
  [
    "Neptune",
    "Arts and Industries Building",
    "Voyage Solar System",
    "Washington, DC",
    450,
  ],
  [
    "Pluto",
    "8-322",
    "MIT’s Infinite Solar System",
    "MIT (Cambridge, MA, US)",
    197,
  ],
];

const EXTRACTION_DATA: [
  string,
  string,
  string,
  number,
  number,
  string,
  number,
  number,
][] = [
  [
    "Mercury",
    "Stadsmuseet Stockholm",
    "Sweden",
    39.9,
    49398,
    "STATENS PORTRATTSAMLING",
    -81.4,
    0,
  ],
  [
    "Venus",
    "Chemin de l’Observatoire",
    "Parc National du Mont Megantic, Quebec, Canada",
    70.2,
    54833,
    "A. K. AUTO MECANIQUE INC",
    158,
    3,
  ],
  [
    "Earth",
    "NCN Route 65",
    "York, England, UK",
    100.1,
    3254,
    "BAY TREE GUEST HOUSE",
    -103.1,
    2,
  ],
  [
    "Mars",
    "21 Tkalčićeva ulica",
    "Zagreb, Croatia",
    152.3,
    3622,
    "ZAGREBACKA DZAMIJA",
    117.1,
    3,
  ],
  [
    "Jupiter",
    "Rua da Sra. dos Caminhos",
    "Paredes de Coura, Portugal",
    515.8,
    6674,
    "LOUREIRO BAR",
    56,
    4,
  ],
  [
    "Saturn",
    "Pitäjänmäentien ja Höyläämötien kulmassa",
    "Helsinki, Finland",
    965.3,
    5642,
    "TAHKO PIHKALA PATSAS",
    13.5,
    6,
  ],
  [
    "Uranus",
    "Thompson Park",
    "Ithaca, NY, United States",
    1918.5,
    263,
    "THE WILLIAM HENRY MILLER INN",
    46.7,
    7,
  ],
  [
    "Neptune",
    "Arts and Industries Building",
    "Washington, DC",
    3008.1,
    420,
    "FEDERAL AVIATION ADMINISTRATION",
    -27.9,
    8,
  ],
  [
    "Pluto",
    "8-322",
    "MIT (Cambridge, MA, US)",
    3950.6,
    92,
    "MIT ENERGY INITIATIVE UNDERGRADUATE ENERGY COMMONS",
    2.9,
    9,
  ],
];

const StyledTable = styled.table`
  margin-bottom: 1em;
  border-collapse: collapse;
  th,
  td {
    padding: 0 8px;
  }
  th {
    background-color: var(--teal-300);
  }
`;

const ExtraStyledTable = styled(StyledTable)`
  tr:nth-child(odd) {
    background-color: var(--teal-200);
  }
  tr:nth-child(even) {
    background-color: var(--teal-100);
  }
`;

const Highlight = styled.span`
  background-color: var(--gold-100);
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a very long ribbon, with a number of tags
        attached at intervals. Upon inspecting the labels, they will find that
        each label either has a flag on one side and a drawing with a number in
        degrees on the other side, or the name of a location. One more label at
        one end of the ribbon is labeled with a sun icon.
      </p>
      <p>
        If solvers measure the ribbon, they will find it is 40 meters long. The
        locations of the tags are below:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Distance from “sun” (cm)</th>
            <th>Front of tag</th>
            <th>Back of tag</th>
          </tr>
          {TAGS_DATA.map(([distance, front, back], i) => (
            <tr
              key={i}
              style={back === "" ? { backgroundColor: "var(--teal-200)" } : {}}
            >
              <td>{distance}</td>
              <td>{front}</td>
              <td>{back}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        If solvers go to 8-322, they will find that it is next to the location
        of Pluto in The Infinite Solar System, the scale model of the solar
        system installed on the third floor of the Infinite Corridor. The puzzle
        itself is also a scale model of the solar system at a scale of 1 AU = 1
        meter. Tags labeled with locations are the locations of the eight
        planets plus Pluto in various scale model solar systems across the
        world, from Sweden’s model at 1:20,000,000 to MIT’s at 1:30,000,000,000!
        Planet tags are located along the ribbon at the reported distance for
        each model (some models measure walking distance, so the straight-line
        as the crow flies distance is shorter).
      </p>
      <HScrollTableWrapper>
        <ExtraStyledTable>
          <tr>
            <th>Planet</th>
            <th>Location</th>
            <th>Model solar system</th>
            <th>Country</th>
            <th>Reported distance sun to planet (m)</th>
          </tr>
          {SOLAR_SYSTEMS_DATA.map(
            ([planet, location, model, country, distance], i) => (
              <tr key={i}>
                <td>{planet}</td>
                <td>{location}</td>
                <td>{model}</td>
                <td>{country}</td>
                <td>{distance}</td>
              </tr>
            ),
          )}
        </ExtraStyledTable>
      </HScrollTableWrapper>
      <p>
        Solvers must now locate each model’s sun on a map and determine the sun
        to planet direction. Each tag with a flag can be matched to a planet
        walk. If solvers were standing at the sun in that model and looking
        directly at the model of the planet marked on the ribbon, they could
        adjust their bearing by the specified number of degrees (clockwise or
        counterclockwise, as indicated by the arrow) and travel the specified
        distance to find another local landmark. Solvers can use online
        geocaching tools, linked in the appendix below, to calculate the
        location of the landmark once they have identified the latitude and
        longitude of each sun/planet pair using google maps. The drawings on the
        backs of the tags, along with the alphabetized enumerations in the
        puzzle document, confirm that solvers have found the correct landmark,
        and the language on each planet tag indicates what language to write the
        landmark name in.
      </p>
      <p>
        Diagonalizing, or indexing into each landmark’s name by the number of
        its planet, reveals the answer, <PuzzleAnswer>SKY REPLAY</PuzzleAnswer>.
      </p>
      <HScrollTableWrapper>
        <ExtraStyledTable>
          <tr>
            <th>Planet</th>
            <th>Planet location in model</th>
            <th>Model location</th>
            <th>Ribbon distance in cm (1 AU = 1 m)</th>
            <th>Landmark distance from “sun” (m)</th>
            <th>Landmark</th>
            <th>Degrees (planet = 0)</th>
          </tr>
          {EXTRACTION_DATA.map(
            (
              [
                planet,
                planetLocation,
                modelLocation,
                ribbonDistance,
                landmarkDistance,
                landmark,
                degrees,
                highlight,
              ],
              i,
            ) => (
              <tr key={i}>
                <td>{planet}</td>
                <td>{planetLocation}</td>
                <td>{modelLocation}</td>
                <td>{ribbonDistance}</td>
                <td>{landmarkDistance}</td>
                <td>
                  <Mono>
                    {landmark
                      .split("")
                      .map((char, j) =>
                        j === highlight ? (
                          <Highlight key={j}>{char}</Highlight>
                        ) : (
                          <React.Fragment key={j}>{char}</React.Fragment>
                        ),
                      )}
                  </Mono>
                </td>
                <td>{degrees}</td>
              </tr>
            ),
          )}
        </ExtraStyledTable>
      </HScrollTableWrapper>
      <h3>Appendix</h3>
      <p>
        In order to calculate the coordinates of the landmark, one must first
        calculate the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Azimuth"
          target="_blank"
          rel="noreferrer"
        >
          azimuth
        </a>{" "}
        of the line between the sun and the planet on each planet walk. This can
        be done using{" "}
        <a
          href="https://www.fcc.gov/media/radio/distance-and-azimuths"
          target="_blank"
          rel="noreferrer"
        >
          this calculator
        </a>
        , maintained by the FCC, or . Once the azimuth is calculated, solvers
        can find the “absolute” degree measurement from due north in which they
        must look to find the clued landmark. The distance to said landmark is
        given by the location of its tag along the ribbon. With these data
        points, one can use this{" "}
        <a href="https://www.fcc.gov/media/radio/find-terminal-coordinates">
          terminal coordinates
        </a>{" "}
        calculator, also maintained by the FCC, to get the coordinates of the
        landmark on the tag.
      </p>
      <p>
        Solvers could also use geocaching tools, such as{" "}
        <a
          href="https://www.geocachingtoolbox.com/index.php?lang=en&page=distanceBearingMidpoint"
          target="_blank"
          rel="noreferrer"
        >
          this
        </a>{" "}
        distance, bearing, and midpoint calculator and{" "}
        <a
          href="https://www.geocachingtoolbox.com/index.php?lang=en&page=coordinateProjection&status=result"
          target="_blank"
          rel="noreferrer"
        >
          this
        </a>{" "}
        coordinate projection calculator to find the landmark coordinates as
        well.
      </p>
      <p>
        Alternatively, if one wishes to suffer, one could do a bunch of
        spherical trigonometry to figure out the same values. These proofs are
        left as an exercise for the reader.
      </p>
    </>
  );
};

export default Solution;

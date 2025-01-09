import React from "react";
import { styled } from "styled-components";
import { Math, MI, MN, MO, MSub, MSup, MText } from "../../components/MathML";
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
  [515.8, "Rua da Sra. dos Caminhos", ""],
  [660.4, "Flag of Sweden", "↺81.4°"],
  [877.4, "Flag of United States", "↻46.7°"],
  [965.3, "Pitäjänmäentien ja Höyläämötien kulmassa", ""],
  [1252.7, "Flag of United Kingdom", "↺103.1°"],
  [1646.2, "Flag of Croatia", "↻117°.1"],
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
    108,
    "MIT ENERGY INITIATIVE UNDERGRADUATE ENERGY COMMONS",
    0.0,
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

const Alpha = () => <MI>α</MI>;

const Beta = () => <MI>β</MI>;

const Delta = () => <MI>δ</MI>;

const Theta = () => <MI>θ</MI>;

const Pi = () => <MI>π</MI>;

const X = () => <MI>x</MI>;

const Y = () => <MI>y</MI>;

const Phi1 = () => (
  <MSub>
    <MSup>
      <MI>ϕ</MI>
    </MSup>
    <MSup>
      <MN>1</MN>
    </MSup>
  </MSub>
);

const Phi2 = () => (
  <MSub>
    <MSup>
      <MI>ϕ</MI>
    </MSup>
    <MSup>
      <MN>2</MN>
    </MSup>
  </MSub>
);

const Phi3 = () => (
  <MSub>
    <MSup>
      <MI>ϕ</MI>
    </MSup>
    <MSup>
      <MN>3</MN>
    </MSup>
  </MSub>
);

const Lambda1 = () => (
  <MSub>
    <MSup>
      <MI>λ</MI>
    </MSup>
    <MSup>
      <MN>1</MN>
    </MSup>
  </MSub>
);

const Lambda2 = () => (
  <MSub>
    <MSup>
      <MI>λ</MI>
    </MSup>
    <MSup>
      <MN>2</MN>
    </MSup>
  </MSub>
);

const Lambda3 = () => (
  <MSub>
    <MSup>
      <MI>λ</MI>
    </MSup>
    <MSup>
      <MN>3</MN>
    </MSup>
  </MSub>
);

const Cos = ({ children }: { children: JSX.Element }) => (
  <>
    <MO>cos</MO>
    <Parens>{children}</Parens>
  </>
);

const Sin = ({ children }: { children: JSX.Element }) => (
  <>
    <MO>sin</MO>
    <Parens>{children}</Parens>
  </>
);

const Atan2 = ({ children }: { children: JSX.Element }) => (
  <>
    <MO>atan2</MO>
    <Parens>{children}</Parens>
  </>
);

const Asin = ({ children }: { children: JSX.Element }) => (
  <>
    <MO>asin</MO>
    <Parens>{children}</Parens>
  </>
);

const Parens = ({ children }: { children: JSX.Element }) => (
  <>
    <MO fence={true} symmetric={true} stretchy={true}>
      {"("}
    </MO>
    {children}
    <MO fence={true} symmetric={true} stretchy={true}>
      {")"}
    </MO>
  </>
);

const Times = () => <MO>⋅</MO>;

const Dau = () => (
  <MSub>
    <MSup>
      <MI>d</MI>
    </MSup>
    <MSup>
      <MI>AU</MI>
    </MSup>
  </MSub>
);

const DRibbon = () => (
  <MSub>
    <MSup>
      <MI>d</MI>
    </MSup>
    <MSup>
      <MI>ribbon</MI>
    </MSup>
  </MSub>
);

const Dkm = () => (
  <MSub>
    <MSup>
      <MI>d</MI>
    </MSup>
    <MSup>
      <MI>km</MI>
    </MSup>
  </MSub>
);

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
        When solvers measure the ribbon, they will find it is 40 meters long.
        The locations of the tags are below:
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
        meter, where each tag with a location represents a planet in our ribbon
        model. This allows solvers to associate a planet with each location. The
        locations written on the tags are the locations of the associated
        planets (plus Pluto) in various scale model solar systems across the
        world, from Sweden’s model at 1:20,000,000 to MIT’s at 1:30,000,000,000!
      </p>
      <p>
        Solvers can look up the reported distance for each solar system model
        from the sun to the associated planet in that model. (Some models
        measure walking distance, so the straight-line as the crow flies
        distance is shorter. Note that the pretty graphic on the website for
        Portugal’s model shows hiking distance and altitude while the model is
        scaled on the straight line distance—we have used the provided longitude
        and latitude to calculate this distance.) Tags with illustrations also
        have a flag on the reverse (or the MIT logo), which allows solvers to
        associate each drawing with a real-world solar system model (see Country
        column below).
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
        Each pair of tags, along with the sun tag, forms its own scale model. In
        this scale model, the sun tag and the tag with the text represent the
        sun and planet in the corresponding scale model of the solar system, and
        solvers must determine what location the flag tag represents. Measure
        the distance from the sun to the landmark tag and use the scale of the
        corresponding model to determine the mystery landmark’s distance from
        the sun model. However, since in most cases the landmark is not on the
        line formed by the points of the sun model and the planet model, solvers
        need to adjust their bearing from the sun model to find the landmark.
      </p>
      <p>
        Solvers must now locate each model’s sun on a map and determine the sun
        to planet direction. If solvers were standing at the sun in that model
        and looking directly at the model of the associated planet, they could
        adjust their bearing by the specified number of degrees (clockwise or
        counterclockwise, as indicated by the arrow) and travel the calculated
        distance to find the landmark in the drawing. Solvers can use online
        geocaching tools, linked in the appendix below, to calculate the
        location of the landmark once they have identified the latitude and
        longitude of each sun/planet pair using google maps. The drawings on the
        backs of the tags, along with the alphabetized enumerations in the
        puzzle document, confirm that solvers have found the correct landmark,
        and the language on each tag with text indicates what language to write
        the landmark name in.
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
        , maintained by the FCC. Once the azimuth is calculated, solvers can
        find the “absolute” degree measurement from due north in which they must
        look to find the clued landmark. The distance to said landmark is given
        by the location of its tag along the ribbon.{" "}
      </p>
      <p>
        Assuming solvers do not wish to engage with spherical trigonometry, they
        could use this{" "}
        <a href="https://www.fcc.gov/media/radio/find-terminal-coordinates">
          terminal coordinates
        </a>{" "}
        calculator, also maintained by the FCC, to get the coordinates of the
        landmark on the tag. Solvers could also use geocaching tools, such as{" "}
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
      <h3>Appendix to the appendix</h3>
      <p>
        The azimuth can be calculated using the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Vincenty%27s_formulae#Inverse_problem"
          target="_blank"
          rel="noreferrer"
        >
          inverse Vincenty’s formula
        </a>
        . Because all three points are so close to each other, compared to the
        radius of the planet, we can assume a spherical Earth to simplify the
        calculations somewhat.
      </p>
      <p>
        Given the following variables:
        <br />
        <Math>
          <Phi1 />
          <MO>=</MO>
          <MText>latitude of the Sun in radians</MText>
        </Math>
        <br />
        <Math>
          <Phi2 />
          <MO>=</MO>
          <MText>latitude of the planet in radians</MText>
        </Math>
        <br />
        <Math>
          <Lambda1 />
          <MO>=</MO>
          <MText>longitude of the Sun in radians</MText>
        </Math>
        <br />
        <Math>
          <Lambda2 />
          <MO>=</MO>
          <MText>longitude of the planet in radians</MText>
        </Math>
      </p>
      <p>
        Per the inverse Vincenty’s formula, the azimuth can be calculated as:
        <br />
        <Math>
          <Y />
          <MO>=</MO>
          <Cos>
            <Phi2 />
          </Cos>
          <Times />
          <Sin>
            <>
              <Lambda2 />
              <MO>−</MO>
              <Lambda1 />
            </>
          </Sin>
        </Math>
        <br />
        <Math>
          <X />
          <MO>=</MO>
          <Cos>
            <Phi1 />
          </Cos>
          <Times />
          <Sin>
            <Phi2 />
          </Sin>
          <MO>−</MO>
          <Sin>
            <Phi1 />
          </Sin>
          <Times />
          <Cos>
            <Phi2 />
          </Cos>
          <Times />
          <Cos>
            <>
              <Lambda2 />
              <MO>−</MO>
              <Lambda1 />
            </>
          </Cos>
        </Math>
        <br />
        <Math>
          <Alpha />
          <MO>=</MO>
          <Atan2>
            <>
              <Y />
              <MO>,</MO>
              <X />
            </>
          </Atan2>
        </Math>
      </p>
      <p>
        <Math>
          <Alpha />
        </Math>{" "}
        is the angle between the two vectors of (the sun the North Pole) and
        (the sun the given planet).
      </p>
      <p>
        The bearing{" "}
        <Math>
          <Beta />
        </Math>{" "}
        to the landmark in radians can be calculated by summing the azimuth{" "}
        <Math>
          <Alpha />
        </Math>{" "}
        with the given angle{" "}
        <Math>
          <Theta />
        </Math>{" "}
        on the landmark tag:
        <br />
        <Math>
          <Beta />
          <MO>=</MO>
          <Alpha />
          <MO>+</MO>
          <Parens>
            <>
              <Theta />
              <Times />
              <Pi />
            </>
          </Parens>
          <MO>÷</MO>
          <MN>180</MN>
        </Math>
      </p>
      <p>
        Given the following values:
        <br />
        <Math>
          <MN>1</MN>
          <MText> AU</MText>
          <MO>=</MO>
          <MN>149,597,870.7</MN>
          <MText>km</MText>
        </Math>
        <br />
        <Math>
          <MI>c</MI>
          <MO>=</MO>
          <MText>the denominator of the scale of the solar system model</MText>
        </Math>
        <br />
        <Math>
          <MI>R</MI>
          <MO>=</MO>
          <MText>the average radius of the earth;</MText>
          <Parens>
            <>
              <MN>6,371</MN>
              <MText>km</MText>
            </>
          </Parens>
        </Math>
      </p>
      <p>
        The displacement of the landmark tag along the ribbon can be used to
        calculate a distance{" "}
        <Math>
          <MI>d</MI>
        </Math>{" "}
        in kilometers:
        <br />
        <Math>
          <Dau />
          <MO>=</MO>
          <DRibbon />
          <MO>÷</MO>
          <MN>100</MN>
        </Math>
        <br />
        <Math>
          <Dkm />
          <MO>=</MO>
          <Parens>
            <>
              <Dau />
              <Times />
              <MN>149,597,870.7</MN>
            </>
          </Parens>
          <MO>÷</MO>
          <MI>c</MI>
        </Math>
      </p>
      <p>
        This can be used to calculate an{" "}
        <a
          href="https://en.wikipedia.org/wiki/Angular_distance"
          target="_blank"
          rel="noreferrer"
        >
          angular distance
        </a>{" "}
        in radians:
        <br />
        <Math>
          <Delta />
          <MO>=</MO>
          <Dkm />
          <MO>÷</MO>
          <MI>R</MI>
        </Math>
      </p>
      <p>
        It is important to note that an angular distance is conceptually
        equivalent to a latitude or longitude measurement. Conventional latitude
        is a measurement in degrees of distance from the equator and
        conventional longitude is a measurement in degrees of distance from the
        prime meridian. The abstract unit sphere can have any orientation we
        want, so as long as we can rewrite our calculations in terms of absolute
        landmarks, we can convert angular distances to coordinates.
      </p>
      <p>
        Once we have the angular distance between the sun and the landmark, we
        can use the following formulas to calculate the terminal coordinates{" "}
        <Math>
          <Parens>
            <>
              <Phi3 />
              <MO>,</MO>
              <Lambda3 />
            </>
          </Parens>
        </Math>
        :
        <br />
        <Math>
          <Phi3 />
          <MO>=</MO>
          <Asin>
            <>
              <Sin>
                <Phi1 />
              </Sin>
              <Times />
              <Cos>
                <Delta />
              </Cos>
              <MO>+</MO>
              <Cos>
                <Phi1 />
              </Cos>
              <Times />
              <Sin>
                <Delta />
              </Sin>
              <Times />
              <Cos>
                <Beta />
              </Cos>
            </>
          </Asin>
        </Math>
        <br />
        <Math>
          <Lambda3 />
          <MO>=</MO>
          <Lambda1 />
          <MO>+</MO>
          <Atan2>
            <>
              <Sin>
                <Beta />
              </Sin>
              <Times />
              <Sin>
                <Delta />
              </Sin>
              <Times />
              <Cos>
                <Phi1 />
              </Cos>
              <MO>,</MO>
              <Cos>
                <Delta />
              </Cos>
              <MO>−</MO>
              <Sin>
                <Phi1 />
              </Sin>
              <Times />
              <Sin>
                <Phi2 />
              </Sin>
            </>
          </Atan2>
        </Math>
      </p>
      <p>
        Proofs of these formulae are left as an exercise for the truly
        degenerate reader.
      </p>
    </>
  );
};

export default Solution;

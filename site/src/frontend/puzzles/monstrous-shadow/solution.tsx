import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import Spoiler from "../../components/Spoiler";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import background_overlay from "./assets/solution/The-Grand-Illusion-overlay.svg";
import background from "./assets/solution/The-Grand-Illusion-shell.svg";

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const HistoryDetails = styled.div`
  padding-left: 2em;
`;

type HistoricalNote = {
  region: string;
  when: string;
  notes: string;
  color: string;
};

const HISTORICAL_NOTES: HistoricalNote[] = [
  {
    region:
      "Bohemia and Moravia, excluding south, west, and north border regions",
    when: "1918-10-28 to 1939-03-15, 1945-04-05 to Present",
    notes:
      "Part of the First Czechoslovak Republic from the declaration of independence by the Czechoslovak National Council 1918-10-28. The exact date is a question of definitions; the provisional constitution was adopted 1918-11-13, the government and borders weren’t fully established until the constitution adopted 1920-02-29, and the Treaty of Trianon was signed 1920-06-04 (and was only effective 1921-07-26). Similarly, Germany invaded with no resistance 1939-03-15, but did not declare The Protectorate of Bohemia and Moravia until the following day. Finally, the establishment of the Third Czechoslovak Republic after WWII is a matter of definition, as the Košice Program was approved 1945-04-05, but the government did not return to Prague until 1945-05-10.",
    color: "#cc0000",
  },
  {
    region: "Trans-Olza (eastern Cieszyn Silesia)",
    when: "1918-10-28 to 1920-07-28 (disputed), 1920-07-28 to 1938-10-02, 1945-04-05 to Present",
    notes:
      "Disputed with Poland until granted to the Czechoslovak Republic by the Spa Conference 1920-07-28. Following the Munich Agreement, Poland invaded and annexed Trans-Olza 1938-10-02. Following WWII, the area was within the restored borders of the Third Czechoslovakian Republic.",
    color: "#a61c00",
  },
  {
    region: "Western Cieszyn Silesia",
    when: "1918-10-28 to 1920-07-28 (disputed)",
    notes:
      "Disputed with Poland, to whom it was ultimately granted by the Spa Conference.",
    color: "#e69138",
  },
  {
    region:
      "South, West, and North border regions of Bohemia and Moravia (The Sudetenland)",
    when: "1918-10-28 to 1938-09-30, 1945-04-05 to Present",
    notes:
      "Annexed by Germany as a result of the Munich Agreement 1938-09-30. Restored as part of the Third Czechoslovak Republic after WWII.",
    color: "#f1c232",
  },
  {
    region:
      "Slovakia, excluding southern border regions, a small portion of Spiš, and a small portion of Orava",
    when: "1918-10-28 to 1939-03-14, 1945-04-05 to 1992-12-31",
    notes:
      "Part of the First Czechoslovak Republic from the declaration of independence by the Czechoslovak National Council 1918-10-28. Declared as the Slovak Republic 1939-03-14, immediately preceding the annexation of Bohemia and Moravia. Restored as part of the Third Czechoslovak Republic after WWII and stayed part of the unified country in all its forms until its dissolution at the end of 1992, when modern Slovakia was created.",
    color: "#6aa84f",
  },
  {
    region: "14 villages in Spiš and a few villages in Orava",
    when: "1918-10-28 to 1938-11-30 (disputed)",
    notes:
      "Disputed with Poland, to whom they were ceded shortly after the Munich Agreement and First Vienna Award.",
    color: "#45818e",
  },
  {
    region: "Southern border regions of Slovakia",
    when: "1918-10-28 to 1938-11-02, 1945-04-05 to 1992-12-31",
    notes:
      "Annexed by Hungary as part of the First Vienna Award. Restored as part of the Third Czechoslovak Republic after WWII. Became part of Slovakia with the dissolution of Czechoslovakia at the end of 1992.",
    color: "#3c78d8",
  },
  {
    region: "Carpathian Ruthenia, excluding southern border regions",
    when: "1918-10-28 to 1939-03-15",
    notes:
      "Though agreed as an autonomous part of the First Czechoslovak Republic from its inception by the Philadelphia Agreement 1918-10-25, Czechoslovakian control was not established until April and the Central Russian National Council did not endorse the unification until 1919-05-08. Annexed by Hungary simultaneously with the German invasion of Bohemia and Moravia 1939-03-15. Made part of the Ukrainian Soviet Socialist Republic following the war and now part of Ukraine.",
    color: "#a64d79",
  },
  {
    region: "Southern border regions of Carpathian Ruthenia",
    when: "1918-10-28 to 1938-11-02",
    notes:
      "Annexed by Hungary as part of the First Vienna Award. Made part of the Ukrainian Soviet Socialist Republic following the war and now part of Ukraine.",
    color: "#674ea7",
  },
];

type ExtractionTableDataRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

const EXTRACTION_TABLE_DATA: ExtractionTableDataRow[] = [
  ["var(--black)", "1", "51°09′10″N 14°59′14″E", "Görlitz", "P", "P", "W", "P"],
  ["var(--black)", "2", "49°50′33″N 24°01′56″E", "Lviv", "O", "E", "A", "A"],
  ["#3c78d8", "3", "47°55′20″N 18°38′33″E", "Bíňa", "*S", "R", "*T", "L"],
  ["#cc0000", "4", "50°08′35″N 14°06′19″E", "Kladno", "*A", "*R", "*S", "*I"],
  ["var(--black)", "5", "48°12′30″N 16°22′21″E", "Vienna", "N", "A", "O", "S"],
  [
    "#f1c232",
    "6",
    "50°13′50″N 12°52′21″E",
    "Karlovy Vary",
    "*G",
    "L",
    "*N",
    "*A",
  ],
  ["var(--black)", "7", "50°26′16″N 16°39′10″E", "Kłodzko", "A", "L", "I", "D"],
  ["#6aa84f", "8", "49°17′36″N 21°16′34″E", "Bardejov", "*R", "*E", "*A", "E"],
];

// Reused by solution for Alias
export const ExtractionCell = ({ s }: { s: string }) => {
  if (s.startsWith("*")) {
    return <td className="emph">{s.slice(1)}</td>;
  } else {
    return <td>{s}</td>;
  }
};

const ExtractionTable = styled.table`
  border-collapse: collapse;
  thead tr {
    th {
      border-bottom: 1px solid var(--black);
    }
    th:nth-child(1) {
      width: 1em;
    }
    th:nth-child(2) {
      width: 200px;
      text-align: left;
    }
    th:nth-child(3) {
      width: 150px;
      text-align: left;
    }
    th:nth-child(4) {
      border-left: 1px solid var(--black);
    }
    th:nth-child(4),
    th:nth-child(5),
    th:nth-child(6),
    th:nth-child(7) {
      width: 40px;
      text-align: center;
    }
  }
  tbody tr {
    td:nth-child(1) {
      width: 1em;
    }
    td:nth-child(2) {
      width: 200px;
      text-align: left;
    }
    td:nth-child(3) {
      width: 150px;
      text-align: left;
    }
    td:nth-child(4) {
      border-left: 1px solid var(--black);
    }
    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(6),
    td:nth-child(7) {
      width: 40px;
      text-align: center;
      &.emph {
        background-color: var(--gray-300);
        font-weight: 600;
      }
    }
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        First, in the spirit of The Background Check, solvers should check the
        background of the webpage and discover in the middle of the texture an
        annotated set of circles and fiducials. The background is an SVG and,
        though not an essential step, editing it reveals this hidden content is
        in an easily isolated definition for solver convenience:
      </p>

      <LinkedImage
        src={background}
        alt="A set of 8 numbered circles and an asterisk atop a grid of fiducial markers."
      />

      <p>
        The feeders to this metapuzzle are those associated with Ferdinand’s
        time in France. This may be determined in several ways:
      </p>

      <ul>
        <li>
          Ferdinand uses the pseudonymous surname Renoir in this story. La
          Grande Illusion was directed by Jean Renoir. (The given name Camargue
          is a French region known for an eponymous breed of fighting bull, in
          the spirit of Ferdinand the Bull, and is pure flavor.)
        </li>
        <li>
          Answers in this group are eight letters long, corresponding to the
          eight numbered circles in the shell.
        </li>
        <li>
          Solvers may simply have assigned the other two groupings to
          sub-metapuzzles first.
        </li>
      </ul>

      <p>The feeders (in given order) are:</p>
      <ul>
        <li>
          <Mono>POSANGAR</Mono>
        </li>
        <li>
          <Mono>PERRALLE</Mono>
        </li>
        <li>
          <Mono>WATSONIA</Mono>
        </li>
        <li>
          <Mono>PALISADE</Mono>
        </li>
      </ul>

      <p>
        Solvers should first identify the shell graphic, which they may describe
        as resembling a map (an argument perhaps buoyed by the use of the word
        “country” in the call to action and the puzzles’ association with{" "}
        <i>Le Monde</i>). It is in fact a map of Czechia, as solvers might
        discover in a number of ways:
      </p>
      <ul>
        <li>
          Intuition that a check of the background should reveal a background{" "}
          <i>Czech (Republic)</i> [Spoiler for other puzzles]{" "}
          <Spoiler>
            or, more likely, experience that checks of the backgrounds of other
            sub-metas revealed puns on “check”.
          </Spoiler>
        </li>
        <li>
          Investigating the shape and spacing of the fiducials. If solvers
          speculate that this could be a map with fiducials indicating lattice
          points, they may directly use analysis of the grid to determine the
          scale and latitude and search for a reasonable longitude.
        </li>
        <li>
          Brute force search of a globe. Again, if solvers similarly speculate
          that this could be a map, aligning the fiducials with lattice points
          will eventually put the star over Prague.
        </li>
      </ul>

      <p>
        The facts that the fiducial lines are straight, perpendicular, not of
        unity aspect ratio, and get farther apart moving up the image indicate
        that this a cylindrical projection; specifically, it is WGS
        84/Pseudo-Mercator, the default cylindrical projection of many modern
        web-based mapping applications. The aspect ratio or spacing of the
        fiducials can then be used to determine latitude and confirm 1°
        latitudinal spacing (since vector assets are provided, this can be done
        precisely). The star lands on Prague, capital of Czechia, which
        establishes the longitudinal alignment and confirms that the fiducials
        are 1° apart longitudinally.
      </p>

      <LinkedImage
        src={background_overlay}
        alt="An OpenStreetMap map of Czechia overlaid with the background image described earlier.  The asterisk lines up with Prague."
      />
      <CenteredDiv>
        <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>
      </CenteredDiv>

      <p>
        Perhaps taking inspiration from the star, each numbered circle can be
        associated with a city. This can be done either by converting the
        coordinates of the vector art to longitude and latitude, overlaying the
        graphic on an appropriately scaled and equivalently projected map, or
        simply reading out approximate coordinates. (Solvers should exercise
        caution if using Google Maps with an overlay. When zoomed out to this
        scale, the standard Google Maps interface for desktop browsers
        transitions to a perspective projection. One option is to use
        OpenStreetMap, which uses Web Mercator at all scales.) As will become
        clear in a moment, though each circle is in fact over a fairly large
        city, the exact city does not matter, only the geographic region.
      </p>
      <p>
        Given the evocative title — a theme and arguable namesake of Renoir’s{" "}
        <i>La Grande Illusion</i> is the nature of international borders —
        solvers should look to European history and the changing borders of the
        nation of which Prague is the capital:
      </p>

      <HistoryDetails>
        {HISTORICAL_NOTES.map((note) => {
          return (
            <div key={note.region} style={{ marginBottom: "2em" }}>
              <div style={{ color: note.color }}>{note.region}</div>
              <div>
                <i>{note.when}</i>
              </div>
              <div>{note.notes}</div>
            </div>
          );
        })}
      </HistoryDetails>

      <p>
        While the above changes in some cases occurred in rapid succession
        (notably at the end of 1938), the provided January 1 dates correspond to
        four eras of at least briefly stable borders (discounting the period in
        which no such country existed):
      </p>
      <ul>
        <li>
          <strong>January 1, 1921</strong> (October 1918 to late 1938): The
          First Czechoslovak Republic after establishing administration of
          Carpathian Ruthenia in May 1919, adopting the constitution in February
          1920, and resolving the contestation of Trans-Olza in July 1920.
        </li>
        <li>
          <strong>January 1, 1939</strong> (late 1938 to March 1939): The
          short-lived Second Czechoslovak Republic, having ceded the Trans-Olza
          region to Poland, parts of Bohemia and Moravia to Germany, and parts
          of Silensia and Carpathian Ruthenia to Hungary in rapid succession
        </li>
        <li>
          <strong>January 1, 1946</strong> (April 1945 to December 1992): The
          post-war nation (here, the Third Czechoslovak Republic, though borders
          would not change for the subsequent Czechoslovak Socialist Republic
          and Czech and Slovak Federative Republic), in which the country was
          restored with pre-war borders, excepting Carpathian Ruthenia, now part
          of the Ukrainian Soviet Socialist Republic
        </li>
        <li>
          <strong>January 1, 1993</strong> (January 1993 to Present): Czechia,
          following the dissolution of Czechoslovakia, with Slovakia becoming a
          distinct country
        </li>
      </ul>

      <p>
        Having thoroughly studied 20th century European history, solvers should
        note that they have as many answers as years, each with length
        corresponding to the number of circles on the map. Associate each answer
        with a year, in the given puzzle order, and for each city extract the
        corresponding letter of the answer word if the city was at that time
        part of the country of which Prague was the capital. This yields the
        following:
      </p>

      <HScrollTableWrapper>
        <ExtractionTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Coordinates</th>
              <th>City</th>
              <th>1921</th>
              <th>1939</th>
              <th>1946</th>
              <th>1993</th>
            </tr>
          </thead>
          <tbody>
            {EXTRACTION_TABLE_DATA.map((row: ExtractionTableDataRow) => {
              const [color, idx, coords, city, col1, col2, col3, col4] = row;
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td style={{ color }}>{coords}</td>
                  <td style={{ color }}>{city}</td>
                  <ExtractionCell s={col1} />
                  <ExtractionCell s={col2} />
                  <ExtractionCell s={col3} />
                  <ExtractionCell s={col4} />
                </tr>
              );
            })}
          </tbody>
        </ExtractionTable>
      </HScrollTableWrapper>

      <p>
        The extracted letters spell <Mono>STAR SIGN AREA</Mono>, a clue for the
        answer <PuzzleAnswer>ZODIAC</PuzzleAnswer> — the belt of the sky which
        contains the astrological constellations, but also a brand of inflatable
        boat renowned for portability, on which Ferdinand made his escape.
      </p>
    </>
  );
};

export default Solution;

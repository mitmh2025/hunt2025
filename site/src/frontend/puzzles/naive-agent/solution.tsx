import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { OswaldFont } from "../../assets/SharedFonts";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper } from "../../components/StyledUI";
import img10 from "./assets/image10.png";
import img11 from "./assets/image11.png";
import img12 from "./assets/image12.png";
import img13 from "./assets/image13.png";
import img14 from "./assets/image14.png";
import img15 from "./assets/image15.png";
import img16 from "./assets/image16.png";
import img3 from "./assets/image3.png";
import img4 from "./assets/image4.png";
import img5 from "./assets/image5.png";
import img6 from "./assets/image6.png";
import img7 from "./assets/image7.png";
import img8 from "./assets/image8.png";
import img9 from "./assets/image9.png";
import {
  Grid,
  LABELS,
  GRID_CONTENT,
  SharkDown,
  SharkUp,
  SharkLeft,
  SharkRight,
} from "./puzzle";

const SOLUTION_FILL = [
  "EURNEGAKSDNEART",
  "ONOFRUOVAEROTXS",
  "IEPIBERWAINCKEL",
  "SIENCIAESTABANE",
  "INLELAPALMALBST",
  "VDAFASITALYAISO",
  "IIVIRURBOPRLLOR",
  "DANAENGTMARIMAC",
  "UGAROETLLALINKN",
  "ASTEWAYESOUTHER",
].map((s: string) => s.split(""));

const GRID_NUMBER_CONTENT: ReactNode[][] = [
  ["2", "", "", "", "", "", "", "", "13", "", "", "", "", "", ""],
  ["", "1", "", "", "12", "", "", "", "", "", "10", "", "4", "", SharkUp],
  ["", SharkDown, "", SharkRight, "", "", "", "", "11", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "5", "", "", "13", "", SharkLeft, "", "", ""],
  ["", "", "", "", SharkRight, "", "", "", "", "", "6", "", "", "", "12"],
  ["", "", "", "", "9", SharkLeft, "11", "", "", "", "", "", "", "", ""],
  ["", "", SharkUp, "", "", "", "", "9", "", "", "7", "10", SharkLeft, "8", ""],
  [
    SharkUp,
    "",
    "",
    "",
    "",
    "",
    "7",
    "",
    SharkUp,
    "8",
    SharkRight,
    "",
    "",
    "",
    "",
  ],
  ["", "", "", "", "5", "", "6", "", "", SharkRight, "", "", "", "3", ""],
  ["", "1", "", "", "", "", "2", "3", "4", "", "", "", "", SharkRight, ""],
];

const SolvedColors: string[][] = [
  [
    "#6d9eeb",
    "#6d9eeb",
    "#6d9eeb",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#ff9900",
    "#ff9900",
    "#ff9900",
    "#ff9900",
    "#ff9900",
    "#ff9900",
  ],
  [
    "#f6b26b",
    "#f6b26b",
    "#6d9eeb",
    "#8e7cc3",
    "#ff9900",
    "#ff9900",
    "#ff9900",
    "#ff9900",
    "#ff9900",
    "#ff9900",
    "#a61c00",
    "#a61c00",
    "#ffff00",
    "#ffff00",
    "#ff9900",
  ],
  [
    "#f6b26b",
    "#6d9eeb",
    "#6d9eeb",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#a61c00",
    "#a61c00",
    "#ffff00",
    "#ff9900",
  ],
  [
    "#f6b26b",
    "#6d9eeb",
    "#ffd966",
    "#ffd966",
    "#ffd966",
    "#ffd966",
    "#ffd966",
    "#8e7cc3",
    "#8e7cc3",
    "#8e7cc3",
    "#00ffff",
    "#00ffff",
    "#a61c00",
    "#ffff00",
    "#ff9900",
  ],
  [
    "#f6b26b",
    "#6d9eeb",
    "#ffd966",
    "#e06666",
    "#e06666",
    "#e06666",
    "#e06666",
    "#e06666",
    "#e06666",
    "#e06666",
    "#e06666",
    "#00ffff",
    "#a61c00",
    "#ffff00",
    "#ff9900",
  ],
  [
    "#f6b26b",
    "#6d9eeb",
    "#ffd966",
    "#e06666",
    "#93c47d",
    "#93c47d",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#a61c00",
    "#ffff00",
    "#ffff00",
  ],
  [
    "#f6b26b",
    "#6d9eeb",
    "#ffd966",
    "#e06666",
    "#e06666",
    "#93c47d",
    "#93c47d",
    "#93c47d",
    "#6fa8dc",
    "#6fa8dc",
    "#6fa8dc",
    "#a61c00",
    "#a61c00",
    "#c27ba0",
    "#ffff00",
  ],
  [
    "#f6b26b",
    "#6d9eeb",
    "#ffd966",
    "#ffd966",
    "#e06666",
    "#e06666",
    "#6fa8dc",
    "#6fa8dc",
    "#6fa8dc",
    "#c27ba0",
    "#c27ba0",
    "#c27ba0",
    "#c27ba0",
    "#c27ba0",
    "#ffff00",
  ],
  [
    "#f6b26b",
    "#6d9eeb",
    "#6d9eeb",
    "#ffd966",
    "#ffd966",
    "#e06666",
    "#e06666",
    "#6aa84f",
    "#6aa84f",
    "#6aa84f",
    "#6aa84f",
    "#6aa84f",
    "#6aa84f",
    "#6aa84f",
    "#ffff00",
  ],
  [
    "#f6b26b",
    "#f6b26b",
    "#6d9eeb",
    "#6d9eeb",
    "#6d9eeb",
    "#6d9eeb",
    "#6d9eeb",
    "#6aa84f",
    "#ffff00",
    "#ffff00",
    "#ffff00",
    "#ffff00",
    "#ffff00",
    "#ffff00",
    "#ffff00",
  ],
];

const StyledLinkedImage = styled(LinkedImage)`
  display: block;
  max-width: calc(min(800px, 100%));
`;

const SOLVE_PATH_ALT = "A partially-solved numberlink";

const Solution = (): JSX.Element => {
  return (
    <>
      <OswaldFont />
      <p>
        Solvers are presented with a grid of squares featuring city names and
        sharks. All of the cities mentioned are coastal, and the flavortext
        mentions connections being down. The aha is that these cities are
        connected via submarine cables - a common myth is that outages occur
        because sharks bite them: see e.g.{" "}
        <a href="https://arstechnica.com/tech-policy/2015/07/its-official-sharks-no-longer-a-threat-to-subsea-internet-cables/">
          https://arstechnica.com/tech-policy/2015/07/its-official-sharks-no-longer-a-threat-to-subsea-internet-cables/
        </a>
        .
      </p>
      <p>
        Information about submarine cables can be found online at{" "}
        <a href="http://www.submarinecablemap.com">www.submarinecablemap.com</a>
        .
      </p>
      <p>
        Searching for the cities in the grid should reveal that pairs of cities
        in the grid are connected. Identify those city pairs and the cables
        connecting them:
      </p>
      <ol>
        <li>Haql, Saudi Arabia to Duba, Saudi Arabia - Saudi Vision</li>
        <li>Haramous, Djibouti to Monaco, Monaco - Europe India Gateway</li>
        <li>Praia, Cape Verde to Casablanca, Morocco - EllaLink</li>
        <li>
          Alexandria, NSW, Australia to Hermosa Beach, CA, USA - Southern Cross
          NEXT
        </li>
        <li>Algiers, Algeria to Valencia, Spain - Oran-Valencia</li>
        <li>
          Los Realejos, Canary Islands, Spain to Santa Cruz de la Palma, Canary
          Islands, Spain - Tenerife-La Palma
        </li>
        <li>Punta Salinas, PR to Guantanamo Bay, Cuba - GTMO-PR</li>
        <li>Cienfuegos, Cuba to Schœlcher, Martinique - ARIMAO</li>
        <li>Rio de Janeiro, Brazil to Virginia Beach, VA, USA - BRUSA</li>
        <li>Portrane, Ireland to Southport, UK - Rockabill</li>
        <li>Bari, Italy to Durres, Albania - Italy-Albania</li>
        <li>
          Paddington, NSW, Australia to Keawaula, HI, USA - Telstra Endeavour
        </li>
        <li>Larvik, Norway to Hirtshals, Denmark - Skagenfiber West</li>
      </ol>
      <p>
        Knowing the pairs of cities, it is now possible to solve this as a
        Numberlink puzzle (each pair of cities/numbers are linked; paths cannot
        cross each other, and cannot loop back on themselves to fill a 2x2
        square. All spaces in the full grid are used.)
      </p>
      <p>
        The filled grid is shown below. An example solve including the logic is
        at the end of this solution.
      </p>

      <HScrollTableWrapper>
        <Grid
          labels={LABELS}
          fill={GRID_CONTENT}
          getAdditionalCellFillStyles={() => ({
            fontSize: "8pt",
            fontFamily: "Oswald",
            position: "unset",
          })}
          getAdditionalCellStyles={({ row, column }) => ({
            backgroundColor: SolvedColors[row]?.[column] ?? "inherit",
          })}
        />
      </HScrollTableWrapper>

      <p>
        The full name of each submarine cable is equal in length to the number
        of squares in the corresponding path, and each path has one shark
        intersecting it. The full name of each cable can be entered into the
        grid along the paths linking cities, with the direction determined by
        the orientation of the shark (the shark hat direction).
      </p>
      <p>
        <Grid
          labels={LABELS}
          fill={SOLUTION_FILL}
          getAdditionalCellFillStyles={() => ({
            fontSize: "12pt",
            position: "unset",
          })}
          getAdditionalCellStyles={({ row, column }) => ({
            backgroundColor: SolvedColors[row]?.[column] ?? "inherit",
          })}
        />
      </p>
      <p>
        Once all of the letters are placed in the grid, reading the sharkened
        letters from left to right in the grid provides the answer, DEVILS
        MARBLES.
      </p>
      <hr />
      <p>
        Acknowledgement: The numberlink grid used in this puzzle was generated
        using Thomas Ahle’s Numberlink generator, available at{" "}
        <a href="https://github.com/thomasahle/numberlink">
          https://github.com/thomasahle/numberlink
        </a>
        .
      </p>
      <hr />
      <p>Example solve for number link:</p>
      <p>
        For sake of clarity each city pair is replaced with the same number as
        per normal Number Link convention. The grid is shown below.
      </p>
      <HScrollTableWrapper>
        <Grid
          labels={LABELS}
          fill={GRID_NUMBER_CONTENT}
          getAdditionalCellFillStyles={() => ({
            fontSize: "12pt",
            position: "unset",
          })}
        />
      </HScrollTableWrapper>
      <p>
        Start by looking at the corners. The top right square must be a turn, as
        must the square down and to the left of this space. Since we cannot make
        2x2 squares, the outer link must continue down until it connects the 12
        space, and must continue left past the 10 space (or else it would
        prevent the 10s from connecting). The space one layer inside must
        connect to the 4, so we know the upper 4 terminus starts by going right
        and then down at least 1 square.
      </p>
      <p>
        In the bottom left, the bottom left corner square must be part of a
        path, so we know the lower 1 square must go to the left and then follow
        the left wall. Most likely it will continue the whole way, but this can
        be unambiguously determined later. We can also determine that just
        inside there is another path that hugs the corner just inside.
      </p>
      <p>
        In the top left, we can look at the 1 and 2 in the corner. In the top
        left 2x2, one of the two unmarked squares must be connected to the 1 and
        the other to the 2. We can rule out the option where the 2 path starts
        by going down, because if that continues and connects to the other 2
        terminus it will necessarily cut off the 1 terminals from each other.
        Hence the upper 2 terminus proceeds at least two squares to the right,
        and the 1 terminus must start by going left to the wall and then down.
        The simplest option is for it to continue and connect, but this can be
        confirmed later.
      </p>
      <p>
        In the bottom right, we can tell there is a path that proceeds on the
        outside of the 3 terminus.
      </p>
      <StyledLinkedImage src={img5} alt={SOLVE_PATH_ALT} />
      <p>
        We then look at the bottom middle section. There are a lot of terminals
        crammed together, which limit where paths can go. The 3 path must go up,
        meaning the 6 path must start by going left. The 2 path must go left at
        the start as well, so the 6 path must then turn and go up. The 2 path
        must continue another two squares to pass the 5 terminal, at which point
        we can tell it must hug the bottom left corner.
      </p>
      <StyledLinkedImage src={img12} alt={SOLVE_PATH_ALT} />
      <p>
        At this point we can see that the 1 and 2 path can’t cross. The next
        layer in from the 2 path in the bottom left corner must also follow this
        zig zag shape, and so we can see that the 5 terminal must connect,
        follow the corner, and go up. We can repeat this logic one more time and
        connect the next layer to the 6 node in the bottom middle. On the left
        side (directly left of the 9 node) we must have 4 vertical lines
        connected to the 1, 2, 5, and 6 nodes. We know that the innermost line
        (6 path) cannot turn until it’s one row above the 9 terminus. This means
        the next outer line (5 path) cannot turn until it is two rows above the
        9 terminus, and so on for the next (2 path), and the outermost (1 path).
        This fully determines the 1 path. Additionally, the 2 path must turn to
        get around the 1 terminus, so this forces the 5 and 6 paths to turn as
        well. We can finish the 2 path by observing that the space immediately
        to the right of the upper 1 terminus is either part of the 2 path
        itself, or it would be isolated. This completes the 1 and 2 paths.
      </p>
      <StyledLinkedImage src={img16} alt={SOLVE_PATH_ALT} />
      <br />
      <StyledLinkedImage src={img6} alt={SOLVE_PATH_ALT} />
      <p>
        In the upper left we can now fill in a path going around the outside of
        the upper 12 terminus.
      </p>
      <StyledLinkedImage src={img11} alt={SOLVE_PATH_ALT} />
      <p>
        In the upper right, we can follow a similar logic as in the bottom left
        corner to place a path inwards from the 4 path. Due to corner
        constraints, this must connect to the upper 10 terminus. The new corners
        then constrain another inner layer, which we can determine must connect
        to the upper 11 terminus. This provides us with three parallel vertical
        lines between the 6 and 12 terminals on the right side, which must
        continue to one row below the 6-12 row, and 2 below in the case of the
        middle path, which connects it to the lower 10 terminal and completes
        the 10 path.
      </p>
      <StyledLinkedImage src={img8} alt={SOLVE_PATH_ALT} />
      <br />
      <StyledLinkedImage src={img15} alt={SOLVE_PATH_ALT} />
      <p>
        Several spaces in the center are now highly constrained. Drawing inner
        corners or deducing the only remaining direction available for some of
        the paths/terminals gives the following:
      </p>
      <StyledLinkedImage src={img3} alt={SOLVE_PATH_ALT} />
      <p>
        As there are only two free spaces between the two ends of the 4 path and
        no room to turn on the right side due to the 3 and 8 paths, we can
        extend that path and see that it must connect directly, finishing the 4
        path. The same logic finishes the 3 and 8 paths. We can then extend a
        few of the nearby paths.
      </p>
      <StyledLinkedImage src={img10} alt={SOLVE_PATH_ALT} />
      <p>We can finish up the 7 and 9 paths.</p>
      <StyledLinkedImage src={img4} alt={SOLVE_PATH_ALT} />
      <p>
        The lower 11 terminal is now in a corner of the remaining free spaces,
        so we can see that there is no way for the 12 path to not cut off all
        options for the 11 path (with the exception of the 11 path using the
        un-numbered path up-left of the upper 12 terminal, which would cut off
        nearly every remaining path if that connected to the 11s). The
        un-numbered path to the right of the upper 11 terminal must therefore
        connect to the upper 11 terminal and not the 12 path, and the 12 path
        must continue to the left from where it is currently located.
      </p>
      <StyledLinkedImage src={img7} alt={SOLVE_PATH_ALT} />
      <br />
      <StyledLinkedImage src={img14} alt={SOLVE_PATH_ALT} />
      <p>
        The 11 path must be completed directly, meaning the 6 path must also be
        connected directly. The 13 path must not be cut off by the 12 path
        moving left, which allows it to connect to the path on the outside of
        the upper 12 terminal.
      </p>
      <StyledLinkedImage src={img13} alt={SOLVE_PATH_ALT} />
      <p>
        A final bit of logic finishes the 5 and 13 paths, and we have completed
        the number link puzzle.
      </p>
      <StyledLinkedImage src={img9} alt={SOLVE_PATH_ALT} />
    </>
  );
};

export default Solution;

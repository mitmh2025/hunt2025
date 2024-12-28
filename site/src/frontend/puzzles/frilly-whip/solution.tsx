import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { ExtractionCell } from "../monstrous-shadow/solution";
import { type Blunder, BlundersTable } from "../svelte-conductor/solution";
import { Aside } from "../unique-australia/solution";
import ferdinand_the_grand_illusion_resampled_advanced from "./assets/solution/Ferdinand-The-Grand-Illusion-resampled-advanced.png";
import ferdinand_the_grand_illusion_resampled_basic from "./assets/solution/Ferdinand-The-Grand-Illusion-resampled-basic.png";
import ferdinand_the_grand_illusion_resampled_centered from "./assets/solution/Ferdinand-The-Grand-Illusion-resampled-centered.png";
import ferdinand_the_grand_illusion_resampled_zeroed from "./assets/solution/Ferdinand-The-Grand-Illusion-resampled-zeroed.png";
import ferdinand_the_mark_resampled_advanced from "./assets/solution/Ferdinand-The-Mark-resampled-advanced.png";
import ferdinand_the_mark_resampled_basic from "./assets/solution/Ferdinand-The-Mark-resampled-basic.png";
import ferdinand_the_mark_resampled_centered from "./assets/solution/Ferdinand-The-Mark-resampled-centered.png";
import ferdinand_the_mark_resampled_zeroed from "./assets/solution/Ferdinand-The-Mark-resampled-zeroed.png";
import ferdinand_the_oversight_resampled_advanced from "./assets/solution/Ferdinand-The-Oversight-resampled-advanced.png";
import ferdinand_the_oversight_resampled_basic from "./assets/solution/Ferdinand-The-Oversight-resampled-basic.png";
import ferdinand_the_oversight_resampled_centered from "./assets/solution/Ferdinand-The-Oversight-resampled-centered.png";
import ferdinand_the_oversight_resampled_zeroed from "./assets/solution/Ferdinand-The-Oversight-resampled-zeroed.png";
import the_grand_illusion_revisited_overlay from "./assets/solution/the_grand_illusion_revisited/The-Grand-Illusion-Resolved-overlay.svg";
import the_grand_illusion_revisited_shell from "./assets/solution/the_grand_illusion_revisited/The-Grand-Illusion-Resolved-shell.svg";
import the_mark_revisited_assembly from "./assets/solution/the_mark_revisited/The-Mark-Resolved-assembly.svg";
import the_mark_revisited_shell from "./assets/solution/the_mark_revisited/The-Mark-Resolved-shell.svg";
import the_oversight_blackroot_0 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-blackroot-0.svg";
import the_oversight_blackroot_1 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-blackroot-1.svg";
import the_oversight_blackroot_2 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-blackroot-2.svg";
import the_oversight_bukhansan_0 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-bukhansan-0.svg";
import the_oversight_bukhansan_1 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-bukhansan-1.svg";
import the_oversight_bukhansan_2 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-bukhansan-2.svg";
import the_oversight_cheekbone_0 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-cheekbone-0.svg";
import the_oversight_cheekbone_1 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-cheekbone-1.svg";
import the_oversight_cheekbone_2 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-cheekbone-2.svg";
import the_oversight_skyonemix_0 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-skyonemix-0.svg";
import the_oversight_skyonemix_1 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-skyonemix-1.svg";
import the_oversight_skyonemix_2 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-skyonemix-2.svg";
import the_oversight_stakewall_0 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-stakewall-0.svg";
import the_oversight_stakewall_1 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-stakewall-1.svg";
import the_oversight_stakewall_2 from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-reflexmate-stakewall-2.svg";
import the_oversight_revisited_shell from "./assets/solution/the_oversight_revisited/The-Oversight-Resolved-shell.svg";

const ResolutionsTable = styled.table`
  margin-bottom: 2em;
  border-collapse: collapse;
  thead tr th {
    text-align: left;
    border-bottom: 1px solid var(--black);
    padding-right: 2em;
  }
  tbody tr td {
    padding-right: 2em;
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1em;
`;

const AliasedImageContainer = styled.div`
  overflow: auto;
`;

const AliasedImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <AliasedImageContainer>
      <a href={src} target="_blank" rel="noreferrer">
        <img src={src} alt={alt} />
      </a>
    </AliasedImageContainer>
  );
};

type MetaName = "The Mark" | "The Grand Illusion" | "The Oversight";
type ResolveMapping = [string, MetaName, string, MetaName, string];

const RESOLVE_MAPPING_TABLE_DATA: ResolveMapping[] = [
  [
    "MORTHOND",
    "The Mark",
    "BLACKROOT",
    "The Oversight",
    "Localized name (fictional river)",
  ],
  [
    "SAMGAKSAN",
    "The Oversight",
    "BUKHANSAN",
    "The Oversight",
    "Traditional name (mountain)",
  ],
  [
    "POSANGAR",
    "The Grand Illusion",
    "FASANQAR",
    "The Mark",
    "Alternate name (city)",
  ],
  [
    "CHIVIPANE",
    "The Mark",
    "ERVIPIAME",
    "The Grand Illusion",
    "Alternate name (people)",
  ],
  [
    "HMS ALCASTON",
    "The Mark",
    "HMAS SNIPE",
    "The Grand Illusion",
    "Name change (ship)",
  ],
  [
    "PERRALLE",
    "The Grand Illusion",
    "FAIRY TALE",
    "The Grand Illusion",
    "Localized name (song)",
  ],
  ["FLYER", "The Mark", "HANDBILL", "The Mark", "Synonymous word"],
  [
    "KENGREXAL",
    "The Oversight",
    "CANGRELOR",
    "The Grand Illusion",
    "Brand name (drug)",
  ],
  [
    "WATSONIA",
    "The Grand Illusion",
    "BUGLE LILY",
    "The Mark",
    "Common name (plant)",
  ],
  ["NIKI LAUDA", "The Oversight", "THE RAT", "The Mark", "Nickname (athlete)"],
  [
    "PALISADE",
    "The Grand Illusion",
    "STAKEWALL",
    "The Oversight",
    "Synonymous word",
  ],
  [
    "ZAKYNTHOS",
    "The Oversight",
    "ZANTE",
    "The Mark",
    "Localized name (island)",
  ],
  [
    "SKY REPLAY",
    "The Oversight",
    "SKY ONE MIX",
    "The Oversight",
    "Name change (television network)",
  ],
  [
    "JUGAL BONE",
    "The Mark",
    "CHEEKBONE",
    "The Oversight",
    "Informal term (bone)",
  ],
];

const HScrollTableWrapper = styled.div`
  position: relative;
  max-width: 100%;
  overflow-x: auto;
`;

const ResolveMappingTableElement = styled.table`
  white-space: nowrap;
  margin-bottom: 2em;
  border-collapse: collapse;
  thead tr th {
    text-align: left;
    border-bottom: 1px solid var(--black);
    padding-right: 1em;
  }
  tbody tr td {
    padding-right: 1em;
  }
`;

const ResolveMappingTable = ({ rows }: { rows: ResolveMapping[] }) => {
  return (
    <HScrollTableWrapper>
      <ResolveMappingTableElement>
        <thead>
          <tr>
            <th>Answer</th>
            <th>Assignment</th>
            <th>Aliased Answer</th>
            <th>Aliased Assignment</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const [
              answer,
              assignment,
              aliased_answer,
              aliased_assignment,
              explanation,
            ] = row;
            return (
              <tr key={answer}>
                <td>
                  <Mono>{answer}</Mono>
                </td>
                <td>{assignment}</td>
                <td>
                  <Mono>{aliased_answer}</Mono>
                </td>
                <td>{aliased_assignment}</td>
                <td>{explanation}</td>
              </tr>
            );
          })}
        </tbody>
      </ResolveMappingTableElement>
    </HScrollTableWrapper>
  );
};

const META_RESOLVE_TABLE_DATA: [string, string, string][] = [
  ["The Mark", "PANDORA", "CALL HIM"],
  ["The Grand Illusion", "ZODIAC", "SHIRLEY"],
  ["The Oversight", "NOMAD", "MAYBE"],
];

type GrandIllusionResolveExtractionTableDataRow = [
  string, // color
  string, // Coordinates
  string, // city
  string, // 1921
  string, // 1939
  string, // 1948
  string, // 1993
];

const GRAND_ILLUSION_EXTRACTION_TABLE_DATA: GrandIllusionResolveExtractionTableDataRow[] =
  [
    ["var(--black)", "48°18′21″N 14°17′11″E", "Linz", "E", "H", "F", "C"],
    ["var(--black)", "51°03′00″N 13°44′24″E", "Dresden", "R", "M", "A", "A"],
    ["#a64d79", "48°27′00″N 22°45′00″E", "Mukachevo", "*V", "A", "I", "N"],
    ["#f1c232", "49°56′17″N 17°54′16″E", "Opava", "*I", "S", "*R", "*G"],
    ["var(--black)", "50°02′01″N 22°00′17″E", "Rzeszów", "P", "S", "Y", "R"],
    ["#cc0000", "49°41′18″N 14°00′33″E", "Příbram", "*I", "*N", "*T", "*E"],
    ["var(--black)", "50°15′45″N 19°01′18″E", "Katowice", "A", "I", "A", "L"],
    ["#6aa84f", "49°13′22″N 18°44′24″E", "Žilina", "*M", "*P", "*L", "O"],
    ["#a64d79", "48°37′26″N 22°17′42″E", "Uzhhorod", "*E", "E", "E", "R"],
  ];

const GrandIllusionExtractionTable = styled.table`
  border-collapse: collapse;
  thead tr {
    th {
      border-bottom: 1px solid var(--black);
    }
    th:nth-child(1) {
      width: 200px;
      text-align: left;
    }
    th:nth-child(2) {
      width: 150px;
      text-align: left;
    }
    th:nth-child(3) {
      border-left: 1px solid var(--black);
    }
    th:nth-child(3),
    th:nth-child(4),
    th:nth-child(5),
    th:nth-child(6) {
      width: 40px;
      text-align: center;
    }
  }
  tbody tr {
    td:nth-child(1) {
      width: 200px;
      text-align: left;
    }
    td:nth-child(2) {
      width: 150px;
      text-align: left;
    }
    td:nth-child(3) {
      border-left: 1px solid var(--black);
    }
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(6) {
      width: 40px;
      text-align: center;
      &.emph {
        background-color: var(--gray-300);
        font-weight: 600;
      }
    }
  }
`;

const OVERSIGHT_REVISITED_BLUNDERS: Blunder[] = [
  {
    feeder: "BLACKROOT",
    board0: {
      image: the_oversight_blackroot_0,
      alt: "A starchess board with a white bishop at 1, black queen at 6, black pawn at 7, black king at 10, white king at 18, white rook at 25, black pawn at 30, black knight at 31, and black knight at 32.",
    },
    board1: {
      image: the_oversight_blackroot_1,
      alt: "A starchess board with a white bishop at 1, black queen at 6, black pawn at 7, black king at 10, white king at 18, white rook at 24, black pawn at 30, black knight at 31, and black knight at 32.",
    },
    board2: {
      image: the_oversight_blackroot_2,
      alt: "A starchess board with a white bishop at 1, black pawn at 7, black king at 10, black queen at 13, white king at 18, white rook at 24, black pawn at 30, black knight at 31, and black knight at 32.  Black checkmates white.",
    },
    white_move: "R24",
    black_move: "Q13",
  },
  {
    feeder: "BUKHANSAN",
    board0: {
      image: the_oversight_bukhansan_0,
      alt: "A starchess board with a white bishop at 1, black queen at 6, black pawn at 7, white king at 8, black king at 10, white knight at 25, black pawn at 30, black knight at 31, black pawn at 32, and white knight at 37.",
    },
    board1: {
      image: the_oversight_bukhansan_1,
      alt: "A starchess board with a white bishop at 1, black queen at 6, white knight at 7, white king at 8, black king at 10, black pawn at 30, black knight at 31, black pawn at 32, and white knight at 37.",
    },
    board2: {
      image: the_oversight_bukhansan_2,
      alt: "A starchess board with a black queen at 1, white knight at 7, white king at 8, black king at 10, black pawn at 30, black knight at 31, black pawn at 32, and white knight at 37.  Black checkmates white.",
    },
    white_move: "N7",
    black_move: "Q1",
  },
  {
    feeder: "STAKEWALL",
    board0: {
      image: the_oversight_stakewall_0,
      alt: "A starchess board with a black queen at 6, black pawn at 7, black king at 10, white king at 15, black pawn at 30, black knight at 31, and black pawn at 32.",
    },
    board1: {
      image: the_oversight_stakewall_1,
      alt: "A starchess board with a black queen at 6, black pawn at 7, black king at 10, white king at 20, black pawn at 30, black knight at 31, and black pawn at 32.",
    },
    board2: {
      image: the_oversight_stakewall_2,
      alt: "A starchess board with a black pawn at 7, black king at 10, white king at 20, black queen at 25, black pawn at 30, black knight at 31, and black pawn at 32.  Black checkmates white.",
    },
    white_move: "K20",
    black_move: "Q25",
  },
  {
    feeder: "SKY ONE MIX",
    board0: {
      image: the_oversight_skyonemix_0,
      alt: "A starchess board with a white king at 3, black queen at 6, black pawn at 7, black king at 10, white knight at 18, black pawn at 30, black knight at 31, and black pawn at 32.",
    },
    board1: {
      image: the_oversight_skyonemix_1,
      alt: "A starchess board with a white king at 3, black queen at 6, black pawn at 7, white knight at 8, black king at 10, black pawn at 30, black knight at 31, and black pawn at 32.",
    },
    board2: {
      image: the_oversight_skyonemix_2,
      alt: "A starchess board with a black queen at 2, white king at 3, black pawn at 7, white knight at 8, black king at 10, black pawn at 30, black knight at 31, and black pawn at 32.  Black checkmates white.",
    },
    white_move: "N8",
    black_move: "Q2",
  },
  {
    feeder: "CHEEKBONE",
    board0: {
      image: the_oversight_cheekbone_0,
      alt: "A starchess board with a black queen at 6, black pawn at 7, black king at 10, white king at 18, white bishop at 25, black pawn at 30, black knight at 31, black pawn at 32, and white knight at 35.",
    },
    board1: {
      image: the_oversight_cheekbone_1,
      alt: "A starchess board with a black queen at 6, black pawn at 7, black king at 10, white king at 18, white bishop at 19, black pawn at 30, black knight at 31, black pawn at 32, and white knight at 35.",
    },
    board2: {
      image: the_oversight_cheekbone_2,
      alt: "A starchess board with a black queen at 5, black pawn at 7, black king at 10, white king at 18, white bishop at 19, black pawn at 30, black knight at 31, black pawn at 32, and white knight at 35.  Black checkmates white.",
    },
    white_move: "B19",
    black_move: "Q5",
  },
];

const Solution = () => {
  return (
    <>
      <p>
        Please note that this solution contains spoilers for the metapuzzles{" "}
        <i>The Mark</i>, <i>The Grand Illusion</i>, and <i>The Oversight</i>.
      </p>
      <p>
        Each puzzle in <i>The Background Check</i> reveals an associated
        newspaper headline when solved. Taken together, these tell three
        stories, each presented in chronological order, of Ferdinand’s past
        exploits as a confidence man in Brazil, France, and Egypt. Each story
        corresponds to one of the three sub-metapuzzles, and these assignments
        may be recognized by patterns in answers, Ferdinand’s chosen pseudonym
        in each country, and in some cases a thematic element of the metapuzzle.
        In the three pseudonyms, the beginning is related to a bull (apparently
        the character’s convention, given his current given name Ferdinand) and
        the end is a reference to a sub-metapuzzle’s title.
      </p>

      <p>
        Solving each sub-metapuzzle requires literally checking the background
        to locate a shell graphic hidden within, which, in turn, represents a
        play on “check” as described in each sub-metapuzzle’s solution.
      </p>

      <Aside>
        <h3>A brief aside: Special thanks</h3>
        <p>
          The author would like to extend a special thanks to James Douberley
          for the concept of literally checking the background.
        </p>
      </Aside>

      <p>
        First, recognize that all three sub-metapuzzle answers are handheld
        gaming devices (confirmed by the flavor’s references to “his game” and
        “console”) with screens and, prompted by the word “resolve” in the
        flavor, determine their native resolutions.
      </p>

      <HScrollTableWrapper>
        <ResolutionsTable>
          <thead>
            <tr>
              <th>Sub-Metapuzzle</th>
              <th>Answer</th>
              <th>Device</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i>The Mark</i>
              </td>
              <td>
                <Mono>PANDORA</Mono>
              </td>
              <td>
                <a href="https://en.wikipedia.org/wiki/Pandora_(computer)">
                  OpenPandora Pandora
                </a>
              </td>
              <td>800 x 480</td>
            </tr>
            <tr>
              <td>
                <i>The Grand Illusion</i>
              </td>
              <td>
                <Mono>ZODIAC</Mono>
              </td>
              <td>
                <a href="https://en.wikipedia.org/wiki/Tapwave_Zodiac">
                  Tapwave Zodiac
                </a>
              </td>
              <td>480 x 320</td>
            </tr>
            <tr>
              <td>
                <i>The Oversight</i>
              </td>
              <td>
                <Mono>NOMAD</Mono>
              </td>
              <td>
                <a href="https://en.wikipedia.org/wiki/Genesis_Nomad">
                  Sega Nomad
                </a>
              </td>
              <td>320 x 224</td>
            </tr>
          </tbody>
        </ResolutionsTable>
      </HScrollTableWrapper>

      <p>
        These resolutions evenly divide the resolution of the provided photo of
        Ferdinand. This, in conjunction with the flavor “take him down to size,”
        suggests resizing the photo to the indicated resolutions, but doing this
        naively yields no interesting result. Following the title, as well as
        the flavor’s instruction to think like Ferdinand, the resizing must be
        performed in such a way as to permit aliasing, that is downsampling
        without an anti-aliasing filter. The most natural interpretation of this
        is sampling (also known as decimating). This can be done, for example,
        in <a href="https://www.gimp.org/">GNU Image Manipulation Program</a>{" "}
        using Scale Image with Interpolation of “None” or in Image Magick using{" "}
        <Mono>-sample</Mono> or equivalently <Mono>-resize</Mono> with{" "}
        <Mono>-filter</Mono> of “point”. Decimating to each of these resolutions
        reveals a subtle image overlaid on Ferdinand:
      </p>

      <AliasedImage
        src={ferdinand_the_mark_resampled_centered}
        alt="Aliased resampled photograph of Ferdinand, resized to 800x480 to match the OpenPandora Pandora’s resolution.  Cheques (casino chips) similar to those seen when solving The Mark are visible in the gray area at the top left."
      />
      <AliasedImage
        src={ferdinand_the_grand_illusion_resampled_centered}
        alt="Aliased resampled photograph of Ferdinand, resized to 480x320 to match the Tapwave Zodiac’s resolution.  Fiduciary markers, circles, number labels, and an asterisk similar to those seen when solving The Grand Illusion are slightly visible in the gray area at the top left."
      />
      <AliasedImage
        src={ferdinand_the_oversight_resampled_centered}
        alt="Aliased resampled photograph of Ferdinand, resized to 320x224 to match the Sega Nomad’s resolution.  A starchess board with pieces and white question marks like the one seen when solving The Oversight is faintly visible in the gray area at the top left."
      />

      <p>
        One straight-forward approach to approximately isolating the ghosted
        overlays is subtracting a properly scaled copy. This can be done
        entirely within standard image manipulation software and requires no
        signal processing knowledge, but has the consequence of also emphasizing
        edges in the original photo of Ferdinand. While it should be possible to
        interpret the above ghosted images directly, solvers are likely to find
        this or similarly straight-forward processing helpful.
      </p>
      <AliasedImage
        src={ferdinand_the_mark_resampled_basic}
        alt="A noisy grey image with four cheques faintly visible near the center, similar to those seen when solving The Mark, but with different labels on the cheques."
      />
      <AliasedImage
        src={ferdinand_the_grand_illusion_resampled_basic}
        alt="A noisy grey image with fiduciary markers, circles, number labels, and an asterisk similar to those seen when solving The Grand Illusion, but with the numbered circles in different locations."
      />
      <AliasedImage
        src={ferdinand_the_oversight_resampled_basic}
        alt="A noisy grey image with a starchess board similar to the one seen when solving The Oversight, but with pieces and question marks in different locations."
      />

      <p>
        A slightly superior but mathematically very similar approach is to apply
        a high-pass filter to the original image, isolating the high spatial
        frequency components that will alias, before decimating it to each
        resolution, but this operation may not be available in basic image
        processing tools and choosing the cutoff frequency requires some
        understanding of the underlying mathematics.
      </p>

      <Aside>
        <h3>
          A brief aside: More sophisticated processing for a clearer image
        </h3>
        <p>
          The straightforward processing above, which can be performed using any
          basic image processing tool, such as GIMP, Image Magick, or PIL,
          suffices to solve the puzzle, but some solvers may wish to investigate
          further.
        </p>
        <p>
          While most image processing tools will center their sampling points
          (as was done above), if we instead start sampling at the top left
          corner, we find the same ghosted overlay, shifted spatially.
        </p>
        <AliasedImage
          src={ferdinand_the_mark_resampled_zeroed}
          alt="Aliased resampled photograph of Ferdinand, resized to 800x480 to match the OpenPandora Pandora’s resolution.  Cheques (casino chips) similar to those seen when solving The Mark are visible in the gray area at the top left."
        />
        <AliasedImage
          src={ferdinand_the_grand_illusion_resampled_zeroed}
          alt="Aliased resampled photograph of Ferdinand, resized to 480x320 to match the Tapwave Zodiac’s resolution.  Fiduciary markers, circles, number labels, and an asterisk similar to those seen when solving The Grand Illusion are slightly visible in the gray area at the top left."
        />
        <AliasedImage
          src={ferdinand_the_oversight_resampled_zeroed}
          alt="Aliased resampled photograph of Ferdinand, resized to 320x224 to match the Sega Nomad’s resolution.  A starchess board with pieces and white question marks like the one seen when solving The Oversight is faintly visible in the gray area at the top left."
        />

        <p>
          Varying the starting position of the decimation more generally results
          in a proportionate shift of the ghosted image. Solvers may use this to
          steer the ghosted image around busier sections of Ferdinand’s photo
          for better legibility.
        </p>

        <p>
          Measuring this constant of proportionality reveals it is an integer in
          all three cases. It is therefore relatively straightforward to isolate
          and align the images from all available offsets in both axes.
          Combining them (perhaps using a library such as PIL or PIL with Numpy)
          yields quite clear results:
        </p>

        <AliasedImage
          src={ferdinand_the_mark_resampled_advanced}
          alt="Crisp greyscale picture of four cheques (casino chips) arranged in two rows and two columns.  
          Each cheque has a registration mark at the bottom.  
          The top-left cheque is valued at 13$, and has labels (clockwise from the registration mark) M, K, O, P, Z, and C.  
          The top-right cheque is valued at 21$, and has labels (clockwise from the registration mark) D, F, G, U, B, and J.
          The bottom-left check is valued at 25$, and has labels (clockwise from the registration mark) V, Q, S, R, N, and A.
          The bottom-right check is valued at 26$, and has labels (clockwise from the registration mark) L, Y, I, E, T, and H."
        />
        <AliasedImage
          src={ferdinand_the_grand_illusion_resampled_advanced}
          alt="Crisp greyscale image of a set of nine numbered circles, an asterisk, and a grid with three rows and nine columns of fiduciary markers."
        />
        <AliasedImage
          src={ferdinand_the_oversight_resampled_advanced}
          alt="Crisp greyscale image of a starchess board.  There are six black pieces and nine white question marks on the board.  The question marks are on spaces 1, 3, 8, 15, 18, 25, 28, 35, and 37 (one in each column).  The black pieces are: a queen at 6, a pawn at 7, a king at 10, a pawn at 30, a knight at 31, and a pawn at 32."
        />
        <p>
          The free parameter originates in a preference to move the contentful
          portion of the ghosted image within the frame without wrapping. In
          fact, solvers may notice the constant is always chosen as the largest
          integer that does not require wrapping the content. (Alternatively,
          this proportionality constant could have simply been set equal to the
          scaling factor at the cost of wrapping with consequent reduction in
          image readability for some choices of sampling phase.)
        </p>
        <p>
          Note also that the mixing was not designed to constitute a clean
          signal transmission. High frequency content from the original
          photograph exists in the same bands that will alias to form the
          signals, but as the carrier photograph is natural, power in this range
          is quite low. Similarly, there exists some cross-talk between the
          three signals. A small amount of carefully shaped broadband noise was
          also added to help obscure any visible high frequency structure in the
          final image.
        </p>
      </Aside>

      <p>
        It should be noted that a solver knowledgeable of signal processing
        could conceivably progress this far using, for example, spectral
        analysis of the image without using any answers from sub-metapuzzles (or
        perhaps correctly ascertained the mechanic with only a single
        sub-metapuzzle answer and searched over resolutions to extract the
        remaining two images). Such a solver might even successfully backsolve
        sub-metapuzzles from identified resolutions and the calls to action.
        This is a reasonable strategy but, as will become clear, this
        hypothetical solver must still solve the sub-metapuzzles (a task not
        rendered substantially easier even by having their answers).
      </p>

      <p>
        Solvers should recognize the extracted images as replacements for the
        shell graphics found by checking the background of each sub-metapuzzle.
        Recalling again the word “resolve” in the flavor, it is necessary to
        re-solve the three sub-metapuzzles. The flavor instructs solvers to
        “forget what [they’ve] read.” indicating that the associations between
        puzzles and sub-metapuzzles (originally grouped based on stories from
        Brazil, France, and Egypt) must also be abandoned (and indeed all
        information from the newspapers should be discarded). A naive attempt at
        this quickly fails; for instance, no other answers satisfy the
        constraints for <i>The Oversight</i> (9 letters with a K). Revisiting
        the flavor’s advice to “think like” Ferdinand, it is again necessary to
        use aliasing, this time by replacing each word with a word that may be
        used equivalently. (Solvers are likely to have already discovered this
        after researching some of the more unusual answers and frequently
        finding alternate names in reference articles.)
      </p>

      <p>
        Finally, the task is clear: Replace all answers with aliases and assign
        them to the three sub-metapuzzles in such a way that the sub-metapuzzles
        with their new shells yield valid answers. This is the core of the
        puzzle, as many of the answers have several reasonable choices of alias.
        Constraints solvers might employ include the following:
      </p>
      <ul>
        <li>
          <strong>
            <i>The Mark</i>
          </strong>
          : Starting with either the first or second character, each bigram in a
          feeder appears on the same cheque in the new shell.
        </li>
        <li>
          <strong>
            <i>The Grand Illusion</i>
          </strong>
          : Each feeder has 9 letters (the number of cities in the new shell).
        </li>
        <li>
          <strong>
            <i>The Oversight</i>
          </strong>
          : Each feeder has 9 letters, contains a K, and does not contain an R
          at indexes 1, 2, 8, or 9. When a feeder is interpreted as chess pieces
          in the new shell, a semi-reflexmate in one exists.
        </li>
      </ul>

      <p>
        Though not an essential aspect of the mechanic, all nine crossovers
        between sub-metapuzzles are represented in the mapping. All
        sub-metapuzzles also have the same number of feeders as in the original
        solves, though this is coincidental.
      </p>
      <p>
        The letter K is sufficiently uncommon in English to make{" "}
        <i>The Oversight</i> a good foothold. Filtering candidate aliases
        against <i>The Grand Illusion</i>’s length constraint is generally
        faster and easier than verifying eligibility in <i>The Mark</i>, but the
        latter is substantially more constraining. Some potential aliases may
        even meet the constraints for multiple sub-metapuzzles. Ultimately, the
        problem requires some degree of proceeding down the three solve paths to
        confirm aliases and assignments, swapping answers as necessary. The
        author’s expectation is that many teams will lock these in the order{" "}
        <i>The Oversight</i>, <i>The Grand Illusion</i>, <i>The Mark</i>, but
        the path will certainly vary from team to team, particularly if
        automated tools were built to assist with submetapuzzles or if any
        answers are missing.
      </p>
      <p>The correct mapping is:</p>

      <ResolveMappingTable rows={RESOLVE_MAPPING_TABLE_DATA} />

      <p>Re-solving the three sub-metapuzzles (see solutions below) yields:</p>

      <ResolutionsTable>
        <thead>
          <tr>
            <th>Sub-Metapuzzle</th>
            <th>Answer</th>
            <th>Re-solve Answer</th>
          </tr>
        </thead>
        <tbody>
          {META_RESOLVE_TABLE_DATA.map((row) => {
            return (
              <tr key={row[0]}>
                <td>
                  <i>{row[0]}</i>
                </td>
                <td>
                  <Mono>{row[1]}</Mono>
                </td>
                <td>
                  <Mono>{row[2]}</Mono>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ResolutionsTable>

      <p>
        In the given order, these form the final answer and instruction{" "}
        <Mono>CALL HIM SHIRLEY MAYBE</Mono>.
      </p>

      <h2>
        <i>The Mark</i> Revisited
      </h2>
      <p>
        For a complete explanation of <i>The Mark</i>, see{" "}
        <a href="/puzzles/the_mark/solution">its solution</a>.
      </p>
      <p>
        The new shell (colorized only for ease of distinguishing cheques) is:
      </p>

      <CenteredDiv>
        <div style={{ width: "600px", maxWidth: "100%" }}>
          <LinkedImage
            src={the_mark_revisited_shell}
            alt="Four cheques (casino chips).  Each cheque has a registration mark at the bottom of the chip.  The border of each cheque contains six evenly-spaced segments around the edge, each with a single letter or number.
        The top-left cheque is primarily white, valued at 13$, and its markings clockwise from the registration mark are M, K, O, P, Z, and C.
        The top-right cheque is primarily red, valued at 21$, and its markings clockwise from the registration mark are D, F, G, U, B, and J.
        The bottom-left cheque is primarily blue, valued at 25$, and its markings clockwise from the registration mark are V, Q, S, R, N, and A.
        The bottom-right cheque is primarily green, valued at 26$, and its markings clockwise from the registration mark are L, Y, I, E, T, and H."
          />
        </div>
      </CenteredDiv>

      <p>The new feeders are:</p>

      <ul>
        <li>
          <Mono>FASANQAR</Mono>
        </li>
        <li>
          <Mono>HANDBILL</Mono>
        </li>
        <li>
          <Mono>BUGLE LILY</Mono>
        </li>
        <li>
          <Mono>THE RAT</Mono>
        </li>
        <li>
          <Mono>ZANTE</Mono>
        </li>
      </ul>

      <p>
        This time, the cheques are given with all letters provided. Instead of
        using the answers to constrain the cheques as in the original puzzle,
        these fully specified cheques may be used to constrain and select among
        the potentially ambiguous synonyms.
      </p>
      <p>
        The puzzle proceeds in the same manner as before, though the assembly is
        much easier with the letter placements fully specified and most of the
        original solve-path is skipped. The assembled grid is as follows:
      </p>

      <LinkedImage
        src={the_mark_revisited_assembly}
        alt="A densely-packed hexagonal grid with seven columns of three cheques each.
          The cheques in the second, fourth, and sixth column are placed slightly higher than the ones in the first, third, fifth, and seventh columns.
          The cheques in each column, from top to bottom, are:
          blue, red, red;
          green, white, green;
          blue, blue, green;
          blue, blue, green;
          red, blue, green;
          green, green, red;
          and green, green, blue.
          The rotations of the chips allow all five feeder answers to be traced continuously across the assembled whole."
      />

      <p>
        Interpreting the column sums as ASCII yields the answer{" "}
        <PuzzleAnswer>CALL HIM</PuzzleAnswer>.
      </p>

      <h2>
        <i>The Grand Illusion</i> Revisited
      </h2>

      <p>
        For a complete explanation of <i>The Grand Illusion</i>, see{" "}
        <a href="/puzzles/the_grand_illusion/solution">its solution</a>.
      </p>

      <p>The new shell is:</p>

      <LinkedImage
        src={the_grand_illusion_revisited_shell}
        alt="A set of 9 numbered circles and an asterisk atop a grid of fiducial markers."
      />

      <p>The new feeders are, in given order:</p>
      <ul>
        <li>
          <Mono>ERVIPIAME</Mono>
        </li>
        <li>
          <Mono>HMAS SNIPE</Mono>
        </li>
        <li>
          <Mono>FAIRY TALE</Mono>
        </li>
        <li>
          <Mono>CANGRELOR</Mono>
        </li>
      </ul>

      <p>
        As can be confirmed from the location of the star and the aspect ratios
        and relative locations of the fiducials, the projection has not changed
        (though the crop is tighter). Only the cities are different and
        identifying them is potentially slightly less straightforward, as there
        is no vector graphic from which to convert coordinates.
      </p>
      <LinkedImage
        src={the_grand_illusion_revisited_overlay}
        alt="An OpenStreetMap map of Chechia overlaid with the background image described earlier.  The asterisk lines up with Prague."
      />
      <CenteredDiv>
        <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>
      </CenteredDiv>

      <p>
        As in the original, the feeder words stay in the puzzles’ given order.
        The cities and their histories are as follows (see the solution for{" "}
        <i>The Grand Illusion</i> for significance of colors):
      </p>
      <GrandIllusionExtractionTable>
        <thead>
          <tr>
            <th>Coordinates</th>
            <th>City</th>
            <th>1921</th>
            <th>1939</th>
            <th>1946</th>
            <th>1993</th>
          </tr>
        </thead>
        <tbody>
          {GRAND_ILLUSION_EXTRACTION_TABLE_DATA.map(
            (row: GrandIllusionResolveExtractionTableDataRow) => {
              const [color, coords, city, col1, col2, col3, col4] = row;
              return (
                <tr key={city}>
                  <td style={{ color }}>{coords}</td>
                  <td style={{ color }}>{city}</td>
                  <ExtractionCell s={col1} />
                  <ExtractionCell s={col2} />
                  <ExtractionCell s={col3} />
                  <ExtractionCell s={col4} />
                </tr>
              );
            },
          )}
        </tbody>
      </GrandIllusionExtractionTable>
      <p>
        The extracted letters spell <Mono>VIRGIN TEMPLE</Mono>, a clue phrase
        for <Mono>SHIRLEY</Mono>, via the alcohol-free cocktail Shirley Temple.
      </p>

      <h2>
        <i>The Oversight</i> Revisited
      </h2>
      <p>
        For a complete explanation of <i>The Oversight</i>, see{" "}
        <a href="/puzzles/the_oversight/solution">its solution</a>.
      </p>
      <p>The new shell is:</p>
      <LinkedImage
        src={the_oversight_revisited_shell}
        alt="A Starchess board composed of 37 hexagons arranged in the shape of a six-pointed star, with a black queen at position 6, black pawns at positions 7, 30, and 32, a black king at position 10, a black knight at position 31, and white question marks at positions 1, 2, 8, 15, 18, 25, 28, 35, and 37."
      />

      <p>The new feeders are, in given order:</p>

      <ul>
        <li>
          <Mono>BLACKROOT</Mono>
        </li>
        <li>
          <Mono>BUKHANSAN</Mono>
        </li>
        <li>
          <Mono>STAKEWALL</Mono>
        </li>
        <li>
          <Mono>SKY ONE MIX</Mono>
        </li>
        <li>
          <Mono>CHEEKBONE</Mono>
        </li>
      </ul>

      <p>
        As in the original, the feeder words stay in the puzzles’ given order.
        The resultant boards, white blunders, and black checkmates are as
        follows:
      </p>

      <BlundersTable blunders={OVERSIGHT_REVISITED_BLUNDERS} />

      <p>
        The spaces onto which the black pieces move spell the answer{" "}
        <Mono>MAYBE</Mono>.
      </p>
    </>
  );
};

export default Solution;

import React, { ReactNode } from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import { HellfreshGrid } from "./hellfresh/puzzle";
import Crossword, {
  reduceCoordinatesToIndices,
} from "../../components/Crossword";
import { BETTEROPRAH_LABELS } from "./betteroprah/puzzle";
import { HARDLYSAFE_LABELS } from "./hardlysafe/puzzle";
import { DRAUGHTQUEENS_LABELS } from "./draughtqueens/puzzle";

const HELLFRESH_DATA: [string, string, string, string][] = [
  ["1A", "BOOS", "1 Leg on a tar fighter", "LEGO Na[boo s]tarfighter"],
  ["4A", "RENT", "4 Eddy curs", "Eddy cur[rent]s"],
  ["7A", "APNEA", "7 Cher-sighted glasses", "Che[ap, nea]r-sighted glasses"],
  ["9A", "AGO", "9 PDAs", "P[ago]DAs"],
  ["10A", "EXTRAS", "10 Bet ate letter scans", "Beta Telet[ext ras]ter scans"],
  ["12A", "HOTWINGS", "not clued", "not clued"],
  [
    "14A",
    "ANCHORED",
    "14 Seconds of are ray the incredible sway",
    "Seconds of a rer[an Chore D]ay: the Incredibles Way",
  ],
  [
    "17A",
    "TYRANT",
    "17 Hairs from as a agonist in MLP: The Movie",
    "Hairs from a sa[tyr ant]agonist in MLP: The Movie",
  ],
  [
    "20A",
    "ODE",
    "20 Cups art is analgesic domes",
    "Cups artisanal ge[ode]sic domes",
  ],
  ["21A", "LOUTS", "21 Copies offal helter", "Copies of Fal[lout S]helter"],
  ["22A", "MODE", "22 Amp o’ Tex plosions", "Am[mo de]pot explosions"],
  [
    "23A",
    "GNAT",
    "23 Ounces political camp AI tack ads",
    "Ounces political campai[gn at]tack ads",
  ],
  ["1D", "BASH", "1 Jojo rub", "Jojo[ba sh]rub"],
  ["2D", "ONE", "2 Ounces my bags", "Ounces m[one]y bags"],
  ["3D", "SEX", "3 dashes CASSI tract", "dashes Cassi[s ex]tract"],
  ["4D", "RATIO", "4 Mase do meters", "Mase[rati o]dometers"],
  ["5D", "EARN", "5 Lin umber patterns", "Lin[ear n]umber patterns"],
  ["6D", "TOSS", "6 Ben, if rage beaks", "Ben[t oss]ifrage beaks"],
  [
    "7D",
    "PEONY",
    "7 Ounces stone pix preferably",
    "Ounces stone pi[pe, ony]x preferably",
  ],
  ["11D", "AGENT", "11 Queens in DR., our age", "queens in dr[ag ent]our age"],
  ["13D", "WHALE", "13 Nary eBalls", "Nar[whal e]yeballs"],
  [
    "14D",
    "ATOM",
    "14 Teaspoons Roma toes, diced",
    "Teaspoons Rom[a tom]atoes, diced",
  ],
  [
    "15D",
    "CRED",
    "15 logs from a wooded a own south",
    "15 logs from a wooded a[cre d]own south",
  ],
  [
    "16D",
    "DUST",
    "16 stops at promote our locations",
    "16 stops at promote[d US t]our locations",
  ],
  ["18D", "NOG", "18 of Imogen’s tech loves", "18 of Imogen’s tech[no g]loves"],
  [
    "19D",
    "TUN",
    "19 percent ambien employment",
    "19 percent ambien[t un]employment",
  ],
];

const HELLFRESH_FILL = `
BOOSRENT
APNEAAGO
SEEXTRAS
HOTWINGS
ANCHORED
TYRANTNU
ODELOUTS
MODEGNAT
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const BETTEROPRAH_FILL = `
LUCK IS A MATTER OF PREPARATION OPPORT
UNITY I BELIEVE THAT EVERY SINGLE EVEN
T IN LIFE HAPPENS IN AN TO CHOOSE LOVE
 OVER FEAR ALONE TIME IS WHEN I DISTAN
CE MYSELF FROM THE OF THE WORLD SO I C
AN HEAR MY OWN TRUE FORGIVENESS IS WHE
N YOU CAN SAY THANK YOU FOR THAT      
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const HARDLYSAFE_FILL = [
  ["SE", ..."TTS REC SMAN  ".split("")],
  ...`
OHIO ADAPTFROM 
BELLYBUTTONSTUD
SADISM SEA  WTE
CTE LAGER DWEEB
UTAH GOY NEEDST
RITES DELUCA   
ACHAEAN TRANSIT
   DROOPY LETTO
RATTAN IRE RASP
ADHOC BESTS RAM
ILE  BEE COULDA
DIVINITYDEGREES
 BELENIENT STAT
  TOOL DEC ASLS
`
    .split("\n")
    .slice(1, -1)
    .map((row) => row.split("")),
];

const HARDLYSAFE_REBUS = reduceCoordinatesToIndices(
  [
    { row: 0, col: 0 },
    { row: 0, col: 9 },
    { row: 3, col: 12 },
    { row: 13, col: 5 },
  ],
  15,
);

const HARDLYSAFE_CAMERA = reduceCoordinatesToIndices(
  [
    { row: 0, col: 10 },
    { row: 0, col: 11 },
    { row: 0, col: 12 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
    { row: 3, col: 0 },
    { row: 3, col: 13 },
    { row: 3, col: 14 },
    { row: 4, col: 0 },
    { row: 5, col: 0 },
    { row: 6, col: 0 },
    { row: 7, col: 0 },
    { row: 11, col: 5 },
    { row: 12, col: 5 },
    { row: 14, col: 5 },
  ],
  15,
);

const HARDLYSAFE_EXTRACTION = reduceCoordinatesToIndices(
  [
    { row: 3, col: 3 },
    { row: 3, col: 5 },
    { row: 3, col: 9 },
    { row: 5, col: 5 },
    { row: 9, col: 9 },
  ],
  15,
);

const DRAUGHTQUEENS_FILL = `
BUMPY REAM 
I A E I L S
TACID CHIDE
T H   O B A
EGOCENTRISM
 E  V T  F 
TEQUILASHOT
I U L   E R
MOOSE DELHI
E T S E L P
 WHET WASTE
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const DRAUGHTQUEENS_ACROSS: [string, string, string, string, string, string][] =
  [
    ["1", "Tramp beheaded spy…that’s rough", "BUMPY", "BUM + (s)PY", "", ""],
    [
      "4",
      "Cop’s right, every able man starts to read the riot act",
      "REAM",
      "Cops Right Every Able Man for CREAM, spill C, enter REAM",
      "Cream ale",
      "https://en.wikipedia.org/wiki/Cream_ale",
    ],
    ["7", "Politeness: Admitting one’s quiet", "TACIT", "TAC(I)T", "", ""],
    [
      "8",
      "Admonish herb’s victory, becoming dead",
      "CHIDE",
      "CHI(v->D)E",
      "",
      "",
    ],
    [
      "9",
      "It’s amazing, escorting me!",
      "EGOCENTRISM",
      "(ESCORTING ME)* &Lit",
      "",
      "",
    ],
    [
      "13",
      "Dip most of pen in drink and try to get a strong drink",
      "TEQUILA SHOT",
      "TE(QUIL)A + SHOT",
      "",
      "",
    ],
    [
      "17",
      "Endlessly mosey about—oh! A very large animal",
      "MOOSE",
      "MO(O)SE(y)",
      "",
      "",
    ],
    [
      "18",
      "Tell me where you can order pastrami in a city in India",
      "DELHI",
      "“DELI”",
      "",
      "",
    ],
    [
      "19",
      "Grind on west with anger",
      "WHET",
      "W + HEAT, spill A, enter WHET",
      "Wheat beer",
      "https://en.wikipedia.org/wiki/Wheat_beer",
    ],
    [
      "20",
      "Was originally too egregious to discard",
      "WASTE",
      "WAS + T + E",
      "",
      "",
    ],
  ];

const DRAUGHTQUEENS_DOWN: [string, string, string, string, string, string][] = [
  [
    "1",
    "Heart of nettle steeped in Leipzig lager is pleasantry in Potsdam",
    "BITTE",
    "BI(TT)ER, spill R, enter BITTE",
    "Bitter",
    "https://en.wikipedia.org/wiki/Bitter_(beer)",
  ],
  ["2", "Manly Padre Manny left padre out", "MACHO", "MACH((da)<)O", "", ""],
  [
    "3",
    "Initially you’ll eat, then eventually",
    "YET",
    "You’ll Eat Then",
    "",
    "",
  ],
  [
    "4",
    "Sample apricot tart and fresh cheese",
    "RICOTTA",
    "apRICOT TArt",
    "",
    "",
  ],
  [
    "5",
    "AI incorporating half-lies and second-rate excuse",
    "ALIBI",
    "A(LI(es) + B)I",
    "",
    "",
  ],
  [
    "6",
    "Buddies confused by stitching",
    "SEAM",
    "(MATES)* for STEAM, spill T, enter SEAM",
    "Steam beer",
    "https://en.wikipedia.org/wiki/Steam_beer",
  ],
  [
    "10",
    "Bottom-scratching geezers at odds? Well, I’ll be darned…",
    "GEE",
    "G(e)E(z)E(r)(s)",
    "",
    "",
  ],
  [
    "11",
    "Bungled cut-off broadcast is the worst",
    "EVILEST",
    "(TELEVIS(e))*",
    "",
    "",
  ],
  ["12", "Airport, as of now, regular", "SFO", "(a)S o(F) (n)O(w)", "", ""],
  ["13", "University back east is an experience", "TIME", "(MIT)< + E", "", ""],
  [
    "14",
    "Short rations lead to hospital, it was said",
    "QUOTH",
    "QUOT(a) + H",
    "",
    "",
  ],
  [
    "15",
    "He’s carrying fifty liters of MDMA into places of torment",
    "HELLS",
    "HE(L + L + E)S, spill E, enter HELLS",
    "Helles lager",
    "https://en.wikipedia.org/wiki/Helles",
  ],
  [
    "16",
    "Assemble pier in hollow tunnel? How useless",
    "TRIPE",
    "T(unne)(PIER)*L for TRIPEL, spill L, enter TRIPE",
    "Tripel",
    "https://en.wikipedia.org/wiki/Tripel",
  ],
  ["18", "Morning wetness expected, reportedly", "DEW", "“DUE”", "", ""],
];

const TOWNSQUARESPACE_REBUSES: [string, ReactNode][] = [
  ["C", "100 in Times New Roman (100 is C in Roman numerals)"],
  ["C", "Drawing of the sea (pronounce “C”)"],
  ["E", "mc2 (Einstein’s mass-energy equivalence equation)"],
  ["E", "Musical note E on a staff"],
  [
    "E",
    <a
      href="https://en.wikipedia.org/wiki/E_(kana)"
      target="_blank"
      rel="noreferrer"
    >
      Hiragana E
    </a>,
  ],
  [
    "F",
    <>
      Tombstone + keyboard (
      <a
        href="https://knowyourmeme.com/memes/press-f-to-pay-respects"
        target="_blank"
        rel="noreferrer"
      >
        press F to pay respects
      </a>
      )
    </>,
  ],
  [
    "F",
    "Thermometer going from 32 to 212 (freezing and boiling point in Fahrenheit)",
  ],
  ["F", "IHTFP in the style of the MIT logo, with the F censored"],
  ["H", "ASL fingerspelling shape for H"],
  [
    "H",
    "Baseball hit (H is a common shorthand for hit in baseball stats, cryptic crosswords, etc)",
  ],
  ["H", "Plan(c)k’s constant is abbreviated H"],
  ["H", "Semaphore H"],
  ["I", "India (NATO Phonetic Alphabet word for I)"],
  ["I", "Pigpen I, complete with pig"],
  ["I", "Magic eye of an eye (pronounce “I”)"],
  ["L", "Braille L"],
  [
    "L",
    "Chicago transit diagram (Chicago’s rapid transit consists primarily of elevated S-bahns called the “El”)",
  ],
  [
    "O",
    "Oscar the Grouch in front of the NATO flag (Oscar is the NATO Phonetic Alphabet word for O)",
  ],
  ["O", "Orioles logo with the “O’s” on the oriole’s hat removed"],
  ["S", "Cool S"],
  ["S", "Sulfur crystals"],
  [
    "W",
    "George W Bush (often called W or Dubya (derogatory) while he was POTUS)",
  ],
  ["W", "Compass pointing west"],
  ["W", "Two sheep (double ewe)"],
];

const TOWNSQUARESPACE_LABELS = `
         
         
         
         
         
         
         
         
         
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const TOWNSQUARESPACE_FILL = `
CSFOWHILE
LOECIFSHW
IHWLSEOCF
FWLSECHOI
SCOHFIWEL
EIHWOLCFS
HFCILSEWO
WEIFHOLSC
OLSECWFIH
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  th,
  td {
    padding: 0px 8px;
  }
  tr:nth-child(odd) {
    background-color: #bba5a3;
  }
  tr:nth-child(even) {
    background-color: #e0d6d5;
  }
  tr:nth-child(1) {
    background-color: #967470;
  }
`;

const DraughtQueensTable = styled(StyledTable)`
  table-layout: fixed;
  th:first-child {
    width: 36px;
  }
  th:nth-child(3) {
    width: 150px;
  }
  th:nth-child(4) {
    width: 300px;
  }
  th:nth-child(5) {
    width: 150px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>This puzzle has a number of discrete steps.</p>
      <ul>
        <li>
          Suddenly, teams’ radios start playing a set of 5 podcast-style ads.
        </li>
        <li>
          Each ad has a bit of flavor copy, and then directs teams to a hidden
          page on the website, which contains a minipuzzle that can be solved to
          give teams a “promo code.” These promo codes can be entered into the
          minipuzzle page, to earn 250 “MITropolisCard Rewards Points.”
        </li>
        <li>
          After solving the first minipuzzle (or after a set amount of time
          following the ads starting to play), the puzzle itself is unlocked,
          which is styled as the “MITropolisCard Rewards Portal.”
        </li>
        <li>
          On the MITropolisCard Rewards Portal, you can see how many Rewards
          Points you’ve earned (250 from each of the 5 minipuzzles).
        </li>
        <li>
          The Rewards Portal also has options for “Mystery Hunt Plus” which
          disables the ads (if you don’t want to hear them anymore), or “Mystery
          Hunt Minus” which makes the ads play constantly.
        </li>
        <li>
          The only item available in the MITropolisCard Rewards Portal is a very
          large martini, for 1,250 points. After solving all 5 minipuzzles,
          teams will have enough points to redeem for this martini, which they
          can retrieve from the Gala.
        </li>
        <li>
          Once teams have redeemed their points, the promo codes / minipuzzle
          answers on this puzzle page are displayed as scrabble tile racks, with
          the letters of the promo code as scrabble tiles, plus the flavor text
          “It looks like a few ingredients are missing from both your martini,
          and the promo codes…”
        </li>
        <li>
          The very large martini is a large martini glass full of
          banagrams/scrabble tiles. The tiles are color coded in one of five
          different colors, so they can be separated into five separate sets (by
          color). Each set of tiles can be used to spell out one word or entry
          from the minipuzzle grid, with one or two letters missing, as hinted
          by the flavor text.
        </li>
        <li>
          Finally, teams anagram the letters of the promo code, plus the missing
          letters from each minipuzzle (as hinted by the presentation of the
          minipuzzle answers on the puzzle page as scrabble tile racks). This
          gives the final cluephrase{" "}
          <Mono>WASHINGTON MOVIE MEANING CENTRAL BELIEF</Mono>, which gives the
          final answer, <PuzzleAnswer>TENET</PuzzleAnswer>.
        </li>
      </ul>
      <p>
        Below, we present the solution to each minipuzzle, the reconstructed
        word from it, and the final anagramming that leads to the cluephrase
        word.
      </p>
      <h3>HellFresh</h3>
      <h4>Podcast ad text</h4>
      <p className="puzzle-flavor">
        When you want restaurant-quality food without all the cooking and
        cleaning, look no further than Hell Fresh, the newest MITropolis meal
        delivery service. We’re sharing our recipes so you can get a taste of
        what we’re cooking up, like our Devilishly Good Bars. Print the recipe
        and bedevil your friends with these decadent bars. Just remember to
        include the secret ingredient (not included in your delivery). For a
        limited time, get 250 bonus MITropoliscard points when you go to
        two-pi-noir.agency/hellfresh and enter promo code [static] at checkout.
      </p>
      <h4>Minipuzzle</h4>
      <p>
        As clued by the podcast text, this is a Printer’s Devilry cryptic. It’s
        barred, presented as a grid (described as a “custom edges-and-pieces
        brownie pan”) set of ingredients (the crossword clues) and instructions
        (some rough instructions for how to complete the crossword). The clues
        and their solutions are:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Grid enumeration</th>
            <th>Answer</th>
            <th>Clue as presented</th>
            <th>Clue after inserting missing string</th>
          </tr>
          {HELLFRESH_DATA.map(([enumeration, answer, clue, solved], i) => (
            <tr key={i}>
              <td>{enumeration}</td>
              <td>{answer}</td>
              <td>{clue}</td>
              <td>{solved}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>Which assembles into this grid:</p>
      <HellfreshGrid fill={HELLFRESH_FILL} />
      <p>
        There is one unclued entry, <PuzzleAnswer>HOTWINGS</PuzzleAnswer>, which
        is the promo code for this minipuzzle.
      </p>
      <h4>Martini tiles</h4>
      <p>
        Solvers are given the following letters: TYRT. This spells TYRANT with a
        missing A and N.
      </p>
      <p>
        HOTWINGS + AN uniquely anagrams to form <Mono>WASHINGTON</Mono>.
      </p>
      <h3>BetterOprah</h3>
      <h4>Podcast ad text</h4>
      <p className="puzzle-flavor">
        Feeling down? In need of a pick-me-up? Here at BetterOprah, we’ve got
        you covered! With a subscription that drops the best inspirational
        quotes from your favorite TV personality, you’ll never miss another
        word! Go to two-pi-noir.agency/betteroprah and enter promo code [static]
        at checkout.
      </p>
      <h4>Minipuzzle</h4>
      <p>Solvers get the following drop quote:</p>
      <Crossword labels={BETTEROPRAH_LABELS} fill={BETTEROPRAH_FILL} />
      <p>Which consists of 4 Oprah quotes that are missing a word each:</p>
      <ul>
        <li>
          Luck is a matter of preparation <strong>meeting</strong> opportunity.
        </li>
        <li>
          I believe that every single event in life happens in an{" "}
          <strong>opportunity</strong> to choose love over fear.
        </li>
        <li>
          Alone time is when I distance myself from the <strong>voices</strong>{" "}
          of the world so I can hear my own
        </li>
        <li>
          True forgiveness is when you can say thank you for that{" "}
          <strong>experience</strong>
        </li>
      </ul>
      <p>
        The first letters of the four missing words give you the promo code
        <PuzzleAnswer>MOVE</PuzzleAnswer>.
      </p>
      <h4>Martini tiles</h4>
      <p>
        Solvers are given the following letters: EEFGNORSSV. This spells
        FORGIVENESS with a missing I.
      </p>
      <p>
        MOVE + I uniquely anagrams to form <Mono>MOVIE</Mono>.
      </p>
      <h3>HardlySafe</h3>
      <h4>Podcast ad text</h4>
      <p className="puzzle-flavor">
        MITropolis can be a dangerous place, but the latest home security
        software from HardlySafe can protect you and your family. Our latest
        camera features all-new x-ray technology that sees through walls,
        ensuring every key area of your home is captured from multiple angles by
        two different cameras. And for a limited time, get 250 bonus
        MITropolisCard Points when you go to two-pi-noir.agency/hardlysafe and
        enter promo code [static] at checkout.
      </p>
      <h4>Minipuzzle</h4>
      <p>
        This is a mostly-normal crossword, except that there are four rebus
        squares. Each of these rebus squares reads CAMERA in one direction, and
        an orientation (N, S, E, W, NE, NW, SE, SW) in the other direction.
      </p>
      <p>
        Think of each of the shaded rebus squares as a camera, pointing in the
        orientation indicated by the non-CAMERA reading of the square (for
        example, the top-left corner is a camera pointing southeast.)
      </p>
      <p>
        As indicated by the ad read, if you think of these as x-ray cameras that
        can see through walls (black squares), there are five grid spaces that
        can be “seen” by two cameras.
      </p>
      <p>
        Here’s the completed crossword, with the rebus squares shaded in dark
        gray, the camera clues shaded in light gray, and the squares that can be
        seen by two cameras shaded in yellow:
      </p>
      <Crossword
        labels={HARDLYSAFE_LABELS}
        fill={HARDLYSAFE_FILL}
        getAdditionalCellStyles={({ row, column }) => {
          const index = row * 15 + column;
          if (HARDLYSAFE_REBUS.has(index)) {
            return { backgroundColor: "#aaaaaa" };
          } else if (HARDLYSAFE_CAMERA.has(index)) {
            return { backgroundColor: "#cccccc" };
          } else if (HARDLYSAFE_EXTRACTION.has(index)) {
            return { backgroundColor: "#ffff00" };
          }
          return {};
        }}
      />
      <p>
        The squares that can be seen by two cameras give the promo code{" "}
        <PuzzleAnswer>IMAGE</PuzzleAnswer>.
      </p>
      <h4>Martini tiles</h4>
      <p>
        Solvers are given the following letters: BELEIET. This spells BELENIENT
        with two missing N’s.
      </p>
      <p>
        IMAGE + NN uniquely anagrams to form <Mono>MEANING</Mono>.
      </p>
      <h3>DraughtQueens</h3>
      <h4>Podcast ad text</h4>
      <p className="puzzle-flavor">
        At the end of a hard week of work in downtown MITropolis, when all you
        want to do is to unwind and have a couple cold ones, DraughtQueens has
        got you covered. We have six new house-brewed beers on tap, so you’re
        sure to find one you love, even if you end up spilling a drop of it. For
        a limited time only, you can get 250 bonus MITropolisCard points when
        you go to two-pi-noir.agency/draughtqueens and enter promo code [static]
        at checkout.
      </p>
      <h4>Minipuzzle</h4>
      <p>
        In this cryptic, the wordplay of six entries resolves to a style of
        beer. A letter must be removed & extracted (clued as “spilling a drop of
        beer”) from each of these wordplays for them to match the definition and
        fit in the grid. The completed grid and clue explanations follows:
      </p>
      <Crossword labels={DRAUGHTQUEENS_LABELS} fill={DRAUGHTQUEENS_FILL} />
      <p>
        <strong>Across</strong>
      </p>
      <HScrollTableWrapper>
        <DraughtQueensTable>
          <tr>
            <th />
            <th>Clue</th>
            <th>Grid entry</th>
            <th>Explanation</th>
            <th>Beer</th>
          </tr>
          {DRAUGHTQUEENS_ACROSS.map(
            ([number, clue, answer, explanation, beer, href], i) => (
              <tr key={i}>
                <td>{number}</td>
                <td>{clue}</td>
                <td>{answer}</td>
                <td>{explanation}</td>
                <td>
                  {beer && href && (
                    <a href={href} target="_blank" rel="noreferrer">
                      {beer}
                    </a>
                  )}
                </td>
              </tr>
            ),
          )}
        </DraughtQueensTable>
      </HScrollTableWrapper>
      <p>
        <strong>Down</strong>
      </p>
      <HScrollTableWrapper>
        <DraughtQueensTable>
          <tr>
            <th />
            <th>Clue</th>
            <th>Grid entry</th>
            <th>Explanation</th>
            <th>Beer</th>
          </tr>
          {DRAUGHTQUEENS_DOWN.map(
            ([number, clue, answer, explanation, beer, href], i) => (
              <tr key={i}>
                <td>{number}</td>
                <td>{clue}</td>
                <td>{answer}</td>
                <td>{explanation}</td>
                <td>
                  {beer && href && (
                    <a href={href} target="_blank" rel="noreferrer">
                      {beer}
                    </a>
                  )}
                </td>
              </tr>
            ),
          )}
        </DraughtQueensTable>
      </HScrollTableWrapper>
      <p>
        The “spilled” letters spell out <PuzzleAnswer>CARTEL</PuzzleAnswer> in
        given clue order.
      </p>
      <h4>Martini tiles</h4>
      <p>
        Solvers are given the following tiles: CEEGIMORST. These tiles can be
        used to spell EGOCENTRISM, with the N missing.
      </p>
      <p>
        CARTEL + N uniquely anagrams to form <Mono>CENTRAL</Mono>.
      </p>
      <h3>TownSquareSpace</h3>
      <h4>Podcast ad text</h4>
      <p>
        You can sell things. Hidden talents. Your time. And much more. Our
        downtown TownSquareSpace is the bulletin board for everything you need
        to sell anything. And for a limited time, when you sign up you’ll get
        250 MITropolis card points. Just go to
        two-pi-noir.agency/townsquarespace and enter promo code [static] at
        checkout.
      </p>
      <h4>Minipuzzle</h4>
      <p>
        This is a wordoku puzzle, but each starting letter is given as a rebus
        with a single-letter answer. These rebuses are as follows:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Letter</th>
            <th>Rebus</th>
          </tr>
          {TOWNSQUARESPACE_REBUSES.map(([letter, rebus], i) => (
            <tr key={i}>
              <td>{letter}</td>
              <td>{rebus}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        Starting from the given letters and solving the grid as a sudoku (with
        the nine letters corresponding to the typical sudoku 1-9) gives:
      </p>
      <Crossword
        labels={TOWNSQUARESPACE_LABELS}
        fill={TOWNSQUARESPACE_FILL}
        getAdditionalCellStyles={({ row, column }) =>
          row === column ? { backgroundColor: "#ffff00" } : {}
        }
      />
      <p>
        Reading down the diagonal (as is typical for Wordoku puzzles) gives{" "}
        <Mono>COWS FLESH</Mono>, which leads to the promo code:{" "}
        <PuzzleAnswer>BEEF</PuzzleAnswer>.
      </p>
      <h4>Martini tiles</h4>
      <p>
        Solvers are given the following letters: WHE. This spells WHILE with a
        missing L and I.
      </p>
      <p>
        BEEF + LI uniquely anagrams to form <Mono>BELIEF</Mono>.
      </p>
    </>
  );
};

export default Solution;

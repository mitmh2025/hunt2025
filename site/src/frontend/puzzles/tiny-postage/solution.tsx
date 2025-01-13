import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import Crossword, {
  reduceCoordinatesToIndices,
} from "../../components/Crossword";
import LinkedImage from "../../components/LinkedImage";
import { Math, MFrac, MI, MN, MO, MRow } from "../../components/MathML";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import actorGraph from "./assets/actor-graph.png";
import artist1 from "./assets/artist1.png";
import artist2 from "./assets/artist2.png";
import artist3 from "./assets/artist3.png";
import autopsy from "./assets/autopsy.jpg";
import blacklight from "./assets/blacklight.jpg";
import brick from "./assets/brick.jpg";
import cigarettes1 from "./assets/cigarettes1.jpg";
import cigarettes2 from "./assets/cigarettes2.jpg";
import filters from "./assets/filters.jpg";
import hex1 from "./assets/hex1.jpg";
import hex10 from "./assets/hex10.jpg";
import hex11 from "./assets/hex11.jpg";
import hex12 from "./assets/hex12.jpg";
import hex13 from "./assets/hex13.jpg";
import hex2 from "./assets/hex2.jpg";
import hex3 from "./assets/hex3.jpg";
import hex4 from "./assets/hex4.jpg";
import hex5 from "./assets/hex5.jpg";
import hex6 from "./assets/hex6.jpg";
import hex7 from "./assets/hex7.jpg";
import hex8 from "./assets/hex8.jpg";
import hex9 from "./assets/hex9.jpg";
import kakuro1 from "./assets/kakuro1.png";
import kakuro2 from "./assets/kakuro2.png";
import kakuro3 from "./assets/kakuro3.png";
import kakuro4 from "./assets/kakuro4.png";
import kakuro5 from "./assets/kakuro5.png";
import kakuro6 from "./assets/kakuro6.png";
import kakuro7 from "./assets/kakuro7.png";
import mirror from "./assets/mirror.png";
import rowsGarden from "./assets/rows-garden.jpg";
import scantron from "./assets/scantron.png";
import ship from "./assets/ship.jpg";

const SHAKESPEARE_DATA: [
  string,
  string,
  string,
  string,
  [string, string, string],
  [string, string, string],
  [string, string, string],
  [string, string, string],
][] = [
  [
    "Raine Hasskew",
    "Lodovico",
    "Othello",
    "Autumn 2014",
    ["Samantha Harper", "Deng-Tung Wang", "Amelia Smith"],
    ["Fabian", "Alonso", "Paulina"],
    ["Twelfth Night", "The Tempest", "The Winter’s Tale"],
    ["Spring 2014", "Summer 2016", "Spring 2017"],
  ],
  [
    "Phoenix Swarz",
    "Borachio",
    "Much Ado About Nothing",
    "Autumn 2023",
    ["Obinna Modilim", "Kiersten Mitzel", "Daniela Alfonso Garcia"],
    ["Friar Lawrence", "Cassius", "Phebe"],
    ["Romeo and Juliet", "Julius Caesar", "As You Like It"],
    ["Autumn 2021", "Spring 2023", "Autumn 2022"],
  ],
  [
    "Anthony Rindone",
    "Orleans",
    "Henry V",
    "Spring 2007",
    ["KR Cameron", "Sabrina Neuman", "Hanna Kuznetsov"],
    ["Aaron", "Malvolio", "Helicanus"],
    ["Titus Andronicus", "Twelfth Night", "Pericles"],
    ["Autumn 2007", "Spring 2008", "Spring 2009"],
  ],
  [
    "Johnson Huynh",
    "Soldier 2",
    "Hamlet",
    "Autumn 2017",
    ["Peter Duerst", "Nelson Niu", "Joey Noszek"],
    ["Dumaine", "Ford", "Alcibiades"],
    ["Love’s Labours Lost", "The Merry Wives of Windsor", "Timon of Athens"],
    ["Spring 2015", "Spring 2020", "Spring 2021"],
  ],
];

const BAR_CRAWL: [string, string, string, string][] = [
  ["MEDFORD", "Medford", "Deep Amber Cuts", "Amber"],
  ["TEELE", "Somerville", "Red PJ Ryan’s", "Red"],
  ["DAVIS", "Somerville", "The Tangerine Burren", "Tangerine"],
  ["PORTER", "Cambridge", "Sepia Shine Square Pub", "Sepia"],
  ["HARVARD", "Cambridge", "Grendel’s Heliotrope Den", "Heliotrope"],
  ["CENTRAL", "Cambridge", "The Aquamarine Phoenix Landing", "Aquamarine"],
  ["LAFAYETTE", "Cambridge", "Miracle of Pink Science Bar + Grill", "Pink"],
  ["KENDALL", "Cambridge", "Eggplant Theory Bar & Lounge", "Eggplant"],
];

const MIRRORS: [string, string, string][] = [
  ["IGNACIO GUZMAN", "11", "M"],
  ["ENDY LUMY", "1", "E"],
  ["MISHA", "1", "M"],
  ["AMY CHEN", "3", "Y"],
  ["SALINAS", "1", "S"],
  ["RUMEY", "4", "E"],
  ["ATUL", "4", "L"],
  ["CHEN FAMILY", "5", "F"],
];

const POEMS: [string, ReactNode, ReactNode[], ReactNode][] = [
  [
    "Abdul Lateef Jamil Poverty Action Lab",
    <>
      DEBORAH K <strong>F</strong>ITZGERALD
    </>,
    [
      "Scour PayPal! Taxonomist’s lab overemphasized mobile property.",
      "Abbreviation:",
      <>
        <strong>Efforts</strong> losing hieroglyphic congratulations do
        intensify glitch, encroaches factually quirk.
      </>,
    ],
    <>
      <u>
        Our J-PAL economists have revolutionized global poverty alleviation{" "}
        <strong>efforts</strong>—using scientific evaluations to identify which
        approaches actually work
      </u>{" "}
      best.
    </>,
  ],
  [
    "Women’s and Gender Studies",
    <>
      R<strong>U</strong>TH PERRY
    </>,
    [
      <>
        Mystery <strong>or</strong> heretical violence?
      </>,
      "Fight break! The glass, riven.",
    ],
    <>
      It’s just brain sizzling. Someone getting a PhD in{" "}
      <u>
        history <strong>or</strong> political science might take a class given
      </u>{" "}
      by an anthropologist and a 18th century literature expert. The questions
      that arise are intellectually challenging for everyone.
    </>,
  ],
  [
    "Graduate Program in Science Writing",
    <>
      ALAN <strong>L</strong>IGHTMAN
    </>,
    [
      "Hey, biblical presage score:",
      <>
        <strong>Citizens</strong> planned more, a sundry jazz day bowl!
      </>,
    ],
    <>
      For MIT to have a graduate program in writing about science for a public
      audience sends the message that we feel the public should be engaged with
      the scientific enterprise. That’s{" "}
      <u>
        a critical message—for <strong>citizens</strong> and for the country as
        a whole.
      </u>
    </>,
  ],
  [
    "Theater Arts",
    <>
      KENNETH <strong>L</strong> RORABACK
    </>,
    [
      "Yep, black sand tantalize a hispanic’s love.",
      <>
        <strong>Problems?</strong>
      </>,
      "Meter slows, see. Now do Buchanan gem spin?",
    ],
    <>
      Studying physics has enabled me to{" "}
      <u>
        step back and analyze the mechanics of <b>problems</b>. Theater shows me
        how to examine them
      </u>{" "}
      in terms of their human relevance.
    </>,
  ],
  [
    "Center for International Studies",
    <>
      RICHARD SAMU<strong>E</strong>LS
    </>,
    [
      "Free renter berates man, replies to college",
      <>
        Constructing wordsearch gone self-critical, <strong>economic</strong>{" "}
        plan emotional.
      </>,
    ],
    <>
      <u>
        The center creates and applies new knowledge—conducting research on
        political, <strong>economic</strong>, and social
      </u>{" "}
      dynamics; educating the next generation of scholars and practitioners; and
      sharing our discoveries with policymakers and the public.
    </>,
  ],
  [
    "Science, Technology, and Society",
    <>
      DAVID KAISE<strong>R</strong>
    </>,
    [
      "Confection gone, glee beheading love",
      <>
        Pinochle jerk win. Glower, <strong>human</strong>.
      </>,
    ],
    <>
      STS fosters critical{" "}
      <u>
        reflection on the embedding of technical work in our{" "}
        <strong>human</strong>
      </u>{" "}
      world.
    </>,
  ],
  [
    "Women’s and Gender Studies",
    <>
      ADRIENNE CE<strong>C</strong>ILE RICH
    </>,
    [
      "Political infection: his core swimming for man. Stay",
      <>
        Raptor thin, <strong>cultural</strong> mystery. Shit biz.
      </>,
      "Scan cracked glove revival.",
    ],
    <>
      Re-vision—the act of looking back, of seeing with fresh eyes, of entering
      an old text from a new{" "}
      <u>
        critical direction—is for women more than a chapter in{" "}
        <strong>cultural</strong> history: it is an act of survival.
      </u>
    </>,
  ],
  [
    "Security Studies Program",
    <>
      BARRY R P<strong>O</strong>SEN
    </>,
    [
      "Applause replay for when clever!",
      "We",
      <>
        Hurled <strong>needs</strong>; co-defendant invectives drawn
      </>,
    ],
    <>
      We focus on real-world issues{" "}
      <u>
        because today, more than ever, the world <strong>needs</strong>{" "}
        independent perspectives
      </u>{" "}
      on critical security issues.
    </>,
  ],
  [
    "Writing",
    <>
      J<strong>U</strong>NOT DIAZ
    </>,
    [
      <>
        Show <strong>hope</strong>, Steven, then bluffing:
      </>,
      "Sue knew woes many",
    ],
    <>
      A writer is a writer not because she writes well and easily, because she
      has amazing talent, or because everything she does is golden. A writer is
      a writer because, even when there is{" "}
      <u>
        no <strong>hope</strong>, even when nothing you do shows any sign of
        promise, you keep writing anyway.
      </u>
    </>,
  ],
  [
    "Comparative Media Studies",
    <>
      WILLIAM U<strong>R</strong>ICCHIO
    </>,
    [
      "Prudent myth: nighties expensive, divorces win curricular.",
      <>
        Sour <strong>unparalleled</strong> rendition. Shove education! Sin
        speedier, drinking.
      </>,
    ],
    <>
      Comparative Media Studies is applied humanities. We combine the world’s
      most culturally and technologically connected{" "}
      <u>
        students with MIT’s extensive resources—in particular our{" "}
        <strong>unparalleled</strong> tradition of innovation in media thinking
        and practice.
      </u>
    </>,
  ],
  [
    "Philosophy",
    <>
      RAY <strong>S</strong>TATA
    </>,
    [
      "Alluring ballyhoo man",
      <>
        <strong>Benefit</strong> some high mighty registration
      </>,
    ],
    <>
      The most{" "}
      <u>
        enduring value and <strong>benefit</strong> from my MIT education
      </u>{" "}
      turned out to be the introduction to philosophy and the history of ideas.
    </>,
  ],
  [
    "MIT International Science and Technology Inititatives",
    <>
      RAFA<strong>E</strong>L REIF
    </>,
    [
      <>
        Letter separation more gem <strong>than</strong> glue.
      </>,
      "Abhor a hurled affront.",
    ],
    <>
      At MIT, we educate our students to take on the world’s great challenges
      for the betterment of humankind. What{" "}
      <u>
        better preparation for them <strong>than</strong> to explore the world,
        confront
      </u>{" "}
      its challenges, and experience its humanity through MISTI?
    </>,
  ],
  [
    "Anthropology",
    <>
      SUSAN SI<strong>L</strong>BEY
    </>,
    [
      "Two rife dorms win sleep-",
      <>
        Free rents, <strong>anthropologists</strong> arrive a period.
      </>,
    ],
    <>
      Whether studying shamans in post-Soviet Mongolia or oceanographers
      searching for{" "}
      <u>
        new life forms in deep-sea vents, <strong>anthropologists</strong>{" "}
        describe the myriad
      </u>{" "}
      human ways of thinking, doing, and being. Their richly-documented,
      theoretically-grounded narratives reveal how the strange is familiar—
      and the familiar strange.
    </>,
  ],
  [
    "Political Science",
    <>
      DAVID A SING<strong>E</strong>R
    </>,
    [
      "Betrays planned, kneeled, besmirch you.",
      "Repress!",
      <>
        A host deported, stand <strong>vexing</strong> eschews.
      </>,
    ],
    <>
      The MIT Political Science faculty uses sophisticated qualitative and
      quantitative methods,{" "}
      <u>
        surveys, and field research to address the most important and{" "}
        <strong>vexing</strong> issues
      </u>{" "}
      facing humanity today, including economic globalization, democratic
      stability and elections, international conflict, climate change, and
      racism.
    </>,
  ],
  [
    "Global Languages",
    <>
      TIFFANY AMARIN<strong>T</strong>A
    </>,
    [
      "Spanned new diverse top-shelf gin: loath trusting",
      <>
        Land wrench squeaking vultures. Devout modal <strong>languages</strong>{" "}
        die.
      </>,
    ],
    <>
      Global Languages supplied me with the knowledge and confidence to live
      abroad, to conduct and explain research in Russian, and to immerse myself
      in both Russian- and French-speaking cultures. Without Global Languages, I
      would be on a completely different career path.
    </>,
  ],
  [
    "Linguistics",
    <>
      DAVID PESE<strong>T</strong>SKY
    </>,
    [
      "Lurking, you re-travel, see Kyshtym?",
      <>
        Chat delights small wee <strong>languages</strong>: spin, glee, swirled.
      </>,
    ],
    <>
      We are{" "}
      <u>
        working to unravel the system that unites all the{" "}
        <strong>languages</strong> in the world.
      </u>
    </>,
  ],
  [
    "History",
    <>
      ANN<strong>E</strong> MCCANTS
    </>,
    [
      <>
        Pray last, a <strong>discipline</strong>;
      </>,
      "Love mystery, Quiz love. Perplexity? Day gig.",
    ],
    <>
      Because everything has{" "}
      <u>
        a past, the <strong>discipline</strong> of History is, of necessity, a
        big
      </u>{" "}
      tent. Over this broad purview the historian’s task is to strip away the
      obscuring layers of myth that accrete with time—and to reveal instead the
      true richness of the human experience.
    </>,
  ],
  [
    "Economics",
    <>
      BEN BE<strong>R</strong>NANKE
    </>,
    [
      "Austerity: grin charge.",
      <>
        Leisure, a <strong>material</strong> retrofits love recreation thing
        numb.
      </>,
    ],
    <>
      Even the very best ideas in science or engineering do not automatically
      translate into broader economic{" "}
      <u>
        prosperity. In large measure, the <strong>material</strong> benefits of
        innovation spring
      </u>{" "}
      from complementarities between technology and economics.
    </>,
  ],
];

const SHORTHAND_TO_COLOR_DARK: Record<string, string> = {
  r: "#e06666",
  o: "#f6b26b",
  y: "#f3d979",
  g: "#a2c285",
  b: "#86a7d7",
  p: "#8b7ebe",
};

const SHORTHAND_TO_COLOR_LIGHT: Record<string, string> = {
  r: "#f4cccc",
  o: "#f5e5d0",
  y: "#faf2d0",
  g: "#dee9d5",
  b: "#d5e2f1",
  p: "#d8d3e7",
};

const TOP_COLOR = `
g  gpg b  
g  g g p  
gy gpg rrr
       r r
o  y b rrr
p   og    
rrr  g op 
r r  g  p 
rrr     p 
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const BOTTOM_COLOR = `
 yr   r yb
 rr r r rb
  r   r   
gbrgbor r 
 br b r   
 rry  rryo
   by r  r
 r br rb y
   r grb r
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const COLOR_GRID = [
  [
    "Bread Roll",
    "Runaway Pants",
    "Plymouth",
    "Dark Knight",
    "Red",
    "Last Chance",
    "Topaz",
    "Cherry",
    "Crossword Puzzle",
    "Among Us",
  ],
  [
    "Ruby Slippers",
    "Continental Drift",
    "Orange",
    "Rhinestone",
    "Wild Horses",
    "Whisper",
    "Black Beauty",
    "Professor",
    "Scarlet",
    "Animal Crossing",
  ],
  [
    "Layer Cake",
    "Eisenhower",
    "Whitesnake",
    "Northeastern",
    "Beige",
    "Gizmo",
    "Traveller",
    "Dwayne Johnson",
    "Rastafarian",
    "Scorpion",
  ],
  [
    "Pearl Harbor",
    "Cheap Thrills",
    "Free Throw",
    "Armageddon",
    "Lump Sum",
    "Lincoln",
    "Journey",
    "Opal Lee",
    "Crushed Pearl",
    "Lugnut",
  ],
  [
    "Yale",
    "Jefferson",
    "Starship",
    "Kennedy",
    "Deep Space",
    "Apricot",
    "Mad Magazine",
    "Diamond Ring",
    "Best Man",
    "Fender Washer",
  ],
  [
    "Party On",
    "Silver Train",
    "Poison Ivy",
    "Coin Toss",
    "Maroon",
    "Kidney Bean",
    "Riff Raff",
    "Neighbors",
    "Pen Pals",
    "Wilson",
  ],
  [
    "Sausage",
    "Bullet Train",
    "Emerald City",
    "Voile Curtains",
    "Ouija Board",
    "Bonehead",
    "Apple Pie",
    "Harvard",
    "Foreigner",
    "Brown Sugar",
  ],
  [
    "Nose Dive",
    "Ruby Tuesday",
    "Columbia",
    "Franklin",
    "Connection",
    "Barbecue Sauce",
    "Grape",
    "Entire Can",
    "Magenta",
    "Bookworm",
  ],
  [
    "Gobo",
    "Ash Wednesday",
    "Broken Glass",
    "Shattered",
    "Nixon",
    "Phenomenon",
    "Soul Survivor",
    "Greek Yogurt",
    "Wolverine",
    "Black Limousine",
  ],
];

const EXTRACTION_TABLE = [
  ["Logician", "M", "x"],
  ["Swimmer", "A", "3"],
  ["Coroner", "N", "4"],
  ["Bartender", "U", "x"],
  ["Police Officer", "E", "x"],
  ["Poet", "L", "6"],
  ["Actor", "O", "x"],
  ["Academic", "R", "2"],
  ["Photographer", "I", "5"],
  ["Florist", "B", "1"],
  ["Stonemason", "E", "x"],
];

const SHIPWRIGHT_LABELS = `
..............            
.      .............. ....
..... ... ......... . ....
..... .          .. . ....
..... ... .... .... . ....
.. .. ... . .. .... . ....
.. .. ... . .. .... . ....
.. .. ... . .. .... . ....
..             .... . ....
.. .. ... . ...        ...
.. ...... . .. .... . ....
.. . .... . .. .... . ....
.. . ..          .. . ....
.. . .... . .. ...... ....
.. . ......... ...... ....
         .            ....
.. . ......... ...... ....
.. . ......... .... . ....
.. . ..... ... .... ......
.           .. .... ......
.. . . ... ........ ......
.. . .            . ......
.. ... ... ..... .. ......
...... ... ..... .. ......
...        ... . .. ......
...... ... ... . .. ......
...... ....... . .. ......
............         .....
.............. .... ......
.........        .. ......
.............. .... ......
.............. ...........
..............5...........
..............4...........
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(26, " ").split(""));

const SHIPWRIGHT_FILL = `
..............EASTERNCROWN
.SIRIUS..............H....
.....S...J.........U.R....
.....A.GLOUCESTER..S.I....
.....R...S....U....S.S....
..E..M...I.E..R....C.T....
..L..Y...A.X..T....O.I....
..I..T...H.C..L....C.A....
..ZEBULONBVANCE....H.N....
..A..G...C.L...USSARGUS...
..B......H.I..B....A.S....
..E.H....A.B..E....N.Q....
..T.M..USSJUPITER..E.U....
..H.S....E.R..T......I....
..A.B.........Y......N....
MANHATTAN.NARRAGANSETT....
..G.S.........L......U....
..A.I.........D....C.S....
..L.L.....M...E....H......
.FLYINGCLOUD..N....A......
..E.S.L...I........R......
..O.K.USSPRESIDENT.L......
..N...C...N.....E..E......
......K...E.....W..S......
...SELANDIA...B.S..W......
......U...G...O.B..M......
......F.......S.O..O......
............CUTTYSARK.....
..............O....G......
.........TURBINIA..A......
..............L....N......
..............V...........
..............5...........
..............4...........
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(26, " ").split(""));

const SHIPWRIGHT_HIGHLIGHTS = reduceCoordinatesToIndices(
  [
    { row: 2, col: 19 },
    { row: 3, col: 19 },
    { row: 4, col: 19 },
    { row: 5, col: 19 },
    { row: 6, col: 19 },
    { row: 7, col: 19 },
    { row: 8, col: 19 },
    { row: 9, col: 19 },
    { row: 10, col: 19 },
    { row: 11, col: 19 },
  ],
  26,
);

const ARTIST_EXTRACTION = [
  [
    "1",
    "Model aircraft suspended from ceiling (visible from outside window)",
    "Lab on 17-1",
    "1",
    "17",
    "Q",
  ],
  ["2", "DeLorean", "3-136", "8", "3", "C"],
  [
    "3",
    "Ellen Swallow Richards plaque",
    "Lobby of 4, first floor",
    "10",
    "4",
    "D",
  ],
  ["4", "Periodic table sculpture", "18-1 lobby", "14", "18", "R"],
  ["5", "Wall mural on the fifth floor", "9-504", "2", "9", "I"],
  [
    "6",
    "Ceiling panel from the lobby between Hayden Library and Lewis Music Library",
    "14-1",
    "13",
    "14",
    "N",
  ],
  ["7", "Student Financial Services entry sign", "11-120", "9", "11", "K"],
  [
    "8",
    "Mural of aerial photo in stairwell",
    "between 9-3 and 9-4",
    "3",
    "9",
    "I",
  ],
  ["9", "“Reading Aides” display on 14-4", "14-4", "12", "14", "N"],
  ["10", "Friezes in fourth floor hallway", "7-4", "4", "7", "G"],
  ["11", "Triptych mural", "1-235", "7", "1", "A"],
  [
    "12",
    "Air Forms: A Composition of Luminated Assemblies",
    "7 stairwell (north side, multiple floors)",
    "5",
    "7",
    "G",
  ],
  ["13", "Ocean Engineering placards", "5-224", "6", "5", "E"],
];

const FlexRow = styled.div`
  display: flex;
  margin: 1em 0;
`;

const FlexWithSizedChildren = styled(FlexRow)`
  justify-content: center;
  img {
    max-width: 50%;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 1em 0;
  th:not(:last-child),
  td:not(:last-child) {
    padding-right: 8px;
  }
`;

const ColoredTd = styled.td<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  border: 1px solid black;
  text-align: center;
  vertical-align: center;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This was a physical puzzle that teams could pick up from the bar at the
        Gala. Upon request, a bartender handed over a pack of
        cigarettes—Cambridge Slims, to be specific (full of flavortext!). Inside
        the pack were 12 cigarettes—er, 12 tightly rolled minipuzzles—and some
        tissue paper packaging.
      </p>
      <FlexRow style={{ justifyContent: "center" }}>
        <LinkedImage src={cigarettes1} alt="A pack of paper mock cigarettes" />
        <LinkedImage
          src={cigarettes2}
          alt="The back of the pack of cigarettes, with some flavor text."
        />
      </FlexRow>
      <p>
        Eleven of the minipuzzles were themed around an agent in MITropolis, and
        each of these puzzles resolved to a single letter. The twelfth puzzle
        was a mini meta that gave an ordering for the final answer. The agents’
        puzzles could be solved in any order, so they follow alphabetically:
      </p>
      <h2>The Academic</h2>
      <p>
        The Academic’s questions are in order, but the answers will need to be
        unscrambled and matched to the questions. Here is how they match up,
        with the correct answers in bold:
      </p>
      <ol>
        <li>
          <div>Which student groups have offices in Walker Memorial?</div>
          <div>
            <span>A) Roadkill Buffet </span>
            <strong>B) Voo Doo Magazine </strong>
            <span>C) Dance Troupe </span>
            <strong>D) Grad Student Council </strong>
            <span>E) Tech Squares </span>
          </div>
        </li>
        <li>
          <div>
            Which businesses partner with MITAC to give students discounts?
          </div>
          <div>
            <strong>A) Chunky’s Cinema </strong>
            <span>B) Duck Tours </span>
            <strong>C) Boxaroo </strong>
            <span>D) Boda Borg </span>
            <strong>E) Isabella Stewart Gardner Museum </strong>
          </div>
        </li>
        <li>
          <div>
            Which fraternity houses have to cross a bridge to attend classes?
          </div>
          <div>
            <strong>A) Theta Xi </strong>
            <span>B) Kappa Sigma </span>
            <strong>C) Zeta Beta Tau </strong>
            <span>D) Alpha Delta Phi </span>
            <strong>E) Phi Delta Theta </strong>
          </div>
        </li>
        <li>
          In which dorms may cats be kept?
          <div>
            <span>A) Burton Conner </span>
            <strong>B) Random Hall </strong>
            <span>C) Simmons Hall </span>
            <strong>D) East Campus </strong>
            <span>E) MacGregor </span>
          </div>
        </li>
        <li>
          <div>Which have been overall themes for past Mystery Hunts?</div>
          <div>
            <span>A) Pokemon </span>
            <span>B) Jurassic Park </span>
            <span>C) Mousetrap </span>
            <span>D) Toy Story </span>
            <span>E) Around the World in 80 Days </span>
          </div>
        </li>
        <li>
          <div>Which names have team Palindrome NOT used for Mystery Hunt?</div>
          <div>
            <strong>A) Yo Aloha Hola Oy </strong>
            <span>B) El Google </span>
            <span>C) I Prefer Pi </span>
            <span>D) Not So Boston </span>
            <span>E) Snafu Fans </span>
          </div>
        </li>
        <li>
          <div>
            Which courses are NOT required to earn a Pirate Certificate at MIT?
          </div>
          <div>
            <span>A) fencing </span>
            <span>B) archery </span>
            <span>C) sailing </span>
            <span>D) pistol </span>
            <strong>E) spikeball </strong>
          </div>
        </li>
        <li>
          <div>
            What movements are acceptable during the first three laps of the MIT
            swim test?
          </div>
          <div>
            <strong>A) butterfly </strong>
            <span>B) back stroke </span>
            <strong>C) front crawl </strong>
            <span>D) drowning </span>
            <strong>E) breast stroke </strong>
          </div>
        </li>
        <li>
          <div>
            What courses can you take to fulfill your PEandW requirement at MIT?
          </div>
          <div>
            <strong>A) jazz funk </strong>
            <span>B) canoeing </span>
            <strong>C) pickleball </strong>
            <span>D) figure skating </span>
            <strong>E) SCUBA diving </strong>
          </div>
        </li>
        <li>
          <div>Which intramural sports leagues exist at MIT?</div>
          <div>
            <span>A) bowling </span>
            <strong>B) flag football </strong>
            <strong>C) dodgeball </strong>
            <strong>D) ultimate Frisbee </strong>
            <span>E) lacrosse </span>
          </div>
        </li>
        <li>
          <div>What was the theme of the 34th Ig Nobel Prize Ceremony?</div>
          <div>
            <strong>A) Murphy’s Law </strong>
            <span>B) Godwin’s Law </span>
            <span>C) Rule 34 </span>
            <span>D) Occam’s Razor </span>
            <span>E) the Bechdel Test </span>
          </div>
        </li>
        <li>
          <div>Where were Ig Nobel Face-to-Face sessions held in 2024?</div>
          <div>
            <strong>A) Tokyo </strong>
            <span>B) Berlin </span>
            <span>C) Canberra </span>
            <strong>D) Cambridge </strong>
            <span>E) Mumbai </span>
          </div>
        </li>
        <li>
          <div>
            Which topics were researched by 2024 Ig Nobel Prize winners?
          </div>
          <div>
            <strong>A) coin flips </strong>
            <strong>B) dead trout </strong>
            <strong>C) hair whorls </strong>
            <strong>D) drunk worms </strong>
            <strong>E) pigeon pilots </strong>
          </div>
        </li>
        <li>
          <div>Who (or what) keeps Ig Nobel acceptance speeches short?</div>
          <div>
            <strong>A) Miss Sweetie-Poo </strong>
            <span>B) a banana </span>
            <span>C) entropy </span>
            <span>D) paper airplanes </span>
            <span>E) guilt </span>
          </div>
        </li>
        <li>
          <div>What have hackers placed on the Small Done?</div>
          <div>
            <span>A) $10,000 bill </span>
            <span>B) a life-size cow </span>
            <strong>C) a witch’s hat </strong>
            <strong>D) Bexley hall </strong>
            <strong>E) moon landing </strong>
          </div>
        </li>
        <li>
          <div>What should ethical hackers do?</div>
          <div>
            <span>A) hack alone </span>
            <span>B) steal things </span>
            <strong>C) be safe </strong>
            <span>D) use brute force </span>
            <span>E) drink and derive </span>
          </div>
        </li>
        <li>
          <div>Where could you find barber poles on November 8, 2021?</div>
          <div>
            <strong>A) Banana Lounge </strong>
            <strong>B) The Alchemist </strong>
            <strong>C) outside 10-250 </strong>
            <strong>D) atop Kresge </strong>
            <strong>E) Transparent Horizon </strong>
          </div>
        </li>
      </ol>
      <p>
        Filling in the answers on the Scantron sheet reveals numbers when viewed
        in the direction that the sheet would be fed into the Scantron machine:
      </p>
      <LinkedImage
        src={scantron}
        alt="A green-and-white scantron sheet with filled-in dots forming numbers: 8.314"
      />
      <p>
        The next five lines of the Scantron sheet provide the units, so{" "}
        <Math>
          <MN>8.314</MN>
          <MI>J</MI>
          <MO>/</MO>
          <MI>mol</MI>
          <MO>*</MO>
          <MI>K</MI>
        </Math>{" "}
        = the molar gas constant <Mono>R</Mono>.
      </p>
      <h2>The Actor</h2>
      <p>
        As clued in the flavor text by “at this school”, “the Bard”, and
        “perform together”, solvers need to realize that this is a puzzle about
        the{" "}
        <a
          href="https://ensemble.mit.edu/shows/index.php"
          target="_blank"
          rel="noreferrer"
        >
          MIT Shakespeare Ensemble
        </a>
        . Some of the roles in the boxes are from Shakespeare plays that the
        Shakespeare Ensemble has only performed once, such as Helicanus from the
        Spring 2009 production of Pericles, and some, like Tybalt and Oberon,
        have been portrayed by multiple actors in multiple productions. Each of
        the four boxes that do not list a role represent an actor and role from
        another production in which the other three actors also appeared:
      </p>
      <LinkedImage
        src={actorGraph}
        alt="A graph representing which student actors played which Shakespeare roles"
      />
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Actor</th>
            <th>Role</th>
            <th>Play</th>
            <th>Year</th>
            <th>Links</th>
            <th>Linked Roles</th>
            <th>Linked Plays</th>
            <th>Link Years</th>
          </tr>
          {SHAKESPEARE_DATA.map(
            (
              [
                actor,
                role,
                play,
                year,
                links,
                linkedRoles,
                linkedPlays,
                linkYears,
              ],
              i,
            ) => (
              <tr key={i}>
                <td>{actor}</td>
                <td>{role}</td>
                <td>{play}</td>
                <td>{year}</td>
                <td>
                  {links.map((link, j) => (
                    <div key={j}>{link}</div>
                  ))}
                </td>
                <td>
                  {linkedRoles.map((linkedRole, j) => (
                    <div key={j}>{linkedRole}</div>
                  ))}
                </td>
                <td>
                  {linkedPlays.map((linkedPlay, j) => (
                    <div key={j}>{linkedPlay}</div>
                  ))}
                </td>
                <td>
                  {linkYears.map((linkYear, j) => (
                    <div key={j}>{linkYear}</div>
                  ))}
                </td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        Once solvers have filled in the first names of these four actors, as
        directed by the flavortext, they can read a new link: [sounds like]
        RAINE PHOENIX and ANTHONY JOHNSON. The only movie Rain Phoenix and
        Anthony Johnson have ever appeared in together is <Mono>O</Mono>, a 2001
        adaptation of Othello set in a modern high school.
      </p>
      <h3>Author’s Note</h3>
      <p>
        We had the idea to write a mini puzzle about the Shakespeare Ensemble
        since we wanted to use this Othello adaptation. It was complete
        serendipity that four Shakespeare Ensemble members of the last ~18 years
        have first names that are also the first and last names of two actors
        whose only acting credit together was that movie. Glorious.
      </p>
      <h2>The Bartender</h2>
      <p>
        These bars can be found in Cambridge, Somerville, and Medford, in
        several major squares. Each bar has a color word added to its name. Put
        the bars in square order going towards Boston (we know it isn’t a
        straight line—thanks, Massachusetts roads) and take the first letter of
        each color to spell ART SHAPE.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Square</th>
            <th>City</th>
            <th>Bar</th>
            <th>Color</th>
          </tr>
          {BAR_CRAWL.map(([square, city, bar, color], i) => (
            <tr key={i}>
              <td>{square}</td>
              <td>{city}</td>
              <td>{bar}</td>
              <td>
                <strong>{color.slice(0, 1)}</strong>
                {color.slice(1)}
              </td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        The shape of the artwork{" "}
        <a
          href="https://listart.mit.edu/art-artists/bars-color-within-squares-mit-2007"
          target="_blank"
          rel="noreferrer"
        >
          Bars of Color Within Squares
        </a>{" "}
        by Sol LeWitt in Building 6C is, of course, a <Mono>U</Mono>.
      </p>
      <h2>The Coroner</h2>
      <p>
        Solvers can examine the “tissue samples” from the cigarette box and
        recognize the math symbols as being part of The Alchemist sculpture near
        W20. Visiting the sculpture and using the locations in the autopsy to
        help locate each set (left temple, crook of right elbow, left side of
        ribcage, just to the right of the spine, and centered on the spine),
        they will find that the bullet holes in the drawings replace the symbols
        p, v, r, t and = on the sculpture.
      </p>
      <p>They can use the autopsy transcript to reveal three more symbols:</p>
      <p>
        “Bullet one extracted from left temple. <strong>Star</strong>-shaped
        entry wound.”
        <br />
        plink
        <br />
        “Bullet two located in crook of right elbow. It would have been all{" "}
        <strong>over</strong>{" "}
        for this guy already.”
        <br />
        plink
        <br />
        “Bullet three lodged in subject’s 8th rib, left side. That would have
        been bad <strong>times</strong> for sure.”
        <br />
        plink
        <br />
        “Bullet four just missed the spine, glancing off to the subject’s
        right.”
        <br />
        plink
        <br />
        “Bullet five was dead center on the spine.”
      </p>
      <LinkedImage src={autopsy} alt="p times v divided by r times t equals" />
      <p>
        In puzzle order, this makes a formula:{" "}
        <Math>
          <MFrac>
            <MRow>
              <MI>p</MI>
              <MO>*</MO>
              <MI>v</MI>
            </MRow>
            <MRow>
              <MI>r</MI>
              <MO>*</MO>
              <MI>t</MI>
            </MRow>
          </MFrac>
          <MO>=</MO>
        </Math>
        ”. Flavor confirms that solvers should use the ideal gas law,{" "}
        <Math>
          <MI>p</MI>
          <MI>V</MI>
          <MO>=</MO>
          <MI>n</MI>
          <MI>R</MI>
          <MI>T</MI>
        </Math>
        , making the answer to this minipuzzle <Mono>N</Mono>.
      </p>
      <h2>The Florist</h2>
      <p>
        This minipuzzle is a standard Rows Garden puzzle, but one flower clue of
        each color is missing. Solving the rest of the puzzle reveals that these
        three unclued six letter answers are BUMBLE, KILLER, and WORKER. The
        answer to the minipuzzle is <Mono>B</Mono>.
      </p>
      <LinkedImage src={rowsGarden} alt="A solved Rows Garden puzzle" />
      <p>
        <strong>Rows (in order)</strong>
      </p>
      <ol>
        <li>evaluating again</li>
        <li>scout achievements / defensive wall / spun</li>
        <li>Hiccup’s titular task? (2 wds) / machining away (2 wds)</li>
        <li>
          kind of brawl / group responsible for a newspaper’s Opinions (2 wds)
        </li>
        <li>
          Wilson of Pitch Perfect / fancy dog, perhaps / former Playmate Pamela
        </li>
        <li>
          summer zodiac sign / fantastic raptor? (2 wds) / most venomous fish on
          Earth
        </li>
        <li>
          plastic that moves smoothly over rugs (2 wds) / shallow diver, perhaps
        </li>
        <li>max number of people (2 wds) / authored with</li>
        <li>trip over one’s shadow / glanced at (3 wds) / drew a bead</li>
        <li>“blue” German waterway (2 wds) / the only option left (2 wds)</li>
        <li>make amends / creamy clam soup / picture puzzle type</li>
        <li>online brokerage bought by Ally Financial in 2016</li>
      </ol>
      <p>Red Flowers</p>
      <ul>
        <li>
          name yelled by Rocky (<strong>ADRIAN</strong>)
        </li>
        <li>
          hairdresser for men (<strong>BARBER</strong>)
        </li>
        <li>
          one of Santa’s reindeer (<strong>DANCER</strong>)
        </li>
        <li>
          very __, very mindful (<strong>DEMURE</strong>)
        </li>
        <li>
          white-plumed herons (<strong>EGRETS</strong>)
        </li>
        <li>
          affectionate (<strong>LOVING</strong>)
        </li>
        <li>
          less spicy (<strong>MILDER</strong>)
        </li>
        <li>
          graduate from the larval stage (<strong>PUPATE</strong>)
        </li>
        <li>
          most tender (<strong>RAWEST</strong>)
        </li>
        <li>
          strong and hearty (<strong>ROBUST</strong>)
        </li>
        <li>
          eldest Huxtable daughter (<strong>SONDRA</strong>)
        </li>
        <li>
          having high sexual potency (<strong>VIRILE</strong>)
        </li>
        <li>
          like, sooo drunk (<strong>WASTED</strong>)
        </li>
      </ul>
      <p>Yellow Flowers</p>
      <ul>
        <li>
          employer of spies (<strong>AGENCY</strong>)
        </li>
        <li>
          museum in the Dorchester Brewing Co. (<strong>BAD ART</strong>)
        </li>
        <li>
          hard, round-topped felt hat (<strong>BOWLER</strong>)
        </li>
        <li>
          historical Turkic warrior tribe (<strong>BULGAR</strong>)
        </li>
        <li>
          conveyance for eggs (<strong>CARTON</strong>)
        </li>
        <li>
          missed a free throw, perhaps (<strong>CHOKED</strong>)
        </li>
        <li>
          “Calm down!” (2 wds) (<strong>COOL IT</strong>)
        </li>
        <li>
          knock back down the ladder (<strong>DEMOTE</strong>)
        </li>
        <li>
          fervently faithful (<strong>DEVOUT</strong>)
        </li>
        <li>
          Stratocaster maker (<strong>FENDER</strong>)
        </li>
        <li>
          look-alike, often dead? (<strong>RINGER</strong>)
        </li>
        <li>
          plaster finish on a wall (<strong>STUCCO</strong>)
        </li>
        <li>
          soft and flexible (<strong>SUPPLE</strong>)
        </li>
      </ul>
      <p>Blue Flowers</p>
      <ul>
        <li>
          burrowing rodent kept as a pet (<strong>GERBIL</strong>)
        </li>
        <li>
          Peter Parker fights a green one (<strong>GOBLIN</strong>)
        </li>
        <li>
          sheltered from the elements (<strong>INDOOR</strong>)
        </li>
        <li>
          Wilhelm, for one (<strong>KAISER</strong>)
        </li>
        <li>
          gesture or movement (<strong>MOTION</strong>)
        </li>
        <li>
          cloud platform service of Delphi? (<strong>ORACLE</strong>)
        </li>
        <li>
          greatly enjoy (<strong>RELISH</strong>)
        </li>
        <li>
          uncover (<strong>REVEAL</strong>)
        </li>
        <li>
          snobs, or the noses of doggos (<strong>SNOOTS</strong>)
        </li>
      </ul>
      <h2>The Logician</h2>
      <p>
        This is a standard kakuro (though with some unchecked cells and two sums
        not provided). One logical path would be to note that several sums have
        a single set of possible combinations: 41/7 must be 2456789; 42/7 must
        be 3456789; 7/3 must be 124; 22/6 must be 123457; 35/5 must be 56789;
        6/3 must be 123; 29/7 must be 1234568; 16/2 must be 79; 11/4 must be
        1235; 34/5 must be 46789. This limits options at the places these sums
        cross:
      </p>
      <LinkedImage src={kakuro1} alt="A partially solved Kakuro puzzle" />
      <p>
        Some other crosses limit options as well. For instance, the 14/4 cannot
        contain a 9, so we can fill in the 16/2 and have only one remaining set
        of digits for the 14/4. The 8/2 in the northeast corner can accommodate
        71 or 62 but not 44, and the crossing 12/2 can accommodate 57 but not
        66. We can complete the corner and place several digits in the 14/3 and
        34/5. In the southwest, the 8/2 crossing the 22/3 and the 7/3 means that
        there must be a 6 or a 7 in the 22/3, so it must be 679, and since 18/5
        cannot contain a 9, it must be placed in the 20/5, restricting it to
        12359.
      </p>
      <LinkedImage src={kakuro2} alt="A partially solved Kakuro puzzle" />
      <p>
        The two 6/2 sums require placement of the 3 in the 18/5 at the bottom.
        Placing the 7 makes that sum 12357, and since the 5 cannot go in 9/3 or
        10/2 and the 1 cannot go in 9/3 we can complete this sum. The vertical
        18/5 must have a 4 or 5, a 6 or 7, and, due to the 13/2, something more
        than 4, so it will be 12456 and the 1, 2 and 6 can be placed. The
        vertical 14/3 is now fairly limited, and the second and third cell of
        the 41/7 must have 4 and 5 in some order, so we know they do not appear
        later in the row. The 12/4 can now only be 1236, and since a 34/6 only
        ever contains one instance of 1 or 2, which will definitely appear in
        the first cell, we can place the 3 in the 34/6 along with the 6 in the
        41/7. Since the 14/3 in the middle of the top row must be 293, we can
        also place the 1 and 2.
      </p>
      <LinkedImage src={kakuro3} alt="A partially solved Kakuro puzzle" />
      <p>
        The 27/5 in the south of the grid can only be 13689, 23589, or 23679,
        which limits the last two cells to 5 or 6 and 7 or 8. With the 5 or 6 in
        the second cell of the 29/7, we can remove those digits as options for
        the other cells in that sum, which means the 21/4 must be either 1389 or
        2379. 35/6 must include a 1, 2 or 3, so we can place that in the second
        cell. Completing the 22/3 with a 7 allows us to fill in many sums:
      </p>
      <LinkedImage src={kakuro4} alt="A partially solved Kakuro puzzle" />
      <p>
        The 7, 8 and 9 in the 35/5 are the only options for the second, third
        and fifth cells, so we can fill in the 6 and 5. There is only one option
        remaining for the 35/6 sum, 146789, and the 27/5 must be 23589, allowing
        us to fill in more cells.
      </p>
      <LinkedImage src={kakuro5} alt="A partially solved Kakuro puzzle" />
      <p>
        The 21/4 must be 1389. Filling this sum in also lets us complete the
        11/5, 22/6, and the second unclued /3. The 7 and 9 in the 41/7 are now
        set as well, revealing that the 31/5 is 34789.
      </p>
      <LinkedImage src={kakuro6} alt="A solved Kakuro puzzle" />
      <p>
        Once teams solve the kakuro, they use the highlighted cells to “deduce
        where to go from here”: 35-213, where they find the following image:
      </p>
      <LinkedImage src={kakuro7} alt="An empty Kakuro grid" />
      <p>
        Returning to their solved grid, they can see that the highlighted cells
        give 13, which means this minipuzzle solves to <Mono>M</Mono>.
      </p>
      <h2>The Photographer</h2>
      <p>
        This minipuzzle uses the mirror art outside the Edgerton Lab in 4-409.
        The image on the front of the puzzle of the iconic Edgerton water
        droplet art and the reference to flashes will lead solvers to the strobe
        lab, where they will find an art display with many hexagonal mirror
        tiles in a grid:
      </p>
      <LinkedImage
        src={mirror}
        alt="An art installation consisting of many hexagonal mirror tiles in a grid. A path through the grid is annotated on top of the mirror in red."
      />
      <p>
        The path starts at the blank tile near the center (which reflects the
        solver’s self, uninterrupted by any drawing or writing!)
      </p>
      <p>
        Go northwest towards the triangle and stop on the tile with the thought
        bubble that says “Hello! Hola!”: <Mono>IGNACIO GUZMAN</Mono>. Continue
        northwest until you reach the tile with two cubes:{" "}
        <Mono>ENDY LUMY</Mono>. Go two tiles south and turn southeast, passing
        tiles with a cat, a fish, a duck, and a buffalo, landing on the tile
        with the ourobouros (which, if you look closely, has a cat face):{" "}
        <Mono>MISHA</Mono>. Continue southeast to the elephant, turn left to the
        northeast, and stop at the tarantula: <Mono>AMY CHEN</Mono>. Go north
        towards the two mahjong tiles, then turn to the northeast and go until
        you reach the butterfly: <Mono>SALINAS</Mono>. Take one step south to
        Snoopy and Woodstock: <Mono>RUMEY</Mono>. Go southwest towards the
        lightbulb and turn right to the northwest on the tile immediately after
        the one with the goalposts and football; continue past the alpaca (or
        llamacat) and stop on the cat: <Mono>ATUL</Mono>. Hop one tile northwest
        to the bunny and Singapore flag, then move one tile northeast to the
        star of David; take a sharp left to the northwest and pass by the bird,
        the paper crane, and two butterflies, then stop at the tile with the
        graduation cap: <Mono>CHEN FAMILY</Mono>.
      </p>
      <FlexWithSizedChildren style={{ flexWrap: "wrap" }}>
        <img src={hex1} alt="A hexagonal mirror with a triangle drawn on it" />
        <img
          src={hex2}
          alt="A hexagonal mirror with the thoughts of Ignacio Guzman, stick figure, drawn on it"
        />
        <img
          src={hex3}
          alt="A hexagonal mirror with Endy Lumy written on it. Below that are two cubes and a semicircle, making a face"
        />
        <img src={hex4} alt="A wider view of the hexagonal mirror art" />
        <img
          src={hex5}
          alt="A hexagonal mirror with an elephant drawn on it. Below the elephant is written MIT!"
        />
        <img
          src={hex6}
          alt="A hexagonal mirror with a tarantula drawn on it. The drawing is signed Amy Chen"
        />
        <img
          src={hex7}
          alt="A hexagonal mirror with mahjong tiles drawn on it"
        />
        <img
          src={hex8}
          alt="A hexagonal mirror with Snoopy and Woodstock drawn on it"
        />
        <img src={hex9} alt="A wider view of the hexagonal mirror art" />
        <img src={hex10} alt="A wider view of the hexagonal mirror art" />
        <img src={hex11} alt="A wider view of the hexagonal mirror art" />
        <img
          src={hex12}
          alt="A hexagonal mirror with Chen Family Graduation 2024 drawn on it"
        />
        <img
          src={hex13}
          alt="A hexagonal mirror with an eye and the words LOOK TO HEAVEN drawn on it"
        />
      </FlexWithSizedChildren>
      <p>
        Index into the name on each tile by the number of stars below the
        instruction to get the clue phrase, ME MYSELF, and perhaps notice that
        the tile with an eye is in line of sight (once you “step back” off the
        Chen Family Graduation tile to the two butterflies) to get the answer,{" "}
        <Mono>I</Mono>.
      </p>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th># of stars</th>
          <th>Letter</th>
        </tr>
        {MIRRORS.map(([name, stars, letter], i) => (
          <tr key={i}>
            <td>{name}</td>
            <td>{stars}</td>
            <td>{letter}</td>
          </tr>
        ))}
      </StyledTable>
      <h3>Author’s Note</h3>
      <p>
        One of the tiles we use (Atul’s cat!) was actually made by a member of
        Death and Mayhem, though not an author of this puzzle.
      </p>
      <h2>The Police Officer</h2>
      <p>
        Solvers familiar with campus may recognize the silhouette of the Sean
        Collier memorial near the Stata Center. Others may need the additional
        hint of the title. Visiting the memorial will reveal that the bricks
        under the memorial have been inset with stainless steel studs. As
        originally installed, these studs spell out Sean Collier’s badge number,
        179, in Braille. Read the studs on the indicated brick in the puzzle’s
        orientation (which is 90° off from the installation) to get{" "}
        <Mono>E</Mono>.
      </p>
      <LinkedImage
        src={brick}
        alt="A concrete brick with studs in it reading E in Braille"
      />
      <h2>The Poet</h2>
      <p>
        The hallway leading from Building 2 to Building 14 is host to a series
        of displays about majors in HASS subjects at MIT. (Nyan Cat flies above
        the displays!) Most displays have a quote at the bottom from a faculty
        member or a student. The Poet’s lines rhyme word by word with sections
        of the quotes, except for one word, which matches exactly.
      </p>
      <p>
        The Poet’s lines also have the same number of words as there are letters
        in the original speaker’s name. Index into the speaker’s name by
        position of the matching word to get a letter. Taken in order, these
        spell <Mono>FULLER COURSE LETTER</Mono>. Mary C. Fuller is quoted on the
        Literature display, or course 21<Mono>L</Mono>.
      </p>
      <p>
        Two other displays in the exhibit are not used—the welcome placard, and
        one where the quote is shorter than the person’s name.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Placard</th>
            <th>Person quoted</th>
            <th>Poem</th>
            <th>Full original quote; matching portion underlined</th>
          </tr>
          {POEMS.map(([placard, person, poem, quote], i) => (
            <tr key={i}>
              <td>{placard}</td>
              <td>{person}</td>
              <td>
                {poem.map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </td>
              <td>{quote}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <h2>The Stonemason</h2>
      <p>
        For this minipuzzle, solvers use the logic for what to carve to mark off
        squares in the grid. Marked off squares spell <Mono>LOBBY 7</Mono>.
        Here’s a visualization of which rules caused what effect.
      </p>
      <StyledTable>
        {COLOR_GRID.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              let color = "transparent";
              const shorthand = TOP_COLOR[i]?.[j];
              if (shorthand) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- hard-coded array
                color = SHORTHAND_TO_COLOR_DARK[shorthand]!;
              }
              return (
                <ColoredTd $color={color} key={j}>
                  {cell}
                </ColoredTd>
              );
            })}
          </tr>
        ))}
      </StyledTable>
      <StyledTable>
        {COLOR_GRID.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              let color = "transparent";
              const shorthand = BOTTOM_COLOR[i]?.[j];
              if (shorthand) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- hard-coded array
                color = SHORTHAND_TO_COLOR_LIGHT[shorthand]!;
              }
              return (
                <ColoredTd $color={color} key={j}>
                  {cell}
                </ColoredTd>
              );
            })}
          </tr>
        ))}
      </StyledTable>
      <p>
        If solvers visit Lobby 7 and look around, they may notice something else
        done by a stonemason: the inscription around the top of Lobby 7.
      </p>
      <p>
        <Mono>
          ESTABLISHED FOR ADVANCEMENT AND DEVELOPMENT OF SCIENCE ITS APPLICATION
          TO INDUSTRY THE ARTS AGRICULTURE AND COMMERCE CHARTER MDCCCLXI
        </Mono>
      </p>
      <p>
        Comparing this text to the nonsensical sentence at the bottom of the
        minipuzzle, they may notice that the inscription and the puzzle sentence
        are exactly the same length, and in fact all the word lengths also
        match.
      </p>
      <p>
        <Mono>
          ELASTICIZER HAD BRITTLENESS FOR RESEARCHERS IN FAYETTE FOR BIOCONTROLS
          OF ROBOTICS ONE MUST STANDARDIZE FOR NUCLEATE APPLIED COATINGS
        </Mono>
      </p>
      <p>
        However, the only letter that ever appears in the same position in both
        strings (and only appears in the same position in both strings) is{" "}
        <PuzzleAnswer>E</PuzzleAnswer>, the answer to this mini-puzzle.
      </p>
      <h2>The Swimmer</h2>
      <p>
        This minipuzzle, when opened, reveals a small capsule. Based on the
        title of the puzzle, solvers should immerse the capsule in water. A few
        minutes later a foam <Mono>A</Mono> pops out of the dissolving capsule.
      </p>
      <h2>The Dead Drop</h2>
      <p>
        Now that the rest of the puzzles are solved, the Dead Drop mini meta can
        be solved. Its clues and terms all rely on the answers to the other
        minipuzzles or on information gathered while solving them.
      </p>
      <ul>
        <li>
          The only informant who would leave the dead drop “sopping wet” is The
          Swimmer…as long as you’ve dunked the capsule in water to dissolve it,
          anyway. <strong>Coroner is immediately after Swimmer.</strong>
        </li>
        <li>
          The Academic fills in a total of 10 answers to MIT athletics questions
          and 9 answers to Ig Nobel Prize questions, so{" "}
          <strong>the Academic is immediately before the Photographer.</strong>
        </li>
        <li>
          The Taming of the Shrew is not used in The Actor’s puzzle, so{" "}
          <strong>the Actor immediately follows the Poet.</strong>
        </li>
        <li>
          The Stonemason reads the string of letters SUPERBOWL as Super Bowl,
          but the Florist saw a “fantastic raptor”—Superb Owl—instead.{" "}
          <strong>The Stonemason immediately follows the Florist.</strong>
        </li>
        <li>
          The Bartender’s bars are all north of the Charles River…but Deep Cuts
          is also north of the Mystic River, on the Medford side.{" "}
          <strong>
            The Bartender is followed by two informants with the same starting
            letter.
          </strong>
        </li>
        <li>
          The Photographer encounters a star of David (Israel, UTC +2) next to
          the flag of Singapore (UTC +8). Since UTC +0 is first in line, this
          means{" "}
          <strong>
            the Coroner must be third and the Photographer is 8th.
          </strong>
        </li>
        <li>
          The unchecked letters in the bottom row of the Logician’s puzzle are 5
          and 8. This means{" "}
          <strong>
            the Logician is first but otherwise gives you no additional
            information.
          </strong>
        </li>
      </ul>
      <p>
        The informants you can place immediately are the Logician (1st), Coroner
        (3rd) and Photographer (9th). Additionally, the Coroner is paired with
        the Swimmer, and the Photographer is paired with the Artist, giving you:
      </p>
      <ul>
        <li>Logician</li>
        <li>Swimmer</li>
        <li>Coroner</li>
        <li>?</li>
        <li>?</li>
        <li>?</li>
        <li>?</li>
        <li>Academic</li>
        <li>Photographer</li>
        <li>?</li>
        <li>?</li>
      </ul>
      <p>
        The Bartender is immediately followed by two informants beginning with
        the same letter, so AA, PP, or SS. The Swimmer is already set in #2 and
        Stonemason must go after Florist, so it must be either Bartender → Actor
        → Academic or Bartender → P → P. The Actor, however, is immediately
        preceded by a P in any case, blocking the Shipwright from being followed
        by the two A titles. And since Actor is specifically preceded by Poet,
        the order must be Bartender → Police Officer → Poet → Actor. This string
        will only fit in the space after the Coroner, leaving Florist and
        Stonemason to bring up the rear.
      </p>
      <p>
        Matching each informant with the letter from their puzzle gives you:
      </p>
      <StyledTable>
        {EXTRACTION_TABLE.map(([person, letter], i) => (
          <tr key={i}>
            <td>{person}</td>
            <td>{letter}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        The final answer is <PuzzleAnswer>MANUEL ORIBE</PuzzleAnswer>.
      </p>
      <h2>But wait, there’s more!</h2>
      <p>
        After solving <a href="/puzzles/papas_stash">Papa’s Stash</a>, solvers
        gain access to a digital blacklight that reveals new information about
        the early puzzle in the round. For this puzzle, the digital blacklight
        instructs solvers to use a real blacklight on the physical puzzle
        papers. A number (or an X) is written in UV ink in the area that is
        printed to look like the filter on a cigarette.
      </p>
      <FlexRow>
        <LinkedImage src={filters} alt="A grid of mock cigarette filters." />
        <LinkedImage
          src={blacklight}
          alt="A grid of mock cigarette filters under blacklight. Each filter has a letter or number written on it."
        />
      </FlexRow>
      <StyledTable>
        {EXTRACTION_TABLE.map(([person, letter, extraction], i) => (
          <tr key={i}>
            <td>{person}</td>
            <td>{letter}</td>
            <td>{extraction}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        This gives the second answer: <Mono>BRANIL</Mono>. Or, if you look
        closely at the number 4 and realize it’s oriented 90 degrees from
        everything else, you spin the associated letter 90 degrees to get the
        final answer: <PuzzleAnswer>BRAZIL</PuzzleAnswer>.
      </p>
      <h2>Bonus Puzzles</h2>
      <h3>Author’s Note</h3>
      <p>
        In the course of writing this puzzle, two minipuzzles were written that
        did not make the final cut. We would like to include them here for your
        puzzling pleasure!
      </p>
      <h3>The Artist</h3>
      <p className="puzzle-flavor">
        It’s hard to know where to go to find good art. Fortunately, I took good
        notes on where to go next, in the appropriate unit of measurement for a
        crow bridging a gap. Unfortunately my walking directions appear to be in
        a different order… where did I start again?
      </p>
      <LinkedImage
        src={artist1}
        alt="A bunch of paintings hanging from a rail. Each is annotated with two numbers, one above and one below the painting."
      />
      <LinkedImage
        src={artist2}
        alt="A bunch of paintings hanging from a rail. Each is annotated with two numbers, one above and one below the painting."
      />
      <LinkedImage
        src={artist3}
        alt="A bunch of paintings hanging from a rail. Each is annotated with two numbers, one above and one below the painting."
      />
      <ol>
        <li>
          Face away from the window and turn right. Watch out for cars and enter
          the next building to your right. Locate the elevators and go to the
          fifth floor. Head away from the giant pillar covered with colorful
          squares.
        </li>
        <li>
          Just keep walking, just keep walking... go straight across the hall.
          Climbing won’t be necessary for you.
        </li>
        <li>
          Turn east (ish) and follow the ramp (it’s a jungle out there). Take
          the elevator to the top and turn left.
        </li>
        <li>
          Go along either side of the building and enter the next building,
          crossing through to the bridge. Turn left, cross under one building
          and turn right at the third opportunity. Look at that window!
        </li>
        <li>
          Continue the same way you came. Almost immediately, turn left to enter
          the stairwell and descend 1.5 flights.
        </li>
        <li>
          Exit through the lobby and proceed down the stairs to the lawn. Cross
          the lawn and stare longingly through the window at the inaccessible
          artwork.
        </li>
        <li>
          Go between the columns and turn to the left. Walk down the hall until
          you can turn right (stay inside!), then go to the end of the corridor.
          Make sure to check behind you!
        </li>
        <li>
          Climb approximately 30 stairs. Exit the stairwell and turn left,
          proceeding down the hallway to your goal.
        </li>
        <li>
          Continue down the hallway and descend the stairs to the ground floor.
          Turn right and immediately left. Look up.
        </li>
        <li>
          Stop craning your neck and head (roughly) south. Carry on until you
          can go down, and descend 2 floors.
        </li>
        <li>
          Go back down the corridor and when you get to a decision point go to
          the right. Go down the first flight of stairs you find and follow the
          hall towards the Infinite.
        </li>
        <li>
          Go out the doors and skirt around the main attraction. Turn left only
          when you must; the next stop is about half way down the hall.
        </li>
        <li>
          If you keep going down the hall, you can’t miss it. It’s just round
          the corner after the stairwell.
        </li>
      </ol>
      <h3>The Shipwright</h3>
      <p className="puzzle-flavor">
        I like to keep a physical record of what I’ve built; it’s the decorative
        details that grab me.
      </p>
      <Crossword
        labels={SHIPWRIGHT_LABELS}
        getAdditionalCellStyles={({ row, column }) => {
          if (SHIPWRIGHT_HIGHLIGHTS.has(row * 26 + column)) {
            return { backgroundColor: "#ffff00" };
          }
          return {};
        }}
      />
      <h2>Solutions to Bonus Puzzles</h2>
      <h3>The Artist</h3>
      <p>
        Each image is of a piece of art somewhere on campus. A stairs icon above
        each artwork gives the floor the art can be found on. Approximate
        distance in smoots (the “
        <a
          href="https://en.wikipedia.org/wiki/Smoot"
          target="_blank"
          rel="noreferrer"
        >
          appropriate unit for a crow bridging a gap
        </a>
        ”) between each artwork and the next can help pinpoint their location.
        The artworks are arranged in a reasonable order for walking from one to
        another.
      </p>
      <p>
        Each of the numbered directions 1-14 can be used to walk from one piece
        of artwork to another, but they are not in the same order the
        photographs appear in the puzzle. Instead, associate the artwork each
        instruction starts from with the building number where the artwork is
        found, and use AZ126 to spell out <Mono>QC DRINKING AGE</Mono>. The
        legal drinking age in Quebec is 18 which gives the answer <Mono>R</Mono>
        .
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Order</th>
            <th>Art at instruction start location</th>
            <th>Location</th>
            <th>Walking tour (photo) order</th>
            <th>Building</th>
            <th>Letter</th>
          </tr>
          {ARTIST_EXTRACTION.map(
            ([order, art, location, tour, building, letter], i) => (
              <tr key={i}>
                <td>{order}</td>
                <td>{art}</td>
                <td>{location}</td>
                <td>{tour}</td>
                <td>{building}</td>
                <td>{letter}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <h3>The Shipwright</h3>
      <p>
        As hinted by the title and flavor text, solvers must first visit the
        Hart Nautical Gallery on the first floor of Building 5. Fill the names
        of each model ship on display there into the criss-cross. The USS
        Cochrane, highlighted in the grid, has a 21 prominently painted on the
        bow, which gives the answer to this minipuzzle, <Mono>U</Mono>.
      </p>
      <p>
        We were not able to include this minipuzzle since the Hart Nautical
        Gallery is locked evenings and weekends.
      </p>
      <LinkedImage src={ship} alt="The USS Cochrane" />
      <Crossword
        labels={SHIPWRIGHT_LABELS}
        fill={SHIPWRIGHT_FILL}
        getAdditionalCellStyles={({ row, column }) => {
          if (SHIPWRIGHT_HIGHLIGHTS.has(row * 26 + column)) {
            return { backgroundColor: "#ffff00" };
          }
          return {};
        }}
      />
    </>
  );
};

export default Solution;

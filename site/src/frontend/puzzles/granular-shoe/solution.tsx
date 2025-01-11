import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import left1 from "./assets/left1.png";
import left10 from "./assets/left10.png";
import left11 from "./assets/left11.png";
import left12 from "./assets/left12.png";
import left13 from "./assets/left13.png";
import left14 from "./assets/left14.png";
import left15 from "./assets/left15.png";
import left16 from "./assets/left16.png";
import left17 from "./assets/left17.png";
import left18 from "./assets/left18.png";
import left19 from "./assets/left19.png";
import left2 from "./assets/left2.png";
import left3 from "./assets/left3.png";
import left4 from "./assets/left4.png";
import left5 from "./assets/left5.png";
import left6 from "./assets/left6.png";
import left7 from "./assets/left7.png";
import left8 from "./assets/left8.png";
import left9 from "./assets/left9.png";
import poetry from "./assets/poetry.png";
import right1 from "./assets/right1.png";
import right10 from "./assets/right10.png";
import right11 from "./assets/right11.png";
import right12 from "./assets/right12.png";
import right13 from "./assets/right13.png";
import right14 from "./assets/right14.png";
import right15 from "./assets/right15.png";
import right16 from "./assets/right16.png";
import right17 from "./assets/right17.png";
import right18 from "./assets/right18.png";
import right19 from "./assets/right19.png";
import right2 from "./assets/right2.png";
import right3 from "./assets/right3.png";
import right4 from "./assets/right4.png";
import right5 from "./assets/right5.png";
import right6 from "./assets/right6.png";
import right7 from "./assets/right7.png";
import right8 from "./assets/right8.png";
import right9 from "./assets/right9.png";

const SHAKESPEARE_DATA: [string, number, string, string[]][] = [
  [
    "Desdemona",
    1,
    "YOU",
    [
      "I do perceive here a divided duty:",
      "To [1] I am bound for life and education",
    ],
  ],
  [
    "Prospero",
    2,
    "COULD",
    [
      "His mother was a witch, and one so strong",
      "That [2] control the moon, make flows and ebbs,",
      "And deal in her command without her power.",
    ],
  ],
  [
    "Bianca",
    3,
    "LEARN",
    [
      "I am no breeching scholar in the schools,",
      "I’ll not be tied to hours nor ’pointed times,",
      "But [3] my lessons as I please myself.",
    ],
  ],
  [
    "Perdita",
    4,
    "OUR",
    [
      "The selfsame sun that shines upon his court",
      "Hides not his visage from [4] cottage but",
      "Looks on alike.",
    ],
  ],
  [
    "Cordelia",
    5,
    "SECRETS",
    [
      "All blest [5],",
      "All you unpublish’d virtues of the earth,",
      "Spring with my tears!",
    ],
  ],
  ["Oberon", 6, "BY", ["Ill met [6] moonlight"]],
  ["Cressida", 7, "COMPARISON", ["O Jupiter! there’s no [7]."]],
  [
    "Ariel",
    8,
    "OF",
    [
      "the fire and cracks",
      "[8] sulphurous roaring the most mighty Neptune",
      "Seem to besiege and make his bold waves tremble",
    ],
  ],
  [
    "Ferdinand",
    9,
    "WHERE",
    [
      "[9] should this music be? i’ the air or the earth?",
      "It sounds no more: and sure, it waits upon",
      "Some god o’ the island.",
    ],
  ],
  [
    "Stephano",
    10,
    "OUT",
    [
      "[10] o’ the moon, I do assure thee: I was the man i’",
      "the moon when time was.",
    ],
  ],

  [
    "Puck",
    11,
    "YONDER",
    [
      "My fairy lord, this must be done with haste,",
      "For night’s swift dragons cut the clouds full fast,",
      "And [11] shines Aurora’s harbinger;",
    ],
  ],

  [
    "Ophelia",
    12,
    "EACH",
    [
      "Pale as his shirt, his knees knocking [12] other,",
      "And with a look so piteous in purport",
      "As if he had been loosed out of hell",
      "To speak of horrors",
    ],
  ],
  [
    "Portia",
    13,
    "LITTLE",
    [
      "This night methinks is but the daylight sick;",
      "It looks a [13] paler: ’tis a day,",
      "Such as the day is when the sun is hid.",
    ],
  ],
  [
    "Miranda",
    14,
    "ROCK",
    ["therefore wast thou", "Deservedly confined into this [14],"],
  ],
  [
    "Juliet",
    15,
    "CIRCLED",
    [
      "O, swear not by the moon, the inconstant moon,",
      "That monthly changes in her [15] orb,",
      "Lest that thy love prove likewise variable.",
    ],
  ],
  ["Titania", 16, "THE", ["[16] moon methinks looks with a watery eye"]],
  [
    "Caliban",
    17,
    "BIGGER",
    [
      "teach me how",
      "To name the [17] light, and how the less,",
      "That burn by day and night",
    ],
  ],
  [
    "Trinculo",
    18,
    "CLOUD",
    [
      "If it should thunder as it did before, I know not",
      "where to hide my head: yond same [18] cannot",
      "choose but fall by pailfuls.",
    ],
  ],
  [
    "Rosalind",
    19,
    "WORLD",
    [
      "The poor [19] is almost six",
      "thousand years old, and in all this time there was not any man",
      "died in his own person, videlicet, in a love-cause.",
    ],
  ],
];

const EXTRACTION_DATA: [
  string,
  [string, string, string],
  string,
  string,
  string,
][] = [
  [
    "A",
    ["A dusty jewel", "Witness to cataclysm", "tempts us to visit"],
    "Abstract #1389, “Identifying and Characterizing Impact Melt Outcrops in the Nectaris Basin” , B. A. Cohen, S. J. Lawrence, N. E. Petro, G. D. Bart, R. N. Clegg-Watkins, B. W. Denevi, R. R. Ghent, R. L. Klima, G. A. Morgan, P. D. Spudis, J. D. Stopar",
    "https://www.hou.usra.edu/meetings/lpsc2016/pdf/1389.pdf",
    "Cordelia",
  ],
  [
    "N",
    [
      "Repeat features tale",
      "Of faults, fans, faults, fans, faults, fans",
      "Sediments downthrown",
    ],
    "Abstract #1407, “Repeat Syn-Tectonic Sedimentation in Coprates Chasma, Mars” , P. M. Grindrod, J. M. Davis, S. Gupta, S. Banham",
    "https://www.hou.usra.edu/meetings/lpsc2019/pdf/1407.pdf",
    "Ophelia",
  ],
  [
    "S",
    [
      "She sways to and fro",
      "Plunging us into darkness",
      "When will summer come?",
    ],
    "Abstract #2533, “The Lunar Season Calculator: An Accessible Tool for Future Mission Planning” , S. F. A. Cartwright, J. M. Bretzfelder",
    "https://www.hou.usra.edu/meetings/lpsc2021/pdf/2533.pdf",
    "Bianca",
  ],
  [
    "W",
    [
      "Pit craters on Earth",
      "Are like those on Mars, but are",
      "Cheaper to get to",
    ],
    "Abstract #1013, “Pit Crater Chains in Craters of the Moon National Monument and Preserve, Idaho, USA” , C. Klimczak, P. K. Byrne",
    "https://www.hou.usra.edu/meetings/lpsc2017/pdf/1013.pdf",
    "Cressida",
  ],
  [
    "E",
    ["Sour, bitter flavors", "In the soup of Gale crater", "Show salty data"],
    "Abstract #1505, “Characterizing Boron and Lithium Partitioning in Martian Analog Materials Using Comprehensive Geo-Chemical Analysis, Principal Component Analysis, and Machine Learning” , D. Das, V. V. Vesselinov, T. Kliphuis, E. Peterson, L. Crossey, M. A. Nellessen, P. J. Gasda, E. Sklute, S. Clegg, N. Lanza",
    "https://www.hou.usra.edu/meetings/lpsc2024/pdf/1505.pdf",
    "Desdemona",
  ],
  [
    "R",
    [
      "Centuries, eons",
      "Impacts mark time at Saturn",
      "What does the clock say?",
    ],
    "Abstract #1757, “The Ticking Clock of Impact Craters in the Saturnian System” , E. B. Bierhaus, L. Dones, S. J. Robbins",
    "https://www.hou.usra.edu/meetings/lpsc2017/pdf/1757.pdf",
    "Juliet",
  ],
  [
    "L",
    [
      "Encrusted flow lobes",
      "Advances, then stops, then goes",
      "Ruptures at their toes",
    ],
    "Abstract #2644, “Rock Corral Butte, Eastern Snake River Plain, Idaho: A Low Shield Volcano Emplaced by Pressurized, Insulated Flow” , K. H. Hottendorf, S. E. H. Sakimoto, M. S. Paredes, T. K. P. Gregg",
    "https://www.hou.usra.edu/meetings/lpsc2023/pdf/2644.pdf",
    "Portia",
  ],
  [
    "A",
    ["Magma and rivers", "Precious scars on Mars’ surface", "Fund my proposal"],
    "Abstract #3040, “Investigating Magma-Cryosphere Interactions and Outflow Channel Activity in Hebrus Valles and Hephaestus Fossae, Mars” , S. Nerozzi, B. S. Tober, J. W. Holt",
    "https://www.hou.usra.edu/meetings/lpsc2019/pdf/3040.pdf",
    "Rosalind",
  ],
  [
    "S",
    [
      "Graphite meets magma",
      "Explosive reaction yields",
      "Mercury’s “red” spots",
    ],
    "Abstract #1649, “Carbon as a Key Driver of Explosive Volcanism on Mercury” , K. Iacovino, F. M. McCubbin, K. E. Vander Kaaden, G. M. Moore",
    "https://www.hou.usra.edu/meetings/lpsc2023/pdf/1649.pdf",
    "Perdita",
  ],
  [
    "E",
    ["A giant impact", "Dynamo slowly recov—", "Oh no! Not again!"],
    "Abstract #2103, “Effects of Basin-Forming Impacts on Thermal Evolution of Mars” , J. H. Roberts, J. Arkani-Hamed",
    "https://www.hou.usra.edu/meetings/lpsc2016/pdf/2103.pdf",
    "Puck",
  ],
  [
    "R",
    ["Mercury’s mottled", "With many pretty colors", "Gotta map ’em all"],
    "Abstract #2100, “Distinguishing Geological Units in Mercury’s Intercrater Plains in the Context of the Global Geological Map” , M. J. Kinczyk, B. W. Denevi, D. L. Buczkowski, L. M. Prockter, P. K. Byrne, L. R. Ostrach, E. B. Miller",
    "https://www.hou.usra.edu/meetings/lpsc2020/pdf/2100.pdf",
    "Miranda",
  ],
  [
    "E",
    ["I see icy troughs", "Dust veneer may be slowing", "Ice sublimation"],
    "Abstract #2914, “Present-Day and (Very) Recent Influences of Ice Sublimation on Martian Trough Migration” , A. C. Pascuzzo, L. Melendez, J. F. Mustard",
    "https://www.hou.usra.edu/meetings/lpsc2020/pdf/2914.pdf",
    "Ariel",
  ],
  [
    "N",
    [
      "Dust-swirled pirouettes",
      "Choreographed turbulence",
      "Sunbeam-fueled flash mobs",
    ],
    "Abstract #2567, “Detailsin the Devils: Preliminary Results of a Field Investigation of Planetary Boundary Layer Turbulence and Dust Devil Generation” , L. K. Fenton, S. Metzger, T. I. Michaels, S. P. Scheidt, T. C. Dorn, B. Cole, O. Sprau, L. D. V. Neakrase",
    "https://www.hou.usra.edu/meetings/lpsc2020/pdf/2567.pdf",
    "Titania",
  ],
  [
    "I",
    ["Volcanoes erupt", "The volume erupted", "Generates collapse"],
    "Abstract #3022, “Building Ascraeus Mons: Summit Calderas and Their Big Eruptions” , K. J. Mohr, D. A. Williams, A. B. Clarke",
    "https://www.hou.usra.edu/meetings/lpsc2020/pdf/3022.pdf",
    "Oberon",
  ],
  [
    "S",
    [
      "From two particles",
      "A twinkie-like grain was found",
      "With strange isotopes",
    ],
    "Abstract #2674, “An Interstellar Carbonaceous Twinkie in Asteroid Ryugu?” , C. Kraver, L. R. Nittler, J. Barosch, R. M. Stroud, I. Kerraouch, J. Wang",
    "https://www.hou.usra.edu/meetings/lpsc2024/pdf/2674.pdf",
    "Caliban",
  ],
  [
    "S",
    ["Far from the Namib", "Dunes of organic solids", "Mimic quartz cousins"],
    "Abstract #1071, “Out of Africa: Radarclinometry of the Sand Seas of Namibia and Titan” , C. D. Neish, R. D. Lorenz, R. L. Kirk",
    "https://www.lpi.usra.edu/meetings/lpsc2009/pdf/1071.pdf",
    "Stephano",
  ],
  [
    "I",
    ["Planet pulls planet", "Resulting dissipation", "Rests on frequency"],
    "Abstract #1980, “Planet-Planet Tidal Heating in the TRAPPIST-1 System” , H. C. F. C. Hay, I. Matsuyama",
    "https://www.hou.usra.edu/meetings/lpsc2019/pdf/1980.pdf",
    "Trinculo",
  ],
  [
    "M",
    [
      "Her blanket of stone",
      "The Moon is a soft mistress",
      "More silken with time",
    ],
    "Abstract #2623, “Crater Equilibrium as an Anomalous Diffusion Process” , D. A. Minton, C. I. Fassett",
    "https://www.hou.usra.edu/meetings/lpsc2016/pdf/2623.pdf",
    "Prospero",
  ],
  [
    "A",
    [
      "What slips through lead bricks",
      "Is stopped by budding flowers",
      "Sees water in stones?",
    ],
    "Abstract #1993, “Neutron Computed Tomography of Meteorites: Detecting Hydrogen-Bearing Materials” , A. H. Treiman, J. M. LaManna, L. M. Anovitz, D. S. Hussey, D. L. Jacobson",
    "https://www.hou.usra.edu/meetings/lpsc2018/pdf/1993.pdf",
    "Ferdinand",
  ],
];

const ART_GALLERY_DATA: [string, string, string, string][] = [
  [
    left1,
    "A multicolor painting with a central reddish blob",
    right1,
    "A multicolor scientific diagram with a central reddish blob",
  ],
  [
    left2,
    "A painting showing multiple bands of drab color",
    right2,
    "A topographic map showing multiple bands of drab color",
  ],
  [
    left3,
    "A painting of a gray sphere fleeing an orange sphere",
    right3,
    "A scientific diagram showing the relationship between lunar axial tilt and the amount of sunlight received",
  ],
  [
    left4,
    "A painting of a crater",
    right4,
    "A scientific diagram inset showing a crater",
  ],
  [
    left5,
    "A painting with a bunch of individual green, yellow, orange, and red brush strokes",
    right5,
    "A scientific diagram with a bunch of individual green, yellow, orange, and red rectangles",
  ],
  [
    left6,
    "A painting of a multicolor graph",
    right6,
    "A multicolor graph of the size of craters on various moons",
  ],
  [
    left7,
    "A green-and-red blotchy painting",
    right7,
    "An annotated photo of a ridgeline covered with scrub brush",
  ],
  [
    left8,
    "A painting with a blue background and yellow spots",
    right8,
    "A scientific diagram with a blue background and yellow spots indicating craters",
  ],
  [
    left9,
    "A painting of a green striped triangle",
    right9,
    "A scientific diagram of a green striped triiangle",
  ],
  [
    left10,
    "A collage of eight circular objects, each with a blue border, a yellow circle, and an orange core",
    right10,
    "A scientific diagram of eight circular objects, each with a blueish border, a yellowish circle, and an orange core",
  ],
  [
    left11,
    "A painting of a circle, irregularly colored with orange and blue, with dark purple dots",
    right11,
    "A scientific diagram of a moon, with orange showing one type of terrain, blue showing another type of terrain, and purple dots showing pyroclastic vents",
  ],
  [
    left12,
    "A drawing of a bunch of wavy lines",
    right12,
    "A scientific diagram showing a bunch of wavy lines",
  ],
  [
    left13,
    "A painting showing brush feathering",
    right13,
    "An annotated satellite view of terrain",
  ],
  [
    left14,
    "A painting of an oval with four other ovals coming off of it",
    right14,
    "A scientific diagram of a bunch of craters",
  ],
  [left15, "A colored-pencil drawing of a graph", right15, "A graph"],
  [
    left16,
    "An abstract pencil drawing in the style of a comic book",
    right16,
    "An annotated satellite image of terrain",
  ],
  [
    left17,
    "A colored-pencil drawing of some concentric circles with a triangle on top",
    right17,
    "A scientific diagram of some concentric circles with a triangle on top",
  ],
  [
    left18,
    "A colored-pencil drawing of a multicolored graph",
    right18,
    "A multicolored graph",
  ],
  [
    left19,
    "An abstract black-and-white painting",
    right19,
    "Microscope view of the structure of a rock",
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  tr:first-child {
    background-color: var(--gold-300);
  }
  tr:nth-child(2n) {
    background-color: var(--gold-200);
  }
  tr:nth-child(2n + 1):not(:first-child) {
    background-color: var(--gold-100);
  }
  th,
  td {
    padding-right: 1em;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a set of printed out bits of paper/cardstock,
        in various shapes. One set of pieces is styled as fragments of magnetic
        poetry, and the other is in rectangular strips and has art on one side
        and text on the back. The 40 pieces of “magnetic poetry” can be
        re-assembled to form 19 haikus. The pieces with art on them can also be
        reassembled into 19 clues (art on the front, text on the back).
      </p>
      <p>
        Each haiku is a{" "}
        <a
          href="https://eos.org/geofizz/lunar-and-planetary-science-inspires-out-of-this-world-poetry"
          target="_blank"
          rel="noreferrer"
        >
          haiku that was used as an abstract summary
        </a>{" "}
        for an abstract submitted to the Lunar and Planetary Science Conference,
        verbatim (which should readily come up if the text of the haiku is
        searched for on google). This is just a fun little tradition among
        planetary scientists!
      </p>
      <p>
        Each of the 19 re-assembled drawings/paintings corresponds to a figure
        (or part of a figure) directly from one of the clued abstracts. There is
        one “?” on each piece of art. By comparing the position of the ? on the
        art to the actual plot you can see that the ? is in the place of one
        distinct letter.
      </p>
      <p>
        On the reverse of each drawing/painting, there is a quote from a
        Shakespeare play with one word replaced with a number in square
        brackets. The replaced words spell out{" "}
        <Mono>
          YOU COULD LEARN OUR SECRETS BY COMPARISON OF WHERE OUT YONDER EACH
          LITTLE ROCK CIRCLED THE BIGGER CLOUD WORLD
        </Mono>{" "}
        when placed in numerical order. Each of these lines is said by a
        different character, whose name is also the name of a Uranian moon. The
        clue phrase obliquely indicates that these moons of Uranus should be put
        in order by their orbital distance from Uranus. Ordering the letters
        extracted from the plots by the semi-major axis of the orbit of the
        associated Uranian moon gives <Mono>ANSWER</Mono>{" "}
        <PuzzleAnswer>LA SERENISSIMA</PuzzleAnswer>.
      </p>
      <p>
        So, as you can see, the title really says it all: These are haikus and
        art based on abstracts for a scientific conference, and the Shakespeare
        clues are actually about the moons of Uranus, which could be considered
        a pale blue dot.
      </p>
      <h3>Author’s Note</h3>
      <p>
        This puzzle was partly inspired by a few of the other excellent poetry
        puzzles in this hunt (
        <a href="/puzzles/borderline_personality">Borderline Personality</a> and{" "}
        <a href="/puzzles/a_puzzle_of_the_dead">A Puzzle of the Dead</a>), and
        partly by wanting to share my delight about the LPSC abstract haiku
        tradition. It was also just very fun to show a bunch of art and poetry,
        and have it all actually be science.
      </p>
      <h3>Full extraction</h3>
      <StyledTable>
        <tr>
          <th>Character / Moon of Uranus</th>
          <th>Given Order</th>
          <th>Clue Phrase Word</th>
          <th>Shakespeare Line</th>
        </tr>
        {SHAKESPEARE_DATA.map(([name, order, word, lines], i) => (
          <tr key={i}>
            <td>{name}</td>
            <td>{order}</td>
            <td>{word}</td>
            <td>
              {lines.map((line, j) => (
                <React.Fragment key={j}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </td>
          </tr>
        ))}
      </StyledTable>
      <StyledTable>
        <tr>
          <th>Semi-major axis order</th>
          <th>Extraction</th>
          <th>Haiku</th>
          <th>Abstract</th>
          <th>Character / Moon of Uranus</th>
        </tr>
        {EXTRACTION_DATA.map(([letter, haiku, title, href, name], i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{letter}</td>
            <td>
              {haiku.map((line, j) => (
                <React.Fragment key={j}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </td>
            <td>
              <a href={href} target="_blank" rel="noreferrer">
                {title}
              </a>
            </td>
            <td>{name}</td>
          </tr>
        ))}
      </StyledTable>
      <h3>Art Gallery</h3>
      <Grid>
        {ART_GALLERY_DATA.map(([art, artAlt, science, scienceAlt], i) => (
          <React.Fragment key={i}>
            <LinkedImage src={art} alt={artAlt} />
            <LinkedImage src={science} alt={scienceAlt} />
          </React.Fragment>
        ))}
      </Grid>
      <h3>Color-Coded Haikus</h3>
      <p>Each block of color was given as a block of magnet poetry.</p>
      <LinkedImage
        src={poetry}
        alt="19 blocks of refrigerator poetry, making the haikus in the table above"
      />
    </>
  );
};

export default Solution;

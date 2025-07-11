import React, { type ReactNode } from "react";
import { styled } from "styled-components";

const SmallCaps = styled.span`
  font-size: 13px;
`;

export const CLUES: {
  clue: ReactNode;
  answer: string;
  highlight?: string;
}[][] = [
  [
    { clue: "Face A:", answer: "" },
    { clue: "Battery end (5)", answer: "ANODE" },
    {
      clue: (
        <>
          Something shot with an <SmallCaps>ARROW</SmallCaps> (6)
        </>
      ),
      answer: "TARGET",
      highlight: "#ffff00",
    },
    { clue: "Personal assistant (4)", answer: "AIDE" },
    { clue: "Jorts material (5)", answer: "DENIM" },
    { clue: "Hannibal’s group (1-4)", answer: "A-TEAM", highlight: "#00ff00" },
    { clue: "General idea (4)", answer: "GIST" },
    {
      clue: "Place for a single letter in a crossword-style puzzle, in this case, an imaginary sphere (4)",
      answer: "CELL",
      highlight: "#ffff00",
    },
    { clue: "Fix the outcome of a competition (3)", answer: "RIG" },
    { clue: "It could come in Murphy or bunk versions (3)", answer: "BED" },
    { clue: "Coffin for the cremated? (3)", answer: "URN" },
  ],
  [
    { clue: "Face B:", answer: "" },
    { clue: "Assist with reaching an agreement (7)", answer: "MEDIATE" },
    {
      clue: "Suitable for all ages (1-5)",
      answer: "G-RATED",
      highlight: "#00ff00",
    },
    {
      clue: "With out, in a difficult or awkward position (2 1 4)",
      answer: "ON A LIMB",
    },
    { clue: "Group of rioters (3)", answer: "MOB" },
    { clue: "Short greeting (2)", answer: "HI" },
    {
      clue: (
        <>
          Someone who has had an <SmallCaps>ESPADA</SmallCaps> passed over their
          head (9)
        </>
      ),
      answer: "CABALLERO",
      highlight: "#ffff00",
    },
    { clue: "Sticky situation (3)", answer: "JAM" },
    { clue: "Guarantees the failure of (5)", answer: "DOOMS" },
  ],
  [
    { clue: "Face C:", answer: "" },
    {
      clue: "Do this before you can craft anything in popular video game (4)",
      answer: "MINE",
    },
    { clue: "Liberals, for short (4)", answer: "DEMS" },
    { clue: "Lower’s sound (3)", answer: "MOO" },
    {
      clue: "Pachelbel’s Canon is played in a ____ key (1-5)",
      answer: "D-MAJOR",
      highlight: "#00ff00",
    },
    {
      clue: (
        <>
          <i>The Umbrella Academy</i>’s Page (6)
        </>
      ),
      answer: "ELLIOT",
    },
    { clue: "Youngest of the Hemsworth brothers (4)", answer: "LIAM" },
    {
      clue: "Period of time spanned by one Taylor Swift album (3)",
      answer: "ERA",
    },
    { clue: "Faster than a walk but slower than a canter (4)", answer: "TROT" },
    { clue: "Summation symbol (5)", answer: "SIGMA" },
    {
      clue: "In capital form, it looks like the final letter that you need to find two copies of (3)",
      answer: "ETA",
      highlight: "#ffff00",
    },
  ],
  [
    { clue: "Face D:", answer: "" },
    { clue: "Beaded computing devices (5)", answer: "ABACI" },
    {
      clue: "Thermonuclear weapon (1-4)",
      answer: "H-BOMB",
      highlight: "#00ff00",
    },
    { clue: "The city of fashion (5)", answer: "MILAN" },
    { clue: "“Marry her anyway” song (4)", answer: "RUDE" },
    { clue: "Raygun in Paris (1-4)", answer: "B-GIRL", highlight: "#00ff00" },
    { clue: "Reader of scripture (6)", answer: "LECTOR" },
    { clue: "Damage the reputation of (3)", answer: "TAR" },
    {
      clue: "Message with a BCC, potentially (1-4)",
      answer: "E-MAIL",
      highlight: "#00ff00",
    },
    { clue: "Work hard or hard work (4)", answer: "TOIL" },
  ],
  [
    { clue: "Face E:", answer: "" },
    { clue: "Biological optical aperture (5)", answer: "PUPIL" },
    {
      clue: "Third letter that you need to find two copies of (3)",
      answer: "CEE",
      highlight: "#ffff00",
    },
    { clue: "Was at the front (3)", answer: "LED" },
    { clue: "Type of ladder attached to a fire truck (6)", answer: "AERIAL" },
    { clue: "Medical term for fluid retention (5)", answer: "EDEMA" },
    { clue: "Times of shuteye (4)", answer: "NAPS" },
    { clue: "Sedan or coupe (3)", answer: "CAR" },
    { clue: "San Francisco body of water (3)", answer: "BAY" },
    { clue: "The L in L.A. (3)", answer: "LOS" },
    { clue: "Boots is ____ best friend (4’1)", answer: "DORA’S" },
  ],
  [
    { clue: "Face F:", answer: "" },
    { clue: "Baby wolves (4)", answer: "PUPS" },
    {
      clue: "Former love interest of J.Lo (1-3)",
      answer: "A-ROD",
      highlight: "#00ff00",
    },
    {
      clue: "Each answer word is entered around the face of a Platonic ____, of which there are three types in this puzzle (5)",
      answer: "SOLID",
      highlight: "#ffff00",
    },
    { clue: "Quintillion prefix (3)", answer: "EXA" },
    {
      clue: "One increment of aperture size equivalent to doubling or halving of its area (1-4)",
      answer: "F-STOP",
      highlight: "#00ff00",
    },
    { clue: "Kunis from that early 2000s show (4)", answer: "MILA" },
    {
      clue: "Old-school musical medium usually spun clockwise, which is the direction answers must be entered (5)",
      answer: "VINYL",
      highlight: "#ffff00",
    },
    { clue: "Type of prophylactic ligation (5)", answer: "TUBAL" },
    {
      clue: "Distorts spacetime for faster-than-light travel (5)",
      answer: "WARPS",
    },
  ],
  [
    { clue: "Face G:", answer: "" },
    { clue: "A.I. brain Sutskever (4)", answer: "ILYA" },
    { clue: "Article of clothing with a cup size (3)", answer: "BRA" },
    {
      clue: "The most boring TV network (1-4)",
      answer: "C-SPAN",
      highlight: "#00ff00",
    },
    { clue: "Blah, especially when repeated (5)", answer: "YADDA" },
    {
      clue: "Place for a feather that is something you can be proud of (3)",
      answer: "CAP",
    },
    { clue: "Shoestring (4)", answer: "LACE" },
    { clue: "Lay flowing fabric over (5)", answer: "DRAPE" },
    { clue: "Places where busses sleep (6)", answer: "DEPOTS" },
    { clue: "Phoned in a document (5)", answer: "FAXED" },
  ],
  [
    { clue: "Face H:", answer: "" },
    { clue: "Ciao (3)", answer: "BYE" },
    {
      clue: "To do this well indicates a favourable future (4)",
      answer: "BODE",
    },
    { clue: "Mononymous winner of sixteen Grammys (5)", answer: "ADELE" },
    {
      clue: (
        <>
          Small snap-on open-sided retaining ring with three inner-facing tabs,
          used to hold components on a <SmallCaps>SHAFT</SmallCaps> (1-4)
        </>
      ),
      answer: "E-CLIP",
      highlight: "#00ff00",
    },
    { clue: "Spread of an urban landscape (6)", answer: "SPRAWL" },
    { clue: "Touch or lean on (4)", answer: "ABUT" },
    { clue: "Defunct airline with globe logo (3 2)", answer: "PAN AM" },
    { clue: "Highly sought-after holy item (5)", answer: "GRAIL" },
    { clue: "Workplace of Beaker (3)", answer: "LAB" },
  ],
  [
    { clue: "Face I:", answer: "" },
    { clue: "Federal agent (1-3)", answer: "G-MAN", highlight: "#00ff00" },
    { clue: "In a suitable manner (5)", answer: "APTLY" },
    {
      clue: (
        <>
          Producer of <i>Etherlords</i> (5)
        </>
      ),
      answer: "NIVAL",
    },
    { clue: "Slow the progress of (6)", answer: "IMPEDE" },
    { clue: "Two above an eagle (3)", answer: "PAR" },
    { clue: "Worsen over time (5)", answer: "DECAY" },
    { clue: "Spoil (3)", answer: "ROT" },
    { clue: "Velocity, but with no particular direction (5)", answer: "SPEED" },
    { clue: "Person who commits perjury (4)", answer: "LIAR" },
  ],
  [
    { clue: "Face J:", answer: "" },
    { clue: "A celeb might have a household one (4)", answer: "NAME" },
    { clue: "Vector differential operator (3)", answer: "DEL" },
    { clue: "Played on the radio (5)", answer: "AIRED" },
    { clue: "Subliminal government control message (4)", answer: "OBEY" },
    {
      clue: "Sport with a three-point line, informally (1-4)",
      answer: "B-BALL",
      highlight: "#00ff00",
    },
    { clue: "Of a color, rich and saturated (4)", answer: "DEEP" },
    { clue: "Bedtime sleep inducer for kids (5)", answer: "STORY" },
    {
      clue: "Stanford’s Instruction-following model based on LLaMA (6)",
      answer: "ALPACA",
    },
    { clue: "6-6-1944 (1-3)", answer: "D-DAY", highlight: "#00ff00" },
  ],
  [
    { clue: "Face K:", answer: "" },
    { clue: "Expel gas from the stomach (4)", answer: "BURP" },
    { clue: "Give, as in attention (3)", answer: "PAY" },
    { clue: "Maker of beer (6)", answer: "BREWER" },
    {
      clue: "If you draw a straight line passing through the head and thorax, it will also pass through this; you could use any of the all-caps objects to perform a similar extrapolation (7)",
      answer: "ABDOMEN",
      highlight: "#ffff00",
    },
    { clue: "Potato in Indian food (4)", answer: "ALOO" },
    { clue: "It comes before first (6)", answer: "ZEROTH" },
  ],
  [
    { clue: "Face L:", answer: "" },
    {
      clue: "Empty, like hands used to accomplish a task without tools (4)",
      answer: "BARE",
    },
    {
      clue: "It comes in pitching, sand, lob and gap varieties (5)",
      answer: "WEDGE",
    },
    { clue: "Fatal (6)", answer: "LETHAL" },
    {
      clue: "Kind of beam that traces a straight line through 3D space, and might come in handy now (5)",
      answer: "LASER",
      highlight: "#ffff00",
    },
    { clue: "Handsomely dressed (6)", answer: "DAPPER" },
    { clue: "Zealous or prolific as in a reader (4)", answer: "AVID" },
  ],
  [
    { clue: "Face M:", answer: "" },
    { clue: "Bambi at the start of the movie (4)", answer: "FAWN" },
    { clue: "Had on (4)", answer: "WORE" },
    {
      clue: "The study of everything from aardvarks to zebras (7)",
      answer: "ZOOLOGY",
    },
    { clue: "Peach dessert (5)", answer: "MELBA" },
    { clue: "Primal self (2)", answer: "ID" },
    { clue: "Butthole, literally (4)", answer: "ANUS" },
    { clue: "“To thine own ____ be true” (4)", answer: "SELF" },
  ],
  [
    { clue: "Face N:", answer: "" },
    { clue: "Collection of version-controlled code (4)", answer: "REPO" },
    { clue: "“Ye ____ Shoppe” (4)", answer: "OLDE" },
    { clue: "Winnie’s joey friend (3)", answer: "ROO" },
    { clue: "He was known for the geocentric model (7)", answer: "PTOLEMY" },
    { clue: "Heights of Israel-Syria conflict (5)", answer: "GOLAN" },
    { clue: "Having a moody, goth sensibility (3)", answer: "EMO" },
    { clue: "Primadonna (4)", answer: "DIVA" },
  ],
  [
    { clue: "Face O:", answer: "" },
    { clue: "Egg cells (3)", answer: "OVA" },
    {
      clue: "Items in a list of instructions, e.g. 1. find the clue answers 2. assemble the solids 3. poke with something sharp (5)",
      answer: "STEPS",
      highlight: "#ffff00",
    },
    {
      clue: (
        <>
          Long thin <SmallCaps>ROD</SmallCaps> used for fishing (4)
        </>
      ),
      answer: "POLE",
      highlight: "#ffff00",
    },
    { clue: "Made a mistake (5)", answer: "ERRED" },
    { clue: "Gymnast Comăneci (5)", answer: "NADIA" },
    { clue: "Rorschach test ink mark (4)", answer: "BLOT" },
    { clue: "Opposite of rich (4)", answer: "POOR" },
  ],
  [
    { clue: "Face P:", answer: "" },
    {
      clue: "Denver’s version is filled with bell peppers, onions, ham and cheese (6)",
      answer: "OMELET",
    },
    { clue: "Enjoyed fully and slowly (7)", answer: "SAVORED" },
    {
      clue: "Neighborhood in Chicago, or what all the answer words for a given face form (4)",
      answer: "LOOP",
      highlight: "#ffff00",
    },
    { clue: "San Diego team (6)", answer: "PADRES" },
    { clue: "Sand-filled board game piece (5)", answer: "TIMER" },
    {
      clue: "Type of dash that is narrower than em-dashes but wider than hyphens; the latter of which are not entered in the imaginary spheres (2)",
      answer: "EN",
      highlight: "#ffff00",
    },
  ],
  [
    { clue: "Face Q:", answer: "" },
    {
      clue: (
        <>
          Athlete using a scorecard and <SmallCaps>PENCIL</SmallCaps> (6)
        </>
      ),
      answer: "GOLFER",
      highlight: "#ffff00",
    },
    { clue: "#808000 (5)", answer: "OLIVE" },
    { clue: "One who colors fabric (4)", answer: "DYER" },
    { clue: "Gives off (5)", answer: "EMITS" },
    {
      clue: "Each of your lines will pass through spheres from ____ three types of faces (3)",
      answer: "ALL",
      highlight: "#ffff00",
    },
    {
      clue: "First part of a palindromic utterance you might make when you find the final answer and realize that these nested shapes are analogous to a turducken (2)",
      answer: "AH",
      highlight: "#ffff00",
    },
    { clue: "Fishermen’s tall things? (5)", answer: "TALES" },
  ],
  [
    { clue: "Face R:", answer: "" },
    { clue: "Bigfoot’s biggest rival (4)", answer: "YETI" },
    { clue: "Dollar, slangily (4)", answer: "BUCK" },
    { clue: "Parts of the proverbial machine (4)", answer: "COGS" },
    { clue: "Make very happy (5)", answer: "ELATE" },
    {
      clue: (
        <>
          D<SmallCaps>RUMSTICK</SmallCaps> (3)
        </>
      ),
      answer: "LEG",
      highlight: "#ffff00",
    },
    { clue: "Kentucky horse race (5)", answer: "DERBY" },
    {
      clue: (
        <>
          Object sometimes stuck with a <SmallCaps>WOODEN STICK</SmallCaps> and
          then dipped in caramel (5)
        </>
      ),
      answer: "APPLE",
      highlight: "#ffff00",
    },
  ],
  [
    { clue: "Face S:", answer: "" },
    { clue: "Electron transfer reaction (5)", answer: "REDOX" },
    {
      clue: "How many additional times each line will touch another imaginary sphere (4)",
      answer: "ONCE",
      highlight: "#ffff00",
    },
    { clue: "In abundance (6)", answer: "GALORE" },
    {
      clue: "It enables or disables the function keys on old keyboards (1-4)",
      answer: "F-LOCK",
      highlight: "#00ff00",
    },
    { clue: "Picasso’s style (6)", answer: "CUBISM" },
    {
      clue: (
        <>
          Jessica from <i>Sin City</i> (4)
        </>
      ),
      answer: "ALBA",
    },
  ],
  [
    { clue: "Face T:", answer: "" },
    { clue: "Crowd-sourced review app (4)", answer: "YELP" },
    { clue: "Massage (3)", answer: "RUB" },
    { clue: "Houston, Texas (1-4)", answer: "H-TOWN", highlight: "#00ff00" },
    { clue: "More structural pancake alternative (6)", answer: "WAFFLE" },
    { clue: "Genesis maker (4)", answer: "SEGA" },
    {
      clue: "Gunshot, explosion, or 1962 Lichtenstein painting (4)",
      answer: "BLAM",
    },
    { clue: "Web location (4)", answer: "SITE" },
  ],
  [
    { clue: "Face U:", answer: "" },
    { clue: "Converts exposed film to negatives (8)", answer: "DEVELOPS" },
    { clue: "Soccer great from fifty years ago (4)", answer: "PELE" },
    { clue: "Dough (5)", answer: "MONEY" },
    { clue: "Creature from Tasmania (5)", answer: "DEVIL" },
    {
      clue: "It’s just a number, according to some romantics (3)",
      answer: "AGE",
    },
    {
      clue: "Hundred dollar bill (1-4)",
      answer: "C-NOTE",
      highlight: "#00ff00",
    },
  ],
  [
    { clue: "Face V:", answer: "" },
    { clue: "Altruistic (8)", answer: "SELFLESS" },
    {
      clue: "“____ the rug”, is a place to sweep unwanted problems (5)",
      answer: "UNDER",
    },
    { clue: "Caped Christopher (5)", answer: "REEVE" },
    { clue: "Treatment to manage withdrawal (5)", answer: "DETOX" },
    { clue: "Poetic tribute (3)", answer: "ODE" },
    { clue: "Intense anger (4)", answer: "RAGE" },
  ],
];

export const VERTEX_ADJACENCY: {
  tetrahedron: string;
  cube: string;
  dodecahedron: string;
  letter: string;
  color: string;
}[] = [
  {
    tetrahedron: "ABC",
    cube: "EHJ",
    dodecahedron: "OPU",
    letter: "E",
    color: "#ffff00",
  },
  {
    tetrahedron: "BCD",
    cube: "EFG",
    dodecahedron: "KMN",
    letter: "L",
    color: "#00ff00",
  },
  {
    tetrahedron: "ACD",
    cube: "FHI",
    dodecahedron: "LQR",
    letter: "T",
    color: "#ff00ff",
  },
  {
    tetrahedron: "ABD",
    cube: "GIJ",
    dodecahedron: "STV",
    letter: "A",
    color: "#00ffff",
  },
  {
    tetrahedron: "",
    cube: "FGI",
    dodecahedron: "KRT",
    letter: "P",
    color: "#0000ff",
  },
  {
    tetrahedron: "",
    cube: "HIJ",
    dodecahedron: "QSU",
    letter: "L",
    color: "#808000",
  },
  {
    tetrahedron: "",
    cube: "EGJ",
    dodecahedron: "MOV",
    letter: "N",
    color: "#ff9900",
  },
  {
    tetrahedron: "",
    cube: "EFH",
    dodecahedron: "LNP",
    letter: "P",
    color: "#ff0000",
  },
];

import node1 from "./assets/node1.png";
import node10 from "./assets/node10.png";
import node11 from "./assets/node11.png";
import node12 from "./assets/node12.png";
import node13 from "./assets/node13.png";
import node14 from "./assets/node14.png";
import node15 from "./assets/node15.png";
import node16 from "./assets/node16.png";
import node17 from "./assets/node17.png";
import node18 from "./assets/node18.png";
import node19 from "./assets/node19.png";
import node2 from "./assets/node2.png";
import node20 from "./assets/node20.png";
import node21 from "./assets/node21.png";
import node22 from "./assets/node22.png";
import node23 from "./assets/node23.png";
import node24 from "./assets/node24.png";
import node25 from "./assets/node25.png";
import node26 from "./assets/node26.png";
import node27 from "./assets/node27.png";
import node28 from "./assets/node28.png";
import node29 from "./assets/node29.png";
import node3 from "./assets/node3.png";
import node30 from "./assets/node30.png";
import node31 from "./assets/node31.png";
import node4 from "./assets/node4.png";
import node5 from "./assets/node5.png";
import node6 from "./assets/node6.png";
import node7 from "./assets/node7.png";
import node8 from "./assets/node8.png";
import node9 from "./assets/node9.png";

const ASSETS = {
  node1,
  node2,
  node3,
  node4,
  node5,
  node6,
  node7,
  node8,
  node9,
  node10,
  node11,
  node12,
  node13,
  node14,
  node15,
  node16,
  node17,
  node18,
  node19,
  node20,
  node21,
  node22,
  node23,
  node24,
  node25,
  node26,
  node27,
  node28,
  node29,
  node30,
  node31,
};

export type Entry = {
  text: string;
  index: string;
  image: string;
  left?: string;
  right?: string;
};

const data: Entry[] = [
  {
    text: "ICK",
    index: "node1",
    image: ASSETS.node1,
    left: "node2",
    right: "node3",
  },
  {
    text: "???",
    index: "node2",
    image: ASSETS.node2,
    left: "node4",
    right: "node5",
  },
  {
    text: "?????",
    index: "node3",
    image: ASSETS.node3,
    left: "node6",
    right: "node7",
  },
  {
    text: "???",
    index: "node4",
    image: ASSETS.node4,
    left: "node8",
    right: "node9",
  },
  {
    text: "????",
    index: "node5",
    image: ASSETS.node5,
    left: "node10",
    right: "node11",
  },
  {
    text: "????",
    index: "node6",
    image: ASSETS.node6,
    left: "node12",
    right: "node13",
  },
  {
    text: "???",
    index: "node7",
    image: ASSETS.node7,
    left: "node14",
    right: "node15",
  },
  {
    text: "???",
    index: "node8",
    image: ASSETS.node8,
    left: "node16",
    right: "node17",
  },
  {
    text: "????",
    index: "node9",
    image: ASSETS.node9,
    left: "node18",
    right: "node19",
  },
  {
    text: "????",
    index: "node10",
    image: ASSETS.node10,
    left: "node20",
    right: "node21",
  },
  {
    text: "????",
    index: "node11",
    image: ASSETS.node11,
    left: "node22",
    right: "node23",
  },
  {
    text: "???",
    index: "node12",
    image: ASSETS.node12,
    left: "node24",
    right: "node25",
  },
  {
    text: "?????",
    index: "node13",
    image: ASSETS.node13,
    left: "node26",
    right: "node27",
  },
  {
    text: "???",
    index: "node14",
    image: ASSETS.node14,
    left: "node28",
    right: "node29",
  },
  {
    text: "???",
    index: "node15",
    image: ASSETS.node15,
    left: "node30",
    right: "node31",
  },
  {
    text: "LoneLifetimeLotus",
    index: "node16",
    image: ASSETS.node16,
  },
  {
    text: "Radiohead",
    index: "node17",
    image: ASSETS.node17,
  },
  {
    text: "LongLastingRocket",
    index: "node18",
    image: ASSETS.node18,
  },
  {
    text: "LovingRussianLion",
    index: "node19",
    image: ASSETS.node19,
  },
  {
    text: "LikesRoughRides",
    index: "node20",
    image: ASSETS.node20,
  },
  {
    text: "Lightweight",
    index: "node21",
    image: ASSETS.node21,
  },
  {
    text: "LacyLassie",
    index: "node22",
    image: ASSETS.node22,
  },
  {
    text: "RocketLeagueLegend",
    index: "node23",
    image: ASSETS.node23,
  },
  {
    text: "LusciousLipRosie",
    index: "node24",
    image: ASSETS.node24,
  },
  {
    text: "LadyRight",
    index: "node25",
    image: ASSETS.node25,
  },
  {
    text: "RichLesbianRogue",
    index: "node26",
    image: ASSETS.node26,
  },
  {
    text: "Ravishing",
    index: "node27",
    image: ASSETS.node27,
  },
  {
    text: "RaunchyRomanLegion",
    index: "node28",
    image: ASSETS.node28,
  },
  {
    text: "RugbyLeague",
    index: "node29",
    image: ASSETS.node29,
  },
  {
    text: "RideRinseRepeat",
    index: "node30",
    image: ASSETS.node30,
  },
  {
    text: "RockyRoad",
    index: "node31",
    image: ASSETS.node31,
  },
];

export { data };

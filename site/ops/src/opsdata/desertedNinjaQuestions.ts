export type FermitQuestion = {
  id: number;
  text: string;
  scoringMethod:
    | "percent"
    | "raw"
    | "12345"
    | "12468"
    | "1double"
    | "2double"
    | "3double"
    | "4double"
    | "9double"
    | "10double"
    | "team_puzzle_solves"
    | "all_submissions";
  categories: string[];
} & (
  | {
      geoguessr: number;
      answer: () => SVGGeometryElement[];
      scoringMethod: "raw";
    }
  | {
      geoguessr: null;
      answer: number;
    }
);

const makeEllipse = ({
  cx,
  cy,
  rx,
  ry,
  transform,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  transform?: string;
}) => {
  const elt = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  elt.setAttribute("cx", cx.toString());
  elt.setAttribute("cy", cy.toString());
  elt.setAttribute("rx", rx.toString());
  elt.setAttribute("ry", ry.toString());
  if (transform) {
    elt.setAttribute("transform", transform);
  }
  return elt;
};

export const ALL_QUESTIONS: FermitQuestion[] = [
  {
    id: 0,
    text: "How many smoots will take you from one end of the Infinite Corridor to the other?",
    answer: 147.4,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["distance"],
  },
  {
    id: 1,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 979.300454545455,
        cy: 727.360454545455,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 979.300454545455,
        cy: 727.870454545455,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 977.747272727273,
        cy: 724.269545454545,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 976.201818181818,
        cy: 728.905909090909,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 975.691818181818,
        cy: 728.898181818182,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 1,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 2,
    text: "In what year did the Mystery Hunt first exceed 100 non-meta puzzles?",
    answer: 2003,
    geoguessr: null,
    scoringMethod: "12345",
    categories: ["hunt_history"],
  },
  {
    id: 3,
    text: "How many gender-inclusive bathrooms are there in the Main Group? (That’s buildings 1, 3, 5, 7, 2, 4, 6, 8, 6C, 10, and 11.)",
    answer: 15,
    geoguessr: null,
    scoringMethod: "12468",
    categories: ["bathrooms"],
  },
  {
    id: 4,
    text: "In building 2, there’s a sculpture called Chord. How many cylindrical rods are in that sculpture?",
    answer: 905,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["art"],
  },
  {
    id: 5,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 1156.50227272727,
        cy: 735.597727272727,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 1156.50227272727,
        cy: 736.123181818182,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 1154.96454545455,
        cy: 735.597727272727,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 1153.41909090909,
        cy: 737.143181818182,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 1152.90909090909,
        cy: 737.150909090909,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 2,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 6,
    text: "If MIT tuition increased by the same percentage as it did from 2014 to 2024, what will one semester of tuition cost in 2034?",
    answer: 42964.67,
    geoguessr: null,
    scoringMethod: "percent",
    categories: [],
  },
  {
    id: 7,
    text: "How many teams are signed up for this Mystery Hunt?",
    answer: 219,
    geoguessr: null,
    scoringMethod: "3double",
    categories: ["hunt_current"],
  },
  {
    id: 8,
    text: "What percentage of MIT undergraduates have Math as their primary major? (Both XVIII and XVIII-C count.)",
    answer: 7.6075,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["major"],
  },
  {
    id: 9,
    text: "How many external windows are there in the Green Building?",
    answer: 324,
    geoguessr: null,
    scoringMethod: "10double",
    categories: ["green", "windows"],
  },
  {
    id: 10,
    text: "How many scientist names are there in Killian Court?",
    answer: 115,
    geoguessr: null,
    scoringMethod: "3double",
    categories: [],
  },
  {
    id: 11,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 1087.48227272727,
        cy: 733.542272727273,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 1087.48227272727,
        cy: 734.052272727273,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 1085.92909090909,
        cy: 733.542272727273,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 1084.38363636364,
        cy: 735.087727272727,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 1083.87363636364,
        cy: 735.08,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 3,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 12,
    text: "How many non-overlapping Great Domes could you fit onto Briggs and O’Brien Fields?  Assume that the domes must lie on the ground in the normal dome orientation.",
    answer: 55,
    geoguessr: null,
    scoringMethod: "2double",
    categories: ["area"],
  },
  {
    id: 13,
    text: "By the time this quiz show ends, how many puzzles will your team have solved?",
    answer: 0,
    geoguessr: null,
    scoringMethod: "team_puzzle_solves",
    categories: ["meta"],
  },
  {
    id: 14,
    text: "In building 6C, there is a piece of artwork called Bars of Color within Squares. How many colored regions are there in that art?",
    answer: 133,
    geoguessr: null,
    scoringMethod: "4double",
    categories: ["art"],
  },
  {
    id: 15,
    text: "How many buildings on the MIT campus have building numbers that have no letters and are prime numbers?",
    answer: 11,
    geoguessr: null,
    scoringMethod: "12345",
    categories: ["buildings"],
  },
  {
    id: 16,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 910.265,
        cy: 656.269545454545,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 910.265,
        cy: 656.779545454546,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 908.727272727273,
        cy: 656.269545454545,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 907.181818181818,
        cy: 657.815,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 906.656363636364,
        cy: 657.807272727273,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 4,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 17,
    text: "How many letters are in the inscription on the third floor of Lobby 7?",
    answer: 116,
    geoguessr: null,
    scoringMethod: "3double",
    categories: [],
  },
  {
    id: 18,
    text: "How many official clubs / organizations have ASA-assigned bulletin board spaces on the Infinite Corridor?",
    answer: 84,
    geoguessr: null,
    scoringMethod: "3double",
    categories: [],
  },
  {
    id: 19,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 1085.41136363636,
        cy: 624.325,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 1085.41136363636,
        cy: 624.850454545455,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 1083.87363636364,
        cy: 624.325,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 1082.32818181818,
        cy: 625.870454545455,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 1081.81818181818,
        cy: 625.878181818182,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 5,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 20,
    text: "How many official Duck Konundra have there been in Mystery Hunt history?",
    answer: 8,
    geoguessr: null,
    scoringMethod: "12345",
    categories: ["hunt_history"],
  },
  {
    id: 21,
    text: "How many steps would you need to ascend in order to climb the Green Building 25 times?",
    answer: 10525,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["green"],
  },
  {
    id: 22,
    text: "How many varsity sports are offered at MIT? (Men’s/women’s/coed sports are all counted separately.)",
    answer: 33,
    geoguessr: null,
    scoringMethod: "1double",
    categories: ["sports"],
  },
  {
    id: 23,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 759.328181818182,
        cy: 752.597727272727,
        rx: 18.5454545454545,
        ry: 10.3004545454545,
      }),
      makeEllipse({
        cx: 758.810454545455,
        cy: 756.724090909091,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 757.272727272727,
        cy: 758.269545454545,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 755.727272727273,
        cy: 758.779545454545,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 755.201818181818,
        cy: 754.660909090909,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 6,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 24,
    text: "Assuming all registered teams were 100% accurate when they signed up, how many hunters are participating in this Mystery Hunt?",
    answer: 4805,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["hunt_current"],
  },
  {
    id: 25,
    text: "How many windows are there on the outside of Stata?",
    answer: 555,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["stata", "windows"],
  },
  {
    id: 26,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 1279.62863636364,
        cy: 665.032272727273,
        rx: 10.3004545454545,
        ry: 10.3004545454545,
      }),
      makeEllipse({
        cx: 1433.7,
        cy: 158.23,
        rx: 18.761,
        ry: 33,
        transform: "rotate(21.177)",
      }),
      makeEllipse({
        cx: 1435.3,
        cy: 142.56,
        rx: 33.321,
        ry: 54.338,
        transform: "rotate(21.841)",
      }),
      makeEllipse({
        cx: 1434.7,
        cy: 157.43,
        rx: 49.098,
        ry: 74.837,
        transform: "rotate(21.326)",
      }),
      makeEllipse({
        cx: 1440,
        cy: 100.94,
        rx: 81.023,
        ry: 104.38,
        transform: "rotate(23.598)",
      }),
    ],
    geoguessr: 7,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 27,
    text: "By the time this quiz show ends, how many answer submissions (whether correct or not) will ALL participating teams have submitted for this Mystery Hunt?",
    answer: 0,
    geoguessr: null,
    scoringMethod: "all_submissions",
    categories: ["meta"],
  },
  {
    id: 28,
    text: "How many Nobel prizes are held by current MIT faculty and staff?",
    answer: 13,
    geoguessr: null,
    scoringMethod: "12468",
    categories: [],
  },
  {
    id: 29,
    text: "If you traveled from MIT Medical to building 7 through the basements using the shortest path, how far would you travel in smoots?",
    answer: 435,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["distance"],
  },
  {
    id: 30,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 1021.53772727273,
        cy: 666.577727272727,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 1021.53772727273,
        cy: 667.087727272727,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 1020,
        cy: 666.577727272727,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 1018.45454545455,
        cy: 668.123181818182,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 1017.92909090909,
        cy: 668.115454545455,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 8,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 31,
    text: "How many distinct Greek letters are represented by MIT’s FSILGs?",
    answer: 18,
    geoguessr: null,
    scoringMethod: "12345",
    categories: [],
  },
  {
    id: 32,
    text: "How many bathrooms are there in the Main Group? (That’s buildings 1, 3, 5, 7, 2, 4, 6, 8, 6C, 10, and 11.)",
    answer: 65,
    geoguessr: null,
    scoringMethod: "2double",
    categories: ["bathrooms"],
  },
  {
    id: 33,
    text: "How many names are on the memorials in Lobby 10?",
    answer: 394,
    geoguessr: null,
    scoringMethod: "percent",
    categories: [],
  },
  {
    id: 34,
    text: "As of October 2023, how many professors were employed at MIT?",
    answer: 1089,
    geoguessr: null,
    scoringMethod: "percent",
    categories: [],
  },
  {
    id: 35,
    text: "Kresge Auditorium is shaped like an eighth of a sphere. What is the radius of that sphere, in smoots?",
    answer: 20.06,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["distance"],
  },
  {
    id: 36,
    text: "Ignoring wind resistance, what is the maximum speed (in miles per hour) that a pumpkin dropped from the top of the Green Building will reach?",
    answer: 91.03,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["green"],
  },
  {
    id: 37,
    text: "During MIThenge, what is the sun’s azimuthal angle, in degrees?",
    answer: 245.75,
    geoguessr: null,
    scoringMethod: "percent",
    categories: [],
  },
  {
    id: 38,
    text: "What percentage of MIT undergraduates have their primary major listed as literature, music, or theater arts?",
    answer: 0.11025358,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["majors"],
  },
  {
    id: 39,
    text: "How many differently-numbered MIT buildings are west of Mass Ave? (Buildings that have different letters, like W53A and W53 or W15 and WW15, count separately.)",
    answer: 74,
    geoguessr: null,
    scoringMethod: "2double",
    categories: ["buildings"],
  },
  {
    id: 40,
    text: "How many events were on the schedule for REX 2024?",
    answer: 303,
    geoguessr: null,
    scoringMethod: "9double",
    categories: [],
  },
  {
    id: 41,
    text: "How many different e-mail addresses are subscribed to ec-discuss?",
    answer: 1003,
    geoguessr: null,
    scoringMethod: "percent",
    categories: [],
  },
  {
    id: 42,
    text: "What percentage of applicants for the class of 2029 were accepted early?",
    answer: 5.981913,
    geoguessr: null,
    scoringMethod: "percent",
    categories: [],
  },
  {
    id: 43,
    text: "What is the complete dining capacity of Lobdell dining hall, including both balconies?",
    answer: 360,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["buildings"],
  },
  {
    id: 44,
    text: "How many trees are located within Killian Court?",
    answer: 70,
    geoguessr: null,
    scoringMethod: "2double",
    categories: [],
  },
  {
    id: 45,
    text: "Assuming ideal hexagonal packing density, how many standard orchestral snare drums could fit in one layer on the Kresge main stage?",
    answer: 1084,
    geoguessr: null,
    scoringMethod: "percent",
    categories: ["area"],
  },
  {
    id: 46,
    text: "How many truck loads did the MIT Museum need in order to move the collection to their new location?",
    answer: 135,
    geoguessr: null,
    scoringMethod: "4double",
    categories: [],
  },
  {
    id: 47,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 804.138636363636,
        cy: 679.961363636364,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 804.138636363636,
        cy: 680.486818181818,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 802.600909090909,
        cy: 679.961363636364,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 801.055454545455,
        cy: 681.506818181818,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 800.545454545455,
        cy: 681.514545454545,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 9,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 48,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 1170.93681818182,
        cy: 548.087727272727,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 1167.84590909091,
        cy: 548.597727272727,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 1166.29272727273,
        cy: 548.087727272727,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 1164.74727272727,
        cy: 549.633181818182,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 1166.29272727273,
        cy: 548.605454545455,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 10,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 49,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 987.537727272727,
        cy: 666.577727272727,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 984.446818181818,
        cy: 667.087727272727,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 982.909090909091,
        cy: 666.577727272727,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 981.363636363636,
        cy: 668.123181818182,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 982.909090909091,
        cy: 667.08,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 11,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 50,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 1086.44681818182,
        cy: 646.996818181818,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 1086.44681818182,
        cy: 647.506818181818,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 1084.90909090909,
        cy: 646.996818181818,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 1083.36363636364,
        cy: 648.542272727273,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 1082.83818181818,
        cy: 648.534545454545,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 12,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 51,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 548.628636363636,
        cy: 622.269545454545,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 548.628636363636,
        cy: 622.779545454546,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 547.090909090909,
        cy: 622.269545454545,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 545.545454545455,
        cy: 623.815,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 545.02,
        cy: 623.807272727273,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 13,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 52,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 397.174090909091,
        cy: 740.759545454545,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 397.174090909091,
        cy: 741.269545454545,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 395.636363636364,
        cy: 740.759545454546,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 394.090909090909,
        cy: 742.305,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 393.565454545455,
        cy: 742.297272727273,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 14,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 53,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 719.664090909091,
        cy: 754.143181818182,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 719.664090909091,
        cy: 754.668636363636,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 718.110909090909,
        cy: 754.143181818182,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 716.565454545455,
        cy: 755.688636363636,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 716.055454545455,
        cy: 755.696363636364,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 15,
    scoringMethod: "raw",
    categories: [],
  },
  {
    id: 54,
    text: "Where is this location on campus?",
    answer: () => [
      makeEllipse({
        cx: 943.229545454546,
        cy: 627.415909090909,
        rx: 8.755,
        ry: 8.755,
      }),
      makeEllipse({
        cx: 943.229545454546,
        cy: 627.941363636364,
        rx: 33.4822727272727,
        ry: 19.5731818181818,
      }),
      makeEllipse({
        cx: 941.691818181818,
        cy: 627.415909090909,
        rx: 55.6363636363636,
        ry: 33.4822727272727,
      }),
      makeEllipse({
        cx: 940.146363636364,
        cy: 628.961363636364,
        rx: 75.7272727272727,
        ry: 50.4822727272727,
      }),
      makeEllipse({
        cx: 939.636363636364,
        cy: 628.969090909091,
        rx: 105.090909090909,
        ry: 82.4190909090909,
      }),
    ],
    geoguessr: 16,
    scoringMethod: "raw",
    categories: [],
  },
];

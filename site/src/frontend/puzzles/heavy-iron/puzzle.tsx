import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import Crossword, { filterLabelsToStructure } from "../../components/Crossword";
import { Errata, HScrollTableWrapper } from "../../components/StyledUI";

const GRID: string[][] = [
  [
    ".",
    "1",
    ".",
    "2",
    ".",
    "3",
    ".",
    "4",
    ".",
    "5",
    ".",
    "6",
    ".",
    "7",
    ".",
    "8",
    ".",
    "9",
    ".",
    "10",
    ".",
  ],
  [
    "11",
    "",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "12",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    "13",
    "",
    "",
    "",
  ],
  [
    ".",
    "",
    ".",
    "",
    ".",
    "14",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "15",
    "",
    "",
    ".",
    "",
    ".",
  ],
  [
    "16",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "17",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    "18",
    "",
    "",
    "",
  ],
  [
    ".",
    "",
    ".",
    "19",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
  ],
  [
    "20",
    "",
    "21",
    "",
    ".",
    "",
    ".",
    "22",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    ".",
    "23",
    "",
    "",
    "",
    "",
  ],
  [
    ".",
    ".",
    "",
    ".",
    "24",
    "",
    "25",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    ".",
    ".",
    ".",
    "",
    ".",
    ".",
    "",
    ".",
  ],
  [
    "26",
    "27",
    "",
    "",
    "",
    ".",
    "28",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "29",
    "",
    "30",
    "",
    "31",
    "",
    "",
    "",
  ],
  [
    ".",
    "",
    ".",
    ".",
    "",
    ".",
    "",
    ".",
    ".",
    ".",
    "32",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    ".",
    ".",
  ],
  [
    "33",
    "",
    "",
    "34",
    "",
    "35",
    "",
    "36",
    ".",
    "37",
    ".",
    "",
    ".",
    "38",
    "",
    "",
    "",
    "",
    "",
    "39",
    "",
  ],
  [
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "40",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
  ],
  [
    "41",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "42",
    "43",
    "",
    "44",
    "",
    "",
    "",
    "",
  ],
  [
    ".",
    ".",
    ".",
    "",
    ".",
    "",
    ".",
    "45",
    "",
    "",
    "",
    ".",
    ".",
    ".",
    "",
    ".",
    "",
    ".",
    ".",
    "",
    ".",
  ],
  [
    "46",
    "47",
    "",
    "",
    "48",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "49",
    "",
    "50",
    "",
    ".",
    "51",
    "",
    "52",
    "",
    "",
  ],
  [
    ".",
    "",
    ".",
    ".",
    "",
    ".",
    ".",
    ".",
    ".",
    "",
    ".",
    "",
    ".",
    "53",
    "",
    "54",
    "",
    ".",
    "",
    ".",
    ".",
  ],
  [
    "55",
    "",
    "",
    "56",
    "",
    ".",
    ".",
    "57",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "58",
    "",
    "59",
    "",
  ],
  [
    ".",
    "",
    ".",
    "",
    ".",
    "60",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "61",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
  ],
  [
    "62",
    "",
    "",
    "",
    ".",
    "63",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "64",
    "",
    "",
    "",
  ],
  [
    ".",
    "",
    ".",
    "65",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "66",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "",
    ".",
  ],
  [
    "67",
    "",
    "",
    "",
    ".",
    "68",
    "",
    "",
    "",
    "",
    "",
    "",
    ".",
    "",
    ".",
    "69",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
    "",
    ".",
  ],
];

const Across = [
  [
    "11",
    "Forgetting foxtrot, flip fishier fungus coming from a common country with a Rambling Club member",
    "6",
  ],
  [
    "12",
    "Hollow radio tower is first filled with electric field conductor",
    "7",
  ],
  ["13", "Rambler’s profession: “Leading cows home equals fun!”", "4"],
  [
    "14",
    "Glamour pic includes Japanese dog between heads of two women who don’t cook",
    "5",
  ],
  [
    "15",
    "Quietly banished, knit alternative string to keep track of your path",
    "3",
  ],
  ["16", "Bring home a vase for the auditor", "4"],
  ["17", "Tarry surface to make a snake stop", "7"],
  ["18", "Seeing through the center of Toon Town", "4"],
  ["19", "Happy to lose place, being gently moved", "5"],
  ["20", "Left, left, right, down, right, right, right", "4"],
  ["22", "Better men chance going topless", "7"],
  ["23", "Rambling man listening to current", "5"],
  ["24", "Crumbling Greek, product of fish head and a local character", "4"],
  ["26", "Fishy hiphop leads to fishy serving", "5"],
  ["28", "He can’t cook kale, clearly demonstrated", "4"],
  ["29", "Bursts Father’s duck cage", "4, 4"],
  ["32", "Moved on from paramour who’s losing his head", "4"],
  ["33", "Spot on Nigel’s head: Delia turns her back on it", "6, 2"],
  [
    "38",
    "Counterfeit C-note slid across bar determines inspector’s conclusion on Ann’s personal valet",
    "8",
  ],
  ["40", "He said he distributes ecstasy in the best way possible", "7"],
  ["41", "Lop Hades asunder in his meadows", "8"],
  [
    "42",
    "Racing to pour drop of tea into a champagne glass at end of summer",
    "8",
  ],
  ["45", "She’s no Spaniard, but she’s real messed up", "4"],
  ["46", "Source poem a NATO report contains", "8"],
  ["49", "When Priya’s at home, handsome wannabe-author gets undressed", "4"],
  ["51", "Brewer dutifully emptied out and refilled with beer", "5"],
  ["53", "Wooden train set I lent to a trusted friend", "4"],
  ["55", "“What do we extract from Ivanov? A letter” — Eddie, to Lin", "5"],
  [
    "57",
    "Fragmented images jog memories of folk wisdom: “nothing becomes one”",
    "7",
  ],
  [
    "58",
    "Inspector-in-Chief pursuing Rambling Club member for years in Rome",
    "4",
  ],
  ["61", "Pig sounds nice initially: louts stuff themselves with it", "5"],
  ["62", "Fifteenth widest to be trimmed down to size", "4"],
  [
    "63",
    "Initials of the killer’s best friend put about: get working, do something about it",
    "3, 4",
  ],
  [
    "64",
    "Every other NFL pick is sent back to the place to harden up or be fired",
    "4",
  ],
  [
    "65",
    "Reportedly fashionable place where the party starts for an adventure",
    "3",
  ],
  ["66", "Chef is at home getting seconds of runny fish stew", "5"],
  ["67", "Pirate’s favorite frog first jumps forward", "4"],
  ["68", "Joyrider’s first alias is fencing art? Ensign’s home", "7"],
  ["69", "Stratego is top secret for a narcissist", "6"],
];

const Down = [
  ["1", "Mean Rambling Club member’s second threat", "6"],
  ["2", "American teen hacked online message boards", "6"],
  ["3", "Counterstrike pistol changes hands while misaligned and empty", "7"],
  ["4", "Leon dead after breaking up a sure thing", "4, 4"],
  [
    "5",
    "Surrounded by discordant chime, Indonesian’s neighbor can imagine how others feel",
    "8",
  ],
  [
    "6",
    "Xerxes’ forces crossed Roman bridge effectively without consequence and with great emotion",
    "12",
  ],
  ["7", "Gas from either end enjoyable compared to Molly", "6"],
  ["8", "The way to take a 180 degree turn is retained by memorization", "5"],
  [
    "9",
    "Arachnid finishes after spinning coil with second burrow for web storage",
    "6",
  ],
  [
    "10",
    "Future installment payments vitally underwrite a housing addition without an uninsulated attic",
    "4, 4",
  ],
  ["21", "British doctors finally gain research grants", "3"],
  ["23", "Some MIT grads in the establishment", "3"],
  [
    "24",
    "Before I’ve found the key to count the size of the Rambling Club",
    "4",
  ],
  ["25", "Assess a usage fee on one mode of transportation", "4"],
  ["27", "Amherst institution is, I hesitate to say, a donkey", "5"],
  [
    "29",
    "Rambling Club member who was killed by another pair got mixed up around end of Friday",
    "5",
  ],
  ["30", "Jury-rigged plane", "5"],
  ["31", "In the aforementioned romantic poems, holding back", "2, 3"],
  ["34", "On a holiday? Come back and discover a Rambling Club member", "5"],
  [
    "35",
    "“Died, without even opening the case of spirit” — how Shakespeare describes someone’s action",
    "5",
  ],
  ["36", "It will fear even a rambler who’s not French", "5"],
  [
    "37",
    "Ripping nice cuppa and a donut: early-afternoon second breakfast taken by a civilian",
    "7, 5",
  ],
  ["39", "Close relative of a city on the French Riviera, reportedly", "5"],
  [
    "43",
    "Apparently in favour of number of suspicious characters in the Rambling Club",
    "4",
  ],
  ["44", "Last card added to Uno: Reverse", "4"],
  ["47", "Wanders from mountain origin, turning west to east!", "8"],
  [
    "48",
    "One who works diligently until winter begins almost never tires",
    "3",
  ],
  ["49", "Support me raising Cain, smart guy", "8"],
  ["50", "Perfect six-pack and instrument, but nothing inside", "8"],
  ["52", "Innocent Rambling Club member rambling only from five to seven", "3"],
  ["54", "Catches pig but chops its head off on several evenings, loudly", "7"],
  ["56", "Clifton’s rank singing even follows dashes", "6"],
  ["57", "Watercraft with an aircraft’s energy", "6"],
  ["58", "Mostly forsake incoherent request", "3, 3"],
  [
    "59",
    "Don Corleone ends up going alone, absorbed with favorable outcomes only",
    "2-4",
  ],
  [
    "60",
    "Something to pluck hearts of any major tycoons beyond a certain degree",
    "5",
  ],
];

const ClueIndexTD = styled.td`
  font-weight: bold;
`;

const ClueNumberTD = styled(ClueIndexTD)`
  text-align: right;
`;

const ClueTD = styled.td`
  padding-left: 10px;
`;

const ClueTable = styled.table`
  width: 100%;
`;

const clueTable = (clues: string[][]) => {
  return (
    <HScrollTableWrapper>
      <ClueTable>
        <tbody>
          {clues.map((clue, index) => (
            <tr key={index}>
              <ClueNumberTD>{clue[0]}</ClueNumberTD>
              <ClueTD>
                {clue[1]} ({clue[2]})
              </ClueTD>
            </tr>
          ))}
        </tbody>
      </ClueTable>
    </HScrollTableWrapper>
  );
};

const copyClueTable = (clues: string[][]) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Number</th>
          <th>Clue</th>
          <th>Length</th>
        </tr>
        {clues.map((clue, index) => (
          <tr key={index}>
            <td>{clue[0]}</td>
            <td>{clue[1]}</td>
            <td>{clue[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const StyledCrossword = styled(Crossword)`
  margin: 0 auto;
`;

const ClueHeader = styled.h3`
  padding-bottom: 0;
`;

const Puzzle = () => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 30th",
            message:
              "After Mystery Hunt, we edited the clue for 63 Across to replace the word “housemate” with “best friend”.",
          },
        ]}
      />
      <StyledCrossword
        labels={GRID}
        labelsForEmptyCopy={filterLabelsToStructure(GRID)}
      />
      <div className={NO_COPY_CLASS}>
        <ClueHeader>Across</ClueHeader>
        {clueTable(Across)}
        <ClueHeader>Down</ClueHeader>
        {clueTable(Down)}
      </div>
      <div className={COPY_ONLY_CLASS}>
        <ClueHeader>Across</ClueHeader>
        {copyClueTable(Across)}
        <ClueHeader>Down</ClueHeader>
        {copyClueTable(Down)}
      </div>
    </>
  );
};

export default Puzzle;

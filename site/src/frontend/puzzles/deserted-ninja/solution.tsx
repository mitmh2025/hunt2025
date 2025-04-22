import React from "react";
import { styled } from "styled-components";
import {
  albumLookup,
  geoguessrLookup,
} from "../../../../ops/src/opsdata/desertedNinjaImages";
import {
  ALL_QUESTIONS,
  type FermitQuestion,
} from "../../../../ops/src/opsdata/desertedNinjaQuestions";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer } from "../../components/StyledUI";
import geoMap1 from "./assets/geoguessr-map1.pdf";
import geoMap10 from "./assets/geoguessr-map10.pdf";
import geoMap11 from "./assets/geoguessr-map11.pdf";
import geoMap12 from "./assets/geoguessr-map12.pdf";
import geoMap13 from "./assets/geoguessr-map13.pdf";
import geoMap14 from "./assets/geoguessr-map14.pdf";
import geoMap15 from "./assets/geoguessr-map15.pdf";
import geoMap16 from "./assets/geoguessr-map16.pdf";
import geoMap2 from "./assets/geoguessr-map2.pdf";
import geoMap3 from "./assets/geoguessr-map3.pdf";
import geoMap4 from "./assets/geoguessr-map4.pdf";
import geoMap5 from "./assets/geoguessr-map5.pdf";
import geoMap6 from "./assets/geoguessr-map6.pdf";
import geoMap7 from "./assets/geoguessr-map7.pdf";
import geoMap8 from "./assets/geoguessr-map8.pdf";
import geoMap9 from "./assets/geoguessr-map9.pdf";
import geoRubric1 from "./assets/geoguessr-rubric1.pdf";
import geoRubric10 from "./assets/geoguessr-rubric10.pdf";
import geoRubric11 from "./assets/geoguessr-rubric11.pdf";
import geoRubric12 from "./assets/geoguessr-rubric12.pdf";
import geoRubric13 from "./assets/geoguessr-rubric13.pdf";
import geoRubric14 from "./assets/geoguessr-rubric14.pdf";
import geoRubric15 from "./assets/geoguessr-rubric15.pdf";
import geoRubric16 from "./assets/geoguessr-rubric16.pdf";
import geoRubric2 from "./assets/geoguessr-rubric2.pdf";
import geoRubric3 from "./assets/geoguessr-rubric3.pdf";
import geoRubric4 from "./assets/geoguessr-rubric4.pdf";
import geoRubric5 from "./assets/geoguessr-rubric5.pdf";
import geoRubric6 from "./assets/geoguessr-rubric6.pdf";
import geoRubric7 from "./assets/geoguessr-rubric7.pdf";
import geoRubric8 from "./assets/geoguessr-rubric8.pdf";
import geoRubric9 from "./assets/geoguessr-rubric9.pdf";

const Example = styled.div`
  width: 80%;
  margin: 0px auto 10px;
  padding: 5px 10px;
  border: 1px dotted brown;
  border-radius: 5px;
  background-color: tan;
`;
const QuestionText = styled.td`
  padding-right: 25px;
  border-top: thin solid;
`;
const QuestionAnswer = styled.td`
  border-top: thin solid;
  padding-left: 10px;
`;
const QuestionRanges = styled.td`
  border-top: thin solid;
  padding-left: 10px;
  white-space: nowrap;
`;
const GeoguessrContainer = styled.div`
  width: 40%;
  display: inline-block;
`;
const AlbumContainer = styled.div`
  width: 40%;
  display: inline-block;
`;
const Details = styled.details`
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: tan;
`;
const LeftHeader = styled.th`
  text-align: left;
`;
const QuestionHeader = styled.th`
  text-align: left;
`;
const AnswerHeader = styled.th`
  text-align: left;
  padding-left: 10px;
`;
const SummaryLabel = styled.summary`
  font-size: 110%;
`;
const GeoguessrCell = styled.td`
  border-top: thin solid;
  text-align: center;
`;
const TopCell = styled.td`
  border-top: thin solid;
`;
const CenterCell = styled.td`
  text-align: center;
`;

export const ALL_GEOGUESSR_LOCATIONS = [
  "corner of 3-1 near building 1",
  "Great Sail, between 50 and 14N",
  "2-1, near 14N",
  "outside W20 near the Alchemist",
  "outside 26-100",
  "Baker House",
  "MIT Medical",
  "10-485",
  "outside W18",
  "Stata Center near the Collier Memorial",
  "3-1 on the Infinite",
  "16-0",
  "Simmons Hall (W79)",
  "between Westgate and Next",
  "Theta Delta Chi (Amherst Alley side)",
  "Subbasement 9",
];
const GeoguessrRubrics = [
  geoRubric1,
  geoRubric2,
  geoRubric3,
  geoRubric4,
  geoRubric5,
  geoRubric6,
  geoRubric7,
  geoRubric8,
  geoRubric9,
  geoRubric10,
  geoRubric11,
  geoRubric12,
  geoRubric13,
  geoRubric14,
  geoRubric15,
  geoRubric16,
];
const GeoguessrMaps = [
  geoMap1,
  geoMap2,
  geoMap3,
  geoMap4,
  geoMap5,
  geoMap6,
  geoMap7,
  geoMap8,
  geoMap9,
  geoMap10,
  geoMap11,
  geoMap12,
  geoMap13,
  geoMap14,
  geoMap15,
  geoMap16,
];

type Artist = {
  name: string;
  albums: [string, string, string];
};

const ALL_ARTISTS: Artist[] = [
  { name: "Taylor Swift", albums: ["Lover", "Folklore", "Reputation"] },
  {
    name: "Oasis",
    albums: [
      "Definitely Maybe",
      "(What’s the Story) Morning Glory?",
      "Be Here Now",
    ],
  },
  {
    name: "Sabrina Carpenter",
    albums: ["Singular: Act I", "Short n’ Sweet", "Singular: Act II"],
  },
  {
    name: "Third Eye Blind",
    albums: ["Third Eye Blind", "Blue", "Out of the Vein"],
  },
  { name: "ABBA", albums: ["Ring Ring", "Super Trouper", "Voulez-Vous"] },
  {
    name: "Tenacious D",
    albums: ["Post-Apocalypto", "The Pick of Destiny", "Tenacious D"],
  },
  {
    name: "Eminem",
    albums: ["The Slim Shady LP", "The Marshall Mathers LP", "Relapse"],
  },
  {
    name: "Tom Petty and the Heartbreakers",
    albums: [
      "Let Me Up (I’ve Had Enough)",
      "Into the Great Wide Open",
      "Hypnotic Eye",
    ],
  },
  {
    name: "Hootie & the Blowfish",
    albums: [
      "Fairweather Johnson",
      "Cracked Rear View",
      "Hootie & the Blowfish",
    ],
  },
  {
    name: "Elton John",
    albums: ["Goodbye Yellow Brick Road", "21 at 33", "Rock of the Westies"],
  },
  {
    name: "Our Lady Peace",
    albums: ["Clumsy", "Spiritual Machines II", "Spiritual Machines"],
  },
  {
    name: "Bad Bunny",
    albums: ["Un Verano Sin Ti", "YHLQMDLG", "El Último Tour del Mundo"],
  },
  { name: "Van Halen", albums: ["Van Halen", "Fair Warning", "5150"] },
  {
    name: "Insane Clown Posse",
    albums: ["Carnival of Carnage", "Bizaar", "The Wraith: Hell’s Pit"],
  },
  {
    name: "OutKast",
    albums: ["Stankonia", "Speakerboxxx / The Love Below", "Aquemini"],
  },
  {
    name: "U2",
    albums: ["The Joshua Tree", "Zooropa", "All That You Can’t Leave Behind"],
  },
  { name: "Santana", albums: ["Santana III", "Borboletta", "Marathon"] },
];

const scoreRanges = ({
  question,
}: {
  question: FermitQuestion & { geoguessr: null };
}):
  | undefined
  | [
      [number, number],
      [number, number],
      [number, number],
      [number, number],
      [number, number],
    ] => {
  let ranges = undefined;
  switch (question.scoringMethod) {
    case "percent":
      ranges = [
        [0.98 * question.answer, 1.02 * question.answer],
        [0.95 * question.answer, 1.05 * question.answer],
        [0.9 * question.answer, 1.1 * question.answer],
        [0.8 * question.answer, 1.2 * question.answer],
        [0.5 * question.answer, 1.5 * question.answer],
      ] as const;
      break;
    case "12345":
      ranges = [
        [question.answer - 1, question.answer + 1],
        [question.answer - 2, question.answer + 2],
        [question.answer - 3, question.answer + 3],
        [question.answer - 4, question.answer + 4],
        [question.answer - 5, question.answer + 5],
      ];
      break;
    case "12468":
      ranges = [
        [question.answer - 1, question.answer + 1],
        [question.answer - 2, question.answer + 2],
        [question.answer - 4, question.answer + 4],
        [question.answer - 6, question.answer + 6],
        [question.answer - 8, question.answer + 8],
      ];
      break;
    case "1double":
    case "2double":
    case "3double":
    case "4double":
    case "9double":
    case "10double": {
      const base = parseInt(question.scoringMethod.slice(0, -6));
      ranges = [
        [question.answer - base, question.answer + base],
        [question.answer - 2 * base, question.answer + 2 * base],
        [question.answer - 4 * base, question.answer + 4 * base],
        [question.answer - 8 * base, question.answer + 8 * base],
        [question.answer - 16 * base, question.answer + 16 * base],
      ];
      break;
    }
  }

  return ranges
    ? [
        [
          Math.round(ranges[0][0] * 100) / 100,
          Math.round(ranges[0][1] * 100) / 100,
        ],
        [
          Math.round(ranges[1][0] * 100) / 100,
          Math.round(ranges[1][1] * 100) / 100,
        ],
        [
          Math.round(ranges[2][0] * 100) / 100,
          Math.round(ranges[2][1] * 100) / 100,
        ],
        [
          Math.round(ranges[3][0] * 100) / 100,
          Math.round(ranges[3][1] * 100) / 100,
        ],
        [
          Math.round(ranges[4][0] * 100) / 100,
          Math.round(ranges[4][1] * 100) / 100,
        ],
      ]
    : undefined;
};

const QuestionBlock = ({
  question,
}: {
  question: FermitQuestion & { geoguessr: null };
}) => {
  const ranges = scoreRanges({ question });
  return (
    <tr>
      <QuestionText>{question.text}</QuestionText>
      <QuestionAnswer>
        {["all_submissions", "team_puzzle_solves"].includes(
          question.scoringMethod,
        )
          ? "N/A"
          : question.answer}
      </QuestionAnswer>
      {ranges ? (
        <QuestionRanges>
          5/5: {ranges[0][0]}–{ranges[0][1]}
          <br />
          4/5: {ranges[1][0]}–{ranges[1][1]}
          <br />
          3/5: {ranges[2][0]}–{ranges[2][1]}
          <br />
          2/5: {ranges[3][0]}–{ranges[3][1]}
          <br />
          1/5: {ranges[4][0]}–{ranges[4][1]}
        </QuestionRanges>
      ) : (
        <QuestionAnswer>
          (This question was live-scored from the current state of the Hunt
          based on percent error — within 2%, 5%, 10%, 20%, and 50% for 5/5,
          4/5, 3/5, 2/5, and 1/5 respectively.)
        </QuestionAnswer>
      )}
    </tr>
  );
};

const ArtistBlock = ({ artist, index }: { artist: Artist; index: number }) => {
  const { name, albums } = artist;

  return (
    <>
      <tr>
        <TopCell rowSpan={3}>{index + 1}</TopCell>
        <TopCell rowSpan={3}>{name}</TopCell>
        <TopCell>{albums[0]}</TopCell>
        <TopCell>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <span key={n}>
              <a
                href={albumLookup[index]?.[0]?.[n]}
                target="_blank"
                rel="noreferrer"
              >
                {n}
              </a>{" "}
            </span>
          ))}
        </TopCell>
      </tr>
      <tr>
        <td>{albums[1]}</td>
        <td>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <span key={n}>
              <a
                href={albumLookup[index]?.[1]?.[n]}
                target="_blank"
                rel="noreferrer"
              >
                {n}
              </a>{" "}
            </span>
          ))}
        </td>
      </tr>
      <tr>
        <td>{albums[2]}</td>
        <td>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <span key={n}>
              <a
                href={albumLookup[index]?.[2]?.[n]}
                target="_blank"
                rel="noreferrer"
              >
                {n}
              </a>{" "}
            </span>
          ))}
        </td>
      </tr>
    </>
  );
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Teams were asked to send up to three team members to participate in the
        FerMIT Challenge, “the Mystery Hunt’s approximately-first estimation
        game show.” Questions in the game show are geoguessr and estimation
        style questions, all about MIT, where accuracy is measurable.
      </p>

      <Example>
        Example questions:
        <ul>
          <li>How many windows are there on the outside of Stata?</li>
          <li>
            How many non-overlapping Great Domes could you fit onto Briggs and
            O’Brien Fields? Assume that domes must lie on the ground in normal
            dome orientation.
          </li>
          <li>
            <div>Where is this location on campus?</div>
            <div style={{ textAlign: "center" }}>
              <GeoguessrContainer>
                <LinkedImage src={geoguessrLookup[9]} alt="geoguessr 3" />
              </GeoguessrContainer>
            </div>
          </li>
        </ul>
      </Example>

      <p>
        After the interaction, the teams’ puzzle pages will update showing how
        well they did on each question (from 0 to 5), along with an image
        consisting of a number of single-color shapes. The number of shapes (and
        therefore the image fidelity) will depend on how close the team’s answer
        was. A couple of examples are shown below.
      </p>

      <Example>
        <table>
          <tr>
            <th>Question 1</th>
            <th>Question 2</th>
          </tr>
          <tr>
            <CenterCell>Score: 0/5</CenterCell>
            <CenterCell>Score: 3/5</CenterCell>
          </tr>
          <tr>
            <CenterCell>
              <AlbumContainer>
                <LinkedImage src={albumLookup[0][0][0]} alt="Lover 0/5" />
              </AlbumContainer>
            </CenterCell>
            <CenterCell>
              <AlbumContainer>
                <LinkedImage
                  src={albumLookup[1][0][3]}
                  alt="Definitely Maybe 3/5"
                />
              </AlbumContainer>
            </CenterCell>
          </tr>
        </table>
      </Example>

      <p>
        Each image turns out to be an album cover. The two shown above are{" "}
        <i>Lover</i> and <i>Definitely Maybe</i>.
      </p>

      <p>
        Teams can schedule repeat visits in order to do better. The next time
        they participate, many of the questions will be different, and the
        images they receive will also be different. Examples for the second run:
      </p>

      <Example>
        <table>
          <tr>
            <th>Question 1</th>
            <th>Question 2</th>
          </tr>
          <tr>
            <td>Score: 3/5</td>
            <td>Score: 2/5</td>
          </tr>
          <tr>
            <CenterCell>
              <AlbumContainer>
                <LinkedImage
                  src={albumLookup[0][1][3] ?? ""}
                  alt="Folklore 3/5"
                />
              </AlbumContainer>
            </CenterCell>
            <CenterCell>
              <AlbumContainer>
                <LinkedImage
                  src={albumLookup[1][1][2] ?? ""}
                  alt="(What’s the Story) Morning Glory? 2/5"
                />
              </AlbumContainer>
            </CenterCell>
          </tr>
        </table>
      </Example>

      <p>
        These albums are <i>Folklore</i> and{" "}
        <i>(What’s the Story) Morning Glory?</i>.
      </p>

      <p>
        It turns out that Question 1 will always show a Taylor Swift album,
        regardless of what the quiz show question actually asked. Question 2
        will always show an Oasis album, and so on. There are three total albums
        per artist that are shown on a rotation, so that a team will need to
        participate four times in order to see any repeats.
      </p>

      <p>
        To extract the answer, take the first letter of each artist name. The
        answer is <PuzzleAnswer>TO STATE THE OBVIOUS</PuzzleAnswer>.
      </p>

      <h3>Authors’ Note</h3>
      <p>
        Our original plan for the quiz show was to visit teams in their
        headquarters. This would allow the entire team to participate if they
        wanted, and also simplify our scoring logistics significantly. However,
        our testsolvers seemed to have so much fun that we instead decided to
        open it up to everyone via the Stray Leads. We hope that everyone who
        participated enjoyed!
      </p>

      <h3>Acknowledgements</h3>
      <p>
        The image fuzzing mechanic was inspired by{" "}
        <a href="https://gordianbla.de/" target="_blank" rel="noreferrer">
          Gordian Blade
        </a>{" "}
        and implemented using the{" "}
        <a
          href="https://github.com/fogleman/primitive"
          target="_blank"
          rel="noreferrer"
        >
          primitive
        </a>{" "}
        library by fogleman.
      </p>

      <h3>Appendices</h3>

      <Details>
        <SummaryLabel>All Questions</SummaryLabel>
        <table>
          <tr>
            <QuestionHeader>Question</QuestionHeader>
            <AnswerHeader>Answer</AnswerHeader>
            <AnswerHeader>Score Ranges (inclusive)</AnswerHeader>
          </tr>
          {ALL_QUESTIONS.filter(
            (q): q is FermitQuestion & { geoguessr: null } =>
              q.geoguessr === null,
          ).map((q, idx) => (
            <QuestionBlock question={q} key={idx} />
          ))}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((g) => (
            <tr key={g}>
              <GeoguessrCell>
                <GeoguessrContainer>
                  <LinkedImage
                    src={geoguessrLookup[g - 1] ?? ""}
                    alt={"geoguessr " + g.toString()}
                  />
                </GeoguessrContainer>
              </GeoguessrCell>
              <QuestionAnswer>{ALL_GEOGUESSR_LOCATIONS[g - 1]}</QuestionAnswer>
              <QuestionAnswer>
                <a href={GeoguessrMaps[g - 1]} target="_blank" rel="noreferrer">
                  Map
                </a>
                <br />
                <a
                  href={GeoguessrRubrics[g - 1]}
                  target="_blank"
                  rel="noreferrer"
                >
                  Scoring Rubric{g === 1 && " (for printing on transparency)"}
                </a>
              </QuestionAnswer>
            </tr>
          ))}
        </table>
      </Details>

      <Details>
        <SummaryLabel>All Albums</SummaryLabel>
        <table>
          <tr>
            <LeftHeader>Index</LeftHeader>
            <LeftHeader>Artist</LeftHeader>
            <LeftHeader>Album</LeftHeader>
            <LeftHeader>Fuzzed Images</LeftHeader>
          </tr>
          {ALL_ARTISTS.map((artist, idx) => (
            <ArtistBlock artist={artist} index={idx} key={idx} />
          ))}
        </table>
      </Details>
    </>
  );
};

export default Solution;

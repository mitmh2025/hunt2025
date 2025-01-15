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

const ALL_GEOGUESSR_LOCATIONS = [
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

const QuestionBlock = ({ question }: { question: FermitQuestion }) => {
  return (
    <tr>
      <QuestionText>{question.text}</QuestionText>
      <QuestionAnswer>{question.answer}</QuestionAnswer>
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
          </tr>
          {ALL_QUESTIONS.filter((q) => q.geoguessr === null).map((q, idx) => (
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

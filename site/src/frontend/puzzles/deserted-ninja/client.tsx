import React from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import useAppendDataset from "../../client/useAppendDataset";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

type ScoreEntryData = {
  sessionId: number;
  scores: number[];
  iteration: number;
  imageUrls: string[];
};

type ScoreEntry = {
  id: number;
  data: ScoreEntryData;
};

const Details = styled.details`
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
`;
const ResultLabel = styled.summary`
  font-size: 150%;
`;
const QuestionScoreRow = styled.div`
  display: flex;
  margin-top: 10px;
`;
const QuestionLabel = styled.div`
  text-decoration: underline;
  margin-right: 10px;
`;
const QuestionResult = styled.div`
  font-weight: bold;
`;
const StyledImageContainer = styled.div`
  text-align: center;
`;
const StyledImage = styled.img`
  width: 80%;
`;
const CTAInstructions = styled.div`
  margin: 10px 0px;
`;
const CTATiming = styled.div`
  margin: 20px 0px 10px;
`;

const Result = ({ data }: { data: ScoreEntryData }) => {
  const entries = [];

  for (let i = 0; i < 17; i++) {
    entries.push(
      <div key={i}>
        <QuestionScoreRow>
          <QuestionLabel>Question {i + 1}</QuestionLabel>
          <QuestionResult>{data.scores[i]} / 5</QuestionResult>
        </QuestionScoreRow>
        <StyledImageContainer>
          <StyledImage src={data.imageUrls[i]} alt="" />
        </StyledImageContainer>
      </div>,
    );
  }

  return (
    <Details>
      <ResultLabel>Visit number {data.iteration + 1}</ResultLabel>
      {entries}
    </Details>
  );
};

const App = () => {
  const log = useAppendDataset(
    "puzzle_state_log",
    { slug: "estimation_dot_jpg" },
    [] as ScoreEntry[],
  );

  const priorScores = log.map((entry, idx) => (
    <Result data={entry.data} key={idx} />
  ));

  const bottomText =
    priorScores.length > 0 ? (
      <>
        <div>
          Here&rsquo;s what you got from prior attempts. Participate again for
          approximately better results!
        </div>
        {priorScores}
      </>
    ) : (
      ""
    );

  return (
    <>
      <AuthorsNoteBlock>
        <CTAInstructions>
          <div>
            You are hereby invited to compete in the FerMIT Challenge, the
            Mystery Hunt&rsquo;s approximately-first estimation game show!
          </div>
          <div>
            Send up to three team members. Knowledge of MIT will be helpful.
          </div>
        </CTAInstructions>

        <CTATiming>
          <div>
            The FerMIT Challenge runs once per hour, on the hour, in room
            34-302.
          </div>
          <div>Friday, January 17th: 4 PM - 12 AM (hourly)</div>
          <div>Saturday, January 18th: 8 AM - 12 AM (hourly)</div>
        </CTATiming>
      </AuthorsNoteBlock>
      {bottomText}
    </>
  );
};

const elem = document.getElementById("estimation-dot-jpg-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #estimation-dot-jpg-root was nowhere to be found",
  );
}

import React from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import useAppendDataset from "../../client/useAppendDataset";

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

  console.log(log);
  const priorScores = log.map((entry, idx) => (
    <Result data={entry.data} key={idx} />
  ));

  return (
    <>
      <div>
        Please contact Hunt HQ to sign up for the FerMIT Challenge, the Mystery
        Hunt&rsquo;s approximately-first estimation game show! If you&rsquo;ve
        played before, your results can be found below.
      </div>
      {priorScores}
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

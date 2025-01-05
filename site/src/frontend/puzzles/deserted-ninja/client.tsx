import React from 'react';
import { createRoot } from "react-dom/client";
//import { styled } from 'styled-components';
import useAppendDataset from "../../client/useAppendDataset";

type ScoreEntryData = {
  sessionId: number;
  scores: number[];
  iteration: number;
};

type ScoreEntry = {
  id: number;
  data: ScoreEntryData;
};

/*
const Results = () => {
  
}
 */

const App = () => {
  const log = useAppendDataset(
    "puzzle_state_log",
    { slug: "estimation_dot_jpg" },
    [] as ScoreEntry[],
  );

  console.log(log);
  const priorScores = 
    log.map( ({data}) =>
      <div key={data.sessionId}>
        <div>Iteration {data.iteration}</div>
        <div>Scores: {data.scores.toString()}</div>
      </div>
    );
  
  return (
    <>
      <div>
        Please contact Hunt HQ to sign up for the FerMIT Challenge, the Mystery Hunt's approximately-first estimation game show!
        If you've played before, your results can be found below.
      </div>
      {priorScores}
    </>
  );
};

const elem = document.getElementById("estimation-dot-jpg-root");
if (elem) {
  const root = createRoot(elem)
  root.render(<App />);
}
else {
  console.error("Could not mount App because #estimation-dot-jpg-root was nowhere to be found");
}

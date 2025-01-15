import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";

const SuperCounterDiv = styled.div`
  display: flex;
`;

const CounterDiv = styled.div`
  display: grid;
  padding: auto;
  text-align: center;
  color: black;
  margin: 10px;
  width: 120px;
  height: 120px;
`;

const CenteredInsideThisDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const KickoffDivWithText = styled.div`
  text-align: center;
  font-size: 2.5em;
`;

const InsideTextDiv = styled.div`
  display: grid;
  align-items: center;
`;

const TinyTextDiv = styled.div`
  font-size: 0.6em;
  text-align: center;
`;

type ApiResponse = {
  results: [Record<string, number>];
  error?: string;
};

const Room = ({ name, slug }: { name: string; slug: string }) => {
  const [occupancy, setOccupancy] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [color, setColor] = useState("#fff");
  const apiUrl = "https://api.beamian.com/api/v2/spaces?slug=" + slug;

  const hitApi = useCallback(() => {
    fetch(apiUrl, {
      mode: "cors",
      method: "GET",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        const capacity: number = data.results[0].capacity ?? 0;
        const current: number = data.results[0].current ?? 0;
        const ratio = capacity > 0 ? current / capacity : 1;
        setCapacity(capacity);
        setOccupancy(current);

        if (ratio > 0.8) {
          setColor("red");
        } else if (ratio > 0.5 && ratio <= 0.8) {
          setColor("#d0d081");
        } else {
          setColor("green");
        }
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, [apiUrl]);

  // first immediate update
  hitApi();

  // now update every 5 seconds
  useEffect(() => {
    const interval = setInterval(hitApi, 5000);
    return () => { clearInterval(interval); };
  }, [hitApi]);

  return (
    <>
      <CounterDiv style={{ background: color }}>
        <InsideTextDiv style={{ fontSize: "1.5rem" }}>{name}</InsideTextDiv>
        <InsideTextDiv style={{ fontSize: "1.25rem" }}>
          {occupancy} / {capacity}
        </InsideTextDiv>
      </CounterDiv>
    </>
  );
};

const App = () => {
  return (
    <>
      <div style={{ marginBottom: "50px" }}>
        <KickoffDivWithText>Kickoff room capacities:</KickoffDivWithText>
        <CenteredInsideThisDiv>
          <SuperCounterDiv>
            <Room name="10-250" slug="clear-cup" />
            <Room name="34-101" slug="black-keyboard" />
            <Room name="45-230" slug="white-glue" />
          </SuperCounterDiv>
        </CenteredInsideThisDiv>
        <TinyTextDiv>Thanks to Beamian for their API!</TinyTextDiv>
      </div>
    </>
  );
};

const elem = document.getElementById("kickoff-counter-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #kickoff-counter-root was nowhere to be found",
  );
}

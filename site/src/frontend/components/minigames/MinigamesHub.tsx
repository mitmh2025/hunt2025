import React from "react";
import { styled } from "styled-components";
import SpinnerTimer from "../SpinnerTimer";
import { Button } from "../StyledUI";
import BalloonPop from "./BalloonPop";
import LuckyDuck from "./LuckyDuck";
import Skeeball from "./Skeeball";

type GameType = "balloon" | "duck" | "skeeball";

const onFirstInteractionStub = () => {
  // stub function
};
const onWinStub = () => {
  // stub function
};

const ButtonHolder = styled.div`
  display: flex;
`;

const TimerHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const MinigamesHub = () => {
  const [game, setGame] = React.useState<GameType | null>(null);
  return (
    <>
      <p>Minigames from the Boardwalk virtual interaction.</p>
      <ButtonHolder>
        <Button
          onClick={() => {
            setGame("balloon");
          }}
        >
          Balloon Pop
        </Button>
        <Button
          onClick={() => {
            setGame("duck");
          }}
        >
          Lucky Duck
        </Button>
        <Button
          onClick={() => {
            setGame("skeeball");
          }}
        >
          Skeeball
        </Button>
      </ButtonHolder>

      {game === "balloon" && (
        <>
          <TimerHolder>
            <SpinnerTimer
              width={80}
              height={80}
              startTime={Date.now()}
              endTime={Date.now() + 30000}
              color="#f8f8f6"
            />
          </TimerHolder>
          <BalloonPop
            onFirstInteraction={onFirstInteractionStub}
            onWin={onWinStub}
          />
        </>
      )}

      {game === "duck" && (
        <>
          <TimerHolder>
            <SpinnerTimer
              width={80}
              height={80}
              startTime={Date.now()}
              endTime={Date.now() + 30000}
              color="#f8f8f6"
            />
          </TimerHolder>
          <LuckyDuck
            onFirstInteraction={onFirstInteractionStub}
            onWin={onWinStub}
          />
        </>
      )}

      {game === "skeeball" && (
        <>
          <TimerHolder>
            <SpinnerTimer
              width={80}
              height={80}
              startTime={Date.now()}
              endTime={Date.now() + 30000}
              color="#f8f8f6"
            />
          </TimerHolder>
          <Skeeball
            onFirstInteraction={onFirstInteractionStub}
            onWin={onWinStub}
          />
        </>
      )}
    </>
  );
};

export default MinigamesHub;

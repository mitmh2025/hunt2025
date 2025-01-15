import React from "react";
import { styled } from "styled-components";

import BalloonPop from "./BalloonPop";
import LuckyDuck from "./LuckyDuck";
import { Button } from "../StyledUI";

type GAME = "Balloon Pop" | "Lucky Duck";

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;

const Games = () => {
  const [currentGame, setCurrentGame] = React.useState<GAME | null>(null);
  return (
    <>
      <Buttons>
        <Button onClick={() => setCurrentGame("Balloon Pop")}>
          Balloon Pop
        </Button>
        <Button onClick={() => setCurrentGame("Lucky Duck")}>Lucky Duck</Button>
      </Buttons>
      {currentGame === "Balloon Pop" && <BalloonPop />}
      {currentGame === "Lucky Duck" && <LuckyDuck />}
    </>
  );
};

export default Games;

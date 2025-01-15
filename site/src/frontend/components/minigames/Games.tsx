import React from "react";
import { styled } from "styled-components";
import { DarkStyledDialog } from "../StyledDialog";
import { Button } from "../StyledUI";
import BalloonPop from "./BalloonPop";
import LuckyDuck from "./LuckyDuck";
import Skeeball from "./Skeeball";

type GAME = "Balloon Pop" | "Lucky Duck" | "Skeeball";

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;

const Wrapper = styled.main`
  width: 100%;
  margin: 0 auto;

  .help-text {
    text-align: center;
    margin: 1rem;
    font-size: 1rem;
  }
`;

const Games = () => {
  const [currentGame, setCurrentGame] = React.useState<GAME | null>(null);
  return (
    <Wrapper>
      <Buttons>
        <Button
          onClick={() => {
            setCurrentGame("Balloon Pop");
          }}
        >
          Balloon Pop
        </Button>
        <Button
          onClick={() => {
            setCurrentGame("Lucky Duck");
          }}
        >
          Lucky Duck
        </Button>
        <Button
          onClick={() => {
            setCurrentGame("Skeeball");
          }}
        >
          Skeeball
        </Button>
      </Buttons>
      <DarkStyledDialog
        open={!!currentGame}
        onClose={() => {
          // void onClose(null);
        }}
      >
        <div
          style={{
            margin: "auto",
            width: "800px",
            maxWidth: "72vw",
            textWrap: "wrap",
          }}
        >
          {currentGame === "Balloon Pop" && <BalloonPop />}
          {currentGame === "Lucky Duck" && <LuckyDuck />}
          {currentGame === "Skeeball" && <Skeeball />}
          <p className="help-text">
            {currentGame === "Lucky Duck" && "Click the duck before time's up!"}
            {currentGame === "Balloon Pop" &&
              "Hover to pop balloons before time's up!"}
            {currentGame === "Skeeball" &&
              "Click to throw. Aim for the center of the velocity target!"}
          </p>
        </div>
      </DarkStyledDialog>
    </Wrapper>
  );
};

export default Games;

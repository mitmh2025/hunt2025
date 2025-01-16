import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import pop1 from "./balloonPopAssets/balloonSounds/pop1.mp3";
import pop2 from "./balloonPopAssets/balloonSounds/pop2.mp3";
import pop3 from "./balloonPopAssets/balloonSounds/pop3.mp3";
import pop4 from "./balloonPopAssets/balloonSounds/pop4.mp3";
import pop5 from "./balloonPopAssets/balloonSounds/pop5.mp3";
import pop6 from "./balloonPopAssets/balloonSounds/pop6.mp3";
import pop7 from "./balloonPopAssets/balloonSounds/pop7.mp3";
import getConfetti from "./confetti";

const BALLOON_WIDTH = 24;
const BALLOON_HEIGHT = Math.floor((BALLOON_WIDTH * 4) / 3);
const WIDTH = 30 * BALLOON_WIDTH;
const HEIGHT = 15 * BALLOON_HEIGHT;

const Wrapper = styled.main`
  width: ${WIDTH + 8}px;
  margin: 0 auto;

  /* svg {
    width: 100%;
    font-size: 48px;
    font-family: var(--headline-font);
    fill: var(--gold-600);
  } */
`;

const Scores = styled.div`
  text-align: center;
  margin: 0 auto;
  /* margin-top: -4rem; */
  margin-bottom: 1rem;

  h2 {
    padding: 0;
    font-size: 2.5rem;
  }

  .score {
    color: var(--gold-500);
    font-size: 1.25em;
  }
`;

const Frame = styled.div`
  width: ${WIDTH + 8}px;
  height: ${HEIGHT}px;
  background-color: #423b26;
  border: 8px solid #292319;

  table {
    border-collapse: collapse;
    cursor: pointer;
    margin-top: -2px;
    margin-left: -2px;
  }

  td {
    width: fit-content;
    height: fit-content;
    padding: 0;
  }
`;

const Balloon = styled.div`
  width: ${BALLOON_WIDTH - 2}px;
  aspect-ratio: 3 / 4;
  border-radius: 100% / 80% 80% 125% 125%;
  background-color: var(--gold-400);
  background: radial-gradient(
    circle at 25% 20%,
    white 0%,
    var(--gold-400) 25%,
    var(--gold-600) 90%
  );
  border: 1px solid var(--gold-900);
  box-shadow: 1px 2px 4px #00000044;
  margin: 0 2px 2px 0;
`;

type Balloon = {
  id: string;
  popped?: boolean;
  soundId: number;
  color: string;
};

const COLORS = [
  "#5ebb80",
  "#d69a8e",
  "#118690",
  "#d1512e",
  "#a562bd",
  "#26a7de",
  "#b88113",
  "#c8d816",
];

const SOUNDS = [pop1, pop2, pop3, pop4, pop5, pop6, pop7];

function getRandomSelection(n: number) {
  return Math.floor(Math.random() * n);
}

function makeBalloons(): Balloon[] {
  const balloons = [];
  for (
    let i = 0;
    i < Math.floor(WIDTH / BALLOON_WIDTH) * Math.floor(HEIGHT / BALLOON_HEIGHT);
    i += 1
  ) {
    balloons.push({
      id: `balloon-${i}`,
      color: COLORS[getRandomSelection(COLORS.length)] ?? "var(--gold-400)",
      soundId: getRandomSelection(SOUNDS.length),
    });
  }
  return balloons;
}

const TARGET = 350;

const BalloonPop = ({
  onFirstInteraction,
  onWin,
}: {
  onFirstInteraction: () => void;
  onWin: () => void;
}) => {
  const [balloons, setBalloons] = useState<Balloon[]>(makeBalloons());
  const hasFiredFirstInteraction = React.useRef(false);
  const hasFiredWin = React.useRef(false);

  function pop(i: number) {
    const audio: HTMLAudioElement | null = document.getElementById(
      `sound-${balloons[i]?.soundId}`,
    ) as HTMLAudioElement | null;
    if (audio) {
      void audio.play();
    }
    setBalloons((balloons) => {
      return balloons.map((b, j) => {
        if (j === i) {
          return { ...b, popped: true };
        }
        return b;
      });
    });

    if (!hasFiredFirstInteraction.current) {
      onFirstInteraction();
      hasFiredFirstInteraction.current = true;
    }
  }

  const balloonRows: Balloon[][] = [];
  while (balloonRows.length < HEIGHT / BALLOON_HEIGHT) {
    balloonRows.push(
      balloons.slice(
        balloonRows.length * (WIDTH / BALLOON_WIDTH),
        (balloonRows.length + 1) * (WIDTH / BALLOON_WIDTH),
      ),
    );
  }
  const score = balloons.filter((b) => b.popped).length;
  const remainingToTarget = Math.max(0, TARGET - score);

  useEffect(() => {
    if (!hasFiredWin.current && remainingToTarget === 0) {
      getConfetti();
      onWin();
      hasFiredWin.current = true;
    }
  }, [remainingToTarget, onWin]);

  return (
    <Wrapper>
      {/* <svg viewBox="0 0 500 150">
        <path
          id="curve"
          d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
          fill="transparent"
        />
        <text width="500">
          <textPath xlinkHref="#curve">POP THE BALLOON</textPath>
        </text>
      </svg> */}
      <Scores>
        <h2>
          Pop <span className="score">{Math.max(0, remainingToTarget)}</span>{" "}
          {score === balloons.length && "🎉"}
        </h2>
      </Scores>
      <Frame>
        <table>
          {balloonRows.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((balloon, j) => (
                <td key={`cell-${i}-${j}`}>
                  <Balloon
                    key={balloon.id}
                    onMouseEnter={() => {
                      pop(i * (WIDTH / BALLOON_WIDTH) + j);
                    }}
                    style={{
                      visibility: balloon.popped ? "hidden" : "visible",
                      backgroundColor: balloon.color,
                      background: `radial-gradient(
                      circle at 25% 20%,
                      white 0%,
                      ${balloon.color} 25%,
                      hsl(from ${balloon.color} h s calc(l - 0.6) / 1) 75%
                    )`,
                      borderColor: `hsl(from ${balloon.color} h s calc(l - 0.9) / 1)`,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </table>
      </Frame>
      {/* eslint-disable jsx-a11y/media-has-caption -- sound effect */}
      {SOUNDS.map((sound, i) => (
        <audio key={sound} id={`sound-${i + 1}`} src={sound} preload="auto" />
      ))}
      {/* eslint-enable jsx-a11y/media-has-caption -- sound effect */}
    </Wrapper>
  );
};

export default BalloonPop;

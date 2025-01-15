import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import getConfetti from "./confetti";
import duckLeft from "./luckyDuckAssets/duck-left.png";
import duckRight from "./luckyDuckAssets/duck-right.png";
import quack from "./luckyDuckAssets/quack.mp3";
import caption from "./luckyDuckAssets/quack.vtt";

type duckLocale = {
  x: number;
  y: number;
  facing: "left" | "right";
};

function fleeSpeed(score: number): number {
  const speeds = [0.9, 0.8, 0.7, 0.6, 0.5];

  if (score >= 0 && score < speeds.length) {
    return speeds[score]!;
  }

  return 0.5 * (1 / Math.pow(1.5, score - 8));
}

function fleeThreshold(): number {
  return 50 - 50 / Math.exp(3 / 10);
}

const Wrapper = styled.main`
  width: 100%;
  margin: 0 auto;

  svg {
    position: absolute;
  }
`;

const GameBoard = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  background-color: var(--gray-100);
  background: linear-gradient(to top, var(--gray-400), var(--white));
  cursor: grab;
  overflow: hidden;
`;

const Water = styled.div`
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: #16439ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: url("#turbulence");
`;

const Duck = styled.div`
  position: absolute;
  cursor: grab;
  user-select: none;
  transition:
    top ${fleeSpeed(1)}s ease-in-out,
    left ${fleeSpeed(1)}s ease-in-out;
`;

const YouWin = styled.h2<{ $isWinner: boolean }>`
  font-size: 10rem;
  color: yellow;
  user-select: none;
  opacity: ${({ $isWinner }: { $isWinner: boolean }) =>
    $isWinner ? "1" : "0.3"};
  text-align: center;
  line-height: 1;
  display: block;
  font-weight: 900;
`;

const DuckImg = styled.img`
  position: absolute;
  user-select: none;
`;

const DUCK_WIDTH = 52;
const DUCK_HEIGHT = 40;
const DUCK_OFFSET = 20;

function layOutImage(count: number, i: number): { top: number; left: number } {
  const cols = Math.ceil(Math.sqrt(count));
  const row = Math.floor(i / cols);
  const col = i % cols;

  return {
    top: DUCK_OFFSET * row,
    left: DUCK_OFFSET * col,
  };
}

function duckSize(count: number): { width: number; height: number } {
  const { top, left } = layOutImage(count, count - 1);
  return {
    width: DUCK_WIDTH + left,
    height: DUCK_HEIGHT + top,
  };
}

export default function Game() {
  const [duckLocation, setDuckLocation] = useState<duckLocale>({
    x: 0,
    y: 0,
    facing: "left",
  });
  const [isWinner, setIsWinner] = useState<boolean>(false);

  useLayoutEffect(() => {
    setDuckLocation({
      x: (window.innerWidth - DUCK_WIDTH) / 2,
      y: (window.innerHeight - DUCK_HEIGHT) / 2,
      facing: "left",
    });
  }, []);

  const gameBoardRef = useRef<HTMLDivElement>(null);
  const duckRef = useRef<HTMLDivElement>(null);
  const isFleeing = useRef(false);
  const quackRef = useRef<HTMLAudioElement | null>(null);

  function flee() {
    if (isFleeing.current) {
      return;
    }

    const boardWidth = gameBoardRef.current!.offsetWidth;
    const boardHeight = gameBoardRef.current!.offsetHeight;

    const duckWidth = duckRef.current!.offsetWidth;
    const duckHeight = duckRef.current!.offsetHeight;

    const maxLeft = boardWidth - duckWidth;
    const maxTop = boardHeight - duckHeight;

    // compute 10 possible locations, then pick the farthest away
    const duckCenter = {
      x: Number(duckRef.current!.offsetLeft) + duckWidth / 2,
      y: Number(duckRef.current!.offsetTop) + duckHeight / 2,
      facing: duckLocation.facing,
    };

    // winner goes to the middle and just stays there
    if (isWinner) {
      const x = maxLeft / 2;
      setDuckLocation({
        x,
        y: maxTop / 2,
        facing: x - duckCenter.x > 0 ? "right" : "left",
      });
      isFleeing.current = true;
      return;
    } else {
      let currentMax = 0;
      let currentMaxCandidate: duckLocale = { ...duckCenter };

      // compute 10 possible locations, then pick the farthest away
      let i = 0;
      while (i < 10) {
        const x = Math.random() * maxLeft;
        const c: duckLocale = {
          x,
          y: Math.random() * maxTop,
          facing: x - duckCenter.x > 0 ? "right" : "left",
        };
        const magnitude = Math.sqrt(
          Math.abs(c.x - duckCenter.x) * Math.abs(c.y - duckCenter.y),
        );
        if (magnitude > currentMax) {
          currentMax = magnitude;
          currentMaxCandidate = c;
        }
        i += 1;
      }

      setDuckLocation(currentMaxCandidate);

      isFleeing.current = true;
    }
  }

  useEffect(() => {
    function onMouseMove(evt: MouseEvent) {
      const duckPos = duckRef.current!.getBoundingClientRect();
      const threshold = fleeThreshold();

      if (
        (evt.clientX > duckPos.left &&
          evt.clientX < duckPos.right &&
          evt.clientY > duckPos.top &&
          evt.clientY < duckPos.bottom) ||
        Math.abs(duckPos.left - evt.clientX) < threshold ||
        Math.abs(duckPos.right - evt.clientX) < threshold ||
        Math.abs(duckPos.top - evt.clientY) < threshold ||
        Math.abs(duckPos.bottom - evt.clientY) < threshold
      ) {
        flee();
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const duckCount = 1;
  const { width, height } = duckSize(duckCount);

  let i = 0;
  const ducks = [];
  while (i < duckCount) {
    ducks.push(
      <DuckImg
        src={duckLocation.facing === "right" ? duckRight : duckLeft}
        style={layOutImage(duckCount, i)}
        alt=""
        key={i}
        draggable={false}
      />,
    );
    i += 1;
  }

  return (
    <Wrapper>
      <GameBoard ref={gameBoardRef}>
        <Water>
          <YouWin $isWinner={isWinner}>
            {isWinner ? "YOU WIN!!!" : "CATCH THAT DUCK!"}
          </YouWin>
        </Water>
        <Duck
          style={{
            top: duckLocation.y,
            left: duckLocation.x,
            width: width,
            height: height,
          }}
          ref={duckRef}
          onClick={() => {
            setIsWinner(true);
            if (quackRef.current) {
              quackRef.current.currentTime = 0;
              quackRef.current.play();
            }
            getConfetti();
          }}
          onTransitionEnd={(evt) => {
            if (evt.propertyName === "left") {
              isFleeing.current = false;
            }
          }}
        >
          {ducks}
        </Duck>
      </GameBoard>
      <svg className="filter">
        <filter id="turbulence" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            id="sea-filter"
            numOctaves="3"
            seed="2"
            baseFrequency="0.02 0.05"
          ></feTurbulence>
          <feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap>
          <animate
            xlinkHref="#sea-filter"
            attributeName="baseFrequency"
            dur="60s"
            keyTimes="0;0.5;1"
            values="0.02 0.06;0.04 0.08;0.02 0.06"
            repeatCount="indefinite"
          ></animate>
        </filter>
      </svg>
      <audio ref={quack} id="crash" src={quack} preload="auto">
        <track default kind="captions" srcLang="en" src={caption} />
      </audio>
    </Wrapper>
  );
}

import React from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import { MurderFonts } from "./MurderFonts";
import SkylineBg from "./assets/murder-bg.png";
import { type MurderState } from "./types";
import SparkleComponent, { SparkleProps } from "./Sparkle";

const WIDTH = 1920;
const HEIGHT = 1415;

export function proportionify(size: number) {
  return `calc(${size} * min(calc(min(100vw, ${WIDTH}px) / ${WIDTH}), calc(min(calc(100vh - 3rem), ${HEIGHT}px) / ${HEIGHT})))`;
}

const MurderWrapper = styled.div`
  width: ${proportionify(WIDTH)};
  background-color: var(--teal-700);
  margin: 0 auto;
`;

const CityWrapper = styled.div`
  background-color: var(--purple-800);
  width: ${proportionify(WIDTH)};
  height: ${proportionify(HEIGHT)};
  position: relative;
  overflow: hidden;

  h1 {
    font-family: "Eccentric";
    font-size: ${proportionify(140)};
    color: var(--purple-300);
    padding: ${proportionify(8)} 0 0 ${proportionify(16)};
  }
`;

const MurderCityBg = styled.img`
  width: ${proportionify(WIDTH)};
  position: absolute;
  bottom: 0;
  left: 0;
`;

const SPARKLES: SparkleProps[] = [
  {
    pos: { x: 26, y: 177 },
    startWidth: 54,
    color: "var(--purple-500)",
    delay: 0.4,
  },
  {
    pos: { x: 162, y: 324 },
    startWidth: 55,
    delay: 0.15,
  },
  {
    pos: { x: 199, y: 215 },
    startWidth: 30,
    delay: 0.8,
  },
  {
    pos: { x: 253, y: 234 },
    startWidth: 60,
    color: "var(--white)",
    delay: 0.41,
  },
  {
    pos: { x: 437, y: 507 },
    startWidth: 47,
    color: "var(--purple-300)",
    delay: 0.9,
  },
  {
    pos: { x: 505, y: 436 },
    startWidth: 55,
    color: "var(--purple-500)",
    delay: 0.3,
  },
  {
    pos: { x: 639, y: 171 },
    startWidth: 40,
    color: "var(--purple-300)",
    delay: 0.78,
  },
  {
    pos: { x: 1109, y: 453 },
    startWidth: 64,
    delay: 0.2,
  },
  {
    pos: { x: 1225, y: 243 },
    startWidth: 90,
    color: "var(--white)",
    delay: 0.02,
  },
  {
    pos: { x: 1323, y: 230 },
    startWidth: 49,
    color: "var(--purple-500)",
    delay: 0.9,
  },
  {
    pos: { x: 1327, y: 509 },
    startWidth: 58,
    color: "var(--purple-300)",
    delay: 0.6,
  },
  {
    pos: { x: 1436, y: 21 },
    startWidth: 40,
    color: "var(--white)",
    delay: 0.33,
  },
  {
    pos: { x: 1478, y: 71 },
    startWidth: 66,
    color: "var(--purple-500)",
    delay: 0.75,
  },
  {
    pos: { x: 1671, y: 384 },
    startWidth: 46,
    delay: 0.48,
  },
  {
    pos: { x: 1694, y: 698 },
    startWidth: 42,
    delay: 0.85,
  },
  {
    pos: { x: 1796, y: 223 },
    startWidth: 40,
    color: "var(--white)",
    delay: 0.1,
  },
  {
    pos: { x: 1840, y: 280 },
    startWidth: 40,
    color: "var(--purple-500)",
    delay: 0.67,
  },
];

const MurderBody = ({
  state,
  teamState,
}: {
  state: MurderState;
  teamState: TeamHuntState;
}) => {
  // const items = (
  //   <ul>
  //     {state.items.map((item) => {
  //       const slug = item.slug;
  //       const puzzleState = teamState.puzzles[slug];
  //       return (
  //         <li key={item.slug}>
  //           <PuzzleLink
  //             lockState={puzzleState?.locked ?? "locked"}
  //             answer={puzzleState?.answer}
  //             currency={teamState.currency}
  //             title={item.title}
  //             slug={item.slug}
  //             desc={item.desc}
  //           />
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );
  return (
    <MurderWrapper key="murder">
      <MurderFonts />
      <CityWrapper>
        <MurderCityBg src={SkylineBg} />
        <h1>The Murder in MITropolis</h1>
        {SPARKLES.map((s) => (
          <SparkleComponent {...s} />
        ))}
      </CityWrapper>
    </MurderWrapper>
  );
};

export default MurderBody;

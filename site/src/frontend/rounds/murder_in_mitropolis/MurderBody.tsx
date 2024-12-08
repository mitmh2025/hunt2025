import React from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { MurderFonts } from "./MurderFonts";
import SkylineBg from "./assets/murder-bg.png";
import StarsBgLeft from "./assets/stars-left.gif";
import StarsBgRight from "./assets/stars-right.gif";
import { type MurderState } from "./types";

const MurderWrapper = styled.div`
  min-height: calc(100vh - 48px);
  width: 100%;
  max-width: 1920px;
  background-color: var(--teal-700);
`;

const CityWrapper = styled.div`
  background-color: var(--purple-800);
  width: 100%;
  height: calc(100vw * 1415 / 1920);
  max-height: 1415px;
  max-width: 1920px;
  position: relative;

  h1 {
    font-family: "Eccentric";
    font-size: min(5vw, 92px);
    color: var(--purple-300);
    padding: 0;
    padding-left: 1rem;
  }
`;

const StarsLeft = styled.img`
  position: absolute;
  top: -2%;
  left: 0;
  width: 39%;
  max-width: 749px;
`;

const StarsRight = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 44%;
  max-width: 844px;
`;

const MurderCityBg = styled.img`
  width: 100%;
  max-width: 1920px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const MurderBody = ({
  state,
  teamState,
}: {
  state: MurderState;
  teamState: TeamHuntState;
}) => {
  const items = (
    <ul>
      {state.items.map((item) => {
        const slug = item.slug;
        const puzzleState = teamState.puzzles[slug];
        return (
          <li key={item.slug}>
            <PuzzleLink
              lockState={puzzleState?.locked ?? "locked"}
              answer={puzzleState?.answer}
              currency={teamState.currency}
              title={item.title}
              slug={item.slug}
              desc={item.desc}
            />
          </li>
        );
      })}
    </ul>
  );
  return (
    <MurderWrapper key="murder">
      <MurderFonts />
      <CityWrapper>
        <MurderCityBg src={SkylineBg} />
        <StarsLeft src={StarsBgLeft} />
        <StarsRight src={StarsBgRight} />
        <h1>The Murder in MITropolis</h1>
      </CityWrapper>
      <h1>The Murder round page</h1>
      {items}
    </MurderWrapper>
  );
};

export default MurderBody;

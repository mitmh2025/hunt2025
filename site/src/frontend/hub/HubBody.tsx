import React, { useEffect } from "react";
import { styled } from "styled-components";
import { HubFonts } from "./HubFonts";
import BabyPhoto from "./assets/baby.png";
import BilliePhoto from "./assets/billie.png";
import BulletinBoardBg from "./assets/bulletin-board.png";
import BusinessCardImg from "./assets/business_card.png";
import CarterPhoto from "./assets/carter.png";
import GladysPhoto from "./assets/gladys.png";
import KatrinaPhoto from "./assets/katrina.png";
import MainQuestionImg from "./assets/main_question.png";
import PapaPhoto from "./assets/papa.png";
import RoverPhoto from "./assets/rover.png";
import SidecarPhoto from "./assets/sidecar.png";
import Events from "./components/Events";
import SuspectCard from "./components/SuspectCard";
import {
  defaultShadowFilter,
  getRelativeSizeCss,
  MAX_HEIGHT,
  MAX_WIDTH,
} from "./constants";
import { type HubState } from "./types";

// const RED = "var(--red-500)";
const GREEN = "var(--teal-400)";

const Board = styled.main`
  background-image: url(${BulletinBoardBg});
  background-size: cover;
  overflow-x: hidden;
  width: min(var(--viewport-width), ${MAX_WIDTH}px);
  height: ${getRelativeSizeCss(MAX_HEIGHT)};
  position: relative;
`;

const MainQuestion = styled.img`
  position: absolute;
  top: ${getRelativeSizeCss(87)};
  left: ${getRelativeSizeCss(1248)};
  width: ${getRelativeSizeCss(1552)};
  transform: rotate(-1.8deg);
  filter: ${defaultShadowFilter};
`;

const BusinessCard = styled.img`
  position: absolute;
  top: ${getRelativeSizeCss(1830)};
  left: ${getRelativeSizeCss(3292)};
  width: ${getRelativeSizeCss(520)};
  transform: rotate(-1deg);
  box-shadow: ${getRelativeSizeCss(2)} ${getRelativeSizeCss(2)}
    ${getRelativeSizeCss(4)} rgba(0, 0, 0, 0.53);
`;

const HubBody = ({ state }: { state: HubState }) => {
  useEffect(() => {
    function _calculateScrollbarWidth() {
      document.documentElement.style.setProperty(
        "--viewport-width",
        `${document.documentElement.clientWidth}px`,
      );
    }

    // recalculate on resize
    window.addEventListener("resize", _calculateScrollbarWidth, false);
    // recalculate on dom load
    document.addEventListener(
      "DOMContentLoaded",
      _calculateScrollbarWidth,
      false,
    );
    // recalculate on load (assets loaded as well)
    window.addEventListener("load", _calculateScrollbarWidth);
  });
  return (
    <>
      <HubFonts />
      <Board>
        <SuspectCard
          name='Robert "Papa" Finster'
          title="The Boss"
          photoUrl={PapaPhoto}
          photoAlt="Large man with a white tuxedo jacket and a pinky ring"
          status={{ text: "Suspect" }}
          x={1003}
          y={381}
          rotation={2.1}
        />
        <SuspectCard
          name="Ferdinand Carter"
          title="The Fiancé"
          photoUrl={CarterPhoto}
          photoAlt="Man with fedora, thin mustache, and a red tie and corsage"
          status={{ text: "Suspect" }}
          x={1000}
          y={968}
          rotation={0.6}
        />
        <SuspectCard
          name="Colt Sidecar"
          title="The Right-Hand Man"
          photoUrl={SidecarPhoto}
          photoAlt="Man with round gold glasses and a ribbon necktie"
          status={{ text: "Suspect" }}
          x={1015}
          y={1555}
          rotation={-1.5}
        />
        <SuspectCard
          name='Roy "Rover" Canoso'
          title="The Muscle"
          photoUrl={RoverPhoto}
          photoAlt="Large man with newsboy cap, brown vest and tie"
          status={{ text: "Suspect" }}
          x={1482}
          y={1640}
          rotation={2}
        />
        <SuspectCard
          name="Gladys Finster"
          title="The Heir Apparent"
          photoUrl={GladysPhoto}
          photoAlt="Woman with purple dress and headscarf"
          status={{ text: "Suspect" }}
          x={2483}
          y={359}
          rotation={-1.4}
        />
        <SuspectCard
          name='Teresa "Baby" Finster'
          title="The Wild Child"
          photoUrl={BabyPhoto}
          photoAlt="Woman with blue beret and pink neck scarf and cardigan"
          status={{ text: "Suspect" }}
          x={2465}
          y={967}
          rotation={-1.7}
        />
        <SuspectCard
          name="Katrina Jay"
          title="The Girlfriend"
          photoUrl={KatrinaPhoto}
          photoAlt="Woman with cloche hat and teal shirt"
          status={{ text: "Suspect" }}
          x={2467}
          y={1526}
          rotation={0.9}
        />
        <SuspectCard
          name="Billie O'Ryan"
          title="The Gumshoe"
          photoUrl={BilliePhoto}
          photoAlt="Private investigator with fedora and trenchcoat"
          status={{ text: "Cleared", color: GREEN }}
          x={2001}
          y={1621}
          rotation={-0.6}
        />
        <Events />
        <BusinessCard
          src={BusinessCardImg}
          alt="Business card: Two P.I. Noir Detective Agency. Billie O'Ryan, Private Investigator."
        />
        <MainQuestion
          src={MainQuestionImg}
          alt="Who stole the Shadow Diamond? Solve the Case of the Shadow Diamond"
        />
        {state.objects.map((obj) => {
          const imgStyles = {
            width: getRelativeSizeCss(obj.width),
          };
          const styles = {
            position: "absolute" as const,
            top: getRelativeSizeCss(obj.y),
            left: getRelativeSizeCss(obj.x),
            transform: `rotate(${obj.rot}deg)`,
            pointerEvents: obj.inert ? ("none" as const) : undefined,
          };

          if (obj.href) {
            return (
              <a key={obj.asset} style={styles} href={obj.href}>
                <img style={imgStyles} src={obj.asset} alt={obj.alt} />
              </a>
            );
          }
          return (
            <img
              key={obj.asset}
              style={{ ...styles, ...imgStyles }}
              src={obj.asset}
              alt={obj.alt}
            />
          );
        })}
      </Board>
      {/* <h1>Hub page</h1>
      <h2>Rounds</h2>
      <ul>
        {state.rounds.map((round) => {
          return (
            <li key={round.slug}>
              <a href={`/rounds/${round.slug}`}>{round.title}</a>
            </li>
          );
        })}
      </ul> */}
    </>
  );
};

export default HubBody;

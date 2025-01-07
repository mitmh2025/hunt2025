import React, { useLayoutEffect } from "react";
import { styled } from "styled-components";
import Cork from "../assets/cork.png";
import { HubFonts } from "./HubFonts";
import BabyPhoto from "./assets/baby.png";
import BilliePhoto from "./assets/billie.png";
import BrickWall from "./assets/brickwall.jpg";
import BusinessCardImg from "./assets/business_card.png";
import CarterPhoto from "./assets/carter.png";
import BulletinBoardBg from "./assets/frame_and_scuffs.png";
import GladysPhoto from "./assets/gladys.png";
import KatrinaPhoto from "./assets/katrina.png";
import MainQuestionImg from "./assets/main_question.png";
import PapaPhoto from "./assets/papa.png";
import pin_gold from "./assets/pin_gold.png";
import pin_teal from "./assets/pin_teal.png";
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
import { type HubSuspectStatus, type HubState } from "./types";

const Wall = styled.div`
  background-image: url(${BrickWall});
  background-repeat: repeat;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 3rem);
  padding-top: 1rem;
`;

const Board = styled.main`
  background:
    url(${BulletinBoardBg}) center / cover,
    url(${Cork}) center / ${getRelativeSizeCss(512)} repeat;
  overflow: hidden;
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
  transform-origin: top left;
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

const Pin = styled.img<{ $x: number; $y: number }>`
  position: absolute;
  top: ${(props) => getRelativeSizeCss(props.$y)};
  left: ${(props) => getRelativeSizeCss(props.$x)};
  width: ${getRelativeSizeCss(32)};
  filter: ${defaultShadowFilter};
`;

function _calculateViewportDims() {
  document.documentElement.style.setProperty(
    "--viewport-width",
    `${document.documentElement.clientWidth}px`,
  );
  document.documentElement.style.setProperty(
    "--viewport-height",
    `${document.documentElement.clientHeight}px`,
  );
}

const HubBody = ({ state }: { state: HubState }) => {
  useLayoutEffect(() => {
    window.addEventListener("resize", _calculateViewportDims, false);
    document.addEventListener(
      "DOMContentLoaded",
      _calculateViewportDims,
      false,
    );
    window.addEventListener("load", _calculateViewportDims);
    return () => {
      window.removeEventListener("resize", _calculateViewportDims, false);
      document.removeEventListener(
        "DOMContentLoaded",
        _calculateViewportDims,
        false,
      );
      window.removeEventListener("load", _calculateViewportDims);
    };
  }, []);
  const defaultStatus: [HubSuspectStatus] = [{ text: "Suspect" }];
  return (
    <>
      <HubFonts />
      <Wall>
        <Board>
          <SuspectCard
            name='Robert "Papa" Finster'
            title="The Boss"
            photoUrl={PapaPhoto}
            photoAlt="Large man with a white tuxedo jacket and a pinky ring"
            status={state.suspects.papa?.status ?? defaultStatus}
            statusUpdateRotation={-11.7}
            x={1003}
            y={381}
            rotation={2.1}
          />
          <SuspectCard
            name="Ferdinand Carter"
            title="The Fiancé"
            photoUrl={CarterPhoto}
            photoAlt="Man with fedora, thin mustache, and a red tie and corsage"
            status={state.suspects.carter?.status ?? defaultStatus}
            statusUpdateRotation={-12.9}
            x={1000}
            y={968}
            rotation={0.6}
          />
          <SuspectCard
            name="Colt Sidecar"
            title="The Right-Hand Man"
            photoUrl={SidecarPhoto}
            photoAlt="Man with round gold glasses and a ribbon necktie"
            status={state.suspects.sidecar?.status ?? defaultStatus}
            statusUpdateRotation={-11.8}
            x={1015}
            y={1555}
            rotation={-1.5}
          />
          <SuspectCard
            name='Roy "Rover" Canoso'
            title="The Muscle"
            photoUrl={RoverPhoto}
            photoAlt="Large man with newsboy cap, brown vest and tie"
            status={state.suspects.rover?.status ?? defaultStatus}
            statusUpdateRotation={8.3}
            x={1482}
            y={1640}
            rotation={2}
          />
          <SuspectCard
            name="Gladys Finster"
            title="The Heir Apparent"
            photoUrl={GladysPhoto}
            photoAlt="Woman with purple dress and headscarf"
            status={state.suspects.gladys?.status ?? defaultStatus}
            statusUpdateRotation={6.9}
            x={2483}
            y={359}
            rotation={-1.4}
          />
          <SuspectCard
            name='Teresa "Baby" Finster'
            title="The Wild Child"
            photoUrl={BabyPhoto}
            photoAlt="Woman with blue beret and pink neck scarf and cardigan"
            status={state.suspects.baby?.status ?? defaultStatus}
            statusUpdateRotation={8.3}
            x={2465}
            y={967}
            rotation={-1.7}
          />
          <SuspectCard
            name="Katrina Jay"
            title="The Girlfriend"
            photoUrl={KatrinaPhoto}
            photoAlt="Woman with cloche hat and teal shirt"
            status={state.suspects.katrina?.status ?? defaultStatus}
            statusUpdateRotation={-9.1}
            x={2467}
            y={1526}
            rotation={0.9}
          />
          <SuspectCard
            name="Billie O'Ryan"
            title="The Gumshoe"
            photoUrl={BilliePhoto}
            photoAlt="Private investigator with fedora and trenchcoat"
            status={state.suspects.billie?.status ?? defaultStatus}
            statusUpdateRotation={-9.1}
            x={2001}
            y={1621}
            rotation={-0.6}
          />
          <Events />
          <Pin src={pin_teal} alt="" $x={729} $y={531} />
          <BusinessCard
            src={BusinessCardImg}
            alt="Business card: Two P.I. Noir Detective Agency. Billie O'Ryan, Private Investigator."
          />
          <Pin src={pin_gold} alt="" $x={3527} $y={1832} />
          <MainQuestion
            src={MainQuestionImg}
            alt="Who stole the Shadow Diamond? Solve the Case of the Shadow Diamond"
          />
          <Pin src={pin_gold} alt="" $x={2279} $y={69} />
          <Pin src={pin_gold} alt="" $x={1280} $y={105} />
          {state.objects.map((obj) => {
            const imgStyles = {
              display: "block" as const,
              width: getRelativeSizeCss(obj.width),
            };
            const styles = {
              position: "absolute" as const,
              top: getRelativeSizeCss(obj.y),
              left: getRelativeSizeCss(obj.x),
              transform: `rotate(${obj.rot}deg)`,
              transformOrigin: obj.rotOrigin ?? "center",
              pointerEvents: obj.inert ? ("none" as const) : undefined,
              filter: obj.shadow ? defaultShadowFilter : undefined,
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
          {state.objects.map((obj) => {
            if (obj.pin) {
              return (
                <Pin
                  key={obj.asset + "-pin"}
                  src={obj.pin.asset}
                  alt=""
                  $x={obj.pin.x}
                  $y={obj.pin.y}
                />
              );
            }
            return undefined;
          })}
          {/* pins for suspects need to stack above the string */}
          <Pin key={"pin-baby"} src={pin_teal} alt="" $x={2656} $y={978} />
          <Pin key={"pin-gladys"} src={pin_teal} alt="" $x={2684} $y={380} />
          <Pin key={"pin-katrina"} src={pin_teal} alt="" $x={2658} $y={1526} />
          <Pin key={"pin-carter"} src={pin_teal} alt="" $x={1188} $y={964} />
          <Pin key={"pin-papa"} src={pin_teal} alt="" $x={1194} $y={378} />
          <Pin key={"pin-sidecar"} src={pin_teal} alt="" $x={1206} $y={1562} />
          <Pin key={"pin-rover"} src={pin_teal} alt="" $x={1674} $y={1636} />
          <Pin key={"pin-billie"} src={pin_teal} alt="" $x={2192} $y={1626} />
        </Board>
      </Wall>
    </>
  );
};

export default HubBody;

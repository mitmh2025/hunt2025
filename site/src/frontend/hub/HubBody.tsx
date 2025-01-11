import React, { useEffect } from "react";
import { styled } from "styled-components";
import Cork from "../assets/cork.jpg";
import { HubFonts } from "./HubFonts";
import BabyPhoto from "./assets/baby.png";
import BilliePhoto from "./assets/billie.png";
import BrickWall from "./assets/brickwall.jpg";
import BulletinBoardBg from "./assets/bulletin_board_frame.png";
import BusinessCardImg from "./assets/business_card.png";
import CarterPhoto from "./assets/carter.png";
import GladysPhoto from "./assets/gladys.png";
import KatrinaPhoto from "./assets/katrina.png";
import MainQuestionImg from "./assets/main_question.png";
import PapaPhoto from "./assets/papa.png";
import pin_gold from "./assets/pin_gold.png";
import pin_teal from "./assets/pin_teal.png";
import RoverPhoto from "./assets/rover.png";
import BulletinBoardScuffs from "./assets/scuffs.png";
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
    url(${BulletinBoardScuffs}) center / cover,
    url(${Cork}) center / ${getRelativeSizeCss(512)} repeat;
  overflow: hidden;
  width: min(calc(100vw - var(--scrollbar-width)), ${MAX_WIDTH}px);
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
    "--scrollbar-width",
    `${window.innerWidth - document.documentElement.clientWidth}px`,
  );
}

const HubBody = ({ state }: { state: HubState }) => {
  useEffect(() => {
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
            statusUpdateYAdjust={-30}
            x={1003}
            y={381}
            rotation={2.1}
          >
            Papa is the head of the Finster crime family that runs the
            MITropolis underworld. He’s a hard man who rose to the top the hard
            way, but rumors are he’s going soft in his old age.
          </SuspectCard>
          <SuspectCard
            name="Ferdinand Carter"
            title="The Fiancé"
            photoUrl={CarterPhoto}
            photoAlt="Man with fedora, thin mustache, and a red tie and corsage"
            status={state.suspects.carter?.status ?? defaultStatus}
            statusUpdateRotation={-12.9}
            statusUpdateYAdjust={-30}
            x={1000}
            y={968}
            rotation={0.6}
          >
            The scion of Carter Brothers Jewelers, Carter has recently returned
            from Europe with the famous Shadow Diamond, leverage he’s used to
            work his way into the Finster family — both financially and
            personally. He’s in love with Gladys, so he might be blinded to
            what’s going on.
          </SuspectCard>
          <SuspectCard
            name="Colt Sidecar"
            title="The Right-Hand Man"
            photoUrl={SidecarPhoto}
            photoAlt="Man with round gold glasses and a ribbon necktie"
            status={state.suspects.sidecar?.status ?? defaultStatus}
            statusUpdateRotation={11.8}
            statusUpdateYAdjust={30}
            x={1015}
            y={1555}
            rotation={-1.5}
          >
            Papa’s right hand man, Sidecar’s a mean bartender. Clever and loyal,
            he’s been with Papa since the beginning. He certainly knows how to
            keep a secret. No one believes Sidecar is his real name, but also no
            one knows what it actually is.
          </SuspectCard>
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
          >
            Rover is the Finster family’s chauffeur and muscle. The family’s
            Duesenberg Model J is his pride and joy. The strong silent type, no
            one really knows what’s going on in that big head of his.
          </SuspectCard>
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
          >
            Papa’s oldest daughter, Gladys is the prim and proper face of the
            family’s legitimate front, Finster & Daughters Jewelers. She’s
            engaged to Ferdinand Carter, but anyone with eyes can tell she’s not
            thrilled about it – she’s in it for the business.
          </SuspectCard>
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
          >
            Papa’s youngest daughter, Baby is the wild child of the family. I
            should know, I’ve gotten her out of a few jams in the past. Nothing
            too serious, the sort of youthful indiscretions common to her
            generation.
          </SuspectCard>
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
          >
            Katrina is the latest in the long line of Baby’s belles. She’s a
            fashion designer fresh on the scene – no one knows much else about
            her. She’s the wild card in this.
          </SuspectCard>
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
          >
            That’s me, Billie O’Ryan, private investigator. I’ve worked the
            streets of MITropolis for a while. I know the ins and outs of the
            city. I know not to trust anybody – including my clients.
          </SuspectCard>
          <Events events={state.events} />
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
            const key = `${obj.asset}-${obj.x}-${obj.y}`;

            if (obj.href) {
              return (
                <a key={key} style={styles} href={obj.href}>
                  <img style={imgStyles} src={obj.asset} alt={obj.alt} />
                </a>
              );
            }
            return (
              <img
                key={key}
                style={{ ...styles, ...imgStyles }}
                src={obj.asset}
                alt={obj.alt}
              />
            );
          })}
          {state.objects.map((obj) => {
            if (obj.pin) {
              const key = `${obj.asset}-${obj.x}-${obj.y}-pin`;
              return (
                <Pin
                  key={key}
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

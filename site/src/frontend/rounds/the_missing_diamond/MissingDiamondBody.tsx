import {
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import React, {
  type MouseEventHandler,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  useEffect,
} from "react";
import { css, styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import { CLIPBOARD_MONOSPACE_FONT_FAMILY } from "../../components/CopyToClipboard";
import { PuzzleIcon, PuzzleUnlockModal } from "../../components/PuzzleLink";
import { deviceMax } from "../../utils/breakpoints";
import billie from "./assets/billie.png";
import cork from "./assets/cork.png";
import map from "./assets/map.png";
import skyline from "./assets/skyline.png";
import stars from "./assets/stars.png";
import title from "./assets/title.png";
import {
  type MissingDiamondInteractionEntity,
  type MissingDiamondEntity,
  type MissingDiamondState,
  type MissingDiamondWitness,
} from "./types";

const MAP_NATIVE_WIDTH = 2166;
const MAP_NATIVE_HEIGHT = 2025;

const MissingDiamondBackdrop = styled.div`
  min-height: calc(100vh - 48px);
  background: url("${cork}") 0 0 / 512px repeat;

  display: flex;

  @media ${deviceMax.md} {
    flex-direction: column;
  }
`;

const MissingDiamondMapArea = styled.div`
  width: 59.32%;
  padding: 0 1.5%;
  background: linear-gradient(
    90deg,
    rgb(43, 18, 52, 0) 77.95%,
    rgba(43, 18, 52, 1) 100%
  );

  overflow: hidden; // keep tooltips contained
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${deviceMax.md} {
    width: 100%;

    background: linear-gradient(
      180deg,
      rgb(43, 18, 52, 0) 77.95%,
      rgba(43, 18, 52, 1) 100%
    );
  }
`;

const MissingDiamondMapContainer = styled.div`
  margin-top: 5.83%;
  position: relative;
`;

const MissingDiamondTitle = styled.img`
  position: absolute;
  top: -5.83%;
  left: 18.36%;
  width: 57.49%;
`;

const MissingDiamondMap = styled.img`
  display: block;
  max-width: 100%;
  max-height: calc(
    0.9417 * (100vh - 48px)
  ); // 48px for navbar, 94.17% to allow for title
`;

const MissingDiamondSkyline = styled.div`
  width: 40.68%;
  flex-grow: 1;
  background:
    url("${skyline}") bottom right / 100% auto no-repeat content-box,
    rgb(43, 18, 52);

  position: relative;
  display: flex;
  flex-direction: column-reverse;

  @media ${deviceMax.md} {
    width: 100%;
    flex-direction: column;
  }
`;

const MissingDiamondStars = styled.div`
  position: absolute;
  inset: 0;
  // The skyline is going to be 40.68vw wide, and we want to go up 49.42% of that
  margin-bottom: 20.1vw;
  background: url(${stars}) bottom center / 100%;

  @media ${deviceMax.md} {
    margin-bottom: 49.42vw;
  }
`;

const MissingDiamondBillie = styled.img`
  position: absolute;
  right: 3.33%;
  bottom: 0.65%;
  width: 31.11%;

  @media ${deviceMax.md} {
    bottom: initial;
    top: 0.65%;
  }
`;

const SpeechBubble = styled.div<{
  $color: string;
  $glow: boolean;
  $extraBorder: boolean;
  $i: number;
  $length: number;
}>`
  margin-bottom: 14px;
  padding: 20px;
  border: ${({ $extraBorder }) => ($extraBorder ? "6px" : "3px")} solid
    ${({ $color }) => $color};
  border-radius: 43px;
  background: rgba(255, 255, 255, 0.86);
  outline: 4px solid rgba(255, 255, 255, 0.86);
  box-shadow: 20px -20px 15px rgb(20 34 35 / 20%) ${({ $glow }) => $glow && ", 0 0 8px 8px white"};
  z-index: 1;

  display: flex;
  align-items: center;
  color: black;
  font-family: Garamond, serif;
  white-space: pre-wrap;

  @media ${deviceMax.md} {
    margin-bottom: initial;
    margin-top: 14px;
  }

  ${({ $i, $length }) => {
    if ($i === 0) {
      return css`
        && {
          margin-left: 5.25%;
          margin-right: 36.68%;
          margin-bottom: 8.84%;
          min-height: 9.2vw;

          position: relative;

          @media ${deviceMax.md} {
            margin-bottom: initial;
            margin-top: 12vw;
            min-height: 20vw;
          }

          &::before {
            content: "";
            position: absolute;
            background: rgba(255, 255, 255, 0.86);
            width: 15%;
            height: 50px;
            left: calc(100% + 10px);
            bottom: 45px;
            clip-path: polygon(0 0, 100% 100%, 0 75%);

            @media ${deviceMax.md} {
              bottom: initial;
              top: 8vw;
              clip-path: polygon(0 0, 100% 0, 0 75%);
            }
          }
        }
      `;
    } else if ($i === $length - 1) {
      return css`
        && {
          margin-top: 2.5%;

          @media ${deviceMax.md} {
            margin-top: 14px;
            margin-bottom: 2.5%;
          }
        }
      `;
    }

    return undefined;
  }}

  ${({ $i }) => {
    if ($i % 2 === 0) {
      return css`
        margin-left: 5.51%;
        margin-right: 22.79%;
      `;
    }

    return css`
      margin-left: 16.26%;
      margin-right: 12.04%;
    `;
  }}
`;

const EntityContainer = styled.div`
  display: block;
  padding: 0;
  border: none;
  background: transparent;
  position: absolute;
`;

const Tooltip = styled.div`
  max-width: 30rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 5;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .answer {
    font-family: "Roboto Mono", monospace;
    font-weight: bold;
  }

  button.copy {
    position: absolute;
    top: 0;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    margin: 0;
  }
`;

const MissingDiamondMapEntity = ({
  entity,
  currency,
  tooltipChildren,
  additionalImageStyle,
}: {
  entity: MissingDiamondEntity;
  currency: number;
  tooltipChildren: React.ReactNode;
  additionalImageStyle: CSSProperties;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const role = useRole(context, { role: "label" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
  ]);

  const unlockModalRef = useRef<HTMLDialogElement>(null);
  const showUnlockModal: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      unlockModalRef.current?.showModal();
    },
    [],
  );
  const dismissUnlockModal = useCallback(() => {
    unlockModalRef.current?.close();
  }, []);

  const containerStyle: CSSProperties = {
    top: `${(entity.pos.top / MAP_NATIVE_HEIGHT) * 100}%`,
    left: `${(entity.pos.left / MAP_NATIVE_WIDTH) * 100}%`,
    width: `${(entity.pos.width / MAP_NATIVE_WIDTH) * 100}%`,
  };
  const imageStyle: CSSProperties = {
    width: "100%",
    userSelect: "none",
    ...additionalImageStyle,
  };

  const image = (
    <>
      <img
        ref={refs.setReference}
        {...getReferenceProps()}
        src={entity.asset}
        alt={entity.alt}
        style={imageStyle}
      />
    </>
  );
  const tooltip = showTooltip && (
    <Tooltip
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      {tooltipChildren}
    </Tooltip>
  );

  if (entity.puzzle?.state === "unlockable") {
    return (
      <>
        <EntityContainer
          as="button"
          style={containerStyle}
          onClick={showUnlockModal}
        >
          {image}
        </EntityContainer>
        {tooltip}
        <PuzzleUnlockModal
          ref={unlockModalRef}
          title={entity.puzzle.title}
          slug={entity.puzzle.slug}
          onDismiss={dismissUnlockModal}
          cost={1}
          currency={currency}
          desc={entity.puzzle.desc}
        />
      </>
    );
  } else if (entity.puzzle) {
    return (
      <>
        <EntityContainer
          as="a"
          style={containerStyle}
          href={`/puzzles/${entity.puzzle.slug}`}
        >
          {image}
        </EntityContainer>
        {tooltip}
      </>
    );
  }

  return (
    <>
      <EntityContainer style={containerStyle}>{image}</EntityContainer>
      {tooltip}
    </>
  );
};

const MissingDiamondLocationImage = ({
  location,
  currency,
}: {
  location: MissingDiamondEntity;
  currency: number;
}) => {
  let iconState;
  switch (location.puzzle?.state) {
    case "unlockable":
    case "unlocked":
      iconState = location.puzzle.state;
      break;
    case "solved":
      iconState = "unlocked" as const;
      break;
    default:
      iconState = "locked" as const;
      break;
  }
  const tooltipChildren = (
    <>
      <span>
        {location.puzzle && (
          <>
            <PuzzleIcon lockState={iconState} answer={location.puzzle.answer} />{" "}
          </>
        )}
        {location.puzzle?.title ?? location.alt}
      </span>
      {location.puzzle?.answer && (
        <span className="answer">{location.puzzle.answer}</span>
      )}
    </>
  );

  return (
    <MissingDiamondMapEntity
      entity={location}
      currency={currency}
      additionalImageStyle={
        location.puzzle?.state === "solved"
          ? { filter: "drop-shadow(0 0 5px white)" }
          : {}
      }
      tooltipChildren={tooltipChildren}
    />
  );
};

const MissingDiamondInteraction = ({
  interaction,
}: {
  interaction: MissingDiamondInteractionEntity;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const role = useRole(context, { role: "label" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
  ]);

  const containerStyle: CSSProperties = {
    top: `${(interaction.pos.top / MAP_NATIVE_HEIGHT) * 100}%`,
    left: `${(interaction.pos.left / MAP_NATIVE_WIDTH) * 100}%`,
    width: `${(interaction.pos.width / MAP_NATIVE_WIDTH) * 100}%`,
  };
  const imageStyle: CSSProperties = {
    width: "100%",
    userSelect: "none",
  };

  const image = (
    <>
      <img
        ref={refs.setReference}
        {...getReferenceProps()}
        src={interaction.asset}
        alt={interaction.alt}
        style={imageStyle}
      />
    </>
  );
  const tooltip = showTooltip && (
    <Tooltip
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      <span>{interaction.alt}</span>
    </Tooltip>
  );

  return (
    <>
      <EntityContainer
        as="a"
        style={containerStyle}
        href={`/interactions/${interaction.slug}`}
      >
        {image}
      </EntityContainer>
      {tooltip}
    </>
  );
};

const MissingDiamondWitnessImage = ({
  witness,
  currency,
}: {
  witness: MissingDiamondWitness;
  currency: number;
}) => {
  const additionalImageStyle: CSSProperties = {
    filter:
      "drop-shadow(0px 2px 2px #9e73a8) drop-shadow(0px -2px 2px #9e73a8) drop-shadow(-2px 0px 2px #9e73a8) drop-shadow(2px 0px 2px #9e73a8)",
  };

  let iconState;
  switch (witness.puzzle.state) {
    case "unlockable":
    case "unlocked":
      iconState = witness.puzzle.state;
      break;
    case "solved":
      iconState = "unlocked" as const;
      break;
    default:
      iconState = "locked" as const;
      break;
  }

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const copiedMessageTimer = useRef<number | undefined>();
  useEffect(() => {
    return () => {
      const timer = copiedMessageTimer.current;
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const copyContentRef = useRef<HTMLTableElement>(null);
  const onCopy = useCallback(() => {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    if (copyContentRef.current) {
      copyContentRef.current.style.display = "table";

      try {
        const range = document.createRange();
        range.selectNode(copyContentRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      } finally {
        copyContentRef.current.style.display = "none";
      }

      if (copiedMessageTimer.current) {
        window.clearTimeout(copiedMessageTimer.current);
      }
      setShowCopiedMessage(true);
      copiedMessageTimer.current = window.setTimeout(() => {
        setShowCopiedMessage(false);
      }, 3000);
    }
  }, []);
  const copyContent = witness.statement && (
    <>
      <button className="copy" onClick={onCopy}>
        {showCopiedMessage ? "✅" : "📋"}
      </button>

      <table
        ref={copyContentRef}
        style={{
          display: "none",
          backgroundColor: "transparent",
          color: "black",
        }}
      >
        <tbody>
          <tr>
            <td>{witness.alt}</td>
            <td>{witness.statement}</td>
            <td>{witness.puzzle.title}</td>
            <td style={{ fontFamily: CLIPBOARD_MONOSPACE_FONT_FAMILY }}>
              {witness.puzzle.answer}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const tooltipChildren = (
    <>
      <span>{witness.alt}</span>
      <br />
      {witness.statement && (
        <>
          <span>“{witness.statement}”</span>
          <br />
        </>
      )}
      <span>
        <PuzzleIcon lockState={iconState} answer={witness.puzzle.answer} />{" "}
        {witness.puzzle.title}
      </span>
      {witness.puzzle.state !== "solved" && witness.puzzle.desc && (
        <span>{witness.puzzle.desc}</span>
      )}
      {witness.puzzle.answer && (
        <span className="answer">{witness.puzzle.answer}</span>
      )}
      {copyContent}
    </>
  );

  return (
    <MissingDiamondMapEntity
      entity={witness}
      currency={currency}
      additionalImageStyle={additionalImageStyle}
      tooltipChildren={tooltipChildren}
    />
  );
};

const MissingDiamondBody = ({
  state,
  teamState,
}: {
  state: MissingDiamondState;
  teamState: TeamHuntState;
}) => {
  return (
    <MissingDiamondBackdrop>
      <MissingDiamondMapArea>
        <MissingDiamondMapContainer>
          <MissingDiamondTitle src={title} alt="Find The Missing Diamond" />
          <MissingDiamondMap
            src={map}
            alt="A map of Downtown MITropolis. East-west streets are labeled A-H and north-south streets are labeled 1st-9th. Many streets are one-way and some do not pass through all of the map."
          />
          {state.locations.map((location) => (
            <MissingDiamondLocationImage
              key={location.asset}
              location={location}
              currency={teamState.currency}
            />
          ))}
          {state.witnesses.map((witness) => (
            <MissingDiamondWitnessImage
              key={witness.alt}
              witness={witness}
              currency={teamState.currency}
            />
          ))}
          {state.interactions?.map((interaction) => (
            <MissingDiamondInteraction
              key={interaction.slug}
              interaction={interaction}
            />
          ))}
        </MissingDiamondMapContainer>
      </MissingDiamondMapArea>
      <MissingDiamondSkyline>
        <MissingDiamondStars />
        <MissingDiamondBillie
          src={billie}
          alt="A silhouette of Billie O'Ryan"
        />
        {state.speechBubbles.map((bubble, i) => (
          <SpeechBubble
            key={bubble.slug}
            $color={bubble.color}
            $glow={bubble.glow ?? false}
            $extraBorder={bubble.extraBorder ?? false}
            $i={i}
            $length={state.speechBubbles.length}
          >
            {bubble.text}
          </SpeechBubble>
        ))}
      </MissingDiamondSkyline>
    </MissingDiamondBackdrop>
  );
};

export default MissingDiamondBody;

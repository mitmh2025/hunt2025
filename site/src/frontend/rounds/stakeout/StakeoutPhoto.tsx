import React, {
  type DragEventHandler,
  type PointerEventHandler,
  useCallback,
  useMemo,
} from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { clamp, type Position } from "./StakeoutBody";
import polaroid_bg from "./assets/polaroid_blank_no_shadow.png";
import { type StakeoutSlot } from "./types";

const PhotoLabel = styled.div`
  .puzzle-link-title {
    flex: 1 1 auto;
    text-align: left;
    margin-bottom: -0.25em;
  }

  .answer {
    color: var(--red-600);
    transform: rotate(-3deg) translateY(0.5rem);
  }
`;

const StakeoutPhoto = ({
  teamState,
  slot,
  slug,
  title,
  desc,
  asset,
  dragging,
  focused,
  position,
  photoOrder,
  onPointerDown,
}: {
  teamState: TeamHuntState;
  slot: StakeoutSlot;
  slug?: string;
  title?: string;
  desc?: string;
  asset: string;
  dragging: boolean;
  focused: boolean;
  position: Position;
  photoOrder: number;
  onPointerDown: (
    e: React.PointerEvent<HTMLDivElement>,
    slot: StakeoutSlot,
  ) => void;
}) => {
  const pointerDownHandler: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      onPointerDown(e, slot);
      return;
    },
    [slot, onPointerDown],
  );

  const labelPointerDownHandler: PointerEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        // Capture the click and avoid bubbling it up to the parent to avoid clicks on the bottom of the
        // polaroid (where the text goes) triggering drag
        if (slug && title) {
          e.stopPropagation();
        }
      },
      [slug, title],
    );

  const imgDragStartHandler: DragEventHandler<HTMLImageElement> = useCallback(
    (e) => {
      e.preventDefault();
    },
    [],
  );

  const puzzleState = slug ? teamState.puzzles[slug] : undefined;

  const link = useMemo(() => {
    if (title && slug) {
      return (
        <PuzzleLink
          epoch={teamState.epoch}
          lockState={puzzleState?.locked ?? "locked"}
          answer={puzzleState?.answer}
          currency={teamState.currency}
          title={title}
          slug={slug}
          desc={desc}
          showIcon={!!focused}
          showLabel={!!focused}
          size={focused ? 60 : 24}
          style={{
            // When we're space-constrained when unfocused, and only showing
            // the title and possibly the unlock button, there's little upside
            // in having a gap, since it likely makes us use ellipsis more
            // often than needed and the ellipsis themselves will be lighter
            // enough that it feels not-overly-cramped.  When we're zoomed in,
            // though, we want the gap between the status icon and link (and
            // unlock button if applicable).
            gap: focused ? "0.5rem" : "0",
            cursor: slug ? "pointer" : undefined,
            transitionProperty: "width height font-size",
            transitionDuration: "0.5s",
          }}
        />
      );
    }
    return undefined;
  }, [title, slug, puzzleState, desc, teamState, focused]);

  const shadowX = (4 * (position.x - 920)) / 1920;

  const SCALE_FACTOR = focused ? 5 : 1;
  const scaled = (unscaledPixels: number) => {
    return SCALE_FACTOR * unscaledPixels;
  };

  // We don't want to have slow transitions while dragging; we want that to feel snappy.
  // We do want a smooth transition for scaling up and rotating when focusing/unfocusing.
  const transitionProperties = dragging
    ? {}
    : {
        transitionProperty: "all",
        transitionDuration: "0.5s",
      };

  const polaroidOuterStyle = {
    width: `${scaled(150)}px`,
    height: `${scaled(180)}px`,
    zIndex: photoOrder,
    position: "absolute" as const,
    left: focused ? "585px" : `${clamp(position.x, 0, 1770)}px`,
    top: focused ? "90px" : `${clamp(position.y, 0, 900)}px`,
    cursor: focused ? "pointer" : dragging ? "grabbing" : "grab",
    backgroundImage: `url(${polaroid_bg})`,
    boxShadow: `${scaled(shadowX)}px ${scaled(4)}px ${scaled(6)}px ${scaled(2)}px #333`,
    transform: focused ? "rotate(0deg)" : `rotate(${position.r}deg)`,
    userSelect: "none" as const,
    ...transitionProperties,
  };
  const polaroidInnerStyle = {
    position: "relative" as const,
    width: `${scaled(150)}px`,
    height: `${scaled(180)}px`,
    ...transitionProperties,
  };
  const imageStyle = {
    width: `${scaled(134)}px`,
    height: `${scaled(134)}px`,
    position: "absolute" as const,
    left: `${scaled(8)}px`,
    top: `${scaled(8)}px`,
    backgroundColor: "var(--gray-800)",
    ...transitionProperties,
  };
  const labelStyle = {
    position: "absolute" as const,
    display: "block",
    padding: `${scaled(4)}px`,
    paddingLeft: focused ? "0" : "8px",
    paddingRight: focused ? "0" : "8px",
    height: `${scaled(38)}px`,
    bottom: "0.25em",
    left: `${focused ? scaled(8) : 0}px`,
    right: `${focused ? scaled(8) : 0}px`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center" as const,
    fontSize: focused ? "60px" : "24px",
    width: `calc(100% - ${focused ? 2 * scaled(8) : 0}px)`,
    ...transitionProperties,
  };

  let image;
  if (asset) {
    image = (
      <img
        style={imageStyle}
        src={asset}
        alt="Photograph"
        onDragStart={imgDragStartHandler}
      />
    );
  } else {
    image = <div style={imageStyle} />;
  }

  return (
    <div
      key={slot}
      style={polaroidOuterStyle}
      onPointerDown={pointerDownHandler}
    >
      <div style={polaroidInnerStyle}>
        {/* TODO: use different assets when zoomed-in? */}
        {image}
        <PhotoLabel style={labelStyle} onPointerDown={labelPointerDownHandler}>
          {link}
          {puzzleState?.answer && (
            <div className="answer">{puzzleState.answer}</div>
          )}
        </PhotoLabel>
      </div>
    </div>
  );
};

export default StakeoutPhoto;

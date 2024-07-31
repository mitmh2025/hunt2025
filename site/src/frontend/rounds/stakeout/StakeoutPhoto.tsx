import React, { type PointerEventHandler, useCallback, useMemo } from "react";
import { type TeamState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { clamp, type Position } from "./StakeoutBody";
import polaroid_bg from "./assets/polaroid_blank_no_shadow.png";
import { type StakeoutSlot } from "./types";

const StakeoutPhoto = ({
  teamState,
  slot,
  slug,
  title,
  asset,
  dragging,
  focused,
  position,
  photoOrder,
  onPointerDown,
}: {
  teamState: TeamState;
  slot: StakeoutSlot;
  slug?: string;
  title?: string;
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

  const link = useMemo(() => {
    return title && slug ? (
      <PuzzleLink
        teamState={teamState}
        title={title}
        slug={slug}
        showIcon={false}
        size={focused ? 60 : 24}
      />
    ) : undefined;
  }, [title, slug, teamState, focused]);

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
    backgroundColor: "#333",
    backgroundImage: `url(${asset})`, // TODO: use different assets when zoomed-in?
    backgroundSize: "contain",
    ...transitionProperties,
  };
  const labelStyle = {
    position: "absolute" as const,
    display: "block",
    padding: `4px`,
    height: `${scaled(38)}px`,
    bottom: "0px",
    left: "0px",
    right: "0px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center" as const,
    fontSize: focused ? "60px" : "24px",
    cursor: slug ? "pointer" : undefined,
    ...transitionProperties,
  };

  return (
    <div
      key={slot}
      style={polaroidOuterStyle}
      onPointerDown={pointerDownHandler}
    >
      <div style={polaroidInnerStyle}>
        <div style={imageStyle} />
        <div style={labelStyle} onPointerDown={labelPointerDownHandler}>
          {link}
        </div>
      </div>
    </div>
  );
};

export default StakeoutPhoto;

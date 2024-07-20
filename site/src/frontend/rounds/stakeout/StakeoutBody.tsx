import React, { useCallback, useEffect, useState } from "react";
import { type TeamState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import StakeoutPhoto from "./StakeoutPhoto";
import roundBackground from "./assets/background.png";
import {
  type StakeoutSlot,
  type StakeoutPhotoState,
  type StakeoutState,
} from "./types";

type Coord = {
  x: number;
  y: number;
};

export type Position = Coord & {
  r: number;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- node/SSR does not have Storage
const HAS_STORAGE = (typeof Storage !== "undefined") as boolean;

const DEFAULT_POSITIONS: Record<StakeoutSlot, Coord> = {
  // Exact starting positions are not puzzle content, just decorative.
  sop01: { x: 53, y: 37 },
  sop02: { x: 256, y: 19 },
  sop03: { x: 453, y: 47 },
  sop04: { x: 635, y: 37 },
  sop05: { x: 875, y: 29 },
  sop06: { x: 1089, y: 23 },
  sop07: { x: 1297, y: 35 },
  sop08: { x: 1514, y: 22 },
  sop09: { x: 1719, y: 30 },
  sop10: { x: 27, y: 233 },
  sop11: { x: 261, y: 222 },
  sop12: { x: 483, y: 245 },
  sop13: { x: 678, y: 256 },
  sop14: { x: 893, y: 232 },
  sop15: { x: 1089, y: 227 },
  sop16: { x: 1290, y: 230 },
  sop17: { x: 1516, y: 231 },
  sop18: { x: 1713, y: 234 },
  sop19: { x: 27, y: 440 },
  sop20: { x: 255, y: 460 },
  sop21: { x: 475, y: 455 },
  sop22: { x: 663, y: 462 },
  sop23: { x: 871, y: 438 },
  sop24: { x: 1068, y: 434 },
  sop25: { x: 1298, y: 435 },
  sop26: { x: 1515, y: 448 },
  sop27: { x: 1733, y: 449 },
  sop28: { x: 63, y: 647 },
  sop29: { x: 253, y: 664 },
  sop30: { x: 464, y: 656 },
  sop31: { x: 692, y: 666 },
  sop32: { x: 906, y: 649 },
  sop33: { x: 1118, y: 632 },
  sop34: { x: 1341, y: 650 },
  sop35: { x: 19, y: 865 },
  sop36: { x: 239, y: 865 },
  sop37: { x: 425, y: 857 },
  sop38: { x: 603, y: 873 },
  sop39: { x: 804, y: 862 },
  sop40: { x: 1019, y: 862 },
  sop41: { x: 1199, y: 865 },
  sop42: { x: 1385, y: 863 },
};

function rotationForX(x: number): number {
  return (4 * (x - 960)) / 1920;
}

function randomRotation(x: number): number {
  return rotationForX(x) + 8 * (Math.random() - 0.5);
}

export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

const LOCALSTORAGE_KEY = "stakeout-positions";
type LocalStoragePosition = {
  slot: StakeoutSlot;
  pos: Position;
};

const StakeoutBody = ({
  state,
  teamState,
}: {
  state: StakeoutState;
  teamState: TeamState;
}) => {
  const [stackOrder, setStackOrder] = useState<StakeoutSlot[]>(() => {
    if (HAS_STORAGE) {
      const localState = localStorage.getItem(LOCALSTORAGE_KEY);
      if (localState) {
        const savedState = JSON.parse(localState) as LocalStoragePosition[];
        return savedState.map((item) => item.slot);
      }
    }
    return state.photos.map((photo) => photo.slot);
  });

  const [positions, setPositions] = useState<Record<StakeoutSlot, Position>>(
    () => {
      if (HAS_STORAGE) {
        const localState = localStorage.getItem(LOCALSTORAGE_KEY);
        if (localState) {
          const savedState = JSON.parse(localState) as LocalStoragePosition[];
          return Object.fromEntries(
            savedState.map((lsPos) => {
              return [lsPos.slot, lsPos.pos];
            }),
          ) as Record<StakeoutSlot, Position>;
        }
      }
      return Object.fromEntries(
        Object.entries(DEFAULT_POSITIONS).map((entry) => {
          const [slot, coord] = entry;
          return [
            slot,
            {
              ...coord,
              r: (randomRotation(0) * 3) / 2,
            } as Position,
          ];
        }),
      ) as Record<StakeoutSlot, Position>;
    },
  );

  const moveToTopOfStack = useCallback((newTop: StakeoutSlot) => {
    setStackOrder((prevOrder) => {
      const toRemove = prevOrder.indexOf(newTop);
      return [
        ...prevOrder.slice(0, toRemove),
        ...prevOrder.slice(toRemove + 1),
        newTop,
      ];
    });
  }, []);

  useEffect(() => {
    if (HAS_STORAGE) {
      // Re-serialize the photo states, and save to localStorage.
      const localState = stackOrder.map((slot) => {
        return {
          slot,
          pos: positions[slot],
        };
      });
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localState));
    }
  }, [stackOrder, positions]);

  // If present: the slot that is being dragged
  const [dragging, setDragging] = useState<StakeoutSlot | undefined>(undefined);

  const [focused, setFocused] = useState<StakeoutSlot | undefined>(undefined);

  const [mouseDownPosition, setMouseDownPosition] = useState<Coord>({
    x: 0,
    y: 0,
  });

  const onPhotoMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, slot: StakeoutSlot) => {
      if (e.button === 0) {
        // Only trigger on main button press.
        // Don't allow the click to propagate to the background (which would dismiss the zoomed polaroid)
        e.stopPropagation();

        // If this mousedown is coming from a slot that is not the current
        // focus, dismiss the focus.  If it's already the current focus, avoid
        // immediately shrinking the polaroid back down again.
        if (focused !== slot) {
          setFocused(undefined);
        }

        // Move this photo to the top of the stack, and start moving this photo with the mouse.
        setDragging(slot);
        setMouseDownPosition({ x: e.clientX, y: e.clientY });
        moveToTopOfStack(slot);
      }
    },
    [focused, moveToTopOfStack],
  );
  const onBackgroundMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.button === 0) {
        setFocused(undefined);
      }
    },
    [],
  );
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (dragging) {
        setPositions((prevPositions) => {
          const prevPosition = prevPositions[dragging];
          const newX = prevPosition.x + e.movementX;
          const newPosition = {
            x: newX,
            y: prevPosition.y + e.movementY,
            r: rotationForX(newX), // While moving, align perfectly
          };
          return {
            ...prevPositions,
            [dragging]: newPosition,
          };
        });
      }
    },
    [dragging],
  );
  const endDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, focusOnTrivialMovement = false) => {
      if (dragging) {
        // Only trigger on primary button release
        const deltaX = Math.abs(e.clientX - mouseDownPosition.x);
        const deltaY = Math.abs(e.clientY - mouseDownPosition.y);
        const trivialMovement = deltaX < 3 && deltaY < 3;

        setPositions((prevPositions) => {
          const prevPosition = prevPositions[dragging];
          const x = clamp(prevPosition.x, 0, 1770);
          const y = clamp(prevPosition.y, 0, 900);
          const newPosition = {
            x,
            y,
            r: trivialMovement ? prevPosition.r : randomRotation(x),
          };
          return {
            ...prevPositions,
            [dragging]: newPosition,
          };
        });

        if (trivialMovement && focusOnTrivialMovement) {
          setFocused(dragging);
        }
        setDragging(undefined);
      }
    },
    [dragging, mouseDownPosition],
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      console.log("mouseup", e);
      if (e.button === 0) {
        endDrag(e, true);
      }
    },
    [endDrag],
  );

  const photosBySlot: Record<StakeoutSlot, StakeoutPhotoState> =
    Object.fromEntries(
      state.photos.map((photo) => [photo.slot, photo]),
    ) as Record<StakeoutSlot, StakeoutPhotoState>;

  const photos = stackOrder.map((photoSlot) => {
    const photo = photosBySlot[photoSlot];
    const position = positions[photoSlot];
    return (
      <StakeoutPhoto
        key={photo.slot}
        teamState={teamState}
        slot={photo.slot}
        slug={photo.slug}
        title={photo.title}
        asset={photo.asset}
        dragging={dragging === photoSlot}
        focused={focused === photoSlot}
        position={position}
        onMouseDown={onPhotoMouseDown}
      />
    );
  });

  const pageStyle = {
    width: "1920px",
    height: "1080px",
    backgroundImage: `url(${roundBackground})`,
    backgroundSize: "contain",
    position: "relative" as const, // We want to place other objects relatively within the scene
    overflow: "hidden",
  };

  const overlay = state.overlay ? (
    <div
      style={{
        position: "absolute",
        right: state.overlay.right,
        bottom: state.overlay.bottom,
        width: "448px",
        height: "431px",
        backgroundImage: `url(${state.overlay.asset})`,
        filter: "drop-shadow(0 0 4px black)",
        userSelect: "none" as const,
      }}
    >
      <div
        style={{
          position: "relative",
          transform: state.overlay.transform,
          left: state.overlay.left,
          top: state.overlay.top,
          display: "block",
          textAlign: "center",
          width: "240px",
        }}
      >
        <PuzzleLink
          teamState={teamState}
          slug={state.overlay.slug}
          title={state.overlay.label}
        />
      </div>
    </div>
  ) : undefined;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- I'm not making this a button or supporting keyboard navigation
    <div
      style={pageStyle}
      onMouseDown={onBackgroundMouseDown}
      onMouseLeave={endDrag}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {overlay}
      {photos}
    </div>
  );
};

export default StakeoutBody;

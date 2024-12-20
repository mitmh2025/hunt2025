import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import PuzzleLink from "../../components/PuzzleLink";
import { StakeoutFonts } from "./StakeoutFonts";
import StakeoutPhoto from "./StakeoutPhoto";
import roundBackground from "./assets/background.png";
import { type StakeoutSlot, type StakeoutState } from "./types";

type Coord = {
  x: number;
  y: number;
};

export type Position = Coord & {
  r: number;
};

const HAS_STORAGE = typeof Storage !== "undefined";

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

const NATIVE_WIDTH = 1920;
const NATIVE_HEIGHT = 1080;

const StakeoutBodyMainDiv = styled.div`
  width: ${NATIVE_WIDTH}px;
  height: ${NATIVE_HEIGHT}px;
  background-image: url("${roundBackground}");
  background-size: contain;
  transform-origin: top left;

  // We want to place other objects relatively within the scene
  position: relative;
  overflow: hidden;

  // Establish a new stacking context for the photos to stack within without
  // causing them to leak over other overlays
  z-index: 0;

  font-family: "Just Another Hand", cursive;
  font-weight: 400;
  font-style: normal;

  .puzzle-link.solved,
  .puzzle-link.unsolved {
    color: var(--gray-800);
    text-decoration: none;
    position: relative;

    a {
      color: var(--gray-800);
      text-decoration: none;
      position: relative;

      &:hover {
        text-decoration: none;
        color: var(--true-black);
        text-shadow: none;
      }
    }
  }

  a:hover {
    color: var(--true-black);
    text-shadow: none;
    text-decoration: underline dotted var(--gray-800);
  }

  a.puzzle-link-title:hover::before {
    width: 104%;
    height: 0.8em;
    background-color: var(--highlighter);
    content: " ";
    position: absolute;
    top: 0.33em;
    left: -0.25em;
    transform: rotate(3deg);
  }

  a.puzzle-link-title:hover::after {
    width: 95%;
    height: 0.8em;
    background-color: var(--highlighter);
    content: " ";
    position: absolute;
    top: 0em;
    left: -0.25em;
    transform: rotate(-2deg);
  }
`;

const StakeoutBody = ({
  state,
  teamState,
}: {
  state: StakeoutState;
  teamState: TeamHuntState;
}) => {
  const [screenScaleFactor, setScreenScaleFactor] = useState<number>(1);
  useLayoutEffect(() => {
    const updateScale = () => {
      setScreenScaleFactor(
        Math.min(
          (document.documentElement.clientHeight - 48) / NATIVE_HEIGHT, // account for navbar
          document.documentElement.clientWidth / NATIVE_WIDTH,
        ),
      );
    };
    (window.visualViewport ?? window).addEventListener("resize", updateScale);
    updateScale();

    return () => {
      (window.visualViewport ?? window).removeEventListener(
        "resize",
        updateScale,
      );
    };
  }, []);

  // Stacking order; first is on bottom; last is on top (like DOM elements would be)
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

  const [pointerDownPosition, setPointerDownPosition] = useState<Coord>({
    x: 0,
    y: 0,
  });

  const onPhotoPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, slot: StakeoutSlot) => {
      if (e.button === 0) {
        // Only trigger on main button press.
        // Don't allow the click to propagate to the background (which would dismiss the zoomed polaroid)
        e.stopPropagation();

        // Capture the pointer so that future move events will continue to target this photo rather
        // than triggering e.g. mouseOut or dropping if the cursor leaves the window
        e.currentTarget.setPointerCapture(e.pointerId);

        // If this pointerdown is coming from a slot that is not the current
        // focus, dismiss the focus.  If it's already the current focus, avoid
        // immediately shrinking the polaroid back down again.
        if (focused !== slot) {
          setFocused(undefined);
        }

        // Move this photo to the top of the stack, and start moving this photo with the pointer.
        setDragging(slot);
        setPointerDownPosition({ x: e.clientX, y: e.clientY });
        moveToTopOfStack(slot);
      }
    },
    [focused, moveToTopOfStack],
  );
  const onBackgroundPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button === 0) {
        // Clicking outside of all photos should return any focused photo back to its normal size
        setFocused(undefined);
      }
    },
    [],
  );
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragging) {
        setPositions((prevPositions) => {
          const prevPosition = prevPositions[dragging];
          const newX = prevPosition.x + e.movementX / screenScaleFactor;
          const newPosition = {
            x: newX,
            y: prevPosition.y + e.movementY / screenScaleFactor,
            r: rotationForX(newX), // While moving, align perfectly
          };
          return {
            ...prevPositions,
            [dragging]: newPosition,
          };
        });
      }
    },
    [dragging, screenScaleFactor],
  );
  const endDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, focusOnTrivialMovement = false) => {
      if (dragging) {
        // Only trigger on primary button release
        const deltaX = Math.abs(e.clientX - pointerDownPosition.x);
        const deltaY = Math.abs(e.clientY - pointerDownPosition.y);
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
    [dragging, pointerDownPosition],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      console.log("pointerup", e);
      if (e.button === 0) {
        endDrag(e, true);
      }
    },
    [endDrag],
  );

  const photos = state.photos.map((photo) => {
    const position = positions[photo.slot];
    // TODO: figure out if it's cheaper to index the stack order
    // or just run findIndex 42 times
    const photoOrder = stackOrder.findIndex((item) => {
      return item === photo.slot;
    });
    return (
      <StakeoutPhoto
        key={photo.slot}
        teamState={teamState}
        slot={photo.slot}
        slug={photo.slug}
        title={photo.title}
        desc={photo.desc}
        asset={photo.asset}
        dragging={dragging === photo.slot}
        focused={focused === photo.slot}
        photoOrder={photoOrder}
        position={position}
        onPointerDown={onPhotoPointerDown}
      />
    );
  });

  let overlay;
  if (state.overlay) {
    const puzzleState = teamState.puzzles[state.overlay.slug];
    overlay = (
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
          fontSize: "24px",
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
            lockState={puzzleState?.locked ?? "locked"}
            answer={puzzleState?.answer}
            currency={teamState.currency}
            slug={state.overlay.slug}
            title={state.overlay.label}
          />
        </div>
      </div>
    );
  }
  return (
    <StakeoutBodyMainDiv
      style={{ transform: `scale(${screenScaleFactor})` }}
      onPointerDown={onBackgroundPointerDown}
      onPointerLeave={endDrag}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <StakeoutFonts />
      {overlay}
      {photos}
    </StakeoutBodyMainDiv>
  );
};

export default StakeoutBody;

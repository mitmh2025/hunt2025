import React, {
  type PointerEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import mark from "../assets/safe/safe_dial_draft2_background_zarvox.svg";
import dial from "../assets/safe/safe_dial_draft2_dial_only_zarvox.svg";
import highlights from "../assets/safe/safe_dial_draft2_shadows_zarvox.svg";
import {
  angularDelta,
  rotateMainTumblerBy,
  TUMBLER_INITIAL_STATE,
} from "../combolock";
import { type ModalWithPuzzleFields, type Node } from "../types";
import { default_cursor, draggable_cursor, dragging_cursor } from "./cursors";

const WALL_BG_COLOR = "#4a241e";

// TODO: once the assets get updated, adjust this to match the viewBox exactly
// 50?
const LOCK_WIDTH = 49.851883;
// 41?
const LOCK_HEIGHT = 40.83638;
const SCALE_FACTOR = 6;
const LOCK_COLOR = "#3a3a3a";

const DebugWheelBox = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DebugWheelSpinner = styled(DebugWheelBox)`
  position: absolute;
  border: 1px solid black;
  border-radius: ${(props) => props.$size / 2}px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const DebugWheelTick = styled.div<{ $size: number }>`
  font-size: ${(props) => props.$size / 2}px;
`;

// A debug component used during development to visualize the tumbler states.
const DebugWheel = ({ size, rotation }: { size: number; rotation: number }) => {
  const roundedRotation = Math.trunc(rotation * 100) / 100;
  return (
    <DebugWheelBox $size={size}>
      <DebugWheelSpinner
        $size={size}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <DebugWheelTick $size={size}>|</DebugWheelTick>
      </DebugWheelSpinner>
      <div>{roundedRotation}</div>
    </DebugWheelBox>
  );
};

const DebugPaneContainer = styled.div`
  position: absolute;
  left: 200px;
  top: 200px;
  background-color: white;
  width: 200px;
  height: 800px;
`;

const DebugWheelStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

// For visualizing the tumbler states so we can tell if we got the logic right
const DebugPane = ({ tumblers }: { tumblers: [number, number, number] }) => {
  return (
    <DebugPaneContainer>
      <div>Debug pane: tumbler positions</div>
      <DebugWheelStack>
        <DebugWheel size={200} rotation={tumblers[0]} />
        <DebugWheel size={200} rotation={tumblers[1]} />
        <DebugWheel size={200} rotation={tumblers[2]} />
      </DebugWheelStack>
    </DebugPaneContainer>
  );
};

// Where is the center of the dial, in offset coordinates?
const ORIGIN = {
  x: (LOCK_WIDTH * SCALE_FACTOR) / 2,
  y: (LOCK_HEIGHT * SCALE_FACTOR) / 2,
};

function atan2Degrees(y: number, x: number): number {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

const DialContainer = styled.div<{ $width: number; $height: number }>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;

const DialLayer = styled.div<{ $width: number; $height: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const DialTickLayer = styled(DialLayer)`
  background-image: url(${mark});
`;

const DialWheel = styled(DialLayer)`
  background-image: url(${dial});
  background-color: transparent;
`;

const DialHighlights = styled(DialLayer)`
  background-image: url(${highlights});
  background-color: transparent;
`;

const DialGrip = styled(DialLayer)<{ $dragging: boolean }>`
  cursor: ${(props) => (props.$dragging ? dragging_cursor : draggable_cursor)};
`;

const CombinationLock = ({
  dialRotation,
  dragging,
  width,
  height,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  dialRotation: number;
  dragging: boolean;
  width: number;
  height: number;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
}) => {
  return (
    <DialContainer $width={width} $height={height}>
      {/* One div for the registration mark, which does not rotate */}
      <DialTickLayer $width={width} $height={height} />
      {/* One div for the dial, which does rotate */}
      <DialWheel
        $width={width}
        $height={height}
        style={{ transform: `rotate(${dialRotation}deg)` }}
      />
      {/* One div for the highlights, which do not rotate */}
      <DialHighlights $width={width} $height={height} />
      {/* One div for the invisible click target, which sits on top, does not rotate, but handles interaction */}
      <DialGrip
        $width={width}
        $height={height}
        $dragging={dragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </DialContainer>
  );
};

const Wall = styled.div`
  background-color: ${WALL_BG_COLOR};
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SafeDoor = styled.div`
  background-color: ${LOCK_COLOR};
  width: ${LOCK_WIDTH * SCALE_FACTOR}px;
  height: ${LOCK_HEIGHT * SCALE_FACTOR}px;
`;

const Safe = ({
  node: _node,
  showModal: _showModal,
  setNode,
  opened: _opened,
}: {
  node: Node;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  setNode: (node: Node) => void;
  opened: boolean;
}) => {
  // rotations, in degrees clockwise?
  const [tumblers, setTumblers] = useState<[number, number, number]>(
    TUMBLER_INITIAL_STATE,
  );
  const [dragging, setDragging] = useState<boolean>(false);

  const lastMouseAngle = useRef<number>(0);

  const rotateKnobBy = useCallback((deltaDegrees: number) => {
    setTumblers(([prevTumbler0, prevTumbler1, prevTumbler2]) => {
      return rotateMainTumblerBy(deltaDegrees, [
        prevTumbler0,
        prevTumbler1,
        prevTumbler2,
      ]);
    });
  }, []);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.button === 0) {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        const pos = {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
        };
        const offset = {
          x: pos.x - ORIGIN.x,
          y: pos.y - ORIGIN.y,
        };
        const absoluteAngleDegrees = atan2Degrees(offset.y, offset.x);
        lastMouseAngle.current = absoluteAngleDegrees;
        console.log("down", pos);
      }
    },
    [],
  );

  const onPointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (dragging) {
        const pos = {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
        };
        const offset = {
          x: pos.x - ORIGIN.x,
          y: pos.y - ORIGIN.y,
        };
        // Angle value between -180 and 180
        const absoluteAngleDegrees = atan2Degrees(offset.y, offset.x);
        const deltaDegrees = angularDelta(
          lastMouseAngle.current,
          absoluteAngleDegrees,
        );
        lastMouseAngle.current = absoluteAngleDegrees;
        rotateKnobBy(deltaDegrees);
        console.log("move", pos, deltaDegrees);
      }
    },
    [dragging, rotateKnobBy],
  );

  const onPointerUp: PointerEventHandler<HTMLDivElement> = useCallback((e) => {
    if (e.button === 0) {
      setDragging(false);
      console.log("up");
    }
  }, []);

  const tryOpen = useCallback(() => {
    fetch("/rounds/illegal_search/locks/painting1", {
      method: "POST",
      body: JSON.stringify({ tumblers }),
      headers: {
        "Content-Type": "application/json", // This body is JSON
        Accept: "application/json", // Indicate that we want to receive JSON back
      },
    })
      .then(async (result) => {
        if (result.ok) {
          console.log("Correct:", tumblers);
          const json = (await result.json()) as Node;
          console.log("Response:", json);
          setNode(json);
        } else {
          console.log("Incorrect:", tumblers);
        }
      })
      .catch(() => {
        // Quietly ignore HTTP failures
        console.log("Network error");
      });
  }, [setNode, tumblers]);

  return (
    <Wall>
      <SafeDoor>
        <CombinationLock
          dialRotation={tumblers[0]}
          dragging={dragging}
          width={LOCK_WIDTH * SCALE_FACTOR}
          height={LOCK_HEIGHT * SCALE_FACTOR}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      </SafeDoor>
      <button
        style={{
          display: "block",
          width: "200px",
          height: "200px",
          cursor: default_cursor,
        }}
        onClick={tryOpen}
      >
        Try to open
      </button>
      <DebugPane tumblers={tumblers} />
    </Wall>
  );
};

export default Safe;

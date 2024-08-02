import React, {
  type PointerEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import mark from "../assets/safe/safe_dial_draft2_background_zarvox.svg";
import dial from "../assets/safe/safe_dial_draft2_dial_only_zarvox.svg";
import highlights from "../assets/safe/safe_dial_draft2_shadows_zarvox.svg";
import {
  angularDelta,
  rotateMainTumblerBy,
  TUMBLER_INITIAL_STATE,
} from "../combolock";
import { type ModalWithPuzzleFields, type Node } from "../types";

const WALL_BG_COLOR = "#4a241e";

// TODO: once the assets get updated, adjust this to match the viewBox exactly
// 50?
const LOCK_WIDTH = 49.851883;
// 41?
const LOCK_HEIGHT = 40.83638;
const SCALE_FACTOR = 6;
const LOCK_COLOR = "#3a3a3a";

// A debug component used during development to visualize the tumbler states.
const DebugWheel = ({ size, rotation }: { size: number; rotation: number }) => {
  const sizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "center",
  };
  const style = {
    ...sizeStyle,
    position: "absolute" as const,
    border: `1px solid black`,
    borderRadius: `${size / 2}px`,
    transform: `rotate(${rotation}deg)`,
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "flex-start",
    justifyContent: "center",
  };
  const roundedRotation = Math.trunc(rotation * 100) / 100;
  return (
    <div style={sizeStyle}>
      <div style={style}>
        <div style={{ fontSize: `${size / 2}px` }}>|</div>
      </div>
      <div>{roundedRotation}</div>
    </div>
  );
};

// For visualizing the tumbler states so we can tell if we got the logic right
const DebugPane = ({ tumblers }: { tumblers: [number, number, number] }) => {
  const debugDivPlacement = {
    position: "absolute" as const,
    left: "200px",
    top: "200px",
    backgroundColor: "white",
    width: "200px",
    height: "800px",
  };
  const debugDivWheelsLayout = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "space-evenly",
  };
  return (
    <div key="debug" style={debugDivPlacement}>
      <div>Debug pane: tumbler positions</div>
      <div style={debugDivWheelsLayout}>
        <DebugWheel size={200} rotation={tumblers[0]} />
        <DebugWheel size={200} rotation={tumblers[1]} />
        <DebugWheel size={200} rotation={tumblers[2]} />
      </div>
    </div>
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
  const dialContainerStyle = {
    position: "relative" as const,
    width: `${width}px`,
    height: `${height}px`,
  };

  const lockLayerStyle = {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: `${width}px`,
    height: `${height}px`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };

  const markStyle = {
    ...lockLayerStyle,
    backgroundImage: `url(${mark})`,
  };
  const highlightStyle = {
    ...lockLayerStyle,
    backgroundImage: `url(${highlights})`,
    backgroundColor: "transparent",
  };
  const dialStyle = {
    ...lockLayerStyle,
    transform: `rotate(${dialRotation}deg)`,
    backgroundImage: `url(${dial})`,
    backgroundColor: "transparent",
  };

  const gripStyle = {
    ...lockLayerStyle,
    cursor: dragging ? "grabbing" : "grab",
  };

  return (
    <div className="dial-container" style={dialContainerStyle}>
      {/* One div for the registration mark, which does not rotate */}
      <div className="dial-tick" style={markStyle} />
      {/* One div for the dial, which does rotate */}
      <div className="dial-wheel" style={dialStyle} />
      {/* One div for the highlights, which do not rotate */}
      <div className="dial-highlights" style={highlightStyle} />
      {/* One div for the invisible click target, which sits on top, does not rotate, but handles interaction */}
      <div
        className="dial-grip"
        style={gripStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
};

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

  const style = {
    backgroundColor: LOCK_COLOR,
    width: LOCK_WIDTH * SCALE_FACTOR,
    height: LOCK_HEIGHT * SCALE_FACTOR,
  };

  return (
    <div
      className="wall"
      style={{
        backgroundColor: WALL_BG_COLOR,
        width: "1920px",
        height: "1080px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="safe-outer" style={style}>
        <CombinationLock
          dialRotation={tumblers[0]}
          dragging={dragging}
          width={LOCK_WIDTH * SCALE_FACTOR}
          height={LOCK_HEIGHT * SCALE_FACTOR}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      </div>
      <button
        style={{ display: "block", width: "200px", height: "200px" }}
        onClick={tryOpen}
      >
        Try to open
      </button>
      <DebugPane tumblers={tumblers} />
    </div>
  );
};

export default Safe;

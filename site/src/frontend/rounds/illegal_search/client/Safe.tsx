import React, {
  type PointerEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import mark from "../assets/safe/safe_dial_draft2_background_zarvox.svg";
import dial from "../assets/safe/safe_dial_draft2_dial_only_zarvox.svg";
import highlights from "../assets/safe/safe_dial_draft2_shadows_zarvox.svg";
import { type ModalWithPuzzleFields, type Node } from "../types";

const WALL_BG_COLOR = "#4a241e";

// TODO: once the assets get updated, adjust this to match the viewBox exactly
// 50?
const LOCK_WIDTH = 49.851883;
// 41?
const LOCK_HEIGHT = 40.83638;

const SCALE_FACTOR = 6;

const LOCK_COLOR = "#3a3a3a";

///
/// 412     560        1124        1686     1834
/// |        |          o            |        |
///
/// outer width: 1834 - 412 = 1422
/// inner width: 1686 - 560 = 1126
/// margin: 148
///

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

// Where is the center of the dial, in offset coordinates?
const ORIGIN = {
  x: (LOCK_WIDTH * SCALE_FACTOR) / 2,
  y: (LOCK_HEIGHT * SCALE_FACTOR) / 2,
};

function atan2Degrees(y: number, x: number): number {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function clampAngle(angle: number): number {
  // clamps angle, in degrees, to the range [-180, 180)
  const angleMod360 = angle % 360; // This may still be negative!  JS modulo is weird.
  return ((angleMod360 + 360 + 180) % 360) - 180;
}

function angularDelta(angle: number, nextAngle: number): number {
  return clampAngle(nextAngle - angle);
}

const TUMBLER_OFFSET_DEGREES = 30;

const Safe = ({
  node: _node,
  showModal: _showModal,
  setNode: _setNode,
  opened: _opened,
}: {
  node: Node;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  setNode: (node: Node) => void;
  opened: boolean;
}) => {
  // rotations, in degrees clockwise?
  const [tumblers, setTumblers] = useState<[number, number, number]>([
    0, 170, 0,
  ]);
  const [dragging, setDragging] = useState<boolean>(false);

  const lastMouseAngle = useRef<number>(0);

  const rotateMainTumblerBy = useCallback((deltaDegrees: number) => {
    setTumblers(([prevTumbler0, prevTumbler1, prevTumbler2]) => {
      console.log("deltaDegrees", deltaDegrees);
      const newTumbler0 = clampAngle(prevTumbler0 + deltaDegrees);
      let newTumbler1 = prevTumbler1;
      let newTumbler2 = prevTumbler2;
      // Determine if moving tumbler 0 from prevTumbler0 to newTumbler0 should also move tumbler 1, and by how much.
      // We should bind the tumblers if
      // * the resulting position would overlap, or
      // * the tumblers would have switched relative positions (this can happen if we move by a
      //   large amount at once, and one tumbler would clip through the exclusion area around the
      //   next)
      const prevDelta1 = angularDelta(prevTumbler0, prevTumbler1);
      const delta1 = angularDelta(newTumbler0, prevTumbler1);
      if (
        deltaDegrees > 0 &&
        ((0 < delta1 && delta1 < TUMBLER_OFFSET_DEGREES) ||
          (prevDelta1 > 0 && delta1 < 0))
      ) {
        // Advance tumbler1 to newTumbler0 + TUMBLER_OFFSET_DEGREES
        newTumbler1 = clampAngle(newTumbler0 + TUMBLER_OFFSET_DEGREES);
      }
      if (
        deltaDegrees < 0 &&
        ((0 > delta1 && delta1 > -TUMBLER_OFFSET_DEGREES) ||
          (prevDelta1 < 0 && delta1 > 0))
      ) {
        // Reverse tumbler1 to newTumbler0 - TUMBLER_OFFSET_DEGREES
        newTumbler1 = clampAngle(newTumbler0 - TUMBLER_OFFSET_DEGREES);
      }

      // ditto tumbler1 moving tumbler2
      const prevDelta2 = angularDelta(prevTumbler1, prevTumbler2);
      const delta2 = angularDelta(newTumbler1, prevTumbler2);
      console.log("prevDelta2", prevDelta2, "delta2", delta2);
      if (
        deltaDegrees > 0 &&
        ((0 < delta2 && delta2 < TUMBLER_OFFSET_DEGREES) ||
          (prevDelta2 > 0 && delta2 < 0))
      ) {
        newTumbler2 = clampAngle(newTumbler1 + TUMBLER_OFFSET_DEGREES);
      }
      if (
        deltaDegrees < 0 &&
        ((0 > delta2 && delta2 > -TUMBLER_OFFSET_DEGREES) ||
          (prevDelta2 < 0 && delta2 > 0))
      ) {
        newTumbler2 = clampAngle(newTumbler1 - TUMBLER_OFFSET_DEGREES);
      }

      console.log("new:", newTumbler0, newTumbler1, newTumbler2);
      return [newTumbler0, newTumbler1, newTumbler2];
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
        rotateMainTumblerBy(deltaDegrees);
        console.log("move", pos, deltaDegrees);
      }
    },
    [dragging, rotateMainTumblerBy],
  );

  const onPointerUp: PointerEventHandler<HTMLDivElement> = useCallback((e) => {
    if (e.button === 0) {
      setDragging(false);
      console.log("up");
    }
  }, []);

  const style = {
    backgroundColor: LOCK_COLOR,
    width: LOCK_WIDTH * SCALE_FACTOR,
    height: LOCK_HEIGHT * SCALE_FACTOR,
  };

  const dialContainerStyle = {
    position: "relative" as const,
    width: `${LOCK_WIDTH * SCALE_FACTOR}px`,
    height: `${LOCK_HEIGHT * SCALE_FACTOR}px`,
  };

  const lockLayerStyle = {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: `${LOCK_WIDTH * SCALE_FACTOR}px`,
    height: `${LOCK_HEIGHT * SCALE_FACTOR}px`,
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
    transform: `rotate(${tumblers[0]}deg)`,
    backgroundImage: `url(${dial})`,
    backgroundColor: "transparent",
  };

  const gripStyle = {
    ...lockLayerStyle,
    cursor: dragging ? "grabbing" : "grab",
  };

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
  const debugPane = (
    <div key="debug" style={debugDivPlacement}>
      <div>Debug pane: tumbler positions</div>
      <div style={debugDivWheelsLayout}>
        <DebugWheel size={200} rotation={tumblers[0]} />
        <DebugWheel size={200} rotation={tumblers[1]} />
        <DebugWheel size={200} rotation={tumblers[2]} />
      </div>
    </div>
  );

  return (
    <div
      className="wall"
      style={{
        backgroundColor: WALL_BG_COLOR,
        width: "1920px",
        height: "1080px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="safe-outer" style={style}>
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
      </div>
      {debugPane}
    </div>
  );
};

export default Safe;

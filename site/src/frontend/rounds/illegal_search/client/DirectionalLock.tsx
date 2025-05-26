import React, {
  type DragEventHandler,
  type PointerEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import click from "../assets/desk_drawer/click.mp3";
import knob from "../assets/desk_drawer/knob.svg";
import unlock from "../assets/desk_drawer/unlock.mp3";
import { type Node } from "../types";
import clamp from "./clamp";
import { submitLock } from "./clientState";
import { draggable_cursor } from "./cursors";
import playSound from "./playSound";

// Position of the knob when it is not being moved, in pixels
const KNOB_INITIAL_LEFT = 518;
const KNOB_INITIAL_TOP = 117;

// How far the knob can move in each direction, in pixels
const KNOB_MOVEMENT = 30;

// How far you have to move the knob to trigger a click
const KNOB_CLICK_THRESHOLD = 20;

// How far you have to move the knob back to reset it
const KNOB_RESET_THRESHOLD = 10;

// How close the knob has to be to the center to switch axes
const KNOB_AXIS_SWITCH_THRESHOLD = 5;

// size of the knob
const KNOB_SIZE = 100;

export default function DirectionalLock({
  setNode: setNode,
}: {
  setNode: (node: Node) => void;
}) {
  // Whether the knob is moving along the x or y axis
  const [knobAxis, setKnobAxis] = useState<"x" | "y">("x");

  // Position of knob along the x or y axis (-KNOB_MOVEMENT to KNOB_MOVEMENT)
  const [knobPosition, setKnobPosition] = useState(0);

  // What was the last coordinates (pageX/pageY) of the mouse?
  const dragPos = useRef({ x: 0, y: 0 });

  // Does the knob need to be reset before it can be clicked again?
  const knobNeedsReset = useRef<boolean>(false);

  // Is the knob being dragged?
  const [dragging, setDragging] = useState<boolean>(false);

  // Knob element
  const knobRef = useRef<HTMLImageElement>(null);

  // Last 16 entered directions
  const codeBuffer = useRef<string[]>([]);

  // Whether the puzzle has been solved
  const [solved, setSolved] = useState(false);

  const onPointerDown: PointerEventHandler<HTMLImageElement> = useCallback(
    (e) => {
      if (solved) {
        return;
      }

      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
      dragPos.current = {
        x: e.pageX,
        y: e.pageY,
      };
    },
    [solved],
  );

  const handleClick = useCallback(
    (dir: "u" | "d" | "l" | "r") => {
      playSound(click);

      const newCodeBuffer = [...codeBuffer.current, dir].slice(-16);
      codeBuffer.current = newCodeBuffer;

      const code = newCodeBuffer.join("");
      console.log(code);

      submitLock("deskdrawer", code)
        .then((result) => {
          if (result) {
            playSound(unlock);
            setSolved(true);
            setDragging(false);
            setKnobPosition(0);

            // Allow time for the knob to return to the center before updating the code
            setTimeout(() => {
              setNode(result);
            }, 100);
          }
        })
        .catch(() => {
          console.log("unexpected error");
        });
    },
    [setNode],
  );

  const onPointerMove: PointerEventHandler<HTMLImageElement> = useCallback(
    (e) => {
      if (solved) {
        return;
      }
      if (dragging) {
        setKnobPosition((oldPosition) => {
          const dx = (e.pageX - dragPos.current.x) * 0.5;
          const dy = (e.pageY - dragPos.current.y) * 0.5;

          // Are we close enough to the center to switch axes?
          let axis = knobAxis;
          let position = oldPosition;

          if (Math.abs(position) < KNOB_AXIS_SWITCH_THRESHOLD) {
            if (axis === "x" && Math.abs(dy) > Math.abs(dx)) {
              axis = "y";
              position = 0;
              setKnobAxis("y");
            } else if (axis === "y" && Math.abs(dx) > Math.abs(dy)) {
              axis = "x";
              position = 0;
              setKnobAxis("x");
            }
          }

          dragPos.current = {
            x: e.pageX,
            y: e.pageY,
          };

          const newPos = clamp(
            position + (axis === "x" ? dx : dy),
            -KNOB_MOVEMENT,
            KNOB_MOVEMENT,
          );

          if (knobNeedsReset.current) {
            // If the knob has moved back to the center, reset it
            if (Math.abs(newPos) < KNOB_RESET_THRESHOLD) {
              knobNeedsReset.current = false;
            }
          } else {
            // Check if the knob has moved far enough to trigger a click
            if (Math.abs(newPos) > KNOB_CLICK_THRESHOLD) {
              knobNeedsReset.current = true;

              if (axis === "x") {
                if (newPos > 0) {
                  handleClick("r");
                } else {
                  handleClick("l");
                }
              } else {
                if (newPos > 0) {
                  handleClick("d");
                } else {
                  handleClick("u");
                }
              }
            }
          }

          return newPos;
        });
      }
    },
    [dragging, knobAxis, handleClick, solved],
  );

  const onPointerUp: PointerEventHandler<HTMLImageElement> = useCallback(() => {
    setDragging(false);
    setKnobPosition(0);
  }, []);

  function computeKnobLeftTop() {
    if (knobAxis === "x") {
      return {
        left: KNOB_INITIAL_LEFT + knobPosition,
        top: KNOB_INITIAL_TOP,
      };
    } else {
      return {
        left: KNOB_INITIAL_LEFT,
        top: KNOB_INITIAL_TOP + knobPosition,
      };
    }
  }

  const inhibitDrag: DragEventHandler<HTMLImageElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <img
      src={knob}
      ref={knobRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDragStart={inhibitDrag}
      style={{
        position: "absolute",
        ...computeKnobLeftTop(),
        transition: dragging ? "none" : "left 0.1s linear, top 0.1s linear",
        cursor: dragging && !solved ? "none" : draggable_cursor,
        width: KNOB_SIZE,
        height: KNOB_SIZE,
      }}
      alt=""
    />
  );
}

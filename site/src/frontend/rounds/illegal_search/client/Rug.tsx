import React, {
  type DragEventHandler,
  type PointerEventHandler,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { type TeamHuntState } from "../../../../../lib/api/client";
import FlatRug from "../assets/rug/flat_rug";
import {
  ScreenScaleFactor,
  type ModalWithPuzzleFields,
  type Node,
} from "../types";
import FloorSafe from "./FloorSafe";
import clamp from "./clamp";
import { draggable_cursor, dragging_cursor } from "./cursors";

type Pos = {
  x: number;
  y: number;
};

function MovableRug({
  initialPosition,
  minX,
  maxX,
  minY,
  maxY,
}: {
  initialPosition: Pos;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}) {
  // Is the rug being dragged?
  const [dragging, setDragging] = useState<boolean>(false);
  // Where is the rug located?
  const [position, setPosition] = useState<Pos>(initialPosition);
  // What was the last coordinates (pageX/pageY) of the mouse?
  const dragPos = useRef<Pos>({ x: 0, y: 0 });

  const scaleFactor = useContext(ScreenScaleFactor);

  const onPointerDown: PointerEventHandler<SVGSVGElement> = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    dragPos.current = {
      x: e.pageX,
      y: e.pageY,
    };
  }, []);

  const onPointerMove: PointerEventHandler<SVGSVGElement> = useCallback(
    (e) => {
      if (dragging) {
        const dx = (e.pageX - dragPos.current.x) / scaleFactor;
        const dy = (e.pageY - dragPos.current.y) / scaleFactor;

        setPosition((oldPosition) => ({
          x: clamp(oldPosition.x + dx, minX, maxX),
          y: clamp(oldPosition.y + dy, minY, maxY),
        }));

        dragPos.current = {
          x: e.pageX,
          y: e.pageY,
        };
      }
    },
    [dragging, scaleFactor, minX, maxX, minY, maxY],
  );

  const onPointerUp: PointerEventHandler<SVGSVGElement> = useCallback(() => {
    setDragging(false);
  }, []);

  const inhibitDrag: DragEventHandler<SVGSVGElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  const style = {
    cursor: dragging ? dragging_cursor : draggable_cursor,
    left: position.x,
    top: position.y,
    width: "2136px",
    position: "absolute",
  } as const;

  return (
    <FlatRug
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDragStart={inhibitDrag}
      width={2136}
    />
  );
}

export default function Rug({
  node,
  setNode,
  showModal,
  teamState,
}: {
  node: Node;
  setNode: (node: Node) => void;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  teamState: TeamHuntState;
}) {
  const [gateOpen, setGateOpen] = useState(() => {
    return teamState.rounds.illegal_search?.gates?.includes("isg09") ?? false;
  });

  return (
    <>
      <FloorSafe
        node={node}
        showModal={showModal}
        setNode={setNode}
        opened={gateOpen}
        setOpened={(newVal) => {
          setGateOpen(newVal);
        }}
      />
      <MovableRug
        initialPosition={{ x: -200, y: -540 }}
        minY={-556}
        maxY={800}
        minX={-216}
        maxX={1518}
      />
    </>
  );
}

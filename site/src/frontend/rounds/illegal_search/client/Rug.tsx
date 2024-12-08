import React, {
  type PointerEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../../lib/api/client";
import flat_rug from "../assets/rug/flat_rug.png";
import { type ModalWithPuzzleFields, type Node } from "../types";
import FloorSafe from "./FloorSafe";
import clamp from "./clamp";

type Pos = {
  x: number;
  y: number;
};

const RugImg = styled.img<{ $dragging: boolean }>`
  position: absolute;
  cursor: ${({ $dragging }) => ($dragging ? "grabbing" : "grab")};
`;

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

  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
      dragPos.current = {
        x: e.pageX,
        y: e.pageY,
      };
    },
    [],
  );

  const onPointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (dragging) {
        const dx = e.pageX - dragPos.current.x;
        const dy = e.pageY - dragPos.current.y;

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
    [dragging, minX, maxX, minY, maxY],
  );

  const onPointerUp: PointerEventHandler<HTMLDivElement> = useCallback(() => {
    setDragging(false);
  }, []);

  const style = {
    left: position.x,
    top: position.y,
  };

  return (
    <RugImg
      $dragging={dragging}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      src={flat_rug}
      width={2136}
      alt="A bearskin rug"
    />
  );
}

export default function Rug({
  node,
  setNode,
  showModal,
  teamState: _teamState,
}: {
  node: Node;
  setNode: (node: Node) => void;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  teamState: TeamHuntState;
}) {
  // const gateOpen =
  //   teamState.rounds.illegal_search?.gates?.includes("isg09") ?? false;
  const [gateOpen, setGateOpen] = useState(false);

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

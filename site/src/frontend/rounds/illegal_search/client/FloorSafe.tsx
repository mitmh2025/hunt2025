import React, { type DragEventHandler, useEffect } from "react";
import { styled } from "styled-components";
import beep from "../assets/rug/beep.mp3";
import button_down from "../assets/rug/button_down.svg";
import button_up from "../assets/rug/button_up.svg";
import correct from "../assets/rug/correct.mp3";
import digit_h_off from "../assets/rug/digit_h_off.svg";
import digit_h_on from "../assets/rug/digit_h_on.svg";
import digit_v_off from "../assets/rug/digit_v_off.svg";
import digit_v_on from "../assets/rug/digit_v_on.svg";
import fail from "../assets/rug/fail.mp3";
import numberlock_box from "../assets/rug/numberlock_box.svg";
import numberlock_pad from "../assets/rug/numberlock_pad.svg";
import slide from "../assets/rug/slide.mp3";
import { type ModalWithPuzzleFields, type Node } from "../types";
import { useRenderModalExtras } from "./ExtraModalRenderer";
import { Asset, ModalTrigger } from "./SearchEngine";
import { submitLock } from "./clientState";
import { default_cursor } from "./cursors";
import playSound from "./playSound";

const FloorSafeWrapper = styled.div`
  position: absolute;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
`;

const NumberLockPadWrapper = styled.div<{ $opened: boolean }>`
  position: absolute;
  width: 1920px;
  height: 1080px;
  background-image: url(${numberlock_pad});
  top: ${({ $opened }) => ($opened ? 650 : 0)}px;
  pointer-events: ${({ $opened }) => ($opened ? "none" : "auto")};
  transition: top 1s;
  user-select: none;
`;

const FullImg = styled.img`
  position: absolute;
  width: 1920px;
  height: 1080px;
`;

const NumberButton = styled.button`
  position: absolute;
  width: 92px;
  height: 102px;
  background-image: url(${button_up});
  background-color: transparent;
  border: none;
  font-size: 60px;
  color: #dddddd;
  -webkit-text-stroke: 2px black;
  font-weight: 900;
  padding: 0 12px 12px 0;
  user-select: none;

  cursor: ${default_cursor};

  &:active {
    width: 80px;
    height: 90px;
    padding: 0 0px 0px 0;
    background-image: url(${button_down});
  }
`;

const SegmentImg = styled.img`
  user-select: none;
  position: absolute;
`;

function KeyPad({
  opened,
  onClickDigit,
  onClickClear,
  onClickEnter,
}: {
  opened: boolean;
  onClickDigit: (digit: string) => void;
  onClickClear: () => void;
  onClickEnter: () => void;
}) {
  return (
    <>
      {[
        { x: 808, y: 566, digit: "1" },
        { x: 908, y: 566, digit: "2" },
        { x: 1008, y: 566, digit: "3" },
        { x: 808, y: 680, digit: "4" },
        { x: 908, y: 680, digit: "5" },
        { x: 1008, y: 680, digit: "6" },
        { x: 808, y: 794, digit: "7" },
        { x: 908, y: 794, digit: "8" },
        { x: 1008, y: 794, digit: "9" },
        { x: 808, y: 908, digit: "X" },
        { x: 908, y: 908, digit: "0" },
        { x: 1008, y: 908, digit: "✓" },
      ].map(({ x, y, digit }) => (
        <NumberButton
          key={digit}
          disabled={opened}
          style={{ right: 1920 - 92 - x, bottom: 1080 - 102 - y }}
          onClick={() => {
            if (digit === "X") {
              onClickClear();
            } else if (digit === "✓") {
              onClickEnter();
            } else {
              onClickDigit(digit);
            }
          }}
        >
          {digit}
        </NumberButton>
      ))}
    </>
  );
}

const DIGIT_SEGMENTS = {
  "0": {
    top: true,
    topLeft: true,
    topRight: true,
    middle: false,
    bottomLeft: true,
    bottomRight: true,
    bottom: true,
  },
  "1": {
    top: false,
    topLeft: false,
    topRight: true,
    middle: false,
    bottomLeft: false,
    bottomRight: true,
    bottom: false,
  },
  "2": {
    top: true,
    topLeft: false,
    topRight: true,
    middle: true,
    bottomLeft: true,
    bottomRight: false,
    bottom: true,
  },
  "3": {
    top: true,
    topLeft: false,
    topRight: true,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: true,
  },
  "4": {
    top: false,
    topLeft: true,
    topRight: true,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: false,
  },
  "5": {
    top: true,
    topLeft: true,
    topRight: false,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: true,
  },
  "6": {
    top: true,
    topLeft: true,
    topRight: false,
    middle: true,
    bottomLeft: true,
    bottomRight: true,
    bottom: true,
  },
  "7": {
    top: true,
    topLeft: false,
    topRight: true,
    middle: false,
    bottomLeft: false,
    bottomRight: true,
    bottom: false,
  },
  "8": {
    top: true,
    topLeft: true,
    topRight: true,
    middle: true,
    bottomLeft: true,
    bottomRight: true,
    bottom: true,
  },
  "9": {
    top: true,
    topLeft: true,
    topRight: true,
    middle: true,
    bottomLeft: false,
    bottomRight: true,
    bottom: true,
  },
};

const NTH = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
];

function makeAltText(segment: string, lit: boolean, index: number) {
  return `The ${lit ? "lit" : "unlit"} ${segment} segment of the ${NTH[index]} digit of a series of eight 7-segment displays`;
}

const ignoreDrag: DragEventHandler<HTMLImageElement> = (e) => {
  e.preventDefault();
};

function Display({ code }: { code: string }) {
  return (
    <>
      {[
        { xOffset: 643 },
        { xOffset: 726 },
        { xOffset: 809 },
        { xOffset: 892 },
        { xOffset: 975 },
        { xOffset: 1058 },
        { xOffset: 1141 },
        { xOffset: 1224 },
      ].map(({ xOffset }, index) => {
        const digit = code[code.length - 8 + index];
        const segments =
          digit && digit in DIGIT_SEGMENTS
            ? DIGIT_SEGMENTS[digit as keyof typeof DIGIT_SEGMENTS]
            : {
                top: false,
                topLeft: false,
                topRight: false,
                middle: false,
                bottomLeft: false,
                bottomRight: false,
                bottom: false,
              };

        return (
          <React.Fragment key={index}>
            <SegmentImg
              src={segments.top ? digit_h_on : digit_h_off}
              style={{
                left: xOffset + 8,
                top: 377,
                width: 40,
                height: 14,
              }}
              alt={makeAltText("top", segments.top, index)}
              onDragStart={ignoreDrag}
            />
            <SegmentImg
              src={segments.middle ? digit_h_on : digit_h_off}
              style={{
                left: xOffset + 9,
                top: 444,
                width: 38,
                height: 11,
              }}
              alt={makeAltText("middle", segments.middle, index)}
              onDragStart={ignoreDrag}
            />
            <SegmentImg
              src={segments.bottom ? digit_h_on : digit_h_off}
              style={{
                left: xOffset + 8,
                top: 508,
                width: 40,
                height: 14,
              }}
              alt={makeAltText("bottom", segments.bottom, index)}
              onDragStart={ignoreDrag}
            />
            <SegmentImg
              src={segments.topLeft ? digit_v_on : digit_v_off}
              style={{
                left: xOffset,
                top: 386,
                width: 13,
                height: 63,
              }}
              alt={makeAltText("top-left", segments.topLeft, index)}
              onDragStart={ignoreDrag}
            />
            <SegmentImg
              src={segments.topRight ? digit_v_on : digit_v_off}
              style={{
                left: xOffset + 43,
                top: 386,
                width: 13,
                height: 63,
              }}
              alt={makeAltText("top-right", segments.topRight, index)}
              onDragStart={ignoreDrag}
            />
            <SegmentImg
              src={segments.bottomLeft ? digit_v_on : digit_v_off}
              style={{
                left: xOffset,
                top: 450,
                width: 13,
                height: 63,
              }}
              alt={makeAltText("bottom-left", segments.bottomLeft, index)}
              onDragStart={ignoreDrag}
            />
            <SegmentImg
              src={segments.bottomRight ? digit_v_on : digit_v_off}
              style={{
                left: xOffset + 43,
                top: 450,
                width: 13,
                height: 63,
              }}
              alt={makeAltText("bottom-right", segments.bottomRight, index)}
              onDragStart={ignoreDrag}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function FloorSafe({
  node,
  showModal,
  setNode,
  opened,
  setOpened,
}: {
  node: Node;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  setNode: (node: Node) => void;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}) {
  const [code, setCode] = React.useState("");
  const wasOpened = React.useRef(opened);

  useEffect(() => {
    if (opened && !wasOpened.current) {
      playSound(slide);
    }
    wasOpened.current = opened;
  }, [opened]);

  const modalAssets = node.interactionModals?.map((modal) => {
    const { area, asset } = modal.placedAsset ?? modal;
    const placedAsset = { area, asset };
    return <Asset key={modal.asset} placedAsset={placedAsset} />;
  });
  const modals = node.interactionModals?.map((modal) => {
    return (
      <ModalTrigger
        key={`interaction-modal-${modal.asset}`}
        modal={modal}
        showModal={showModal}
      />
    );
  });

  const extras = useRenderModalExtras(node.interactionModals ?? []);

  return (
    <FloorSafeWrapper>
      <FullImg src={numberlock_box} />
      {modalAssets}
      {modals}
      {extras}
      <NumberLockPadWrapper $opened={opened}>
        <Display code={code} />
        <KeyPad
          opened={opened}
          onClickDigit={(digit) => {
            if (code.length < 8) {
              playSound(beep);
              setCode(code + digit);
            }
          }}
          onClickClear={() => {
            playSound(beep);
            setCode("");
          }}
          onClickEnter={() => {
            submitLock("rug", code)
              .then((result) => {
                if (result) {
                  console.log("okay", result);
                  setNode(result);
                  playSound(correct);
                  setTimeout(() => {
                    setOpened(true);
                  }, 500);
                } else {
                  playSound(fail);
                  setCode("");
                }
              })
              .catch(() => {
                console.log("unexpected error");
              });
          }}
        />
      </NumberLockPadWrapper>
    </FloorSafeWrapper>
  );
}

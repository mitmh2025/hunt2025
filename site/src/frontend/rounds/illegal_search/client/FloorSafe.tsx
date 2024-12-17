import React, { useEffect } from "react";
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
import { Asset, ModalTrigger } from "./SearchEngine";
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

  cursor: ${default_cursor};

  &:active {
    width: 80px;
    height: 90px;
    padding: 0 0px 0px 0;
    background-image: url(${button_down});
  }
`;

function KeyPad({
  onClickDigit,
  onClickClear,
  onClickEnter,
}: {
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
          <>
            <img
              src={segments.top ? digit_h_on : digit_h_off}
              style={{
                position: "absolute",
                left: xOffset + 8,
                top: 377,
                width: 40,
                height: 14,
              }}
              alt=""
            />
            <img
              src={segments.middle ? digit_h_on : digit_h_off}
              style={{
                position: "absolute",
                left: xOffset + 9,
                top: 444,
                width: 38,
                height: 11,
              }}
              alt=""
            />
            <img
              src={segments.bottom ? digit_h_on : digit_h_off}
              style={{
                position: "absolute",
                left: xOffset + 8,
                top: 508,
                width: 40,
                height: 14,
              }}
              alt=""
            />
            <img
              src={segments.topLeft ? digit_v_on : digit_v_off}
              style={{
                position: "absolute",
                left: xOffset,
                top: 386,
                width: 13,
                height: 63,
              }}
              alt=""
            />
            <img
              src={segments.topRight ? digit_v_on : digit_v_off}
              style={{
                position: "absolute",
                left: xOffset + 43,
                top: 386,
                width: 13,
                height: 63,
              }}
              alt=""
            />
            <img
              src={segments.bottomLeft ? digit_v_on : digit_v_off}
              style={{
                position: "absolute",
                left: xOffset,
                top: 450,
                width: 13,
                height: 63,
              }}
              alt=""
            />
            <img
              src={segments.bottomRight ? digit_v_on : digit_v_off}
              style={{
                position: "absolute",
                left: xOffset + 43,
                top: 450,
                width: 13,
                height: 63,
              }}
              alt=""
            />
          </>
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

  return (
    <FloorSafeWrapper>
      <FullImg src={numberlock_box} />
      {modalAssets}
      {modals}
      <NumberLockPadWrapper $opened={opened}>
        <Display code={code} />
        <KeyPad
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
            fetch("/rounds/illegal_search/locks/rug", {
              method: "POST",
              body: JSON.stringify({ code }),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            })
              .then(async (result) => {
                if (result.ok) {
                  const json = (await result.json()) as Node;
                  console.log("okay", json);
                  setNode(json);
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
                console.log("network error");
              });
          }}
        />
      </NumberLockPadWrapper>
    </FloorSafeWrapper>
  );
}

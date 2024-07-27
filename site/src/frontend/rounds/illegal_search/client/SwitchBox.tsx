import React, { type ReactNode, useCallback, useEffect, useState } from "react";
import globalDatasetManager from "../../../client/DatasetManager";
import switch_off from "../assets/audio/switch_off.mp3";
import switch_on from "../assets/audio/switch_on.mp3";
import switch_left from "../assets/fuse_box/fusebox_draft5_switch_pressed_left.svg";
import switch_right from "../assets/fuse_box/fusebox_draft5_switch_pressed_right.svg";
import cubby_open from "../assets/fuse_box/fusebox_draft6_cubby_open_zarvox.svg";
import { type ModalWithPuzzleFields, type Node } from "../types";
import { Asset, ModalTrigger } from "./SearchEngine";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- node/SSR does not have Storage
const HAS_STORAGE = (typeof Storage !== "undefined") as boolean;

// 40 switches
const ALL_OFF: boolean[] = Array(40).fill(false) as boolean[];

const WALL_BG_COLOR = "#4a241e";
const BOX_WIDTH = 700;
const BOX_HEIGHT = 950;
const BOX_BORDER = "2px solid black";
const BOX_BG_COLOR = "#717e7e";

const BOX_INNER_BG_COLOR = "#272727";

const SWITCH_POSITION_LABEL_COLOR = "#cfcfcf";
const SWITCH_ROW_BG_COLOR = "#a5a5a5";
const SWITCH_WIDTH = "83px";
const SWITCH_HEIGHT = "32px";

const Switch = ({
  asset,
  index,
  state,
  onClick,
}: {
  asset: string;
  index: number;
  state: boolean;
  onClick: (index: number) => void;
}) => {
  const onButtonClick = useCallback(() => {
    onClick(index);
    const audio = document.createElement("audio");
    audio.src = state ? switch_off : switch_on;
    void audio.play();
  }, [onClick, index, state]);
  // TODO: maybe make this a checkbox instead?
  const style = {
    display: "inline-block",
    backgroundImage: `url(${asset}`,
    backgroundSize: "contain",
    backgroundColor: "transparent",
    border: "none",
    backgroundRepeat: "no-repeat",
    marginTop: "-6px",
    marginLeft: "4px",
    marginRight: "4px",
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
  };
  return (
    <button
      style={style}
      onClick={onButtonClick}
      title={`Flip switch ${index + 1} ${state ? "off" : "on"}`}
    />
  );
};

const SwitchRow = ({ children }: { children: ReactNode }) => {
  const style = {
    backgroundColor: SWITCH_ROW_BG_COLOR,
    width: "145px",
    height: "32px",
    border: "1px solid black",
    margin: "4px",
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "space-between",
    userSelect: "none" as const,
  };
  return <div style={style}>{children}</div>;
};

const SwitchColumnLabel = ({ columnIsLeft }: { columnIsLeft: boolean }) => {
  const textAlign = columnIsLeft ? ("right" as const) : ("left" as const);
  const text = columnIsLeft ? "OFF|ON" : "ON|OFF";
  const sideMargin = "8px";
  const style = {
    color: SWITCH_POSITION_LABEL_COLOR,
    fontFamily: "monospace",
    fontSize: "24px",
    textAlign,
    alignSelf: columnIsLeft ? "flex-end" : "flex-start",
    height: "28px",
    marginBottom: "8px",
    marginLeft: columnIsLeft ? undefined : sideMargin,
    marginRight: columnIsLeft ? sideMargin : undefined,
  };
  return <div style={style}>{text}</div>;
};

const SwitchNumberLabel = ({ switchNumber }: { switchNumber: number }) => {
  const style = {
    display: "inline-block",
    width: "40px",
    margin: "0px 8px",
    fontSize: "32px",
    fontFamily: "monospace",
    textAlign: "right" as const,
    userSelect: "none" as const,
  };
  return <span style={style}>{switchNumber}</span>;
};

const SwitchColumn = ({
  columnIsLeft,
  children,
}: {
  columnIsLeft: boolean;
  children: ReactNode;
}) => {
  const sideMargin = "24px";
  const columnStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: columnIsLeft ? undefined : sideMargin,
    marginRight: columnIsLeft ? sideMargin : undefined,
  };
  return <div style={columnStyle}>{children}</div>;
};

const Cubby = ({ open }: { open: boolean }) => {
  const bgImage = open ? `url(${cubby_open})` : undefined;
  const style = {
    backgroundImage: bgImage,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    border: open ? undefined : "2px solid black",
    width: "217px",
    height: "56px",
  };
  return <div style={style} />;
};

function printable(data: boolean[]): string {
  return data.map((b) => (b ? "1" : "0")).join("");
}

function parse40bools(data: string): boolean[] | undefined {
  if (data.length !== 40) return undefined;
  const bools = [];
  for (let i = 0; i < 40; i++) {
    const on = data[i] === "1";
    bools.push(on);
  }
  return bools;
}

const SwitchBox = ({
  node,
  setNode,
  showModal,
  opened,
}: {
  node: Node;
  setNode: (node: Node) => void;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  opened: boolean;
}) => {
  const [switchState, setSwitchState] = useState<boolean[]>(() => {
    if (HAS_STORAGE) {
      const savedSwitchState = localStorage.getItem("illegal_search_painting2");
      if (savedSwitchState) {
        const parsedSavedState = parse40bools(savedSwitchState);
        if (parsedSavedState) {
          return parsedSavedState;
        }
      }
    }
    return ALL_OFF;
  });

  const setSwitchesFromString = useCallback((state: string) => {
    const newState = parse40bools(state);
    if (newState) {
      setSwitchState(newState);
    }
  }, []);

  const toggleSwitch = useCallback((i: number) => {
    setSwitchState((prevState) => {
      return [
        ...prevState.slice(0, i),
        !prevState[i],
        ...prevState.slice(i + 1, 40),
      ];
    });
  }, []);

  useEffect(() => {
    if (!opened) {
      fetch("/rounds/illegal_search/locks/painting2", {
        method: "POST",
        body: JSON.stringify({ switches: printable(switchState) }),
        headers: {
          "Content-Type": "application/json", // This body is JSON
          Accept: "application/json", // Indicate that we want to receive JSON back
        },
      })
        .then(async (result) => {
          if (result.ok) {
            console.log("Correct:", printable(switchState));
            const json = (await result.json()) as Node;
            console.log("Response:", json);
            setNode(json);
          } else {
            console.log("Incorrect:", printable(switchState));
          }
        })
        .catch(() => {
          // Quietly ignore HTTP failures
          console.log("Network error");
        });
    }
  }, [opened, setNode, switchState]);

  useEffect(() => {
    if (HAS_STORAGE) {
      // Save state to local storage
      localStorage.setItem("illegal_search_painting2", printable(switchState));
    }
  }, [switchState]);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "illegal_search_painting2",
      (value: object) => {
        const castvalue = value as { switches?: string };
        if (castvalue.switches) {
          setSwitchesFromString(castvalue.switches);
        }
      },
    );
    return stop;
  }, [setSwitchesFromString]);

  const leftColumnRows = switchState
    .slice(0, 20)
    .map((switchOn: boolean, index: number) => {
      const switchIndex = index;
      const asset = switchOn ? switch_right : switch_left;
      return (
        <SwitchRow key={switchIndex}>
          <SwitchNumberLabel switchNumber={switchIndex + 1} />
          <Switch
            asset={asset}
            index={index}
            state={switchOn}
            onClick={toggleSwitch}
          />
        </SwitchRow>
      );
    });
  const rightColumnRows = switchState
    .slice(20, 40)
    .map((switchOn: boolean, index: number) => {
      const switchIndex = index + 20;
      // Right column is on-when-switch-pushed-to-left!
      const asset = switchOn ? switch_left : switch_right;
      return (
        <SwitchRow key={switchIndex}>
          <Switch
            asset={asset}
            index={switchIndex}
            state={switchOn}
            onClick={toggleSwitch}
          />
          <SwitchNumberLabel switchNumber={switchIndex + 1} />
        </SwitchRow>
      );
    });

  const leftColumn = (
    <SwitchColumn key="left-column" columnIsLeft={true}>
      <SwitchColumnLabel columnIsLeft={true} />
      {leftColumnRows}
    </SwitchColumn>
  );

  const rightColumn = (
    <SwitchColumn key="right-column" columnIsLeft={false}>
      <SwitchColumnLabel columnIsLeft={false} />
      {rightColumnRows}
    </SwitchColumn>
  );

  const modalAssets = node.interactionModals?.map((modal) => {
    const { area, asset } = modal;
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
      <div
        className="switchbox-outer"
        style={{
          backgroundColor: BOX_BG_COLOR,
          margin: "auto",
          width: BOX_WIDTH,
          border: BOX_BORDER,
          height: BOX_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="switchbox-inner"
          style={{
            backgroundColor: BOX_INNER_BG_COLOR,
            margin: "auto",
            width: "530px",
            height: "910px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div
            className="switchbox-columns"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {leftColumn}
            {rightColumn}
          </div>
          <Cubby open={opened} />
          {modalAssets}
          {modals}
        </div>
      </div>
    </div>
  );
};

export default SwitchBox;

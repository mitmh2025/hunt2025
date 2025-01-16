import React, { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import ding from "./assets/ding.mp3";
import { getInfo } from "./puzzle";
import type { ControlRoomInfo, ControlRoomServerState } from "./types";
import useReconnectingWebsocket from "./useReconnectingWebsocket";

type WSMessage =
  | {
      name: "game_state";
      state: ControlRoomServerState;
    }
  | {
      name: "teams";
      teams: Record<string, number>;
    };

const Display = ({ info }: { info: ControlRoomInfo }): JSX.Element => {
  const [instruction, setInstruction] = useState<{
    noun: string;
    verb: string;
  } | null>(null);

  const onMessage = useCallback(
    (message: string) => {
      const msg = JSON.parse(message) as WSMessage;
      console.log(msg);
      if (msg.name === "game_state" && msg.state.instruction) {
        setInstruction(msg.state.instruction);
        void new Audio(ding).play();
      }
    },
    [setInstruction],
  );

  useReconnectingWebsocket({
    onMessage,
    wsUrl: info.wsUrl,
  });

  if (instruction === null) {
    return (
      <div id="display" style={{ display: "flex", justifyContent: "center" }}>
        PLEASE HOLD
      </div>
    );
  }

  return (
    <div id="display">
      <div id="chosen">
        <button id="verb" disabled>
          {instruction.verb}
        </button>{" "}
        THE{" "}
        <button id="noun" disabled>
          {instruction.noun}
        </button>
      </div>
    </div>
  );
};

const App = ({ roomId }: { roomId: string }) => {
  const info = getInfo({
    stream_path: `control_room/${roomId}`,
    ws_path: `JaPCdoKSO193/host/ws/${roomId}`,
  });
  return <Display info={info} />;
};

const elem = document.getElementById("root");
if (elem) {
  const roomId = (window as unknown as { roomId: string }).roomId;
  const root = createRoot(elem);
  root.render(<App roomId={roomId} />);
} else {
  console.error("Could not mount App because #root was nowhere to be found");
}

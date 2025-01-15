import React, { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
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
  const [state, setState] = useState<ControlRoomServerState | undefined>(
    undefined,
  );

  const onMessage = useCallback(
    (message: string) => {
      const msg = JSON.parse(message) as WSMessage;
      console.log(msg);
      if (msg.name === "game_state") {
        setState(msg.state);
      }
    },
    [setState],
  );

  useReconnectingWebsocket({
    onMessage,
    wsUrl: info.wsUrl,
  });

  return (
    <div id="display">
      <div id="chosen">
        <button id="verb" disabled>
          {state?.instruction?.verb}
        </button>{" "}
        THE{" "}
        <button id="noun" disabled>
          {state?.instruction?.noun}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const info = {
    wsUrl: "ws://localhost:8086/host/ws/1",
    whepUrl: "http://localhost/foo",
  };
  return <Display info={info} />;
};

const elem = document.getElementById("root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error("Could not mount App because #root was nowhere to be found");
}

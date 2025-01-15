import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  type ControlRoomServerState,
  type ControlRoomTask,
  type ControlRoomInfo,
} from "./types";

type WSMessage =
  | {
      name: "game_state";
      state: ControlRoomServerState;
    }
  | {
      name: "teams";
      teams: Record<string, number>;
    };

const Host = ({ info }: { info: ControlRoomInfo }) => {
  const [state, setState] = useState<ControlRoomServerState | undefined>(
    undefined,
  );
  const [teams, setTeams] = useState<Record<string, number>>({});

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (socketRef.current === null) {
      socketRef.current = new WebSocket(info.wsUrl);
    }

    const { current: socket } = socketRef;

    // Connection opened
    socket.addEventListener("open", (_event) => {
      console.log("Connection established");
    });

    // Listen for messages
    socket.addEventListener("message", (event: MessageEvent<string>) => {
      const msg = JSON.parse(event.data) as WSMessage;
      console.log(msg);
      switch (msg.name) {
        case "game_state":
          setState(msg.state);
          break;
        case "teams":
          setTeams(msg.teams);
          break;
      }
    });

    // Connection error
    socket.addEventListener("error", (event) => {
      // TODO: Reconnect automatically (does "error" mean it's closed?)
      console.log("Connection error", event);
    });

    // Connection closed
    socket.addEventListener("close", (event) => {
      // TODO: Reconnect automatically
      console.log("Connection closed", event);
    });
    return () => {
      socket.close();
    };
  }, [info.wsUrl]);

  function sendMessage(name: string, args?: Record<string, unknown>) {
    socketRef.current?.send(JSON.stringify({ name, ...(args ?? {}) }));
  }

  function markCompletion(task: ControlRoomTask) {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      const complete = !task.finished;
      sendMessage(complete ? "task_complete" : "task_incomplete", {
        task: task.text,
      });
    };
  }

  const teamIdSelect = useRef<HTMLSelectElement>(null);

  function assignRoom() {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      if (teamIdSelect.current) {
        sendMessage("assign_team_id", {
          team_id: parseInt(teamIdSelect.current.value),
        });
      }
    };
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          sendMessage("start_game");
        }}
      >
        START
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          sendMessage("end_game");
        }}
      >
        END
      </button>
      {state?.started && (
        <div id="chosen">
          <button id="verb" disabled>
            {state.instruction.verb}
          </button>{" "}
          THE{" "}
          <button id="noun" disabled>
            {state.instruction.noun}
          </button>
        </div>
      )}
      <div className="content" id="content">
        <div id="col1-ops">
          <h2>Controls</h2>
          <div>
            <select name="team_id" ref={teamIdSelect}>
              {Object.entries(teams).map(([name, team_id]) => (
                <option key={team_id} value={team_id}>
                  {name}
                </option>
              ))}
            </select>
            <button onClick={assignRoom()}>Assign Room</button>
          </div>
        </div>
        {state?.started && (
          <div id="col2">
            <div id="tasks-container">
              <h2>Tasks</h2>
              <ul id="tasks">
                {state.tasks.map((task) => (
                  <li key={task.text}>
                    <button
                      className={task.finished ? "done" : ""}
                      onClick={markCompletion(task)}
                    >
                      {task.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const App = () => {
  const info = {
    wsUrl: "ws://localhost:8086/host/ws/1",
    whepUrl: "http://localhost/foo",
  };
  return <Host info={info} />;
};

const elem = document.getElementById("root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error("Could not mount App because #root was nowhere to be found");
}

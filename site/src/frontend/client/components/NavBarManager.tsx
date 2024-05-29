"use client";

import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { type TeamState } from "../../../../lib/api/client";
import { type Message } from "../../../../lib/ws/types";
import NavBar from "./NavBar";

const getWsUrl = () =>
  `${location.protocol == "https" ? "wss" : "ws"}://${location.host}/ws`;

export default function NavBarManager({
  initialTeamState,
}: {
  initialTeamState?: TeamState;
}) {
  const [teamState, setTeamState] = useState(initialTeamState);
  // TODO: Refactor into helper
  // TODO: Connect in a web worker so a single WebSocket connection can be shared across tabs
  useWebSocket<Message | null>(getWsUrl, {
    share: true,
    shouldReconnect: (event) => {
      console.log(event);
      return false;
    },
    onMessage: (message: MessageEvent<string>) => {
      try {
        const data = JSON.parse(message.data) as Message;
        if (data.type == "team_state") {
          setTeamState(data.data);
        }
      } catch (e) {
        console.error(e);
      }
    },
    filter: () => false,
  });
  return <NavBar teamState={teamState} />;
}

import React from "react";
import { type ControlRoomInfo } from "./types";

const Puzzle = ({ teamId, teamJwt }: { teamId: number; teamJwt?: string }) => {
  const mediaBaseUrl = process.env.MEDIA_BASE_URL ?? "http://localhost:8889";
  const wsBaseUrl =
    process.env.CONTROL_ROOM_BASE_URL ?? "http://localhost:8086/ws";
  const query = teamJwt ? `?jwt=${teamJwt}` : "";
  const info: ControlRoomInfo = {
    whepUrl: `${mediaBaseUrl}/teams/${teamId}/controlRoom${query}`,
    wsUrl: `${wsBaseUrl}${query}`,
  };
  const inlineScript = `window.controlRoomInfo = ${JSON.stringify(info)};`;
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="control-room-root" />
    </>
  );
};

export default Puzzle;

import React from "react";
import { type ControlRoomInfo } from "./types";

const Puzzle = ({ teamId, teamJwt }: { teamId: number; teamJwt?: string }) => {
  const mediaBaseUrl = process.env.MEDIA_BASE_URL ?? "http://localhost:8889";
  const wsBaseUrl =
    process.env.CONTROL_ROOM_BASE_URL ?? "http://localhost:8086/ws";
  const query = teamJwt ? `?jwt=${teamJwt}` : "";
  // ffmpeg -f v4l2 -video_size 640x480 -framerate 30 -i /dev/video0 -b:v 500k -vcodec libx264 -tune zerolatency -preset fast -bf 0 -f rtsp -rtsp_transport tcp 'rtsp://media.staging.mitmh2025.com:8554/control_room/room1?jwt=$jwt
  const info: ControlRoomInfo = {
    whepUrl: `${mediaBaseUrl}/teams/${teamId}/control_room/whep${query}`,
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

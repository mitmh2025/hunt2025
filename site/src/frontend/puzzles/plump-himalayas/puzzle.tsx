import React from "react";
import { ArchivalNotice } from "../../components/PuzzleLayout";

export function getInfo({
  stream_path,
  ws_path,
  jwt,
}: {
  stream_path: string;
  ws_path: string;
  jwt?: string;
}) {
  const mediaBaseUrl = process.env.MEDIA_BASE_URL ?? "http://localhost:8889";
  const wsBaseUrl =
    process.env.CONTROL_ROOM_BASE_URL ?? "http://localhost:8086/";
  const query = jwt ? `?jwt=${jwt}` : "";
  // ffmpeg -f v4l2 -video_size 640x480 -framerate 30 -i /dev/video0 -b:v 500k -vcodec libx264 -tune zerolatency -preset fast -bf 0 -f rtsp -rtsp_transport tcp 'rtsp://media.staging.mitmh2025.com:8554/control_room/room1?jwt=$jwt
  return {
    whepUrl: `${mediaBaseUrl}/${stream_path}/whep${query}`,
    wsUrl: `${wsBaseUrl}${ws_path}${query}`,
  };
}

const Puzzle = ({ teamId, teamJwt }: { teamId: number; teamJwt?: string }) => {
  const info = getInfo({
    jwt: teamJwt,
    stream_path: `teams/${teamId}/control_room`,
    ws_path: `puzzle/control_room/ws`,
  });
  const inlineScript = `window.controlRoomInfo = ${JSON.stringify(info)};`;
  return (
    <>
      <ArchivalNotice />
      <noscript>This puzzle requires Javascript.</noscript>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="control-room-root" />
    </>
  );
};

export default Puzzle;

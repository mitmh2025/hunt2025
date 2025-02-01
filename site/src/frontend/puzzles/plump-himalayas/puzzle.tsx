import React from "react";
import { styled } from "styled-components";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import morty from "./assets/morty.svg";

const StyledImg = styled.img`
  height: 7rem;
`;

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
      <AuthorsNoteBlock>
        <p>
          This puzzle had an on-campus or physical component, and is not
          currently solvable unless you already received the physical materials
          or completed the in-person interaction. We are working on archival
          versions of as much of the hunt as we can, so please check back soon.
        </p>

        <p>
          In the mean time, if you participated in this puzzle (either as the
          player or the team guiding them), you can:
        </p>

        <p>
          <a
            href="https://morty.app/attraction/55472/control-room"
            target="_blank"
            rel="noreferrer"
          >
            <StyledImg src={morty} alt="Find us on Morty" />
          </a>
        </p>
      </AuthorsNoteBlock>
      <noscript>This puzzle requires Javascript.</noscript>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="control-room-root" />
    </>
  );
};

export default Puzzle;

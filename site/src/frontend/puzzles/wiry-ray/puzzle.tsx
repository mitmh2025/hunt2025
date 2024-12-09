import React from "react";
import { rooms, startMessage } from "./data";

const Puzzle = () => {
  const initialRoom = rooms.get(1);
  if (!initialRoom) {
    return <div>Unable to load puzzle data.</div>;
  }
  const initialMessage = [
    startMessage,
    initialRoom.roomDescription,
    initialRoom.moveDescription,
  ].join("\n\n");

  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>
      <script
        id="deepfrost-initial-state"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            message: initialMessage,
          }),
        }}
      />
      <div id="deepfrost-root" />
    </>
  );
};

export default Puzzle;

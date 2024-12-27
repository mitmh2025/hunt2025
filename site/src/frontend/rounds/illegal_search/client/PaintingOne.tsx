import React from "react";
import safe_complete from "../assets/safe/safe_complete.svg";
import safe_frame_modal from "../assets/study/safe_frame_modal.png";
import Painting from "./Painting";
import { Asset, Navigation } from "./SearchEngine";
import { zoom_cursor } from "./cursors";

const PaintingOne = ({ navigate }: { navigate: (destId: string) => void }) => {
  return (
    <>
      <Asset
        placedAsset={{
          area: {
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
          },
          asset: safe_complete,
        }}
      />
      <Navigation
        navigation={{
          area: {
            left: -0.236,
            right: 0.239,
            top: 0.321,
            bottom: -0.321,
          },
          destId: "safe",
          cursor: zoom_cursor,
        }}
        onClick={({ destId }) => {
          navigate(destId);
        }}
      />

      <Painting
        initialPosition={{ x: 610, y: 60 }}
        width={700}
        imageUrl={safe_frame_modal}
      />
    </>
  );
};

export default PaintingOne;

if (typeof window !== "undefined") {
  window.illegalSearchInteractions.painting1 = PaintingOne;
}

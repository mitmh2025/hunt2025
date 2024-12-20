import React from "react";
import LinkedImage from "../../components/LinkedImage";
import drawing from "./assets/shy-embassy_meta_image.png";

export default function Puzzle(): JSX.Element {
  return (
    <>
      <p className="puzzle-flavor">
        How can we discover Papa’s secret identity?
      </p>
      <LinkedImage src={drawing} alt="" />
    </>
  );
}

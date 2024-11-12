import React from "react";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/image.png";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <ul>
        <li>blanched carp</li>
        <li>cloud fruit</li>
        <li>cycling raider</li>
        <li>debonair trim</li>
        <li>devil farmland</li>
        <li>lounge barrel</li>
        <li>mends platoons</li>
        <li>scam blazer</li>
      </ul>
      <LinkedImage
        src={image}
        alt="A diagram showing four groups of boxes and arrows."
      />
    </>
  );
};

export default Puzzle;

import React from "react";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/image.svg";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        A rose by any name would be as fine;
        <br />
        There’s something here in common, by design.
      </p>
      <LinkedImage
        src={image}
        alt="A bunch of scattered, rainbow colored candy hearts. Each heart has one, two, or three letters written on it in white. At the bottom of is a series of twelve hearts in the same colors as the scattered hearts, in rainbow order. Each of these hearts has an underscore written on it."
      />
    </>
  );
};

export default Puzzle;

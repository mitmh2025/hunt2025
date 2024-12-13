import React from "react";
import LinkedImage from "../../components/LinkedImage";
import ferdinand from "./assets/Ferdinand.png";

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Forget everything we’ve read and focus on using what we’ve actually
        learned — the story of his past will not console the victims of his
        current game! If we want to take him down to size, we need the resolve
        to think like him… which I suppose means thinking like someone else.
      </p>

      <p className="puzzle-flavor">
        How do we communicate to Ferdinand that we know his secret?
      </p>

      <LinkedImage
        src={ferdinand}
        alt="Ferdinand, pictured in black and white"
      />
    </>
  );
};

export default Puzzle;

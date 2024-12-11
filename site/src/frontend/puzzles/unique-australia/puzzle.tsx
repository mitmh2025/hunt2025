import React from "react";
import LinkedImage from "../../components/LinkedImage";
import given from "./assets/The-Mark-given.svg";

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Who does Ferdinand say is to blame for his actions?
      </p>
      <LinkedImage
        src={given}
        alt="A grid of 21 hexagons.  One hexagon has a dark dot near the top left corner."
      />
      <ul>
        <li>
          Fill the grid once with pieces and trace paths through it. All paths
          coexist simultaneously.
        </li>
        <li>
          Excepting the beginning or end of a path, which may be on an edge, all
          path segments proceed directly from a center to an adjacent center.
        </li>
        <li>
          Paths are neither required to intersect, nor prohibited from
          intersecting in any way.
        </li>
        <li>
          Each piece may appear multiple times. All instances of each piece are
          identical to within rotation. Mirroring of pieces is not permitted.
        </li>
        <li>
          24 unique letters are used, ordered alphabetically as indicated.
        </li>
        <li>
          Count your stacks only when you must. Valuations have no role in
          placing pieces.
        </li>
      </ul>
    </>
  );
};

export default Puzzle;

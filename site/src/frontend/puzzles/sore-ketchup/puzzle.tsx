import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/image.png";

const StyledDiv = styled.div`
  margin: 1em 0em;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        Riders for Arthur, Bedivere, Dinadan, Erec, Feirefiz, Hoel, Ironside,
        Jaufre, and Kay are planning their upcoming attack. To ensure redundancy
        in battle, riders representing the same knight may not appear in the
        same row or column of the battle, nor may they appear more than once
        within any of the bolded 3x3 squares. To avoid confusion, riders whose
        knights have alphabetically consecutive initials are never orthogonally
        adjacent, except where indicated by an arrow which points from the
        earlier to the later initial. Finally, a rider would never presume to
        stand a knight’s move away from another rider for the same knight,
        except where indicated.
      </p>
      <LinkedImage
        src={image}
        alt="A 9x9 square grid with three 3x3 subgrids delineated by bolder lines. Some pairs of adjacent grid squares have arrows connecting them. Two squares each have one horse’s head in them. These squares are a knight move apart and are connected by a gray line."
      />
      <StyledDiv>
        <div>Where will the knights find their next great victory?</div>
        <div>(1, 7) + (8, 4)</div>
        <div>(1, 5) + (4, 3)</div>
        <div>(7, 8) + (7, 1)</div>
        <div>(6, 5) + (3, 8)</div>
        <div>(5, 3) + (9, 1)</div>
        <div>(1, 3) + (3, 9)</div>
        <div>(4, 4) + (2, 7)</div>
        <div>(2, 6) + (3, 3)</div>
      </StyledDiv>
    </>
  );
};

export default Puzzle;

import React from "react";
import { styled } from "styled-components";
import rootUrl from "../../../utils/rootUrl";

const Arrow = styled.span`
  color: var(--gold-800);
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a href={`${rootUrl}/puzzles/weirdo_threaded_doodads`}>
          Back to main puzzle
        </a>
      </p>
      <p className="puzzle-flavor">
        A classy black-and-white square potholder.
      </p>
      <p>
        Cast on 37 sts in white, but keep a skein of black yarn to hand.
        p37k37p37. k4w k2b k1w k3b k2w k2b k1w k3b k1w k4b k1w k1b k1w k7b k4w
        p4w p1b p5w p1b p1w p1b p1w p1b p1w p4b p1w p1b p1w p2b p1w p2b p3w p1b
        p5w k4w k1b k2w k3b k3w k1b k5w k2b k2w k2b k1w k1b k1w k3b k1w k1b k4w
        p4w p1b p1w p3b p1w p1b p2w p1b p1w p1b p4w p3b p1w p1b p3w p1b p1w p3b
        p4w k5w k1b k2w k5b k2w k1b k3w k3b k1w k2b k1w k1b k1w k3b k1w k1b k4w
        p4w p1b p5w p1b p1w p3b p1w p7b p1w p1b p3w p2b p1w p1b p5w k4w k2b k1w
        k2b k1w k1b k1w k5b k1w k1b k1w k2b k2w k1b k1w k7b k4w p12w p1b p2w p2b
        p3w p5b p3w p1b p1w p3b p4w k8w k6b k1w k2b k2w k2b k1w k2b k2w k2b k2w
        k1b k1w k1b k4w p5w p4b p2w p2b p1w p2b p1w p1b p3w p3b p5w p1b p1w p1b
        p5w k4w k2b k3w k1b k1w k1b k3w k1b k6w k1b k1w k1b k1w k1b k5w k1b k4w
        p5w p1b p2w p2b p2w p2b p1w p1b p1w p2b p1w p1b p3w p3b p2w p2b p1w p1b
        p4w k4w k2b k1w k1b k2w k1b k3w k4b k1w k1b k1w k1b k1w k1b k1w k3b k1w
        k1b k7w p4w p2b p1w p1b p6w p1b p1w p4b p1w p2b p5w p2b p1w p1b p5w k4w
        k2b k1w k1b k1w k1b k2w k1b k1w k1b k1w k1b k1w k1b k1w k2b k3w k4b k2w
        k1b k5w p5w p3b p3w p1b p1w p1b p1w p3b p2w p1b p1w p1b p2w p3b p1w p1b
        p2w p1b p4w k4w k2b k1w k1b k2w k4b k1w k1b k1w k1b k1w k2b k5w k1b k4w
        k2b k4w p4w p5b p2w p1b p3w p1b p1w p3b p1w p2b p1w p2b p2w p1b p2w p1b
        p5w k4w k3b k1w k3b k1w k1b k1w k2b k7w k1b k1w k2b k1w k1b k1w k2b k5w
        p5w p1b p3w p1b p4w p2b p1w p5b p2w p1b p1w p1b p2w p1b p2w p1b p4w k6w
        k1b k3w k3b k2w k1b k1w k1b k1w k1b k1w k2b k1w k5b k1w k3b k4w p12w p3b
        p1w p2b p2w p2b p1w p1b p13w k4w k7b k1w k1b k1w k1b k1w k1b k1w k1b k1w
        k1b k1w k1b k1w k1b k1w k7b k4w p4w p1b p5w p1b p2w p1b p3w p4b p1w p3b
        p1w p1b p5w p1b p4w k4w k1b k1w k3b k1w k1b k2w k3b k1w k1b k4w k1b k3w
        k1b k1w k3b k1w k1b k4w p4w p1b p1w p3b p1w p1b p2w p3b p2w p3b p1w p2b
        p2w p1b p1w p3b p1w p1b p4w k4w k1b k1w k3b k1w k1b k2w k1b k2w k2b k2w
        k1b k1w k3b k1w k1b k1w k3b k1w k1b k4w p4w p1b p5w p1b p3w p4b p1w p6b
        p1w p1b p5w p1b p4w k4w k7b k2w k2b k2w k4b k2w k1b k2w k7b k4w. In
        white, p37k37p37. Bind off 37sts knitwise.
      </p>
    </>
  );
};

export default Puzzle;

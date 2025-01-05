import React from "react";
import { styled } from "styled-components";

const FakeP = styled.div`
  margin: 1em 0;
`;

const Arrow = styled.span`
  color: var(--gold-800);
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a href="/puzzles/weirdo_threaded_doodads">Back to main puzzle</a>
      </p>
      <p className="puzzle-flavor">
        An elegant, squishy flat-knit piece appropriate for circular or straight
        needles a size down from typical for your yarn.
      </p>
      <p>
        What are those needles doing, still packed away? You’ll need them to
        make this bookmark!
      </p>
      <FakeP>
        <div>Abbreviations:</div>
        <div>sl = slip purlwise</div>
        <div>wyif = with yarn in front; hold yarn to the front of the work</div>
        <div>wyib = with yarn in back; hold yarn to the back of the work</div>
      </FakeP>
      <FakeP>
        <div>
          Cast on 44 stitches in white, but keep a skein of black yarn to hand.
          If you’ve run out of white and black, any contrasting colors will do.
        </div>
        <div>Set-up row: p42 sl2.</div>
        <div>
          <strong>Row 1:</strong> Without breaking white, join black. sl2wyib p2
          k2 p1 sl1wyif k1 sl1wyib sl1wyif p1 sl2wyib sl2wyif k1 sl1wyib p1
          sl1wyif k1 sl1wyib sl1wyif p1 k1 sl1wyib p2 k2 sl1wyif p1 k1 sl1wyib
          p2 sl2wyib sl2wyif k1 sl1wyib p1 sl1wyif
        </div>
        <div>
          <strong>Row 2:</strong> sl1wyib k1 sl1wyif p1 sl2wyib sl2wyif k2
          sl1wyif p1 k1 sl1wyib p2 k2 sl1wyif p1 k1 sl1wyib sl1wyif p1 sl1wyib
          k1 sl1wyif p1 sl2wyib sl2wyif k1 sl1wyib sl1wyif p1 sl1wyib k1 p2 k2
          sl2wyif
        </div>
        <div>
          <strong>Row 3:</strong> With white, k2 p2 k2 sl1wyif p1 sl1wyib k1 p1
          sl1wyif k2 p2 sl1wyib k1 sl1wyif p1 sl1wyib k1 p1 sl1wyif sl1wyib k1
          p2 k2 p1 sl1wyif sl1wyib k1 p2 k2 p2 sl1wyib k1 sl1wyif p1
        </div>
        <div>
          <strong>Row 4:</strong> k1 sl1wyib p1 sl1wyif k2 p2 k2 p1 sl1wyif
          sl1wyib k1 p2 k2 p1 sl1wyif sl1wyib k1 p1 sl1wyif k1 sl1wyib p1
          sl1wyif k2 p2 sl1wyib k1 p1 sl1wyif k1 sl1wyib p2 k2 p2
        </div>
        <div>
          <strong>Row 5:</strong> With black, sl2wyib p2 sl2wyib p1 sl1wyif k1
          sl1wyib sl1wyif p1 k2 sl2wyif k1 sl1wyib p2 k2 sl1wyif p1 k1 sl1wyib
          p1 sl1wyif sl1wyib k1 sl1wyif p1 k1 sl1wyib p1 sl1wyif k2 sl2wyif k1
          sl1wyib p1 sl1wyif
        </div>
        <div>
          <strong>Row 6:</strong> sl1wyib k1 sl1wyif p1 sl2wyib p2 sl1wyib k1
          sl1wyif p1 k1 sl1wyib p1 sl1wyif sl1wyib k1 sl1wyif p1 k1 sl1wyib p2
          k2 sl1wyif p1 sl2wyib p2 k1 sl1wyib sl1wyif p1 sl1wyib k1 sl2wyif k2
          sl2wyif
        </div>
        <div>
          <strong>Row 7:</strong> With white, k2 sl1wyif p1 k2 p2 sl1wyib k1 p1
          sl1wyif k2 p2 k2 p2 sl1wyib k1 p1 sl1wyif sl1wyib k1 p2 k2 p1 sl1wyif
          sl1wyib k1 p2 sl1wyib k1 p2 sl1wyib k1 sl1wyif p1
        </div>
        <div>
          <strong>Row 8:</strong> k1 sl1wyib p1 sl1wyif k2 p1 sl1wyif k2 p1
          sl1wyif sl1wyib k1 p2 k2 p1 sl1wyif sl1wyib k1 p1 sl1wyif k2 p2 k2 p2
          sl1wyib k1 p1 sl1wyif k2 p2 k1 sl1wyib p2
        </div>
        <div>
          <strong>Row 9:</strong> With black, sl2wyib p2 sl2wyib p1 sl1wyif k1
          sl1wyib p2 sl2wyib p1 sl1wyif sl2wyib sl2wyif k2 sl1wyif p1 k1 sl1wyib
          p2 k2 sl1wyif p1 k1 sl1wyib p2 k2 sl1wyif p1 k1 sl1wyib p2
        </div>
        <div>
          <strong>Row 10:</strong> k2 sl1wyif p1 k1 sl1wyib p2 k2 sl1wyif p1 k1
          sl1wyib p2 k2 sl1wyif p1 k1 sl1wyib p2 sl2wyib sl2wyif sl1wyib k1
          sl2wyif k2 sl1wyif p1 sl1wyib k1 sl2wyif k2 sl2wyif
        </div>
        <div>
          <strong>Row 11:</strong> With white, [k2, p2] to end.
        </div>
        <div>Bind off all stitches in pattern.</div>
        <div>Stretch the work vertically and weave in the ends.</div>
      </FakeP>
    </>
  );
};

export default Puzzle;

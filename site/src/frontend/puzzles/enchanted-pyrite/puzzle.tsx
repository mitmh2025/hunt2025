import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.svg";
import image2 from "./assets/image2.svg";
import image3 from "./assets/image3.svg";
import image4 from "./assets/image4.svg";
import image5 from "./assets/image5.svg";

const GreenSpan = styled.span`
  color: #6aa84f;
`;

const AuthorsNote = styled.p`
  font-size: 14px;
`;

const PrintImage = styled(LinkedImage)<{ $width: number }>`
  display: block;
  width: ${({ $width }) => $width}px;
  @media print {
    page-break-after: always;
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        Farmer Joe’s flock of 15 sheep are peacefully grazing in the meadow.
        They are well protected from the 11 wolves that roam nearby by a fence
        that runs in a single closed loop along the dotted lines of the grid.
        The sheep are always inside the fence, and the wolves outside of it.
        Numbers in grid cells indicate how many edges of that cell are used by
        the fence. The green symbols <GreenSpan>“s”</GreenSpan> and{" "}
        <GreenSpan>“w”</GreenSpan> indicate cells that contain sheep and wolves
        respectively. (Not all of their positions are given: sheep and wolves
        can also be in cells that contain numbers, or in empty cells.)
      </p>
      <AuthorsNote>
        (Links to Penpa versions of the grids are provided in case you find that
        interface helpful; but you may find it more efficient to use drawing
        software, a tablet note-taking app, or just solve on paper.)
      </AuthorsNote>
      <p>
        On the first day, the wolves are all standing at the edge of the
        surrounding forest, except for two that have already ventured into the
        meadow:
      </p>
      <p>
        <strong>Day 1</strong> (
        <a href="https://tinyurl.com/29zt7bke" target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={715}
        src={image1}
        alt="A hexagonal grid sparsely filled with numbers and green S’s and W’s."
      />
      <p>Every night, three things happen successively, in this order:</p>
      <ol>
        <li>
          First, all the sheep move to new spots inside the fenced area. Each
          sheep travels by a distance of at most 3 grid cells, staying within
          the fence. All the sheep end up in positions that were not occupied by
          sheep during the day; no two sheep end up in the same position; and no
          sheep ends up immediately next to a wolf.
        </li>
        <li>
          Next, Farmer Joe rebuilds the fence along a different loop, in such a
          way that all the sheep are still inside and all the wolves remain
          outside.
        </li>
        <li>
          Finally, each wolf looks for the sheep that lies closest to it
          directly along one of the six directions of the grid (if there are
          several, it chooses one of them at random), and moves in a straight
          line towards that sheep until it is blocked by the fence. The wolves
          always see at least one sheep; they are always able to move by at
          least one cell in their chosen direction; and the paths traced by the
          different wolves over the successive nights do not overlap with one
          another (however a wolf can retrace its own path).
        </li>
      </ol>
      <p>
        Farmer Joe would like your help—figuring out the day-to-day movements of
        all these wolves around the clock is a lot of work!
      </p>
      <p>
        <strong>Day 2</strong> (
        <a href="https://tinyurl.com/26bqttep" target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image2}
        alt="A hexagonal grid sparsely filled with numbers."
      />
      <p>
        <strong>Day 3</strong> (
        <a href="https://tinyurl.com/238sblen" target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image3}
        alt="A hexagonal grid sparsely filled with numbers and green S’s."
      />
      <p>
        <strong>Day 4</strong> (
        <a href="https://tinyurl.com/2b3chtlf" target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image4}
        alt="A hexagonal grid sparsely filled with numbers and green S’s."
      />
      <p>
        <strong>Day 5</strong> (
        <a href="https://tinyurl.com/2ybbysxo" target="_blank" rel="noreferrer">
          Penpa
        </a>
        )
      </p>
      <PrintImage
        $width={695}
        src={image5}
        alt="A hexagonal grid sparsely filled with numbers and green S’s."
      />
    </>
  );
};

export default Puzzle;

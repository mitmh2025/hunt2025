import React from "react";
import { styled } from "styled-components";
import { mainPuzzleAccessGates } from "..";
import type { TeamHuntState } from "../../../../../lib/api/client";
import { COPY_ONLY_CLASS } from "../../../components/CopyToClipboard";
import LinkedImage from "../../../components/LinkedImage";
import { AuthorsNote } from "../../../components/PuzzleLayout";
import img1 from "./assets/img1.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img14 from "./assets/img14.png";
import img15 from "./assets/img15.png";
import img16 from "./assets/img16.png";
import img17 from "./assets/img17.png";
import img18 from "./assets/img18.png";
import img19 from "./assets/img19.png";
import img2 from "./assets/img2.png";
import img20 from "./assets/img20.png";
import img21 from "./assets/img21.png";
import img22 from "./assets/img22.png";
import img23 from "./assets/img23.png";
import img24 from "./assets/img24.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";
import img7 from "./assets/img7.png";
import img8 from "./assets/img8.png";
import img9 from "./assets/img9.png";

const Arrow = styled.span`
  color: var(--black);
`;

const BulletinBoard = styled.div`
  width: 432px;
  height: 432px;
  background:
    radial-gradient(sienna 15%, transparent 16%) 0 0,
    radial-gradient(sienna 15%, transparent 16%) 4px 4px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 4px 5px;
  background-size: 8px 8px;
  background-color: wheat;
  border: 2px solid sienna;
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  border-bottom: 1px solid tan;
  flex: 1 1 100%;

  &:nth-child(3),
  &:nth-child(6) {
    border-bottom: 1px solid sienna;
  }

  &:nth-child(4),
  &:nth-child(7) {
    border-top: 1px solid sienna;
  }

  &:last-child {
    border-width: 0px;
  }

  & > div {
    border-right: 1px solid tan;
    flex: 1 1 100%;
    position: relative;

    &:nth-child(3),
    &:nth-child(6) {
      border-right: 1px solid sienna;
    }

    &:nth-child(4),
    &:nth-child(7) {
      border-left: 1px solid sienna;
    }

    &:last-child {
      border-width: 0px;
    }
  }
`;

const NoteWrapper = styled.div`
  background-color: white;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 5px;
  left: 5px;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Pin = styled.div`
  height: 20px;
  aspect-ratio: 2/3;
  mask:
    conic-gradient(from -30deg at bottom, #0000, #000 1deg 59deg, #0000 60deg)
      bottom/100% 50% no-repeat,
    radial-gradient(
      circle at 50% calc(100% / 3),
      #000 21.5%,
      #000 22% 44%,
      #0000 44.5%
    );
  background: #ec1a23;
  position: absolute;
  top: -10px;
`;

const PinnedImage = styled(LinkedImage)`
  display: block;
  width: 30px;
  height: 30px;
`;

const IMAGES_BY_INDEX = [
  { image: img1, row: 0, col: 2 },
  { image: img2, row: 0, col: 3 },
  { image: img3, row: 1, col: 2 },
  { image: img4, row: 1, col: 5 },
  { image: img5, row: 1, col: 6 },
  { image: img6, row: 1, col: 7 },
  { image: img7, row: 2, col: 1 },
  { image: img8, row: 2, col: 8 },
  { image: img9, row: 3, col: 0 },
  { image: img10, row: 3, col: 1 },
  { image: img11, row: 3, col: 2 },
  { image: img12, row: 4, col: 3 },
  { image: img13, row: 4, col: 6 },
  { image: img14, row: 4, col: 7 },
  { image: img15, row: 5, col: 2 },
  { image: img16, row: 5, col: 7 },
  { image: img17, row: 6, col: 1 },
  { image: img18, row: 6, col: 4 },
  { image: img19, row: 7, col: 0 },
  { image: img20, row: 7, col: 8 },
  { image: img21, row: 8, col: 0 },
  { image: img22, row: 8, col: 3 },
  { image: img23, row: 8, col: 6 },
  { image: img24, row: 8, col: 7 },
].reduce<Record<number, string>>((acc, { image, row, col }) => {
  acc[row * 9 + col] = image;
  return acc;
}, {});

const CopyOnlySudoku = styled.table`
  border-collapse: collapse;
  td {
    border: 1px solid black;
  }
  tr:first-child td {
    border-top-width: 3px;
  }
  td:first-child {
    border-left-width: 3px;
  }
  tr:nth-child(3) td,
  tr:nth-child(6) td,
  tr:last-child td {
    border-bottom-width: 3px;
  }
  td:nth-child(3),
  td:nth-child(6),
  td:last-child {
    border-right-width: 3px;
  }
`;

const Note = ({
  rotation,
  src,
}: {
  rotation: number;
  src: string;
}): JSX.Element => {
  return (
    <NoteWrapper style={{ transform: `rotate(${rotation}deg)` }}>
      <Pin />
      <PinnedImage src={src} alt="A rebus" />
    </NoteWrapper>
  );
};

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const mainPuzzleUnlocked = teamState.gates_satisfied.some((gate) =>
    mainPuzzleAccessGates.has(gate),
  );
  return (
    <>
      {mainPuzzleUnlocked && (
        <p>
          <Arrow>←</Arrow>{" "}
          <a href="/puzzles/and_now_a_puzzling_word_from_our_sponsors">
            Back to main puzzle
          </a>
        </p>
      )}
      <AuthorsNote>Click on images to view them at full size.</AuthorsNote>
      <CopyOnlySudoku className={COPY_ONLY_CLASS}>
        {[...Array(9).keys()].map((row) => (
          <tr key={row}>
            {[...Array(9).keys()].map((col) => {
              const index = row * 9 + col;
              return (
                <td key={col}>
                  {index in IMAGES_BY_INDEX ? (
                    <img src={IMAGES_BY_INDEX[index]} alt="A rebus" />
                  ) : (
                    <></>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </CopyOnlySudoku>
      <BulletinBoard>
        <Row>
          <div></div>
          <div></div>
          <div>
            <Note rotation={-3} src={img1} />
          </div>
          <div>
            <Note rotation={-1} src={img2} />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Row>
        <Row>
          <div></div>
          <div></div>
          <div>
            <Note rotation={-2} src={img3} />
          </div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={1} src={img4} />
          </div>
          <div>
            <Note rotation={3} src={img5} />
          </div>
          <div>
            <Note rotation={-4} src={img6} />
          </div>
          <div></div>
        </Row>
        <Row>
          <div></div>
          <div>
            <Note rotation={-3} src={img7} />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={2} src={img8} />
          </div>
        </Row>
        <Row>
          <div>
            <Note rotation={-1} src={img9} />
          </div>
          <div>
            <Note rotation={3} src={img10} />
          </div>
          <div>
            <Note rotation={-1} src={img11} />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Row>
        <Row>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={-5} src={img12} />
          </div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={-2} src={img13} />
          </div>
          <div>
            <Note rotation={-4} src={img14} />
          </div>
          <div></div>
        </Row>
        <Row>
          <div></div>
          <div></div>
          <div>
            <Note rotation={-3} src={img15} />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={3} src={img16} />
          </div>
          <div></div>
        </Row>
        <Row>
          <div></div>
          <div>
            <Note rotation={2} src={img17} />
          </div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={4} src={img18} />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Row>
        <Row>
          <div>
            <Note rotation={0} src={img19} />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={1} src={img20} />
          </div>
        </Row>
        <Row>
          <div>
            <Note rotation={-2} src={img21} />
          </div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={1} src={img22} />
          </div>
          <div></div>
          <div></div>
          <div>
            <Note rotation={4} src={img23} />
          </div>
          <div>
            <Note rotation={-4} src={img24} />
          </div>
          <div></div>
        </Row>
      </BulletinBoard>
    </>
  );
};

export default Puzzle;

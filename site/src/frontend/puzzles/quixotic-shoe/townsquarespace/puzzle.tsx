import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { mainPuzzleAccessGates } from "..";
import type { TeamHuntState } from "../../../../../lib/api/client";
import { COPY_ONLY_CLASS } from "../../../components/CopyToClipboard";
import Crossword from "../../../components/Crossword";
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

const COPY_ONLY_LABELS = `









`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(9, " ").split(""));

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
      <Crossword
        className={COPY_ONLY_CLASS}
        labels={COPY_ONLY_LABELS}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {};
          if (row === 0) {
            styles.borderTopWidth = "3px";
          }
          if (row === 2 || row === 5 || row === 8) {
            styles.borderBottomWidth = "3px";
          }
          if (column === 0) {
            styles.borderLeftWidth = "3px";
          }
          if (column === 2 || column === 5 || column === 8) {
            styles.borderRightWidth = "3px";
          }
          return styles;
        }}
      />
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

import React from "react";
import spreadsheet from "./assets/bermuda-triangle-spreadsheet.xlsx";
import example1 from "./assets/example1.svg";
import example2 from "./assets/example2.svg";
import day1 from "./assets/day1.svg";
import day2 from "./assets/day2.svg";
import day3 from "./assets/day3.svg";
import day4 from "./assets/day4.svg";
import day5 from "./assets/day5.svg";
import { styled } from "styled-components";
import PuzzleImage from "../../components/PuzzleImage";

const Italics = styled.span`
  font-style: "italic";
`;

const ExampleWrapper = styled.div`
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 1em;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExampleHeader = styled.span<{ $basis: number }>`
  flex: 0 0 ${({ $basis }) => $basis}%;
`;

const ImageWrapper = styled.div`
  flex: 0 0 50%;
  background-color: white;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Italics>
          Solving this puzzle in a spreadsheet is not recommended, but if you
          really must, click{" "}
          <a href={spreadsheet} download="bermuda-triangle-spreadsheet">
            here
          </a>{" "}
          for the grids in Excel format; these can be imported into Google
          Sheets.
        </Italics>
      </p>
      <p>
        On each day of the naval exercises, the given fleet went out to sea in
        the early morning, and every ship got into position. The planned
        exercises involved each ship traveling in a straight line during the
        day, by a distance equal to the number of cells it occupies. Afterwards,
        the fleet went back to port, and a different fleet went out the next
        day.
      </p>
      <p>
        The shaded region in the middle of each grid below is the vortex at the
        heart of the Bermuda Triangle. Nothing within that region is visible to
        radar. Moreover, passing through a position that lies entirely within
        the vortex can sometimes cause a ship to disappear. In that case, the
        ship reappears on the next day, in the middle of the day, at a random
        location/orientation entirely within the vortex; it then completes its
        travel with any remaining moves on that day. No ship disappeared on the
        last day.
      </p>
      <p>
        Fill in the diagrams with the positions of the fleets at the start and
        end of the exercises on each day. The given letters outside each grid
        indicate that our radar detected at least one ship segment carrying that
        letter along that direction. The given numbers indicate the number of
        ship segments detected by our radar along that direction. (Ship segments
        don’t block the radar’s view of other ship segments.)
      </p>
      <p>
        Ship segments belonging to different ships may not occupy adjacent cells
        in any of the grids (but ships may pass within close range of each other
        along the way from their starting position to their final position.) The
        initial and/or final positions of some ships may be partially or
        entirely within the vortex. Ships cannot lie (even partially) outside of
        the grid.
      </p>
      <p>
        To illustrate these rules, here is what happened in last year’s
        exercises near a smaller vortex.
      </p>
      <ExampleWrapper>
        <div>
          <strong>Example</strong> (the Charles River Hexagon)
        </div>
        <FlexWrapper>
          <ExampleHeader $basis={15}>
            <strong>Day 1 Fleet</strong>
          </ExampleHeader>
          <ExampleHeader $basis={20}>
            <strong>A.M.</strong>
          </ExampleHeader>
          <ExampleHeader $basis={15}>
            <strong>P.M.</strong>
          </ExampleHeader>
          <ExampleHeader $basis={15}>
            <strong>Day 2 Fleet</strong>
          </ExampleHeader>
          <ExampleHeader $basis={20}>
            <strong>A.M.</strong>
          </ExampleHeader>
          <ExampleHeader $basis={15}>
            <strong>P.M.</strong>
          </ExampleHeader>
        </FlexWrapper>
        <FlexWrapper>
          <ImageWrapper>
            <PuzzleImage
              src={example1}
              alt="Two hexagonal Battleship puzzles with a darker hexagon in the center."
            />
          </ImageWrapper>
          <ImageWrapper>
            <PuzzleImage
              src={example2}
              alt="Two hexagonal Battleship puzzles with a darker hexagon in the center."
            />
          </ImageWrapper>
        </FlexWrapper>
        <div>
          (On day 1, the ship of length 3 moved by two cells and disappeared in
          the vortex; it reappeared on day 2 in a different
          position/orientation, then moved by one cell.)
        </div>
      </ExampleWrapper>
      <p>
        The admiral is very busy, so please make sure your final report about
        the vortex is just a simple overview.
      </p>
      <ImageWrapper>
        <PuzzleImage
          src={day1}
          alt="Two triangular Battleship puzzles with a darker triangle in the center."
        />
      </ImageWrapper>
      <ImageWrapper>
        <PuzzleImage
          src={day2}
          alt="Two triangular Battleship puzzles with a darker triangle in the center."
        />
      </ImageWrapper>
      <ImageWrapper>
        <PuzzleImage
          src={day3}
          alt="Two triangular Battleship puzzles with a darker triangle in the center."
        />
      </ImageWrapper>
      <ImageWrapper>
        <PuzzleImage
          src={day4}
          alt="Two triangular Battleship puzzles with a darker triangle in the center."
        />
      </ImageWrapper>
      <ImageWrapper>
        <PuzzleImage
          src={day5}
          alt="Two triangular Battleship puzzles with a darker triangle in the center."
        />
      </ImageWrapper>
    </>
  );
};

export default Puzzle;

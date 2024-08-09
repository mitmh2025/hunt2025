import React from "react";
import { styled } from "styled-components";
import bear from "./assets/bear.svg";
import beaver from "./assets/beaver.svg";
import deer from "./assets/deer.svg";
import elk from "./assets/elk.svg";
import moose from "./assets/moose.svg";

const PenTable = styled.table`
  border: 4px solid black;
  border-collapse: collapse;
  td {
    text-align: center;
    vertical-align: middle;
    border-collapse: collapse;
    border: 1px solid black;
  }
  margin: 16px 0px;
`;

const Cell = styled.td`
  width: 64px;
  height: 64px;
`;

const AnimalCellTd = styled(Cell)`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const AnimalCell = ({ asset }: { asset: string }) => {
  // TODO: implement some function for asset host lookup so we can have this copy neatly from sheets
  const sheetsData = `IMAGE("https://zarvox.org${asset}")`;
  return (
    <AnimalCellTd
      data-sheets-formula={sheetsData}
      style={{ backgroundImage: `url(${asset})` }}
    />
  );
};

const GridTable = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  td {
    text-align: center;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    border: 1px solid black;
    border-collapse: collapse;
  }
`;

const GRID_STRING = `
+36 +8 +2 +0 -7 +10
-4 -13 +22 +5 +11 +11
+19 -1 +6 +8 +7 -44
-6 +19 -15 -1 -13 +0
+3 -8 +19 -4 -13 -1
-9 -7 -2 +2 -32 +13
`.trim();
const GRID_ROWS = GRID_STRING.split("\n");
const GRID = GRID_ROWS.map((row) => row.split(" "));

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        These aren’t what I expected from the name.
      </p>
      <p>
        The animals in this zoo orthogonally wander the enclosure throughout the
        day, visiting every part of it exactly once amongst all of them.
      </p>
      <p>
        At the beginning of the day and at the end of the day, no two animals
        are next to each other, including diagonally.
      </p>
      <p>The map shows a state of each animal at some point during the day.</p>

      <CenterColumn>
        <PenTable>
          <tbody>
            <tr>
              <AnimalCell asset={deer} />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
            <tr>
              <AnimalCell asset={bear} />
              <Cell />
              <Cell
                style={{
                  borderBottom: "4px solid black",
                  borderRight: "4px solid black",
                }}
              />
              <Cell />
              <Cell />
              <AnimalCell asset={elk} />
            </tr>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
            <tr>
              <Cell />
              <Cell style={{ borderBottom: "4px solid black" }} />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <AnimalCell asset={moose} />
              <AnimalCell asset={beaver} />
              <Cell />
            </tr>
          </tbody>
        </PenTable>

        <GridTable>
          <tbody>
            {GRID.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((cell, j) => {
                    return <td key={j}>{cell}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </GridTable>
      </CenterColumn>
    </>
  );
};

export default Puzzle;

import React, { type CSSProperties } from "react";
import { styled } from "styled-components";

const RawGrid = `
					7	A	C	A					
			M	5	C	K	L	A	O	S			
		R	Y	D	A	U	S	R	W	O	O		
	L	E			D	T	A	8			L	I	
	O				1	S	L				1	V	
	N				Y	C	A				E	10	
Q	U	R			A	N	T	I			R	Y	P
N	6	L	M	S	L	S	K	U	I	G	X	S	E
I	R	A	S	I	D	A	R	6	O	Y	L	P	R
O				L	I				L	O			B
L	A	G	G			P	H	E			O	R	E
A	F	R	I	N	R	L	G	I	P	E	A	U	X
S	8	S	L	A	S	R	O	8	L	N	I	M	6
I	N	D			S	T	A	N			A	N	T
T	E					S	T					I	A
`
  .replace(/^\n|\n$/g, "")
  .split("\n")
  .map((line) => line.split("\t"));

const isPupil = (row: number, col: number) =>
  row === 4 && (col === 4 || col === 10);

const isFilled = (row: number, col: number) =>
  ((RawGrid[row] ?? [])[col] ?? "") !== "";

const isLeftEyelidThing = (row: number, col: number) =>
  (row === 4 || row === 5) && (col === 2 || col === 8);

const styleForCell = (row: number, col: number) => {
  const cellIsFilled = (RawGrid[row] ?? [])[col] !== "";

  const style: CSSProperties = {
    backgroundColor: isPupil(row, col)
      ? "black"
      : cellIsFilled
        ? "#b7b7b7"
        : "white",
  };

  const leftIsFilled = isFilled(row, col - 1);
  const rightIsFilled = isFilled(row, col + 1);
  const upIsFilled = isFilled(row - 1, col);
  const downIsFilled = isFilled(row + 1, col);

  if (leftIsFilled !== cellIsFilled) {
    style.borderLeft = "3px solid black";
  }
  if (rightIsFilled !== cellIsFilled || isLeftEyelidThing(row, col)) {
    style.borderRight = "3px solid black";
  }
  if (upIsFilled !== cellIsFilled) {
    style.borderTop = "3px solid black";
  }
  if (downIsFilled !== cellIsFilled) {
    style.borderBottom = "3px solid black";
  }

  return style;
};

const GridTable = styled.table`
  border-collapse: collapse;
  margin: 0 auto;

  td {
    height: 2rem;
    width: 2rem;
    line-height: 1;
    text-align: center;
    vertical-align: middle;
  }
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Solving islands in the stream is fun, but something is missing…
      </p>

      <GridTable>
        <tbody>
          {RawGrid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={styleForCell(rowIndex, colIndex)}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </GridTable>
    </>
  );
};

export default Puzzle;

import React from "react";
import { styled } from "styled-components";
import dome from "./assets/great_dome.png";

const LETTERS = `P B A S T E N G H Y N G V B A F E B A M
L B H E H P B Z Z R A P R Z R A L G O A
N G O Z I E O K O N J O I W E A L A H R
G G M U R E R R V F D H V G R N E O V K
G Z B E E B R Y A N E S T E V E N S O N
R C H M G M Y R L N U R N Q B S O L B R
H A B J V A S L T I M H C O O K K B H O
J B H Y Q O N R F B S X V A Q G U B C B
W I L L I A M T M C R A V E N Y L R N E
F R H F R N F V S K Y R N G G R L E J R
B E M A T T T D A M O N Q D I V M T R A
R E R X R L G B Q R I P V C B U A R E G
U R D R E W R H O U S T O N S E N B Y Y
B J V A T H U R G K I G H T D C R J M A
J M I C H A E L R B L O O M B E R G E C
`.trim();

const ROWS = LETTERS.split("\n");
const GRID = ROWS.map((row) => {
  return row.split(" ");
});

const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle;
  font-family: sans-serif;
  td {
    background-color: #d1e6ca;
    border: 1px solid #ccc;
    border-collapse: collapse;
    width: 32px;
    height: 32px;
  }
`;

const Table = ({ grid }: { grid: string[][] }) => {
  const rows = grid.map((row, i) => {
    const cells = row.map((cell, j) => {
      return <td key={j}>{cell}</td>;
    });
    return <tr key={i}>{cells}</tr>;
  });

  return (
    <StyledTable>
      <tbody>{rows}</tbody>
    </StyledTable>
  );
};

const COLUMNS: [string, string, string, string][] = [
  ["L", "?", "?", "?"],
  ["C", "?", "?", "?"],
  ["A", "?", "?", "?"],
  ["S", "?", "?", "?"],
  ["S", "?", "?", "?"],
  ["A", "?", "?", "?"],
];

const DomeDiv = styled.div`
  width: 700px;
  height: 430px;
  background-image: url("${dome}");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  margin-bottom: 32px;
`;

const Circled = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid black;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ColumnDiv = styled(FlexColumn)`
  position: absolute;
  height: 175px;
  width: 40px;
  font-family: sans-serif;
`;

const Column = ({
  column,
  left,
  top,
}: {
  column: [string, string, string, string];
  left: number;
  top: number;
}) => {
  return (
    <ColumnDiv style={{ left, top }}>
      <FlexColumn>
        <div>{column[0]}</div>
        <div>{column[1]}</div>
        <Circled>{column[2]}</Circled>
      </FlexColumn>
      <div>{column[3]}</div>
    </ColumnDiv>
  );
};

const Dome = ({ columns }: { columns: [string, string, string, string][] }) => {
  return (
    <DomeDiv>
      {columns.map((column, i) => {
        return <Column key={i} column={column} top={200} left={i * 87 + 112} />;
      })}
    </DomeDiv>
  );
};

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Important guests have been invited to the great dome.
      </p>

      <FlexColumn>
        <Dome columns={COLUMNS} />
        <Table grid={GRID} />
      </FlexColumn>
    </>
  );
};

export default Puzzle;

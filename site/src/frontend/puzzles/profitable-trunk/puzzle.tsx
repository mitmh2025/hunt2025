import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper } from "../../components/StyledUI";

const TableElement = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
`;

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <HScrollTableWrapper>
      <TableElement>{children}</TableElement>
    </HScrollTableWrapper>
  );
};

const Cell = styled.td`
  width: 30px;
  min-width: 30px;
  height: 40px;
  border: 1px solid black;
  border-collapse: collapse;
  background-color: #fff;
`;

const MarginDiv = styled.div`
  margin: 16px 0px;
`;

const RedCell = styled(Cell)`
  background-color: #f2c0c0;
`;
const BlueCell = styled(Cell)`
  background-color: #c6dbf0;
`;
const YellowCell = styled(Cell)`
  background-color: #fff1c1;
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        This firm wants to make a sea change by phasing in a quick mapping of
        the right names. They assure clients that if they pay attention to what
        the products are named for, sales are sure to take off.
      </p>

      <MarginDiv>
        1.
        <Table>
          <tbody>
            <tr>
              <Cell />
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        2.
        <Table>
          <tbody>
            <tr>
              <Cell />
              <RedCell />
              <BlueCell />
              <Cell />
              <BlueCell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        3.
        <Table>
          <tbody>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <RedCell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        4.
        <Table>
          <tbody>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <RedCell />
              <Cell />
              <RedCell />
              <BlueCell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        5.
        <Table>
          <tbody>
            <tr>
              <RedCell />
              <Cell />
              <Cell />
              <BlueCell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        6.
        <Table>
          <tbody>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        7.
        <Table>
          <tbody>
            <tr>
              <RedCell />
              <Cell />
              <Cell />
              <BlueCell />
              <Cell />
              <BlueCell />
              <YellowCell />
              <RedCell />
              <Cell />
              <Cell />
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <hr />

      <MarginDiv>
        <Table>
          <tbody>
            <tr>
              <Cell />
              <Cell />
              <RedCell />
              <RedCell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        <Table>
          <tbody>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <RedCell />
              <Cell />
              <Cell />
              <BlueCell />
              <BlueCell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        <Table>
          <tbody>
            <tr>
              <Cell />
              <Cell />
              <Cell />
              <RedCell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        <Table>
          <tbody>
            <tr>
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
              <BlueCell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        <Table>
          <tbody>
            <tr>
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
              <BlueCell />
              <YellowCell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        <Table>
          <tbody>
            <tr>
              <Cell />
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
              <BlueCell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <MarginDiv>
        <Table>
          <tbody>
            <tr>
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
              <RedCell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
          </tbody>
        </Table>
      </MarginDiv>

      <hr />

      <div>
        <div>(5→7→1→4→6→3→5)</div>
        <div>(1→5→6→4→1)</div>
        <div>(1→2→3→6→4) / (2→6)</div>
        <div>(5→2) / (3→2→1)</div>
      </div>
    </>
  );
};

export default Puzzle;

import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import { HScrollTableWrapper } from "../../components/StyledUI";

const GridDiv = styled.div`
  @media (min-width: 731px) {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  @media (max-width: 730px) {
    display: block;
    grid-template-columns: none;
  }
`;

export const MaterialsTableContainer = styled.table`
  border-collapse: collapse;
  td {
    border-collapse: collapse;
    border: 1px dashed black;
    background-color: #c5ae85;
    width: 48px;
    min-width: 48px;
    height: 48px;
  }
`;

export const NOTHING_COLOR = "#535353";
export const HEAVY_BLUE = "#5c8ae6";
export const LIGHT_BLUE = "#c5dbf1";
export const LIGHT_RED = "#f0c1c1";
export const EMPTY_COLOR = "#f0e9d1";
export const FILLED_COLOR = "#c5ae85";

export const BuildTable = styled.table`
  border-collapse: collapse;
  td {
    border-collapse: collapse;
    border: 1px solid ${NOTHING_COLOR};
    font-size: 32px;
    font-weight: bold;
    font-family: sans-serif;
  }
`;

const LayoutElement = styled.div`
  margin-bottom: 32px;
`;

export const Cell = styled.td<{ $color?: string }>`
  min-width: 64px;
  width: 64px;
  height: 64px;
  text-align: center;
  vertical-align: middle;
  background-color: ${({ $color }) => $color ?? NOTHING_COLOR};
`;

const MaterialsTable = () => {
  return (
    <HScrollTableWrapper>
      <MaterialsTableContainer>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </MaterialsTableContainer>
    </HScrollTableWrapper>
  );
};

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        A good construction firm can make just about anything out of the right
        pieces.
      </p>

      <GridDiv>
        <LayoutElement>
          <div>Materials:</div>
          <ul>
            <li>Polymer</li>
            <li>Appropriate Tool</li>
            <li>Scrap Material</li>
          </ul>
        </LayoutElement>
        <br className={COPY_ONLY_CLASS} />
        <LayoutElement>
          <MaterialsTable />
        </LayoutElement>

        <LayoutElement>
          <div>You can produce:</div>
          <ul>
            <li>Split</li>
            <li>Rock</li>
            <li>Frame</li>
            <li>Soil</li>
            <li>Up</li>
            <li>Gem</li>
            <li>Clothing</li>
          </ul>
        </LayoutElement>
        <br className={COPY_ONLY_CLASS} />
        <LayoutElement>
          <HScrollTableWrapper>
            <BuildTable>
              <tr>
                <Cell />
                <Cell $color={HEAVY_BLUE} />
                <Cell />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
              </tr>
              <tr>
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={LIGHT_RED} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
              </tr>
              <tr>
                <Cell />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
                <Cell />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
              </tr>
              <tr>
                <Cell />
                <Cell $color={HEAVY_BLUE} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={LIGHT_BLUE} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={FILLED_COLOR}>L</Cell>
              </tr>
              <tr>
                <Cell />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
                <Cell />
                <Cell $color={LIGHT_BLUE} />
                <Cell />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
              </tr>
              <tr>
                <Cell />
                <Cell />
                <Cell />
                <Cell $color={LIGHT_BLUE} />
                <Cell $color={EMPTY_COLOR} />
                <Cell $color={LIGHT_RED} />
                <Cell $color={EMPTY_COLOR} />
                <Cell />
              </tr>
              <tr>
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell $color={FILLED_COLOR}>T</Cell>
                <Cell />
                <Cell />
                <Cell />
              </tr>
            </BuildTable>
          </HScrollTableWrapper>
        </LayoutElement>
      </GridDiv>
    </>
  );
};

export default Puzzle;

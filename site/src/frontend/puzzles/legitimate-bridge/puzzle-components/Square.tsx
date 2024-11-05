import React from "react";
import { css, styled } from "styled-components";
import { type Color, COLOR_TO_CSS } from "./Typedefs";

export enum SquareSide {
  ALL = "ALL",
  TOP = "TOP",
  LEFT = "LEFT",
  BOTTOM = "BOTTOM",
  RIGHT = "RIGHT",
}

type SquareProps = {
  color: Color;
  label?: string;
  onClick: () => void;
  selected: boolean;
  selectionSides?: SquareSide[];
};

const allBorder = css`
  border-width: 8px;
`;

const topBorder = css`
  border-top-width: 8px;
`;

const leftBorder = css`
  border-left-width: 8px;
`;

const bottomBorder = css`
  border-bottom-width: 8px;
`;

const rightBorder = css`
  border-right-width: 8px;
`;

const StyledSquare = styled.div<{
  $color: Color;
  $selected: boolean;
  $selectionSides: SquareSide[];
}>`
  height: 96px;
  width: 96px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px solid gray;
  flex: 0 0 96px;
  ${({ $color, $selectionSides, $selected }) => {
    return css`
      ${COLOR_TO_CSS[$color]}
      ${$selected && $selectionSides.includes(SquareSide.ALL) ? allBorder : {}}
      ${$selected && $selectionSides.includes(SquareSide.TOP) ? topBorder : {}}
      ${$selected && $selectionSides.includes(SquareSide.LEFT)
        ? leftBorder
        : {}}
      ${$selected && $selectionSides.includes(SquareSide.BOTTOM)
        ? bottomBorder
        : {}}
      ${$selected && $selectionSides.includes(SquareSide.RIGHT)
        ? rightBorder
        : {}}
    `;
  }}
`;

export default function Square({
  color,
  label,
  onClick,
  selected,
  selectionSides = [SquareSide.ALL],
}: SquareProps): JSX.Element {
  return (
    <StyledSquare
      $color={color}
      $selected={selected}
      $selectionSides={selectionSides}
      onClick={() => {
        onClick();
      }}
    >
      {label ?? ""}
    </StyledSquare>
  );
}

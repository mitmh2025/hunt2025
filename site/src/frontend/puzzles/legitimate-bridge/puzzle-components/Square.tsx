import React from "react";
import { styled } from "styled-components";
import { type Color, COLOR_TO_HEX } from "./Typedefs";

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

const StyledSquare = styled.div`
  height: 96px;
  width: 96px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px solid gray;
  flex: 0 0 96px;
`;

function getSquareStyles({
  color,
  selected,
  selectionSides,
}: {
  color: Color;
  selected: boolean;
  selectionSides: SquareSide[];
}): React.CSSProperties {
  let styles: React.CSSProperties = {
    backgroundColor: COLOR_TO_HEX[color],
  };
  if (selected) {
    if (selectionSides.includes(SquareSide.ALL)) {
      styles.borderWidth = "8px";
    } else {
      if (selectionSides.includes(SquareSide.TOP)) {
        styles.borderTopWidth = "8px";
      }
      if (selectionSides.includes(SquareSide.LEFT)) {
        styles.borderLeftWidth = "8px";
      }
      if (selectionSides.includes(SquareSide.BOTTOM)) {
        styles.borderBottomWidth = "8px";
      }
      if (selectionSides.includes(SquareSide.RIGHT)) {
        styles.borderRightWidth = "8px";
      }
    }
  }
  return styles;
}

export default function Square({
  color,
  label,
  onClick,
  selected,
  selectionSides = [SquareSide.ALL],
}: SquareProps): JSX.Element {
  return (
    <StyledSquare
      style={getSquareStyles({ color, selected, selectionSides })}
      onClick={() => {
        onClick();
      }}
    >
      {label ?? ""}
    </StyledSquare>
  );
}

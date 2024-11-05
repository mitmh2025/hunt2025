import React from "react";
import { styled } from "styled-components";
import { COLOR_TO_CSS, type PuzzleColor } from "./Typedefs";

const ColorPanel = styled.div<{ $color: PuzzleColor }>`
  height: 132px;
  width: 132px;
  padding: 8px;
  font-size: 2.5em;
  ${({ $color }) => COLOR_TO_CSS[$color]}
`;

type EmptyPanelProps = {
  color: PuzzleColor;
};

export default function EmptyPanel({ color }: EmptyPanelProps): JSX.Element {
  return <ColorPanel $color={color} />;
}

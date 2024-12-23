import React from "react";
import { styled } from "styled-components";
import { COLOR_TO_HEX, type PuzzleColor } from "./Typedefs";

const ColorPanel = styled.div`
  height: 132px;
  width: 132px;
  padding: 8px;
  font-size: 2.5em;
`;

type EmptyPanelProps = {
  color: PuzzleColor;
};

export default function EmptyPanel({ color }: EmptyPanelProps): JSX.Element {
  return <ColorPanel style={{ backgroundColor: COLOR_TO_HEX[color] }} />;
}

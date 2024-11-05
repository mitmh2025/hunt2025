import React from "react";
import { styled } from "styled-components";
import EmptyPanel from "./EmptyPanel";
import { COLOR_TO_CSS, Height, type PuzzleColor } from "./Typedefs";

const StyledWrapper = styled.div<{ $color: PuzzleColor }>`
  height: 132px;
  width: 132px;
  padding: 8px;
  font-size: 2em;
  ${({ $color }) => COLOR_TO_CSS[$color]}
`;

const StyledSignPanel = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignText = styled.div<{ $fontSize: number }>`
  width: 100px;
  flex: 0 0 auto;
  text-align: center;
  font-size: ${({ $fontSize }) => $fontSize}%;
`;

type SignPanelProps = {
  color: PuzzleColor;
  fontSize: number;
  text: string;
};

function SignPanel({ color, fontSize, text }: SignPanelProps): JSX.Element {
  return (
    <StyledWrapper $color={color}>
      <StyledSignPanel>
        <SignText $fontSize={fontSize}>{text}</SignText>
      </StyledSignPanel>
    </StyledWrapper>
  );
}

type SignPanelStackProps = {
  color: PuzzleColor;
  fontSize: number;
  height: Height;
  text: string;
};

export default function SignPanelStack({
  color,
  fontSize,
  height,
  text,
}: SignPanelStackProps): JSX.Element {
  const signPanel = <SignPanel color={color} fontSize={fontSize} text={text} />;
  const emptyPanel = <EmptyPanel color={color} />;

  return (
    <div>
      {height === Height.HIGH ? signPanel : emptyPanel}
      {height === Height.MIDDLE ? signPanel : emptyPanel}
      {height === Height.LOW ? signPanel : emptyPanel}
    </div>
  );
}

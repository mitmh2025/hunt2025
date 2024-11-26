import React from "react";
import { styled } from "styled-components";
import Crossword, { type CrosswordProps } from "./Crossword";

const LetterWrapper = styled.div`
  width: 30px;
  height: 30px;
  text-align: center;
`;

type DropquoteProps = CrosswordProps & {
  letterbanks: string[][];
};

const Dropquote = ({
  letterbanks,
  labels,
  fill,
  getAdditionalCellStyles,
  getAdditionalCellFillStyles,
  className,
}: DropquoteProps): JSX.Element => {
  const letterbankLabels = Array<string>(letterbanks.length).fill("");
  const letterbankFill = letterbanks.map((letterbank, i) =>
    letterbank.map((letter, j) => (
      <LetterWrapper key={`letterbank-${i}-${j}`}>{letter}</LetterWrapper>
    )),
  );
  const longestLetterbankLength = Math.max(
    ...letterbanks.map((letterbank) => letterbank.length),
  );
  return (
    <Crossword
      labels={[letterbankLabels, ...labels]}
      fill={[letterbankFill, ...(fill ?? [])]}
      getAdditionalCellStyles={({ row, column }) => {
        const customStyles = getAdditionalCellStyles?.({ row, column }) ?? {};
        if (row === 0) {
          return {
            height: `${longestLetterbankLength * 30}px`,
            ...customStyles,
          };
        }
        return customStyles;
      }}
      getAdditionalCellFillStyles={({ row, column }) => {
        const customStyles =
          getAdditionalCellFillStyles?.({ row, column }) ?? {};
        if (row === 0) {
          return {
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            ...customStyles,
          };
        }
        return customStyles;
      }}
      className={className}
    />
  );
};

export default Dropquote;

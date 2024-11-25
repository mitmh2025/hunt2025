import React from "react";
import Crossword, { type CrosswordProps } from "./Crossword";

const Dropquote = ({
  labels,
  fill,
  getAdditionalCellStyles,
  getAdditionalCellFillStyles,
  className,
}: CrosswordProps): JSX.Element => {
  return (
    <Crossword
      labels={labels}
      fill={fill}
      getAdditionalCellStyles={({ row, column, fill }) => {
        const customStyles =
          getAdditionalCellStyles?.({ row, column, fill }) ?? {};
        if (row === 0) {
          return {
            minHeight: `${fill.length * 2}em`,
            writingMode: "vertical-lr",
            textOrientation: "upright",
            ...customStyles,
          };
        }
        return customStyles;
      }}
      getAdditionalCellFillStyles={({ row, column, fill }) => {
        const customStyles =
          getAdditionalCellFillStyles?.({ row, column, fill }) ?? {};
        if (row === 0) {
          return {
            textAlign: "end",
          };
        }
        return customStyles;
      }}
      className={className}
    />
  );
};

export default Dropquote;

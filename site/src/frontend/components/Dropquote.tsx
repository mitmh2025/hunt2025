import React from "react";
import Crossword, { type CrosswordProps } from "./Crossword";

const Dropquote = ({
  labels,
  fill,
  getAdditionalCellStyles,
  getAdditionalLabelStyles,
  className,
}: CrosswordProps): JSX.Element => {
  return (
    <Crossword
      labels={labels}
      fill={fill}
      getAdditionalCellStyles={({ row, column, label }) => {
        const customStyles =
          getAdditionalCellStyles?.({ row, column, label }) ?? {};
        if (row === 0) {
          return {
            minHeight: `${label.length}em`,
            position: "static",
            textAlign: "center",
            ...customStyles,
          };
        }
        return {};
      }}
      getAdditionalLabelStyles={({ row, column }) => {
        const customStyles = getAdditionalLabelStyles?.({ row, column }) ?? {};
        if (row === 0) {
          return {
            position: "static",
            writingMode: "vertical-lr",
            textOrientation: "upright",
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

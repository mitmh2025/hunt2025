import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS, NO_COPY_CLASS } from "./CopyToClipboard";

const BlankContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 2em;
  margin-bottom: 1em;
`;

const CellContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Cell = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 2em;
`;

const BlankCell = styled(Cell)`
  min-width: 2em;
  border-bottom: 1px solid black;
`;

export type BlankProps = {
  /** List describing the structure of the blanks. _ for a blank, empty for an undecorated cell */
  structure: string[];
  /** List describing the contents of the blanks */
  fill?: React.ReactNode[];
  /** Whether fill goes above or below the line. Default: above */
  fillPosition?: "above" | "below";
  /** Whether fill goes above or below the line when copy/pasted. Default: below */
  fillCopyPosition?: "above" | "below";
  /** A function that applies custom styles to a cell based on the index */
  getAdditionalCellStyles?: (index: number) => React.CSSProperties;

  className?: string;
};

export const CopyableBlanks = ({
  structure,
  fill,
  fillCopyPosition = "below",
  getAdditionalCellStyles,
}: BlankProps): JSX.Element => {
  return (
    <table className={COPY_ONLY_CLASS}>
      <tr>
        {structure.map((char, i) => {
          const styles: CSSProperties = {
            ...(getAdditionalCellStyles?.(i) ?? {}),
            ...(char === "_" ? { borderBottom: "1px solid black" } : {}),
          };
          return (
            <td key={i} style={styles}>
              {fillCopyPosition === "above" ? fill?.[i] ?? " " : ""}
            </td>
          );
        })}
      </tr>
      {fill && fillCopyPosition === "below" && (
        <tr>
          {fill.map((content, i) => (
            <td key={i} style={{ textAlign: "center" }}>
              {content}
            </td>
          ))}
        </tr>
      )}
    </table>
  );
};

const Blanks = ({
  className,
  structure,
  fill,
  fillPosition = "above",
  fillCopyPosition = "below",
  getAdditionalCellStyles,
}: BlankProps): JSX.Element => {
  return (
    <>
      <BlankContainer className={`${className ?? ""} ${NO_COPY_CLASS}`}>
        {structure.map((char, i) => {
          const Component = char === "_" ? BlankCell : Cell;
          return (
            <CellContainer key={i} style={getAdditionalCellStyles?.(i) ?? {}}>
              {fillPosition === "above" ? (
                <Component className="cell">{fill?.[i] ?? " "}</Component>
              ) : (
                <>
                  {" "}
                  <Component className="cell" />
                  <div>{fill?.[i]}</div>
                </>
              )}
            </CellContainer>
          );
        })}
      </BlankContainer>
      <CopyableBlanks
        structure={structure}
        fill={fill}
        fillCopyPosition={fillCopyPosition}
        getAdditionalCellStyles={getAdditionalCellStyles}
      />
    </>
  );
};

export default Blanks;

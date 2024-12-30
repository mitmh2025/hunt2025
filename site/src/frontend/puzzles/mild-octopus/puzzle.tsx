import React from "react";
import { styled } from "styled-components";
import Blanks from "../../components/Blanks";

const Separator = styled.hr`
  border: 1px solid var(--black);
`;

const StyledBlanks = styled(Blanks)`
  margin: 8px 0px;
`;

const Puzzle = () => {
  const finalEnumerationPunctuation = new Set([1, 8, 8, 10, 12, 17]);

  return (
    <>
      <p className="puzzle-flavor">
        Fed up with half info, it’s taking charge of what’s missing below.
      </p>
      <Separator />
      <StyledBlanks
        structure={["_", "", "_", "", "_", "_", "_", "_", "_", " "]}
        fill={["12", "estate", "2", "has", "7", "14", "1", "6", "4", "sign"]}
      />
      <StyledBlanks
        structure={["_", "_", "_", "_", "", "_", ""]}
        fill={["15", "8", "1", "10", "unit of", "5", "inside"]}
      />
      <StyledBlanks
        structure={["_", "", "_", ""]}
        fill={["4", "distribution tool picked up by", "13", "Confederate"]}
      />
      <StyledBlanks
        structure={["_", "", "_", "", "_", "", "_", "_"]}
        fill={["8", "-ringed", "2", "with", "15", "domain", "1", "9"]}
        getAdditionalCellStyles={(index) =>
          index === 1 ? { marginLeft: "-8px" } : {}
        }
      />
      <StyledBlanks
        structure={["_", "_", "", "_"]}
        fill={["9", "11", "in", "16"]}
      />
      <StyledBlanks
        structure={["_", "", "_", "", "_", "_"]}
        fill={["7", "-sized", "3", "in", "9", "14"]}
        getAdditionalCellStyles={(index) =>
          index === 1 ? { marginLeft: "-8px" } : {}
        }
      />
      <StyledBlanks structure={["_", "_"]} fill={["9", "11"]} />
      <Separator />
      <ol>
        <li>(3)</li>
        <li>(4)</li>
        <li>(4)</li>
        <li>(5)</li>
        <li>(6)</li>
        <li>(5)</li>
        <li>(3)</li>
        <li>(8)</li>
        <li>(5)</li>
        <li>(3)</li>
        <li>(7)</li>
        <li>(4)</li>
        <li>(10)</li>
        <li>(5)</li>
        <li>(5)</li>
        <li>(5)</li>
      </ol>
      <Separator />
      <Blanks
        structure={[
          "_",
          "",
          "_",
          "",
          "_",
          "_",
          "_",
          "_",
          "",
          "_",
          "",
          "_",
          "",
          "_",
          "_",
          "_",
          "_",
          "",
        ]}
        fill={[
          "3",
          ",",
          "3",
          ",",
          "10",
          "6",
          "1",
          "13",
          ".",
          "5",
          ":",
          "16",
          ".",
          "4",
          "12",
          "15",
          "11",
          ".",
        ]}
        getAdditionalCellStyles={(index) =>
          finalEnumerationPunctuation.has(index) ? { marginLeft: "-8px" } : {}
        }
      />
    </>
  );
};

export default Puzzle;

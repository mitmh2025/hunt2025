import React from "react";
import { styled } from "styled-components";

export type Outputs = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type Color = "black" | "white" | "grey";

const OutputBlockDiv = styled.div<{ $bgcolor: Color; $ftcolor: string }>`
  border: 1px solid black;
  background-color: ${({ $bgcolor }) => $bgcolor};
  width: 80px;
  height: 80px;
  color: ${({ $ftcolor }) => $ftcolor};
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
  line-height: 80px;
`;

export const OutputBlock = ({
  state,
  label,
}: {
  state: number;
  label?: number | string;
}) => {
  const bgcolor = ["black", "grey", "white"][state] as Color;
  const ftcolor = ["white", "black", "black"][state] as Color;
  return (
    <OutputBlockDiv $bgcolor={bgcolor} $ftcolor={ftcolor}>
      {label}
    </OutputBlockDiv>
  );
};

export const Display = ({
  outputs,
}: {
  outputs: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <OutputBlock state={outputs[0]} label={1} />
          </td>
          <td>
            <OutputBlock state={outputs[1]} label={2} />
          </td>
          <td>
            <OutputBlock state={outputs[2]} label={3} />
          </td>
        </tr>
        <tr>
          <td>
            <OutputBlock state={outputs[3]} label={4} />
          </td>
          <td>
            <OutputBlock state={outputs[4]} label={5} />
          </td>
          <td>
            <OutputBlock state={outputs[5]} label={6} />
          </td>
        </tr>
        <tr>
          <td>
            <OutputBlock state={outputs[6]} label={7} />
          </td>
          <td>
            <OutputBlock state={outputs[7]} label={8} />
          </td>
          <td>
            <OutputBlock state={outputs[8]} label={9} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

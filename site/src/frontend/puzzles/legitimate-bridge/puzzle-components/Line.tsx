import React from "react";
import { css, styled } from "styled-components";

export enum LineType {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  TOP_LEFT_CORNER = "TOP_LEFT_CORNER",
  TOP_RIGHT_CORNER = "TOP_RIGHT_CORNER",
  BOTTOM_LEFT_CORNER = "BOTTOM_LEFT_CORNER",
  BOTTOM_RIGHT_CORNER = "BOTTOM_RIGHT_CORNER",
  T_LEFT = "T_LEFT",
  T_UP = "T_UP",
}

type LineProps = {
  type: LineType;
  show: boolean;
};

const cornerStyles = css`
  width: 54px;
  height: 54px;
  &:after {
    content: "";
    display: block;
    position: relative;
    background-color: #ecd89dee;
    width: 42px;
    height: 42px;
  }
`;

const tAfterStyles = css`
  content: "";
  display: block;
  position: relative;
  background-color: black;
`;

const StyledLine = styled.div<{ $type: LineType }>`
  background-color: black;
  ${({ $type }) => {
    switch ($type) {
      case LineType.VERTICAL:
        return css`
          width: 12px;
          height: 100%;
        `;
      case LineType.HORIZONTAL:
        return css`
          width: 100%;
          height: 12px;
        `;
      case LineType.TOP_LEFT_CORNER:
        return css`
          ${cornerStyles}
          place-self: end;
          border-top-left-radius: 54px;
          &:after {
            top: 12px;
            left: 12px;
            border-top-left-radius: 42px;
          }
        `;
      case LineType.TOP_RIGHT_CORNER:
        return css`
          ${cornerStyles}
          align-self: end;
          justify-self: start;
          border-top-right-radius: 54px;
          &:after {
            top: 12px;
            border-top-right-radius: 42px;
          }
        `;
      case LineType.BOTTOM_LEFT_CORNER:
        return css`
          ${cornerStyles}
          align-self: start;
          justify-self: end;
          border-bottom-left-radius: 54px;
          &:after {
            left: 12px;
            border-bottom-left-radius: 42px;
          }
        `;
      case LineType.BOTTOM_RIGHT_CORNER:
        return css`
          ${cornerStyles}
          place-self: start;
          border-bottom-right-radius: 54px;
          &:after {
            border-bottom-right-radius: 42px;
          }
        `;
      case LineType.T_LEFT:
        return css`
          width: 12px;
          height: 100%;
          &:after {
            ${tAfterStyles}
            height: 12px;
            width: 42px;
            left: 12px;
            top: 42px;
          }
        `;
      case LineType.T_UP:
        return css`
          width: 100%;
          height: 12px;
          &:after {
            ${tAfterStyles}
            height: 42px;
            width: 12px;
            left: 42px;
            top: -42px;
          }
        `;
    }
  }}
`;

export default function Line({ type, show }: LineProps): JSX.Element {
  return show ? <StyledLine $type={type} /> : <div />;
}

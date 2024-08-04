import React from "react";

export type MathMLAttributes = {
  className?: string;
  dir?: "ltr" | "rtl";
  displaystyle?: boolean;
  href?: string;
  id?: string;
  mathbackground?: string;
  mathcolor?: string;
  mathsize?: string;
  nonce?: unknown;
  scriptlevel?: unknown;
  style?: CSSStyleDeclaration;
  tabindex?: number;
};

export type ChildrenProps = {
  children?: React.ReactNode | React.ReactNode[] | string;
};

export type MathMLProps = MathMLAttributes & ChildrenProps;

function GenericMathMLComponent(
  tagName: string,
): React.FunctionComponent<MathMLProps> {
  const func = (props: MathMLProps) => {
    const { children, ...rest } = props;
    return React.createElement(tagName, rest, children);
  };
  func.displayName = tagName;
  return func;
}

// There's a bunch of tags that don't need to accept custom props beyond the MathML globals and React children
export const MN = GenericMathMLComponent("mn"); // numeric literal
export const MRow = GenericMathMLComponent("mrow"); // row
export const MRoot = GenericMathMLComponent("mroot"); // generic root with explicit index
export const MSqrt = GenericMathMLComponent("msqrt"); // Square root (no index)
export const MMultiScripts = GenericMathMLComponent("mmultiscripts");
export const MPrescripts = GenericMathMLComponent("mprescripts");
export const MPhantom = GenericMathMLComponent("mphantom"); // phantom element (used for layout, not displayed)
export const MText = GenericMathMLComponent("mtext"); // Arbitrary text with no notational meaning, like comments or annotations

// There's others that require some additional typing
export type MathProps = MathMLProps & {
  display?: "block" | "inline";
};
export const Math = (props: MathProps) => {
  const { children, ...rest } = props;
  return React.createElement("math", rest, children);
};

// <mfrac>numerator denominator</mfrac>
export type MFracProps = MathMLProps & {
  linethickness?: string;
  numalign?: "left" | "center" | "right";
};
export const MFrac = (props: MFracProps) => {
  const { children, ...rest } = props;
  return React.createElement("mfrac", rest, children);
};

// <mi>identifier</mi>: identifier (function name, variable, or symbolic constant)
export type MIProps = MathMLProps & {
  mathvariant?: "normal";
};
export const MI = (props: MIProps) => {
  const { children, ...rest } = props;
  return React.createElement("mi", rest, children);
};

// <mo>operator</mo>: operator
export type MOProps = MathMLProps & {
  fence?: boolean;
  largeop?: boolean;
  lspace?: string;
  maxsize?: string;
  minsize?: string;
  movablelimits?: boolean;
  rspace?: string;
  separator?: boolean;
  stretchy?: boolean;
  symmetric?: boolean;
};
export const MO = (props: MOProps) => {
  const { children, ...rest } = props;
  return React.createElement("mo", rest, children);
};

export type MSProps = MathMLProps & {
  lquote?: string;
  rquote?: string;
};
export const MS = (props: MSProps) => {
  const { children, ...rest } = props;
  return React.createElement("ms", rest, children);
};

export type MSubProps = MathMLProps & {
  subscriptshift?: string;
};
export const MSub = (props: MSubProps) => {
  const { children, ...rest } = props;
  return React.createElement("msub", rest, children);
};
export type MSupProps = MathMLProps & {
  superscriptshift?: string;
};
export const MSup = (props: MSupProps) => {
  const { children, ...rest } = props;
  return React.createElement("msup", rest, children);
};

export type MSubSupProps = MSubProps & {
  subscriptshift?: string;
  superscriptshift?: string;
};
export const MSubSup = (props: MSubSupProps) => {
  const { children, ...rest } = props;
  return React.createElement("msubsup", rest, children);
};

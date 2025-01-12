export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

type Size = {
  xs?: string;
  sm: string;
  md: string;
  lg: string;
  xl?: string;
};

export const sizeMax: Size = {
  xs: "479px", // for mobile
  sm: "767px", // for ipad
  md: "1079px", // small laptop windows
  lg: "1199px", // laptop windows
};

export const sizeMin: Size = {
  sm: "480px", // for ipad
  md: "768px", // small laptop windows
  lg: "1080px", // laptop windows
  xl: "1200px", // big screens
};

export const deviceMax = {
  xs: `(max-width: ${sizeMax.xs})`,
  sm: `(max-width: ${sizeMax.sm})`,
  md: `(max-width: ${sizeMax.md})`,
  lg: `(max-width: ${sizeMax.lg})`,
};

export const deviceMin = {
  sm: `(min-width: ${sizeMin.sm})`,
  md: `(min-width: ${sizeMin.md})`,
  lg: `(min-width: ${sizeMin.lg})`,
  xl: `(min-width: ${sizeMin.xl})`,
};

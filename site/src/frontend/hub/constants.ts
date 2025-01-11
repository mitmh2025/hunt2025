export const MAX_WIDTH = 3840;
export const MAX_HEIGHT = 2160;

export function getRelativeSizeCss(size: number) {
  return `min(calc((100vw - var(--scrollbar-width)) * ${size / MAX_WIDTH}), ${size}px)`;
}

export const defaultShadow = `${getRelativeSizeCss(4)} ${getRelativeSizeCss(4)}
${getRelativeSizeCss(6)} rgba(0, 0, 0, 0.53)`;

export const defaultShadowFilter = `drop-shadow(${getRelativeSizeCss(4)} ${getRelativeSizeCss(4)} ${getRelativeSizeCss(6)} rgba(0, 0, 0, 0.53))`;

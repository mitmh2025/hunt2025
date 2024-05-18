/* eslint-disable */
// @ts-nocheck

export const reactServerManifest = await import(
  /* webpackIgnore: true */ `./react-server-manifest.json`,
  { assert: { type: "json" } }
).then((m) => m.default);

export const reactClientManifest = await import(
  /* webpackIgnore: true */ `./react-client-manifest.json`,
  { assert: { type: "json" } }
).then((m) => m.default);

export const reactSsrManifest = await import(
  /* webpackIgnore: true */ `./react-ssr-manifest.json`,
  { assert: { type: "json" } }
).then((m) => m.default);

export const cssManifest = await import(
  /* webpackIgnore: true */ `./css-manifest.json`,
  { assert: { type: "json" } }
).then((m) => m.default);

export const jsManifest = await import(
  /* webpackIgnore: true */ `./js-manifest.json`,
  { assert: { type: "json" } }
).then((m) => m.default);

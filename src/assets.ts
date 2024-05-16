import fs from 'fs';

const loadManifest = (filename) => {
  const rawData = fs.readFileSync(__dirname + `/${filename}`, { encoding: "utf-8", flag: "r" });
  return JSON.parse(rawData);
}

// Load manifest
const jsManifest = loadManifest("js-manifest.json");
const cssManifest = loadManifest("css-manifest.json");
const assetManifest = loadManifest("asset-manifest.json");

export function lookupScript(entryPointName) {
  const key = `${entryPointName}.js`;
  return jsManifest[key];
}

export function lookupStylesheet(entryPointName) {
  const key = `${entryPointName}.css`;
  return cssManifest[key];
}

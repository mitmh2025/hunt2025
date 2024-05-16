// Load manifests
import jsManifest from "../dist/js-manifest.json";
import cssManifest from "../dist/css-manifest.json";
import assetManifest from "../dist/asset-manifest.json";

export function lookupScript(entryPointName) {
  const key = `${entryPointName}.js`;
  return jsManifest[key];
}

export function lookupStylesheet(entryPointName) {
  const key = `${entryPointName}.css`;
  return cssManifest[key];
}

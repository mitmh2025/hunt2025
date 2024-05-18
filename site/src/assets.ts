// Load manifests
import jsManifest from "../dist/js-manifest.json";
import cssManifest from "../dist/css-manifest.json";
// import assetManifest from "../dist/asset-manifest.json";

export function lookupScript(entryPointName: string): string {
  const key = `${entryPointName}.js` as keyof typeof jsManifest;
  const script = jsManifest[key];
  if (script === undefined) {
    throw new Error(
      `Could not find ${key} in js-manifest.json (is there a webpack entrypoint with the name ${entryPointName}?)`,
    );
  }
  return script;
}

export function lookupStylesheet(entryPointName: string): string {
  const key = `${entryPointName}.css` as keyof typeof cssManifest;
  const stylesheet = cssManifest[key];
  if (stylesheet === undefined) {
    throw new Error(
      `Could not find ${key} in css-manifest.json (is there a webpack entrypoint with the name ${entryPointName}?)`,
    );
  }
  return stylesheet;
}

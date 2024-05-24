// Load manifests
import cssManifest from "../../../dist/isolated-css-manifest.json";
import jsManifest from "../../../dist/isolated-js-manifest.json";
// import assetManifest from "../dist/isolated-asset-manifest.json";

export function lookupScript(entryPointName: string): string {
  const key = `${entryPointName}.js` as keyof typeof jsManifest;
  const script = jsManifest[key] as string | undefined;
  if (script === undefined) {
    throw new Error(
      `Could not find ${key} in js-manifest.json (is there a webpack entrypoint with the name ${entryPointName}?)`,
    );
  }
  return script;
}

export function lookupStylesheet(entryPointName: string): string {
  const key = `${entryPointName}.css` as keyof typeof cssManifest;
  const stylesheet = cssManifest[key] as string | undefined;
  if (stylesheet === undefined) {
    throw new Error(
      `Could not find ${key} in css-manifest.json (is there a webpack entrypoint with the name ${entryPointName}?)`,
    );
  }
  return stylesheet;
}

// Load manifests
import entrypointManifest from "../../../dist/isolated-js-manifest-with-chunks.json";
// import assetManifest from "../dist/asset-manifest.json";
export type Entrypoint = keyof typeof entrypointManifest;

export function lookupScripts(entrypoint: Entrypoint): string[] {
  const allDeps = entrypointManifest[entrypoint];
  return allDeps.filter((dep) => dep.endsWith(".js"));
}

export function lookupStylesheets(entrypoint: Entrypoint): string[] {
  const allDeps = entrypointManifest[entrypoint];
  return allDeps.filter((dep) => dep.endsWith(".css"));
}

import { jsManifest, cssManifest } from './manifests';

export function lookupScript(entryPointName: string) {
  const key = `${entryPointName}.js`;
  return jsManifest[key];
}

export function lookupStylesheet(entryPointName: string) {
  const key = `${entryPointName}.css`;
  return cssManifest[key];
}

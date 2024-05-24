import type {
  ClientManifest,
  ServerManifest,
  SSRManifest,
} from "react-server-dom-webpack";

async function importManifest<M>(name: string): Promise<M> {
  return (
    (await import(
      /* webpackIgnore: true */ `${__dirname}/react-${name}-manifest.json`,
      {
        with: { type: "json" },
      }
    )) as { default: M }
  ).default;
}

export const reactServerManifest =
  await importManifest<ServerManifest>("server");

export const reactClientManifest =
  await importManifest<ClientManifest>("client");

export const reactSsrManifest = await importManifest<SSRManifest>("ssr");

export const reactCssManifest =
  await importManifest<Record<string, string>>("css");

export const reactJsManifest =
  await importManifest<Record<string, string>>("js");

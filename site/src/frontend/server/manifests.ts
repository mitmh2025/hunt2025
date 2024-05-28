import type {
  ClientManifest,
  ServerManifest,
  SSRManifest,
} from "react-server-dom-webpack";

async function importManifest<M>(name: string): Promise<M> {
  return (
    (await import(
      /* webpackIgnore: true */ `${__dirname}/${name}-manifest.json`,
      {
        with: { type: "json" },
      }
    )) as { default: M }
  ).default;
}

export const reactServerManifest =
  await importManifest<ServerManifest>("react-server");

export const reactClientManifest =
  await importManifest<ClientManifest>("react-client");

export const reactSsrManifest = await importManifest<SSRManifest>("react-ssr");

export const clientCssManifest =
  await importManifest<Record<string, string>>("client-css");

export const clientJsManifest =
  await importManifest<Record<string, string>>("client-js");

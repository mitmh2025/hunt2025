import { type Request, type Response, type NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import Layout from "../components/Layout";
import {
  type Entrypoint,
  lookupScripts,
  lookupStylesheets,
} from "../server/assets";

const oneDay = String(60 * 60 * 24);

export const render404 = (_req: Request, res: Response) => {
  const html =
    "<!DOCTYPE html><html><body><h1>404 Not Found</h1><p>We didn&apos;t find what you were looking for.</p></body></html>";
  res.status(404).send(html);
};

export const render500 = (
  res: Response,
  showError: boolean,
  status: number,
  errorText: string,
) => {
  const doctype = "<!DOCTYPE html>";
  const reactRoot = (
    <html lang="en">
      <body>
        <h1>500 Service Temporarily Unavailable</h1>
        {showError ? (
          <>
            <p>API request returned {status}:</p>
            <pre>{errorText}</pre>
          </>
        ) : undefined}
      </body>
    </html>
  );
  const html = doctype + renderToString(reactRoot) + "\n";
  res.status(500).send(html);
};

export type RenderedPage =
  | {
      node: React.ReactNode; // The element to be placed under the root div
      title?: string; // The desired page <title>
      entrypoints?: Entrypoint[]; // Additional script/stylesheets to include
      noScripts?: boolean; // If true, don't include any scripts
    }
  | undefined;
export type PageRenderer<Params extends ParamsDictionary> = (
  req: Request<Params>,
) => Promise<RenderedPage> | RenderedPage;

export default async function renderApp<Params extends ParamsDictionary>(
  renderer: PageRenderer<Params>,
  req: Request<Params>,
  res: Response,
  _next: NextFunction,
) {
  const result = await renderer(req);
  if (!result) {
    render404(req, res);
    return;
  }
  const reactRoot = result.node;
  const sheet = new ServerStyleSheet();
  let styleElements;
  let innerHTML;
  try {
    innerHTML = renderToString(sheet.collectStyles(reactRoot));
    styleElements = sheet.getStyleElement();
  } catch (error) {
    console.log(error);
    render500(res, false, 0, "");
    return;
  } finally {
    sheet.seal();
  }

  const scripts = (result.entrypoints ?? []).flatMap((entrypoint) => {
    return lookupScripts(entrypoint);
  });
  const stylesheets = (result.entrypoints ?? []).flatMap((entrypoint) => {
    return lookupStylesheets(entrypoint);
  });

  const doctype = "<!DOCTYPE html>";
  const html =
    doctype +
    renderToString(
      <Layout
        scripts={scripts}
        stylesheets={stylesheets}
        title={result.title}
        teamState={req.teamState?.state}
        styleElements={styleElements}
        innerHTML={innerHTML}
        noScripts={result.noScripts}
      />,
    ) +
    "\n";
  res.set({
    "Content-Type": "text/html; charset=utf-8",
    // TODO: determine if this Cache-Control is appropriate
    "Cache-Control": `s-maxage=60, stale-while-revalidate=${oneDay}`,
  });
  res.status(200);
  res.send(html);
}

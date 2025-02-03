import { type Request, type Response, type NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { wrapContentWithNavBar } from "../components/ContentWithNavBar";
import Layout from "../components/Layout";
import {
  PageHeader,
  PageMain,
  PageTitle,
  PageWrapper,
} from "../components/PageLayout";
import {
  type Entrypoint,
  lookupScripts,
  lookupStylesheets,
} from "../server/assets";
import rootUrl from "./rootUrl";

const oneDay = String(60 * 60 * 24);

const notFoundHandler = (req: Request) => {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;
  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>404 Not Found</PageTitle>
        </PageHeader>
        <PageMain>
          <p>We didn’t find what you were looking for.</p>
          <a href={`${rootUrl}/`}>← Back home</a>
        </PageMain>
      </>
    </PageWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "404 Not Found",
    },
    teamState,
  );
};

export const render404 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await renderApp(notFoundHandler, req, res, next);
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
      title: string; // The desired page <title>
      entrypoints?: Entrypoint[]; // Additional script/stylesheets to include
      layout?: typeof Layout; // If true, don't include any scripts
    }
  | undefined;
export type PageRenderer<Params extends ParamsDictionary> = (
  req: Request<Params>,
  res: Response,
) => Promise<RenderedPage> | RenderedPage;

export default async function renderApp<Params extends ParamsDictionary>(
  renderer: PageRenderer<Params>,
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) {
  const result = await renderer(req, res);
  if (!result) {
    await render404(req, res, next);
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

  const LayoutComponent = result.layout ?? Layout;

  const doctype = "<!DOCTYPE html>";
  const html =
    doctype +
    renderToString(
      <LayoutComponent
        scripts={scripts}
        stylesheets={stylesheets}
        title={result.title}
        teamState={req.teamState?.state}
        styleElements={styleElements}
        innerHTML={innerHTML}
      />,
    ) +
    "\n";
  res.set({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": `s-maxage=60, stale-if-error=${oneDay}`,
  });
  res.status(200);
  res.send(html);
}

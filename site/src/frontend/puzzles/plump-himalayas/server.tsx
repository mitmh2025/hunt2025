import { type Request, type Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { Router } from "websocket-express";
import { BaseLayout } from "../../components/Layout";
import { lookupScripts } from "../../server/assets";

const PuzzleContent = () => {
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>
      <div></div>
    </>
  );
};

const handler = (_req: Request, res: Response) => {
  const reactRoot = <PuzzleContent />;
  const sheet = new ServerStyleSheet();
  let styleElements;
  let innerHTML;
  try {
    innerHTML = renderToString(sheet.collectStyles(reactRoot));
    styleElements = sheet.getStyleElement();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        "<html><body><h1>500 Service Temporarily Unavailable</h1></body></html>",
      );
    return;
  } finally {
    sheet.seal();
  }

  const scripts = lookupScripts("puzzle_plump_himalayas");
  const doctype = "<!DOCTYPE html>";
  const html =
    doctype +
    renderToString(
      <BaseLayout
        scripts={scripts}
        title={"Control Room"}
        styleElements={[...styleElements]}
        innerHTML={innerHTML}
      />,
    ) +
    "\n";

  res.set({
    "Content-Type": "text/html; charset=utf-8",
  });
  res.status(200);
  res.send(html);
};

const router = new Router();
router.get("/fullscreen", handler);
export default router;

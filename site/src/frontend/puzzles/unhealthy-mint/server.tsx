import { type Request, type Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, styled } from "styled-components";
import { Router } from "websocket-express";
import { BaseLayout } from "../../components/Layout";
import { lookupScripts } from "../../server/assets";
import keysw from "./assets/keysw.png";
import polyminoA from "./assets/polyminoA.png";
import polyminoB from "./assets/polyminoB.png";
import polyminoC from "./assets/polyminoC.png";
import polyminoD from "./assets/polyminoD.png";
import polyminoE from "./assets/polyminoE.png";
import polyminoF from "./assets/polyminoF.png";
import polyminoG from "./assets/polyminoG.png";
import polyminoH from "./assets/polyminoH.png";

const View = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const PolyminoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 50px;
  margin-top: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const PolyminoImg = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
`;

const KeysImg = styled.img`
  width: 308px;
  height: 154px;
  position: absolute;
  top: 270px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const TitleHeading = styled.h1`
  font-family: monospace;
  font-size: 35px;
  position: absolute;
  top: -230px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PuzzleContent = () => {
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>
      <div>
        <TitleHeading>_land</TitleHeading>
        <View>
          <div className="sketch-container">
            <div id="_land-root" />
          </div>
        </View>
        <PolyminoDiv>
          <PolyminoImg src={polyminoA} />
          <PolyminoImg src={polyminoB} />
          <PolyminoImg src={polyminoC} />
          <PolyminoImg src={polyminoD} />
          <PolyminoImg src={polyminoE} />
          <PolyminoImg src={polyminoF} />
          <PolyminoImg src={polyminoG} />
          <PolyminoImg src={polyminoH} />
        </PolyminoDiv>
        <KeysImg src={keysw} />
        <p className="flavor">_land</p>
      </div>
    </>
  );
};

const bodyStyle = (
  <style>
    {`
html, body {
  margin: 0;
  padding: 0;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0);
  color: white;
}
.flavor {
  font-family: monospace;
  font-size: 20px;
  position: absolute;
  top: 180px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
`}
  </style>
);

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

  const scripts = lookupScripts("puzzle_unhealthy_mint");
  const doctype = "<!DOCTYPE html>";
  const html =
    doctype +
    renderToString(
      <BaseLayout
        scripts={scripts}
        title={"_land"}
        styleElements={[...styleElements, bodyStyle]}
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

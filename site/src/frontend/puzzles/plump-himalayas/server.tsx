import { type Request, type Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "websocket-express";
import { BaseLayout } from "../../components/Layout";
import { lookupScripts } from "../../server/assets";

const styleElement = (
  <style>
    {`
body {
  font-family: "belanosima", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  font-size: 16pt;
  background-color: gray;
  padding: 0px;
  margin: 0px;
}

.background {
    background-color: white;
}

h2 {
    font-size: 30pt;
    font-weight: 600;
    padding: 0px;
    margin: 0px;
}

#chosen {
    padding: 10px;
    width: 100%;
    text-align: center;
    font-size: 32pt;
}

#content {
    margin: 20px auto;
    padding: 0px;
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
}

#title {
    width: 100%;
    padding: 0px;
    text-align: center;
    font-size: 64pt;
    font-weight: 600;
    background-color: white;
}

#col1-ops {
    width: 820px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    padding: 30px 10px;
    height: 210px;
}

#col1 {
    width: 840px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#col2 {
    width: 750px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#video {
    width: 840px;
    height: 630px;
    align-content: center;
    background-color: white;
}

#videoframe {
    width: 840px;
    height: 630px;
}

#chosen.hunters {
    height:140px;
    background-color: white;
    width: 100%;
    margin: 0px;
    padding: 10px 0px;
}

#tasks-container {
    padding: 10px;
    background-color: white;
    height: 250px;
}

#tasks-container.ops {
    width: 1600px;
}

#choices-box {
    background-color: white;
    padding: 10px;
    height: 500px;
}

.choices {
    display: flex;
    flex-direction: row;
    align-items: center;
}

#verbs {
    width: 25%;
    padding: 5px;
    text-align: center;
}

#wordthe {
    width: 20%;
    font-weight:600;
    font-size:20pt;
    text-align: center;
}

#nouns {
    width: 50%;
    padding: 5px;
    text-align: center;
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
}

.words {  
  width: 90%
}

#tasks {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
}

.done {
    text-decoration: line-through;
}

.fixed {
    position: fixed;
}

.message {
    border: 1px solid;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 1rem;
}

.message-error {
    color: red;
    border-color: red;
    background-color: #ffeaea;
}

.message-info {
    color: green;
    border-color: green;
    background-color: #eaffea;
}

button {
    font-family: "belanosima", sans-serif;
    font-weight: 400;
    color: white;
    background-color: gray;
    padding: 3px 5px;
    margin: 2pt 2pt 2pt 0pt;
    border-radius:5px;
    font-size: 16pt;
    border: none;
}

button:disabled {
    color: #DDDDDD;
    background-color: #BBBBBB;
}

button#verb {
    color: green;
    border-color: green;
    background-color: #eaffea;
    font-size: 32pt;
    padding: 10px 20px;
    font-weight: 600;
}

button#noun {
    color: green;
    border-color: green;
    background-color: #eaffea;
    font-size: 32pt;
    padding: 10px 20px;
    font-weight: 600;
}

button#noun.old {
    color: #000000;
    border-color: #DDDDDD;
    background-color: #BBBBBB;
    transition: all 2s;
}

button#verb.old {
    color: #000000;
    border-color: #DDDDDD;
    background-color: #BBBBBB;
    transition: all 2s;
}

input.correct-response {
    -moz-box-shadow: 0 0 10px green;
    -webkit-box-shadow: 0 0 10px green;
    box-shadow: 0 0 10px green;
}

input.incorrect-response {
    -moz-box-shadow: 0 0 10px red;
    -webkit-box-shadow: 0 0 10px red;
    box-shadow: 0 0 10px red;
}

label.correct-response {
    font-family: "montserrat", sans-serif;
    font-weight: 600;
}

label.incorrect-response {
    font-family: "montserrat", sans-serif;
    font-weight: 300;
    color: gray;
}

input[type='text'], input[type='password'], input[type='number'], input[type='file'] {
    font-family: "montserrat", sans-serif;
    font-size: 14pt;
}

textarea {
  font-family: "montserrat", sans-serif;
  font-weight: 500;
  font-size: 14pt;
}

.inline {
   display: inline-block;
   vertical-align: top;
   padding: 0px;
   padding-left: 5px;
   padding-right: 5px;
   margin: 0px;
}

.small {
  font-size: 10pt;
}

.hidden {
    display: none;
}

dt {
    font-weight: 700;
}

#display {
    margin: 300px auto;
    padding: 50px;
    transform: scale(3);
    background-color: white;
}
`}
  </style>
);

const displayHandler = (_req: Request, res: Response) => {
  const scripts = lookupScripts("puzzle_plump_himalayas_display");
  const doctype = "<!DOCTYPE html>";
  const html =
    doctype +
    renderToString(
      <BaseLayout
        scripts={scripts}
        styleElements={[styleElement]}
        title={"Display"}
        innerHTML="Loading"
      />,
    ) +
    "\n";

  res.set({
    "Content-Type": "text/html; charset=utf-8",
  });
  res.status(200);
  res.send(html);
};

const hostHandler = (_req: Request, res: Response) => {
  const scripts = lookupScripts("puzzle_plump_himalayas_host");
  const doctype = "<!DOCTYPE html>";
  const html =
    doctype +
    renderToString(
      <BaseLayout
        scripts={scripts}
        styleElements={[styleElement]}
        title={"Host"}
        innerHTML="Loading"
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
router.get("/display", displayHandler);
router.get("/host", hostHandler);
export default router;

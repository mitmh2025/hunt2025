import expressAsyncHandler from "express-async-handler";
import { Router } from "websocket-express";
import renderApp from "../utils/renderApp";
import coinHandler from "./coin/handler";
import { minigamesHandler } from "./minigames";
import radioHandler from "./radio/handler";
import statsHandler from "./stats/handler";
import { indexHandler } from ".";

export function getArchiveRouter() {
  const router = new Router();
  router.get(
    "/",
    expressAsyncHandler(async (req, res, next) => {
      await renderApp(indexHandler, req, res, next);
    }),
  );

  router.get(
    "/extras/coin",
    expressAsyncHandler(async (req, res, next) => {
      await renderApp(coinHandler, req, res, next);
    }),
  );

  router.get(
    "/extras/minigames",
    expressAsyncHandler(async (req, res, next) => {
      await renderApp(minigamesHandler, req, res, next);
    }),
  );

  router.get(
    "/extras/stats",
    expressAsyncHandler(async (req, res, next) => {
      await renderApp(statsHandler, req, res, next);
    }),
  );

  router.get(
    "/extras/radio",
    expressAsyncHandler(async (req, res, next) => {
      await renderApp(radioHandler, req, res, next);
    }),
  );

  return router;
}

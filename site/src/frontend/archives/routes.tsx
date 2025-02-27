import expressAsyncHandler from "express-async-handler";
import { Router } from "websocket-express";
import renderApp from "../utils/renderApp";
import { minigamesHandler } from "./minigames";
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

  return router;
}

import expressAsyncHandler from "express-async-handler";
import { Router } from "websocket-express";
import renderApp from "../utils/renderApp";
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
    "/extras/stats",
    expressAsyncHandler(async (req, res, next) => {
      await renderApp(statsHandler, req, res, next);
    }),
  );

  return router;
}

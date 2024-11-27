import { existsSync } from "fs";
import cookieParser from "cookie-parser";
import express, {
  type Router,
  type Express,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import multer from "multer";

export function healthzHandler(_req: Request, res: Response) {
  // TODO: For API servers, check the health of our database connection?
  res.send("ok");
}

const LOG_FORMAT_DEBUG =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[Authorization]"';
const LOG_FORMAT = LOG_FORMAT_DEBUG; //"tiny";

export const logMiddleware = morgan(LOG_FORMAT);

export const addStaticMiddleware = (app: Express, staticPath: string) => {
  if (existsSync(staticPath)) {
    // Serve static assets from the bundle without auth
    app.use("/static", express.static(staticPath));
  }
};

export const addParserMiddleware = (
  app: Express | Router,
  { cookies = false, urlencoded = false, json = false, text = false } = {},
) => {
  // Never handle file uploads
  app.use(multer().none());

  if (cookies) {
    app.use(cookieParser());
  }

  if (urlencoded) {
    // Avoid nonstandard form nonsense
    app.use(express.urlencoded({ extended: false }));
  }

  if (json) {
    app.use(express.json());
  }

  if (text) {
    app.use(express.text());
  }
};

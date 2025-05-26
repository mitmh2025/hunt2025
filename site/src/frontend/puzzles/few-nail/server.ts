import { type RequestHandler, type Request, type Response } from "express";
import { Router } from "websocket-express";
import { z } from "zod";
import {
  generateResponse,
  type StateRequestBody,
  type StateResponse,
} from "./logic";

type ErrorResponse = {
  error: string;
};

type StateResponseBody = StateResponse | ErrorResponse;
const stateRequestBodySchema = z.object({
  guessesByUuid: z.record(z.string(), z.string()),
});

/*
 * Puzzle state request.
 * Given all guesses for all puzzles, return what puzzles & rounds should be available.
 */
const stateHandler: RequestHandler<
  Record<string, never>,
  StateResponseBody,
  StateRequestBody,
  Record<string, never>
> = (
  req: Request<Record<string, never>, StateResponseBody, StateRequestBody>,
  res: Response<StateResponseBody>,
) => {
  try {
    const { guessesByUuid } = stateRequestBodySchema.parse(req.body);
    const responseBody = generateResponse({ guessesByUuid });
    res.status(200).json(responseBody);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid Inputs" });
  }
};

const router = new Router();
router.post("/state", stateHandler);
export default router;

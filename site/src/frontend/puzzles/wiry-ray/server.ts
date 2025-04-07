import { type Request, type Response } from "express";
import { Router } from "websocket-express";
import { processCommand, internalizeState } from "./logic";

const handler = (req: Request, res: Response) => {
  const parsed = internalizeState(req.body);
  if (!parsed.valid) {
    res.status(400).send("Invalid request");
    return;
  }

  const { state: startState, command } = parsed;
  res.status(200).send(processCommand({ startState, command }));
};

const router = new Router();
router.post("/command", handler);
export default router;

import { type RequestHandler, type Request, type Response } from "express";
import { Router } from "websocket-express";
import { z } from "zod";
import { type Inputs, inputsToOutputs, part2String } from "./logic";
import { type Outputs } from "./shared";

const inputValue = z.number().int().nonnegative().lte(2);
const inputsSchema = z.array(inputValue).length(9);
const requestBodySchema = z.object({ inputs: inputsSchema });

type RequestBody = {
  inputs: Inputs;
};
const handler: RequestHandler<
  Record<string, never>,
  unknown,
  RequestBody,
  Record<string, never>
> = (req: Request, res: Response) => {
  try {
    const body = requestBodySchema.parse(req.body);
    const outputs = inputsToOutputs(body.inputs as Inputs);
    const result: { outputs: Outputs; additionalText?: string } = { outputs };
    if (outputs[17]) {
      result.additionalText = part2String;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Invalid inputs" });
  }
};

const router = new Router();
router.post("/lights", handler);
export default router;

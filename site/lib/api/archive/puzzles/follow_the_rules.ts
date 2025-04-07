import {
  inputsToOutputs,
  part2String,
} from "../../../../src/frontend/puzzles/right-palm/logic";
import type { Outputs } from "../../../../src/frontend/puzzles/right-palm/shared";

// eslint-disable-next-line @typescript-eslint/require-await -- this function must be declared async for the API
export async function getLights(
  inputs: number[],
): Promise<{ outputs: Outputs; additionalText?: string }> {
  const outputs = inputsToOutputs(
    inputs as Parameters<typeof inputsToOutputs>[0],
  );
  const additionalText = outputs[17] ? part2String : undefined;
  return { outputs, additionalText };
}

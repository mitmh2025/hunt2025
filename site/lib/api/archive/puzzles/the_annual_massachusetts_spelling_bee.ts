import { generateResponse } from "../../../../src/frontend/puzzles/few-nail/logic";
import {
  type GuessResponsesByUuid,
  type MinimalRounds,
} from "../../../../src/frontend/puzzles/few-nail/puzzle-components/Typedefs";

export function getState({
  guessesByUuid,
}: {
  guessesByUuid: Record<string, string>;
}): Promise<{
  rounds: MinimalRounds;
  guessResponses: GuessResponsesByUuid;
}> {
  return Promise.resolve(generateResponse({ guessesByUuid }));
}

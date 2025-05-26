import {
  type GuessResponsesByUuid,
  type MinimalRounds,
} from "../../../../src/frontend/puzzles/few-nail/puzzle-components/Typedefs";
import rootUrl from "../../../../src/frontend/utils/rootUrl";

export async function getState({
  guessesByUuid,
}: {
  guessesByUuid: Record<string, string>;
}): Promise<{
  rounds: MinimalRounds;
  guessResponses: GuessResponsesByUuid;
}> {
  const response = await fetch(
    `${rootUrl}/puzzles/the_annual_massachusetts_spelling_bee/state`,
    {
      method: "POST",
      body: JSON.stringify({ guessesByUuid }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const { rounds, guessResponses } = (await response.json()) as {
    rounds: MinimalRounds;
    guessResponses: GuessResponsesByUuid;
  };

  return {
    rounds,
    guessResponses,
  };
}

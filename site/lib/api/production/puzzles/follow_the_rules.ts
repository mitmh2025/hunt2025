import type { Outputs } from "../../../../src/frontend/puzzles/right-palm/shared";
import rootUrl from "../../../../src/frontend/utils/rootUrl";

export async function getLights(
  inputs: number[],
): Promise<{ outputs: Outputs; additionalText?: string }> {
  const response = await fetch(`${rootUrl}/puzzles/follow_the_rules/lights`, {
    method: "POST",
    body: JSON.stringify({ inputs }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lights");
  }

  const json = (await response.json()) as {
    outputs: Outputs;
    additionalText?: string;
  };

  return json;
}

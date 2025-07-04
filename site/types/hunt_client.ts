declare module "@hunt_client/public_api" {
  import { type ApiFetcher } from "@ts-rest/core";
  const clientApi: ApiFetcher;
  export default clientApi;
}

declare module "@hunt_client/auth_api" {
  import { type ApiFetcher } from "@ts-rest/core";
  const authApi: ApiFetcher;
  export default authApi;
}

declare module "@hunt_client/globalDatasetManager" {
  import type { Dataset, DatasetParams, DatasetValue } from "lib/api/websocket";

  class GlobalDatasetManager {
    watch(
      dataset: Dataset,
      params: DatasetParams,
      initialValue: DatasetValue,
      callback: (value: object) => void,
    ): () => void;
  }
  const globalDatasetManager: GlobalDatasetManager;
  export default globalDatasetManager;
}

declare module "@hunt_client/interactions" {
  export function completeInteraction(
    slug: string,
    result: string,
  ): Promise<void>;
}

declare module "@hunt_client/illegal_search_state" {
  import type { TeamHuntState } from "lib/api/client";

  export function markGateSatisfied(gateId: string): Promise<void>;
  export function getTeamState(): TeamHuntState;
  export function useTeamState(initialTeamState: TeamHuntState): TeamHuntState;
}

declare module "@hunt_client/puzzles/follow_the_rules" {
  import type { Outputs } from "src/frontend/puzzles/right-palm/shared";

  export function getLights(
    inputs: number[],
  ): Promise<{ outputs: Outputs; additionalText?: string }>;
}

declare module "@hunt_client/puzzles/deepfrost" {
  export function sendCommand({
    command,
    state,
  }: {
    command: string;
    state: unknown;
  }): Promise<{
    message: string;
    haveKey: boolean;
    error?: string;
    previousCommand: string;
    state: unknown;
  }>;
}

declare module "@hunt_client/puzzles/chatgpt" {
  export function chat({
    message,
    state,
  }: {
    message: string;
    state: unknown;
  }): Promise<{
    response: string;
    success: boolean;
    state: unknown;
  }>;
}

declare module "@hunt_client/puzzles/the_annual_massachusetts_spelling_bee" {
  import type {
    GuessResponsesByUuid,
    MinimalRounds,
  } from "src/frontend/puzzles/few-nail/puzzle-components/Typedefs";

  export function getState({
    guessesByUuid,
  }: {
    guessesByUuid: Record<string, string>;
  }): Promise<{
    rounds: MinimalRounds;
    guessResponses: GuessResponsesByUuid;
  }>;
}

declare module "@hunt_client/puzzles/jargon" {
  import type {
    Group,
    MinimalGroup,
    MinimalPuzzle,
    Puzzle,
    PuzzleColor,
  } from "src/frontend/puzzles/legitimate-bridge/puzzle-components/Typedefs";

  export function makeGuess({
    uuid,
    guess,
  }: {
    uuid: string;
    guess: string;
  }): Promise<{
    solutionUuid?: string;
  }>;
  export function getState(solvedUuids: Set<string>): Promise<{
    tutorialPuzzles: Record<PuzzleColor, (MinimalPuzzle | Puzzle)[]>;
    puzzleGroups?: (Group | MinimalGroup)[];
  }>;
}

declare module "@hunt_client/puzzles/what_do_they_call_you" {
  export function speak(): Promise<void>;
}

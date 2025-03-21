import type {
  ApiFetcher,
  ParamsFromUrl,
  AppRoute,
  ClientInferRequest,
  ClientInferResponseBody,
} from "@ts-rest/core";
import { match } from "path-to-regexp";
import type { z } from "zod";
import formatActivityLogEntryForApi from "../../../src/api/formatActivityLogEntryForApi";
import {
  formatSubpuzzleState,
  formatTeamHuntState,
} from "../../../src/api/logic";
import { PUZZLES, SUBPUZZLES } from "../../../src/frontend/puzzles";
import HUNT, { generateSlugToSlotMap } from "../../../src/huntdata";
import canonicalizeInput from "../../canonicalizeInput";
import {
  ActivityLogSchema,
  type GuessStatus,
  publicContract,
} from "../contract";
import {
  fetchActivityLog,
  fetchPuzzleStateLog,
  fetchTeamRegistrationLog,
  mutateActivityLog,
  mutatePuzzleStateLog,
} from "./log";
import {
  reducePuzzleStateIntermediate,
  reduceTeamInfoIntermediate,
  reduceTeamStateIntermediate,
} from "./reducers";
import { ARCHIVE_TEAM_ID } from "./storage";

const slugToSlotMap = generateSlugToSlotMap(HUNT);

type PublicContract = typeof publicContract;

type MethodParamType<Route extends AppRoute> = ParamsFromUrl<Route["path"]>;
type MethodBodyType<Route extends AppRoute> =
  "body" extends keyof ClientInferRequest<Route>
    ? ClientInferRequest<Route>["body"]
    : never;
type MethodReturnType<Route extends AppRoute> =
  | {
      body: ClientInferResponseBody<Route, 200>;
    }
  | { status: number; body?: unknown };

const parsePath = <K extends keyof PublicContract>(
  endpoint: K,
  path: string,
): MethodParamType<PublicContract[K]> | undefined => {
  const route = publicContract[endpoint] as AppRoute;
  const parser = match(route.path);
  const parsed = parser(path);
  if (!parsed) {
    return undefined;
  }

  return parsed.params as MethodParamType<PublicContract[K]>;
};

const clientApiMethods: {
  [K in keyof PublicContract]: (args: {
    params: MethodParamType<PublicContract[K]>;
    body: MethodBodyType<PublicContract[K]>;
  }) =>
    | MethodReturnType<PublicContract[K]>
    | Promise<MethodReturnType<PublicContract[K]>>;
} = {
  getActivityLog: () => {
    const body = ActivityLogSchema.parse(
      fetchActivityLog()
        .map((e) => formatActivityLogEntryForApi(e))
        .flatMap((e) => (e ? [e] : [])),
    );
    return { body };
  },

  getMyTeamState: () => {
    const teamInfo = reduceTeamInfoIntermediate(
      fetchTeamRegistrationLog(),
    ).formatTeamInfoIfActive();
    if (teamInfo === undefined) {
      return {
        status: 404,
      };
    }

    const activityLog = fetchActivityLog();

    return {
      body: {
        teamId: 1,
        whepUrl: "",
        state: formatTeamHuntState(
          HUNT,
          reduceTeamStateIntermediate(activityLog),
        ),
        info: teamInfo,
      },
    };
  },

  getPuzzleState: ({ params: { slug } }) => {
    const log = fetchActivityLog();
    const teamState = reduceTeamStateIntermediate(log);
    const puzzleState = reducePuzzleStateIntermediate(slug, log);

    const state = teamState.formatPuzzleState(slug, puzzleState);

    if (!state) {
      return { status: 404 };
    }
    return { body: state };
  },

  getSubpuzzleState: ({ params: { slug } }) => {
    const subpuzzle = SUBPUZZLES[slug];
    if (!subpuzzle) {
      return {
        status: 404,
      };
    }
    return {
      body: formatSubpuzzleState(
        slug,
        subpuzzle.parent_slug,
        fetchPuzzleStateLog(),
      ),
    };
  },

  submitGuess: async ({ params: { slug }, body: { guess } }) => {
    const slot = slugToSlotMap.get(slug)?.slot;
    const puzzle = PUZZLES[slug];
    if (slot === undefined || puzzle === undefined) {
      return {
        status: 404,
      };
    }

    const defaultPrize = slot.is_meta ? 0 : 1;
    const prize = slot.prize ?? defaultPrize;
    const strongCurrencyPrize = slot.strong_currency_prize ?? 0;

    const log = fetchActivityLog();
    if (!reduceTeamStateIntermediate(log).puzzles_unlocked.has(slug)) {
      return {
        status: 404,
      };
    }

    let canonical_input = canonicalizeInput(guess);

    const correct_answer =
      canonicalizeInput(puzzle.answer) === canonical_input
        ? puzzle.answer
        : undefined;
    const correct_partial = puzzle.canned_responses.find((cr) =>
      cr.guess.some((g) => canonicalizeInput(g) === canonical_input),
    );

    let responseText = "Incorrect";
    let status: z.TypeOf<typeof GuessStatus> = "incorrect";
    let link: { display: string; href: string } | undefined;
    if (correct_answer) {
      canonical_input = correct_answer;
      responseText = "Correct!";
      status = "correct";
    } else if (correct_partial) {
      const matching_input = correct_partial.guess.find(
        (g) => canonicalizeInput(g) === canonical_input,
      );
      canonical_input = matching_input ?? canonical_input;
      link = correct_partial.link;
      responseText = correct_partial.reply;
      status = "other";
    }

    await mutateActivityLog(log, async (mutator) => {
      const puzzle_log = mutator.log.filter(
        (e) => "slug" in e && e.slug === slug,
      );

      if (puzzle_log.some((e) => e.type === "puzzle_solved")) {
        return;
      }

      if (
        puzzle_log.some(
          (e) =>
            e.type === "puzzle_guess_submitted" &&
            e.data.canonical_input === canonical_input,
        )
      ) {
        return;
      }

      await mutator.appendLog({
        team_id: ARCHIVE_TEAM_ID,
        type: "puzzle_guess_submitted",
        slug,
        data: {
          canonical_input,
          status,
          response: responseText,
          link,
        },
      });

      if (correct_answer) {
        const hasGottenRewardFromCannedResponse = puzzle_log.some(
          (e) => e.type === "puzzle_partially_solved",
        );

        await mutator.appendLog({
          team_id: ARCHIVE_TEAM_ID,
          slug,
          type: "puzzle_solved",
          currency_delta: hasGottenRewardFromCannedResponse ? 0 : prize,
          strong_currency_delta: strongCurrencyPrize,
          data: {
            answer: canonical_input,
          },
        });
      } else if (correct_partial?.providesSolveReward) {
        await mutator.appendLog({
          team_id: ARCHIVE_TEAM_ID,
          slug,
          type: "puzzle_partially_solved",
          currency_delta: prize,
          data: {
            partial: canonical_input,
          },
        });
      }
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know puzzle state exists
      body: reduceTeamStateIntermediate(log).formatPuzzleState(
        slug,
        reducePuzzleStateIntermediate(slug, log),
      )!,
    };
  },

  submitSubpuzzleGuess: async ({ params: { slug }, body: { guess } }) => {
    const puzzle = SUBPUZZLES[slug];
    if (!puzzle?.answer) {
      return { status: 404 };
    }

    const { parent_slug } = puzzle;
    const { roundSlug } = slugToSlotMap.get(parent_slug) ?? {};
    if (!roundSlug) {
      return { status: 404 };
    }

    let canonical_input = canonicalizeInput(guess);
    let responseText;
    let status: z.TypeOf<typeof GuessStatus>;
    if (canonicalizeInput(puzzle.answer) === canonical_input) {
      canonical_input = puzzle.answer;
      responseText = "Correct!";
      status = "correct";
    } else {
      responseText = "Incorrect";
      status = "incorrect";
    }

    const log = fetchPuzzleStateLog();
    const solved = log.some(
      (e) =>
        e.slug === parent_slug &&
        e.data.subpuzzle_slug === slug &&
        e.data.type === "subpuzzle_solved",
    );
    const duplicate = log.some(
      (e) =>
        e.slug === parent_slug &&
        e.data.subpuzzle_slug === slug &&
        e.data.canonical_input === canonical_input,
    );

    if (!solved && !duplicate) {
      await mutatePuzzleStateLog(log, async (mutator) => {
        await mutator.appendLog({
          team_id: ARCHIVE_TEAM_ID,
          slug: parent_slug,
          data: {
            type: "subpuzzle_guess_submitted",
            subpuzzle_slug: slug,
            canonical_input,
            status,
            response: responseText,
          },
        });

        if (status === "correct") {
          await mutator.appendLog({
            team_id: ARCHIVE_TEAM_ID,
            slug: parent_slug,
            data: {
              type: "subpuzzle_solved",
              subpuzzle_slug: slug,
              answer: canonical_input,
            },
          });
        }

        // TODO: Do we need to synthesize all_subpuzzles_solved or gate_completed entries for quixotic-shoe?
      });
    }

    return {
      body: formatSubpuzzleState(slug, parent_slug, log),
    };
  },

  unlockPuzzle: async ({ params: { slug } }) => {
    const slot = slugToSlotMap.get(slug)?.slot;
    if (slot === undefined) {
      return {
        status: 404,
      };
    }

    const { unlock_cost = 0 } = slot;

    return await mutateActivityLog(fetchActivityLog(), async (mutator) => {
      const data = mutator.getTeamState(HUNT, ARCHIVE_TEAM_ID);

      if (
        !data.puzzles_unlockable.has(slug) ||
        data.puzzles_unlocked.has(slug) ||
        data.available_currency < unlock_cost
      ) {
        return {
          status: 404,
        };
      }

      await mutator.appendLog({
        team_id: ARCHIVE_TEAM_ID,
        type: "puzzle_unlocked",
        slug,
        currency_delta: -unlock_cost,
      });

      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know puzzle state exists because we just unlocked it
        body: mutator
          .getTeamState(HUNT, ARCHIVE_TEAM_ID)
          .formatPuzzleState(slug, mutator.getPuzzleState(slug))!,
      };
    });
  },

  exchangeStrongCurrency: async () => {
    return await mutateActivityLog(fetchActivityLog(), async (mutator) => {
      const EXCHANGE_RATE = 3;
      const data = mutator.getTeamState(HUNT, ARCHIVE_TEAM_ID);

      if (data.available_strong_currency < 1) {
        return {
          body: { code: "INSUFFICIENT_STRONG_CURRENCY" },
          status: 400,
        };
      }

      await mutator.appendLog({
        team_id: ARCHIVE_TEAM_ID,
        type: "strong_currency_exchanged",
        currency_delta: EXCHANGE_RATE,
        strong_currency_delta: -1,
      });

      return {
        body: { currency: EXCHANGE_RATE },
      };
    });
  },

  buyPuzzleAnswer: async ({ params: { slug } }) => {
    const lookup = slugToSlotMap.get(slug);
    if (!lookup) {
      return { status: 404 };
    }

    const { slot, roundSlug } = lookup;
    if (
      slot.is_meta === true ||
      slot.is_supermeta === true ||
      roundSlug === "events"
    ) {
      return { status: 404 };
    }

    const puzzle = PUZZLES[slug];
    if (!puzzle) {
      return { status: 404 };
    }

    const { answer } = puzzle;

    const result = await mutateActivityLog(
      fetchActivityLog(),
      async (mutator) => {
        const state = mutator.getTeamState(HUNT, ARCHIVE_TEAM_ID);

        if (state.available_strong_currency < 1) {
          return { error: "INSUFFICIENT_STRONG_CURRENCY" as const };
        }

        if (!state.puzzles_unlocked.has(slug)) {
          return { error: "PUZZLE_NOT_UNLOCKED" as const };
        }

        if (state.puzzles_solved.has(slug)) {
          return { error: "PUZZLE_ALREADY_SOLVED" as const };
        }

        const alreadyRewarded = mutator.log.some(
          (e) => e.type === "puzzle_partially_solved" && e.slug === slug,
        );

        await mutator.appendLog({
          team_id: ARCHIVE_TEAM_ID,
          type: "puzzle_answer_bought",
          slug,
          strong_currency_delta: -1,
          data: { answer },
        });

        await mutator.appendLog({
          team_id: ARCHIVE_TEAM_ID,
          type: "puzzle_guess_submitted",
          slug,
          data: {
            canonical_input: answer,
            status: "correct",
            response: "Correct!",
          },
        });

        await mutator.appendLog({
          team_id: ARCHIVE_TEAM_ID,
          type: "puzzle_solved",
          slug,
          currency_delta: alreadyRewarded ? 0 : slot.prize ?? 1,
          data: { answer },
        });

        return {};
      },
    );

    if (result.error) {
      return { status: 400, body: { code: result.error } };
    }

    return { body: { answer } };
  },

  // These don't make sense in archive mode
  submitHintRequest: () => {
    return { status: 400 };
  },
  startVirtualInteractionEarly: () => {
    return { status: 400 };
  },
  castVote: () => {
    return { status: 400 };
  },
};

const callMethod = async <const K extends keyof PublicContract>(
  endpoint: K,
  path: string,
  rawBody: unknown,
) => {
  const params = parsePath(endpoint, path);
  if (params === undefined) {
    return {
      status: 400,
      body: {},
      headers: new Headers(),
    };
  }

  return await clientApiMethods[endpoint]({
    params,
    body: rawBody as MethodBodyType<PublicContract[K]>,
  });
};

const clientApi: ApiFetcher = async ({ route, path, rawBody }) => {
  const endpoint = Object.entries(publicContract).find(
    ([_, value]) => value === route,
  )?.[0] as keyof PublicContract | undefined;
  if (endpoint === undefined) {
    throw new Error("Unknown route");
  }

  const resp = await callMethod(endpoint, path, rawBody);

  return {
    status: "status" in resp ? resp.status : 200,
    body: resp.body ?? {},
    headers: new Headers(),
  };
};

export default clientApi;

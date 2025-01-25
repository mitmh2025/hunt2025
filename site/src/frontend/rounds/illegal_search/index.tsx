import { type RequestHandler, type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import teamIsImmutable from "../../../utils/teamIsImmutable";
import { PUZZLES } from "../../puzzles";
import {
  MAX_TOLERANCE_DEGREES,
  isRoughlyEqual,
  simulatedTumblerPositions,
} from "./combolock";
import {
  LOCK_DATA,
  MODALS_BY_POSTCODE,
  MODALS_BY_EXTRA_POSTCODE,
  NODES_BY_ID,
  filteredForFrontend,
} from "./graph";
import HUNT from "../../../huntdata";

const puzzles = Object.fromEntries(
  (HUNT.rounds.find((r) => r.slug === "illegal_search")?.puzzles ?? []).flatMap(
    (slot) => {
      if (!slot.slug) {
        return [];
      }

      const puzzle = PUZZLES[slot.slug];
      if (!puzzle) {
        return [];
      }

      return [
        [
          slot.slug,
          {
            title: puzzle.title,
            slug: slot.slug,
            initial_description: puzzle.initial_description,
            slotId: slot.id,
          },
        ],
      ];
    },
  ),
);

type NodeRequestParams = {
  nodeSlug: string;
};
export const nodeRequestHandler: RequestHandler<
  NodeRequestParams,
  unknown,
  unknown,
  Record<string, never>
> = (req, res) => {
  if (!req.teamState) {
    res.status(500).json({
      status: "error",
      message: "no team state",
    });
    return;
  }
  // Verify that the illegal search round is unlocked for this team.
  if (!req.teamState.state.rounds.illegal_search) {
    res.status(404).json({
      status: "error",
      message: `round still locked for team ${req.teamState.info.teamName}`,
    });
    return;
  }
  const nodeId = req.params.nodeSlug;
  const node = NODES_BY_ID.get(nodeId);
  if (node) {
    res.json(
      filteredForFrontend(node, req.teamState.state, {
        immutable: teamIsImmutable(req.teamState.info.teamUsername),
        puzzles,
      }),
    );
  } else {
    res.status(404).json({
      status: "error",
      message: "no such node",
    });
  }
};

type PostCodeHandlerBody = {
  postCode: string;
};
export const modalPostHandler: RequestHandler<
  Record<string, never>,
  unknown,
  PostCodeHandlerBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  // TODO: validate req.body with zod
  const { postCode } = req.body;
  if (!req.teamState) {
    // Shouldn't be possible; middleware should ensure this is populated
    res.status(500).json({
      status: "error",
      message: "user not logged in?  API failed open?",
    });
    return;
  }

  let match: { slotId: string; gateId: string } | undefined;
  const postcodeMatch = MODALS_BY_POSTCODE.get(postCode);
  const extraMatch = MODALS_BY_EXTRA_POSTCODE.get(postCode);
  if (postcodeMatch) {
    const { slotId, gateId } = postcodeMatch;
    match = { slotId, gateId };
  } else if (extraMatch) {
    const extra = extraMatch.extra;
    if (!extra) {
      res.status(500).json({
        status: "error",
        message: "internal error (bad hunt definition)",
      });
      return;
    }

    const { slotId, gateId } = extra;
    match = { slotId, gateId };
  }

  if (match) {
    const { slotId, gateId } = match;
    const { teamId } = req.teamState;
    const result = await req.frontendApi.markTeamGateSatisfied({
      params: {
        teamId: `${teamId}`,
        gateId,
      },
    });
    if (result.status !== 200) {
      console.error(
        `Got API request failure when calling markTeamGateSatisfied for team ${teamId} gate ${gateId}: ${result.body}`,
      );
      res.status(500).json({
        status: "error",
        message: "internal error (API failed)",
      });
    } else {
      // The result of the request to mark the gate satisfied is the post-update
      // team state.  Use that teamState to look up the slug for the
      // `modal.slotId`
      const newTeamState = result.body;
      const slug = newTeamState.rounds.illegal_search?.slots[slotId]?.slug;
      if (!slug) {
        res.status(500).json({
          status: "error",
          message: "internal error (bad hunt definition)",
        });
      } else {
        const puzzle = PUZZLES[slug];
        const title = puzzle?.title ?? `Stub puzzle for slot ${slug}`;
        const desc = puzzle?.initial_description;
        const body = { title, slug, desc };
        res.json(body);
      }
    }
  } else {
    res.status(400).json({
      status: "error",
      message: "no such postCode",
    });
  }
});

export function painting2State(teamState: TeamHuntState): {
  epoch: number;
  switches?: unknown;
} {
  const solved =
    teamState.rounds.illegal_search?.gates?.includes(
      LOCK_DATA.painting2.gateId,
    ) ?? false;
  return solved
    ? { epoch: teamState.epoch, switches: LOCK_DATA.painting2.answer }
    : { epoch: teamState.epoch };
}

export function rugState(teamState: TeamHuntState): {
  epoch: number;
  value?: unknown;
} {
  const solved =
    teamState.rounds.illegal_search?.gates?.includes(LOCK_DATA.rug.gateId) ??
    false;
  return solved
    ? { epoch: teamState.epoch, value: LOCK_DATA.rug.answer }
    : { epoch: teamState.epoch };
}

export function cryptexState(teamState: TeamHuntState): {
  epoch: number;
  text?: unknown;
} {
  const solved =
    teamState.rounds.illegal_search?.gates?.includes(
      LOCK_DATA.cryptex.gateId,
    ) ?? false;
  return solved
    ? { epoch: teamState.epoch, text: LOCK_DATA.cryptex.answer }
    : { epoch: teamState.epoch };
}

export function bookcaseState(teamState: TeamHuntState): {
  epoch: number;
  books?: unknown;
} {
  const solved =
    teamState.rounds.illegal_search?.gates?.includes(
      LOCK_DATA.bookcase.gateId,
    ) ?? false;
  return solved
    ? { epoch: teamState.epoch, books: LOCK_DATA.bookcase.answer }
    : { epoch: teamState.epoch };
}

async function handleCorrectLockSubmission(
  req: Request,
  res: Response,
  teamId: number,
  gateId: string,
  nodeId: string,
) {
  const result = await req.frontendApi.markTeamGateSatisfied({
    params: {
      teamId: `${teamId}`,
      gateId,
    },
  });
  if (result.status !== 200) {
    console.error(
      `Got API request failure when calling markTeamGateSatisfied for team ${teamId} gate ${gateId}: ${result.body}`,
    );
    res.status(500).json({
      status: "error",
      message: "internal error (API failed)",
    });
  } else {
    // The result of the request to mark the gate satisfied is the post-update
    // team state.  Use that to compute the new node value, and return that as the reply.
    const newTeamState = result.body;
    const node = NODES_BY_ID.get(nodeId);
    if (!node) {
      res.status(500).json({
        status: "error",
        message: "internal error (bad round definition)",
      });
      return;
    } else {
      const filtered = filteredForFrontend(node, newTeamState, {
        immutable:
          !!req.teamState && teamIsImmutable(req.teamState.info.teamUsername),
        puzzles,
      });
      res.json(filtered);
    }
  }
}

type FuseboxHandlerBody = {
  switches: string;
};
export const fuseboxPostHandler: RequestHandler<
  Record<string, never>,
  unknown,
  FuseboxHandlerBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (!req.teamState) {
    // Shouldn't be possible; middleware should ensure this is populated
    res.status(500).json({
      status: "error",
      message: "user not logged in?  API failed open?",
    });
    return;
  }

  // TODO: validate req.body with zod
  // TODO: rate-limit guesses?
  const lockData = LOCK_DATA.painting2;
  const gateId = lockData.gateId;
  const answer = lockData.answer as string;
  const { switches } = req.body;
  if (answer === switches) {
    // mark isg07 as complete
    const { teamId } = req.teamState;
    await handleCorrectLockSubmission(req, res, teamId, gateId, "painting2");
  } else {
    res.status(400).json({
      status: "incorrect",
      message: "switch states are incorrect",
    });
  }
});

type ComboLockHandlerBody = {
  tumblers: [number, number, number];
};
export const comboLockPostHandler: RequestHandler<
  Record<string, never>,
  unknown,
  ComboLockHandlerBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (!req.teamState) {
    // Shouldn't be possible; middleware should ensure this is populated
    res.status(500).json({
      status: "error",
      message: "user not logged in?  API failed open?",
    });
    return;
  }
  const tumblers: [number, number, number] = req.body.tumblers;

  // TODO: validate req.body with zod
  // TODO: rate-limit guesses?
  const lockData = LOCK_DATA.painting1;
  const gateId = lockData.gateId;
  // This lock tolerates the numbers being entered in a couple of orderings
  const acceptableAnswers = lockData.answer as [number, number, number][];
  const expectedPositionsForAcceptableAnswers = acceptableAnswers.map(
    simulatedTumblerPositions,
  );
  if (
    expectedPositionsForAcceptableAnswers.some(
      (expectedPositions: [number, number, number]) => {
        return expectedPositions.every((expectedPosition, i) =>
          isRoughlyEqual(
            expectedPosition,
            tumblers[i] ?? 1000, // the ?? will never be taken, but TS doesn't know thatc
            MAX_TOLERANCE_DEGREES,
          ),
        );
      },
    )
  ) {
    const { teamId } = req.teamState;
    await handleCorrectLockSubmission(req, res, teamId, gateId, "safe");
  } else {
    res.status(400).json({
      status: "incorrect",
      message: "tumbler states are incorrect",
    });
  }
});

type NumericLockHandlerBody = {
  code: string;
};
export const numericLockPostHandler: RequestHandler<
  Record<string, never>,
  unknown,
  NumericLockHandlerBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (!req.teamState) {
    // Shouldn't be possible; middleware should ensure this is populated
    res.status(500).json({
      status: "error",
      message: "user not logged in?  API failed open?",
    });
    return;
  }
  const code: string = req.body.code;

  // TODO: validate req.body with zod
  // TODO: rate-limit guesses
  const lockData = LOCK_DATA.rug;
  const gateId = lockData.gateId;
  const answer = lockData.answer as string;

  if (answer === code) {
    // mark isg09 as complete
    const { teamId } = req.teamState;
    await handleCorrectLockSubmission(req, res, teamId, gateId, "rug");
  } else {
    res.status(400).json({
      status: "incorrect",
      message: "code is incorrect",
    });
  }
});

type DirectionalLockHandlerBody = {
  code: string;
};
export const directionalLockPostHandler: RequestHandler<
  Record<string, never>,
  unknown,
  DirectionalLockHandlerBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (!req.teamState) {
    // Shouldn't be possible; middleware should ensure this is populated
    res.status(500).json({
      status: "error",
      message: "user not logged in?  API failed open?",
    });
    return;
  }
  const code: string = req.body.code;

  // TODO: validate req.body with zod
  // TODO: rate-limit guesses
  const lockData = LOCK_DATA.deskdrawer;
  const gateId = lockData.gateId;
  const answer = lockData.answer as string;

  if (code.endsWith(answer)) {
    // mark isg11 as complete
    const { teamId } = req.teamState;
    await handleCorrectLockSubmission(req, res, teamId, gateId, "desk_drawer");
  } else {
    res.status(400).json({
      status: "incorrect",
      message: "code is incorrect",
    });
  }
});

type CryptexHandlerBody = {
  code: string;
};
export const cryptexPostHandler: RequestHandler<
  Record<string, never>,
  unknown,
  CryptexHandlerBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (!req.teamState) {
    // Shouldn't be possible; middleware should ensure this is populated
    res.status(500).json({
      status: "error",
      message: "user not logged in?  API failed open?",
    });
    return;
  }
  const code: string = req.body.code;

  // TODO: validate req.body with zod
  // TODO: rate-limit guesses
  const lockData = LOCK_DATA.cryptex;
  const gateId = lockData.gateId;
  const answer = lockData.answer as string;

  if (code === answer) {
    // mark isg10 as complete
    const { teamId } = req.teamState;
    await handleCorrectLockSubmission(req, res, teamId, gateId, "cryptex");
  } else {
    res.status(400).json({
      status: "incorrect",
      message: "code is incorrect",
    });
  }
});

type BookcaseHandlerBody = {
  code: string;
};
export const bookcasePostHandler: RequestHandler<
  Record<string, never>,
  unknown,
  BookcaseHandlerBody,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (!req.teamState) {
    // Shouldn't be possible; middleware should ensure this is populated
    res.status(500).json({
      status: "error",
      message: "user not logged in?  API failed open?",
    });
    return;
  }
  const code: string = req.body.code;

  // TODO: validate req.body with zod
  // TODO: rate-limit guesses
  const lockData = LOCK_DATA.bookcase;
  const gateId = lockData.gateId;
  const answer = lockData.answer as string;

  if (code === answer) {
    // mark isg16 as complete
    const { teamId } = req.teamState;
    await handleCorrectLockSubmission(req, res, teamId, gateId, "bookcase");
  } else {
    res.status(400).json({
      status: "incorrect",
      message: "code is incorrect",
    });
  }
});

const IllegalSearchRoundPage = () => {
  // Embed the initial node JSON in the page, as well as the team state, and all puzzle metadata
  const inlineScript = `window.puzzleMetadata = ${JSON.stringify(puzzles)}`;

  return (
    <div>
      <div
        style={{ height: "calc(100vh - 48px)", width: "100vw" }}
        id="illegal-search-root"
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />
      <noscript>
        Javascript is required for this round. Please enable scripts.
      </noscript>
    </div>
  );
};

export default IllegalSearchRoundPage;

import { type RequestHandler, type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import {
  clampAngle,
  rotateMainTumblerBy,
  TUMBLER_INITIAL_STATE,
} from "./combolock";
import {
  LOCK_DATA,
  MODALS_BY_POSTCODE,
  NODES_BY_ID,
  filteredForFrontend,
} from "./graph";

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
    res.json(filteredForFrontend(node, req.teamState.state));
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
  const modal = MODALS_BY_POSTCODE.get(postCode);
  if (modal) {
    const { slotId, gateId } = modal;
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
        const title = PUZZLES[slug]?.title ?? `Stub puzzle for slot ${slug}`;
        const body = { title, slug };
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
      const filtered = filteredForFrontend(node, newTeamState);
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

function isRoughlyEqual(
  exact: number,
  test: number,
  maxDelta: number,
): boolean {
  const lowerBound = exact - maxDelta;
  const upperBound = exact + maxDelta;
  return lowerBound <= test && test <= upperBound;
}

function degreesForTick(value: number): number {
  return clampAngle(((50 - value) * 360) / 50);
}

// Angle, in positive degrees, between the two tick values on the dial
function clockwiseAngleBetween(start: number, end: number): number {
  const startDegs = degreesForTick(start);
  const endDegs = degreesForTick(end);
  return endDegs >= startDegs ? endDegs - startDegs : endDegs + 360 - startDegs;
}

function simulatedTumblerPositions(
  code: [number, number, number],
): [number, number, number] {
  console.log("Simulating tumblers after entering", code);
  let tumblers = TUMBLER_INITIAL_STATE;
  // Two full clockwise turns to pick up all three tumblers + turn to the first number
  let remainingRotation = 360 + 360 + clockwiseAngleBetween(0, code[0]);
  // We step by small amounts because the logic for the tumbler-binding
  while (remainingRotation > 0) {
    const step = Math.min(60, remainingRotation);
    tumblers = rotateMainTumblerBy(step, tumblers);
    console.log("step", step, ": tumblers now", tumblers);
    remainingRotation -= step;
  }

  // One full counterclockwise turn, then another (360 - the clockwise distance) to get ot the second number
  remainingRotation = -360 - 360 + clockwiseAngleBetween(code[0], code[1]);
  while (remainingRotation < 0) {
    const step = Math.max(-60, remainingRotation);
    tumblers = rotateMainTumblerBy(step, tumblers);
    console.log("step", step, ": tumblers now", tumblers);
    remainingRotation -= step;
  }

  // Clockwise from the second number to the third number
  remainingRotation = clockwiseAngleBetween(code[1], code[2]);
  while (remainingRotation > 0) {
    const step = Math.max(-60, remainingRotation);
    tumblers = rotateMainTumblerBy(step, tumblers);
    console.log("step", step, ": tumblers now", tumblers);
    remainingRotation -= step;
  }

  return tumblers;
}

// How much error do we allow in the tumbler states?  Each tick is 7.2 degrees, so this is "must be
// actually closest to that number, but no pickier"
const MAX_TOLERANCE_DEGREES = 3.6;

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
    await handleCorrectLockSubmission(req, res, teamId, gateId, "painting1");
  } else {
    res.status(400).json({
      status: "incorrect",
      message: "tumbler states are incorrect",
    });
  }
});

const IllegalSearchRoundPage = ({
  teamState,
  node,
}: {
  teamState: TeamHuntState;
  node?: string;
}) => {
  // TODO: This should look up via some opaque mapping to node IDs instead of
  // transparent ones to avoid the names of the nodes being distracting to hunters.
  // We should apply the forward mapping in filteredForFrontend and the reverse mapping
  // on request parameters here and above in nodeRequestHandler.
  const initialNode =
    NODES_BY_ID.get(node ?? "main_north") ?? NODES_BY_ID.get("main_north");
  if (!initialNode) {
    // NODES_BY_ID should be guaranteed to have "main_north" so this should
    // never be reached, but this is a good way to convince the typechecker of
    // that truth
    return undefined;
  }
  const filteredNode = filteredForFrontend(initialNode, teamState);
  const filteredNodeJson = JSON.stringify(filteredNode);

  // Embed the initial node JSON in the page, as well as the team state
  const inlineScript = `window.initialNode = ${filteredNodeJson}; window.initialTeamState = ${JSON.stringify(teamState)};`;

  return (
    <div>
      <div id="illegal-search-root" />
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

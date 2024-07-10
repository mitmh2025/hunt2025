import { type RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import { MODALS_BY_POSTCODE, NODES_BY_ID, filteredForFrontend } from "./graph";

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
  if (!req.teamState.rounds.illegal_search) {
    res.status(404).json({
      status: "error",
      message: `round still locked for team ${req.teamState.teamName}`,
    });
    return;
  }
  const nodeId = req.params.nodeSlug;
  const node = NODES_BY_ID.get(nodeId);
  if (node) {
    res.json(filteredForFrontend(node, req.teamState));
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

const IllegalSearchRoundPage = ({
  teamState,
  node,
}: {
  teamState: TeamState;
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

  // Embed the initial node JSON in the page
  const inlineScript = `window.initialNode = ${filteredNodeJson}`;

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

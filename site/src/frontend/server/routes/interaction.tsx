import { type RequestHandler, type Request } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import { type z } from "zod";
import { type TeamState, type TeamHuntState } from "../../../../lib/api/client";
import { type InteractionStateSchema } from "../../../../lib/api/contract";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import { type InteractionDefinition, INTERACTIONS } from "../../interactions";

type Interaction = z.infer<typeof InteractionStateSchema>;
function stubInteractionState(slug: string, interaction: Interaction) {
  switch (interaction.state) {
    case "unlocked":
      return (
        <>
          <p>
            This interaction is <strong>unlocked</strong>.
          </p>
          <form method="POST" action={`/interactions/${slug}/start`}>
            <button type="submit">Start interaction</button>
          </form>
        </>
      );
    case "running":
      return (
        <>
          <p>
            This interaction is <strong>running</strong>.
          </p>
          <form method="POST" action={`/interactions/${slug}/complete`}>
            <button type="submit">Complete interaction</button>
          </form>
        </>
      );
    case "completed":
      return (
        <>
          <p>
            This interaction is <strong>completed</strong>.
          </p>
          <p>The result was: {interaction.result}</p>
        </>
      );
  }
}

function lookupInteraction(
  teamState: TeamHuntState,
  slug: string,
): Interaction | undefined {
  // Look in each round of teamState for an interaction with id matching slug
  for (const round of Object.values(teamState.rounds)) {
    if ("interactions" in round) {
      const interaction = round.interactions?.[slug];
      if (interaction !== undefined) return interaction;
    }
  }
  return undefined;
}

export type InteractionParams = {
  slug: string;
};

async function virtualInteractionHandler(
  req: Request<InteractionParams>,
  teamState: TeamState,
  slug: string,
  interactionDefinition: InteractionDefinition & { type: "virtual" },
) {
  const interaction = lookupInteraction(teamState.state, slug);
  if (!interaction) return undefined;
  const interactionStateLogResult =
    await req.frontendApi.getFullTeamInteractionStateLog({
      query: { team_id: teamState.teamId, slug },
    });
  if (interactionStateLogResult.status !== 200) {
    // Something has gone wrong.
    return undefined;
  }
  const interactionStateLog = interactionStateLogResult.body;
  const log = interactionStateLog.map((entry) =>
    interactionDefinition.handler.format(entry),
  );
  const inlineScript = `window.initialInteractionState = ${JSON.stringify(log)};`;
  const node = (
    <div>
      <h1>{interaction.title}</h1>
      <p>
        This page will eventually host an interaction. For now, we just have a
        stub that allows progressing through the unlock structure.
      </p>
      {stubInteractionState(slug, interaction)}
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="interaction-root" />
    </div>
  );
  return wrapContentWithNavBar(
    {
      node,
      title: interaction.title,
      entrypoints: ["interaction_virtual" as const], // TODO: enable once there's an entrypoint to put here
    },
    teamState,
  );
}

function liveInteractionHandler(
  _req: Request<InteractionParams>,
  teamState: TeamState,
  slug: string,
  _interactionDefinition: InteractionDefinition & { type: "live" },
) {
  const interaction = lookupInteraction(teamState.state, slug);
  if (!interaction) return undefined;
  const node = (
    <div>
      <h1>Interaction (devmode-only page)</h1>
      <p>
        This page will eventually host an interaction. For now, we just have a
        stub that allows progressing through the unlock structure.
      </p>
      {stubInteractionState(slug, interaction)}
    </div>
  );
  return wrapContentWithNavBar(
    {
      node,
      title: interaction.title,
    },
    teamState,
  );
}

export async function interactionRequestHandler(
  req: Request<InteractionParams>,
) {
  if (!req.teamState) {
    return undefined;
  }
  const teamState = req.teamState;
  const slug = req.params.slug;
  const interaction = lookupInteraction(req.teamState.state, slug);
  if (!interaction) return undefined;

  const interactionDefinition = INTERACTIONS[slug];
  if (!interactionDefinition) {
    // Not a defined interaction, this should 404.
    return undefined;
  }

  if (process.env.NODE_ENV === "development") {
    switch (interactionDefinition.type) {
      case "virtual":
        return virtualInteractionHandler(
          req,
          teamState,
          slug,
          interactionDefinition,
        );
      case "live":
        return liveInteractionHandler(
          req,
          teamState,
          slug,
          interactionDefinition,
        );
      default:
        interactionDefinition satisfies never;
        return undefined;
    }
  } else {
    return undefined;
  }
}

export const interactionStartPostHandler: RequestHandler<
  InteractionParams,
  unknown,
  Record<string, never>,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    // Only supported in devmode
    return undefined;
  }
  if (!req.teamState) return undefined;
  // Ignore the result
  await req.frontendApi.startInteraction({
    params: {
      teamId: `${req.teamState.teamId}`,
      interactionId: req.params.slug,
    },
  });
  res.redirect(`/interactions/${req.params.slug}`);
});

export const interactionCompletePostHandler: RequestHandler<
  InteractionParams,
  unknown,
  Record<string, never>,
  Record<string, never>
> = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    // Only supported in devmode
    return undefined;
  }
  if (!req.teamState) return undefined;
  const slug = req.params.slug;
  // Ignore the result
  await req.frontendApi.completeInteraction({
    params: {
      teamId: `${req.teamState.teamId}`,
      interactionId: slug,
    },
    body: {},
  });
  res.redirect(`/interactions/${req.params.slug}`);
});

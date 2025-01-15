import { type RequestHandler, type Request } from "express";
import asyncHandler from "express-async-handler";
import React from "react";
import { type z } from "zod";
import { type TeamState, type TeamHuntState } from "../../../../lib/api/client";
import { type InteractionStateSchema } from "../../../../lib/api/contract";
import { getBackgroundCheckManifestOverrides } from "../../components/BackgroundCheckPuzzleLayout";
import { wrapContentWithNavBar } from "../../components/ContentWithNavBar";
import VirtualInteraction from "../../components/VirtualInteraction";
import { type InteractionDefinition, INTERACTIONS } from "../../interactions";
import virtualInteractionState from "../../interactions/virtualInteractionState";
import {
  type ComponentManifest,
  DEFAULT_MANIFEST,
  ROUND_PUZZLE_COMPONENT_MANIFESTS,
} from "./manifests";

function getComponentManifestForInteraction(
  teamState: TeamHuntState,
  slug: string,
): ComponentManifest {
  const round = Object.entries(teamState.rounds).find(
    ([_id, round]) => round.interactions?.[slug] !== undefined,
  )?.[0];

  if (!round) {
    return DEFAULT_MANIFEST;
  }

  switch (round) {
    case "background_check":
      return Object.assign(
        {},
        DEFAULT_MANIFEST,
        ROUND_PUZZLE_COMPONENT_MANIFESTS.background_check,
        getBackgroundCheckManifestOverrides("", "puzzle"),
      );
  }

  return Object.assign(
    {},
    DEFAULT_MANIFEST,
    ROUND_PUZZLE_COMPONENT_MANIFESTS[round] ?? {},
  );
}

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
  const log = interactionStateLog.flatMap((entry) => {
    const formatted = interactionDefinition.handler.format(entry);
    if (!formatted) return [];

    return [formatted];
  });

  const initialVirtualInteractionState = virtualInteractionState(
    teamState.state,
  );

  const preloadImages = interactionDefinition.handler.getPreloadImages();

  const inlineScript = `window.initialInteractionState = ${JSON.stringify(log)}; window.initialVirtualInteractionState = ${JSON.stringify(initialVirtualInteractionState)};`;
  const node = (
    <div>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="interaction-root">
        <VirtualInteraction
          slug={slug}
          nodes={log}
          state={initialVirtualInteractionState}
          syncedTime={{
            getCurrentTime: () => {
              return Date.now();
            },
          }}
          audioOn={false}
          setAudioOn={() => {
            /* noop */
          }}
        />
      </div>
      {preloadImages.map((src) => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}
      {interaction.virtual && process.env.NODE_ENV === "development" && (
        <form method="POST" action={`/interactions/${slug}/skip`}>
          <button type="submit">[DEV MODE] Skip interaction</button>
        </form>
      )}
    </div>
  );
  return wrapContentWithNavBar(
    {
      node,
      title: interaction.title,
      entrypoints: ["interaction_virtual" as const],
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
  const interactionState = lookupInteraction(teamState.state, slug);
  if (!interactionState) return undefined;

  const interaction = INTERACTIONS[slug];
  if (interaction?.type !== "live") {
    // This should never happen
    return undefined;
  }

  const ContentComponent = interaction.component;
  const title = interaction.title;

  const manifest = getComponentManifestForInteraction(teamState.state, slug);
  const WrapperComponent = manifest.wrapper;
  const HeaderComponent = manifest.header;
  const TitleComponent = manifest.title;
  const TitleWrapperComponent = manifest.titleWrapper;
  const MainComponent = manifest.main;
  const FooterComponent = manifest.footer;
  const FontsComponent = manifest.fonts;

  const node = (
    <>
      {FontsComponent ? <FontsComponent /> : undefined}
      <WrapperComponent>
        <HeaderComponent>
          <TitleWrapperComponent>
            <TitleComponent>
              <span>{title}</span>
            </TitleComponent>
          </TitleWrapperComponent>
        </HeaderComponent>
        <MainComponent id="interaction-content" className="interaction-content">
          <ContentComponent interactionState={interactionState} />
          {process.env.NODE_ENV === "development" && (
            <>
              <p>
                This is a stub for advancing interaction structure in
                development (in production it will be driven by ticket state):
              </p>
              {stubInteractionState(slug, interactionState)}
            </>
          )}
        </MainComponent>
        <FooterComponent />
      </WrapperComponent>
    </>
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

  switch (interactionDefinition.type) {
    case "virtual":
      if (process.env.NODE_ENV === "development") {
        return virtualInteractionHandler(
          req,
          teamState,
          slug,
          interactionDefinition,
        );
      } else {
        return undefined;
      }
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

export const interactionSkipPostHandler: RequestHandler<
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
  await req.frontendApi.forceSkipInteraction({
    params: {
      teamId: `${req.teamState.teamId}`,
      interactionId: slug,
    },
    body: {},
  });
  res.redirect(`/interactions/${req.params.slug}`);
});

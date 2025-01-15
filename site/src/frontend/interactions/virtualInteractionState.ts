import { type TeamHuntState } from "../../../lib/api/client";
import { INTERACTION_START_TIMEOUT_MSEC } from "./constants";
import { artGalleryRewards } from "./interview_at_the_art_gallery/graph";
import { boardwalkRewards } from "./interview_at_the_boardwalk/graph";
import { casinoRewards } from "./interview_at_the_casino/graph";
import { jewelryStoreRewards } from "./interview_at_the_jewelry_store/graph";
import {
  type TeamVirtualInteractionsState,
  type VirtualInteractionState,
} from "./types";

const rewards: Record<
  string,
  Record<string, { asset: string; description: string }>
> = {
  interview_at_the_casino: casinoRewards,
  interview_at_the_jewelry_store: jewelryStoreRewards,
  interview_at_the_art_gallery: artGalleryRewards,
  interview_at_the_boardwalk: boardwalkRewards,
};

export default function virtualInteractionState(
  teamState: TeamHuntState,
): TeamVirtualInteractionsState {
  const unlockedVirtualInteractions = Object.values(teamState.rounds)
    .flatMap((round) =>
      Object.entries(round.interactions ?? {}).flatMap(
        ([slug, { title, state, virtual, result }]) => ({
          slug,
          title,
          state,
          virtual,
          result,
        }),
      ),
    )
    .filter((interaction) => interaction.virtual);

  return {
    epoch: teamState.epoch,
    interactions: unlockedVirtualInteractions.map(
      (interaction): VirtualInteractionState => {
        if (interaction.state === "running") {
          return {
            slug: interaction.slug,
            state: "running",
            title: interaction.title,
          };
        }

        if (interaction.state === "unlocked") {
          if (interaction.slug === teamState.next_interaction) {
            return {
              state: "unstarted",
              enqueuedAt: new Date(
                teamState.next_interaction_queued_at ?? 0,
              ).toISOString(),
              autostartAt: new Date(
                new Date(teamState.next_interaction_queued_at ?? 0).getTime() +
                  INTERACTION_START_TIMEOUT_MSEC,
              ).toISOString(),
              slug: interaction.slug,
              title: interaction.title,
            };
          }

          return {
            state: "queued",
            slug: interaction.slug,
            title: interaction.title,
          };
        }

        return {
          state: "completed",
          slug: interaction.slug,
          title: interaction.title,
          rewardDescription:
            rewards[interaction.slug]?.[interaction.result ?? ""]
              ?.description ?? "",
          rewardImage:
            rewards[interaction.slug]?.[interaction.result ?? ""]?.asset ?? "",
        };
      },
    ),
  };
}

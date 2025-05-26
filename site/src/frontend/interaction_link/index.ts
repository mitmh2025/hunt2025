import { type TeamHuntState } from "../../../lib/api/client";
import HUNT from "../../huntdata";
import { getSlugsBySlot } from "../../huntdata/logic";
import { type Condition } from "../../huntdata/types";
import { INTERACTIONS } from "../interactions";
import { type InteractionLinkState } from "./types";

const slotToSlug = getSlugsBySlot(HUNT);

const getSingleSolveTrigger = (c: Condition): string | undefined => {
  if (typeof c === "object" && "slot_solved" in c) {
    return c.slot_solved;
  }

  if (Array.isArray(c)) {
    const [c1, ...rest] = c;
    if (c1 && rest.length === 0) return getSingleSolveTrigger(c1);
  }

  return undefined;
};

export function interactionLinkState({
  epoch,
  rounds,
  puzzles,
}: TeamHuntState): InteractionLinkState {
  const interactionLinks = HUNT.rounds.flatMap((round) => {
    return (round.interactions ?? []).flatMap((interaction) => {
      // Don't link to an interaction if it's not unlocked
      if (
        rounds[round.slug]?.interactions?.[interaction.id]?.state === undefined
      )
        return [];

      const spec = INTERACTIONS[interaction.id];

      // Don't link to an interaction if it's not live
      if (spec?.type !== "live") return [];

      // Don't link to an interaction if it doesn't have a simple single-slot
      // trigger
      const triggerSlot = getSingleSolveTrigger(interaction.unlock_if);
      if (!triggerSlot) return [];

      const triggerSlug = slotToSlug[triggerSlot];
      if (!triggerSlug) return [];

      const solved = puzzles[triggerSlug]?.answer !== undefined;
      if (!solved) return [];

      return [
        [triggerSlug, { title: spec.title, slug: interaction.id }] as const,
      ];
    });
  });

  return {
    epoch,
    interactionLinks: Object.fromEntries(interactionLinks),
  };
}

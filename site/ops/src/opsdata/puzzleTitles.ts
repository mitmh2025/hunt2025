import { type PuzzleAPIMetadata } from "../../../lib/api/admin_contract";
import { type PuzzleSlot } from "../../../src/huntdata/types";

export function slotName(slot: PuzzleSlot, puzzleMetadata: PuzzleAPIMetadata) {
  if (!slot.slug) {
    return slot.id;
  }

  const metadata = puzzleMetadata[slot.slug];
  if (metadata) {
    return metadata.title;
  }

  return slot.slug;
}

export function slugTitle(slug: string, puzzleMetadata: PuzzleAPIMetadata) {
  const metadata = puzzleMetadata[slug];
  if (metadata) {
    return metadata.title;
  }

  return slug;
}

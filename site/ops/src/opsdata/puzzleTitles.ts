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

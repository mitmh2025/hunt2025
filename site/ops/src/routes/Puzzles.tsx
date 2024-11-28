import HUNT from "../../../src/huntdata";
import { type PuzzleSlot } from "../../../src/huntdata/types";
import { useOpsData, type OpsData } from "../OpsDataProvider";

function slotName(slot: PuzzleSlot, opsData: OpsData) {
  if (!slot.slug) {
    return slot.id;
  }

  if (slot.slug in opsData.puzzleMetadata) {
    return opsData.puzzleMetadata[slot.slug]?.title;
  }

  return slot.slug;
}

export default function Puzzles() {
  const opsData = useOpsData();

  return (
    <>
      <h1>Puzzles</h1>
      {HUNT.rounds.map((round) => (
        <div key={round.slug}>
          <h2>{round.title}</h2>
          <ul>
            {round.puzzles.map((slot) => (
              <li key={slot.id}>{slotName(slot, opsData)}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

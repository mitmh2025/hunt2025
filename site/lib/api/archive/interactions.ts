import { fetchActivityLog, mutateActivityLog } from "./log";
import { ARCHIVE_TEAM_ID } from "./storage";

export async function completeInteraction(
  slug: string,
  result: string,
): Promise<void> {
  await mutateActivityLog(fetchActivityLog(), async (mutator) => {
    if (
      mutator.log.some(
        (entry) =>
          entry.type === "interaction_completed" && entry.slug === slug,
      )
    ) {
      return;
    }

    await mutator.appendLog({
      team_id: ARCHIVE_TEAM_ID,
      type: "interaction_completed",
      slug,
      data: {
        result,
      },
    });
  });
}

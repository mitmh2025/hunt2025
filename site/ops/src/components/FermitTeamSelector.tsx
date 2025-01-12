import { useMemo } from "react";
import { useOpsData } from "../OpsDataProvider";

type ITeamSelectorProps = {
  submitCallback: (teamId: number) => void;
  exclude?: number[];
};

export function FermitTeamSelector({
  submitCallback,
  exclude = [],
}: ITeamSelectorProps) {
  function doIt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitCallback(
      parseInt((e.currentTarget.elements[0] as HTMLInputElement).value, 10),
    );
  }

  const opsData = useOpsData();

  const [solvedTeamIds, unlockedTeamIds] = useMemo(() => {
    const solved = new Set<number>();
    const unlocked = new Set<number>();

    opsData.activityLog.forEach((entry) => {
      if (entry.type === "puzzle_solved") {
        if (entry.slug === "estimation_dot_jpg") {
          if (entry.team_id) {
            solved.add(entry.team_id);
          }
        }
      }
      if (entry.type === "puzzle_unlocked") {
        if (entry.slug === "estimation_dot_jpg") {
          if (entry.team_id) {
            unlocked.add(entry.team_id);
          }
        }
      }
    });

    return [solved, unlocked];
  }, [opsData]);

  const filteredTeams = opsData.teams.filter(
    (t) =>
      !exclude.includes(t.teamId) &&
      unlockedTeamIds.has(t.teamId) &&
      !solvedTeamIds.has(t.teamId),
  );

  const options = filteredTeams.map((t) => (
    <option key={t.teamId} value={t.teamId}>
      {t.name.slice(0, 20)}
    </option>
  ));

  return (
    <form onSubmit={doIt}>
      <select>{options}</select>
      <input type="submit" value="Submit" />
    </form>
  );
}

import { useOpsData } from "../OpsDataProvider";

type ITeamSelectorProps = {
  submitCallback: (teamId: number) => void;
  exclude?: number[];
  includeOnly?: number[];
};

export function FermitTeamSelector({
  submitCallback,
  exclude = [],
  includeOnly = [],
}: ITeamSelectorProps) {
  function doIt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitCallback(
      parseInt((e.currentTarget.elements[0] as HTMLInputElement).value, 10),
    );
  }

  const opsData = useOpsData();
  //  const includeOnly : number[] = [];

  //  const includeList = include ?? null;
  //  const excludeList = exclude ?? [];

  const options = (
    includeOnly.length > 0
      ? opsData.teams.filter((t) => includeOnly.includes(t.teamId))
      : opsData.teams
  )
    .filter((t) => !exclude.includes(t.teamId))
    .map((t) => (
      <option key={t.teamId} value={t.teamId}>
        {t.name.slice(0, 40)}
      </option>
    ));

  return (
    <form onSubmit={doIt}>
      <select>{options}</select>
      <input type="submit" value="Submit" />
    </form>
  );
}

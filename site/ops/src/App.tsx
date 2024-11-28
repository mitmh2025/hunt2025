import { useOpsData } from "./OpsDataProvider";

export default function App() {
  const data = useOpsData();

  return (
    <>
      <h1>Ops</h1>
      <div>
        <h1>Teams</h1>
        {data.teams.map((team) => (
          <div key={team.teamId}>
            <h2>{team.name}</h2>
            <div>Registration: {JSON.stringify(team.registration)}</div>
            <div>State: {JSON.stringify(team.state)}</div>
            <div>Formatted State: {JSON.stringify(team.formattedState)}</div>
          </div>
        ))}

        <h1>Logs</h1>
        <h2>Registration Log</h2>
        <ul>
          {data.registrationLog.map((entry) => (
            <li key={entry.id}>{JSON.stringify(entry)}</li>
          ))}
        </ul>
        <h2>Activity Log</h2>
        <ul>
          {data.activityLog.map((entry) => (
            <li key={entry.id}>{JSON.stringify(entry)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

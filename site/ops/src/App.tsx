import { useOpsData } from "./OpsDataProvider";

export default function App() {
  const data = useOpsData();

  return (
    <>
      <h1>Ops</h1>
      <div>
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

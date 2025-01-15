import React from "react";
import { type TimelineActivityLogEntry } from "./types";

const TimelineBody = ({ log }: { log: TimelineActivityLogEntry[] }) => {
  const sortedLog = [...log].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
  return (
    <table>
      <tbody>
        {sortedLog.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.timestamp.toString()}</td>
            <td>{entry.thread}</td>
            <td>{entry.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimelineBody;

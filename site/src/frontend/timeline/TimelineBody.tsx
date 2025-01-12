import React from "react";
import { type TimelineActivityLogEntry } from "./types";

const TimelineBody = ({ log }: { log: TimelineActivityLogEntry[] }) => {
  return (
    <table>
      <tbody>
        {log.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.id}</td>
            <td>{entry.slug}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimelineBody;

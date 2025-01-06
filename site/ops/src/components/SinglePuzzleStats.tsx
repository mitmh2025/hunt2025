import { Duration } from "luxon";
import { type SinglePuzzleStats } from "../routes/Puzzle";
import Stat, { StatsContainer } from "./Stat";

export function SinglePuzzleStats({ stats }: { stats: SinglePuzzleStats }) {
  function formatDuration(ms: number | undefined) {
    if (ms === undefined) {
      return "N/A";
    }

    return Duration.fromMillis(ms).toFormat("hh:mm:ss");
  }

  return (
    <StatsContainer>
      <Stat label="Unlocked" value={stats.unlockCount} />
      <Stat label="Solved" value={stats.solvedCount} />
      <Stat label="Open, Unsolved" value={stats.openCount} />
      <Stat label="Median Time" value={formatDuration(stats.medianSolveTime)} />
      <Stat label="Average Time" value={formatDuration(stats.avgSolveTime)} />
      <Stat
        label="Fastest Time"
        value={formatDuration(stats.fastestSolveTime)}
        subValue={
          stats.fastestSolveTeamUsername ? (
            <span
              style={{
                fontSize: "12px",
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              By {stats.fastestSolveTeamUsername}
            </span>
          ) : undefined
        }
      />
      <Stat
        label="Slowest Time"
        value={formatDuration(stats.slowestSolveTime)}
        subValue={
          stats.slowestSolveTeamUsername ? (
            <span
              style={{
                fontSize: "12px",
                maxWidth: "115px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              By {stats.slowestSolveTeamUsername}
            </span>
          ) : undefined
        }
      />
      <Stat label="Hints Requested" value={stats.hintCount} />
      <Stat label="Bought Answers" value={stats.boughtAnswerCount} />
    </StatsContainer>
  );
}

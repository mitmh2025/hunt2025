import { Button } from "@mui/material";
import { useDialogs, useNotifications } from "@toolpad/core";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import HUNT from "../../../src/huntdata";
import { useOpsClients, useOpsData } from "../OpsDataProvider";
import PuzzleTeamList from "../components/PuzzleTeamList";
import { SinglePuzzleStats } from "../components/SinglePuzzleStats";
import { slotName } from "../opsdata/puzzleTitles";
import { median } from "../util/stats";

export type SinglePuzzleStats = {
  unlockCount: number;
  solvedCount: number;
  hintCount: number;
  boughtAnswerCount: number;
  openCount: number;
  medianSolveTime: number;
  avgSolveTime: number;
  fastestSolveTime: number | undefined;
  fastestSolveTeamUsername: string | undefined;
  slowestSolveTime: number | undefined;
  slowestSolveTeamUsername: string | undefined;
  teams: Record<
    number,
    {
      unlockableTime: number | null;
      unlockTime: number | null;
      solveTime: number | null;
      guesses: number;
      username: string;
      hints: number;
      boughtAnswer: boolean;
    }
  >;
};

export default function Puzzle() {
  const dialogs = useDialogs();
  const opsData = useOpsData();
  const slug = useParams().slug ?? "";
  const [submitting, setSubmitting] = useState(false);
  const { adminClient, updateActivityLog } = useOpsClients();
  const notifications = useNotifications();

  const { round, puzzleSlot } = useMemo(() => {
    let round = null;
    let puzzleSlot = null;

    for (const roundData of HUNT.rounds) {
      for (const slot of roundData.puzzles) {
        if (slot.slug === slug) {
          round = roundData;
          puzzleSlot = slot;
          break;
        }
      }
    }

    return { round, puzzleSlot };
  }, [slug]);

  const stats = useMemo(() => {
    let unlockCount = 0;
    let solvedCount = 0;
    const hintCount = 0;
    let boughtAnswerCount = 0;

    const teams: SinglePuzzleStats["teams"] = Object.fromEntries(
      opsData.teams.map((team) => [
        team.teamId,
        {
          unlockTime: null,
          solveTime: null,
          unlockableTime: null,
          guesses: 0,
          username: team.username,
          hints: 0,
          boughtAnswer: false,
        },
      ]),
    );

    opsData.activityLog.forEach((entry) => {
      switch (entry.type) {
        case "puzzle_unlockable": {
          if (entry.slug === slug) {
            if (entry.team_id) {
              const teamData = teams[entry.team_id];
              if (teamData) {
                teamData.unlockableTime = entry.timestamp.getTime();
              }
            } else {
              Object.values(teams).forEach((teamData) => {
                teamData.unlockableTime = entry.timestamp.getTime();
              });
            }
          }

          break;
        }
        case "puzzle_guess_submitted": {
          if (entry.slug === slug) {
            if (entry.team_id) {
              const teamData = teams[entry.team_id];
              if (teamData) {
                teamData.guesses += 1;
              }
            }
          }

          break;
        }
        case "puzzle_unlocked": {
          if (entry.slug === slug) {
            unlockCount += 1;

            if (entry.team_id) {
              const teamData = teams[entry.team_id];
              if (teamData) {
                teamData.unlockTime = entry.timestamp.getTime();
              }
            } else {
              Object.values(teams).forEach((teamData) => {
                teamData.unlockTime = entry.timestamp.getTime();
              });
            }
          }

          break;
        }

        case "puzzle_solved": {
          if (entry.slug === slug) {
            solvedCount += 1;

            if (entry.team_id) {
              const teamData = teams[entry.team_id];
              if (teamData) {
                teamData.solveTime = entry.timestamp.getTime();
              }
            } else {
              Object.values(teams).forEach((teamData) => {
                teamData.solveTime = entry.timestamp.getTime();
              });
            }
          }

          break;
        }

        case "puzzle_answer_bought":
          boughtAnswerCount += 1;

          if (entry.slug === slug) {
            if (entry.team_id) {
              const teamData = teams[entry.team_id];
              if (teamData) {
                teamData.boughtAnswer = true;
              }
            }
          }

          break;

        // TODO: count hints
      }
    });

    const solveTimes = Object.entries(teams).flatMap(
      ([teamId, { unlockTime, solveTime, username }]) => {
        if (unlockTime && solveTime) {
          return [{ teamId, solveTime: solveTime - unlockTime, username }];
        }

        return [];
      },
    );

    solveTimes.sort((a, b) => a.solveTime - b.solveTime);

    const medianSolveTime = median(solveTimes.map((entry) => entry.solveTime));
    const avgSolveTime =
      solveTimes.reduce((sum, entry) => sum + entry.solveTime, 0) /
      solveTimes.length;

    const fastestSolveTime = solveTimes[0]?.solveTime;
    const fastestSolveTeamUsername = solveTimes[0]?.username;

    const slowestSolveTime = solveTimes[solveTimes.length - 1]?.solveTime;
    const slowestSolveTeamUsername =
      solveTimes[solveTimes.length - 1]?.username;

    return {
      unlockCount,
      solvedCount,
      hintCount,
      boughtAnswerCount,
      openCount: unlockCount - solvedCount,
      medianSolveTime,
      avgSolveTime,
      fastestSolveTime,
      fastestSolveTeamUsername,
      slowestSolveTime,
      slowestSolveTeamUsername,
      teams,
    };
  }, [slug, opsData.activityLog, opsData.teams]);

  if (!slug || !round || !puzzleSlot) {
    return <p>No puzzle with that slug</p>;
  }

  const title = slotName(puzzleSlot, opsData.puzzleMetadata);

  function onClickNotifyErratum() {
    void dialogs.confirm(
      `Are you sure you want to notify teams that an erratum has been issued for ${title}?`,
      {
        title: "Push Erratum Notification",
        okText: "Push",
        cancelText: "Cancel",
        onClose: async (result) => {
          if (!result) {
            return;
          }

          try {
            setSubmitting(true);
            const result = await adminClient.issueErratum({
              params: { slug },
              body: {},
            });

            if (result.status !== 200) {
              throw new Error(`HTTP ${result.status}: ${result.body}`);
            }

            postMessage("");

            await updateActivityLog({ forceRequest: true });

            notifications.show("Erratum issued", {
              severity: "success",
              autoHideDuration: 3000,
            });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            notifications.show(`Failed to issue erratum: ${msg}`, {
              severity: "error",
              autoHideDuration: 3000,
            });
          } finally {
            setSubmitting(false);
          }
        },
      },
    );
  }

  return (
    <>
      <p>
        <Link to="/puzzles">&laquo; Puzzles</Link>
      </p>
      <h1>
        {title} ({opsData.puzzleMetadata[slug]?.code_name})
      </h1>
      <p>
        <strong>Round:</strong> {round.title}
        <br />
        <strong>Slug / Slot:</strong> {slug} - {puzzleSlot.id}
        <br />
        <strong>View:</strong>{" "}
        <a
          href={`https://dev.mitmh2025.com/puzzles/${slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Puzzle
        </a>{" "}
        <a
          href={`https://dev.mitmh2025.com/puzzles/${slug}/solution`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Solution
        </a>
        <br />
        <Button
          variant="contained"
          type="submit"
          disabled={submitting}
          sx={{ mt: 2 }}
          onClick={onClickNotifyErratum}
        >
          Push Erratum Notification
        </Button>
      </p>

      <SinglePuzzleStats stats={stats} />

      <h2 style={{ marginTop: 60 }}>Teams</h2>
      <PuzzleTeamList stats={stats} title={title} slug={slug} />
    </>
  );
}

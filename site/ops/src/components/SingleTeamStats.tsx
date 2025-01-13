import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Button,
  Input,
} from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { useMemo, useState } from "react";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import { useOpsClients } from "../OpsDataProvider";
import { type BigBoardTeam } from "../opsdata/bigBoard";
import { type TeamData } from "../opsdata/types";
import { AdminOnly } from "./AdminOnly";
import Stat, { StatsContainer } from "./Stat";
type SingleTeamStatsData = {
  puzzlesSolved: number;
  puzzlesSolvedLast3Hours: number;
  metasSolved: number;
  metasSolvedLast3Hours: number;
  roundsCompleted: number;
  teamSize: number;
  onCampusSize: number;
  keys: number;
  clues: number;
  unsolvedUnlockedPuzzles: number;
  hintsRequested: number;
  hintsRequestedLast3Hours: number;
};

function GrantKeysDialog({
  teamId,
  teamUsername,
  open,
  onClose,
}: {
  teamId: number;
  teamUsername: string;
  open: boolean;
  onClose: () => void;
}) {
  const { adminClient, updateActivityLog } = useOpsClients();
  const [qty, setQty] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const notifications = useNotifications();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (qty > 0) {
      setSubmitting(true);
      adminClient
        .grantKeys({
          body: {
            teamIds: [teamId],
            amount: qty,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          return updateActivityLog({ forceRequest: true });
        })
        .then(() => {
          notifications.show(`Granted ${qty} keys to ${teamUsername}`, {
            severity: "success",
            autoHideDuration: 3000,
          });
          onClose();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to grant keys: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Grant Keys (puzzle unlocks) to <strong>{teamUsername}</strong>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <label>
            Amount:{" "}
            <Input
              type="number"
              name="amount"
              inputProps={{
                min: 1,
                max: 99,
                step: 1,
              }}
              required
              value={qty}
              onChange={(e) => {
                setQty(parseInt(e.target.value, 10));
              }}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button type="button" disabled={submitting} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            Grant {qty} Keys (puzzle unlocks)
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function GrantCluesDialog({
  teamId,
  teamUsername,
  open,
  onClose,
}: {
  teamId: number;
  teamUsername: string;
  open: boolean;
  onClose: () => void;
}) {
  const { adminClient, updateActivityLog } = useOpsClients();
  const [qty, setQty] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const notifications = useNotifications();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (qty > 0) {
      setSubmitting(true);
      adminClient
        .grantStrongCurrency({
          body: {
            teamIds: [teamId],
            amount: qty,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          return updateActivityLog({ forceRequest: true });
        })
        .then(() => {
          notifications.show(`Granted ${qty} clues to ${teamUsername}`, {
            severity: "success",
            autoHideDuration: 3000,
          });
          onClose();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to grant clues: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Grant Clues (free answers) to <strong>{teamUsername}</strong>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <label>
            Amount:{" "}
            <Input
              type="number"
              name="amount"
              inputProps={{
                min: 1,
                max: 99,
                step: 1,
              }}
              required
              value={qty}
              onChange={(e) => {
                setQty(parseInt(e.target.value, 10));
              }}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button type="button" disabled={submitting} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            Grant {qty} Clues (free answers)
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function SingleTeamStats({
  team,
  teamActivity,
  bigBoardTeam,
}: {
  team: TeamData;
  teamActivity: InternalActivityLogEntry[];
  bigBoardTeam: BigBoardTeam;
}) {
  const [grantKeysModalOpen, setGrantKeysModalOpen] = useState(false);
  const [grantCluesModalOpen, setGrantCluesModalOpen] = useState(false);

  const data: SingleTeamStatsData = useMemo(() => {
    const d = {
      // These 4 are counted below
      puzzlesSolved: 0,
      puzzlesSolvedLast3Hours: 0,
      metasSolved: 0,
      metasSolvedLast3Hours: 0,

      roundsCompleted: bigBoardTeam.rounds.filter((r) => r.progress === 1)
        .length,
      teamSize: team.registration.peopleTotal,
      onCampusSize: team.registration.peopleOnCampus,
      keys: team.state.available_currency,
      clues: team.state.available_strong_currency,
      unsolvedUnlockedPuzzles: Array.from(team.state.puzzles_unlocked).filter(
        (p) => !team.state.puzzles_solved.has(p),
      ).length,
      hintsRequested: 0, // TODO
      hintsRequestedLast3Hours: 0, // TODO
    };

    const metaSlugs = new Set(
      bigBoardTeam.rounds.flatMap((round) => {
        return [
          ...round.metas.map((m) => m.slug),
          ...round.supermetas.map((m) => m.slug),
        ];
      }),
    );

    for (const entry of teamActivity) {
      if (entry.type === "puzzle_solved") {
        const isMeta = metaSlugs.has(entry.slug);
        const wasLast3Hours =
          entry.timestamp.getTime() > Date.now() - 3 * 60 * 60 * 1000;

        d.puzzlesSolved += 1;

        if (isMeta) {
          d.metasSolved += 1;
        }

        if (wasLast3Hours) {
          d.puzzlesSolvedLast3Hours += 1;

          if (isMeta) {
            d.metasSolvedLast3Hours += 1;
          }
        }
      }
    }

    return d;
  }, [team, teamActivity, bigBoardTeam]);

  return (
    <StatsContainer>
      <Stat
        label="Puzzles Solved"
        value={data.puzzlesSolved}
        subValue={<>Past 3 hours: {data.puzzlesSolvedLast3Hours}</>}
      />

      <Stat
        label="Metas Solved"
        value={data.metasSolved}
        subValue={<>Past 3 hours: {data.metasSolvedLast3Hours}</>}
      />

      <Stat label="Rounds Complete" value={data.roundsCompleted} />

      <Stat
        label="Team Size"
        value={data.teamSize}
        subValue={<>On campus: {data.onCampusSize}</>}
      />

      <Stat
        label="Keys (unlocks)"
        value={data.keys}
        action={
          <AdminOnly>
            <Button
              onClick={() => {
                setGrantKeysModalOpen(true);
              }}
            >
              🗝️ Grant Keys
            </Button>
          </AdminOnly>
        }
      />
      <Stat
        label="Clues (answers)"
        value={data.clues}
        action={
          <AdminOnly>
            <Button
              onClick={() => {
                setGrantCluesModalOpen(true);
              }}
            >
              🔎 Grant Clues
            </Button>
          </AdminOnly>
        }
      />

      <Stat label="Open Puzzles" value={data.unsolvedUnlockedPuzzles} />

      <Stat
        label="Hints Requested"
        value={data.hintsRequested}
        subValue={<>Past 3 hours: {data.hintsRequestedLast3Hours}</>}
      />

      <GrantKeysDialog
        teamId={team.teamId}
        teamUsername={team.username}
        open={grantKeysModalOpen}
        onClose={() => {
          setGrantKeysModalOpen(false);
        }}
      />

      <GrantCluesDialog
        teamId={team.teamId}
        teamUsername={team.username}
        open={grantCluesModalOpen}
        onClose={() => {
          setGrantCluesModalOpen(false);
        }}
      />
    </StatsContainer>
  );
}

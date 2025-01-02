import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Button,
  Input,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import { useOpsData } from "../OpsDataProvider";
import { type BigBoardTeam } from "../opsdata/bigBoard";
import { type TeamData } from "../opsdata/types";
import Stat, { StatsContainer } from "./Stat";
type SingleTeamStatsData = {
  puzzlesSolved: number;
  puzzlesSolvedLast3Hours: number;
  metasSolved: number;
  metasSolvedLast3Hours: number;
  roundsCompleted: number;
  teamSize: number;
  onCampusSize: number;
  unlockCurrency: number;
  freeSolveCurrency: number;
  unsolvedUnlockedPuzzles: number;
  hintsRequested: number;
  hintsRequestedLast3Hours: number;
};

function GrantUnlockCurrencyDialog({
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
  const { adminClient, appendActivityLogEntries } = useOpsData();
  const [qty, setQty] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (qty > 0) {
      setSubmitting(true);
      adminClient
        .grantUnlockCurrency({
          body: {
            teamIds: [teamId],
            amount: qty,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          appendActivityLogEntries(result.body);
          enqueueSnackbar(`Granted ${qty} unlock currency to ${teamUsername}`, {
            variant: "success",
          });
          onClose();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          enqueueSnackbar(`Failed to grant unlock currency: ${msg}`, {
            variant: "error",
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
        Grant Unlock Currency to <strong>{teamUsername}</strong>
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
          <Button type="submit" disabled={submitting}>
            Grant {qty} Currency
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
  const [grantModalOpen, setGrantModalOpen] = useState(false);

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
      unlockCurrency: team.state.available_currency,
      freeSolveCurrency: 0, // TODO
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
        label="Unlocks"
        value={data.unlockCurrency}
        action={
          <Button
            onClick={() => {
              setGrantModalOpen(true);
            }}
          >
            Grant
          </Button>
        }
      />
      <Stat label="Free Solves" value={data.freeSolveCurrency} />

      <Stat label="Open Puzzles" value={data.unsolvedUnlockedPuzzles} />

      <Stat
        label="Hints Requested"
        value={data.hintsRequested}
        subValue={<>Past 3 hours: {data.hintsRequestedLast3Hours}</>}
      />

      <GrantUnlockCurrencyDialog
        teamId={team.teamId}
        teamUsername={team.username}
        open={grantModalOpen}
        onClose={() => {
          setGrantModalOpen(false);
        }}
      />
    </StatsContainer>
  );
}

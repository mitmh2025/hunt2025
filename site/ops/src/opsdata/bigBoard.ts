import { type PuzzleAPIMetadata } from "../../../lib/api/admin_contract";
import { INTERACTIONS } from "../../../src/frontend/interactions";
import HUNT from "../../../src/huntdata";
import { getSlugsBySlot } from "../../../src/huntdata/logic";
import { type OpsData } from "../OpsDataProvider";
import { slotName } from "./puzzleTitles";
import { type TeamData } from "./types";

const slugsBySlot = getSlugsBySlot(HUNT);

export type BigBoardPuzzle = {
  slug: string;
  title: string;
  state: "solved" | "unlocked" | "locked";
};

export type BigBoardInteraction = {
  id: string;
  title: string;
  state: "complete" | "started" | "unlocked" | "locked";
};

export type BigBoardRound = {
  slug: string;
  title: string;
  progress: number;
  status: "complete" | "unlocked" | "locked";
  supermetas: BigBoardPuzzle[];
  metas: BigBoardPuzzle[];
  puzzles: BigBoardPuzzle[];
  interactions: BigBoardInteraction[];
};

export type BigBoardTeam = {
  id: number;
  username: string;
  progress: number;
  rounds: BigBoardRound[];
};

export type BigBoardData = {
  teams: BigBoardTeam[];
};

export function formatTeamData(
  teamData: TeamData,
  puzzleMetadata: PuzzleAPIMetadata,
): BigBoardTeam {
  const rounds = HUNT.rounds
    .filter((round) => round.slug !== "the_vault")
    .map((round) => {
      const supermetas: BigBoardPuzzle[] = [];
      const metas: BigBoardPuzzle[] = [];
      const puzzles: BigBoardPuzzle[] = [];
      let totalSolved = 0;
      let roundSolved = false;

      for (const puzzle of round.puzzles) {
        const slug = slugsBySlot[puzzle.id];
        if (!slug) {
          continue;
        }

        let state: "solved" | "unlocked" | "locked" = "locked";
        if (teamData.state.puzzles_solved.has(slug)) {
          state = "solved";
          totalSolved++;

          if (puzzle.id === round.final_puzzle_slot) {
            roundSolved = true;
          }
        } else if (teamData.state.puzzles_unlocked.has(slug)) {
          state = "unlocked";
        }

        const data: BigBoardPuzzle = {
          slug,
          title: slotName(puzzle, puzzleMetadata),
          state,
        };

        if (puzzle.is_supermeta) {
          supermetas.push(data);
        } else if (puzzle.is_meta) {
          metas.push(data);
        } else {
          puzzles.push(data);
        }
      }

      const interactions: BigBoardInteraction[] = [];
      for (const interaction of round.interactions ?? []) {
        if (!(interaction.id in INTERACTIONS)) {
          continue;
        }
        const interactionDef =
          INTERACTIONS[interaction.id as keyof typeof INTERACTIONS];
        const title = interactionDef.title;

        let state: "complete" | "started" | "unlocked" | "locked" = "locked";
        if (teamData.state.interactions_completed.has(interaction.id)) {
          state = "complete";
        } else if (teamData.state.interactions_started.has(interaction.id)) {
          state = "started";
        } else if (teamData.state.interactions_unlocked.has(interaction.id)) {
          state = "unlocked";
        }

        interactions.push({
          id: interaction.id,
          title,
          state,
        });
      }

      const progress = roundSolved
        ? 1
        : totalSolved / (puzzles.length + metas.length + supermetas.length);

      let roundStatus: "locked" | "complete" | "unlocked" = "locked";
      if (roundSolved) {
        roundStatus = "complete";
      } else if (teamData.state.rounds_unlocked.has(round.slug)) {
        roundStatus = "unlocked";
      }

      return {
        slug: round.slug,
        title: round.title,
        progress,
        status: roundStatus,
        supermetas,
        metas,
        puzzles,
        interactions,
      };
    });

  return {
    id: teamData.teamId,
    username: teamData.username,
    progress: rounds.reduce((acc, round) => acc + round.progress, 0),
    rounds,
  };
}

export function formatAllTeamsData(data: OpsData): BigBoardData {
  return {
    teams: data.teams
      .map((team) => formatTeamData(team, data.puzzleMetadata))
      .sort((a, b) => b.progress - a.progress),
  };
}

import {
  type ActivityLogMutatorInterface,
  type AppendableActivityLogEntry,
  TeamStateIntermediate,
  recalculateTeamState,
  TeamInfoIntermediate,
} from "../../../src/api/logic";
import { NOTIFICATION_HIGH_WATER_MARK } from "../../../src/frontend/client/navbar";
import { INTERACTIONS } from "../../../src/frontend/interactions";
import HUNT from "../../../src/huntdata";
import { getSlugsBySlot } from "../../../src/huntdata/logic";
import { type Hunt } from "../../../src/huntdata/types";
import { IMMUTABLE_TEAM_USERNAMES } from "../../../src/utils/teamIsImmutable";
import {
  type TeamRegistrationLogEntry,
  type InternalActivityLogEntry,
  type PuzzleStateLogEntry,
} from "../frontend_contract";
import { reducePuzzleStateIntermediate } from "./reducers";
import {
  activityLog,
  ALL_LOGS,
  ARCHIVE_TEAM_ID,
  puzzleStateLog,
  teamRegistrationLog,
} from "./storage";

type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never;

class TeamRegistrationMutator {
  public maxId: number;
  public teamInfoIntermediate?: TeamInfoIntermediate;
  public mutated = false;

  constructor(public log: TeamRegistrationLogEntry[]) {
    this.maxId = Math.max(0, ...log.map((e) => e.id));
  }

  getTeamInfo(): TeamInfoIntermediate {
    if (!this.teamInfoIntermediate) {
      this.teamInfoIntermediate = this.log.reduce(
        (acc, entry) => acc.reduce(entry),
        new TeamInfoIntermediate(),
      );
    }

    return this.teamInfoIntermediate;
  }

  appendLog(
    append: DistributiveOmit<TeamRegistrationLogEntry, "id" | "timestamp">,
  ) {
    const entry: TeamRegistrationLogEntry = {
      ...append,
      id: ++this.maxId,
      timestamp: new Date(),
    };
    this.log.push(entry);
    this.teamInfoIntermediate?.reduce(entry);
    this.mutated = true;
    return Promise.resolve();
  }
}

const initialTeamRegistrationLog: TeamRegistrationLogEntry[] = [
  {
    id: 1,
    team_id: ARCHIVE_TEAM_ID,
    timestamp: new Date(1737133200000),
    type: "team_registered",
    data: {
      name: "Public Access",
      password: "publicpassword",
      referrer: "Through word-of-mouth",
      teamGoal: "We’re just curious what it’s all about.",
      username: IMMUTABLE_TEAM_USERNAMES[0],
      teamEmail: "nobody@example.com",
      peopleAlum: 0,
      peopleGrad: 0,
      teamValues: ["Having a good time with puzzle friends (on my team)"],
      contactName: "Public Access",
      peopleMinor: 0,
      peopleOther: 0,
      peopleStaff: 0,
      peopleTotal: 1,
      contactEmail: "nobody@example.com",
      contactPhone: "+16175551111",
      peopleRemote: 0,
      teamLocation: "Room Not Required",
      peopleOnCampus: 1,
      peopleUndergrad: 0,
      acceptUnattached: false,
      peopleAffiliates: 0,
      teamMemberLocations: "MIT",
      teamYearEstablished: 2025,
      secondaryContactName: "Public Access",
      contactMailingAddress: "Hunt HQ",
      secondaryContactEmail: "nobody@example.com",
      secondaryContactPhone: "+16175551111",
      teamExcitedAboutWinning: "No",
    },
  },
];

export const mutateTeamRegistrationLog = async <T>(
  log: TeamRegistrationLogEntry[],
  fn: (mutator: TeamRegistrationMutator) => T | Promise<T>,
): Promise<T> => {
  const mutator = new TeamRegistrationMutator(log);
  const ret = await fn(mutator);
  if (mutator.mutated) {
    teamRegistrationLog.set(mutator.log);
  }
  return ret;
};

export const fetchTeamRegistrationLog = () => {
  let log = teamRegistrationLog.fetch();

  if (log.length === 0) {
    log = initialTeamRegistrationLog;
    teamRegistrationLog.set(log);
  }

  return log;
};

class ActivityLogMutator implements ActivityLogMutatorInterface {
  public maxId: number;
  public teamStateIntermediate?: TeamStateIntermediate;
  public mutated = false;

  constructor(public log: InternalActivityLogEntry[]) {
    this.maxId = Math.max(0, ...log.map((e) => e.id));
  }

  getTeamState(hunt: Hunt, teamId: number): TeamStateIntermediate {
    if (teamId !== ARCHIVE_TEAM_ID) {
      throw new Error("Unexpected team ID");
    }

    if (!this.teamStateIntermediate) {
      this.teamStateIntermediate = this.log.reduce(
        (acc, entry) => acc.reduce(entry),
        new TeamStateIntermediate(hunt),
      );
    }

    return this.teamStateIntermediate;
  }

  getPuzzleState(slug: string) {
    return reducePuzzleStateIntermediate(slug, this.log);
  }

  appendLog(append: AppendableActivityLogEntry) {
    if (append.team_id && append.team_id !== ARCHIVE_TEAM_ID) {
      throw new Error("Unexpected team ID");
    }

    const entry: InternalActivityLogEntry = {
      currency_delta: 0,
      strong_currency_delta: 0,
      ...append,
      id: ++this.maxId,
      timestamp: new Date(),
    };
    this.log.push(entry);
    this.teamStateIntermediate?.reduce(entry);
    this.mutated = true;
    return Promise.resolve();
  }
}

export const mutateActivityLog = async <T>(
  log: InternalActivityLogEntry[],
  fn: (mutator: ActivityLogMutator) => T | Promise<T>,
): Promise<T> => {
  const mutator = new ActivityLogMutator(log);
  const ret = await fn(mutator);
  await recalculateTeamState(HUNT, ARCHIVE_TEAM_ID, mutator);
  if (mutator.mutated) {
    activityLog.set(mutator.log);
  }

  return ret;
};

export const fetchActivityLog = () => {
  return activityLog.fetch();
};

const ensureUnlocked = async (
  mutator: ActivityLogMutator,
  type:
    | "round_unlocked"
    | "puzzle_unlocked"
    | "interaction_unlocked"
    | "gate_completed",
  slug: string,
) => {
  if (mutator.log.some((e) => e.type === type && e.slug === slug)) {
    return;
  }
  await mutator.appendLog({
    team_id: ARCHIVE_TEAM_ID,
    type,
    slug,
  });
};

export const resetNotificationHigHWaterMark = (
  log: InternalActivityLogEntry[],
) => {
  const maxId = Math.max(0, ...log.map((e) => e.id));
  localStorage.setItem(NOTIFICATION_HIGH_WATER_MARK, maxId.toString());
};

export const initializeLogs = async () => {
  ALL_LOGS.forEach((l) => {
    l.clear();
  });

  const log = fetchActivityLog();
  await mutateActivityLog(log, async (mutator) => {
    await mutator.appendLog({ type: "gate_completed", slug: "hunt_started" });
    await mutator.appendLog({
      type: "gate_completed",
      slug: "solutions_released",
    });
    await mutator.appendLog({ type: "currency_adjusted", currency_delta: 9 });
  });

  // Do this in two separate mutations so that we recalculate team state after
  // starting the hunt
  await mutateActivityLog(log, async (mutator) => {
    // These puzzles were all manually unlocked during hunt:
    for (const slug of [
      "art_history",
      "control_room",
      "in_communicado_tonight",
      "estimation_dot_jpg",
      "making_contact_with_an_informant",
      "tailing_a_lead",
      "navigating_high_society",
      "seeing_the_big_picture",
      "infiltrating_the_criminal_underworld",
      "re_infiltrating_the_criminal_underworld",
      "trainees_first_recital",
      "the_comeback_it_takes_two",
      "a_b_c_easy_as_1_2_3",
      "wouthit_porbelm",
      "hello_darkness_my_old_friend",
    ]) {
      await ensureUnlocked(mutator, "puzzle_unlocked", slug);
    }
  });

  resetNotificationHigHWaterMark(log);
  return log;
};

const interactionResults: Record<string, string> = {
  interview_at_the_art_gallery: "kieftenbeld",
  interview_at_the_boardwalk: "photo",
  interview_at_the_casino: "ace-of-diamonds",
  interview_at_the_jewelry_store: "phone-number",
};

export const generateCompleteLogs = async () => {
  const log = await initializeLogs();
  await mutateActivityLog(log, async (mutator) => {
    // Similar to seed generation, make sure all rounds are unlocked
    for (const round of HUNT.rounds) {
      if (round.slug !== "floaters" && round.slug !== "endgame") {
        await ensureUnlocked(mutator, "round_unlocked", round.slug);
      }
    }

    // Make sure all puzzles are unlocked
    for (const slug of Object.values(getSlugsBySlot(HUNT))) {
      await ensureUnlocked(mutator, "puzzle_unlocked", slug);
    }

    // Mark all gates from the Illegal Search as completed
    const round = HUNT.rounds.find((r) => r.slug === "illegal_search");
    for (const gate of round?.gates ?? []) {
      await ensureUnlocked(mutator, "gate_completed", gate.id);
    }

    // Make sure all interactions show up (this is mostly for the benefit of the hub page)
    for (const slug of Object.keys(INTERACTIONS)) {
      await ensureUnlocked(mutator, "interaction_unlocked", slug);

      if (
        !log.some((e) => e.type === "interaction_completed" && e.slug === slug)
      ) {
        await mutator.appendLog({
          team_id: ARCHIVE_TEAM_ID,
          type: "interaction_completed",
          slug,
          data: {
            result: interactionResults[slug] ?? "",
          },
        });
      }
    }
  });

  resetNotificationHigHWaterMark(log);
  return log;
};

class PuzzleStateLogMutator {
  public maxId: number;
  public mutated = false;

  constructor(public log: PuzzleStateLogEntry[]) {
    this.maxId = Math.max(0, ...log.map((e) => e.id));
  }

  appendLog(append: DistributiveOmit<PuzzleStateLogEntry, "id" | "timestamp">) {
    const entry: PuzzleStateLogEntry = {
      ...append,
      id: ++this.maxId,
      timestamp: new Date(),
    };
    this.log.push(entry);
    this.mutated = true;
    return Promise.resolve();
  }
}

export const mutatePuzzleStateLog = async <T>(
  log: PuzzleStateLogEntry[],
  fn: (mutator: PuzzleStateLogMutator) => T | Promise<T>,
): Promise<T> => {
  const mutator = new PuzzleStateLogMutator(log);
  const ret = await fn(mutator);
  if (mutator.mutated) {
    puzzleStateLog.set(mutator.log);
  }
  return ret;
};

export const fetchPuzzleStateLog = () => {
  return puzzleStateLog.fetch();
};

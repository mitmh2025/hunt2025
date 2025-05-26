import {
  PuzzleStateIntermediate,
  TeamInfoIntermediate,
  TeamStateIntermediate,
} from "../../../src/api/logic";
import HUNT from "../../../src/huntdata";
import {
  type InternalActivityLogEntry,
  type TeamRegistrationLogEntry,
} from "../frontend_contract";

export const reduceTeamStateIntermediate = (
  log: InternalActivityLogEntry[],
) => {
  return log.reduce(
    (acc, entry) => acc.reduce(entry),
    new TeamStateIntermediate(HUNT),
  );
};

export const reducePuzzleStateIntermediate = (
  slug: string,
  log: InternalActivityLogEntry[],
) => {
  return log.reduce(
    (acc, entry) => acc.reduce(entry),
    new PuzzleStateIntermediate(slug),
  );
};

export const reduceTeamInfoIntermediate = (log: TeamRegistrationLogEntry[]) => {
  return log.reduce(
    (acc, entry) => acc.reduce(entry),
    new TeamInfoIntermediate(),
  );
};

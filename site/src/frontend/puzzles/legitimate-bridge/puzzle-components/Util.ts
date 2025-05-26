import PrefixedLocalStorage from "../../../utils/PrefixedLocalStorage";
import huntLocalStorage from "../../../utils/huntLocalStorage";
import { LOCAL_STORAGE_PREFIX } from "./PuzzleConstants";
import type {
  Group,
  MinimalGroup,
  MinimalPuzzle,
  MinimalSubgroup,
  Subgroup,
} from "./Typedefs";

export const puzzleStorage = new PrefixedLocalStorage(
  LOCAL_STORAGE_PREFIX,
  () => huntLocalStorage,
);

export function reduceSubgroupsById<TValue>(
  groups: (Group | MinimalGroup)[],
  subgroupMapper: (subgroup: MinimalSubgroup | Subgroup) => TValue,
): Record<string, TValue> {
  return groups
    .flatMap((group) => group.subgroups ?? [])
    .reduce<Record<string, TValue>>((acc, subgroup) => {
      acc[subgroup.uuid] = subgroupMapper(subgroup);
      return acc;
    }, {});
}

export function flattenGroup(group: Group | MinimalGroup): MinimalPuzzle[] {
  const flattenedGroup = [group.firstPuzzle as MinimalPuzzle];
  for (const subgroup of group.subgroups ?? []) {
    for (const puzzle of subgroup.puzzles) {
      flattenedGroup.push(puzzle);
    }
  }
  if (group.lastPuzzle) {
    flattenedGroup.push(group.lastPuzzle);
  }
  return flattenedGroup;
}

export function reduceGroupPuzzlesById<TValue>(
  groups: (Group | MinimalGroup)[],
  puzzleMapper: (puzzle: MinimalPuzzle) => TValue,
): Record<string, TValue> {
  return groups
    .flatMap((group) => flattenGroup(group))
    .reduce<Record<string, TValue>>((acc, puzzle) => {
      acc[puzzle.uuid] = puzzleMapper(puzzle);
      return acc;
    }, {});
}

export function getSolvedUuids(): Set<string> {
  return new Set(puzzleStorage.keys);
}

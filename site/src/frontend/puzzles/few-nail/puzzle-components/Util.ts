import { SPELLING_BEE_STORAGE } from "./Constants";

export function getGuessedUuids(): Set<string> {
  return new Set(SPELLING_BEE_STORAGE.keys);
}

export function getGuessesByUuid(): Record<string, string> {
  return Object.fromEntries(
    [...SPELLING_BEE_STORAGE.keys].map((key) => [
      key,
      SPELLING_BEE_STORAGE.getItem(key) ?? "",
    ]),
  );
}

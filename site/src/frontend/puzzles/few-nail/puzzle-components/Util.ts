import { LOCAL_STORAGE_PREFIX } from "./Constants";

export function getGuessedUuids(): Set<string> {
  const guessedUuids = new Set<string>();
  for (let i = 0; i < localStorage.length; i++) {
    const item = localStorage.key(i);
    if (item?.startsWith(LOCAL_STORAGE_PREFIX)) {
      guessedUuids.add(item.replace(LOCAL_STORAGE_PREFIX, ""));
    }
  }
  return guessedUuids;
}

export function getGuessesByUuid(): Record<string, string> {
  const guessesByUuid: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const item = localStorage.key(i);
    if (item?.startsWith(LOCAL_STORAGE_PREFIX)) {
      const cleanItem = item.replace(LOCAL_STORAGE_PREFIX, "");
      const value = localStorage.getItem(item) ?? "";
      guessesByUuid[cleanItem] = value;
    }
  }
  return guessesByUuid;
}

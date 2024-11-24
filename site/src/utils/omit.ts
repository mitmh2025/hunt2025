export function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const ret = { ...obj };
  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- we have explicit types in the function signature
    delete ret[key];
  }
  return ret;
}

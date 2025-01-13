// Fix a JSON field that has come from the database.
export function fixData(value: string | object): object {
  // SQLite returns json fields as strings, and the driver doesn't automatically parse them.
  if (typeof value === "string") {
    return JSON.parse(value) as object;
  }
  return value;
}

// Fix a timestamp that has come from the database.
export function fixTimestamp(value: string | Date): Date {
  if (typeof value === "string") {
    if (!value.endsWith("Z")) {
      // TODO: sqlite returns timestamps as "YYYY-MM-DD HH:MM:SS" in UTC, and the driver doesn't automatically turn them back into Date objects.
      return new Date(value + "Z");
    }
    // We may also have gotten a fixed-up string from the pubsub channel, where we also serialize
    // dates as strings.
    return new Date(value);
  }
  return value;
}

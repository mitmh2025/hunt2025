export function nextAcceptableSubmissionTime(timestamps: Date[]): Date {
  // Given `timestamps` of the previous incorrect guesses, returns the earliest
  // acceptable submission time.

  // The core logic: allow a maximum of N+1 guesses within any N^2-minute time window.
  // This boils down to:
  // at any instant, allow 1 guess
  // within 1 minute, allow 2 guesses maximum
  // within 4 minutes, allow 3 guesses maximum
  // within 9 minutes, allow 4 guesses
  // etc.

  if (timestamps.length <= 1) {
    return new Date(0);
  }

  const earliest_allowed = timestamps.map((stamp, i) => {
    const lookback = timestamps.length - i - 1;
    if (lookback < 0) {
      return stamp;
    }
    return new Date(stamp.getTime() + lookback * lookback * 60000);
  });

  // Compute max of allowed
  return earliest_allowed.reduce((acc, next) => {
    if (next > acc) {
      return next;
    }
    return acc;
  }, new Date(0));
}

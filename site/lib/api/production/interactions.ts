export function completeInteraction(): Promise<void> {
  // This implementation is only somewhat "production". After Mystery Hunt
  // ended, we changed the interaction pages to run entirely locally so that
  // people could replay them (#927). In production, that means that we don't
  // want anything to happen when an all-local interaction finishes. (And even
  // if inteng was still running, that would be correct, as inteng it self would
  // be responsible for monitoring state and completing the interaction.)
  //
  // We need a hook to trigger the interaction_completed activity log event in
  // archive mode, and using the @hunt_client abstraction was an easy way to
  // create behavior that varied between archive mode (want something to happen)
  // and production (don't want something to happen).
  return Promise.resolve();
}

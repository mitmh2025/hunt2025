// The amount of time after the interaction has been unlocked at which we will automatically start
// the interaction, whether users are ready or not.
export const INTERACTION_START_TIMEOUT_MSEC = 120 * 1000;

// How much time should we allow for propagation delay at each node in the interaction graph, so
// that we (ideally) don't cut off any audio lines before they finish playing?
export const PROPAGATION_DELAY_FUDGE_FACTOR_MSEC = 600;

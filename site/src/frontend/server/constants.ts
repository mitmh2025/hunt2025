// An allowlist of slugs that we should permit puzzle_state_log to be subscribed to directly for.
// If you're adding an entry to this allowlist, all the data you put in the DB for that slug will
// be readable by clients, so don't put anything sensitive/internal there.
export const PUZZLE_SLUGS_WITH_PUBLIC_STATE_LOG = [
  "and_now_a_puzzling_word_from_our_sponsors",
  "control_room",
  "estimation_dot_jpg",
  "what_do_they_call_you",
];

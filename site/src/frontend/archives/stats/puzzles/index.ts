import type React from "react";

export const PUZZLE_STATS: Record<string, () => Promise<React.ComponentType>> =
  {
    control_room: async () => (await import("./control_room")).default,
    songs_on_the_radio: async () =>
      (await import("./songs_on_the_radio")).default,
    the_shell_game: async () => (await import("./the_shell_game")).default,
    weirdo_threaded_doodads: async () =>
      (await import("./weirdo_threaded_doodads")).default,
    what_do_they_call_you: async () =>
      (await import("./what_do_they_call_you")).default,
  };

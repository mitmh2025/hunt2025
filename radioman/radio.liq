%include "lib.liq"

server.telnet()

STATION_BREAK_INTERVAL = 300.
QUIXOTIC_SHOE_INTERVAL = 300.
ICY_BOX_INTERVAL = 300.

# Tier 1 - Background Music
# Shuffle music files, ensure track has not repeated in the last N hours.
# TODO: Use playlog(persistency="./playlog") and check_next to ensure traks are not repeated.
# music/*
# background_music = replaygain(playlist.list(
#     [
#         "speak:first music track",
#         "speak:second music track",
#         "speak:third music track",
#     ],
#     loop = true,
#     mode = "randomize", # Shuffle list every time it loops
# ))
background_music = playlist.list(
    file.ls("./win3.0midi/", pattern="*.mp3", absolute=true),
    loop = true,
    mode = "randomize", # Shuffle list every time it loops
)

# Tier 2 - Station Break

# Tier 2a - Interlude
# Play audio associated with music file, if any ("That was $song")
# Otherwise play audio randomly from interlude/$phase/*
interlude = single("speak:Thanks for listening to 2 p i radio")

# Tier 2b - Scheduled announcements
# Play audio as requested by RPC at the next break
# TBD: Should this replace the station break or add to it?
# TBD: Should the announcements repeat?
scheduled_announcements = request.queue(id="scheduled_announcements")

# Tier 2c - Puzzle content
# quixotic-shoe: inject ads every 5m
quixotic_shoe = delay(QUIXOTIC_SHOE_INTERVAL, single("speak:quixotic shoe advertisement"))
# icy-box: inject weather reports every 5m
icy_box = delay(ICY_BOX_INTERVAL, single("speak:icy box weather forecast"))

# Tier 2d - Ad-hoc announcements
# Play audio as requested by RPC at the next break
# TBD: Speech synthesizer?
adhoc_announcements = request.queue()
adhoc_announcements.push.uri("speak:adhoc announcement 1")
adhoc_announcements.push.uri("speak:adhoc announcement 2")

# Tier 3 - Virtual interactions
# Interrupts background music
# Has its own background music
# TBD: Include speech or just background music?
in_interaction = interactive.bool("interaction", false)
virtual_interaction = source.available(track_sensitive=false, single("spy-suite.mp3"), in_interaction)

# Tier X - Celebration
# TBD: Included in stream or not?
celebration = blank()

last_break_time = ref(0.)
after_music = ref(false)
background_music.on_track(fun (_) -> after_music := true)
def station_break()
    let (do_break, chosen_interlude) = if adhoc_announcements.is_ready() or scheduled_announcements.is_ready() then
        (true, [adhoc_announcements, scheduled_announcements])
    else
        # TODO: Check if there's a song-specific interlude
        (time()-last_break_time() > STATION_BREAK_INTERVAL, [once(interlude)])
    end
    if do_break and after_music() then
        last_break_time := time()
        after_music := false
        [
            ...chosen_interlude,
            once(quixotic_shoe),
            once(icy_box),
        ]
    else
        []
    end
end

stream = fallback([
    virtual_interaction,
    fallback([
        sequence.dynamic(station_break),
        pred_or_skip(
            {not source.is_ready(virtual_interaction)},
            fade.on_skip(background_music),
        ),
    ])
])

final = add([stream, celebration])

output(final)
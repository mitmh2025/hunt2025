def piper_protocol(~rlog,~maxtime,arg) =
    [process.uri(extname="wav","echo #{process.quote(arg)} | piper -m $PIPER_VOICES/en/en_US/norman/medium/en_US-norman-medium.onnx -f $(output)")]
end
protocol.add("piper",piper_protocol,doc="Generate speech from text")

server.telnet()

# Tier 1 - Background Music
# Shuffle music files, ensure track has not repeated in the last N hours.
# TODO: Use playlog(persistency="./playlog") and check_next to ensure traks are not repeated.
# music/*
background_music = replaygain(playlist.list(
    [
        "piper:first music track",
        "piper:second music track",
        "piper:third music track",
    ],
    loop = true,
    mode = "randomize", # Shuffle list every time it loops
))

# Tier 2 - Station Break

# Tier 2a - Interlude
# Play audio associated with music file, if any ("That was $song")
# Otherwise play audio randomly from interlude/$phase/*
interlude = single("piper:Thanks for listening to 2 p i radio")

# Tier 2b - Scheduled announcements
# Play audio as requested by RPC at the next break
# TBD: Should this replace the station break or add to it?
# TBD: Should the announcements repeat?
scheduled_announcements = request.queue(id="scheduled_announcements")

# Tier 2c - Puzzle content
# quixotic-shoe: inject ads every 5m
quixotic_shoe = delay(300., single("piper:quixotic advertisement"))
# icy-box: inject weather reports every 5m
icy_box = delay(300., single("piper:Today in P I ville, the weather is 65 degrees and raining"))

puzzle_content = fallback([
    quixotic_shoe,
    icy_box
])

# Tier 2d - Ad-hoc announcements
# Play audio as requested by RPC at the next break
# TBD: Speech synthesizer?
adhoc_announcements = request.queue()
adhoc_announcements.push.uri("piper:adhoc announcement 1")
adhoc_announcements.push.uri("piper:adhoc announcement 2")

# sequence() will play up to one track from each source, so potentially we can put one adhoc announcement, one puzzle content, one scheduled announcement, and one interlude in a station break.
station_break = sequence([
    adhoc_announcements,
    puzzle_content,
    scheduled_announcements,
    interlude,
    source.fail()
])

# Tier 3 - Virtual interactions
# Interrupts background music
# Has its own background music
# TBD: Include speech or just background music?
in_interaction = interactive.bool("interaction", false)
virtual_interaction = source.available(track_sensitive=false, fade.out(single("spy-suite.mp3")), in_interaction)

# Tier X - Celebration
# TBD: Included in stream or not?
celebration = blank()

last_break_time = ref(-300.)
def insert_station_break(m)
    # m is metadata for the currently-playing song
    let (do_break, chosen_interlude) = if adhoc_announcements.is_ready() or scheduled_announcements.is_ready() then
        (true, [adhoc_announcements, scheduled_announcements])
    else
        # TODO: Check if there's a song-specific interlude
        (time()-last_break_time() > 30., [once(interlude)])
    end
    if do_break then
        last_break_time := time()
        sequence(single_track = false, [
            ...chosen_interlude,
            once(quixotic_shoe),
            once(icy_box),
        ])
    else
        source.fail()
    end
end

stream = fallback([
    virtual_interaction,
    append(background_music, insert_station_break)
])

final = add([stream, celebration])

output(final)
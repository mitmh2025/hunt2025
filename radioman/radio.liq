%include "lib.liq"

server.telnet()

http_port = string.to_int(environment.get("HTTP_PORT"), default=8000)

harbor.http.register(
    port=http_port,
    method="GET",
    "/healthz",
    fun (_, response) -> begin
        response.content_type("text/plain")
        response.data("ok")
    end
)

state_directory = environment.get("STATE_DIRECTORY", default=".")
state_path = "#{state_directory}/team_state.json"

team_state = ref(
    try
        let json.parse ( v : {
            quixotic_shoe_enabled: bool,
            icy_box_enabled: bool,
            interaction: bool,
        }) = file.contents(state_path)
        v
    catch err do
        log.important("failed to load cached state: #{err}")
        {
            quixotic_shoe_enabled=false,
            icy_box_enabled=false,
            interaction=false,
        }
    end
)

on_shutdown(fun () -> file.write(data=json.stringify(team_state()), state_path))

harbor.http.register(
    port=http_port,
    method="POST",
    "/setTeamState",
    fun (request, response) -> begin
        let json.parse v = request.body()
        team_state := v
        response.data("ok")
    end
)

ICY_BOX_INTERVAL = 20. * 60.

# Tier 1 - Background Music
# Shuffle music files, ensure track has not repeated in the last N hours.
# TODO: Use playlog(persistency="./playlog") and check_next to ensure tracks are not repeated.
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
l = playlog(persistency="playlog", hash=fun (m) -> m["initial_uri"])
def check(r)
    m = request.metadata(r)
    if l.last(m) < 3600. then
        log.info("Rejecting #{m} (played #{l.last(m)}s ago).")
        false
    else
        l.add(m)
        true
    end
end

def randomizer(
    ~pattern=null(),
    dir,
) =
    playlist = ref([])
    fun () -> begin
        if playlist() == [] then
            playlist := list.shuffle(
                file.ls(dir, pattern=pattern, absolute=true)
            )
        end
        if playlist() == [] then
            error.raise(
                error.invalid,
                "empty directory passed to randomizer",
            )
        else
            pl = playlist()
            playlist := list.tl(pl)
            list.hd(pl)
        end
    end
end
background_music_next = randomizer(environment.get("MUSIC_DIR"), pattern="*.mp3")

# Tier 2 - Station break

# At the top of each hour after hunt has started, play a station ID and possibly an event schedule or confidential.

# At specific times, play a fixed message:
# Friday $custom release + station ID
# Friday 18:45 event-upcoming-a-fifteen
# Saturday 00:30 radio-last-call-friday
# Saturday 00:45 radio-shutdown-friday
# Saturday 14:45 event-upcoming-c-fifteen
# Saturday 19:45 event-upcoming-d-fifteen
# Sunday 00:30 radio-last-call-saturday
# Sunday 00:45 radio-shutdown-saturday
# Monday 00:30 radio-last-call-sunday
# Monday 00:45 radio-shutdown-sunday

# Tier 2c - Puzzle content
# quixotic-shoe: inject ads after every song
quixotic_shoe_enabled = {team_state().quixotic_shoe_enabled}
quixotic_shoe_dir = environment.get("QUIXOTIC_SHOE_DIR")
quixotic_shoe_handoff_next = randomizer("#{quixotic_shoe_dir}/handoff", pattern="*.ogg")
quixotic_shoe_content_next = randomizer("#{quixotic_shoe_dir}/content", pattern="*.ogg")

# icy-box: inject weather reports every 20m
icy_box_enabled = {team_state().icy_box_enabled}
last_icy_box_time = ref(0.)
icy_box_dir = environment.get("ICY_BOX_DIR")
icy_box_handoff_next = randomizer("#{icy_box_dir}/handoff", pattern="*.ogg")
icy_box_content_next = randomizer("#{icy_box_dir}/content", pattern="*.ogg")

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
in_interaction = {team_state().interaction}
virtual_interaction = source.available(track_sensitive=false, single("spy-suite.mp3"), in_interaction)

# Tier X - Celebration
# TBD: Included in stream or not?
celebration = blank()

def regular_stream_next() =
    print("regular_stream_next is called")
    if in_interaction() then
        []
    else
        interrupt = if
            icy_box_enabled()
            and (time()-last_icy_box_time() > ICY_BOX_INTERVAL)
        then
            last_icy_box_time := time()
            [
                request.create(icy_box_handoff_next()),
                request.create(icy_box_content_next()),
            ]
        elsif quixotic_shoe_enabled() then
            [
                request.create(quixotic_shoe_handoff_next()),
                request.create(quixotic_shoe_content_next()),
            ]
        else
            []
        end
        music = request.create(background_music_next())
        [...interrupt, music]
    end
end

regular_stream = request.extending_queue(
    id="regular_stream",
    native=true,
    regular_stream_next,
)

regular_stream.on_metadata(fun (m) -> print("on_metadata #{m}"))
regular_stream.on_track(fun (m) -> print("on_track #{m}"))

# last_break_time = ref(0.)
# after_music = ref(false)
# background_music.on_track(fun (_) -> after_music := true)
# def station_break()
#     let (do_break, chosen_interlude) = if adhoc_announcements.is_ready() then
#         (true, [adhoc_announcements])
#     else
#         # TODO: Check if there's a song-specific interlude
#         (time()-last_break_time() > STATION_BREAK_INTERVAL, [once(interlude)])
#     end
#     if do_break and after_music() then
#         last_break_time := time()
#         after_music := false
#         [
#             ...chosen_interlude,
#             once(quixotic_shoe),
#             once(icy_box),
#         ]
#     else
#         []
#     end
# end

stream = fallback(
    id="stream",
    [
        virtual_interaction,
        pred_or_skip(
            {not source.is_ready(virtual_interaction)},
            fade.on_skip(regular_stream),
        ),
    ]
)

final = add([stream, celebration])

output(final)
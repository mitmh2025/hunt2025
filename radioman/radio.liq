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

# Friday, January 17, 2025 12:00:00 PM GMT-05:00
schedule_start_time = string.to_float(
    environment.get("SCHEDULE_START_EPOCH"),
    default=1737133200.,
)

state_directory = environment.get("STATE_DIRECTORY", default=".")
team_state_path = "#{state_directory}/team_state.json"

team_state = ref(
    try
        let json.parse ( v : {
            team_id: int,
            epoch: int,
            quixotic_shoe_enabled: bool,
            icy_box_enabled: bool,
            interaction: bool,
        }) = file.contents(team_state_path)
        v
    catch err do
        log.important("failed to load cached team state: #{err}")
        {
            team_id=string.to_int(environment.get("TEAM_ID"), default=0),
            epoch=0,
            quixotic_shoe_enabled=false,
            icy_box_enabled=false,
            interaction=false,
        }
    end
)

on_shutdown(fun () -> file.write(data=json.stringify(team_state()), team_state_path))

play_state_path = "#{state_directory}/play_state.json"

play_state = ref(
    try
        let json.parse ( v : {
            last_scheduled_hour: float,
        }) = file.contents(team_state_path)
        v
    catch err do
        log.important("failed to load cached play state: #{err}")
        {
            last_scheduled_hour=-1.,
        }
    end
)

harbor.http.register(
    port=http_port,
    method="POST",
    "/setTeamState",
    fun (request, response) -> begin
        try
            let json.parse v = request.body()
            if team_state().team_id != 0 and v.team_id != team_state().team_id then
                response.status_code(400)
                response.data("wrong team, expecting #{team_state().team_id}")
            elsif v.epoch >= team_state().epoch then
                team_state := v
                response.data("ok")
            else
                response.status_code(412) # Stale precondition
                response.data("stale epoch, already have #{team_state().epoch}")
            end
        catch err do
            response.status_code(400)
            response.data("invalid team state: #{err}")
        end
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

announcement_schedule = [
    (0., ["radio-kickoff"]), # 60 minute block of pre-rendered programming
    # (1+epsilon, ["radio-release", "radio-station-id-?"])
    (2., ["radio-station-id-?"]),
    (3., ["radio-station-id-?", "radio-event-schedule-a"]),
    (4., ["radio-station-id-?", "confidential"]),
    (5., ["radio-station-id-?", "radio-event-schedule-a"]),
    (6., ["radio-station-id-?", "radio-event-upcoming-a-hour"]),
    (6.75, ["radio-event-upcoming-a-fifteen"]),
    (7., ["radio-station-id-?"]),
    (8., ["radio-station-id-?", "confidential"]),
    (9., ["radio-station-id-?"]),
    (10., ["radio-station-id-?"]),
    (11., ["radio-station-id-?"]),
    (12., ["radio-station-id-?", "confidential"]),
    (12.5, ["radio-last-call-friday"]),
    (12.75, ["radio-shutdown-friday"]),
    (13., ["radio-station-id-?"]),
    (14., ["radio-station-id-?"]),
    (15., ["radio-station-id-?"]),
    (16., ["radio-station-id-?"]),
    (17., ["radio-station-id-?"]),
    (18., ["radio-station-id-?", "radio-morning-saturday", "radio-event-schedule-b"]),
    (19., ["radio-station-id-?"]),
    (20., ["radio-station-id-?", "radio-event-schedule-b", "confidential"]),
    (21., ["radio-station-id-?", "radio-event-upcoming-b-hour"]), # runs at team-specific time
    (21.75,	["radio-event-upcoming-b-fifteen"]), # runs at team-specific time
    (22., ["radio-station-id-?"]),
    (23., ["radio-station-id-?", "radio-event-schedule-c"]),
    (24., ["radio-station-id-?", "confidential"]),
    (25., ["radio-station-id-?", "radio-event-schedule-c"]),
    (26., ["radio-station-id-?", "radio-event-upcoming-c-hour"]),
    (26.75, ["radio-event-upcoming-c-fifteen"]),
    (27., ["radio-station-id-?"]),
    (28., ["radio-station-id-?", "radio-event-schedule-d", "confidential"]),
    (29., ["radio-station-id-?"]),
    (30., ["radio-station-id-?", "radio-event-schedule-d"]),
    (31., ["radio-station-id-?", "radio-event-upcoming-d-hour"]),
    (31.75, ["radio-event-upcoming-d-fifteen"]),
    (32., ["radio-station-id-?", "confidential"]),
    (33., ["radio-station-id-?"]),
    (34., ["radio-station-id-?"]),
    (35., ["radio-station-id-?"]),
    (36., ["radio-station-id-?", "confidential"]),
    (36.5, ["radio-last-call-saturday"]),
    (36.75, ["radio-shutdown-saturday"]),
    (37., ["radio-station-id-?"]),
    (38., ["radio-station-id-?"]),
    (39., ["radio-station-id-?"]),
    (40., ["radio-station-id-?"]),
    (41., ["radio-station-id-?"]),
    (42., ["radio-station-id-?", "radio-morning-sunday"]),
    (43., ["radio-station-id-?"]),
    (44., ["radio-station-id-?", "confidential"]),
    (45., ["radio-station-id-?"]),
    (46., ["radio-station-id-?"]),
    (47., ["radio-station-id-?"]),
    (48., ["radio-station-id-?", "confidential"]),
    (49., ["radio-station-id-?"]),
    (50., ["radio-station-id-?"]),
    (51., ["radio-station-id-?"]),
    (52., ["radio-station-id-?", "confidential"]),
    (53., ["radio-station-id-?"]),
    (54., ["radio-station-id-?"]),
    (55., ["radio-station-id-?"]),
    (56., ["radio-station-id-?", "confidential"]),
    (57., ["radio-station-id-?"]),
    (58., ["radio-station-id-?"]),
    (59., ["radio-station-id-?"]),
    (60., ["radio-station-id-?", "confidential"]),
    (60.5, ["radio-last-call-sunday"]),
    (60.75, ["radio-last-call-sunday"]),
    (61., ["radio-station-id-?"]),
    (62., ["radio-station-id-?"]),
    (63., ["radio-station-id-?"]),
    (64., ["radio-station-id-?"]),
    (65., ["radio-station-id-?"]),
    (66., ["radio-station-id-?", "radio-morning-monday"]),
    (67., ["radio-station-id-?"]),
    (68., ["radio-station-id-?", "confidential"]),
    (69., ["radio-station-id-?"]),
    (70., ["radio-station-id-?"]),
]

def next_scheduled_announcement() =
    list.find(fun (e) -> begin
        let (t, c) = e
        t > play_state().last_scheduled_hour
    end, announcement_schedule)
end

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

def calculate_confidential() =
    # radio-handoff-confidential-[a-f]
    # radio-bumper-confidential
    # radio-confidential-intro
    # if interactions_completed.has(["the_crime_scene", "the_safehouse"])
    #  radio-confidential-partial-c
    # elsif interactions_completed.has(["the_crime_scene"])
    #  radio-confidential-partial-b
    # else
    #  radio-confidential-partial-a
    # end
    # any si -> radio-confidential-si-intro
    # confront_katrina -> radio-confidential-si-katrina
    # confront_gladys -> radio-confidential-si-gladys
    # confront_papa -> radio-confidential-si-papa
    # confront_carter -> radio-confidential-si-ferdinand
    # radio-confidential-outro
    []
end

queue = ref(request.extending_queue(fun () -> []))

def regular_stream_next() =
    print("regular_stream_next is called")
    print("current request: #{queue().current()}")
    print("current request metadata: #{null.map(request.metadata,queue().current())}")
    print("last metadata: #{queue().last_metadata()}")
    print("queue: #{queue().queue()}")
    print("last queued metadata: #{queue().last_queued_metadata()}")
    last_metadata = queue().last_queued_metadata()

    fill_time = time() + queue().remaining()
    hunt_elapsed = fill_time - schedule_start_time
    hunt_elapsed_hours = hunt_elapsed / 3600.

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
queue := regular_stream

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
            id="regular_stream_pred_or_skip",
            {not source.is_ready(virtual_interaction)},
            fade.on_skip(regular_stream),
        ),
    ]
)

final = add([stream, celebration])

output_url = environment.get("OUTPUT_URL")

if output_url == "" then
    output(final)
else
    log("Final output_url #{output_url}")
    output.url(
        url=output_url,
        # %opus(bitrate=64, channels=1, samplerate=48000),
        %ffmpeg(
            format="rtsp",
            %audio(samplerate=48000, channels=1, codec="libopus", b="64k", packet_loss=1, fec=1),
        ),
        mksafe(final)
    )
end

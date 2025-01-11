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
            completed_interactions: [string]
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
            completed_interactions=[],
        }
    end
)

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

def save_state() =
    file.write(data=json.stringify(team_state()), team_state_path)
    file.write(data=json.stringify(play_state()), play_state_path)
end
thread.run(save_state, delay=30., every=30.)
on_shutdown(save_state)

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

background_music_next = randomizer(environment.get("MUSIC_DIR"), pattern="*.mp3")

# Tier 2 - Station break

# At the top of each hour after hunt has started, play a station ID and possibly an event schedule or confidential.

let json.parse (announcement_schedule : [{
    hour: float,
    preempt: bool,
    music_outro: bool,
    overnight: bool,
    sid_bumper: bool,
    sid: bool,
    messages: [string],
    confidential: bool,
    weather: bool,
    music_intro: bool,
}]) = file.contents(environment.get("SCHEDULE_JSON", default="schedule.json"))

def get_scheduled_announcement(t) =
    past_announcements = list.filter(
        fun (e) -> begin
            e.hour <= t
        end, announcement_schedule
    )
    try
        list.last(past_announcements)
    catch err do
        ignore(err)
        null()
    end
end

announcements_dir = environment.get("ANNOUNCEMENTS_DIR")

music_intro_next = randomizer(announcements_dir, pattern="radio-music-intro-*.ogg")
music_outro_next = randomizer(announcements_dir, pattern="radio-music-outro-*.ogg")
confidential_handoff_next = randomizer(announcements_dir, pattern="radio-handoff-confidential-*.ogg")
station_id_next = randomizer(announcements_dir, pattern="radio-station-id-*.ogg")
bumper_sid = request.create("#{announcements_dir}/radio-bumper-station-id.ogg", persistent=true)

# Tier 2c - Puzzle content
# quixotic-shoe: inject ads after every song
quixotic_shoe_enabled = {team_state().quixotic_shoe_enabled}
quixotic_shoe_dir = environment.get("QUIXOTIC_SHOE_DIR")
quixotic_shoe_handoff_next = randomizer("#{quixotic_shoe_dir}/handoff", pattern="*.ogg")
quixotic_shoe_content_next = nexter("#{quixotic_shoe_dir}/content", pattern="*.ogg")

# icy-box: inject weather reports every 20m
icy_box_enabled = {team_state().icy_box_enabled}
last_icy_box_time = ref(0.)
icy_box_dir = environment.get("ICY_BOX_DIR")
icy_box_handoff_next = randomizer("#{icy_box_dir}/handoff", pattern="*.ogg")
icy_box_content_next = nexter("#{icy_box_dir}/content", pattern="*.ogg")
bumper_icy_box = request.create("#{announcements_dir}/radio-bumper-weather.ogg", persistent=true)


# Tier 2d - Ad-hoc announcements
# Play audio as requested by RPC at the next break
# TBD: Speech synthesizer?

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
    def did(name) =
        list.mem(name, team_state().completed_interactions)
    end
    si = list.flatten([
        if did("confront_katrina") then ["confidential-si-katrina"] else [] end,
        if did("confront_gladys") then ["confidential-si-gladys"] else [] end,
        if did("confront_papa") then ["confidential-si-papa"] else [] end,
        if did("confront_carter") then ["confidential-si-ferdinand"] else [] end,
    ])
    # # radio-handoff-confidential-[a-f] (already played)
    list.map(fun (n) -> request.create("#{announcements_dir}/radio-#{n}.ogg"), list.flatten([
        ["bumper-confidential"],
        ["confidential-intro"],
        if did("the_vault") then ["confidential-complete"]
        else list.flatten([
            if did("the_safehouse") then ["confidential-partial-c"]
            elsif did("the_crime_scene") then ["confidential-partial-b"]
            else ["confidential-partial-a"]
            end,
            if si != [] then [
                "confidential-si-intro",
                ...si
            ] else [] end,
        ]) end,
        ["confidential-outro"],
    ]))
end

queue = ref(request.extending_queue(fun () -> []))

def regular_stream_next() =
    print("regular_stream_next is called")
    print("current request: #{queue().current()}")
    print("current request metadata: #{null.map(request.metadata,queue().current())}")
    print("last metadata: #{queue().last_metadata()}")
    print("queue: #{queue().queue()}")
    print("last queued metadata: #{queue().last_queued_metadata()}")
    last_metadata = null.default(queue().last_queued_metadata(), {[]})

    fill_time = time() + queue().queue_remaining()
    hunt_elapsed = fill_time - schedule_start_time
    hunt_elapsed_hours = hunt_elapsed / 3600.

    if in_interaction() then
        []
    else
        scheduled_announcement = get_scheduled_announcement(hunt_elapsed_hours)
        after_confidential = {null.case(scheduled_announcement, {[]}, fun (s) -> list.flatten([
            if s.weather and icy_box_enabled() then
                last_icy_box_time := fill_time
                [
                    icy_box_handoff_next.request(),
                    bumper_icy_box,
                    icy_box_content_next.request(),
                ]
            else [] end,
            if s.music_intro and random.bool() then [
                music_intro_next.request()
            ] else [] end,
        ]))}
        partial_confidential = ref(false)
        confidential_tail = last_metadata["confidential"] == "handoff"
        interrupt =
            if confidential_tail then
                list.flatten([
                    calculate_confidential(),
                    after_confidential(),
                ])
            elsif null.defined(scheduled_announcement) and null.get(scheduled_announcement).hour != play_state().last_scheduled_hour then
                s = null.get(scheduled_announcement)
                log("Playing scheduled announcement #{s}")
                partial_confidential := true
                if s.overnight then
                    # The only thing that plays overnight is weather or bumper
                    if icy_box_enabled() then
                        last_icy_box_time := fill_time
                        [
                            bumper_icy_box,
                            icy_box_content_next.request(),
                        ]
                    else
                        [
                            bumper_sid,
                        ]
                    end
                else
                    list.flatten([
                        if s.music_outro then [music_outro_next.request()] else [] end,
                        if s.sid_bumper then [bumper_sid] else [] end,
                        if s.sid then [station_id_next.request()] else [] end,
                        list.map(fun (n) -> request.create("#{announcements_dir}/radio-#{n}.ogg"), s.messages),
                        if s.confidential then [request.create("annotate:confidential=handoff:#{confidential_handoff_next()}")] else
                            after_confidential()
                        end,
                    ])
                end
            elsif
                icy_box_enabled()
                and (time()-last_icy_box_time() > ICY_BOX_INTERVAL)
            then
                last_icy_box_time := time()
                [
                    request.create(icy_box_handoff_next()),
                    bumper_icy_box,
                    request.create(icy_box_content_next()),
                ]
            elsif quixotic_shoe_enabled() then
                [
                    request.create(quixotic_shoe_handoff_next()),
                    request.create(quixotic_shoe_content_next()),
                    # 25% chance of music-intro
                ]
            else
                []
            end
        if partial_confidential() then
            interrupt
        else
            music_file = background_music_next()
            music_uri = null.case(
                scheduled_announcement,
                {music_file},
                fun (s) -> "annotate:last_scheduled_hour=#{s.hour}:#{music_file}",
            )
            music = request.create(music_uri)
            [...interrupt, music]
        end
    end
end

regular_stream = request.extending_queue(
    id="regular_stream",
    native=true,
    regular_stream_next,
)
queue := regular_stream

regular_stream.on_metadata(fun (m) -> begin
    print("on_metadata #{m}")
    if m["last_scheduled_hour"] != "" then
        print("got new hour")
        play_state := {
            ...play_state(),
            last_scheduled_hour=string.to_float(m["last_scheduled_hour"]),
        }
    end
end)
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
            fade.on_skip(duration=3., replaygain(regular_stream)),
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

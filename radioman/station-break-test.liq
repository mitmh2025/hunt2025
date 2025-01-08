settings.frame.audio.samplerate := 48000
settings.frame.audio.channels := 1

background_music = replaygain(playlist(
    id="background_music",
    environment.get("MUSIC_DIR"),
    loop = true,
    mode = "randomize", # Shuffle list every time it loops
))

break_dir = environment.get("BREAK_DIR")

final = if break_dir != "" then
    break_content = playlist(
        id="break",
        environment.get("BREAK_DIR"),
        loop = true,
        mode = "normal", # Play in order
    )

    rotate([
        background_music,
        break_content,
    ])
else
    background_music
end

output_url = environment.get("OUTPUT_URL")
api_base_url = environment.get("API_BASE_URL")
frontend_api_secret = environment.get("FRONTEND_API_SECRET")
output_url = if frontend_api_secret != "" and output_url != "" then
    jwtResp = http.post("#{api_base_url}/admin/mintToken",
        data=json.stringify({
            media=[{
                action="publish",
                path="",
            }]
        }),
        headers=[
            ("Content-type", "application/json"),
            ("Authorization", "frontend-auth #{frontend_api_secret}"),
        ],
    )
    let json.parse (token : string) = jwtResp
    "#{output_url}?jwt=#{token}"
else
    output_url
end

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

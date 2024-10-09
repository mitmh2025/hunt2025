settings.frame.audio.samplerate := 48000
settings.frame.audio.channels := 1

background_music = replaygain(playlist(
    id="background_music",
    environment.get("MUSIC_DIR"),
    loop = true,
    mode = "randomize", # Shuffle list every time it loops
))

final = background_music

break_dir = environment.get("BREAK_DIR")

if break_dir != "" then
    break_content = playlist(
        id="break",
        environment.get("BREAK_DIR"),
        loop = true,
        mode = "normal", # Play in order
    )

    final = rotate([
        background_music,
        break_content,
    ])
end

output_url=environment.get("OUTPUT_URL")
if output_url == "" then
    output(final)
else
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

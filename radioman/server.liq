if getopt("-h") == "1" then
  print("-m: music directory (required)")
  exit(0)
end

music_dir = getopt(default=".", "-m")
if music_dir == "." or music_dir == "0" then
  print("music directory is required")
  exit(1)
end

trigger_announcement = predicate.signal()
server.register("trigger_announcement", fun (_) -> begin
  trigger_announcement.signal()
  "Done!"
end)
announcement = single("Muppet News.mp3")

music = playlist(id="music", music_dir)

stream = fallback(track_sensitive=false, [
  source.available(track_sensitive=true, announcement, trigger_announcement),
  mksafe(music)
])

output.url(
  url="rtp://localhost:1235?buffer_size=8192",
  %ffmpeg(
    format="rtp",
    %audio(samplerate=48000, codec="libopus", b="64k"),
  ),
  stream
)
#  %opus(samplerate=48000, bitrate=128, mono, application="restricted_lowdelay", max_bandwidth="medium_band", complexity=0),
# output.harbor(
#  %mp3(samplerate=24000, bitrate=64, stereo=false),
#  burst=1824,
#  chunk=304,
#  mount="/radio",
#  password="hackme",
#  stream,
# )

server.harbor(port=8001)
interactive.harbor(port=8001)

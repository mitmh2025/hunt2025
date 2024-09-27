%include "../lib.liq"

music = playlist.list(
    file.ls("./win3.0midi/", pattern="*.mp3", absolute=true),
    loop = true,
    mode = "randomize", # Shuffle list every time it loops
)

s = skipper(
    every=15.,
    fade.on_skip(music)
)
s.on_track(fun (t) -> print("on_track #{t}"))

output(s)

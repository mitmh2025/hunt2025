%include "../lib.liq"

music = playlist.list(
    file.ls("./win3.0midi/", pattern="*.mp3", absolute=true),
    loop = true,
    mode = "randomize", # Shuffle list every time it loops
)

s = fallback(track_sensitive=false, [
    pred_or_skip(
        {int_of_float(time() / 10.) mod 2 == 1},
        fade.on_skip(music),
    ),
    blank(),
])

s.on_track(fun (t) -> print("on_track #{t}"))

output(s)

PIPER_VOICES = environment.get("PIPER_VOICES")
if PIPER_VOICES != "" then
    def piper_protocol(~rlog,~maxtime,arg) =
        [process.uri(extname="wav","echo #{process.quote(arg)} | piper -m $PIPER_VOICES/en/en_US/norman/medium/en_US-norman-medium.onnx -f $(output)")]
    end
    protocol.add("speak",piper_protocol,doc="Generate speech from text")
else
    # Use the built-in say: protocol if piper is unavailable
    protocol.add("speak",fun (~rlog,~maxtime,arg) -> ["say:#{arg}"])
end

# Fade out when skip() is called
# @param ~id Force the value of the source ID.
# @param ~duration Duration of the fading.
def fade.on_skip(
    ~id="fade.on_skip",
    ~duration = 5.,
    s
) =
    def log(x) =
        log(label=source.id(s), level=4, x)
    end

    fn = ref(fun () -> 1.)

    def apply() =
        fn = fn()
        fn()
    end
    def stop_fade(_) =
        fn := fun () -> 1.
    end
    def skip() =
        remaining = source.remaining(s)
        duration = if remaining < duration then remaining else duration end
        log("Skip requested, starting fade for #{duration}s")
        fn := mkfade(
            duration=duration,
            start=1.,
            stop=0.,
            type="exp",
            s,
            on_done={source.skip(s)},
        )
    end

    s = source.on_track(s, stop_fade)

    fade.scale(id=id, apply, s).{skip=skip}
end

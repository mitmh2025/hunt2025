def protocol_return(u) =
%ifversion >= 2.3
    u
%else
    [u]
%endif
end
PIPER_VOICES = environment.get("PIPER_VOICES")
if PIPER_VOICES != "" then
    def piper_protocol(~rlog=_,~maxtime=_,arg) =
        protocol_return(process.uri(extname="wav","echo #{process.quote(arg)} | piper -m $PIPER_VOICES/en/en_US/norman/medium/en_US-norman-medium.onnx -f $(output)"))
    end
    protocol.add("speak",piper_protocol,doc="Generate speech from text")
else
    # Use the built-in say: protocol if piper is unavailable
    protocol.add("speak",fun (~rlog=_,~maxtime=_,arg) -> protocol_return("say:#{arg}"))
end

# Fade out when skip() is called
# @param ~id Force the value of the source ID.
# @param ~duration Duration of the fading.
def fade.on_skip(
    ~id="fade.on_skip",
    ~duration = 5.,
    (s : source_methods),
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
            on_done=s.skip,
        )
    end

    s = source.on_track(s, stop_fade)

    fade.scale(id=id, apply, s).{skip=skip}
end

# Like source.available(), but instead of immediately making the source unavailable, it will call s.skip() and wait for the current track to finish when the predicate becomes false.
# @param ~id Force the value of the source ID.
def pred_or_skip(
    ~id="pred_or_skip",
    p,
    s,
) =
    last_p = ref(false)
    skipping = ref(false)
    def check() =
        new_p = p()
        if new_p != last_p() then
            last_p := new_p
            if not new_p then
                skipping := true
                s.skip()
            end
        end
        res = new_p or skipping()
        res
    end
    def stop_skipping(_) =
        skipping := false
    end

    s = source.on_track((s : source), stop_skipping)

    switch(id=id, track_sensitive=false, [
        (check, s),
    ])
end

# Will call the fn and play the returned list as a sequence until all the sources are unavailable
def sequence.dynamic(
    ~id="sequence.dynamic",
    fn,
) =
    ready = ref(false)
    src = ref(source.fail())

    def next() =
        if not ready() then
            srcs = fn()
            src := fallback([
                sequence(srcs),
                source.available(blank(), {ready := false; not list.is_empty(srcs)}),
            ])
            ready := true
        end
        src()
    end

    source.dynamic(id=id, track_sensitive=false, next).{
        is_ready = {ready() and source.is_ready(src())},
        reset = {ready := false; src := source.fail();}
    }
end

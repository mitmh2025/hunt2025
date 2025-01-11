settings.init.allow_root := true

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
        skipped = ref(false)
        def actual_skip() =
            if not skipped() then
                skipped := true
                s.skip()
            end
        end
        fn := mkfade(
            duration=duration,
            start=1.,
            stop=0.,
            type="exp",
            s,
            on_done=actual_skip,
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

def request.extending_queue(
    ~id=null(),
    ~prefetch=null(),
    ~native=false,
    ~timeout=null(),
    f
) =
    ignore(native)
    id = string.id.default(default="request.extending_queue", id)
    initial_queue = ref([])
    queue = ref([])
    fetch = ref(fun () -> true)
    started = ref(false)

    def next() =
        if
            queue() == []
        then
            queue := f()
        end
        if
            queue() != []
        then
            let [r, ...q] = queue()
            queue := q
            (r : request)
        else
            null()
        end
    end
    default =
        fun () ->
            request.dynamic(
                id=id,
                prefetch=prefetch,
                timeout=timeout,
                next
            )

    s =
%ifdef native
        if
            native
        then
            stdlib_native.request.dynamic(id=id, timeout=timeout, next)
        else
            default()
        end
%else
        default()
%endif

    def set_queue(q) =
        if started() then queue := q else initial_queue := q end
        s.set_queue([])
    end

    def get_queue() =
        [...s.queue(), ...initial_queue(), ...queue()]
    end

    def get_last_queued_metadata() =
        queue = get_queue()
        if queue != [] then
            request.metadata(list.last(queue))
        else
            s.last_metadata()
        end
    end

    def get_queue_remaining() =
        queue = get_queue()
        s.remaining() + list.fold(
            fun (a, b) -> a + null.default(request.duration(request.filename(b)), {0.}),
            0.,
            queue
        )
    end

    s =
        s.{
            length={list.length(queue()) + list.length(s.queue())},
            set_queue=set_queue,
            queue=get_queue,
            last_queued_metadata=get_last_queued_metadata,
            queue_remaining=get_queue_remaining,
        }

    s.on_wake_up(
        fun () ->
            begin
                started := true
                s.set_queue(initial_queue())
                initial_queue := []
            end
    )

    source.set_name(s, "request.extending_queue")
    fetch := s.fetch

    def show_queue(_) =
        queue = s.queue()
        string.concat(
            separator=
                " ",
            list.map(fun (r) -> string(request.id(r)), queue)
        )
    end

    s.register_command(
        description=
            "Display current queue content.",
        usage="queue",
        "queue",
        show_queue
    )
    s
end

def nexter(
    ~pattern=null(),
    ~random=false,
    dir,
) =
    playlist = ref([])
    f = fun () -> begin
        if playlist() == [] then
            playlist := file.ls(dir, pattern=pattern, absolute=true, sorted=true)
            if random then
                playlist := list.shuffle(playlist())
            end
        end
        if playlist() == [] then
            error.raise(
                error.invalid,
                "empty directory passed to nexter",
            )
        else
            pl = playlist()
            playlist := list.tl(pl)
            list.hd(pl)
        end
    end
    f.{
        request={request.create(f())},
    }
end

def randomizer(
    ~pattern=null(),
    dir,
) =
    nexter(pattern=pattern, dir)
end

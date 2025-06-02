import { useEffect, useRef, useState } from "react";
import { styled, css } from "styled-components";
import renderRoot from "../../../utils/renderRoot";
import { Alert } from "../../components/StyledUI";
import { deviceMax } from "../../utils/breakpoints";

// Icons (except the repeat sign) from the Lucide project, used under the ISC license. https://lucide.dev/license

const PlaySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    preserveAspectRatio="xMidYMid meet"
    style={{ height: "100%", width: "100%" }}
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const PauseSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    preserveAspectRatio="xMidYMid meet"
    style={{ height: "100%", width: "100%" }}
  >
    <rect x="14" y="4" width="4" height="16" rx="1" />
    <rect x="6" y="4" width="4" height="16" rx="1" />
  </svg>
);

const VolumeSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    preserveAspectRatio="xMidYMid meet"
    style={{ height: "100%", width: "100%" }}
  >
    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
    <path d="M16 9a5 5 0 0 1 0 6" />
    <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
  </svg>
);

const MuteSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    preserveAspectRatio="xMidYMid meet"
    style={{ height: "100%", width: "100%" }}
  >
    <path d="M16 9a5 5 0 0 1 .95 2.293" />
    <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
    <path d="m2 2 20 20" />
    <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" />
    <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
  </svg>
);

const RepeatSVG = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    width="12"
    height="24"
    version="1.1"
    viewBox="0 0 12 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="none"
    preserveAspectRatio="xMidYMid meet"
    style={{ height: "100%", width: "100%", ...style }}
  >
    <rect x="0" y="0" width="3" height="24" />
    <rect x="5.5" y="0" width="1" height="24" />
    <circle cx="9" cy="8" r="1.5" />
    <circle cx="9" cy="16" r="1.5" />
  </svg>
);

const PlayerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Player = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  background: var(--gray-100);
  border: 1px solid var(--gray-300);
  border-radius: 1.75rem;
  padding-inline: 1rem;
  height: 3.5rem;
  width: 100%;
  box-sizing: border-box;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0;
  border-radius: 1.5rem;
  margin-inline: -0.5rem;

  &:hover {
    background: var(--gray-200);
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  height: 100%;
  padding: 0.5rem;
`;

const StyledRangeTrack = css`
  height: 6px;
  background: var(--gray-400);
  border-radius: 3px;
`;

const StyledRangeThumb = css`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--teal-200);
  border: 2px solid var(--white);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
`;

const StyledRangeThumbFocus = css`
  background: var(--teal-400);
`;

const StyledRangeThumbDisabled = css`
  display: none;
  width: 0;
  height: 0;
  background: transparent;
  border: none;
  box-shadow: none;
`;

const StyledRange = styled.input.attrs({ type: "range" })`
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  flex: 1;
  height: 6px;
  cursor: pointer;
  margin: 0;

  &:disabled {
    cursor: not-allowed;
  }

  &::-webkit-slider-runnable-track {
    ${StyledRangeTrack}
  }
  &::-moz-range-track {
    ${StyledRangeTrack}
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -4px;
    ${StyledRangeThumb}
  }
  &::-moz-range-thumb {
    ${StyledRangeThumb}
  }
  &:focus::-webkit-slider-thumb {
    ${StyledRangeThumbFocus}
  }
  &:focus::-moz-range-thumb {
    ${StyledRangeThumbFocus}
  }
  &:disabled::-webkit-slider-thumb {
    ${StyledRangeThumbDisabled}
  }
  &:disabled::-moz-range-thumb {
    ${StyledRangeThumbDisabled}
  }
  &:focus {
    outline: none;
  }
`;

const Time = styled.span`
  font-size: 0.95rem;
  color: #333;
  text-align: right;

  .total {
    @media ${deviceMax.sm} {
      display: none;
    }
  }
`;

const VolumeControl = styled(ButtonContainer)`
  min-width: 2rem;
  transition: min-width 0.3s;
  justify-content: flex-end;

  &:hover,
  &:focus {
    min-width: 8rem;
  }

  .volume-range {
    margin-left: 1rem;
    width: 4rem;
    opacity: 1;
    transition:
      width 0.3s step-end,
      opacity 0.3s step-end;
  }

  &:not(:hover):not(:focus) .volume-range {
    margin: 0;
    width: 0;
    opacity: 0;

    &::-webkit-slider-thumb {
      ${StyledRangeThumbDisabled}
    }
  }
`;

const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${String(secs).padStart(2, "0")}`;
};

// Logic for tracking playback position heavily inspired by https://github.com/kurtsmurf/whirly/blob/master/src/PlaybackPositionNode.js

const AudioUI = ({
  loop,
  looping,
  setLooping,
  playing,
  position,
  duration,
  seek,
  play,
  pause,
  muted,
  toggleMute,
  volume,
  setVolume,
}: {
  loop?: { start: number; end: number };
  looping?: boolean;
  setLooping?: (looping: boolean) => void;
  playing: boolean;
  duration?: number;
  position: number;
  seek: (position: number) => void;
  play: () => void;
  pause: () => void;
  muted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}) => {
  const [draggingTimeline, setDraggingTimeline] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);

  return (
    <PlayerContainer>
      <Player>
        <ButtonContainer>
          <IconButton
            onClick={() => {
              playing ? pause() : play();
            }}
          >
            {playing ? <PauseSVG /> : <PlaySVG />}
          </IconButton>
        </ButtonContainer>
        <Time>
          {formatSeconds(draggingTimeline ? dragPosition : position)}
          <span className="total"> / {formatSeconds(duration ?? 0)}</span>
        </Time>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
        >
          <StyledRange
            min={0}
            max={duration ?? 100}
            value={draggingTimeline ? dragPosition : position}
            disabled={duration === undefined}
            onMouseDown={() => {
              setDraggingTimeline(true);
              setDragPosition(position);
            }}
            onMouseUp={() => {
              if (loop && dragPosition > loop.end) {
                setLooping?.(false);
              }
              seek(dragPosition);
              setDraggingTimeline(false);
            }}
            onChange={(e) => {
              const newPosition = parseFloat(e.target.value);
              setDragPosition(newPosition);
            }}
            style={{ zIndex: 1 }}
          />
          {loop && duration && (
            <>
              <RepeatSVG
                style={{
                  position: "absolute",
                  left: `${(loop.start / duration) * 100}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "100%",
                  width: "initial",
                  color: looping ? "var(--teal-400)" : "var(--gray-200)",
                }}
              />
              <RepeatSVG
                style={{
                  position: "absolute",
                  left: `${(loop.end / duration) * 100}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%) rotate(180deg)",
                  height: "100%",
                  width: "initial",
                  color: looping ? "var(--teal-400)" : "var(--gray-200)",
                }}
              />
            </>
          )}
        </div>
        <VolumeControl>
          <StyledRange
            className="volume-range"
            min={0}
            max={1}
            step="any"
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
            }}
          />
          <IconButton
            onClick={() => {
              toggleMute();
            }}
          >
            {muted || volume === 0 ? <MuteSVG /> : <VolumeSVG />}
          </IconButton>
        </VolumeControl>
      </Player>
      {loop && (
        <label style={{ whiteSpace: "nowrap" }}>
          <input
            type="checkbox"
            checked={looping}
            onChange={(e) => {
              setLooping?.(e.target.checked);
            }}
          />{" "}
          Loop
        </label>
      )}
    </PlayerContainer>
  );
};

const LoopingAudioPlayer = ({
  src,
  loop,
}: {
  src: string;
  loop?: { start: number; end: number };
}) => {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [looping, setLooping] = useState(loop !== undefined);
  const [startPosition, setStartPosition] = useState(0);
  const [position, setPosition] = useState(0);
  const seeking = useRef(false);

  const [ctx, setCtx] = useState<AudioContext | null>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(
    null,
  );
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null);

  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audioContext = new AudioContext();
    setCtx(audioContext);
  }, []);

  useEffect(() => {
    if (!playing || !ctx || buffer) return;

    const audioContext = ctx;
    const abort = new AbortController();

    void (async () => {
      const response = await fetch(src, { signal: abort.signal });
      if (!response.ok) {
        setFailed(true);
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const rawAudioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Augment the AudioBuffer with an additional channel whose value ranges
      // from 0 to 1 so we can track position
      const audioBuffer = new AudioBuffer({
        numberOfChannels: rawAudioBuffer.numberOfChannels + 1,
        length: rawAudioBuffer.length,
        sampleRate: rawAudioBuffer.sampleRate,
      });
      for (let i = 0; i < rawAudioBuffer.numberOfChannels; i++) {
        audioBuffer.copyToChannel(rawAudioBuffer.getChannelData(i), i);
      }
      for (let i = 0; i < audioBuffer.length; i++) {
        audioBuffer.getChannelData(rawAudioBuffer.numberOfChannels)[i] =
          i / (audioBuffer.length - 1);
      }

      setBuffer(audioBuffer);
    })();

    return () => {
      abort.abort();
    };
  }, [src, playing, ctx, buffer]);

  useEffect(() => {
    if (!playing || !ctx || !buffer) return;

    const source = new AudioBufferSourceNode(ctx, {
      buffer: buffer,
      loop: looping,
      loopStart: loop?.start ?? 0,
      loopEnd: loop?.end ?? buffer.duration,
    });

    const splitter = new ChannelSplitterNode(ctx);
    source.connect(splitter);

    const merger = new ChannelMergerNode(ctx);
    for (let i = 0; i < buffer.numberOfChannels - 1; i++) {
      splitter.connect(merger, i, i);
    }

    const analyser = new AnalyserNode(ctx);
    splitter.connect(analyser, buffer.numberOfChannels - 1);

    const gain = new GainNode(ctx, {
      gain: muted ? 0 : volume,
    });
    merger.connect(gain);

    gain.connect(ctx.destination);

    setAudioSource(source);
    setAudioAnalyser(analyser);
    setGainNode(gain);

    source.addEventListener("ended", () => {
      if (!seeking.current) {
        setPlaying(false);
      }
      seeking.current = false;
    });
    source.start(0, startPosition);

    return () => {
      setAudioSource(null);
      setAudioAnalyser(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't want to recreate the audio source when loop or volume state changes
  }, [playing, loop?.start, loop?.end, ctx, buffer, startPosition]);

  useEffect(() => {
    if (!playing) {
      audioSource?.stop();
      setStartPosition(position);
    }
  }, [playing, audioSource, position]);

  useEffect(() => {
    if (!playing) return;

    let animationFrameId = 0;
    const store = new Float32Array(1);
    const updatePosition = () => {
      if (buffer && audioAnalyser && !seeking.current) {
        audioAnalyser.getFloatTimeDomainData(store);
        const sample = store[0] ?? 0;
        if (sample > 0) setPosition(sample * buffer.duration);
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };
    updatePosition();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [playing, buffer, audioAnalyser]);

  return (
    <>
      {failed && (
        <Alert $variant="error">
          Audio failed to load. Please check your internet connection or try
          again later.
        </Alert>
      )}
      <AudioUI
        loop={loop}
        looping={looping}
        setLooping={(looping) => {
          setLooping(looping);
          if (audioSource) {
            audioSource.loop = looping;
          }
        }}
        playing={playing}
        position={position}
        duration={buffer?.duration}
        seek={(newPosition) => {
          if (audioSource) {
            seeking.current = true;
          }
          setPosition(newPosition);
          setStartPosition(newPosition);
          audioSource?.stop();
        }}
        play={() => {
          setPlaying(true);
        }}
        pause={() => {
          setPlaying(false);
        }}
        muted={muted}
        toggleMute={() => {
          setMuted((prev) => !prev);
          if (gainNode) {
            gainNode.gain.value = muted ? volume : 0;
          }
        }}
        volume={volume}
        setVolume={(newVolume) => {
          setVolume(newVolume);
          if (newVolume !== 0) {
            setMuted(false);
            if (gainNode) {
              gainNode.gain.value = muted ? 0 : newVolume;
            }
          }
        }}
      />
    </>
  );
};

const UnloopingAudioPlayer = ({ src }: { src: string }) => {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState<number>();
  const [position, setPosition] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
    };
    const onPause = () => {
      setPlaying(false);
    };
    const onDurationChange = () => {
      setDuration(audio.duration);
    };
    const onTimeUpdate = () => {
      setPosition(audio.currentTime);
    };
    const onVolumeChange = () => {
      setMuted(audio.muted);
      setVolume(audio.volume);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("volumechange", onVolumeChange);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("volumechange", onVolumeChange);
    };
  }, [src]);

  return (
    <>
      <AudioUI
        playing={playing}
        position={position}
        duration={duration}
        seek={(newPosition) => {
          if (ref.current) {
            ref.current.currentTime = newPosition;
          }
        }}
        play={() => {
          void ref.current?.play();
        }}
        pause={() => {
          ref.current?.pause();
        }}
        loop={undefined}
        volume={volume}
        setVolume={(newVolume) => {
          if (ref.current) {
            ref.current.muted = false;
            ref.current.volume = newVolume;
          }
        }}
        muted={muted}
        toggleMute={() => {
          if (ref.current) {
            ref.current.muted = !ref.current.muted;
          }
        }}
      />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- This is for music playback */}
      <audio ref={ref} src={src} />
    </>
  );
};

const elems = document.querySelectorAll(".audio-player");
elems.forEach((elem) => {
  const src = elem.getAttribute("data-src") ?? "";
  const loopStart = parseFloat(elem.getAttribute("data-loop-start") ?? "0");
  const loopEnd = parseFloat(elem.getAttribute("data-loop-end") ?? "0");
  const loop =
    loopStart !== 0 || loopEnd !== 0
      ? { start: loopStart, end: loopEnd }
      : undefined;

  renderRoot(
    elem,
    loop ? (
      <LoopingAudioPlayer src={src} loop={loop} />
    ) : (
      <UnloopingAudioPlayer src={src} />
    ),
  );
});

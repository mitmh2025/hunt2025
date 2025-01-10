import { WebRTCPlayer } from "@eyevinn/webrtc-player";
import React, {
  type Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { styled } from "styled-components";
import { deviceMax } from "../utils/breakpoints";
import { Button } from "./StyledUI";

type AudioControlState = {
  audioDucked: boolean;
  loading: boolean;
  playing: boolean;
  volume: number;
  volumeBeforeMute: number;
};

const DEFAULT_AUDIO_CONTROL_STATE = {
  audioDucked: false,
  loading: false,
  playing: false,
  volume: 1,
  volumeBeforeMute: 1,
};

enum AudioControlActionType {
  CHANGE_VOLUME = "CHANGE_VOLUME",
  DUCK = "DUCK",
  LOAD = "LOAD",
  MUTE = "MUTE",
  UNDUCK = "UNDUCK",
  UNMUTE = "UNMUTE",
}

type ChangeVolumeAction = {
  type: AudioControlActionType.CHANGE_VOLUME;
  volume: number;
};

type DuckAction = {
  type: AudioControlActionType.DUCK;
};

type LoadAction = {
  type: AudioControlActionType.LOAD;
};

type MuteAction = {
  type: AudioControlActionType.MUTE;
};

type UnduckAction = {
  type: AudioControlActionType.UNDUCK;
};

type UnmuteAction = {
  type: AudioControlActionType.UNMUTE;
};

type AudioControlAction =
  | ChangeVolumeAction
  | DuckAction
  | LoadAction
  | MuteAction
  | UnduckAction
  | UnmuteAction;

const reducer: Reducer<AudioControlState, AudioControlAction> = (
  state: AudioControlState,
  action: AudioControlAction,
): AudioControlState => {
  switch (action.type) {
    case AudioControlActionType.CHANGE_VOLUME:
      return {
        ...state,
        volume: action.volume,
      };
    case AudioControlActionType.DUCK:
      return {
        ...state,
        audioDucked: true,
      };
    case AudioControlActionType.LOAD:
      return {
        ...state,
        loading: true,
        playing: false,
      };
    case AudioControlActionType.MUTE:
      return {
        ...state,
        loading: false,
        playing: false,
        volume: 0,
        volumeBeforeMute: state.volume,
      };
    case AudioControlActionType.UNDUCK:
      return {
        ...state,
        audioDucked: false,
      };
    case AudioControlActionType.UNMUTE:
      return {
        ...state,
        loading: false,
        playing: true,
        volume: state.volumeBeforeMute,
      };
    default:
      return state;
  }
};

const Throbber = styled.div`
  color: var(--black);
  display: inline-block;
  position: relative;
  height: 20px;
  width: 20px;
  div {
    position: absolute;
    border: 2px solid var(--black);
    border-radius: 50%;
    animation: throb 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }

  @keyframes throb {
    0% {
      top: 9px;
      left: 9px;
      width: 2px;
      height: 2px;
      opacity: 0;
    }
    4.9% {
      top: 9px;
      left: 9px;
      width: 2px;
      height: 2px;
      opacity: 0;
    }
    5% {
      top: 9px;
      left: 9px;
      width: 2px;
      height: 2px;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      opacity: 0;
    }
  }
`;

const Loading = () => {
  return (
    <Throbber>
      <div></div>
      <div></div>
    </Throbber>
  );
};

const ControlWrapper = styled.div`
  margin: 0 0.25rem;
  display: flex;
  align-items: center;

  button {
    font-size: 1.25rem;
    padding: 0 0.25rem 0.125rem 0.25rem;
    margin-right: 0.125rem;
  }

  #volume-slider {
    -webkit-appearance: none;
    width: 90px;
    cursor: grab;
    background: transparent;
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      height: 8px;
      background: var(--gold-400);
      border: none;
      border-radius: 5px;
    }
    &::-moz-range-track {
      height: 8px;
      background: var(--gold-400);
      border: none;
      border-radius: 5px;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid var(--gold-700);
      margin-top: -4px;
      height: 16px;
      width: 16px;
      border-radius: 8px;
      background: var(--gold-400);
    }
    &::-moz-range-thumb {
      border: 1px solid var(--gold-700);
      height: 16px;
      width: 16px;
      border-radius: 8px;
      background: var(--gold-400);
    }
    &:hover {
      &::-webkit-slider-runnable-track {
        background: var(--gold-500);
      }
      &::-moz-range-track {
        background: var(--gold-500);
      }
      &::-webkit-slider-thumb {
        background: var(--gold-500);
        border-color: var(--gold-800);
      }
      &::-moz-range-thumb {
        background: var(--gold-500);
        border-color: var(--gold-800);
      }
    }
    &:active {
      cursor: grabbing;
      &::-webkit-slider-runnable-track {
        background: var(--gold-600);
      }
      &::-moz-range-track {
        background: var(--gold-600);
      }
      &::-webkit-slider-thumb {
        background: var(--gold-600);
        border-color: var(--gold-900);
      }
      &::-moz-range-thumb {
        background: var(--gold-600);
        border-color: var(--gold-900);
      }
    }
    &:disabled {
      cursor: not-allowed;
      &::-webkit-slider-runnable-track {
        background: var(--gray-200);
      }
      &::-moz-range-track {
        background: var(--gray-200);
      }
      &::-webkit-slider-thumb {
        background: var(--gray-200);
        border-color: var(--gray-400);
      }
      &::-moz-range-thumb {
        background: var(--gray-200);
        border-color: var(--gray-400);
      }
    }
  }

  @media ${deviceMax.md} {
    #volume-slider {
      width: auto;
    }
  }

  @media ${deviceMax.sm} {
    #volume-slider {
      width: 60px;
    }
  }
`;

const MuteUnmuteButton = styled(Button)`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Mute = styled.div`
  border-color: transparent transparent transparent var(--black);
  border-style: double;
  border-width: 0px 0px 0px 12px;
  height: 20px;
  margin-top: 2px;
`;

const Unmute = styled.div`
  border-color: transparent transparent transparent var(--black);
  border-style: solid;
  border-width: 10px 0 10px 16px;
  height: 20px;
  margin-top: 2px;
  margin-left: 4px;
`;

const AudioControls = ({ whepUrl }: { whepUrl: string }) => {
  const activePlayer = useRef<{
    player: WebRTCPlayer;
    audio: HTMLAudioElement;
  } | null>(null);
  const [{ audioDucked, loading, playing, volume }, dispatch] = useReducer(
    reducer,
    DEFAULT_AUDIO_CONTROL_STATE,
  );

  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    if (!storedVolume) {
      return;
    }

    const parsedVolume = parseFloat(storedVolume);
    if (isFinite(parsedVolume)) {
      dispatch({
        type: AudioControlActionType.CHANGE_VOLUME,
        volume: parsedVolume,
      });
    }
  }, []);

  const handlePlay = useCallback(async () => {
    if (activePlayer.current) {
      return;
    }

    dispatch({ type: AudioControlActionType.LOAD });
    // TODO(Fuzzy): whatever loading state you wanted to handle
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch({ type: AudioControlActionType.UNMUTE });

    const audio = new Audio();
    const player = new WebRTCPlayer({
      // WebRTCPlayer expects a video element, but we only want audio -- the
      // audio element API is similar enough that it just works.
      video: audio as HTMLVideoElement,
      type: "whep",
      mediaConstraints: {
        audioOnly: true,
      },
    });
    activePlayer.current = { player, audio };

    player
      .load(new URL(whepUrl))
      .then(() => {
        player.unmute();

        audio.play().catch((error: unknown) => {
          console.error("Failed to play audio", error);
        });
      })
      .catch((error: unknown) => {
        console.error("Failed to load player", error);
      });

    player.on("no-media", () => {
      console.log("media timeout occured");
    });

    player.on("media-recovered", () => {
      console.log("media recovered");
    });

    player.on("stats:inbound-rtp", (report) => {
      console.log("media report", report);
    });
  }, [dispatch, whepUrl]);

  const handlePause = useCallback(() => {
    if (activePlayer.current) {
      activePlayer.current.audio.pause();
      activePlayer.current.player.mute();
      activePlayer.current.player.destroy();
      activePlayer.current = null;
    }
    dispatch({ type: AudioControlActionType.MUTE });
  }, [dispatch]);

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseFloat(event.target.value);
    dispatch({ type: AudioControlActionType.CHANGE_VOLUME, volume: newVolume });
    localStorage.setItem("volume", newVolume.toString());
  }

  useEffect(() => {
    if (activePlayer.current && playing) {
      activePlayer.current.audio.volume = audioDucked ? volume * 0.25 : volume;
    }
  }, [volume, audioDucked, playing]);

  const activeSoundEffects = useRef<Map<string, { destroy: () => void }>>(
    new Map(),
  );
  const handleSoundEffect = useCallback((key: string, src: string) => {
    if (!activePlayer.current) {
      return;
    }

    const prev = activeSoundEffects.current.get(key);
    if (prev) {
      prev.destroy();
    }

    const audio = new Audio();

    function handleDestroy() {
      audio.removeEventListener("canplaythrough", handleLoad);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      audio.load();
    }

    function handleLoad() {
      // duck the radio stream volume
      console.log("Ducking radio stream");
      dispatch({ type: AudioControlActionType.DUCK });

      console.log("Playing sound effect", src);
      audio.play().catch((error: unknown) => {
        console.error("Failed to play audio", error);
      });
    }
    audio.addEventListener("canplaythrough", handleLoad);

    function handleEnded() {
      activeSoundEffects.current.delete(key);

      console.log("Sound effect ended", src);
      if (activeSoundEffects.current.size === 0) {
        console.log("Unducking radio stream");
        dispatch({ type: AudioControlActionType.UNDUCK });
      }

      handleDestroy();
    }
    audio.addEventListener("ended", handleEnded);

    activeSoundEffects.current.set(key, {
      destroy: handleDestroy,
    });

    console.log("Loading sound effect", src);
    audio.loop = false;
    audio.src = src;
    audio.load();
  }, []);

  useEffect(() => {
    function handlePlaySoundEffect(event: Event) {
      const { key, src } = (event as CustomEvent).detail as {
        key: string;
        src: string;
      };
      handleSoundEffect(key, src);
    }
    document.addEventListener("hunt:play-sound-effect", handlePlaySoundEffect);

    // Override browser media events to control the radio (and not any sound
    // effects)
    navigator.mediaSession.setActionHandler("play", function () {
      void handlePlay();
    });
    navigator.mediaSession.setActionHandler("pause", function () {
      handlePause();
    });
    navigator.mediaSession.setActionHandler("seekbackward", function () {
      // noop
    });
    navigator.mediaSession.setActionHandler("seekforward", function () {
      // noop
    });
    navigator.mediaSession.setActionHandler("previoustrack", function () {
      // noop
    });
    navigator.mediaSession.setActionHandler("nexttrack", function () {
      // noop
    });

    return () => {
      document.removeEventListener(
        "hunt:play-sound-effect",
        handlePlaySoundEffect,
      );
    };
  }, [handleSoundEffect, handlePlay, handlePause]);

  return (
    <ControlWrapper>
      {playing ? (
        <MuteUnmuteButton onClick={handlePause} aria-label="Mute">
          <Mute />
        </MuteUnmuteButton>
      ) : loading ? (
        <MuteUnmuteButton onClick={handlePause} aria-label="Loading...">
          <Loading />
        </MuteUnmuteButton>
      ) : (
        <MuteUnmuteButton
          onClick={() => {
            void handlePlay();
          }}
          aria-label="Unmute"
        >
          <Unmute />
        </MuteUnmuteButton>
      )}{" "}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        id="volume-slider"
        value={volume}
        onChange={handleVolumeChange}
        disabled={!playing}
      />
    </ControlWrapper>
  );
};

export default AudioControls;

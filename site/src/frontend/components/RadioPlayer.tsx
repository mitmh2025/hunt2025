import React, {
  type Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { styled } from "styled-components";
import { WebRTCClient } from "../utils/WebRTCClient";
import { deviceMax } from "../utils/breakpoints";
import { PageHeader, PageMain, PageTitle, PageWrapper } from "./PageLayout";
import { Button } from "./StyledUI";
import radioPlayImg from "./radioPlayerAssets/radio-render-play.png";
import radioImg from "./radioPlayerAssets/radio-render.png";

type AudioControlState = {
  audioDucked: boolean;
  loading: boolean;
  playing: boolean;
  volume: number;
};

const DEFAULT_AUDIO_CONTROL_STATE = {
  audioDucked: false,
  loading: false,
  playing: false,
  volume: 1,
};

enum AudioControlActionType {
  CHANGE_VOLUME = "CHANGE_VOLUME",
  DUCK = "DUCK",
  LOADING = "LOADING",
  PAUSED = "PAUSED",
  UNDUCK = "UNDUCK",
  PLAYING = "PLAYING",
}

type ChangeVolumeAction = {
  type: AudioControlActionType.CHANGE_VOLUME;
  volume: number;
};

type DuckAction = {
  type: AudioControlActionType.DUCK;
};

type LoadingAction = {
  type: AudioControlActionType.LOADING;
};

type PausedAction = {
  type: AudioControlActionType.PAUSED;
};

type UnduckAction = {
  type: AudioControlActionType.UNDUCK;
};

type PlayingAction = {
  type: AudioControlActionType.PLAYING;
};

type AudioControlAction =
  | ChangeVolumeAction
  | DuckAction
  | LoadingAction
  | PausedAction
  | UnduckAction
  | PlayingAction;

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
    case AudioControlActionType.LOADING:
      return {
        ...state,
        loading: true,
        playing: false,
      };
    case AudioControlActionType.PAUSED:
      return {
        ...state,
        loading: false,
        playing: false,
      };
    case AudioControlActionType.UNDUCK:
      return {
        ...state,
        audioDucked: false,
      };
    case AudioControlActionType.PLAYING:
      return {
        ...state,
        loading: false,
        playing: true,
      };
    default:
      return state;
  }
};

const Radio = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;

  img {
    max-width: 100%;

    @media ${deviceMax.sm} {
      display: none;
    }
  }

  #radio-controls {
    position: absolute;
    left: 39%;
    top: 22%;
    transform: rotate(7deg);

    @media ${deviceMax.lg} {
      left: 40%;
    }

    @media ${deviceMax.md} {
      left: 40%;
    }

    @media ${deviceMax.sm} {
      position: relative;
      margin: 0 auto;
      left: auto;
      top: auto;
      transform: none;
    }
  }
`;

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
  flex-direction: column;
  align-items: center;

  button {
    font-size: 1.25rem;
    padding: 0 0.25rem 0.125rem 0.25rem;
    margin-right: 0.125rem;
  }

  #volume-slider {
    appearance: none;
    -webkit-appearance: none;
    cursor: grab;
    background: transparent;
    overflow: hidden;
    width: 300px;
    margin: 1rem auto;

    @media ${deviceMax.lg} {
      width: 26vw;
    }

    @media ${deviceMax.sm} {
      width: 200px;
    }

    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      height: 16px;
      appearance: none;
      -webkit-appearance: none;
      background: var(--gray-500);
      color: var(--gray-500);
      border: none;
      border-radius: 5px;
    }
    &::-moz-range-progress {
      background-color: var(--gold-500);
    }
    &::-moz-range-track {
      height: 8px;
      background: var(--gray-500);
      border: none;
      border-radius: 5px;
    }
    &::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      border: 1px solid var(--gold-700);
      height: 16px;
      width: 16px;
      border-radius: 0;
      background: var(--gray-300);
      cursor: ew-resize;
      box-shadow: -300px 0 0 300px var(--gold-500);

      @media ${deviceMax.lg} {
        box-shadow: -26vw 0 0 26vw var(--gold-500);
      }

      @media ${deviceMax.sm} {
        box-shadow: -200px 0 0 200px var(--gold-500);
      }
    }
    &::-moz-range-thumb {
      border: 1px solid var(--gold-700);
      height: 15px;
      width: 15px;
      border-radius: 15px;
      background: var(--gray-300);
    }

    &:hover {
      &::-webkit-slider-runnable-track {
        background: var(--gray-600);
      }
      &::-moz-range-track {
        background: var(--gray-600);
      }
      &::-webkit-slider-thumb {
        background: var(--gold-500);
        border-color: var(--gold-800);

        box-shadow: -300px 0 0 300px var(--gold-400);

        @media ${deviceMax.lg} {
          box-shadow: -26vw 0 0 26vw var(--gold-400);
        }

        @media ${deviceMax.sm} {
          box-shadow: -80px 0 0 80px var(--gold-400);
        }
      }
      &::-moz-range-thumb {
        background: var(--gold-500);
        border-color: var(--gold-800);
      }
      &::-moz-range-progress {
        background-color: var(--gold-300);
      }
    }
    &:active {
      cursor: grabbing;
      &::-webkit-slider-runnable-track {
        background: var(--gray-600);
      }
      &::-moz-range-track {
        background: var(--gray-600);
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
  height: 14px;
  margin-top: 2px;
`;

const Unmute = styled.div`
  border-color: transparent transparent transparent var(--black);
  border-style: solid;
  border-width: 7px 0 7px 10px;
  height: 14px;
  margin-top: 2px;
  margin-left: 3px;
`;

const RadioPlayer = ({ whepUrl }: { whepUrl: string }) => {
  const activePlayer = useRef<{
    client: WebRTCClient;
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

  const handlePause = useCallback(() => {
    if (activePlayer.current) {
      activePlayer.current.audio.pause();
      activePlayer.current.client.destroy();
      activePlayer.current = null;
    }
    dispatch({ type: AudioControlActionType.PAUSED });
  }, [dispatch]);

  const handlePlay = useCallback(() => {
    if (activePlayer.current) {
      return;
    }

    dispatch({ type: AudioControlActionType.LOADING });

    const audio = new Audio();
    const client = new WebRTCClient({
      mediaElement: audio,
      whepUrl: whepUrl,
      onStateChange: (state) => {
        if (state === "connected") {
          dispatch({ type: AudioControlActionType.PLAYING });
        } else if (state === "disconnected") {
          handlePause();
        } else {
          dispatch({ type: AudioControlActionType.LOADING });
        }
      },
    });
    activePlayer.current = { client, audio };

    client.connect();
  }, [dispatch, whepUrl, handlePause]);

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
      handlePlay();
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
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>WDNM 2π Virtual Radio Stream</PageTitle>
        </PageHeader>
        <PageMain>
          <Radio>
            <img
              src={playing ? radioPlayImg : radioImg}
              alt={
                playing
                  ? "Rendering of Hunt radio with sound wave lines"
                  : "Rendering of Hunt radio"
              }
            />
            <ControlWrapper id="radio-controls">
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
                    handlePlay();
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
                value={playing ? volume : 0}
                onChange={handleVolumeChange}
                disabled={!playing}
              />
            </ControlWrapper>
          </Radio>
        </PageMain>
      </>
    </PageWrapper>
  );
};

export default RadioPlayer;

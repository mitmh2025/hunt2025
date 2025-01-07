import { WebRTCPlayer } from "@eyevinn/webrtc-player";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { deviceMax } from "../utils/breakpoints";
import { Button } from "./StyledUI";

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
    width: 90px;
    cursor: grab;
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

const AudioControls = ({ whepUrl }: { whepUrl: string }) => {
  const activePlayer = useRef<{
    player: WebRTCPlayer;
    audio: HTMLAudioElement;
  } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [audioDucked, setAudioDucked] = useState(false);

  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    if (!storedVolume) {
      return;
    }

    const parsedVolume = parseFloat(storedVolume);
    if (isFinite(parsedVolume)) {
      setVolume(parsedVolume);
    }
  }, []);

  const handlePlay = useCallback(() => {
    if (activePlayer.current) {
      return;
    }

    setPlaying(true);

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
  }, [whepUrl]);

  const handlePause = useCallback(() => {
    if (activePlayer.current) {
      activePlayer.current.audio.pause();
      activePlayer.current.player.mute();
      activePlayer.current.player.destroy();
      activePlayer.current = null;
    }
    setPlaying(false);
  }, []);

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
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
      setAudioDucked(true);

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
        setAudioDucked(false);
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
    <ControlWrapper>
      {playing ? (
        <Button onClick={handlePause}>🔊</Button>
      ) : (
        <Button onClick={handlePlay}>🔈</Button>
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

import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import sound from "../assets/telephone/sound.svg";
import telephone from "../assets/telephone/telephone.svg";
import telephone_pushed from "../assets/telephone/telephone_pushed.svg";
import telephone_pushed_blacklight from "../assets/telephone/telephone_pushed_blacklight.svg";
import telephone_blacklight from "../assets/telephone/telephone_unpushed_blacklight.svg";
import { useRenderModalExtras } from "./ExtraModalRenderer";
import { Asset } from "./SearchEngine";
import { default_cursor } from "./cursors";

const area = {
  left: -0.6,
  right: 0.6,
  top: 0.8,
  bottom: -0.8,
};

const PLAY_SPEED = 200;

// Run this code to generate SEGMENTS (to avoid having the actual morse code
// in the built code)
// function generateSegments() {
//   const SEGMENTS =
//     ".-. --- .-- / -.-. --- .-.. ..- -- -. / .-. .- .. -. -... --- .--"
//       .split("")
//       .flatMap((c) => {
//         if (c === ".") {
//           return [
//             { on: true, duration: 1 },
//             { on: false, duration: 1 },
//           ];
//         } else if (c === "-") {
//           return [
//             { on: true, duration: 3 },
//             { on: false, duration: 1 },
//           ];
//         } else if (c === " ") {
//           // 3 spaces between letters, but 1 is already included in the duration of the last character
//           return [{ on: false, duration: 2 }];
//         } else if (c === "/") {
//           // 7 spaces between words, but 1 is already included in the duration of the last character
//           return [{ on: false, duration: 6 }];
//         }
//         throw new Error(`Unexpected character ${c}`);
//       });
//   console.log(JSON.stringify(SEGMENTS));
// }

const SEGMENTS = [
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: false, duration: 6 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: false, duration: 6 },
  { on: false, duration: 2 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: false, duration: 2 },
  { on: true, duration: 1 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
  { on: true, duration: 3 },
  { on: false, duration: 1 },
];

const Button = styled.button`
  position: absolute;
  inset: 912.539px 971.056px 123.775px 900.404px;
  border: none;
  background: none;
  cursor: ${default_cursor};
`;

class Beep {
  audioCtx: AudioContext;
  oscillator: OscillatorNode;
  gainNode: GainNode;
  on: boolean;

  constructor() {
    this.on = false;
    this.audioCtx = new AudioContext();
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = 440; // value in hertz

    // Instead of hard start/stop, we use a gain node that we ramp up/down to
    // avoid the pop/click when cutting in the middle of a wave
    this.gainNode = this.audioCtx.createGain();
    this.gainNode = new GainNode(this.audioCtx);
    this.gainNode.gain.value = 0;
    this.oscillator.connect(this.gainNode).connect(this.audioCtx.destination);

    this.oscillator.start();
  }

  start() {
    if (this.on) {
      return;
    }

    this.on = true;
    this.gainNode.gain.setValueAtTime(1, this.audioCtx.currentTime);
  }

  stop() {
    if (!this.on) {
      return;
    }

    this.on = false;
    this.gainNode.gain.setValueAtTime(1, this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      this.audioCtx.currentTime + 0.03,
    );
    setTimeout(() => {
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }, 30);
  }

  destroy() {
    this.oscillator.stop();
    this.gainNode.disconnect(this.audioCtx.destination);
    void this.audioCtx.close();
  }
}

export default function Telephone() {
  const [pushed, setPushed] = useState(false);
  const playingTimeout = useRef<number | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const beep = useRef<Beep | null>(null);

  useEffect(() => {
    beep.current = new Beep();
    return () => {
      beep.current?.destroy();
    };
  }, []);

  const extras = useRenderModalExtras(
    [],
    [
      {
        asset: null,
        extraAsset: pushed ? telephone_pushed_blacklight : telephone_blacklight,
        area,
      },
    ],
  );

  function stopPlaying() {
    setPushed(false);
    setSoundOn(false);

    beep.current?.stop();

    if (playingTimeout.current) {
      window.clearTimeout(playingTimeout.current);
    }
  }

  function startPlaying() {
    setPushed(true);
    let time = 0;

    function playNextSegment() {
      const segment = SEGMENTS[time];
      if (!segment) {
        stopPlaying();
        return;
      }

      if (segment.on) {
        setSoundOn(true);
        beep.current?.start();
      } else {
        setSoundOn(false);
        beep.current?.stop();
      }

      time++;
      playingTimeout.current = window.setTimeout(
        playNextSegment,
        segment.duration * PLAY_SPEED,
      );
    }

    playNextSegment();
  }

  return (
    <>
      <Asset
        placedAsset={{
          asset: pushed ? telephone_pushed : telephone,
          area,
        }}
      />
      {extras}
      <Button
        onClick={() => {
          if (pushed) {
            stopPlaying();
          } else {
            startPlaying();
          }
        }}
      />
      {soundOn && (
        <Asset
          placedAsset={{
            asset: sound,
            area: {
              left: -0.325,
              right: -0.055,
              top: -0.1,
              bottom: -0.37,
            },
          }}
        />
      )}
    </>
  );
}

if (typeof window !== "undefined") {
  window.illegalSearchInteractions.telephone = Telephone;
}

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import {
  Math as MathMLMath,
  MFrac,
  MI,
  MN,
  MRow,
} from "../../components/MathML";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { deviceMax } from "../../utils/breakpoints";
import campusmap from "./assets/campusmap.svg";
import boyband from "./assets/complete/boyband987.mp3";
import classical from "./assets/complete/classical905.mp3";
import country from "./assets/complete/country1011.mp3";
import disco from "./assets/complete/disco917.mp3";
import hip from "./assets/complete/hip1051.mp3";
import jazz from "./assets/complete/justjazz965.mp3";
import kpop from "./assets/complete/kpop933.mp3";
import ragtime from "./assets/complete/ragtime1063.mp3";
import taytay from "./assets/complete/taytay891.mp3";
import dial from "./assets/frequency-dial.svg";
import knob from "./assets/frequency-knob.png";
import countryinterrupt from "./assets/interrupt-1011.mp3";
import hipinterrupt from "./assets/interrupt-1051.mp3";
import ragtimeinterrupt from "./assets/interrupt-1063.mp3";
import taytayinterrupt from "./assets/interrupt-891.mp3";
import classicalinterrupt from "./assets/interrupt-905.mp3";
import discointerrupt from "./assets/interrupt-917.mp3";
import kpopinterrupt from "./assets/interrupt-933.mp3";
import jazzinterrupt from "./assets/interrupt-965.mp3";
import boybandinterrupt from "./assets/interrupt-987.mp3";
import rickroll from "./assets/rickroll.mp3";
import pmstatic from "./assets/static.flac";

const CambridgeFMStations = new Map<number, string>([
  [881, "https://wmbr.org:8002/hi"],
  [
    889,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/WERSFM.mp3",
  ],
  [897, "https://wgbh-live.streamguys1.com/wgbh"],
  [909, "https://fm909.wbur.org/wbur_www"],
  [925, "https://nebcoradio.com:8443/WXRV"],
  [
    929,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/WRCAAM.mp3",
  ],
  [945, "https://stream.revma.ihrhls.com/zc1089"],
  [953, "https://stream.whrb.org/whrb-he-aac"],
  [
    969,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/WBQTFM.mp3",
  ],
  [
    985,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/WBZFMAAC.aac",
  ],
  [1007, "https://stream.revma.ihrhls.com/zc7730"],
  [1017, "https://stream.revma.ihrhls.com/zc6586"],
  [
    1025,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/WKLBFM.mp3",
  ],
  [1029, "https://streamer.radio.co/s49970680a/listen"],
  [1033, "https://live.amperwave.net/direct/audacy-wbgbfmaac-imc"],
  [1041, "https://live.amperwave.net/direct/audacy-wwbxfmaac-imc"],
  [
    1045,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/WXLOFM.mp3",
  ],
  [
    1057,
    "https://playerservices.streamtheworld.com/api/livestream-redirect/WRORFM.mp3",
  ],
  [1067, "https://live.amperwave.net/direct/audacy-wmjxfmaac-imc"],
  [1079, "https://stream.revma.ihrhls.com/zc1097"],
]);

const PuzzleFMStations = new Map<
  number,
  {
    x: number;
    y: number;
    url: string;
    interrupt: string;
  }
>([
  [
    891,
    {
      x: 387.3873873873874,
      y: 494.10543355855856,
      url: taytay,
      interrupt: taytayinterrupt,
    },
  ],
  [
    905,
    {
      x: 509.009009009009,
      y: 696.8081362612612,
      url: classical,
      interrupt: classicalinterrupt,
    },
  ],
  [
    917,
    {
      x: 295.0450450450451,
      y: 379.2405686936937,
      url: disco,
      interrupt: discointerrupt,
    },
  ],
  [
    933,
    {
      x: 371.6216216216216,
      y: 372.48381193693695,
      url: kpop,
      interrupt: kpopinterrupt,
    },
  ],
  [
    965,
    {
      x: 468.4684684684685,
      y: 156.26759572072072,
      url: jazz,
      interrupt: jazzinterrupt,
    },
  ],
  [
    987,
    {
      x: 914.4144144144144,
      y: 446.80813626126127,
      url: boyband,
      interrupt: boybandinterrupt,
    },
  ],
  [
    1011,
    {
      x: 603.6036036036036,
      y: 219.33065878378378,
      url: country,
      interrupt: countryinterrupt,
    },
  ],
  [
    1051,
    {
      x: 436.93693693693695,
      y: 169.78110923423424,
      url: hip,
      interrupt: hipinterrupt,
    },
  ],
  [
    1063,
    {
      x: 94.5945945945946,
      y: 487.3486768018018,
      url: ragtime,
      interrupt: ragtimeinterrupt,
    },
  ],
]);

const PuzzleStationRadius = 30;

const Container = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;

  @media ${deviceMax.md} {
    flex-direction: column;
  }

  & > * {
    flex: 1;
  }
`;

const MapCanvas = styled.canvas`
  background-color: white;
  background-image: url(${campusmap});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  object-fit: contain;

  cursor: pointer;
`;

const DialContainer = styled.div`
  width: 100%;
  position: relative;
  touch-action: none;
`;

const DialImage = styled.img`
  width: 100%;
  pointer-events: none;
`;

const KnobImage = styled.img`
  width: 47.85%;
  height: 21.78%;
  pointer-events: none;

  position: absolute;
  left: 31.9%;
  top: 38.4%;
  transform-origin: 37.65% 50%;
`;

// Taken from https://www.svgrepo.com/svg/1276/map-pin and scaled to 100x100px
const Pin = new Path2D(
  "m50 0c-17.647 0-31.951 14.302-31.951 31.949 0 7.6098 2.6768 14.587 7.123 20.072 1.4332 1.7656 3.8303 4.5447 5.0801 6.4453 7.1964 10.932 16.429 26.812 19.119 39.842 0.4616 2.2253 1.0182 2.2642 1.6172 0.072265 1.919-7.026 6.8958-22.378 17.174-38.441 1.2254-1.9156 3.7113-4.596 5.2539-6.2656 2.2344-2.4194 4.0929-5.1886 5.5059-8.209 1.9264-4.1204 3.0293-8.6833 3.0293-13.512 0-17.649-14.305-31.953-31.951-31.953zm0 13.547c9.8494 0 17.834 7.9846 17.834 17.832 0 9.85-7.9846 17.834-17.834 17.834-9.8496 0-17.834-7.9844-17.834-17.834 0-9.8478 7.9844-17.832 17.834-17.832zm0 9.7852a7.4168 7.4168 0 0 0-7.416 7.416 7.4168 7.4168 0 0 0 7.416 7.418 7.4168 7.4168 0 0 0 7.418-7.418 7.4168 7.4168 0 0 0-7.418-7.416z",
);

const getAngle = (dial: HTMLImageElement, x: number, y: number) => {
  const rect = dial.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return (180 / Math.PI) * Math.atan2(y - centerY, x - centerX);
};

const clampAngle = (angle: number) => {
  if (angle > 11.5 && angle < 90) return 11.5;
  if (angle >= 90 && angle < 168.5) return 168.5;
  return angle;
};

const computeFrequency = (angle: number) => {
  if (angle > 0 && angle < 90) return 1079;
  if (angle >= 90 && angle < 180) return 879;

  const stepCount = 5 * (108 - 88);
  const stepSize = 180 / stepCount;
  const steps = Math.round((angle + 180 + stepSize / 2) / stepSize);
  return 879 + steps * 2;
};

const makeWhiteNoiseStream = () => {
  const audioContext = new AudioContext();
  const output = audioContext.createMediaStreamDestination();

  const whiteNoiseBuffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate,
    audioContext.sampleRate,
  );
  const whiteNoiseData = whiteNoiseBuffer.getChannelData(0);
  for (let i = 0; i < whiteNoiseData.length; i++) {
    whiteNoiseData[i] = Math.random() * 2 - 1;
  }
  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = whiteNoiseBuffer;
  whiteNoiseSource.loop = true;

  const gain = audioContext.createGain();
  gain.gain.value = 0.25;
  whiteNoiseSource.connect(gain);
  gain.connect(output);

  whiteNoiseSource.start();

  return output.stream;
};

type Position = { x: number; y: number };

const CampusMap = ({
  position,
  setPosition,
}: {
  position: Position | undefined;
  setPosition: React.Dispatch<React.SetStateAction<Position | undefined>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onMapClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (canvas.width * (e.clientX - rect.left)) / rect.width;
      const y = (canvas.height * (e.clientY - rect.top)) / rect.height;
      setPosition({ x, y });
    },
    [setPosition],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!position) return;
    ctx.save();

    ctx.fillStyle = "white";
    ctx.translate(position.x - 50, position.y - 100);
    ctx.beginPath();
    ctx.arc(50, 31.38, 17.833, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.fill(Pin, "evenodd");

    ctx.restore();
  }, [position]);

  return (
    <MapCanvas
      ref={canvasRef}
      width={1000}
      height={1000}
      onClick={onMapClick}
    />
  );
};

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [position, setPosition] = useState<Position | undefined>(undefined);

  const [dragging, setDragging] = useState(false);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [angle, setAngle] = useState(0);

  const whiteNoise = useRef<MediaStream | null>(null);

  const frequency = useMemo(() => computeFrequency(angle), [angle]);
  const puzzleStation = PuzzleFMStations.get(frequency);
  const puzzleDistance = useMemo(() => {
    if (!position || !puzzleStation) return Infinity;
    return Math.hypot(
      position.x - puzzleStation.x,
      position.y - puzzleStation.y,
    );
  }, [position, puzzleStation]);
  const cambridgeStation = CambridgeFMStations.get(frequency);

  const currentSource = useMemo(() => {
    if (puzzleStation && puzzleDistance < PuzzleStationRadius) {
      return { type: "puzzle" as const, url: puzzleStation.url };
    }
    if (cambridgeStation) {
      return { type: "cambridge" as const, url: cambridgeStation };
    }
    return { type: "whitenoise" as const };
  }, [cambridgeStation, puzzleDistance, puzzleStation]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cleanup: (() => void) | undefined = undefined;

    switch (currentSource.type) {
      case "puzzle": {
        audio.srcObject = null;
        audio.src = currentSource.url;

        const onLoadedMetadata = () => {
          const seek = (Date.now() / 1000) % audio.duration;
          audio.currentTime = seek;
        };
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        cleanup = () => {
          audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        };

        break;
      }
      case "cambridge":
        audio.src = currentSource.url;
        audio.srcObject = null;
        break;
      case "whitenoise": {
        audio.src = "";
        audio.srcObject = whiteNoise.current;
        break;
      }
    }

    void audio.play().catch(() => {
      /* ignore */
    });

    return cleanup;
  }, [currentSource.type, currentSource.url]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // Initialize white noise stream on pointer down so that it's in response to user interaction
      if (!whiteNoise.current) {
        whiteNoise.current = makeWhiteNoiseStream();
      }

      setDragging(true);

      const dial = e.currentTarget;
      setDragStartAngle(getAngle(dial, e.clientX, e.clientY));
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      if (!dragging) return;
      e.preventDefault();
      e.stopPropagation();

      const dial = e.currentTarget;
      const angle = getAngle(dial, e.clientX, e.clientY);
      setAngle(
        (orig) => ((orig + angle - dragStartAngle + 180 + 360) % 360) - 180,
      );
      setDragStartAngle(angle);
    },
    [dragStartAngle, dragging],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      if (!dragging) return;
      e.preventDefault();
      setDragging(false);
      setAngle((a) => clampAngle(a));
    },
    [dragging],
  );

  return (
    <AuthorsNoteBlock>
      <p>
        During Mystery Hunt, teams could take their radios (or any FM radio) to
        certain locations on campus and find some unusual transmissions. If
        you’d like to attempt to solve this puzzle, you can click on the map to
        simulate walking to that location on campus and turn the FM dial to see
        what you would have heard. (For the purposes of post-solving, we are
        agnostic to which floor of the building you are on.)
      </p>

      <Container>
        <div>
          <CampusMap position={position} setPosition={setPosition} />
        </div>
        <DialContainer
          style={{ cursor: "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <DialImage
            src={dial}
            alt="The frequency dial of the radio, showing a range of 88 MHz to 108 MHz on the FM band"
          />
          <KnobImage
            alt="The frequency knob of the radio, which rotates when dragged"
            src={knob}
            style={{ transform: `rotate(${clampAngle(angle)}deg)` }}
          />
        </DialContainer>
      </Container>
      <p>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Many potential sources for this audio, most of which don't have captions */}
        <audio ref={audioRef} controls loop />
      </p>

      {/* preload all of the puzzle stations so they play fast */}
      {[...PuzzleFMStations.entries()].map(([freq, { url }]) => (
        // eslint-disable-next-line jsx-a11y/media-has-caption -- No captions for puzzle audio
        <audio key={freq} src={url} preload="auto" />
      ))}
    </AuthorsNoteBlock>
  );
};

const BlacklightAngle = (3 / 20 - 1) * 180;

type BlacklightAudioState = {
  audioContext?: AudioContext;
  output?: MediaStreamAudioDestinationNode;

  staticGain?: GainNode;
  rickrollGain?: GainNode;

  interruptAudio?: HTMLAudioElement;
  interruptTimeout?: ReturnType<typeof setTimeout>;
};

const InterruptGain = Math.pow(10, -15 / 20);

const BlacklightApp = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const staticRef = useRef<HTMLAudioElement>(null);
  const rickrollRef = useRef<HTMLAudioElement>(null);

  const [position, setPosition] = useState<Position | undefined>(undefined);

  const inRangeStation = useMemo(() => {
    if (!position) return undefined;
    const station = [...PuzzleFMStations.entries()].reduce(
      (acc, [freq, { x, y, interrupt }]) => {
        const distance = Math.hypot(position.x - x, position.y - y);
        if (distance < acc.distance) {
          return { freq, distance, interrupt };
        }
        return acc;
      },
      { freq: 0, distance: Infinity, interrupt: "" },
    );

    if (station.distance < PuzzleStationRadius) {
      return station;
    }

    return undefined;
  }, [position]);

  const { current: state } = useRef<BlacklightAudioState>({});

  useEffect(() => {
    // This ensures that we don't try to play audio before the user interacts
    // with the page
    if (!position) return;
    if (!audioRef.current) return;
    if (!staticRef.current) return;
    if (!rickrollRef.current) return;

    const staticAudio = staticRef.current;
    const rickrollAudio = rickrollRef.current;

    if (!state.audioContext) {
      state.audioContext = new AudioContext();
    }
    const { audioContext } = state;

    if (!state.output) {
      state.output = audioContext.createMediaStreamDestination();
      audioRef.current.srcObject = state.output.stream;
    }

    const { output } = state;

    if (!state.staticGain) {
      const source = audioContext.createMediaElementSource(staticAudio);
      state.staticGain = audioContext.createGain();
      state.staticGain.gain.value = 0;
      source.connect(state.staticGain);
      state.staticGain.connect(output);
    }

    const { staticGain } = state;

    if (!state.rickrollGain) {
      const source = audioContext.createMediaElementSource(rickrollAudio);
      state.rickrollGain = audioContext.createGain();
      source.connect(state.rickrollGain);
      state.rickrollGain.gain.value = 0;
      state.rickrollGain.connect(output);
    }

    const { rickrollGain } = state;

    if (inRangeStation) {
      // setup rickroll
      if (Number.isFinite(rickrollAudio.duration)) {
        rickrollAudio.currentTime =
          (Date.now() / 1000 +
            (rickrollAudio.duration * (inRangeStation.freq - 881)) / 200) %
          rickrollAudio.duration;
      }
      rickrollAudio.play().catch(() => {
        /* ignore */
      });
      rickrollGain.gain.setValueAtTime(1, audioContext.currentTime);

      const interrupt = () => {
        state.interruptAudio = new Audio(inRangeStation.interrupt);
        state.interruptAudio.addEventListener("playing", () => {
          rickrollGain.gain.setValueCurveAtTime(
            [1, InterruptGain],
            audioContext.currentTime,
            0.25,
          );
        });
        state.interruptAudio.addEventListener("ended", () => {
          rickrollGain.gain.setValueCurveAtTime(
            [InterruptGain, 1],
            audioContext.currentTime,
            0.25,
          );
        });

        const source = audioContext.createMediaElementSource(
          state.interruptAudio,
        );
        source.connect(output);

        state.interruptAudio.play().catch(() => {
          /* ignore */
        });
        state.interruptTimeout = setTimeout(interrupt, 30000);
      };
      // This is a slight kindness relative to the original firmware, which
      // would wait up to 30 seconds before the first interruption, but with the
      // post solve you don't have the break of walking between locations
      const initialDelay =
        (Date.now() + (15000 * (inRangeStation.freq - 881)) / 200) % 15000;
      state.interruptTimeout = setTimeout(interrupt, initialDelay);
    } else {
      // setup noise
      if (Number.isFinite(staticAudio.duration)) {
        staticAudio.currentTime = (Date.now() / 1000) % staticAudio.duration;
      }
      staticAudio.play().catch(() => {
        /* ignore */
      });
      state.staticGain.gain.setValueAtTime(1, audioContext.currentTime);
    }

    audioRef.current.play().catch(() => {
      /* ignore */
    });

    return () => {
      staticGain.gain.setValueAtTime(0, audioContext.currentTime);
      rickrollGain.gain.setValueAtTime(0, audioContext.currentTime);

      if (state.interruptAudio) {
        state.interruptAudio.pause();
        state.interruptAudio = undefined;
      }

      if (state.interruptTimeout) {
        clearTimeout(state.interruptTimeout);
        state.interruptTimeout = undefined;
      }
    };
  }, [position, inRangeStation, state]);

  return (
    <AuthorsNoteBlock>
      <p>
        <s>
          During Mystery Hunt, teams could take their radios (or any FM radio)
          to certain locations on campus and find some unusual transmissions. If
          you’d like to attempt to solve this puzzle, you can click on the map
          to simulate walking to that location on campus and turn the FM dial to
          see what you would have heard. (For the purposes of post-solving, we
          are agnostic to which floor of the building you are on.)
        </s>
      </p>

      <p>
        Now that you’ve found the blacklight, we’ve locked your radio to PM{" "}
        <MathMLMath>
          <MFrac>
            <MRow>
              <MN>23</MN>
              <MI>π</MI>
            </MRow>
            <MN>20</MN>
          </MFrac>
        </MathMLMath>
        , but you can still click on the map to walk to a location and see what
        you would have heard. If you’d like to go back to the FM experience, you
        can <a href="given_up">navigate to the original puzzle</a>.
      </p>

      <Container>
        <div>
          <CampusMap position={position} setPosition={setPosition} />
        </div>
        <DialContainer style={{ userSelect: "none" }}>
          <DialImage
            src={dial}
            alt="The frequency dial of the radio, showing a range of 88 MHz to 108 MHz on the FM band"
          />
          <KnobImage
            alt="The frequency knob of the radio, which rotates when dragged"
            src={knob}
            style={{ transform: `rotate(${BlacklightAngle}deg)` }}
          />
        </DialContainer>
      </Container>
      {/* eslint-disable jsx-a11y/media-has-caption -- Many potential sources for this audio, most of which don't have captions */}
      <p>
        <audio ref={audioRef} controls loop />
      </p>

      {/* preload a bunch of audio files so they play fast */}
      <audio ref={staticRef} src={pmstatic} preload="auto" loop />
      <audio ref={rickrollRef} src={rickroll} preload="auto" loop />
      {[...PuzzleFMStations.entries()].map(([freq, { interrupt }]) => (
        <audio key={freq} src={interrupt} preload="auto" />
      ))}
      {/* eslint-enable jsx-a11y/media-has-caption -- Many potential sources for this audio, most of which don't have captions */}
    </AuthorsNoteBlock>
  );
};

const slug = (window as unknown as { puzzleSlug: string }).puzzleSlug;
const elem = document.getElementById("given-up-root");
if (elem) {
  const root = createRoot(elem);
  root.render(slug === "given_up_blacklight" ? <BlacklightApp /> : <App />);
} else {
  console.error(
    "Could not mount App because #given-up-root was nowhere to be found",
  );
}

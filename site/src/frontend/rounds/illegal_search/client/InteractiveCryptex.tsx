import React, {
  type PointerEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import click from "../assets/cryptex/click.mp3";
import cryptex_base from "../assets/cryptex/cryptex_base.svg";
import unlock from "../assets/cryptex/unlock.mp3";
import { type Node } from "../types";
import playSound from "./playSound";

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const colors = [
  "#88672f", // replace with activeColor when not dragging
  "#845d30",
  "#714d2a",
  "#5d3e24",
  "#4a301e",
  "#372317",
  "#24170f",
  "#24170f",
  "#24170f",
  "#24170f",
  "#24170f",
  "#24170f",
  "#24170f",
  "#24170f",
  "#484019",
  "#484019",
  "#484019",
  "#484019",
  "#484019",
  "#484019",
  "#484019",
  "#484019",
  "#54481d",
  "#605021",
  "#6d5725",
  "#7a5f2a",
];

const activeColor = "#ac7d3c";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Wrapper = styled.div`
  position: absolute;
  width: 1920px;
  height: 1080px;
  background-image: url(${cryptex_base});
`;

const DialDiv = styled.div<{
  $dragging: boolean;
  $rotation: number;
  $offset: number;
}>`
  position: absolute;
  width: 0;
  transform-style: preserve-3d;
  cursor: ${({ $dragging }) => ($dragging ? "grabbing" : "grab")};
  top: 538px;
  left: ${({ $offset }) => $offset}px;
  transition: ${({ $dragging }) => ($dragging ? "none" : "transform 0.2s")};
`;

const TileWrapper = styled.div`
  transform-style: preserve-3d;
`;

const Tile = styled.div<{ $rotation: number }>`
  position: absolute;
  border: 4px solid black;
  height: 64px;
  line-height: 64px;
  width: 76px;
  opacity: 1;
  backface-visibility: hidden;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 40px;
  left: -38px;
  transform: rotateX(180deg) rotateY(${({ $rotation }) => $rotation}deg)
    translateZ(298px);
`;

const TileLetter = styled.div`
  transform: rotateZ(-90deg);
  height: 100%;
  line-height: 55px;
`;

function letterToRotation(letter: string): number {
  return (90 + 360 * (letters.indexOf(letter) / 26)) % 360;
}

function rotationToLetter(rotation: number): string {
  const l = letters[Math.round((((rotation + 270) % 360) / 360) * 26) % 26];
  if (l === undefined) {
    throw new Error(`Invalid rotation: ${rotation}`);
  }

  return l;
}

function colorForLetter(
  letter: string,
  dialRotation: number,
): { color1: string; color2: string; mixPct: number } {
  // Unrotated, "A" should be colored with the first color. So we take the rotation
  // difference between our letter and "A", offset it by the dial rotation, and
  // take the modulo 26 to get the color index.
  const normalizedIndex =
    mod(letterToRotation(letter) - dialRotation, 360) / 360;
  const colorIndex = (normalizedIndex * 26) % 26;
  const color1 = colors[Math.floor(colorIndex) % 26];
  const color2 = colors[Math.ceil(colorIndex) % 26];
  const mixPct = 1 - (colorIndex - Math.floor(colorIndex));

  if (color1 === undefined || color2 === undefined) {
    throw new Error(`Invalid color index: ${colorIndex}`);
  }

  return { color1, color2, mixPct };
}

function mixColors(color1: string, color2: string, weight: number): string {
  // Source: https://gist.github.com/jedfoster/7939513

  function d2h(d: number) {
    // convert a decimal value to hex
    return d.toString(16);
  }
  function h2d(h: string) {
    // convert a hex value to decimal
    return parseInt(h, 16);
  }

  let color = "#";

  for (let i = 1; i <= 6; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue

    // extract the current pairs
    const v1 = h2d(color1.substring(i, i + 2));
    const v2 = h2d(color2.substring(i, i + 2));

    // combine the current pairs from each source color, according to the specified weight
    let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

    while (val.length < 2) {
      // prepend a '0' if val results in a single digit
      val = "0" + val;
    }

    // concatenate val to our new color string
    color += val;
  }

  return color;
}

function CryptexDial({
  letter,
  setLetter,
  offset,
  solved,
}: {
  letter: string;
  setLetter: (letter: string) => void;
  offset: number;
  solved: boolean;
}) {
  const [dragging, setDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);

  const rotation = dragging ? dragRotation : letterToRotation(letter);

  const dialRef = useRef(null);
  const lastMouseY = useRef(0);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (solved) {
        return;
      }
      e.currentTarget.setPointerCapture(e.pointerId);
      lastMouseY.current = e.pageY;
      setDragging(true);
      setDragRotation(letterToRotation(letter));
    },
    [letter, solved],
  );

  const onPointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (dragging) {
        const dy = lastMouseY.current - e.pageY;
        setDragRotation((oldRotation) => {
          const newRotation = mod(oldRotation + dy * 0.22, 360);

          if (rotationToLetter(newRotation) !== rotationToLetter(oldRotation)) {
            playSound(click, { volume: 0.3 });
          }

          return newRotation;
        });

        lastMouseY.current = e.pageY;
      }
    },
    [dragging],
  );

  const onPointerUp: PointerEventHandler<HTMLDivElement> = useCallback(() => {
    setDragging(false);
    const newLetter = rotationToLetter(dragRotation);
    setLetter(newLetter);
  }, [setLetter, dragRotation]);

  return (
    <DialDiv
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      ref={dialRef}
      $dragging={dragging}
      $rotation={rotation}
      $offset={offset}
      style={{
        // Performance: we use inline styles instead of styled-components
        // for properties that change frequently (during dragging).
        transform: `rotateY(108deg) rotateX(90deg)
        rotateY(${rotation}deg)`,
      }}
    >
      <TileWrapper>
        {letters.map((l) => {
          let color: string;
          if (l === letter && !dragging) {
            color = activeColor;
          } else {
            const { color1, color2, mixPct } = colorForLetter(l, rotation);
            color = mixColors(color1, color2, mixPct * 100);
          }

          return (
            <Tile
              key={l}
              $rotation={mod(letterToRotation(l) - 90, 360)}
              style={{
                // Performance: we use inline styles instead of styled-components
                // for properties that change frequently (during dragging).
                background: color,
              }}
            >
              <TileLetter>{l}</TileLetter>
            </Tile>
          );
        })}
      </TileWrapper>
    </DialDiv>
  );
}

export default function InteractiveCryptex({
  setNode: setNode,
  setGateOpen,
}: {
  setNode: (node: Node) => void;
  setGateOpen: (open: boolean) => void;
}) {
  const [letters, setLetters] = useState([
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
  ]);

  const [solved, setSolved] = useState(false);

  const setLetter = useCallback(
    (index: number, letter: string) => {
      setLetters((letters) => {
        const newLetters = [...letters];
        newLetters[index] = letter;

        fetch("/rounds/illegal_search/locks/cryptex", {
          method: "POST",
          body: JSON.stringify({ code: newLetters.join("") }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then(async (result) => {
            if (result.ok) {
              const json = (await result.json()) as Node;
              playSound(unlock);
              setSolved(true);
              setGateOpen(true);
              setNode(json);
            }
          })
          .catch(() => {
            console.log("network error");
          });

        return newLetters;
      });
    },
    [setLetters, setNode, setGateOpen],
  );

  return (
    <Wrapper>
      {letters.map((letter, i) => (
        <CryptexDial
          key={i}
          solved={solved}
          letter={letter}
          setLetter={(l) => {
            setLetter(i, l);
          }}
          offset={i * 110 + 480}
        />
      ))}
    </Wrapper>
  );
}

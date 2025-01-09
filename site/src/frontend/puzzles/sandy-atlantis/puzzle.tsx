import React from "react";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";

const EmojiTable = styled.table`
  border-collapse: collapse;
  font-size: 2rem;
  text-align: center;
`;

const EmojiCell = styled.td`
  font-size: 2rem;
  padding: 10px;
`;

const Emoji = styled.div`
  font-size: 2rem;
`;

const Puzzle = () => {
  const emojis = [
    "🧽",
    "♋",
    "👘",
    "🪞",
    "🇵🇱",
    "🧄",
    "🏜️",
    "🍇",
    "⛪",
    "👙",
    "🦐",
    "🍊",
    "🇧🇿",
    "🦫",
    "🪟",
    "🐉",
    "🚽",
    "⚰️",
    "🧇",
    "👺",
    "🍪",
    "🍌",
    "🇸🇪",
    "🏫",
    "🎻",
    "👕",
    "🇷🇺",
    "🧮",
    "🌵",
    "📜",
    "🪲",
    "🚀",
    "🐒",
    "🎸",
    "🥕",
    "💻",
  ];

  const rows = [];
  for (let i = 0; i < emojis.length; i += 6) {
    rows.push(emojis.slice(i, i + 6));
  }

  return (
    <>
      <NotoColorEmojiFont />
      <p className="puzzle-flavor" style={{ fontStyle: "normal" }}>
        🔎♊
      </p>
      <EmojiTable>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((emoji, colIndex) => (
                <EmojiCell key={colIndex}>{emoji}</EmojiCell>
              ))}
            </tr>
          ))}
        </tbody>
      </EmojiTable>
      <hr />
      <p>
        <Emoji>🐗</Emoji>
        <Emoji>🦴</Emoji>
        <Emoji>🇹🇩</Emoji>
        <Emoji>🪸</Emoji>
        <Emoji>🔥</Emoji>
        <Emoji>🦶</Emoji>
        <Emoji>🧞</Emoji>
        <Emoji>🦁</Emoji>
        <Emoji>🤴</Emoji>
        <Emoji>🤳</Emoji>
        <Emoji>🚢</Emoji>
        <Emoji>🍣</Emoji>
        <Emoji>🐺</Emoji>
      </p>
    </>
  );
};

export default Puzzle;

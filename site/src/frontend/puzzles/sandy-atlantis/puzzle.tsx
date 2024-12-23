import React from "react";
import { styled } from "styled-components";

const EmojiTable = styled.table`
  border-collapse: collapse; /* Remove gaps between cells */
  font-size: 2rem; /* Size of emojis */
  text-align: center; /* Center the content in cells */
`;

const EmojiCell = styled.td`
  padding: 10px;
`;

const Emoji = styled.div`
  font-size: 2rem; /* Size of the emoji */
`;

const HR = styled.hr``;

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
      <HR />
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

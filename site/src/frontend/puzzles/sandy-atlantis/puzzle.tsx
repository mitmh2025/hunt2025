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

const Puzzle = () => {
  // const emojis = [
  //   "🧽",
  //   "♋",
  //   "👘",
  //   "🪞",
  //   "🇵🇱",
  //   "🧄",
  //   "🏜️",
  //   "🍇",
  //   "⛪",
  //   "👙",
  //   "🦐",
  //   "🍊",
  //   "🇧🇿",
  //   "🦫",
  //   "🪟",
  //   "🐉",
  //   "🚽",
  //   "⚰️",
  //   "🧇",
  //   "👺",
  //   "🍪",
  //   "🍌",
  //   "🇸🇪",
  //   "🏫",
  //   "🎻",
  //   "👕",
  //   "🇷🇺",
  //   "🧮",
  //   "🌵",
  //   "📜",
  //   "🪲",
  //   "🚀",
  //   "🐒",
  //   "🎸",
  //   "🥕",
  //   "💻",
  // ];

  const tableImageUrls = Array.from({ length: 36 }, (_, i) => `${i + 1}.png`);
  const columnImageUrls = Array.from({ length: 13 }, (_, i) => `${i + 37}.png`);

  const rows = [];
  for (let i = 0; i < tableImageUrls.length; i += 6) {
    rows.push(tableImageUrls.slice(i, i + 6));
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
              {row.map((imageUrl, colIndex) => (
                <EmojiCell key={colIndex}>
                  <img
                    src={imageUrl}
                    alt={`Image ${rowIndex * 6 + colIndex + 1}`}
                    style={{ width: "90px", height: "90px" }}
                  />
                </EmojiCell>
              ))}
            </tr>
          ))}
        </tbody>
      </EmojiTable>
      <hr />
      <p>
        {columnImageUrls.map((imageUrl, index) => (
          <EmojiCell key={index}>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              style={{ width: "90px", height: "90px" }}
            />
          </EmojiCell>
        ))}
        {/* <Emoji>🐗</Emoji>
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
        <Emoji>🐺</Emoji> */}
      </p>
    </>
  );
};

export default Puzzle;

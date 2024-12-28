import React from "react";
import { styled } from "styled-components";
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";
import img5 from "./assets/5.png";
import img6 from "./assets/6.png";
import img7 from "./assets/7.png";
import img8 from "./assets/8.png";
import img9 from "./assets/9.png";
import img10 from "./assets/10.png";
import img11 from "./assets/11.png";
import img12 from "./assets/12.png";
import img13 from "./assets/13.png";
import img14 from "./assets/14.png";
import img15 from "./assets/15.png";
import img16 from "./assets/16.png";
import img17 from "./assets/17.png";
import img18 from "./assets/18.png";
import img19 from "./assets/19.png";
import img29 from "./assets/20.png";
import img20 from "./assets/21.png";
import img21 from "./assets/22.png";
import img22 from "./assets/23.png";
import img23 from "./assets/24.png";
import img24 from "./assets/25.png";
import img25 from "./assets/26.png";
import img26 from "./assets/27.png";
import img27 from "./assets/28.png";
import img28 from "./assets/29.png";
import img30 from "./assets/30.png";
import img31 from "./assets/31.png";
import img32 from "./assets/32.png";
import img33 from "./assets/33.png";
import img34 from "./assets/34.png";
import img35 from "./assets/35.png";
import img36 from "./assets/36.png";
import img37 from "./assets/37.png";
import img38 from "./assets/38.png";
import img39 from "./assets/39.png";
import img40 from "./assets/40.png";
import img41 from "./assets/41.png";
import img42 from "./assets/42.png";
import img43 from "./assets/43.png";
import img44 from "./assets/44.png";
import img45 from "./assets/45.png";
import img46 from "./assets/46.png";
import img47 from "./assets/47.png";
import img48 from "./assets/48.png";
import img49 from "./assets/49.png";

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
  const gridImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
    img25,
    img26,
    img27,
    img28,
    img29,
    img30,
    img31,
    img32,
    img33,
    img34,
    img35,
    img36,
  ];
  const columnImages = [
    img37,
    img38,
    img39,
    img40,
    img41,
    img42,
    img43,
    img44,
    img45,
    img46,
    img47,
    img48,
    img49,
  ];

  const rows = [];
  for (let i = 0; i < gridImages.length; i += 6) {
    rows.push(gridImages.slice(i, i + 6));
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
              {row.map((image, colIndex) => (
                <EmojiCell key={colIndex}>
                  <img
                    src={image}
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
      {columnImages.map((image, index) => (
        <Emoji key={index}>
          <img
            src={image}
            alt={`Image ${index + 37}`}
            style={{ width: "90px", height: "90px" }}
          />
        </Emoji>
      ))}
    </>
  );
};

export default Puzzle;

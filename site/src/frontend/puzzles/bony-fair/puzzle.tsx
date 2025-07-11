import React from "react";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import chart1 from "./assets/chart1.png";
import chart10 from "./assets/chart10.png";
import chart11 from "./assets/chart11.png";
import chart12 from "./assets/chart12.png";
import chart13 from "./assets/chart13.png";
import chart14 from "./assets/chart14.png";
import chart2 from "./assets/chart2.png";
import chart3 from "./assets/chart3.png";
import chart4 from "./assets/chart4.png";
import chart5 from "./assets/chart5.png";
import chart6 from "./assets/chart6.png";
import chart7 from "./assets/chart7.png";
import chart8 from "./assets/chart8.png";
import chart9 from "./assets/chart9.png";
import grid from "./assets/grid.png";

export const CHART_ALT_TEXT = "A multicolored pie chart";

const CHART_TOP_LEFT = "⚪⚪";
const CHART_TOP = "➖⚪";
const CHART_LEFT = "⚪➖";

const CHART_MAIN_GRID = [
  [
    " ",
    "🔵",
    "🔵",
    "🔵",
    "🔵",
    "🔵",
    "🟡",
    "🟡",
    "🟡",
    "🟡",
    "⚪A",
    "⚪A",
    "⚪A",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
    "⚪",
  ],
  [
    "🔴A",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "🔴H",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "🔴",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "🔴",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "🌊",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
  ],
  [
    "🔴",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "🟢",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "🟢",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "🟢",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
  ],
  [
    "🟢",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪M",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
  ],
  [
    "⚪A",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪P",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "⏺️",
  ],
  [
    "⚪",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "🌊",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
  ],
  [
    "⚪",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "🌊",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "✅",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "✅",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
  ],
  [
    "⚪",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
  ],
  [
    "⚪",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "❌",
    "✅",
    "❌",
  ],
];

const EQUATIONS = [
  ["✅ = 1️⃣", "🔴🚫🔴", "⚪➡️🔴🟢🔵🟡"],
  ["❌ = 0️⃣", "🔴↔️🟢", "⚪➡️🔠"],
  ["⏺️ = 0️⃣", "🔴↔️🔵", ""],
  ["🌊 = 0️⃣", "🔴↔️🟡", ""],
];

const MarginImage = styled(LinkedImage)`
  display: block;
  margin-bottom: 3em;
`;

const SizedImage = styled(LinkedImage)`
  display: block;
  margin: 1em auto;
  width: 150px;
`;

const StyledTable = styled.table`
  td {
    text-align: center;
    vertical-align: middle;
  }
`;

const Red = styled.td`
  background-color: #f4cccc;
`;

const Blue = styled.td`
  background-color: #c9daf8;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <NotoColorEmojiFont />
      <MarginImage
        src={grid}
        alt="A large grid filled with ✅, ❌, 🌊 and ⏺️ emoji. Colored circles, some annotated with letters, line the edges of the grid. There are some emoji equations below the grid"
      />
      <StyledTable className={COPY_ONLY_CLASS}>
        <tr>
          <td>{CHART_TOP_LEFT}</td>
          <td colSpan={26}>{CHART_TOP}</td>
        </tr>
        <tr>
          <td rowSpan={26}>{CHART_LEFT}</td>
          {CHART_MAIN_GRID.slice(0, 1).map((row) =>
            row.map((char, j) => <td key={j}>{char}</td>),
          )}
        </tr>
        {CHART_MAIN_GRID.slice(1).map((row, i) => (
          <tr key={i}>
            {row.map((char, j) => {
              if (j > 0 && i % 2 === 1) {
                return <Red key={j}>{char}</Red>;
              } else if (j > 0 && j % 2 === 0) {
                return <Blue key={j}>{char}</Blue>;
              } else {
                return <td key={j}>{char}</td>;
              }
            })}
          </tr>
        ))}
      </StyledTable>
      <br className={COPY_ONLY_CLASS} />
      <br className={COPY_ONLY_CLASS} />
      <table className={COPY_ONLY_CLASS}>
        {EQUATIONS.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </table>
      <SizedImage src={chart1} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart2} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart3} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart4} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart5} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart6} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart7} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart8} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart9} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart10} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart11} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart12} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart13} alt={CHART_ALT_TEXT} />
      <SizedImage src={chart14} alt={CHART_ALT_TEXT} />
    </>
  );
};

export default Puzzle;

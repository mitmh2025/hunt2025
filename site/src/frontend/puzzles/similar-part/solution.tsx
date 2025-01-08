import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import untitled1 from "./assets/untitled1.jpg";
import untitled2 from "./assets/untitled2.png";
import untitled3 from "./assets/untitled3.png";
import untitled4 from "./assets/untitled4.png";
import untitled5 from "./assets/untitled5.png";
import untitled6 from "./assets/untitled6.png";
import untitled7 from "./assets/untitled7.jpg";

const DATA: [string, string, string, number, string, string, string][] = [
  [
    untitled1,
    "Untitled 1",
    "Life and Order",
    2018,
    "Inside Out",
    "The Taxonomist",
    "TAKEOUT",
  ],
  [
    untitled2,
    "Untitled 2",
    "Left Out",
    2020,
    "Penny Park",
    "Gallery of Tomorrow",
    "FINGERPAINTS",
  ],
  [
    untitled3,
    "Untitled 3",
    "Setec Astronomy",
    2017,
    "D&D",
    "The Puzzle at the End of This Book",
    "MAKEUP",
  ],
  [
    untitled4,
    "Untitled 4",
    "Life and Order",
    2018,
    "Inside Out",
    "Murder at the Asylum",
    "ALTERNATE",
  ],
  [
    untitled5,
    "Untitled 5",
    "One Fish Two Fish Random Fish Blue Fish",
    2015,
    "20,000 Puzzles Under the Sea",
    "Tickle Me Pink",
    "STOLEN",
  ],
  [
    untitled6,
    "Untitled 6",
    "Setec Astronomy",
    2017,
    "D&D",
    "Lost in Translation",
    "DIAMOND",
  ],
  [
    untitled7,
    "Untitled 7",
    "Palindrome",
    2022,
    "Bookspace",
    "Altered Transmissions",
    "HISTORY",
  ],
];

const StyledTable = styled.table`
  border-spacing: 8px 0;
  table-layout: fixed;
  th:first-child {
    width: 80px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle was presented as a series of paintings on display at the
        Gala. The flavor text suggests that this is the Museum of Mystery Hunt.
        Each painting has a plaque with a numbered title (Untitled 1-7) and a
        year. Each painting illustrates the title of a specific puzzle from that
        year. Taking the answers of those puzzles in the order, you get an
        instruction phrase:
      </p>
      <p>
        <Mono>
          TAKEOUT FINGERPAINTS MAKEUP ALTERNATE STOLEN DIAMOND HISTORY
        </Mono>
      </p>
      <p>
        Teams that submit artwork to us then receive the final answer:{" "}
        <PuzzleAnswer>FUR COAT</PuzzleAnswer>.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Our Title</th>
            <th>Writing Team</th>
            <th>Year</th>
            <th>Hunt</th>
            <th>Title</th>
            <th>Answer</th>
          </tr>
          {DATA.map(([href, untitled, team, year, hunt, title, answer], i) => (
            <tr key={i}>
              <td>
                <a href={href} target="_blank" rel="noreferrer">
                  {untitled}
                </a>
              </td>
              <td>{team}</td>
              <td>{year}</td>
              <td>{hunt}</td>
              <td>{title}</td>
              <td>
                <Mono>{answer}</Mono>
              </td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;

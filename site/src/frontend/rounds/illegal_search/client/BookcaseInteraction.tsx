import React from "react";
import { styled } from "styled-components";
import dark_wood_texture from "../assets/bookcase/dark_wood_texture.jpg";
import bookcaseData from "./bookcaseData";
import { draggable_cursor } from "./cursors";

const BookcaseContainer = styled.div`
  width: 840px;
  min-width: 840px;
  background-image: url(${dark_wood_texture});
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  position: absolute;
  left: 600px;
  bottom: 0;
`;

const BookcaseTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  & td {
    padding: 0;
    line-height: 0;
  }
`;

const BookcaseShelf = styled.tbody`
  background-blend-mode: darken;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px inset;

  // Two backgrounds: one for web and one for Google Sheets
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0% 100%);
  background-color: transparent;

  & tr:first-child td {
    padding-top: 1em;
    width: 62px;
  }

  &:last-child tr {
    border-bottom: none;
  }
`;

const BookcaseShelfRow = styled.tr`
  background-color: transparent;
  height: 10px;
`;

const BookcaseRow = styled.tr`
  width: 800px;
  height: 94px;
`;

const BookcaseExtraBookRow = styled(BookcaseRow)`
  height: 62px;
`;

const BookcaseSpacer = styled.td`
  width: 100%;
`;

const Book = styled.td<{
  $color: string;
  $pulled?: boolean;
  $interactive?: boolean;
}>`
  position: relative;

  transition: all 0.2s ease-in-out;
  ${({ $pulled }) =>
    $pulled &&
    `
    transform: translate(-16px, 10px);
    filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.5));
  `}

  & .spine {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 5px;
    font-size: 14px;
    line-height: 1;
    text-align: center;
    font-family: "Hanken Grotesk", sans-serif;
    color: ${({ $color }) => ($color === "#AC950F" ? "#3e2d0c" : "#ffeaca")};
    text-shadow:
      -0.5px 0.5px rgba(255, 255, 255, 0.3),
      0.5px -0.5px rgba(0, 0, 0, 0.8);
    border: 3px solid black;

    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 17%,
        rgba(255, 255, 255, 0.15) 19%,
        rgba(0, 0, 0, 0.15) 21%,
        rgba(0, 0, 0, 0) 23% 37%,
        rgba(255, 255, 255, 0.15) 39%,
        rgba(0, 0, 0, 0.15) 41%,
        rgba(0, 0, 0, 0) 43% 57%,
        rgba(255, 255, 255, 0.15) 59%,
        rgba(0, 0, 0, 0.15) 61%,
        rgba(0, 0, 0, 0) 63% 77%,
        rgba(255, 255, 255, 0.15) 79%,
        rgba(0, 0, 0, 0.15) 81%,
        rgba(0, 0, 0, 0) 83%
      ),
      linear-gradient(
        to top,
        ${({ $color }) => $color} 0%,
        ${({ $color }) => $color} 100%
      );

    // Note: This background-color rule must come *after* the more stylized
    // background rule above for copy-paste into Google Sheets. Sheets uses
    // the last rule to determine styling, and can't handle gradients.
    background-color: ${({ $color }) => $color};

    writing-mode: vertical-rl;
    transform: rotate(180deg);
    height: 140px;
    width: 62px;

    ${({ $interactive }) =>
      $interactive &&
      `
      user-select: none;
      &:hover {
        cursor: ${draggable_cursor};
      }
    `}

    span {
      &.author {
        font-size: 12px;
        margin-right: 6px;
      }
    }
  }

  & .top {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 62px;
    height: ${({ $pulled }) => ($pulled ? 18 : 8)}px;
    transform-origin: bottom;
    transform: translate(0, -140px) skewX(-60deg);
    background: white;
    background-image: linear-gradient(90deg, white 90%, gray 10%);
    background-size: 5px 5px;
    border-color: black;
    border-style: solid;
    border-width: 0 3px;
    transition: all 0.2s ease-in-out;
  }

  & .cover {
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ $pulled }) => ($pulled ? 31 : 14)}px;
    height: 140px;
    transform-origin: left;
    transform: translate(62px, 0) skewY(-30deg);
    background: ${({ $color }) => $color};
    border-color: black;
    border-style: solid;
    border-width: 3px 0;
    transition: all 0.2s ease-in-out;
  }
`;

const HorizontalBook = styled.td<{
  $color: string;
  $interactive?: boolean;
}>`
  text-align: right;
  vertical-align: bottom;
  position: relative;
  overflow: hidden;

  & .spine {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 5px;
    font-size: 14px;
    line-height: 1;
    text-align: left;
    font-family: "Hanken Grotesk", sans-serif;
    color: #ffeaca;
    text-shadow:
      0.5px 0.5px rgba(255, 255, 255, 0.3),
      -0.5px -0.5px rgba(0, 0, 0, 0.8);
    border: 3px solid black;
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 17%,
        rgba(255, 255, 255, 0.15) 19%,
        rgba(0, 0, 0, 0.15) 21%,
        rgba(0, 0, 0, 0) 23% 37%,
        rgba(255, 255, 255, 0.15) 39%,
        rgba(0, 0, 0, 0.15) 41%,
        rgba(0, 0, 0, 0) 43% 57%,
        rgba(255, 255, 255, 0.15) 59%,
        rgba(0, 0, 0, 0.15) 61%,
        rgba(0, 0, 0, 0) 63% 77%,
        rgba(255, 255, 255, 0.15) 79%,
        rgba(0, 0, 0, 0.15) 81%,
        rgba(0, 0, 0, 0) 83%
      ),
      linear-gradient(
        to top,
        ${({ $color }) => $color} 0%,
        ${({ $color }) => $color} 100%
      );
    // See above about Google Sheets
    background-color: ${({ $color }) => $color};
    z-index: 1;

    width: 140px;
    height: 62px;

    span {
      &.author {
        font-size: 12px;
        margin-top: 6px;
      }
    }

    ${({ $interactive }) =>
      $interactive &&
      `
      user-select: none;
    `}
  }

  & .cover {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 140px;
    height: 14px;
    transform-origin: bottom;
    transform: translate(0, -62px) skewX(-60deg);
    background-color: ${({ $color }) => $color};
    border-color: black;
    border-style: solid;
    border-width: 3px 3px 0 3px;
  }
`;

export default function BookcaseInteraction({
  state,
  handleClick,
  interactive,
  style = {},
}: {
  state: boolean[][];
  handleClick: (i: number, j: number) => void;
  interactive: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <BookcaseContainer style={style}>
      <BookcaseTable>
        {bookcaseData.rows.map((shelf, i) => {
          const extraBooks = bookcaseData.extraRows[i] ?? [];
          const rowSpan = extraBooks.length > 0 ? extraBooks.length : 1;
          return (
            <BookcaseShelf key={i}>
              <BookcaseRow>
                {shelf.map((book, j) => {
                  const bookState = state[i]?.[j] ?? false;
                  const style = { fontSize: book.size };
                  return (
                    <Book
                      key={j}
                      rowSpan={rowSpan}
                      $color={book.color}
                      $pulled={bookState}
                      $interactive={interactive}
                      onClick={() => {
                        handleClick(i, j);
                      }}
                      data-title={book.title}
                    >
                      <span className="spine" style={style}>
                        <div className="title">
                          {book.title}
                          <br />
                        </div>
                        <div className="author">{book.author}</div>
                      </span>
                      <span className="top" />
                      <span className="cover" />
                    </Book>
                  );
                })}
                {extraBooks.length === 0 && <BookcaseSpacer />}
                {extraBooks.slice(0, 1).map((book, j) => {
                  const style = { fontSize: book.size };
                  return (
                    <HorizontalBook
                      colSpan={3}
                      key={j}
                      $color={book.color}
                      $interactive={interactive}
                      style={{ zIndex: 1 }}
                      data-title={book.title}
                    >
                      <span className="spine" style={style}>
                        <div className="title">
                          {book.title}
                          <br />
                        </div>
                        <div className="author">{book.author}</div>
                      </span>
                      <span className="cover" />
                    </HorizontalBook>
                  );
                })}
              </BookcaseRow>
              {extraBooks.slice(1).map((book, j) => {
                const style = { fontSize: book.size };
                return (
                  <BookcaseExtraBookRow key={j}>
                    <HorizontalBook colSpan={3} $color={book.color}>
                      <span className="spine" style={style}>
                        <div className="title">
                          {book.title}
                          <br />
                        </div>
                        <div className="author">{book.author}</div>
                      </span>
                      <span className="cover" />
                    </HorizontalBook>
                  </BookcaseExtraBookRow>
                );
              })}
              <BookcaseShelfRow />
            </BookcaseShelf>
          );
        })}
      </BookcaseTable>
    </BookcaseContainer>
  );
}

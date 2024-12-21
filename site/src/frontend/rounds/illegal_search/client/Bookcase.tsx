import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../../lib/api/client";
import book_pull from "../assets/bookcase/book_pull.mp3";
import book_push from "../assets/bookcase/book_push.mp3";
import dark_wood_texture from "../assets/bookcase/dark_wood_texture.jpg";
import unlock from "../assets/bookcase/unlock.mp3";
import { type Node } from "../types";
import bookcaseData from "./bookcaseData";
import { draggable_cursor } from "./cursors";
import playSound from "./playSound";

const BookcaseContainer = styled.div`
  width: 840px;
  background-image: url(${dark_wood_texture});
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  position: absolute;
  left: 600px;
  bottom: 0;
  display: block;
`;

const BookcaseShelf = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  padding-top: 1em;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px inset;
  margin-bottom: 10px;
  width: 800px;

  &:last-child {
    border-bottom: none;
  }
`;

const Book = styled.div<{
  $color: string;
  $direction?: string;
  $pulled?: boolean;
  $interactive?: boolean;
}>`
  display: flex;
  flex-direction: column-reverse;
  position: relative;

  transition: all 0.2s ease-in-out;
  ${({ $pulled }) =>
    $pulled &&
    `
    transform: translate(-10px, 10px);
  `}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.2s ease-in-out;
    box-shadow: ${({ $pulled }) =>
      $pulled ? "0px 17px 16px -11px #fff, 0px -16px 16px -11px #fff" : "none"};
  }

  & .spine {
    position: relative;
    padding: 10px 5px;
    font-size: 14px;
    line-height: 1;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: Garamond, serif;
    color: ${({ $color }) => ($color === "#AC950F" ? "#3e2d0c" : "#ffeaca")};
    text-shadow:
      -0.5px 0.5px rgba(255, 255, 255, 0.3),
      0.5px -0.5px rgba(0, 0, 0, 0.8);
    border: 3px solid black;

    background-color: ${({ $color }) => $color};
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

    writing-mode: vertical-rl;
    transform: rotate(180deg);
    height: 140px;
    width: 62px;

    ${(props) => {
      if (props.$interactive && props.$direction !== "horizontal") {
        return `
        &:hover {
          cursor: ${draggable_cursor};
        }
    `;
      }
      return null;
    }};

    span {
      display: block;
      &.author {
        font-size: 12px;
        margin-right: 6px;
      }
    }
  }

  & .top {
    position: absolute;
    background: white;
    background-image: linear-gradient(90deg, white 90%, gray 10%);
    background-size: 5px 5px;
    width: 62px;
    height: 8px;
    transform-origin: bottom;
    transform: translate(0, -140px) skewX(-60deg);
    border-color: black;
    border-style: solid;
    border-width: 3px 3px 0 3px;
  }

  & .cover {
    background: ${({ $color }) => $color};
    width: 14px;
    height: 140px;
    position: absolute;
    transform-origin: left;
    transform: translate(62px, 0) skewY(-30deg);
    border-color: black;
    border-style: solid;
    border-width: 3px 3px 3px 0;
  }
`;

const BookcaseShelfExtras = styled.div`
  align-self: stretch;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
`;

const HorizontalBook = styled.div<{
  $color: string;
}>`
  & .spine {
    position: relative;
    padding: 10px 5px;
    font-size: 14px;
    line-height: 1;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: left;
    font-family: Garamond, serif;
    color: #ffeaca;
    text-shadow:
      0.5px 0.5px rgba(255, 255, 255, 0.3),
      -0.5px -0.5px rgba(0, 0, 0, 0.8);
    border: 3px solid black;
    background-color: ${({ $color }) => $color};
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
    z-index: 1;

    width: 140px;
    height: 62px;
    padding: 0 5px;

    span {
      display: block;
      &.author {
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }

  & .cover {
    position: absolute;
    width: 140px;
    height: 14px;
    background-color: ${({ $color }) => $color};
    transform-origin: bottom;
    transform: translate(0, -76px) skewX(-60deg);
    border-color: black;
    border-style: solid;
    border-width: 3px 3px 0 3px;
  }
`;

export function BookcaseInteraction({
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
      {bookcaseData.rows.map((shelf, i) => {
        return (
          <BookcaseShelf key={i}>
            {shelf.map((book, j) => {
              const bookState = state[i]?.[j] ?? false;
              const style = { fontSize: book.size };
              return (
                <Book
                  key={j}
                  $color={book.color}
                  $pulled={bookState}
                  $interactive={interactive}
                  onClick={() => {
                    handleClick(i, j);
                  }}
                >
                  <div className="spine" style={style}>
                    <span className="title">
                      {book.title}
                      <br />
                    </span>
                    <span className="author">{book.author}</span>
                  </div>
                  <div className="top" />
                  <div className="cover" />
                </Book>
              );
            })}
            {bookcaseData.extraRows[i] && (
              <>
                <div style={{ flexGrow: 1 }} />
                <BookcaseShelfExtras>
                  {bookcaseData.extraRows[i]?.map((book, j) => {
                    const style = { fontSize: book.size };
                    return (
                      <HorizontalBook key={j} style={style} $color={book.color}>
                        <div className="spine">
                          <span className="title">
                            {book.title}
                            <br />
                          </span>
                          <span className="author">{book.author}</span>
                        </div>
                        <div className="cover" />
                      </HorizontalBook>
                    );
                  })}
                </BookcaseShelfExtras>
              </>
            )}
          </BookcaseShelf>
        );
      })}
    </BookcaseContainer>
  );
}

const initialState = bookcaseData.rows.map((shelf) => shelf.map(() => false));

export default function Bookcase({
  setNode,
  teamState,
  navigate,
}: {
  setNode: (node: Node) => void;
  teamState: TeamHuntState;
  navigate: (destId: string) => void;
}) {
  const [gateOpen, setGateOpen] = useState(() => {
    return teamState.rounds.illegal_search?.gates?.includes("isg16") ?? false;
  });

  const [state, setState] = useState(initialState);

  const handleClick = useCallback(
    (i: number, j: number) => {
      if (gateOpen) {
        return;
      }

      const oldVal = state[i]?.[j];

      if (oldVal) {
        playSound(book_push, { volume: 0.5 });
      } else {
        playSound(book_pull, { volume: 0.5 });
      }

      const newState = state.map((row, newI) =>
        newI === i ? row.map((book, newJ) => (newJ === j ? !book : book)) : row,
      );
      setState(newState);

      const code = newState
        .map((row) => row.map((book) => (book ? 1 : 0)).join(""))
        .join("");

      fetch("/rounds/illegal_search/locks/bookcase", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(async (result) => {
          if (result.ok) {
            const json = (await result.json()) as Node;
            setGateOpen(true);
            playSound(unlock);
            setNode(json);

            // Allow time for the books to slide back into place and the
            // unlock sound to play before zooming back out
            setTimeout(() => {
              navigate("main_north");
            }, 2000);
          }
        })
        .catch(() => {
          console.log("network error");
        });
    },
    [gateOpen, state, setNode, navigate],
  );

  return (
    <>
      <BookcaseInteraction
        state={gateOpen ? initialState : state}
        interactive={!gateOpen}
        handleClick={handleClick}
      />
    </>
  );
}

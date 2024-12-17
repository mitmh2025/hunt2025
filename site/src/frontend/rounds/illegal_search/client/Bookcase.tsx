import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../../lib/api/client";
import book_pull from "../assets/bookcase/book_pull.mp3";
import book_push from "../assets/bookcase/book_push.mp3";
import dark_wood_texture from "../assets/bookcase/dark_wood_texture.jpg";
import leather_texture from "../assets/bookcase/leather_texture.png";
import unlock from "../assets/bookcase/unlock.mp3";
import { type Node } from "../types";
import bookcaseData from "./bookcaseData";
import playSound from "./playSound";

const BookcaseContainer = styled.div`
  width: 840px;
  background-image: url(${dark_wood_texture});
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  position: absolute;
  left: 600px;
`;

const BookcaseShelf = styled.div`
  position: relative;
  padding-top: 1em;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px inset;
  margin-bottom: 10px;

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
  position: relative;
  padding: 10px 5px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Garamond, serif;
  color: #ffeaca;
  text-shadow:
    -0.5px -0.5px rgba(255, 255, 255, 0.3),
    0.5px 0.5px rgba(0, 0, 0, 0.8);
  border: 3px inset rgba(0, 0, 0, 0.5);
  background-image: url(${leather_texture});
  background-blend-mode: multiply;

  ${(props) => {
    if (props.$direction === "horizontal") {
      return `
        width: 140px;
        height: 62px;
        padding: 0 5px;
        justify-content: left;
        text-align: left;
        border-style: outset;
      `;
    } else {
      return `
        writing-mode: vertical-rl;
        transition: all 0.2s ease-in-out;
        transform: rotate(180deg) scale(1);
        height: 140px;
        width: 62px;
      `;
    }
  }}

  ${(props) => {
    if (props.$pulled) {
      return `
        transition: all 0.2s ease-in-out;
        transform: rotate(180deg) scale(1.1); /* Standard */
        border-radius: 1px;
        z-index: 10;


        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          box-shadow: 0px 17px 16px -11px #fff, 0px -16px 16px -11px #fff;
        }
      `;
    }
    return null;
  }}

${(props) => {
    if (props.$interactive && props.$direction !== "horizontal") {
      return `
         &:hover {
          cursor: pointer;
          z-index: 9;
        }
      `;
    }
    return null;
  }}

  ${(props) => {
    if (props.$color === "R") {
      return `background-color: #740029;`;
    } else if (props.$color === "O") {
      return `background-color: #A25600;`;
    } else if (props.$color === "Y") {
      return `background-color: #AC950F;`;
    } else if (props.$color === "G") {
      return `background-color: #306B00;`;
    } else if (props.$color === "B") {
      return `background-color: #233E6C;`;
    } else if (props.$color === "I") {
      return `background-color: #452486;`;
    } else if (props.$color === "V") {
      return `background-color: #7A217A;`;
    }
    return null;
  }}
`;

const BookcaseShelfExtras = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 150px;
`;

function BookcaseInteraction({
  state,
  handleClick,
  interactive,
}: {
  state: boolean[][];
  handleClick: (i: number, j: number) => void;
  interactive: boolean;
}) {
  return (
    <BookcaseContainer>
      {bookcaseData.rows.map((shelf, i) => {
        return (
          <BookcaseShelf key={i}>
            {shelf.map((book, j) => {
              const bookState = state[i]?.[j] ?? false;

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
                  {book.title}
                  <br />
                  {book.author}
                </Book>
              );
            })}
            <BookcaseShelfExtras>
              {bookcaseData.extraRows[i]?.map((book, j) => {
                return (
                  <Book key={j} $color={book.color} $direction="horizontal">
                    {book.title}
                    <br />
                    {book.author}
                  </Book>
                );
              })}
            </BookcaseShelfExtras>
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

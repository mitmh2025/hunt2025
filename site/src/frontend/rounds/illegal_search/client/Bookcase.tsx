import React, { useCallback, useState } from "react";
import { type TeamHuntState } from "../../../../../lib/api/client";
import book_pull from "../assets/bookcase/book_pull.mp3";
import book_push from "../assets/bookcase/book_push.mp3";
import unlock from "../assets/bookcase/unlock.mp3";
import { type Node } from "../types";
import BookcaseInteraction from "./BookcaseInteraction";
import bookcaseData from "./bookcaseData";
import { submitLock } from "./clientState";
import playSound from "./playSound";

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

      submitLock("bookcase", code)
        .then((result) => {
          if (result) {
            setGateOpen(true);
            playSound(unlock);
            setNode(result);

            // Allow time for the books to slide back into place and the
            // unlock sound to play before zooming back out
            setTimeout(() => {
              navigate("main_north");
            }, 2000);
          }
        })
        .catch(() => {
          console.log("unexpected error");
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

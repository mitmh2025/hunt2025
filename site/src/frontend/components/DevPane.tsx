import React from "react";
import type { TeamState } from "../../../lib/api/client.js";
import HUNT from "../../huntdata";
import type { PuzzleSlot, Round } from "../../huntdata/types";
import { PUZZLES } from "../puzzles";

const SHOW_DEV_PANE = true;

function countsForRound(
  round: Round,
  teamState: TeamState,
): {
  locked: number;
  unlockable: number;
  unlocked: number;
  solved: number;
} {
  const roundState = teamState.rounds[round.slug];
  return round.puzzles
    .map((puzzleSlot) => {
      const slug = roundState?.slots[puzzleSlot.id]?.slug ?? puzzleSlot.slug;
      const puzzleState = slug ? teamState.puzzles[slug] : undefined;
      let locked = 0;
      let unlockable = 0;
      let unlocked = 0;
      let solved = 0;
      if (puzzleState) {
        if (puzzleState.locked === "locked") {
          locked += 1;
        } else if (puzzleState.locked === "unlockable") {
          unlockable += 1;
        } else if (puzzleState.answer) {
          // implies puzzleState.locked === "unlocked"
          solved += 1;
        } else {
          unlocked += 1;
        }
      } else {
        locked += 1;
      }
      return { locked, unlockable, unlocked, solved };
    })
    .reduce(
      (acc, next) => {
        return {
          locked: acc.locked + next.locked,
          unlockable: acc.unlockable + next.unlockable,
          unlocked: acc.unlocked + next.unlocked,
          solved: acc.solved + next.solved,
        };
      },
      {
        locked: 0,
        unlockable: 0,
        unlocked: 0,
        solved: 0,
      },
    );
}

function colorForPuzzle(puzzleState: TeamState["puzzles"][""] | undefined) {
  if (puzzleState?.locked === "locked") {
    // If visible: gray
    return "gray";
  } else if (puzzleState?.locked === "unlockable") {
    // If unlockable: light gray
    return "lightgray";
  } else if (puzzleState?.locked === "unlocked") {
    // If unlocked:
    //   if solved: green
    //   otherwise: white
    if (puzzleState.answer) {
      return "green";
    } else {
      return "white";
    }
  } else {
    return "black";
  }
}

const PuzzleBox = ({
  slot,
  slug,
  teamState,
}: {
  slot: PuzzleSlot;
  slug: string | undefined;
  teamState: TeamState;
}) => {
  let title = slot.id;
  if (slug !== undefined) {
    const puzzle = PUZZLES[slug];
    if (puzzle) {
      title = puzzle.title;
    }
  }
  const puzzleState = slug ? teamState.puzzles[slug] : undefined;
  const bgcolor = colorForPuzzle(puzzleState);
  const size = slot.is_meta ? "12px" : "8px";
  const box = (
    <div
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: bgcolor,
        border: `1px solid ${bgcolor}`,
        margin: "2px",
      }}
      title={title}
    />
  );
  if (slug) {
    return (
      <a key={slot.id} href={`/puzzles/${slug}`}>
        {box}
      </a>
    );
  }

  return box;
};

const RoundsSection = ({ teamState }: { teamState: TeamState }) => {
  const rounds = HUNT.rounds.map((round) => {
    const roundState = teamState.rounds[round.slug];
    const metaCells = round.puzzles
      .filter((puzzleSlot) => puzzleSlot.is_meta)
      .map((puzzleSlot) => {
        const slug = roundState?.slots[puzzleSlot.id]?.slug ?? puzzleSlot.slug;
        return (
          <PuzzleBox
            key={puzzleSlot.id}
            slot={puzzleSlot}
            slug={slug}
            teamState={teamState}
          />
        );
      });
    const puzzleCells = round.puzzles
      .filter((puzzleSlot) => !puzzleSlot.is_meta)
      .map((puzzleSlot) => {
        const slug = roundState?.slots[puzzleSlot.id]?.slug ?? puzzleSlot.slug;
        return (
          <PuzzleBox
            key={puzzleSlot.id}
            slot={puzzleSlot}
            slug={slug}
            teamState={teamState}
          />
        );
      });
    const counts = countsForRound(round, teamState);
    return (
      <div key={round.slug}>
        <h4 style={{ margin: 0, borderTop: "1px solid #888" }}>
          <a href={`/rounds/${round.slug}`}>{round.title}</a>{" "}
          <span
            style={{ fontSize: "12px" }}
            title={`${counts.locked} locked\n${counts.unlockable} unlockable\n${counts.unlocked} open\n${counts.solved} solved`}
          >
            {counts.locked}, {counts.unlockable}, {counts.unlocked},{" "}
            {counts.solved}
          </span>
        </h4>
        <div>
          <>
            {metaCells}
            {puzzleCells}
          </>
        </div>
      </div>
    );
  });
  return <>{rounds}</>;
};

const InteractionsSection = ({ teamState }: { teamState: TeamState }) => {
  const interactionCounts = {
    locked: 0,
    unlocked: 0,
    running: 0,
    completed: 0,
  };
  const interactions = HUNT.interactions.map((interaction) => {
    const interactionState = teamState.interactions?.[interaction.id];
    let bgcolor;
    if (interactionState) {
      if (interactionState.state === "unlocked") {
        // If unlocked: white
        interactionCounts.unlocked += 1;
        bgcolor = "white";
      } else if (interactionState.state === "running") {
        // If actively running: yellow
        interactionCounts.running += 1;
        bgcolor = "yellow";
      } else {
        // If completed: green
        interactionCounts.completed += 1;
        bgcolor = "green";
      }
    } else {
      // If not yet unlocked: black
      interactionCounts.locked += 1;
      bgcolor = "black";
    }
    const box = (
      <div
        key={interaction.id}
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          backgroundColor: bgcolor,
          border: `1px solid ${bgcolor}`,
          margin: "2px",
        }}
        title={interaction.id}
      />
    );
    if (interactionState) {
      return (
        <a key={interaction.id} href={`/interactions/${interaction.id}`}>
          {box}
        </a>
      );
    } else {
      return box;
    }
  });
  return (
    <>
      <h4 style={{ margin: 0, borderTop: "1px solid #888" }}>
        Interactions{" "}
        <span
          style={{ fontSize: "12px" }}
          title={`${interactionCounts.locked} locked\n${interactionCounts.unlocked} unlocked\n${interactionCounts.running} running\n${interactionCounts.completed} completed`}
        >
          {interactionCounts.locked}, {interactionCounts.unlocked},{" "}
          {interactionCounts.running}, {interactionCounts.completed}
        </span>
      </h4>
      {interactions}
    </>
  );
};

const DevPane = ({ teamState }: { teamState?: TeamState }) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- !SHOW_DEV_PANE is always falsy in development
  if (process.env.NODE_ENV !== "development" || !SHOW_DEV_PANE || !teamState)
    return undefined;

  return (
    <div
      style={{
        flex: 0,
        minWidth: "200px",
        height: "100vh",
        backgroundColor: "#eee",
      }}
    >
      <h2 style={{ margin: 0 }}>Devtools</h2>
      <h3 style={{ margin: 0 }}>{teamState.teamName}</h3>
      <RoundsSection teamState={teamState} />
      <InteractionsSection teamState={teamState} />
      <h3 style={{ margin: 0, borderTop: "1px solid #888" }}>Actions</h3>
      <ul style={{ margin: 0 }}>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default DevPane;

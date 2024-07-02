import React from "react";
import type { TeamState } from "../../../lib/api/client.js";
import HUNT from "../../huntdata";
import { PUZZLES } from "../puzzles";

const SHOW_DEV_PANE = true;

const RoundsSection = ({ teamState }: { teamState: TeamState }) => {
  const rounds = HUNT.rounds.map((round) => {
    const counts = {
      locked: 0,
      unlockable: 0,
      unlocked: 0,
      solved: 0,
    };
    const roundState = teamState.rounds[round.slug];
    const puzzleCells = round.puzzles.map((puzzleSlot) => {
      let title = puzzleSlot.id;
      const slug = roundState?.slots[puzzleSlot.id] ?? puzzleSlot.slug;
      if (slug !== undefined) {
        const puzzle = PUZZLES[slug];
        if (puzzle) {
          title = puzzle.title;
        }
      }
      const puzzleState = slug ? teamState.puzzles[slug] : undefined;
      let bgcolor;
      if (puzzleState?.locked === "locked") {
        // If visible: gray
        counts.locked += 1;
        bgcolor = "gray";
      } else if (puzzleState?.locked === "unlockable") {
        // If unlockable: light gray
        counts.unlockable += 1;
        bgcolor = "lightgray";
      } else if (puzzleState?.locked === "unlocked") {
        // If unlocked:
        //   if solved: green
        //   otherwise: white
        if (puzzleState.answer) {
          counts.solved += 1;
          bgcolor = "green";
        } else {
          counts.unlocked += 1;
          bgcolor = "white";
        }
      } else {
        bgcolor = "black";
        counts.locked += 1;
      }
      // If solved: green
      const box = (
        <div
          key={puzzleSlot.id}
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            backgroundColor: bgcolor,
            border: `1px solid ${bgcolor}`,
            margin: "2px",
          }}
          title={title}
        />
      );
      if (slug) {
        return (
          <a key={puzzleSlot.id} href={`/puzzles/${slug}`}>
            {box}
          </a>
        );
      }

      return box;
    });
    return (
      <div key={round.slug}>
        <h4>
          <a href={`/rounds/${round.slug}`}>{round.title}</a>{" "}
          <span
            style={{ fontSize: "12px" }}
            title={`${counts.locked} locked\n${counts.unlockable} unlockable\n${counts.unlocked} open\n${counts.solved} solved`}
          >
            {counts.locked}, {counts.unlockable}, {counts.unlocked},{" "}
            {counts.solved}
          </span>
        </h4>
        <div>{puzzleCells}</div>
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
      <h3>
        Interactions{" "}
        <span
          style={{ fontSize: "12px" }}
          title={`${interactionCounts.locked} locked\n${interactionCounts.unlocked} unlocked\n${interactionCounts.running} running\n${interactionCounts.completed} completed`}
        >
          {interactionCounts.locked}, {interactionCounts.unlocked},{" "}
          {interactionCounts.running}, {interactionCounts.completed}
        </span>
      </h3>
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
      <h2>Devtools</h2>
      <h3>{teamState.teamName}</h3>
      <RoundsSection teamState={teamState} />
      <InteractionsSection teamState={teamState} />
      <h3>Actions</h3>
      <ul>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default DevPane;

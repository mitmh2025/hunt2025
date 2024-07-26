import React from "react";
import {
  type DevtoolsInteraction,
  type DevtoolsPuzzle,
  type DevtoolsRound,
  type DevtoolsState,
} from "../server/devtools";

const bgOpacity = "0.7";

function colorForPuzzle(
  state: DevtoolsPuzzle["state"],
): "black" | "lightgray" | "white" | "green" {
  if (state === "locked") {
    // If visible: gray
    return "black";
  } else if (state === "unlockable") {
    // If unlockable: light gray
    return "lightgray";
  } else if (state === "unlocked") {
    // If unlocked but not solved: white
    return "white";
  } else {
    // If unlocked and solved: green
    return "green";
  }
}

const PuzzleBox = ({
  puzzle,
  is_meta,
}: {
  puzzle: DevtoolsPuzzle;
  is_meta: boolean;
}) => {
  const { slot, slug, title, state } = puzzle;
  const bgcolor = colorForPuzzle(state);
  const size = is_meta ? "12px" : "8px";
  const box = (
    <div
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: bgcolor,
        border: `1px solid black`,
        margin: "2px",
      }}
      title={title}
    />
  );

  return (
    <a key={slot} href={`/puzzles/${slug}`}>
      {box}
    </a>
  );
};

function countByState<T extends string>({
  items,
  keys,
}: {
  items: { state: T }[];
  keys: T[];
}): Record<T, number> {
  const counts = {} as Record<T, number>;
  // initialize counts for all keys to 0
  keys.forEach((k) => {
    counts[k] = 0;
  });
  items.forEach((item) => {
    counts[item.state] += 1;
  });
  return counts;
}

const Round = ({ round }: { round: DevtoolsRound }) => {
  const bgcolor =
    round.state === "unlocked"
      ? `rgba(255,255,255,${bgOpacity})`
      : `rgba(208, 208, 208, ${bgOpacity})`;
  const counts = countByState({
    items: [...round.metas, ...round.puzzles],
    keys: ["locked", "unlockable", "unlocked", "solved"],
  });
  return (
    <div key={round.slug} style={{ backgroundColor: bgcolor }}>
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
          {round.metas.map((mp) => (
            <PuzzleBox key={mp.slot} puzzle={mp} is_meta={true} />
          ))}
          {round.puzzles.map((p) => (
            <PuzzleBox key={p.slot} puzzle={p} is_meta={false} />
          ))}
        </>
      </div>
    </div>
  );
};

const RoundsSection = ({ rounds }: { rounds: DevtoolsRound[] }) => {
  return rounds.map((round) => {
    return <Round key={round.slug} round={round} />;
  });
};

function colorForInteraction(interaction: DevtoolsInteraction) {
  const state = interaction.state;
  if (state === "locked") {
    // If locked: black
    return "black";
  } else if (state === "completed") {
    // If completed: green
    return "green";
  } else if (state === "unlocked") {
    // If unlocked: white
    return "white";
  } else {
    // If actively running: yellow
    return "yellow";
  }
}

const Interaction = ({ interaction }: { interaction: DevtoolsInteraction }) => {
  const bgcolor = colorForInteraction(interaction);
  return (
    <a key={interaction.slug} href={`/interactions/${interaction.slug}`}>
      <div
        key={interaction.slug}
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          backgroundColor: bgcolor,
          border: `1px solid black`,
          margin: "2px",
        }}
        title={interaction.slug}
      />
    </a>
  );
};

const InteractionsSection = ({
  interactions,
}: {
  interactions: DevtoolsInteraction[];
}) => {
  const counts = countByState({
    items: interactions,
    keys: ["locked", "unlocked", "running", "completed"],
  });
  return (
    <>
      <h4 style={{ margin: 0, borderTop: "1px solid #888" }}>
        Interactions{" "}
        <span
          style={{ fontSize: "12px" }}
          title={`${counts.locked} locked\n${counts.unlocked} unlocked\n${counts.running} running\n${counts.completed} completed`}
        >
          {counts.locked}, {counts.unlocked}, {counts.running},{" "}
          {counts.completed}
        </span>
      </h4>
      {interactions.map((i) => (
        <Interaction key={i.slug} interaction={i} />
      ))}
    </>
  );
};

const DevPane = ({ state }: { state: DevtoolsState | undefined }) => {
  if (!state) {
    return undefined;
  }

  return (
    <div
      style={{
        border: "1px solid #888",
        backgroundColor: `rgba(255,255,255,${bgOpacity})`,
      }}
    >
      <h2 style={{ margin: 0 }}>Devtools</h2>
      <h3 style={{ margin: 0 }}>
        {state.teamName} (team {state.teamId}) - {state.currency} unlock
        currency
      </h3>
      <RoundsSection rounds={state.rounds} />
      <InteractionsSection interactions={state.interactions} />
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

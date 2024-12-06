import React from "react";
import { css, styled } from "styled-components";
import {
  type DevtoolsGate,
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

const PuzzleBoxDiv = styled.div<{
  $isMeta: boolean;
  $state: DevtoolsPuzzle["state"];
  $isPostprodded: boolean;
}>`
  display: inline-block;
  ${({ $isMeta }) =>
    $isMeta
      ? css`
          width: 12px;
          height: 12px;
        `
      : css`
          width: 8px;
          height: 8px;
        `}
  background-color: ${({ $state }) => colorForPuzzle($state)};
  border: 1px solid var(--black);
  ${({ $isPostprodded }) =>
    $isPostprodded &&
    css`
      box-shadow: 0px 0px 0px 2px #dbae2e99;
    `}
  margin: 2px;
`;

const PuzzleBox = ({
  puzzle,
  is_meta,
}: {
  puzzle: DevtoolsPuzzle;
  is_meta: boolean;
}) => {
  const { slot, slug, title, state } = puzzle;
  const box = (
    <PuzzleBoxDiv
      $state={state}
      $isMeta={is_meta}
      $isPostprodded={slot !== slug}
      title={title}
    />
  );

  return (
    <a key={slot} href={`/puzzles/${slug}`}>
      {box}
    </a>
  );
};

const GateBox = styled.div<{ $open: DevtoolsGate["open"] }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: ${({ $open }) => ($open ? "green" : "black")};
  border: 1px solid black;
  margin: 2px;
`;

const InteractionBox = styled.div<{ $state: DevtoolsInteraction["state"] }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: ${({ $state }) => colorForInteractionState($state)};
  border: 1px solid black;
  margin: 2px;
`;

const Interaction = ({ interaction }: { interaction: DevtoolsInteraction }) => {
  return (
    <a key={interaction.slug} href={`/interactions/${interaction.slug}`}>
      <InteractionBox
        key={interaction.slug}
        $state={interaction.state}
        title={interaction.slug}
      />
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

const CountsSpan = styled.span`
  font-size: 12px;
`;

const DevPaneItemHeader = styled.h4`
  margin: 0;
  border-top: 1px solid #888;
`;

const RoundContainer = styled.div<{ $state: "locked" | "unlocked" }>`
  background-color: ${({ $state }) =>
    $state === "unlocked"
      ? `rgba(255,255,255,${bgOpacity})`
      : `rgba(208, 208, 208, ${bgOpacity})`};
`;

const GatesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const GatesLabel = styled.span`
  font-size: 12px;
`;
const Gates = ({ gates }: { gates: DevtoolsGate[] }) => {
  return (
    <GatesRow>
      <GatesLabel>Gates:</GatesLabel>
      {gates.map((g) => (
        <GateBox key={g.id} $open={g.open} />
      ))}
    </GatesRow>
  );
};

const Round = ({ round }: { round: DevtoolsRound }) => {
  const counts = countByState({
    items: [...round.metas, ...round.puzzles],
    keys: ["locked", "unlockable", "unlocked", "solved"],
  });
  return (
    <RoundContainer key={round.slug} $state={round.state}>
      <DevPaneItemHeader>
        <a href={`/rounds/${round.slug}`}>{round.title}</a>{" "}
        <CountsSpan
          title={`${counts.locked} locked\n${counts.unlockable} unlockable\n${counts.unlocked} open\n${counts.solved} solved`}
        >
          {counts.locked}, {counts.unlockable}, {counts.unlocked},{" "}
          {counts.solved}
        </CountsSpan>
      </DevPaneItemHeader>
      <div>
        <>
          {round.puzzles.map((p) => (
            <PuzzleBox key={p.slot} puzzle={p} is_meta={false} />
          ))}
          {round.metas.map((mp) => (
            <PuzzleBox key={mp.slot} puzzle={mp} is_meta={true} />
          ))}
          {round.interactions.map((i) => (
            <Interaction key={i.slug} interaction={i} />
          ))}
        </>
      </div>
      {round.gates.length > 0 ? <Gates gates={round.gates} /> : undefined}
    </RoundContainer>
  );
};

const RoundsSection = ({ rounds }: { rounds: DevtoolsRound[] }) => {
  return rounds.map((round) => {
    return <Round key={round.slug} round={round} />;
  });
};

function colorForInteractionState(state: DevtoolsInteraction["state"]) {
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

const DevPaneContainer = styled.div`
  border: 1px solid var(--gray-400);
  background-color: rgba(255, 255, 255, ${bgOpacity});
  color: var(--black);

  a {
    color: var(--gray-800);
    border: none;
    text-decoration: underline;

    &:hover {
      color: var(--true-black);
    }
  }
`;

const DevPane = ({ state }: { state: DevtoolsState }) => {
  if (!state.state) {
    return undefined;
  }

  return (
    <DevPaneContainer>
      <h2 style={{ margin: 0, padding: 0 }}>Devtools</h2>
      <h3 style={{ margin: 0, padding: 0 }}>
        {state.state.currency} unlock currency - epoch {state.epoch}
      </h3>
      <RoundsSection rounds={state.state.rounds} />
      <h3 style={{ margin: 0, borderTop: "1px solid #888" }}>Actions</h3>
      <ul style={{ margin: 0 }}>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </DevPaneContainer>
  );
};

export default DevPane;

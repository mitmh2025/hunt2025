import React from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import type { PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import useAppendDataset from "../../client/useAppendDataset";
import useDataset from "../../client/useDataset";

const Arrow = styled.span`
  color: var(--black);
`;

const StyledDiv = styled.div`
  margin: 1em 0;
  display: flex;
  gap: 1em;
`;

const StyledButton = styled.button`
  border-radius: 8px;
  padding: 1em;
  flex: 0 0 250px;
  font-family: var(--body-font);
  cursor: pointer;
  border: 3px solid var(--gold-500);
`;

const EnabledButton = styled(StyledButton)`
  background-color: var(--black);
  color: var(--white);
`;

const DisabledButton = styled(StyledButton)`
  background-color: var(--gray-600);
  color: var(--white);
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  th {
    border-bottom: 1px solid black;
    padding-right: 8px;
  }
  td {
    text-align: center;
    padding-right: 8px;
  }
`;

const Tile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  width: 40px;
  font-family: "Roboto Mono", monospace;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid black;
  background-color: #ffce5e;
`;

const TilesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 1 100%;
  padding: 0px 16px;
  z-index: 2;
`;

const StyledHr = styled.hr`
  border-color: #a97900;
  position: relative;
  top: 20px;
`;

const Tray = styled.div`
  background-color: #ffe6a8;
  height: 40px;
  flex-basis: 100%;
  border: 1px solid black;
  position: relative;
  top: -30px;
  z-index: 1;
`;

const Tileset = styled.div`
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
`;

type SubpuzzleSlug =
  | "hellfresh"
  | "betteroprah"
  | "hardlysafe"
  | "draughtqueens"
  | "townsquarespace";

type SubpuzzleDatum = {
  title: string;
  slug: SubpuzzleSlug;
  gate: string;
  color: string;
};

const SUBPUZZLE_DATA_BY_SLUG: Record<SubpuzzleSlug, SubpuzzleDatum> = {
  hellfresh: {
    title: "HellFresh",
    slug: "hellfresh",
    gate: "ptg04",
    color: "#ff0000",
  },
  betteroprah: {
    title: "BetterOprah",
    slug: "betteroprah",
    gate: "ptg05",
    color: "#ffa500",
  },
  hardlysafe: {
    title: "HardlySafe",
    slug: "hardlysafe",
    gate: "ptg06",
    color: "#3cb317",
  },
  draughtqueens: {
    title: "DraughtQueens",
    slug: "draughtqueens",
    gate: "ptg07",
    color: "#0000ff",
  },
  townsquarespace: {
    title: "TownSquareSpace",
    slug: "townsquarespace",
    gate: "ptg08",
    color: "#ff00ff",
  },
};

const App = ({
  initialTeamState,
  initialPuzzleStateLog,
}: {
  initialTeamState: TeamHuntState;
  initialPuzzleStateLog: PuzzleStateLogEntry[];
}): JSX.Element => {
  const teamState = useDataset("team_state", undefined, initialTeamState);
  const puzzleState = useAppendDataset(
    "puzzle_state_log",
    { slug: "and_now_a_puzzling_word_from_our_sponsors" },
    initialPuzzleStateLog,
  );
  const pickedUpMartini =
    teamState.rounds.paper_trail?.gates?.includes("ptg15") ?? false;

  const subpuzzlesWithAnswer = puzzleState.reduce<SubpuzzleDatum[]>(
    (acc, puzzleStateLogEntry) => {
      if (puzzleStateLogEntry.data.answer) {
        const subpuzzleSlug = puzzleStateLogEntry.data
          .subpuzzle_slug as SubpuzzleSlug;
        const subpuzzleDatum = SUBPUZZLE_DATA_BY_SLUG[subpuzzleSlug];
        acc.push(subpuzzleDatum);
      }
      return acc;
    },
    [],
  );
  const subpuzzleAnswersBySlug = puzzleState.reduce<Record<string, string>>(
    (acc, puzzleStateLogEntry) => {
      if (puzzleStateLogEntry.data.answer) {
        const subpuzzleSlug = puzzleStateLogEntry.data
          .subpuzzle_slug as SubpuzzleSlug;
        acc[subpuzzleSlug] = puzzleStateLogEntry.data.answer as string;
      }
      return acc;
    },
    {},
  );
  const points = 250 * subpuzzlesWithAnswer.length;

  const latestAdFrequencyStatusChange =
    puzzleState.findLast(
      (puzzleStateLogEntry) => puzzleStateLogEntry.data.type === "ad_frequency",
    )?.data.status ?? null;
  const mysteryHuntPlusEnabled = latestAdFrequencyStatusChange === "plus";
  const mysteryHuntMinusEnabled = latestAdFrequencyStatusChange === "minus";
  const mysteryHuntPlus = () => {
    void fetch(
      "/puzzles/and_now_a_puzzling_word_from_our_sponsors/mysteryHuntPlus",
      {
        method: "POST",
        body: "{}",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
  };
  const mysteryHuntRegular = () => {
    void fetch(
      "/puzzles/and_now_a_puzzling_word_from_our_sponsors/mysteryHuntRegular",
      {
        method: "POST",
        body: "{}",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
  };
  const mysteryHuntMinus = () => {
    void fetch(
      "/puzzles/and_now_a_puzzling_word_from_our_sponsors/mysteryHuntMinus",
      {
        method: "POST",
        body: "{}",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
  };

  return (
    <>
      <h2>MITropolis Rewards Card Portal</h2>
      <h3>Promotional Rates</h3>
      <p>
        You have promotional rates available! Click the links below to view the
        offers by our product partners and enter your promo codes:
      </p>
      {Object.values(SUBPUZZLE_DATA_BY_SLUG).map(({ title, slug, gate }) => {
        const unlocked = teamState.rounds.paper_trail?.gates?.includes(gate);
        if (unlocked) {
          return (
            <p key={title}>
              <a href={`/${slug}`}>{title} </a>
              <Arrow>→</Arrow>
            </p>
          );
        }
        return null;
      })}
      <h3>Options</h3>
      <StyledDiv>
        {mysteryHuntPlusEnabled ? (
          <DisabledButton onClick={mysteryHuntRegular}>
            <i>Mystery Hunt Plus™️ enabled!</i>
          </DisabledButton>
        ) : (
          <EnabledButton onClick={mysteryHuntPlus}>
            Enable Mystery Hunt Plus™️
          </EnabledButton>
        )}
        <span>
          Subscribe to Mystery Hunt Plus™️ in order to listen to more of your
          favorite radio content, now free from distracting advertisements.
        </span>
      </StyledDiv>
      <StyledDiv>
        {mysteryHuntMinusEnabled ? (
          <DisabledButton onClick={mysteryHuntRegular}>
            <i>Mystery Hunt Minus™️ enabled!</i>
          </DisabledButton>
        ) : (
          <EnabledButton onClick={mysteryHuntMinus}>
            Enable Mystery Hunt Minus™️
          </EnabledButton>
        )}
        <span>
          Subscribe to Mystery Hunt Minus™️ in order to listen to more of your
          favorite advertisements, now free from distracting radio content.
        </span>
      </StyledDiv>
      {!pickedUpMartini && (
        <>
          <h3>MITropolisCard Reward Store</h3>
          <p>You have {points} MITropolisCard points.</p>
          <p>
            Once you have 1,250 MITropolisCard points, you may come to the Gala
            and purchase a martini.
          </p>
        </>
      )}
      <h3>Your Promo Codes</h3>
      {!pickedUpMartini && subpuzzlesWithAnswer.length > 0 && (
        <StyledTable>
          <thead>
            <tr>
              <th>Product</th>
              <th>Promo Code</th>
            </tr>
          </thead>
          <tbody>
            {subpuzzlesWithAnswer.map(({ title, slug }) => (
              <tr key={slug}>
                <td>{title}</td>
                <td>{subpuzzleAnswersBySlug[slug]}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
      {pickedUpMartini && (
        <>
          {Object.values(SUBPUZZLE_DATA_BY_SLUG).map(({ slug, color }) => {
            const answer = subpuzzleAnswersBySlug[slug];
            if (answer) {
              return (
                <Tileset
                  key={slug}
                  style={{ maxWidth: `${answer.length * 60}px` }}
                >
                  <TilesWrapper>
                    {answer.split("").map((char, i) => (
                      <Tile key={i} style={{ color }}>
                        {char}
                      </Tile>
                    ))}
                  </TilesWrapper>
                  <Tray>
                    <StyledHr />
                  </Tray>
                </Tileset>
              );
            }
            return null;
          })}
          <h3>Martini</h3>
          <p>
            You should have received a martini glass with 34 tiles. Please
            contact us at info@mitmh2025.com if it seems that you are missing
            pieces.
          </p>
          <p className="puzzle-flavor">
            It looks like a few ingredients are missing from both your martini
            and the promo codes.
          </p>
        </>
      )}
    </>
  );
};

const elem = document.getElementById(
  "and-now-a-puzzling-word-from-our-sponsors-root",
);
if (elem) {
  const root = createRoot(elem);
  const initialTeamState = (
    window as unknown as { initialTeamState: TeamHuntState }
  ).initialTeamState;
  const initialPuzzleStateLog = (
    window as unknown as { initialPuzzleStateLog: PuzzleStateLogEntry[] }
  ).initialPuzzleStateLog;
  root.render(
    <App
      initialTeamState={initialTeamState}
      initialPuzzleStateLog={initialPuzzleStateLog}
    />,
  );
} else {
  console.error(
    "Could not mount App because #and-now-a-puzzling-word-from-our-sponsors-root was nowhere to be found",
  );
}

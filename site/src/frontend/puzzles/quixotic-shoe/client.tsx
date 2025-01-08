import React from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import type { PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import useAppendDataset from "../../client/useAppendDataset";
import useDataset from "../../client/useDataset";
import { PuzzleAnswer } from "../../components/StyledUI";

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

const App = ({
  initialTeamState,
  initialPuzzleStateLog,
}: {
  initialTeamState: TeamHuntState;
  initialPuzzleStateLog: PuzzleStateLogEntry[];
}): JSX.Element => {
  const teamState = useDataset("team_state", undefined, initialTeamState);
  const puzzleStateLog = useAppendDataset(
    "puzzle_state_log",
    { slug: "and_now_a_puzzling_word_from_our_sponsors" },
    initialPuzzleStateLog,
  );

  const subpuzzlesAccessed = puzzleStateLog
    .filter(
      (entry) =>
        entry.slug === "and_now_a_puzzling_word_from_our_sponsors" &&
        entry.data.type === "subpuzzle_unlocked",
    )
    .map(
      ({ data: { subpuzzle_slug, subpuzzle_name, order } }) =>
        ({
          subpuzzle_slug,
          subpuzzle_name,
          order,
        }) as { subpuzzle_slug: string; subpuzzle_name: string; order: number },
    );

  const subpuzzlesSolved = puzzleStateLog
    .filter(
      (entry) =>
        entry.slug === "and_now_a_puzzling_word_from_our_sponsors" &&
        entry.data.type === "subpuzzle_solved",
    )
    .map(
      ({ data: { subpuzzle_slug, answer } }) =>
        ({
          subpuzzle_slug,
          answer,
        }) as {
          subpuzzle_slug: string;
          answer: string;
        },
    );

  const allSubpuzzlesSolved = puzzleStateLog
    .filter(
      (entry) =>
        entry.slug === "and_now_a_puzzling_word_from_our_sponsors" &&
        entry.data.type === "all_subpuzzles_solved",
    )
    .map(
      ({ data: { subpuzzle_slug, color } }) =>
        ({
          subpuzzle_slug,
          color,
        }) as {
          subpuzzle_slug: string;
          color: string;
        },
    );

  const condensedSubpuzzleStatus: Record<
    string,
    {
      subpuzzle_slug: string;
      order: number;
      subpuzzle_name: string;
      answer?: string;
      color?: string;
    }
  > = {};
  for (const accessDatum of subpuzzlesAccessed) {
    condensedSubpuzzleStatus[accessDatum.subpuzzle_slug] = accessDatum;
  }
  for (const solveDatum of subpuzzlesSolved) {
    condensedSubpuzzleStatus[solveDatum.subpuzzle_slug] = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- puzzle must be accessed to be solved
      ...condensedSubpuzzleStatus[solveDatum.subpuzzle_slug]!,
      answer: solveDatum.answer,
    };
  }
  for (const allSolvedDatum of allSubpuzzlesSolved) {
    condensedSubpuzzleStatus[allSolvedDatum.subpuzzle_slug] = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- puzzle must be accessed to be solved
      ...condensedSubpuzzleStatus[allSolvedDatum.subpuzzle_slug]!,
      color: allSolvedDatum.color,
    };
  }
  const sortedSubpuzzleStatus = Object.values(condensedSubpuzzleStatus).sort(
    (status1, status2) => status1.order - status2.order,
  );

  const pickupComplete = teamState.rounds.paper_trail?.gates?.includes("ptg15");
  const points = 250 * subpuzzlesSolved.length;

  const latestAdFrequencyStatusChange =
    puzzleStateLog.findLast(
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
      {sortedSubpuzzleStatus.map(
        ({ subpuzzle_name, subpuzzle_slug, answer }) => {
          return (
            <p key={subpuzzle_slug}>
              <a href={`/${subpuzzle_slug}`}>
                {subpuzzle_name}{" "}
                {answer && (
                  <>
                    (Solved! <PuzzleAnswer>{answer}</PuzzleAnswer>){" "}
                  </>
                )}
              </a>
              <Arrow>→</Arrow>
            </p>
          );
        },
      )}
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
      {!pickupComplete && (
        <>
          <h3>MITropolisCard Reward Store</h3>
          <p>You have {points} MITropolisCard points.</p>
          <p>
            Once you have 1,250 MITropolisCard points, you may come to the Gala
            and receive a complimentary martini.
          </p>
        </>
      )}
      {pickupComplete && (
        <>
          <h3>Your Promo Codes</h3>
          {sortedSubpuzzleStatus.map(({ subpuzzle_slug, answer, color }) => {
            if (answer) {
              return (
                <Tileset
                  key={subpuzzle_slug}
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
    window as unknown as {
      initialPuzzleStateLog: PuzzleStateLogEntry[];
    }
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

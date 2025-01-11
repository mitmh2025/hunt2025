import React, { type CSSProperties } from "react";
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

const SpacingWrapper = styled.div`
  margin-bottom: 1em;
`;

const ToggleGroupWrapper = styled.div`
  border-radius: 8px;
  display: flex;
  justify-contents: space-around;
  border: 3px solid var(--gold-500);
  width: 750px;
  background-color: var(--black);
  margin-bottom: 1em;
  color: var(--white);
`;

const ToggleGroupButton = styled.div<{ $selected: boolean }>`
  flex: 1 1 33%;
  padding: 8px;
  display: flex;
  justify-content: space-around;
  background-color: ${({ $selected }) =>
    $selected ? "var(--gray-600)" : "var(--black)"};
  cursor: ${({ $selected }) => ($selected ? "not-allowed" : "pointer")};
`;

const ToggleGroupRadioInput = styled.input`
  display: none;
`;

type ToggleGroupOption = {
  onClick: () => void;
  selected: boolean;
  text: string;
};

type ToggleGroupProps = {
  options: ToggleGroupOption[];
};

const ToggleGroup = ({ options }: ToggleGroupProps): JSX.Element => {
  return (
    <ToggleGroupWrapper>
      {options.map(({ onClick, selected, text }, i) => {
        const additionalStyles: CSSProperties = {};
        if (i === 0) {
          additionalStyles.borderTopLeftRadius = "5px";
          additionalStyles.borderBottomLeftRadius = "5px";
          additionalStyles.borderRight = "1px solid var(--gold-800)";
        } else if (i === 1) {
          additionalStyles.borderRight = "1px solid var(--gold-800)";
        } else {
          additionalStyles.borderTopRightRadius = "5px";
          additionalStyles.borderBottomRightRadius = "5px";
        }
        return (
          <ToggleGroupButton
            key={i}
            $selected={selected}
            onClick={onClick}
            style={additionalStyles}
          >
            <ToggleGroupRadioInput
              type="radio"
              checked={selected}
              value={text}
            />
            <label htmlFor={text}>{text}</label>
          </ToggleGroupButton>
        );
      })}
    </ToggleGroupWrapper>
  );
};

const SubpuzzleLink = ({
  answer,
  title,
  slug,
}: {
  answer?: string;
  title: string;
  slug: string;
}): JSX.Element => {
  return (
    <>
      <SpacingWrapper>
        <a href={`/${slug}`}>
          {title}{" "}
          {answer && (
            <>
              (Solved! <PuzzleAnswer>{answer}</PuzzleAnswer>){" "}
            </>
          )}
        </a>
        <Arrow>→</Arrow>
      </SpacingWrapper>
    </>
  );
};

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
      ({ data: { subpuzzle_slug, image } }) =>
        ({
          subpuzzle_slug,
          image,
        }) as {
          subpuzzle_slug: string;
          image: string;
        },
    );

  const condensedSubpuzzleStatus: Record<
    string,
    {
      subpuzzle_slug: string;
      order: number;
      subpuzzle_name: string;
      answer?: string;
      image?: string;
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
      image: allSolvedDatum.image,
    };
  }
  const sortedSubpuzzleStatus = Object.values(condensedSubpuzzleStatus).sort(
    (status1, status2) => status1.order - status2.order,
  );

  const pickupComplete = teamState.gates_satisfied.includes("ptg15");
  const points = 250 * subpuzzlesSolved.length;

  const latestAdFrequencyStatusChange =
    puzzleStateLog.findLast(
      (puzzleStateLogEntry) => puzzleStateLogEntry.data.type === "ad_frequency",
    )?.data.status ?? null;
  const mysteryHuntPlusEnabled = latestAdFrequencyStatusChange === "plus";
  const mysteryHuntRegularEnabled = latestAdFrequencyStatusChange === null;
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
      {!pickupComplete && (
        <>
          <h3>Promotional Rates</h3>
          <p>
            You have promotional rates available! Click the links below to view
            the offers by our product partners and enter your promo codes:
          </p>
          {sortedSubpuzzleStatus.map(
            ({ subpuzzle_name, subpuzzle_slug, answer }) => {
              return (
                <SubpuzzleLink
                  key={subpuzzle_name}
                  answer={answer}
                  title={subpuzzle_name}
                  slug={subpuzzle_slug}
                />
              );
            },
          )}
        </>
      )}
      {pickupComplete && (
        <>
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
          {sortedSubpuzzleStatus.map(
            ({ subpuzzle_name, subpuzzle_slug, answer, image }, i) => {
              if (answer) {
                return (
                  <React.Fragment key={i}>
                    <div>
                      <SubpuzzleLink
                        answer={answer}
                        title={subpuzzle_name}
                        slug={subpuzzle_slug}
                      />
                    </div>
                    <SpacingWrapper key={i}>
                      <a href={`/${subpuzzle_slug}`}>
                        <img
                          src={image}
                          alt={`A rack of wooden tiles with colored letters on them reading ${answer}.`}
                        />
                      </a>
                    </SpacingWrapper>
                  </React.Fragment>
                );
              }
              return null;
            },
          )}
        </>
      )}
      <h3>Your Subscription</h3>
      <ToggleGroup
        options={[
          {
            onClick: mysteryHuntPlus,
            selected: mysteryHuntPlusEnabled,
            text: "Mystery Hunt Plus™️",
          },
          {
            onClick: mysteryHuntRegular,
            selected: mysteryHuntRegularEnabled,
            text: "Mystery Hunt™️",
          },
          {
            onClick: mysteryHuntMinus,
            selected: mysteryHuntMinusEnabled,
            text: "Mystery Hunt Minus™️",
          },
        ]}
      />
      <p>
        Subscribe to Mystery Hunt Plus™️ in order to listen to more of your
        favorite radio content, now free from distracting advertisements.
      </p>
      <p>
        Subscribe to Mystery Hunt Minus™️ in order to listen to more of your
        favorite advertisements, now free from distracting radio content.
      </p>
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

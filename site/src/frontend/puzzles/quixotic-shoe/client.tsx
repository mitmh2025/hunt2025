import React from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import type { PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import useAppendDataset from "../../client/useAppendDataset";
import useDataset from "../../client/useDataset";
import { PuzzleAnswer } from "../../components/StyledUI";

const Wrapper = styled.div`
  font-family: "Arial", "Helvetica Neue", Helvetica, sans-serif;
  color: var(--true-black);
  background: var(--true-white);
  padding: 1.5rem;

  h2,
  h3 {
    font-family: "Arial", "Helvetica Neue", Helvetica, sans-serif;
  }

  h3 {
    font-weight: 600;
    font-size: 1.8rem;
  }

  section + section {
    margin-top: 1rem;
  }
`;

const Header = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 300;
  border-radius: 0.5rem;
  border: 2px solid #7b8895;
  background-color: #d6dde5;
`;

const FeatureTable = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  tr.subscription-titles {
    background-color: #e6efe9;
    font-size: 1.5rem;

    th {
      font-weight: 900;
    }
  }

  td,
  th {
    padding: 1rem;
    text-align: center;
  }

  .buttons {
    font-size: 1.5rem;

    span {
      font-weight: 600;
    }
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    background-color: #beecc9;
    border-color: #289542;
    border-width: 2px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #71e08b;
      margin-top: -2px;
      border-bottom-width: 4px;
    }
  }

  .blurbs {
    font-style: italic;
  }

  th.active,
  td.active {
    background-color: #ffff0066;
  }

  th.feature {
    width: 120px;
  }
`;

const SubpuzzleLinkWrapper = styled.a`
  margin-bottom: 0.5rem;
  border: 4px solid #7b8895;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;

  text-decoration: none;

  .main-promo-contents {
    display: flex;
    align-items: center;
  }

  span.subpuzzle-name {
    flex: 1;
    font-size: 1.5rem;
    font-weight: 800;
  }

  &:hover {
    background-color: #007bff33;
    border-color: #055296;

    span {
      color: var(--true-black);
    }

    span.subpuzzle-name {
      color: #001c8b;
    }
  }
`;

const SubpuzzleLink = ({
  answer,
  title,
  slug,
  solved,
  children,
}: {
  answer?: string;
  title: string;
  slug: string;
  solved?: boolean;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <SubpuzzleLinkWrapper href={`/${slug}`}>
      <div className="main-promo-contents">
        <span className="subpuzzle-name">
          <span>{answer ?? solved ? "✔️ " : "➕ "}</span>
          {title}
        </span>
        {answer && (
          <span>
            (Solved! <PuzzleAnswer>{answer}</PuzzleAnswer>){" "}
          </span>
        )}
      </div>
      {children}
    </SubpuzzleLinkWrapper>
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
    <Wrapper>
      <Header>MITropolisCard Rewards™️ Portal</Header>
      {!pickupComplete && (
        <section>
          <h3>Partner Offers</h3>
          <p>
            MITropolisCard partner companies provide a variety of puzzling
            offers to earn bonus MITropolisCard Rewards™️ points. Click below to
            learn more:
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
        </section>
      )}
      {pickupComplete && (
        <section>
          <h3>Martini Reward</h3>
          <p>
            You should have received a martini glass with 34 tiles. If not,
            please contact us at{" "}
            <a href="mailto:info@mitmh2025.com">info@mitmh2025.com</a>.
          </p>
          <p className="puzzle-flavor">
            It looks like a few ingredients are missing from both your martini
            and the promo codes.
          </p>
          {sortedSubpuzzleStatus.map(
            ({ subpuzzle_name, subpuzzle_slug, answer, image }, i) => {
              if (answer) {
                return (
                  <SubpuzzleLink
                    key={`subpuzzle-${i}`}
                    title={subpuzzle_name}
                    slug={subpuzzle_slug}
                    solved={true}
                  >
                    <img
                      src={image}
                      alt={`A rack of wooden tiles with colored letters on them reading ${answer}.`}
                    />
                  </SubpuzzleLink>
                );
              }
              return null;
            },
          )}
        </section>
      )}
      {!pickupComplete && (
        <section>
          <h3>MITropolisCard Reward Store</h3>
          <p>
            You have <strong>{points}</strong> MITropolisCard Points™️.
          </p>
          {points >= 1250 ? (
            <p>
              You have at least <strong>1,250</strong> MITropolisCard Points™️;
              come to the Gala and receive your complimentary martini!
            </p>
          ) : (
            <p>
              Once you have <strong>1,250</strong> MITropolisCard Points™️, you
              may come to the Gala and receive one complimentary martini!
            </p>
          )}
        </section>
      )}
      <section>
        <h3>Your Subscription</h3>
        <FeatureTable>
          <tr>
            <th className="feature"></th>
            <td className={mysteryHuntMinusEnabled ? "active" : ""}></td>
            <td className={mysteryHuntRegularEnabled ? "active" : ""}></td>
            <td className={mysteryHuntPlusEnabled ? "active" : ""}></td>
          </tr>
          <tr className="subscription-titles">
            <th></th>
            <th className={mysteryHuntMinusEnabled ? "active" : ""}>
              Mystery Hunt Minus™️
            </th>
            <th className={mysteryHuntRegularEnabled ? "active" : ""}>
              Mystery Hunt™️
            </th>
            <th className={mysteryHuntPlusEnabled ? "active" : ""}>
              Mystery Hunt Plus™️
            </th>
          </tr>
          <tr className="buttons">
            <th></th>
            <td className={mysteryHuntMinusEnabled ? "active" : ""}>
              {mysteryHuntMinusEnabled ? (
                <span>Active</span>
              ) : (
                <button onClick={mysteryHuntMinus}>Activate</button>
              )}
            </td>
            <td className={mysteryHuntRegularEnabled ? "active" : ""}>
              {mysteryHuntRegularEnabled ? (
                <span>Active</span>
              ) : (
                <button onClick={mysteryHuntRegular}>Activate</button>
              )}
            </td>
            <td className={mysteryHuntPlusEnabled ? "active" : ""}>
              {mysteryHuntPlusEnabled ? (
                <span>Active</span>
              ) : (
                <button onClick={mysteryHuntPlus}>Activate</button>
              )}
            </td>
          </tr>
          <tr className="blurbs">
            <th></th>
            <td className={mysteryHuntMinusEnabled ? "active" : ""}>
              More of your favorite advertisements, now free from distracting
              radio content!
            </td>
            <td className={mysteryHuntRegularEnabled ? "active" : ""}>
              A classic mix of radio content and advertisements!
            </td>
            <td className={mysteryHuntPlusEnabled ? "active" : ""}>
              More of your favorite radio content, now free from distracting
              advertisements!
            </td>
          </tr>
          <tr>
            <th className="feature">Music</th>
            <td className={mysteryHuntMinusEnabled ? "active" : ""}>❌</td>
            <td className={mysteryHuntRegularEnabled ? "active" : ""}>✅</td>
            <td className={mysteryHuntPlusEnabled ? "active" : ""}>✅</td>
          </tr>
          <tr>
            <th className="feature">Ads</th>
            <td className={mysteryHuntMinusEnabled ? "active" : ""}>✅</td>
            <td className={mysteryHuntRegularEnabled ? "active" : ""}>✅</td>
            <td className={mysteryHuntPlusEnabled ? "active" : ""}>❌</td>
          </tr>
          <tr>
            <th className="feature">Money-back guarantee</th>
            <td className={mysteryHuntMinusEnabled ? "active" : ""}>✅</td>
            <td className={mysteryHuntRegularEnabled ? "active" : ""}>✅</td>
            <td className={mysteryHuntPlusEnabled ? "active" : ""}>✅</td>
          </tr>
          <tr>
            <th></th>
            <td className={mysteryHuntMinusEnabled ? "active" : ""}></td>{" "}
            <td className={mysteryHuntRegularEnabled ? "active" : ""}></td>
            <td className={mysteryHuntPlusEnabled ? "active" : ""}></td>
          </tr>
        </FeatureTable>
      </section>
    </Wrapper>
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

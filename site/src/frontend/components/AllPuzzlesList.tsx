import React, { useCallback, useMemo, useState } from "react";
import { css, styled } from "styled-components";
import {
  type AllPuzzlesInteraction,
  type AllPuzzlesPuzzle,
  type AllPuzzlesRound,
  type AllPuzzlesState,
} from "../client/all_puzzles_types";
import { deviceMax } from "../utils/breakpoints";
import PuzzleLink, { PuzzleIcon } from "./PuzzleLink";
import { darkBgLinkStyles } from "./StyledUI";

const StyledRow = styled.tr<{ $bolded: boolean }>`
  ${({ $bolded }) =>
    $bolded
      ? css`
          font-weight: bold;
          color: var(--gold-500);

          a.puzzle-link-title {
            font-weight: bold;
            color: var(--gold-300);
            text-decoration-color: var(--gold-200);

            &:hover {
              color: var(--gold-400);
              text-decoration-color: var(--gold-300);
            }
          }

          .solved a.puzzle-link-title {
            color: var(--gold-500);
            text-decoration-color: var(--gold-400);

            &:hover {
              color: var(--gold-500);
              text-decoration-color: var(--gold-500);
            }
          }
        `
      : undefined}
  font-size: 1.5rem;

  a {
    ${darkBgLinkStyles}
  }

  td.puzzle-name {
    max-width: 50%;
  }
  td.puzzle-answer {
    padding-left: 1rem;
  }
  td.desc {
    font-size: 1rem;
    color: var(--gray-300);
    font-weight: 300;
    padding-bottom: 0.25rem;
  }

  @media ${deviceMax.md} {
    td.puzzle-name {
      width: 50vw;
      padding-right: 1rem;

      .puzzle-link-title {
        white-space: pre-wrap;
      }
    }
  }
`;

const RoundHeader = styled.h3`
  font-size: 2rem;

  a {
    ${darkBgLinkStyles}
  }
`;

const PuzzlesTable = ({
  epoch,
  puzzles,
  interactions,
  currency,
}: {
  epoch: number;
  puzzles: AllPuzzlesPuzzle[];
  interactions?: AllPuzzlesInteraction[];
  currency: number;
}) => {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <>
          {puzzles.map((puz) => {
            return (
              <React.Fragment key={puz.slug}>
                <StyledRow $bolded={puz.is_meta ?? false}>
                  <td key="puzzle" className="puzzle-name">
                    <PuzzleLink
                      epoch={epoch}
                      lockState={puz.state ?? "locked"}
                      answer={puz.answer}
                      currency={currency}
                      title={puz.title}
                      slug={puz.slug}
                      desc={puz.desc}
                    />
                  </td>
                  <td key="answer" className="puzzle-answer">
                    <code style={{ fontWeight: "bold" }}>
                      {puz.answer ? puz.answer : undefined}
                    </code>
                  </td>
                </StyledRow>
                <StyledRow $bolded={false}>
                  <td className="desc" colSpan={2}>
                    {puz.desc}
                  </td>
                </StyledRow>
              </React.Fragment>
            );
          })}
          {interactions?.map((int) => {
            return (
              <StyledRow key={int.slug} $bolded={true}>
                <td key="interaction">
                  <a href={`/interactions/${int.slug}`}>{int.title}</a>
                </td>
                <td></td>
              </StyledRow>
            );
          })}
        </>
      </tbody>
    </table>
  );
};

const AllPuzzlesRound = ({
  epoch,
  round,
  currency,
}: {
  epoch: number;
  round: AllPuzzlesRound;
  currency: number;
}) => {
  return (
    <>
      <RoundHeader key={round.slug}>
        <a href={`/rounds/${round.slug}`}>{round.title}</a>
      </RoundHeader>
      <PuzzlesTable
        epoch={epoch}
        puzzles={round.puzzles}
        interactions={round.interactions}
        currency={currency}
      />
    </>
  );
};

const PuzzlesList = ({ state }: { state: AllPuzzlesState }) => {
  const endgame = state.rounds.find((round) => round.slug === "endgame");
  return (
    <>
      {state.rounds.map((round) => {
        if (round.slug === "endgame") {
          return null;
        }

        return (
          <AllPuzzlesRound
            epoch={state.epoch}
            key={round.slug}
            round={round}
            currency={state.currency}
          />
        );
      })}
      {state.stray.length > 0 && (
        <>
          <RoundHeader key="stray">
            <a href="/rounds/stray_leads">Stray Leads</a>
          </RoundHeader>
          <PuzzlesTable
            epoch={state.epoch}
            puzzles={state.stray}
            currency={state.currency}
          />
        </>
      )}
      {endgame?.interactions?.map((int) => (
        <RoundHeader key={int.slug}>
          <a href={`/interactions/${int.slug}`}>{int.title}</a>
        </RoundHeader>
      ))}
    </>
  );
};

const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -1rem;

  h4 {
    padding: 0;
    margin: 0;
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--gray-300);
    padding: 1rem 0;

    &:hover {
      color: var(--gray-200);
    }

    &.selected {
      color: var(--gray-100);
    }

    &.selected:hover {
      color: var(--true-white);
    }
  }

  .puzzle-link-status-icon {
    margin-right: 0.125rem;
  }
`;

export default function AllPuzzlesList({ state }: { state: AllPuzzlesState }) {
  const [showUnlockable, setShowUnlockable] = useState<boolean>(true);
  const [showUnlocked, setShowUnlocked] = useState<boolean>(true);
  const [showSolved, setShowSolved] = useState<boolean>(true);

  const toggleShowUnlockable = useCallback(() => {
    setShowUnlockable((prevState) => !prevState);
  }, []);
  const toggleShowUnlocked = useCallback(() => {
    setShowUnlocked((prevState) => !prevState);
  }, []);
  const toggleShowSolved = useCallback(() => {
    setShowSolved((prevState) => !prevState);
  }, []);

  const filteredState = useMemo(() => {
    const rounds = state.rounds.flatMap((round) => {
      const filteredPuzzles = round.puzzles.filter((p) => {
        if (p.answer !== undefined) {
          return showSolved;
        }
        if (p.state === "unlocked") {
          return showUnlocked;
        }
        if (p.state === "unlockable") {
          return showUnlockable;
        }
        return true;
      });
      return {
        ...round,
        puzzles: filteredPuzzles,
      };
    });
    return {
      ...state,
      rounds,
    };
  }, [state, showUnlockable, showUnlocked, showSolved]);

  return (
    <>
      <Filters>
        <h4>Show:</h4>
        <label className={`${showUnlockable && "selected"}`}>
          <input
            type="checkbox"
            checked={showUnlockable}
            onChange={toggleShowUnlockable}
          />
          <PuzzleIcon lockState="unlockable" size={24} />
          unlockable
        </label>
        <label className={`${showUnlocked && "selected"}`}>
          <input
            type="checkbox"
            checked={showUnlocked}
            onChange={toggleShowUnlocked}
          />
          <PuzzleIcon lockState="unlocked" size={24} />
          unlocked
        </label>
        <label className={`${showSolved && "selected"}`}>
          <input
            type="checkbox"
            checked={showSolved}
            onChange={toggleShowSolved}
          />
          <PuzzleIcon lockState="unlocked" answer="dummy" size={24} />
          solved
        </label>
      </Filters>
      <PuzzlesList state={filteredState} />
    </>
  );
}

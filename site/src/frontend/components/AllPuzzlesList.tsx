import React from "react";
import { css, styled } from "styled-components";
import {
  type AllPuzzlesInteraction,
  type AllPuzzlesPuzzle,
  type AllPuzzlesRound,
  type AllPuzzlesState,
} from "../client/all_puzzles_types";
import PuzzleLink from "./PuzzleLink";

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

  td:nth-child(1) {
    min-width: 400px;
  }
  td:nth-child(2) {
    min-width: 200px;
  }
`;

const RoundHeader = styled.h3`
  font-size: 2rem;
`;

const AllPuzzlesTable = ({
  puzzles,
  interactions,
  currency,
}: {
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
              <StyledRow key={puz.slug} $bolded={puz.is_meta ?? false}>
                <td key="puzzle" style={{ paddingRight: "1rem" }}>
                  <PuzzleLink
                    lockState={puz.state ?? "locked"}
                    answer={puz.answer}
                    currency={currency}
                    title={puz.title}
                    slug={puz.slug}
                    desc={puz.desc}
                  />
                </td>
                <td key="answer">
                  <code style={{ fontWeight: "bold" }}>
                    {puz.answer ? puz.answer : undefined}
                  </code>
                </td>
              </StyledRow>
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
  round,
  currency,
}: {
  round: AllPuzzlesRound;
  currency: number;
}) => {
  return (
    <>
      <RoundHeader key={round.slug}>
        <a href={`/rounds/${round.slug}`}>{round.title}</a>
      </RoundHeader>
      <AllPuzzlesTable
        puzzles={round.puzzles}
        interactions={round.interactions}
        currency={currency}
      />
    </>
  );
};

const AllPuzzlesList = ({ state }: { state: AllPuzzlesState }) => {
  return (
    <>
      {state.rounds.map((round) => {
        return (
          <AllPuzzlesRound
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
          <AllPuzzlesTable puzzles={state.stray} currency={state.currency} />
        </>
      )}
    </>
  );
};

export default AllPuzzlesList;

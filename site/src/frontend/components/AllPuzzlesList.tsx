import React from "react";
import { css, styled } from "styled-components";
import {
  type AllPuzzlesRound,
  type AllPuzzlesState,
} from "../client/all_puzzles_types";
import PuzzleLink from "./PuzzleLink";

const StyledRow = styled.tr<{ $bolded: boolean }>`
  ${({ $bolded }) =>
    $bolded
      ? css`
          font-weight: bold;
        `
      : undefined}
  font-size: 24px;

  td:nth-child(1) {
    min-width: 400px;
  }
  td:nth-child(2) {
    min-width: 200px;
  }
`;

const RoundHeader = styled.h3`
  font-size: 32px;
`;

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
      <table>
        <tbody>
          <>
            {round.puzzles.map((puz) => {
              return (
                <StyledRow key={puz.slug} $bolded={puz.is_meta ?? false}>
                  <td key="puzzle">
                    <PuzzleLink
                      lockState={puz.state ?? "locked"}
                      answer={puz.answer}
                      currency={currency}
                      title={puz.title}
                      slug={puz.slug}
                    />
                  </td>
                  <td key="answer">
                    <code>{puz.answer ? puz.answer : undefined}</code>
                  </td>
                </StyledRow>
              );
            })}
            {round.interactions?.map((int) => {
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
    </>
  );
};

const AllPuzzlesList = ({ state }: { state: AllPuzzlesState }) => {
  return state.rounds.map((round) => {
    return (
      <AllPuzzlesRound
        key={round.slug}
        round={round}
        currency={state.currency}
      />
    );
  });
};

export default AllPuzzlesList;

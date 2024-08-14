import { type Request } from "express";
import React from "react";
import { css, styled } from "styled-components";
import ContentWithNavBar from "../../components/ContentWithNavBar";
import { PUZZLES } from "../../puzzles";

const PuzzleRow = styled.tr<{ $isMeta: boolean }>`
  ${({ $isMeta }) =>
    $isMeta
      ? css`
          font-weight: bold;
        `
      : undefined}
  font-size: ${({ $isMeta }) => ($isMeta ? "16px" : "14px")}
`;

export function allPuzzlesHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const renderedRounds = Object.entries(teamState.rounds).map(
    ([roundKey, round]) => {
      const renderPuzzle = (
        slot: string,
        { slug, is_meta }: { slug: string; is_meta?: boolean },
      ) => {
        const puzzle = PUZZLES[slug];
        const title = puzzle?.title ?? `Stub puzzle for slot ${slot}`;
        const answer = teamState.puzzles[slug]?.answer;
        return (
          <PuzzleRow key={slot} $isMeta={is_meta ?? false}>
            <td key="puzzle">
              <a href={`/puzzles/${slug}`}>{title}</a>
            </td>
            <td key="answer">
              <code>{answer ? answer : undefined}</code>
            </td>
          </PuzzleRow>
        );
      };
      const renderedMetaRows = Object.entries(round.slots)
        .filter(([_slot, { is_meta }]) => {
          return !!is_meta;
        })
        .map(([slot, slotObj]) => {
          return renderPuzzle(slot, slotObj);
        });
      const renderedNonMetaRows = Object.entries(round.slots)
        .filter(([_slot, { is_meta }]) => {
          return !is_meta;
        })
        .map(([slot, slotObj]) => {
          return renderPuzzle(slot, slotObj);
        });
      return (
        <div key={roundKey}>
          <h3>{round.title}</h3>
          <table>
            <tbody>
              <>
                {renderedMetaRows}
                {renderedNonMetaRows}
              </>
            </tbody>
          </table>
        </div>
      );
    },
  );

  const node = (
    <div>
      <ContentWithNavBar teamState={teamState}>
        <h1>All puzzles</h1>
        {renderedRounds}
      </ContentWithNavBar>
    </div>
  );

  return {
    node,
    title: "All puzzles",
  };
}

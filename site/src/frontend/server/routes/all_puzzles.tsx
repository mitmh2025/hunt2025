import { type Request } from "express";
import React from "react";
import Layout from "../../components/Layout";
import { PUZZLES } from "../../puzzles";

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
        const style = {
          fontWeight: is_meta ? "bold" : undefined,
          fontSize: is_meta ? "16px" : "14px",
        };
        return (
          <tr key={slot} style={style}>
            <td key="puzzle">
              <a href={`/puzzles/${slug}`}>{title}</a>
            </td>
            <td key="answer">
              <code>{answer ? answer : undefined}</code>
            </td>
          </tr>
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
  return (
    <Layout teamState={req.teamState}>
      <div>
        <h1>All puzzles</h1>
        {renderedRounds}
      </div>
    </Layout>
  );
}

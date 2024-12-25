import React from "react";
import { type PuzzleDefinition } from "./types";

type BlacklightOpts = {
  answer: string;
  asset: string;
  assetAlt: string;
};

export function blacklightPuzzle(
  base: PuzzleDefinition,
  opts: BlacklightOpts,
): PuzzleDefinition {
  const Puzzle = base.content.component;
  const Solution = base.solution.component;

  return {
    ...base,
    title: `${base.title} (Under Blacklight)`,
    slug: `${base.slug}_blacklight`,
    content: {
      ...base.content,
      component: function BlacklightPuzzle(props) {
        return (
          <>
            <img
              src={opts.asset}
              style={{
                maxWidth: "600px",
                margin: "24px auto",
                display: "block",
              }}
              alt={opts.assetAlt}
            />
            <Puzzle {...props} />
          </>
        );
      },
    },
    solution: {
      ...base.solution,
      component: function BlacklightSolution(props) {
        // TODO: blacklight-specific solution?
        return <Solution {...props} />;
      },
    },
    answer: opts.answer,
    // TODO: blacklight-specific hints?
    hints: [],
  };
}

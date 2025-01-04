import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../components/CopyToClipboard";
import LinkedImage from "../components/LinkedImage";
import { type PuzzleDefinition } from "./types";

type BlacklightOpts = {
  answer: string;
  asset: string;
  assetAlt: string;
};

const StyledLinkedImage = styled(LinkedImage)`
  max-width: 600px;
  margin: 24px auto;
  display: block;
`;

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
            <StyledLinkedImage src={opts.asset} alt={opts.assetAlt} />
            <div className={COPY_ONLY_CLASS}>{opts.assetAlt}</div>
            <Puzzle {...props} />
          </>
        );
      },
      copyable: true,
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

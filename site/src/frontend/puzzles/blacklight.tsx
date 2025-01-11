import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../components/CopyToClipboard";
import LinkedImage from "../components/LinkedImage";
import { type ModalInternalExtra } from "../rounds/illegal_search/types";
import { type PuzzleDefinition } from "./types";

const StyledLinkedImage = styled(LinkedImage)`
  max-width: 600px;
  margin: 24px auto;
  display: block;
`;

export function blacklightPuzzle(
  base: PuzzleDefinition,
  answer: string,
  extra: ModalInternalExtra,
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
            <StyledLinkedImage src={extra.asset} alt={extra.altText} />
            <div className={COPY_ONLY_CLASS}>{extra.altText}</div>
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
    answer: answer,
    // TODO: blacklight-specific hints?
    hints: [],
  };
}

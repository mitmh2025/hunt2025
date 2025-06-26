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
  return {
    ...base,
    title: `${base.title} (Under Blacklight)`,
    code_name: base.code_name,
    slug: `${base.slug}_blacklight`,
    content: {
      ...base.content,
      component: {
        lazy: async () => {
          const Puzzle =
            typeof base.content.component === "object"
              ? await base.content.component.lazy().then((m) => m.default)
              : base.content.component;

          return {
            default: (props) => {
              return (
                <>
                  <StyledLinkedImage src={extra.asset} alt={extra.altText} />
                  <div className={COPY_ONLY_CLASS}>{extra.altText}</div>
                  <Puzzle {...props} />
                </>
              );
            },
          };
        },
      },
      copyable: true,
    },
    solution: {
      ...base.solution,
      component: {
        lazy: async () => {
          const Solution =
            typeof base.solution.component === "object"
              ? await base.solution.component.lazy().then((m) => m.default)
              : base.solution.component;

          return {
            default: (props) => {
              return <Solution {...props} />;
            },
          };
        },
      },
    },
    answer: answer,
    // TODO: blacklight-specific hints?
    hints: [],
  };
}

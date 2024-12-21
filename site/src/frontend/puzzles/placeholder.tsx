import React from "react";

const Puzzle = (answer: string) => {
  return () => {
    return (
      <>
        <p>Please submit <code>{answer}</code> as the answer to this puzzle.</p>
      </>
    );
  }
};

const Solution = () => {
  return (
    <>
      <p>Solutions are not needed for this testsolve.</p>
    </>
  );
};

export function makePlaceholder(slug: string, title: string, answer: string) {
  return {
    title,
    slug,
    initial_description: "A puzzle",
    answer,
    authors: [],
    editors: [],
    additional_credits: [],
    hints: [],
    canned_responses: [],
    content: {
      component: Puzzle(answer),
    },
    solution: {
      component: Solution,
    },
  };
};

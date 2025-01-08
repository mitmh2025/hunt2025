import React from "react";
import { styled } from "styled-components";
import { type GuessResponse, PuzzleStatus } from "./Typedefs";

const Green = styled.span`
  color: #04c104;
`;

const Red = styled.span`
  color: #ff0000;
  text-decoration: underline;
`;

type GuessResponseProps = {
  guessResponse: GuessResponse;
};

export default function GuessResponseView({
  guessResponse,
}: GuessResponseProps): JSX.Element {
  if (guessResponse.status === PuzzleStatus.CHECK) {
    return (
      <div>
        ✅ <Green>{guessResponse.response}</Green>
      </div>
    );
  } else if (guessResponse.status === PuzzleStatus.QUESTION) {
    return <div>❓ {guessResponse.response}</div>;
  } else {
    let before = "";
    let red = "";
    let after = "";
    for (const [index, char] of guessResponse.response.split("").entries()) {
      if (index === guessResponse.firstIncorrectIndex) {
        red = char;
      } else if (red === "") {
        before = before + char;
      } else {
        after = after + char;
      }
    }
    return (
      <div>
        ❌ <Green>{before}</Green>
        <Red>{red}</Red>
        {after}
      </div>
    );
  }
}

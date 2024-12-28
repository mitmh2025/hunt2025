import React from "react";
import { styled } from "styled-components";
import { deviceMax } from "../../utils/breakpoints";

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;

  > div {
    padding: 0 1rem;
  }

  @media ${deviceMax.lg} {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">How did Ferdinand get out of the country?</p>
      <FlexContainer>
        <div>January 1, 1921</div>
        <div>January 1, 1939</div>
        <div>January 1, 1946</div>
        <div>January 1, 1993</div>
      </FlexContainer>
    </>
  );
};

export default Puzzle;

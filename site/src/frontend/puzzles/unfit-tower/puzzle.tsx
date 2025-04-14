import React from "react";
import { styled } from "styled-components";
import rootUrl from "../../utils/rootUrl";

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 800px;
  min-height: 600px;
  border: 0;
`;

const Puzzle = () => {
  return (
    <StyledIframe
      id="maze-of-lies-iframe"
      title="Maze of Lies"
      src={`${rootUrl}/puzzles/maze_of_lies/rooms/`}
    />
  );
};

export default Puzzle;

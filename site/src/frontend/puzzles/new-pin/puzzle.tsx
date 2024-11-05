import React from "react";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  padding-left: 16px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <strong>Problem 1.</strong> An MIT math coach was conducting a class for
        students from Harvard and MIT. Each student was asked how many other MIT
        students were there. The sum of the answers was 323. How many in the
        room were from MIT?
      </p>
      <p>
        <div>
          <strong>Problem 2.</strong>
        </div>
        <StyledDiv>“John has more than twenty books,” said Pete.</StyledDiv>
        <StyledDiv>“No, he has fewer than twenty books,” said Ann.</StyledDiv>
        <StyledDiv>“He definitely has at least one book,” said Mary.</StyledDiv>
        <StyledDiv>“John has at least two books,” said Bob.</StyledDiv>
        If exactly two statements are true, how many books does John have?
      </p>
      <p>
        <strong>Problem 3.</strong> Five points are given in 3D space that do
        not all lie on the same plane. How many vertices does their convex hull
        have?
      </p>
      <p>
        <strong>Problem 4.</strong> A prime number that is closely surrounded by
        other prime numbers is called a <i>crowded prime number.</i> More
        precisely, such a prime number has another prime number not more than 2
        away on each side. Yesterday I hosted a party and noticed that the
        number of my guests was a crowded prime number. How many guests did I
        have?
      </p>
    </>
  );
};

export default Puzzle;

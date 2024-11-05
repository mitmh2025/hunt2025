import React from "react";

import { Math, MI, MN, MO } from "../../components/MathML";

const Solution = (): JSX.Element => {
  return (
    <>
      <p>First, we solve each puzzle.</p>
      <p>
        <strong>Problem 1.</strong> Denote the number of MIT students as{" "}
        <Math>
          <MI>m</MI>
        </Math>{" "}
        and Harvard students as{" "}
        <Math>
          <MI>h</MI>
        </Math>
        . The MIT student would reply{" "}
        <Math>
          <MO>(</MO>
          <MI>m</MI>
          <MO>-</MO>
          <MN>1</MN>
          <MO>)</MO>
        </Math>
        , and the Harvard student{" "}
        <Math>
          <MI>m</MI>
        </Math>
        . The total is{" "}
        <Math>
          <MI>m</MI>
          <MO>(</MO>
          <MI>m</MI>
          <MO>-</MO>
          <MN>1</MN>
          <MO>)</MO>
          <MO>+</MO>
          <MI>h</MI>
          <MI>m</MI>
          <MO>=</MO>
          <MI>m</MI>
          <MO>(</MO>
          <MI>h</MI>
          <MO>+</MO>
          <MI>m</MI>
          <MO>-</MO>
          <MN>1</MN>
          <MO>)</MO>
          <MO>-</MO>
          <MN>323</MN>
        </Math>
        . Solving this, there are two options{" "}
        <Math>
          <MI>m</MI>
          <MO>=</MO>
          <MN>1</MN>
        </Math>{" "}
        or{" "}
        <Math>
          <MI>m</MI>
          <MO>=</MO>
          <MN>17</MN>
        </Math>
        . Adding the coach, we get two answers to the problem: 2 and 18.
      </p>
      <p>
        <strong>Problem 2.</strong> If John has more than 20 books, then Pete,
        Mary, and Bob are correct. If he has 2 to 19 books, then Ann, Mary, and
        Bob are correct. If he has 20 books, then Mary and Bob are correct. If
        he has 1 book, then Ann and Mary are correct. If he has 0 books, then
        only Ann is correct. Thus, he has either 1 or 20 books.
      </p>
      <p>
        <strong>Problem 3.</strong> The convex hull can’t have 3 points, as
        otherwise, all the points would be in the same plane as the convex hull.
        It can have 5 points in a general setting or 4 points if the convex hull
        is a polyhedron and the other point is inside.
      </p>
      <p>
        <strong>Problem 4.</strong> The answers 3 and 5. All larger prime
        numbers are odd. If there are three consecutive odd numbers that are
        primes, then one of them is divisible by three. Thus, the only such
        triple is 3-5-7. Thus, 5 works. Also, 3 is a special case as it is close
        to 2.
      </p>
      <p>
        The problems look like they might have a unique answer, and the second
        answer is easy to miss. The first AHA moment is that each problem has
        two answers. After that, the smallest answer is in the set 1,2,3,4 and
        provides the ordering. The second answer provides the letter.
      </p>
      <p>We have 1 - 20, 2 - 19, 3 - 5, and 4 - 5. The answer is TREE.</p>
    </>
  );
};

export default Solution;

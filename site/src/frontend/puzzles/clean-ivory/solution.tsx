import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import {
  Math,
  MFrac,
  MI,
  MN,
  MO,
  MRow,
  MSqrt,
  MSub,
  MSup,
} from "../../components/MathML";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 300px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OverflownP = styled.p`
  max-width: 100%;
  overflow-x: auto;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is based on the “chiral aperiodic monotile” discovered in
        2023 and dubbed the “spectre”. The word SPECTRE appears in all caps in
        the puzzle title to help you find it if you are not already familiar
        with this discovery. First you have to solve the jig-saw part of the
        puzzle. This solution looks like this:
      </p>
      <LinkedImage
        src={image1}
        alt="A completed jigsaw puzzle superimposed on the physical paper pickup. The jigsaw pieces are irregularly-shaped and irregularly-tesselating. Lines are drawn on top, labeled from 1 to 10."
      />
      <p>
        All the pieces are identical, so there is no right or wrong place to put
        any individual piece. If you align the solved jig-saw puzzle to the
        squiggly outline on the printed paper, the endpoints of the 10 lines
        should coincide with vertices of the jig-saw pieces. The straight lines
        have been labeled 1 through 10 in order of increasing length (clued by
        “increasing lengths”). The “exactness” tells you you should find the
        exact lengths of these lines, but in terms of what units?
      </p>
      <p>
        The squiggly-edged jig-saw pieces (shown in red) are called “spectres”
        but the straight-edged shapes etched onto the jigsaw pieces (shown in
        blue) are also called Tile(1,1), where 1 represents the length of each
        edge. Tile(1,1) is shown below, with each edge of length 1 except the
        long edge with labeled length 2. All angles are either 90° (marked with
        a right-angle indicator) or 120° (marked with an arc), which implies
        that each blue segment in the solved jigsaw puzzle is of length 1, and
        its angle is a multiple of 30°.
      </p>
      <FlexWrapper>
        <SizedImage
          src={image2}
          alt="A Tile(1,1), with angles and length-2 edge labeled."
        />
      </FlexWrapper>
      <p>
        The length of an edge of this shape is the unit you should use to find
        the exact lengths of the ten lines. You will need to do some math to
        solve this puzzle, hinted at by “mathematical precision”.
      </p>
      <h3>Method 1 (complex numbers)</h3>
      <p>
        You can use complex numbers, and let{" "}
        <Math>
          <MI>a</MI>
          <MO>=</MO>
          <MFrac>
            <MRow>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
              <MO>+</MO>
              <MI>i</MI>
            </MRow>
            <MRow>
              <MN>2</MN>
            </MRow>
          </MFrac>
          <MO>=</MO>
          <MSup>
            <MSub>
              <MI>e</MI>
            </MSub>
            <MSub>
              <MI>i</MI>
              <MI>π</MI>
              <MO>/</MO>
              <MN>6</MN>
            </MSub>
          </MSup>
        </Math>{" "}
        represent the complex number of unit length and angle 30°, then any path
        that follows edges of Tile(1,1) can be represented as a sum of powers of{" "}
        <Math>
          <MI>a</MI>
        </Math>
        . Here is an example zooming in on line #5:
      </p>
      <LinkedImage
        src={image3}
        alt="A path drawn out on a zoomed in crop of the jigsaw above."
      />
      <p>
        The arrows are labeled with the power of{" "}
        <Math>
          <MI>a</MI>
        </Math>{" "}
        used, so summing up we get:
      </p>
      <OverflownP>
        <Math>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>7</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>9</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>0</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>2</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>11</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>1</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>10</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>0</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>9</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>11</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>2</MN>
          </MSup>
          <MO>+</MO>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>0</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>9</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>7</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>10</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>0</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>0</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>2</MN>
          </MSup>{" "}
          <MO>=</MO> <MN>5</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>0</MN>
          </MSup>
          <MO>+</MO>{" "}
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>1</MN>
          </MSup>
          <MO>+</MO>
          <MN>3</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>2</MN>
          </MSup>
          <MO>+</MO>
          <MN>2</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>7</MN>
          </MSup>
          <MO>+</MO>
          <MN>3</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>9</MN>
          </MSup>
          <MO>+</MO>
          <MN>2</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>10</MN>
          </MSup>
          <MO>+</MO>
          <MN>2</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MN>11</MN>
          </MSup>
        </Math>
        .
      </OverflownP>
      <p>
        Or if you notice there the powers 6 to 11 are just negatives of 0 to 5,
        there are only 6 different directions, so this simplifies to:
      </p>
      <OverflownP>
        <Math>
          <MO>=</MO> <MN>5</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MSub>
              <MN>0</MN>
            </MSub>
          </MSup>
          <MO>&#x2212;</MO>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MSub>
              <MN>1</MN>
            </MSub>
          </MSup>
          <MO>+</MO>
          <MN>3</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MSub>
              <MN>2</MN>
            </MSub>
          </MSup>
          <MO>&#x2212;</MO>
          <MN>3</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MSub>
              <MN>3</MN>
            </MSub>
          </MSup>
          <MO>&#x2212;</MO>
          <MN>2</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MSub>
              <MN>4</MN>
            </MSub>
          </MSup>
          <MO>&#x2212;</MO>
          <MN>2</MN>
          <MSup>
            <MSub>
              <MI>a</MI>
            </MSub>
            <MSub>
              <MN>5</MN>
            </MSub>
          </MSup>
        </Math>
      </OverflownP>
      <p>
        The length of the line can be found using a symbolic solver like Maple
        or{" "}
        <a
          href="https://www.wolframalpha.com/input?i=Norm%285a%5E0%2Ba%5E1%2B3a%5E2%2B2a%5E7%2B3a%5E9%2B2a%5E10%2B2a%5E11%29%2C+where+a%3De%5E%7Bi*pi%2F6%7D"
          target="_blank"
          rel="noreferrer"
        >
          Wolfram Alpha
        </a>
        , and for this example comes out to:
      </p>
      <Math>
        <MSqrt>
          <MN>3</MN>
          <MO stretchy={true} symmetric={true}>
            (
          </MO>
          <MN>26</MN>
          <MO>+</MO>
          <MSqrt>
            <MN>3</MN>
          </MSqrt>
          <MO stretchy={true} symmetric={true}>
            )
          </MO>
        </MSqrt>{" "}
        <MO>=</MO>{" "}
        <MSqrt>
          <MN>78</MN>
          <MO>+</MO>
          <MN>3</MN>
          <MSqrt>
            <MN>3</MN>
          </MSqrt>
        </MSqrt>
      </Math>
      <h3>Method 2 (no complex numbers)</h3>
      <p>
        If you don’t want to use complex numbers, you can think of each segment
        as a vector that points in one of the 12 clock face directions. The
        xy-coordinates of each vector are:
      </p>
      <FlexWrapper>
        <div>
          1 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          2 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          3 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MN>0</MN>
            <MO separator={true}>,</MO>
            <MN>1</MN>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          4 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          5 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          6 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MN>0</MN>
            <MO separator={true}>,</MO>
            <MO>&#x2212;</MO>
            <MN>1</MN>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          7 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          8 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          9 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MO>&#x2212;</MO>
            <MN>1</MN>
            <MO separator={true}>,</MO>
            <MN>0</MN>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          10 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          11 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MO>&#x2212;</MO>
            <MFrac>
              <MRow>
                <MN>1</MN>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO separator={true}>,</MO>
            <MFrac>
              <MRow>
                <MSqrt>
                  <MN>3</MN>
                </MSqrt>
              </MRow>
              <MRow>
                <MN>2</MN>
              </MRow>
            </MFrac>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
        <div>
          12 o’clock: →{" "}
          <Math>
            <MO stretchy={true} symmetric={true}>
              (
            </MO>
            <MN>0</MN>
            <MO separator={true}>,</MO>
            <MN>1</MN>
            <MO stretchy={true} symmetric={true}>
              )
            </MO>
          </Math>
        </div>
      </FlexWrapper>
      <p>
        You can add up these vectors and keep track of the total xy-coordinates
        and use the Pythagoras Theorem to find the length of each line.
      </p>
      <h3>Extraction</h3>
      <p>
        The exact lengths of each of the ten lines are (in order of length):
      </p>
      <FlexWrapper>
        <div>
          Line #1:{" "}
          <Math>
            <MSqrt>
              <MN>38</MN> <MO>+</MO> <MN>20</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>8.5229…</MN>
          </Math>
        </div>
        <div>
          Line #2:{" "}
          <Math>
            <MSqrt>
              <MN>58</MN> <MO>+</MO> <MN>9</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>8.5783…</MN>
          </Math>
        </div>
        <div>
          Line #3:{" "}
          <Math>
            <MSqrt>
              <MN>57</MN> <MO>+</MO> <MN>12</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>8.8195…</MN>
          </Math>
        </div>
        <div>
          Line #4:{" "}
          <Math>
            <MSqrt>
              <MN>70</MN> <MO>+</MO> <MN>5</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>8.8690…</MN>
          </Math>
        </div>
        <div>
          Line #5:{" "}
          <Math>
            <MSqrt>
              <MN>78</MN> <MO>+</MO> <MN>3</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>9.1211…</MN>
          </Math>
        </div>
        <div>
          Line #6:{" "}
          <Math>
            <MSqrt>
              <MN>52</MN> <MO>+</MO> <MN>21</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>9.4006…</MN>
          </Math>
        </div>
        <div>
          Line #7:{" "}
          <Math>
            <MSqrt>
              <MN>55</MN> <MO>+</MO> <MN>20</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>9.4678…</MN>
          </Math>
        </div>
        <div>
          Line #8:{" "}
          <Math>
            <MSqrt>
              <MN>56</MN> <MO>+</MO> <MN>20</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>9.5205…</MN>
          </Math>
        </div>
        <div>
          Line #9:{" "}
          <Math>
            <MSqrt>
              <MN>82</MN> <MO>+</MO> <MN>5</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>9.5215…</MN>
          </Math>
        </div>
        <div>
          Line #10:{" "}
          <Math>
            <MSqrt>
              <MN>61</MN> <MO>+</MO> <MN>18</MN>
              <MSqrt>
                <MN>3</MN>
              </MSqrt>
            </MSqrt>{" "}
            <MO>=</MO> <MN>9.6008…</MN>
          </Math>
        </div>
      </FlexWrapper>
      <p>
        You can measure the ten lines with a ruler to verify that you have the
        correctly calculated lengths as it is quite easy to make a counting
        mistake.
      </p>
      <p>
        If you take the coefficients of{" "}
        <Math>
          <MSqrt>
            <MN>3</MN>
          </MSqrt>
        </Math>{" "}
        as hinted at by the word “irrational”, you get 20, 9, 12, 5, 3, 21, 20,
        20, 5 and 18 which are all in the range 1 to 26. Taking the
        corresponding letter of the alphabet (1=A, 2=B, etc.), you get the
        answer <PuzzleAnswer>TILECUTTER</PuzzleAnswer>. Appropriate for a puzzle
        in which aperiodic mono-<Mono>TILE</Mono>s were made using a laser{" "}
        <Mono>CUTTER</Mono>.
      </p>
      <h3>Helpful links</h3>
      <ul>
        <li>
          <a
            href="https://arxiv.org/abs/2303.10798"
            target="_blank"
            rel="noreferrer"
          >
            Original Paper showing Tile(1,1)
          </a>
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2305.17743"
            target="_blank"
            rel="noreferrer"
          >
            Followup paper showing curved edges and coining “Spectre”
          </a>
        </li>
        <li>
          <a
            href="https://cs.uwaterloo.ca/~csk/spectre/app.html"
            target="_blank"
            rel="noreferrer"
          >
            Online generator for Spectre tilings
          </a>
        </li>
        <li>
          <a
            href="https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/aperiodic-spectre/#:~:text=All%20of%20the%20angles%20between%20consecutive%20edges%20of%20the%20Spectre%20tile%20are%20either%2090%C2%B0%20or%20120%C2%B0%20(or%20180%C2%B0%20at%20the%20straight%20vertex%20in%20the%20middle%20of%20the%20double%2Dlength%20edge)%3A"
            target="_blank"
            rel="noreferrer"
          >
            Site showing edge-lengths and vertex-angles of the spectre
          </a>
        </li>
      </ul>
    </>
  );
};

export default Solution;

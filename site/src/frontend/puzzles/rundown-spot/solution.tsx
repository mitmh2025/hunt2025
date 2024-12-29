import React from "react";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper } from "../../components/StyledUI";
import img1 from "./assets/solution1.png";
import img2 from "./assets/solution2.png";

const tableContents = [
  ["low:", "(LOW) DOWN, DO YOUR EARS HANG (LOW)"],
  ["even:", "BREAK (EVEN), (EVEN) MONEY, NOT (EVEN) WRONG"],
  ["red:", "(RED) CROSS, (RED) RIDING HOOD, (RED) SOX"],
  ["black:", "(BLACK) MARKET, (BLACK) PANTHER, (BLACK) SHEEP"],
  ["odd:", "FAIRLY (ODD)PARENTS, (ODD) HOURS"],
  ["high:", "(HIGH) AND DRY, (HIGH) SCHOOL, (HIGH) STRUNG"],
];

const Solution = () => {
  return (
    <>
      <p>
        As hinted by the title, the dropquote represents a roulette wheel –
        specifically, a European roulette wheel with only one green 0 slot
        (compared to the American variant with 0 and 00):
      </p>
      <LinkedImage alt="A European roulette wheel" src={img1} />
      <p>
        The flavortext and the colors/images in the center 0 slot all hint at
        the six outside bets in a game of roulette, which pay out at 1:1. Those
        six bets are odd, even, low, high, red, and black.
      </p>
      <p>
        For each bet, you can go around the roulette wheel clockwise and drop
        one letter from each slot to spell out words or phrases. Those phrases{" "}
        <b>should</b> contain the name of the bet, but the name is elided:
      </p>
      <LinkedImage alt="The solved dropquote" src={img2} />
      <HScrollTableWrapper>
        <table>
          <tr>
            <th>bet</th>
            <th>words/phrases</th>
          </tr>
          {tableContents.map(([bet, words], index) => (
            <tr key={index}>
              <td>{bet}</td>
              <td>{words}</td>
            </tr>
          ))}
        </table>
      </HScrollTableWrapper>
      <p>
        There is one letter left over in each of the thirty-seven slots. Read
        them in numerical order from 0 to 36 to get the answer: HAL INSTITUTE
        FOR CRIMINALLY INSANE ROBOTS.
      </p>
    </>
  );
};

export default Solution;

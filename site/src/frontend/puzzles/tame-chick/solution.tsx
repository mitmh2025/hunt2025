import React from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import { Highlight, WordBlock } from "./puzzle";

const Table = styled.table`
  margin: 0 auto;

  td {
    text-align: left;
    vertical-align: middle;
  }

  th.pickupline {
    width: 45%;
  }
  th.innuendo {
    width: 35%;
  }
  th.extracted {
    width: 5%;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        This puzzle is all about kitchen and food-related stuff that is also sex
        stuff.
      </p>

      <p>
        The pickup lines in the top are given in no particular order, so the
        final answer will be read in that order. These must be matched with the
        responses in the bottom, which are alphabetized by the missing words.
      </p>
      <p>
        Reading out the highlighted blanks spells out FLIRT WITH BARTENDER,
        which solvers must do at the Gala to receive the final answer:{" "}
        <PuzzleAnswer>LET THEM EAT CAKE</PuzzleAnswer>.
      </p>
      <HScrollTableWrapper>
        <Table>
          <thead>
            <tr>
              <th className="pickupline"></th>
              <th className="innuendo"></th>
              <th className="answers"></th>
              <th className="extracted"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>...do you want to whip my meringue?</td>
              <td>
                I’ll give you a{" "}
                <WordBlock>
                  S _ _ _ <Highlight>_</Highlight>
                </WordBlock>
                <WordBlock>P _ _ _</WordBlock>
              </td>
              <td>STIFF PEAK</td>
              <td>F</td>
            </tr>
            <tr>
              <td>...how about we prepare this melon?</td>
              <td>
                I’m down to <WordBlock>S _ _ _ _</WordBlock>
                <WordBlock>
                  B _ _ <Highlight>_</Highlight> _
                </WordBlock>
              </td>
              <td>SCOOP BALLS</td>
              <td>L</td>
            </tr>
            <tr>
              <td>...you look like a pair of kitchen shears.</td>
              <td>
                I’ve always wanted to try{" "}
                <WordBlock>
                  S _ <Highlight>_</Highlight> _ _ _ _ _ _ _
                </WordBlock>
              </td>
              <td>SCISSORING</td>
              <td>I</td>
            </tr>
            <tr>
              <td>...do you want to spatchcock this bird?</td>
              <td>
                We’ll have to{" "}
                <WordBlock>
                  S _ <Highlight>_</Highlight> _ _ _
                </WordBlock>
                <WordBlock>T _ _</WordBlock>
                <WordBlock>L _ _ _</WordBlock>
              </td>
              <td>SPREAD THE LEGS</td>
              <td>R</td>
            </tr>
            <tr>
              <td>
                ...are you a hammer? Because you could tenderize this beef.
              </td>
              <td>
                Sure, I’ll help you <WordBlock>B _ _ _</WordBlock>
                <WordBlock>Y _ _ _</WordBlock>
                <WordBlock>
                  M _ _ <Highlight>_</Highlight>
                </WordBlock>
              </td>
              <td>BEAT YOUR MEAT</td>
              <td>T</td>
            </tr>
            <tr>
              <td>...you look like you know how to flambe.</td>
              <td>
                I can{" "}
                <WordBlock>
                  B _ _ <Highlight>_</Highlight>
                </WordBlock>
                a <WordBlock>T _ _ _ _</WordBlock>
                <br />
              </td>
              <td>BLOW TORCH</td>
              <td>W</td>
            </tr>
            <tr>
              <td>...you look like some very fine coffee.</td>
              <td>
                I spend a lot of time{" "}
                <WordBlock>
                  G _ <Highlight>_</Highlight> _ _ _ _ _
                </WordBlock>
              </td>
              <td>GRINDING</td>
              <td>I</td>
            </tr>
            <tr>
              <td>...you look like you could use some olive juice in that.</td>
              <td>
                You know I like it{" "}
                <WordBlock>
                  D _ _ <Highlight>_</Highlight> _
                </WordBlock>
              </td>
              <td>DIRTY</td>
              <td>T</td>
            </tr>
            <tr>
              <td>...do you want to see my fried chicken?</td>
              <td>
                <WordBlock>B _ _ _ _ _ _</WordBlock>or{" "}
                <WordBlock>
                  T _ _ _ <Highlight>_</Highlight> _?
                </WordBlock>
                <br />
              </td>
              <td>BREASTS THIGHS</td>
              <td>H</td>
            </tr>
            <tr>
              <td>...can you help me salt this margarita?</td>
              <td>
                Yeah, I like a <WordBlock>R _ _</WordBlock>
                <WordBlock>
                  J _ <Highlight>_</Highlight>
                </WordBlock>
              </td>
              <td>RIM JOB</td>
              <td>B</td>
            </tr>
            <tr>
              <td>
                ...how about you, me, some bananas, custard, and whipped topping
                get a room?
              </td>
              <td>
                I never turn down a{" "}
                <WordBlock>
                  C _ _ <Highlight>_</Highlight> _
                </WordBlock>
                <WordBlock>P _ _</WordBlock>
              </td>
              <td>CREAM PIE</td>
              <td>A</td>
            </tr>
            <tr>
              <td>
                ...do you want to stick together some novelty ice cream treats?
              </td>
              <td>
                I’ll put a <WordBlock>M _ _ _ _ _</WordBlock>on your{" "}
                <WordBlock>
                  C <Highlight>_</Highlight> _ _ _ _ _ _ _ _
                </WordBlock>
              </td>
              <td>MAGNUM CREAMSICLE</td>
              <td>R</td>
            </tr>
            <tr>
              <td>
                ...is your name Mary Berry? Because you look a little
                underbaked.
              </td>
              <td>
                I’ll show you my <WordBlock>S _ _ _ _</WordBlock>
                <WordBlock>
                  B _ <Highlight>_</Highlight> _ _ _
                </WordBlock>
              </td>
              <td>SOGGY BOTTOM</td>
              <td>T</td>
            </tr>
            <tr>
              <td>...do you want some help juicing lemons?</td>
              <td>
                Give them a{" "}
                <WordBlock>
                  S _ _ <Highlight>_</Highlight> _ _ _
                </WordBlock>
              </td>
              <td>SQUEEZE</td>
              <td>E</td>
            </tr>
            <tr>
              <td>...how about I give you a bag of blueberries?</td>
              <td>
                I’ll take it in my{" "}
                <WordBlock>
                  M _ _ _ _ <Highlight>_</Highlight>
                </WordBlock>
              </td>
              <td>MUFFIN</td>
              <td>N</td>
            </tr>
            <tr>
              <td>...do you want to toss some salad?</td>
              <td>
                Only if it’s{" "}
                <WordBlock>
                  U _ _ <Highlight>_</Highlight> _ _ _ _ _
                </WordBlock>
              </td>
              <td>UNDRESSED</td>
              <td>D</td>
            </tr>
            <tr>
              <td>...how about some Jamaican food?</td>
              <td>
                I do love a good{" "}
                <WordBlock>
                  J <Highlight>_</Highlight> _ _
                </WordBlock>
              </td>
              <td>JERK</td>
              <td>E</td>
            </tr>
            <tr>
              <td>...you seem like you could use a strip of chicken.</td>
              <td>
                Yeah, give me a{" "}
                <WordBlock>
                  F _ _ _ _ <Highlight>_</Highlight>
                </WordBlock>
              </td>
              <td>FINGER</td>
              <td>R</td>
            </tr>
          </tbody>
        </Table>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;

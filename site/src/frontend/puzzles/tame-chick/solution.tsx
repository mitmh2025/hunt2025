import React from "react";
import { styled } from "styled-components";
import { HighlightedSpot } from "./puzzle";

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
        which solvers must do at the Gala to receive the final answer.
      </p>
      <p>
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
                I'll give you a S _ _ _ <HighlightedSpot>_</HighlightedSpot> P _
                _ _
              </td>
              <td>STIFF PEAK</td>
              <td>F</td>
            </tr>
            <tr>
              <td>...how about we prepare this melon?</td>
              <td>
                I'm down to S _ _ _ _ B _ _ <HighlightedSpot>_</HighlightedSpot>{" "}
                _
              </td>
              <td>SCOOP BALLS</td>
              <td>L</td>
            </tr>
            <tr>
              <td>...you look like a pair of kitchen shears.</td>
              <td>
                I've always wanted to try S _{" "}
                <HighlightedSpot>_</HighlightedSpot> _ _ _ _ _ _ _
              </td>
              <td>SCISSORING</td>
              <td>I</td>
            </tr>
            <tr>
              <td>...do you want to spatchcock this bird?</td>
              <td>
                We'll have to S _ <HighlightedSpot>_</HighlightedSpot> _ _ _ T _
                _ L _ _ _
              </td>
              <td>SPREAD THE LEGS</td>
              <td>R</td>
            </tr>
            <tr>
              <td>
                ...are you a hammer? Because you could tenderize this beef.
              </td>
              <td>
                Sure, I'll help you B _ _ _ Y _ _ _ M _ _{" "}
                <HighlightedSpot>_</HighlightedSpot>
              </td>
              <td>BEAT YOUR MEAT</td>
              <td>T</td>
            </tr>
            <tr>
              <td>...you look like you know how to flambe.</td>
              <td>
                I can B _ _ <HighlightedSpot>_</HighlightedSpot> a T _ _ _ _
              </td>
              <td>BLOW TORCH</td>
              <td>W</td>
            </tr>
            <tr>
              <td>...you look like some very fine coffee.</td>
              <td>
                I spend a lot of time G <HighlightedSpot>_</HighlightedSpot> _ _
                _ _ _ _
              </td>
              <td>GRINDING</td>
              <td>I</td>
            </tr>
            <tr>
              <td>...you look like you could use some olive juice in that.</td>
              <td>
                You know I like it D _ _ <HighlightedSpot>_</HighlightedSpot> _
              </td>
              <td>DIRTY</td>
              <td>T</td>
            </tr>
            <tr>
              <td>...do you want to see my fried chicken?</td>
              <td>
                B _ _ _ _ _ _ or T _ _ _ <HighlightedSpot>_</HighlightedSpot> _?
              </td>
              <td>BREASTS THIGHS</td>
              <td>H</td>
            </tr>
            <tr>
              <td>...can you help me salt this margarita?</td>
              <td>
                Yeah, I like a R _ _ J _ <HighlightedSpot>_</HighlightedSpot>
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
                I never turn down a C _ _ <HighlightedSpot>_</HighlightedSpot> _
                P _ _
              </td>
              <td>CREAM PIE</td>
              <td>A</td>
            </tr>
            <tr>
              <td>
                ...do you want to stick together some novelty ice cream treats?
              </td>
              <td>
                I'll put a M _ _ _ _ _ on your C{" "}
                <HighlightedSpot>_</HighlightedSpot> _ _ _ _ _ _ _ _
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
                I'll show you my S _ _ _ _ B _{" "}
                <HighlightedSpot>_</HighlightedSpot> _ _ _
              </td>
              <td>SOGGY BOTTOM</td>
              <td>T</td>
            </tr>
            <tr>
              <td>...do you want some help juicing lemons?</td>
              <td>
                Give them a S _ _ <HighlightedSpot>_</HighlightedSpot> _ _ _
              </td>
              <td>SQUEEZE</td>
              <td>E</td>
            </tr>
            <tr>
              <td>...how about I give you a bag of blueberries?</td>
              <td>
                I'll take it in my M _ _ _ _{" "}
                <HighlightedSpot>_</HighlightedSpot>
              </td>
              <td>MUFFIN</td>
              <td>N</td>
            </tr>
            <tr>
              <td>...do you want to toss some salad?</td>
              <td>
                Only if it's U _ _ <HighlightedSpot>_</HighlightedSpot> _ _ _ _
                _
              </td>
              <td>UNDRESSED</td>
              <td>D</td>
            </tr>
            <tr>
              <td>...how about some Jamaican food?</td>
              <td>
                I do love a good J <HighlightedSpot>_</HighlightedSpot> _ _
              </td>
              <td>JERK</td>
              <td>E</td>
            </tr>
            <tr>
              <td>...you seem like you could use a strip of chicken.</td>
              <td>
                Yeah, give me a F _ _ _ _ <HighlightedSpot>_</HighlightedSpot>
              </td>
              <td>FINGER</td>
              <td>R</td>
            </tr>
          </tbody>
        </Table>
      </p>
    </>
  );
};

export default Solution;

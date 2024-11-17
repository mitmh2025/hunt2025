import React from "react";
import { styled } from "styled-components";

const BorderedTable = styled.table`
  border: 1px solid var(--black);
  border-collapse: collapse;
`;

const BorderedCell = styled.td`
  border: 1px solid var(--black);
  padding: 5px;
  background-color: transparent;
`;

const BorderedHeader = styled.th`
  border: 1px solid var(--black);
  padding: 5px;
  background-color: transparent;
`;

const CenteredBorderedCell = styled(BorderedCell)`
  text-align: center;
`;

const GreenBorderedCell = styled(BorderedCell)`
  background-color: #99ff99;
`;

const RedBorderedCell = styled(BorderedCell)`
  background-color: #ff9999;
`;

const BlackBorderedCell = styled(BorderedCell)`
  background-color: #000000;
  color: #ffffff;
`;

const SlateBorderedCell = styled(BorderedCell)`
  background-color: #bbbbbb;
`;

const WhiteBorderedCell = styled(BorderedCell)`
  background-color: #ffffff;
`;

const YellowBorderedCell = styled(BorderedCell)`
  background-color: #ffee99;
`;

const OrangeBorderedCell = styled(BorderedCell)`
  background-color: #ffcc99;
`;

const BrownBorderedCell = styled(BorderedCell)`
  background-color: #ddaa99;
`;

const VioletBorderedCell = styled(BorderedCell)`
  background-color: #bb99ff;
`;

const BlueBorderedCell = styled(BorderedCell)`
  background-color: #9999ff;
`;

const Solution = () => {
  return (
    <>
      <p>
        This is an interleaved clue puzzle, where two crossword clues have been
        twisted (mixed) together in each line. The first step is splitting out
        these clues and solving them.
      </p>
      <p>
        Most of the clues can be resolved unambiguously without enumerations,
        but to get all of them, solvers may need to have the major aha of the
        puzzle: each of these words is commonly paired with a color in everyday
        phrases, such as [green] THUMB, [red] BARON, and ULTRA [violet]. After
        resolving all of these, solvers should have 14 pairs of colors.
      </p>
      <p>
        The other aha is that these color pairs are used in the{" "}
        <a href="https://en.wikipedia.org/wiki/25-pair_color_code">
          25-pair code
        </a>{" "}
        code or twisted pair color code, which uses pairs of colored wires to
        encode the numbers 1-25. This is hinted via the first letters of the
        original given clues spelling TELCO COLOR CODE. Reading out the pairs of
        colors in this code and treating those numbers as letters with A=1,
        spells out a cluephrase: HOME OR TV DR FIVE.
      </p>
      <p>
        This resolves to HOUSE, but in a reapplication of the mechanic, and per
        the instruction that the final answer is two words, you need to add a
        color to get WHITE HOUSE.
      </p>
      <p>The full clue and answer list is below:</p>

      <BorderedTable>
        <thead>
          <tr>
            <BorderedHeader></BorderedHeader>
            <BorderedHeader>Twisted Clue</BorderedHeader>
            <BorderedHeader>Split Clue</BorderedHeader>
            <BorderedHeader>Answer</BorderedHeader>
            <BorderedHeader>Color</BorderedHeader>
            <BorderedHeader>Letter</BorderedHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <BorderedCell rowSpan={2}>1</BorderedCell>
            <BorderedCell rowSpan={2}>
              Ticertltaien shfoorrt oloppowessabtle dinobigitlity
            </BorderedCell>
            <BorderedCell>title for lowest nobility</BorderedCell>
            <BorderedCell>BARON</BorderedCell>
            <RedBorderedCell>RED</RedBorderedCell>
            <CenteredBorderedCell rowSpan={2}>H</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>certain short opposable digit</BorderedCell>
            <BorderedCell>THUMB</BorderedCell>
            <GreenBorderedCell>GREEN</GreenBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>2</BorderedCell>
            <BorderedCell rowSpan={2}>
              Eammmporoium grofeecerdery oorr perbodiodiegacal
            </BorderedCell>
            <BorderedCell>emporium grocery or bodega</BorderedCell>
            <BorderedCell>MARKET</BorderedCell>
            <BlackBorderedCell>BLACK</BlackBorderedCell>
            <CenteredBorderedCell rowSpan={2}>O</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>ammo feeder or periodical</BorderedCell>
            <BorderedCell>MAGAZINE</BorderedCell>
            <SlateBorderedCell>SLATE</SlateBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>3</BorderedCell>
            <BorderedCell rowSpan={2}>
              Licapaftcity fofror chadonginging tworiresk
            </BorderedCell>
            <BorderedCell>lift for changing tires</BorderedCell>
            <BorderedCell>JACK</BorderedCell>
            <BlackBorderedCell>BLACK</BlackBorderedCell>
            <CenteredBorderedCell rowSpan={2}>M</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>capacity for doing work</BorderedCell>
            <BorderedCell>ENERGY</BorderedCell>
            <GreenBorderedCell>GREEN</GreenBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>4</BorderedCell>
            <BorderedCell rowSpan={2}>
              Chicwikenpothx vithreus alalterexannaderte hodisnoreasifice
            </BorderedCell>
            <BorderedCell>with the, Alexander honorific</BorderedCell>
            <BorderedCell>GREAT</BorderedCell>
            <WhiteBorderedCell>WHITE</WhiteBorderedCell>
            <CenteredBorderedCell rowSpan={2}>E</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>chickenpox virus alternate disease</BorderedCell>
            <BorderedCell>SHINGLES</BorderedCell>
            <SlateBorderedCell>SLATE</SlateBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>5</BorderedCell>
            <BorderedCell rowSpan={2}>
              Omabsergicved rereligasiouser maresscott damry
            </BorderedCell>
            <BorderedCell>observed religious rest day</BorderedCell>
            <BorderedCell>SABBATH</BorderedCell>
            <BlackBorderedCell>BLACK</BlackBorderedCell>
            <CenteredBorderedCell rowSpan={2}>O</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>magic eraser mascot mr</BorderedCell>
            <BorderedCell>CLEAN</BorderedCell>
            <SlateBorderedCell>SLATE</SlateBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>6</BorderedCell>
            <BorderedCell rowSpan={2}>
              Chalighinst twinimester furcolongast
            </BorderedCell>
            <BorderedCell>light winter coat</BorderedCell>
            <BorderedCell>JACKET</BorderedCell>
            <YellowBorderedCell>YELLOW</YellowBorderedCell>
            <CenteredBorderedCell rowSpan={2}>R</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>chains times furlongs</BorderedCell>
            <BorderedCell>ACRES</BorderedCell>
            <GreenBorderedCell>GREEN</GreenBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>7</BorderedCell>
            <BorderedCell rowSpan={2}>Oblofemalnge dosanndkwichey</BorderedCell>
            <BorderedCell>oblong sandwich</BorderedCell>
            <BorderedCell>SUBMARINE</BorderedCell>
            <YellowBorderedCell>YELLOW</YellowBorderedCell>
            <CenteredBorderedCell rowSpan={2}>T</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>female donkey</BorderedCell>
            <BorderedCell>JENNY</BorderedCell>
            <SlateBorderedCell>SLATE</SlateBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>8</BorderedCell>
            <BorderedCell rowSpan={2}>
              Lisqueghtezed Mifruchelobit bliqueerid
            </BorderedCell>
            <BorderedCell>light Michelob beer</BorderedCell>
            <BorderedCell>ULTRA</BorderedCell>
            <VioletBorderedCell>VIOLET</VioletBorderedCell>
            <CenteredBorderedCell rowSpan={2}>V</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>squeezed fruit liquid</BorderedCell>
            <BorderedCell>JUICE</BorderedCell>
            <OrangeBorderedCell>ORANGE</OrangeBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>9</BorderedCell>
            <BorderedCell rowSpan={2}>
              Osolfafctotlyry froszensene porecrigpitanation
            </BorderedCell>
            <BorderedCell>softly frozen precipitation</BorderedCell>
            <BorderedCell>SNOW</BorderedCell>
            <WhiteBorderedCell>WHITE</WhiteBorderedCell>
            <CenteredBorderedCell rowSpan={2}>D</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>olfactory sense organ</BorderedCell>
            <BorderedCell>NOSE</BorderedCell>
            <BrownBorderedCell>BROWN</BrownBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>10</BorderedCell>
            <BorderedCell rowSpan={2}>Resploaxrt bwithy paginings</BorderedCell>
            <BorderedCell>relax by aging</BorderedCell>
            <BorderedCell>MELLOW</BorderedCell>
            <YellowBorderedCell>YELLOW</YellowBorderedCell>
            <CenteredBorderedCell rowSpan={2}>R</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>sport with pins</BorderedCell>
            <BorderedCell>BOWLING</BorderedCell>
            <GreenBorderedCell>GREEN</GreenBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>11</BorderedCell>
            <BorderedCell rowSpan={2}>
              Cosilnversever doarfling fafilsesh
            </BorderedCell>
            <BorderedCell>silver darling fish</BorderedCell>
            <BorderedCell>HERRING</BorderedCell>
            <RedBorderedCell>RED</RedBorderedCell>
            <CenteredBorderedCell rowSpan={2}>F</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>converse of false</BorderedCell>
            <BorderedCell>TRUE</BorderedCell>
            <BlueBorderedCell>BLUE</BlueBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>12</BorderedCell>
            <BorderedCell rowSpan={2}>
              Orobobecodipsent flainstster drinaverme
            </BorderedCell>
            <BorderedCell>obedient finster driver</BorderedCell>
            <BorderedCell>ROVER</BorderedCell>
            <RedBorderedCell>RED</RedBorderedCell>
            <CenteredBorderedCell rowSpan={2}>I</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>robocops last name</BorderedCell>
            <BorderedCell>MURPHY</BorderedCell>
            <BrownBorderedCell>BROWN</BrownBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>13</BorderedCell>
            <BorderedCell rowSpan={2}>
              Dedescrigeansationing fiorn mustalderture
            </BorderedCell>
            <BorderedCell>decreasing in stature</BorderedCell>
            <BorderedCell>SHRINKING</BorderedCell>
            <VioletBorderedCell>VIOLET</VioletBorderedCell>
            <CenteredBorderedCell rowSpan={2}>V</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>designation for Mulder</BorderedCell>
            <BorderedCell>AGENT</BorderedCell>
            <OrangeBorderedCell>ORANGE</OrangeBorderedCell>
          </tr>
          <tr>
            <BorderedCell rowSpan={2}>14</BorderedCell>
            <BorderedCell rowSpan={2}>
              Entracertainement pacammunesetitionter ronicknundame
            </BorderedCell>
            <BorderedCell>race pacesetter nickname</BorderedCell>
            <BorderedCell>RABBIT</BorderedCell>
            <WhiteBorderedCell>WHITE</WhiteBorderedCell>
            <CenteredBorderedCell rowSpan={2}>E</CenteredBorderedCell>
          </tr>
          <tr>
            <BorderedCell>entertainment ammunition round</BorderedCell>
            <BorderedCell>BLANK</BorderedCell>
            <SlateBorderedCell>SLATE</SlateBorderedCell>
          </tr>
        </tbody>
      </BorderedTable>
    </>
  );
};

export default Solution;

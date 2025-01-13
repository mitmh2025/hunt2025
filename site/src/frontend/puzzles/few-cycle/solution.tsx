import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import image02 from "./assets/02.png";
import image03 from "./assets/03.png";

const StyledTable = styled.table`
  margin: 0 0 1em 0;
  border-spacing: 0px;
  width: 100%;
`;

type TableCellProps = {
  bgColor?: string;
  centerText?: boolean;
  rightBlackBorder?: boolean;
  leftBlackBorder?: boolean;
};

const TableCell = styled.td<TableCellProps>`
  border: 1px solid #ccc;
  padding: 4px;
  text-align: ${(props: TableCellProps) =>
    props.centerText ? "center" : "left"};
  background-color: ${(props: TableCellProps) =>
    props.bgColor || "transparent"};
  border-right: ${(props: TableCellProps) =>
    props.rightBlackBorder ? "1px solid black" : "1px solid #ccc"};
  border-left: ${(props: TableCellProps) =>
    props.leftBlackBorder ? "1px solid black" : "1px solid #ccc"};
`;

const TableHeaderCell = styled(TableCell)`
  font-weight: bold;
`;

const Solution = () => {
  return (
    <>
      <p>
        This is a puzzle about nail polish. Solvers are presented with a list of
        weird crossword-like clues with associated indexes. The first aha is
        that these are each colors - specifically, each clue corresponds to the
        name of a punny nail polish color from the brand{" "}
        <a href="https://www.essie.com/">Essie</a>. The clues are given in
        alphabetical order of their answers/colors. The index shows which letter
        to extract.
      </p>
      <p>
        To get the ordering, solvers need to examine the “painting” at the
        bottom of the screen. The painting is made up of dots of the nail polish
        colors clued above. Solvers should notice that each color appears a
        unique number of times, with the number of appearances ranging from 1 to
        20. By counting up how many times each color appears, solvers can
        determine what order each of the 20 extracted letters should be read in.
      </p>
      <p>
        Ordering the letters correctly gives the phrase{" "}
        <Mono>COME GET YOUR NAILS DONE</Mono>. Upon calling it in, solvers are
        told to come to the gala to get their nails done.
      </p>
      <p>
        <em>
          The table at the bottom of this solution spells out this first phase.
        </em>
      </p>
      <p>
        Upon arriving at the gala, solvers are handed a bag of roofing nails
        (get it?) and a PLA plastic jig. The nails have dots of nail polish on
        their heads. At this stage, solvers need to fit nails into the slots.
        There are six different colors/lengths, which are taken from six of the
        colors used in the first phase of the puzzle (marked below with
        asterisks). Solvers can note that the nails can be grouped by length,
        and that nails of the same length all have the same color on the tops.
        Particularly observant solvers may also note that the length of the
        associated color matches the length of the nail in 8ths of inches - so
        all the ⅞ in nails have been painted with BLING IT.
      </p>
      <p>
        The jig has slots for 36 nails, and lines and dots on the front. As they
        place nails into the slots based on fit, solvers can notice that the
        number of outside lines (at 8th inch spacing) the nails cross correspond
        to the number of letters in the name of the nail’s color. By taking the
        horizontal position of the dot as an index, the solvers can extract one
        letter per nail. These letters in order left to right spell{" "}
        <PuzzleAnswer>SUBMIT THE ANSWER VERMEERS AND REMBRANDTS</PuzzleAnswer>.
      </p>
      <p>
        <em>
          See image at the bottom of this page for the correct placement of
          nails.
        </em>
      </p>
      <h4>Step 1: Clue solving</h4>

      <HScrollTableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <TableHeaderCell bgColor="#EFEFEF">Clue</TableHeaderCell>
              <TableHeaderCell bgColor="#EFEFEF" rightBlackBorder>
                index
              </TableHeaderCell>
              <TableHeaderCell leftBlackBorder>order</TableHeaderCell>
              <TableHeaderCell>letter</TableHeaderCell>
              <TableHeaderCell>color</TableHeaderCell>
              <TableHeaderCell>color</TableHeaderCell>
              <TableHeaderCell>Step2</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell bgColor="#EFEFEF">Traveling taffeta</TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                1
              </TableCell>
              <TableCell leftBlackBorder>1</TableCell>
              <TableCell>C</TableCell>
              <TableCell>chiffon the move</TableCell>
              <TableCell bgColor="#FOEFE9"></TableCell>
              <TableCell centerText={true}>*</TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                That shirt that shows your belly button is fire, better put
                yourself out
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                3
              </TableCell>
              <TableCell leftBlackBorder>2</TableCell>
              <TableCell>O</TableCell>
              <TableCell>crop top and roll</TableCell>
              <TableCell bgColor="#F7BDB7"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                A nudist‘s plea to ”hear me out”
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                9
              </TableCell>
              <TableCell leftBlackBorder>3</TableCell>
              <TableCell>M</TableCell>
              <TableCell>bare with me</TableCell>
              <TableCell bgColor="#E59C95"></TableCell>
              <TableCell centerText={true}>*</TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                WTT: incredulous exclamation for when your computer or phone act
                up
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                7
              </TableCell>
              <TableCell leftBlackBorder>4</TableCell>
              <TableCell>E</TableCell>
              <TableCell>what the tech?</TableCell>
              <TableCell bgColor="#454346"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                A laissez-faire philosophy for sharks
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                7
              </TableCell>
              <TableCell leftBlackBorder>5</TableCell>
              <TableCell>G</TableCell>
              <TableCell>any-fin goes</TableCell>
              <TableCell bgColor="#FE4E32"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                When you take a good long do-re-mi-fa at yourself?
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                5
              </TableCell>
              <TableCell leftBlackBorder>6</TableCell>
              <TableCell>E</TableCell>
              <TableCell>sol searching</TableCell>
              <TableCell bgColor="#D26D38"></TableCell>
              <TableCell centerText={true}>*</TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">Shiny fighting words</TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                7
              </TableCell>
              <TableCell leftBlackBorder>7</TableCell>
              <TableCell>T</TableCell>
              <TableCell>bling it</TableCell>
              <TableCell bgColor="#A6D2B5"></TableCell>
              <TableCell centerText={true}>*</TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                Telling someone they‘re pretty great....smelling!
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                1
              </TableCell>
              <TableCell leftBlackBorder>8</TableCell>
              <TableCell>Y</TableCell>
              <TableCell>you‘re scent-sational</TableCell>
              <TableCell bgColor="#F6F387"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                Smug warty amphibian: ”I knew it would turn out this way”
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                2
              </TableCell>
              <TableCell leftBlackBorder>9</TableCell>
              <TableCell>O</TableCell>
              <TableCell>toad you so</TableCell>
              <TableCell bgColor="#675C30"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                Have it your way boo, melancholically
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                3
              </TableCell>
              <TableCell leftBlackBorder>10</TableCell>
              <TableCell>U</TableCell>
              <TableCell>you do blue</TableCell>
              <TableCell bgColor="#7394D6"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                007‘s authorization to excite and exhilarate
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                12
              </TableCell>
              <TableCell leftBlackBorder>11</TableCell>
              <TableCell>R</TableCell>
              <TableCell>license to thrill</TableCell>
              <TableCell bgColor="#21306B"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">I make ge-lotta noise!</TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                10
              </TableCell>
              <TableCell leftBlackBorder>12</TableCell>
              <TableCell>N</TableCell>
              <TableCell>ice cream and shout</TableCell>
              <TableCell bgColor="#DA5C6E"></TableCell>
              <TableCell centerText>*</TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                The most soporific way to order a list
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                5
              </TableCell>
              <TableCell leftBlackBorder>13</TableCell>
              <TableCell>A</TableCell>
              <TableCell>from a to zzz</TableCell>
              <TableCell bgColor="#516789"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                Full of non sequiturs of the Capricorn or Cancer variety
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                8
              </TableCell>
              <TableCell leftBlackBorder>14</TableCell>
              <TableCell>I</TableCell>
              <TableCell>off tropic</TableCell>
              <TableCell bgColor="#154837"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                Traipsing aroung a very fancy party
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                3
              </TableCell>
              <TableCell leftBlackBorder>15</TableCell>
              <TableCell>L</TableCell>
              <TableCell>gala-vanting</TableCell>
              <TableCell bgColor="#5B001E"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">Maria diem?</TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                1
              </TableCell>
              <TableCell leftBlackBorder>16</TableCell>
              <TableCell>S</TableCell>
              <TableCell>seas the day</TableCell>
              <TableCell bgColor="#D6FBF3"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                Description of a fatally good home improvement project
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                3
              </TableCell>
              <TableCell leftBlackBorder>17</TableCell>
              <TableCell>D</TableCell>
              <TableCell>to diy for</TableCell>
              <TableCell bgColor="#E1490F"></TableCell>
              <TableCell centerText={true}>*</TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">Reminder for Legolas</TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                2
              </TableCell>
              <TableCell leftBlackBorder>18</TableCell>
              <TableCell>O</TableCell>
              <TableCell>note to elf</TableCell>
              <TableCell bgColor="#F0A0C0"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                Greetings! I have a lot of needs and requests
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                6
              </TableCell>
              <TableCell leftBlackBorder>19</TableCell>
              <TableCell>N</TableCell>
              <TableCell>hi maintenance</TableCell>
              <TableCell bgColor="#FFBFC3"></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <TableCell bgColor="#EFEFEF">
                One bringing totally tubular tidings
              </TableCell>
              <TableCell bgColor="#EFEFEF" rightBlackBorder>
                2
              </TableCell>
              <TableCell leftBlackBorder>20</TableCell>
              <TableCell>E</TableCell>
              <TableCell>bearer of rad news</TableCell>
              <TableCell bgColor="#FD6C29"></TableCell>
              <TableCell></TableCell>
            </tr>
          </tbody>
        </StyledTable>
      </HScrollTableWrapper>
      <h4>Step 2: Nail placement</h4>
      <LinkedImage
        src={image02}
        alt="a piece of foam with different colored nails on top"
      />
      <LinkedImage
        src={image03}
        alt="a diagram showing different depths marked across 36 columns"
      />
    </>
  );
};

export default Solution;

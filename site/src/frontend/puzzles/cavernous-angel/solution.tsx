import React from "react";
import { styled } from "styled-components";
import Dropquote from "../../components/Dropquote";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import { LAST_DROPQUOTE, makeFill, makeLabels } from "./puzzle";

const StyledTable = styled.table`
  margin-bottom: 1em;
  td {
    font-family: "Roboto Mono", monospace;
  }
  td,
  th {
    padding: 1px 8px;
  }
`;

const StyledDropquote = styled(Dropquote)`
  margin-bottom: 1em;
`;

const NEW_HEADERS: string[][] = [
  ["A", "N", "BL", "ME"],
  ["O", "A", "N", "BL"],
  ["T", "AG", "A", "N", "N"],
  ["K", "H", "A", "A", "N"],
  ["K", "E", "B", "IN"],
  ["E", "TO", "R"],
  ["T", "H", "L"],
  ["BR", "E", "Q", "L", "A"],
  ["U", "E", "E", "L", "V"],
  ["E", "IE", "L", "A"],
  ["T", "K", "A"],
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle consists of fourteen dropquotes. Each of the first thirteen
        dropquotes, once unscrambled, is a modified lyric from a song by Dessa;
        this is hinted at by the title, <i>A Badly Broken Quote</i>, which
        references one of her albums, <i>A Badly Broken Code</i>.
      </p>
      <p>
        In each quote, one of the words from the original lyric has been
        modified according to specific rules. The original word has a bigram
        substituted for one letter, and another substituted letter replaces a
        single letter elsewhere in the word. This transformation is mirrored by
        the title as well: <strong>C</strong>O<strong>D</strong>E →{" "}
        <strong>QU</strong>O<strong>T</strong>E. The dropquotes are given in
        alphabetical order by song title.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Order</th>
            <th>Title</th>
            <th>Lyrics</th>
            <th>Original Word</th>
            <th>New Word</th>
            <th>Original Letter 1</th>
            <th>New Bigram</th>
            <th>Original Letter 2</th>
            <th>New Letter</th>
          </tr>
          <tr>
            <td>1</td>
            <td>5 out of 6</td>
            <td>I don’t win them all but I’d say I take BRINE out of six</td>
            <td>FIVE</td>
            <td>BRINE</td>
            <td>F</td>
            <td>BR</td>
            <td>V</td>
            <td>N</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Decoy</td>
            <td>QUIET tape and time and then you take the turn again</td>
            <td>JUST</td>
            <td>QUIET</td>
            <td>S</td>
            <td>IE</td>
            <td>J</td>
            <td>Q</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Dutch</td>
            <td>I’m pushin’ this TOUCH all the way to the coast</td>
            <td>LUCK</td>
            <td>TOUCH</td>
            <td>L</td>
            <td>TO</td>
            <td>K</td>
            <td>H</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Fighting Fish</td>
            <td>
              VENUS’S Arrow never hits the mark / it’s always hanging there over
              its shadow
            </td>
            <td>ZENO’S</td>
            <td>VENUS’S</td>
            <td>O</td>
            <td>US</td>
            <td>Z</td>
            <td>V</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Fire Drills</td>
            <td>I’m here to file my report as the VIEWER of the wolf pack</td>
            <td>VIXEN</td>
            <td>VIEWER</td>
            <td>X</td>
            <td>EW</td>
            <td>N</td>
            <td>R</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Good Grief</td>
            <td>
              And the air got a little rough / took out the fuselage the engine
              and both BLINKS
            </td>
            <td>WINGS</td>
            <td>BLINKS</td>
            <td>W</td>
            <td>BL</td>
            <td>G</td>
            <td>K</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Grade School Games</td>
            <td>
              You can’t make me BLAME by all new rules / Some kids barely
              practice but I do
            </td>
            <td>PLAY</td>
            <td>BLAME</td>
            <td>Y</td>
            <td>ME</td>
            <td>P</td>
            <td>B</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Long Wave</td>
            <td>Rearview shows a RELOAD of dust / a ghost arisen</td>
            <td>CLOUD</td>
            <td>RELOAD</td>
            <td>C</td>
            <td>RE</td>
            <td>U</td>
            <td>A</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Momento Mori</td>
            <td>I’m hopelessly nearsighted / not much for SLAIN gazing</td>
            <td>STAR</td>
            <td>SLAIN</td>
            <td>R</td>
            <td>IN</td>
            <td>T</td>
            <td>L</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Ride</td>
            <td>
              Looks like gender’s over, race came back / Faith is a hammer with
              a book for a GRANULE
            </td>
            <td>HANDLE</td>
            <td>GRANULE</td>
            <td>H</td>
            <td>GR</td>
            <td>D</td>
            <td>U</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Rothko</td>
            <td>It’s like losing the feeling in a phantom LEMUR</td>
            <td>LIMB</td>
            <td>LEMUR</td>
            <td>B</td>
            <td>UR</td>
            <td>I</td>
            <td>E</td>
          </tr>
          <tr>
            <td>12</td>
            <td>The Crow</td>
            <td>
              You learn to live on less / you duck some you take some SAGUARO
            </td>
            <td>SQUARE</td>
            <td>SAGUARO</td>
            <td>Q</td>
            <td>AG</td>
            <td>E</td>
            <td>O</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Warsaw</td>
            <td>Man it’s murder in the morning but it’s good for CHORTLE</td>
            <td>MORALE</td>
            <td>CHORTLE</td>
            <td>M</td>
            <td>CH</td>
            <td>A</td>
            <td>T</td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        The letters that have been swapped encompass the full alphabet. There
        are now thirteen bigrams and thirteen new letters mapping to twenty-six
        letters:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Original Letter</th>
            <th>Substitution</th>
          </tr>
          <tr>
            <td>A</td>
            <td>T</td>
          </tr>
          <tr>
            <td>B</td>
            <td>UR</td>
          </tr>
          <tr>
            <td>C</td>
            <td>RE</td>
          </tr>
          <tr>
            <td>D</td>
            <td>U</td>
          </tr>
          <tr>
            <td>E</td>
            <td>O</td>
          </tr>
          <tr>
            <td>F</td>
            <td>BR</td>
          </tr>
          <tr>
            <td>G</td>
            <td>K</td>
          </tr>
          <tr>
            <td>H</td>
            <td>GR</td>
          </tr>
          <tr>
            <td>I</td>
            <td>E</td>
          </tr>
          <tr>
            <td>J</td>
            <td>Q</td>
          </tr>
          <tr>
            <td>K</td>
            <td>H</td>
          </tr>
          <tr>
            <td>L</td>
            <td>TO</td>
          </tr>
          <tr>
            <td>M</td>
            <td>CH</td>
          </tr>
          <tr>
            <td>N</td>
            <td>R</td>
          </tr>
          <tr>
            <td>O</td>
            <td>US</td>
          </tr>
          <tr>
            <td>P</td>
            <td>B</td>
          </tr>
          <tr>
            <td>Q</td>
            <td>AG</td>
          </tr>
          <tr>
            <td>R</td>
            <td>IN</td>
          </tr>
          <tr>
            <td>S</td>
            <td>IE</td>
          </tr>
          <tr>
            <td>T</td>
            <td>L</td>
          </tr>
          <tr>
            <td>U</td>
            <td>A</td>
          </tr>
          <tr>
            <td>V</td>
            <td>N</td>
          </tr>
          <tr>
            <td>W</td>
            <td>BL</td>
          </tr>
          <tr>
            <td>X</td>
            <td>EW</td>
          </tr>
          <tr>
            <td>Y</td>
            <td>ME</td>
          </tr>
          <tr>
            <td>Z</td>
            <td>V</td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        The letters in the final dropquote, which was otherwise unsolvable, can
        now be swapped with the appropriate substitutions:
      </p>
      <HScrollTableWrapper>
        <StyledDropquote
          letterbanks={NEW_HEADERS}
          labels={makeLabels(LAST_DROPQUOTE.grid)}
          fill={makeFill(LAST_DROPQUOTE.grid)}
          getAdditionalCellFillStyles={() => ({
            // Make font a bit smaller to fit two characters side by side
            fontSize: "20px",
          })}
        />
      </HScrollTableWrapper>
      <p>Solving the new dropquote yields the cluephrases:</p>
      <p>
        <Mono>
          ANNABELLE ANOTHER QUIET BLANK
          <br />
          TELL ME AGAIN HAVE BLANK TO BREAK
        </Mono>
      </p>
      <p>
        Annabelle and Tell Me Again are both Dessa songs, and the blank words
        from the corresponding lyrics yield the answer,{" "}
        <PuzzleAnswer>EVENING NEWS</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;

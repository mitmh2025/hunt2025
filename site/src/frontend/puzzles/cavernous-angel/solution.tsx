import React from "react";
import { styled } from "styled-components";
import Dropquote from "../../components/Dropquote";
import { LAST_DROPQUOTE, makeFill, makeLabels } from "./puzzle";

const StyledTable = styled.table`
  margin-bottom: 1em;
  td,
  th {
    padding: 1px 8px;
  }
`;

const Mono = styled.span`
  font-family: monospace;
`;

const StyledDropquote = styled(Dropquote)`
  margin-bottom: 1em;
`;

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
          <td>
            <Mono>F</Mono>
          </td>
          <td>
            <Mono>BR</Mono>
          </td>
          <td>
            <Mono>V</Mono>
          </td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Decoy</td>
          <td>QUIET tape and time and then you take the turn again</td>
          <td>JUST</td>
          <td>QUIET</td>
          <td>
            <Mono>S</Mono>
          </td>
          <td>
            <Mono>IE</Mono>
          </td>
          <td>
            <Mono>J</Mono>
          </td>
          <td>
            <Mono>Q</Mono>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Dutch</td>
          <td>I’m pushin’ this TOUCH all the way to the coast</td>
          <td>LUCK</td>
          <td>TOUCH</td>
          <td>
            <Mono>L</Mono>
          </td>
          <td>
            <Mono>TO</Mono>
          </td>
          <td>
            <Mono>K</Mono>
          </td>
          <td>
            <Mono>H</Mono>
          </td>
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
          <td>
            <Mono>O</Mono>
          </td>
          <td>
            <Mono>US</Mono>
          </td>
          <td>
            <Mono>Z</Mono>
          </td>
          <td>
            <Mono>V</Mono>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>Fire Drills</td>
          <td>I’m here to file my report as the VIEWER of the wolf pack</td>
          <td>VIXEN</td>
          <td>VIEWER</td>
          <td>
            <Mono>X</Mono>
          </td>
          <td>
            <Mono>EW</Mono>
          </td>
          <td>
            <Mono>N</Mono>
          </td>
          <td>
            <Mono>R</Mono>
          </td>
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
          <td>
            <Mono>W</Mono>
          </td>
          <td>
            <Mono>BL</Mono>
          </td>
          <td>
            <Mono>G</Mono>
          </td>
          <td>
            <Mono>K</Mono>
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>Grade School Games</td>
          <td>
            You can’t make me BLAME by all new rules / Some kids barely practice
            but I do
          </td>
          <td>PLAY</td>
          <td>BLAME</td>
          <td>
            <Mono>Y</Mono>
          </td>
          <td>
            <Mono>ME</Mono>
          </td>
          <td>
            <Mono>P</Mono>
          </td>
          <td>
            <Mono>B</Mono>
          </td>
        </tr>
        <tr>
          <td>8</td>
          <td>Long Wave</td>
          <td>Rearview shows a RELOAD of dust / a ghost arisen</td>
          <td>CLOUD</td>
          <td>RELOAD</td>
          <td>
            <Mono>C</Mono>
          </td>
          <td>
            <Mono>RE</Mono>
          </td>
          <td>
            <Mono>U</Mono>
          </td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>9</td>
          <td>Momento Mori</td>
          <td>I’m hopelessly nearsighted / not much for SLAIN gazing</td>
          <td>STAR</td>
          <td>SLAIN</td>
          <td>
            <Mono>R</Mono>
          </td>
          <td>
            <Mono>IN</Mono>
          </td>
          <td>
            <Mono>T</Mono>
          </td>
          <td>
            <Mono>L</Mono>
          </td>
        </tr>
        <tr>
          <td>10</td>
          <td>Ride</td>
          <td>
            Looks like gender’s over, race came back / Faith is a hammer with a
            book for a GRANULE
          </td>
          <td>HANDLE</td>
          <td>GRANULE</td>
          <td>
            <Mono>H</Mono>
          </td>
          <td>
            <Mono>GR</Mono>
          </td>
          <td>
            <Mono>D</Mono>
          </td>
          <td>
            <Mono>U</Mono>
          </td>
        </tr>
        <tr>
          <td>11</td>
          <td>Rothko</td>
          <td>It’s like losing the feeling in a phantom LEMUR</td>
          <td>LIMB</td>
          <td>LEMUR</td>
          <td>
            <Mono>B</Mono>
          </td>
          <td>
            <Mono>UR</Mono>
          </td>
          <td>
            <Mono>I</Mono>
          </td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>12</td>
          <td>The Crow</td>
          <td>
            You learn to live on less / you duck some you take some SAGUARO
          </td>
          <td>SQUARE</td>
          <td>SAGUARO</td>
          <td>
            <Mono>Q</Mono>
          </td>
          <td>
            <Mono>AG</Mono>
          </td>
          <td>
            <Mono>E</Mono>
          </td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
        <tr>
          <td>13</td>
          <td>Warsaw</td>
          <td>Man it’s murder in the morning but it’s good for CHORTLE</td>
          <td>MORALE</td>
          <td>CHORTLE</td>
          <td>
            <Mono>M</Mono>
          </td>
          <td>
            <Mono>CH</Mono>
          </td>
          <td>
            <Mono>A</Mono>
          </td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
      </StyledTable>
      <p>
        The letters that have been swapped encompass the full alphabet. There
        are now thirteen bigrams and thirteen new letters mapping to twenty-six
        letters:
      </p>
      <StyledTable>
        <tr>
          <th>Original Letter</th>
          <th>Substitution</th>
        </tr>
        <tr>
          <td>A</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>B</td>
          <td>
            <Mono>UR</Mono>
          </td>
        </tr>
        <tr>
          <td>C</td>
          <td>
            <Mono>RE</Mono>
          </td>
        </tr>
        <tr>
          <td>D</td>
          <td>
            <Mono>U</Mono>
          </td>
        </tr>
        <tr>
          <td>E</td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
        <tr>
          <td>F</td>
          <td>
            <Mono>BR</Mono>
          </td>
        </tr>
        <tr>
          <td>G</td>
          <td>
            <Mono>K</Mono>
          </td>
        </tr>
        <tr>
          <td>H</td>
          <td>
            <Mono>GR</Mono>
          </td>
        </tr>
        <tr>
          <td>I</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>J</td>
          <td>
            <Mono>Q</Mono>
          </td>
        </tr>
        <tr>
          <td>K</td>
          <td>
            <Mono>H</Mono>
          </td>
        </tr>
        <tr>
          <td>L</td>
          <td>
            <Mono>TO</Mono>
          </td>
        </tr>
        <tr>
          <td>M</td>
          <td>
            <Mono>CH</Mono>
          </td>
        </tr>
        <tr>
          <td>N</td>
          <td>
            <Mono>R</Mono>
          </td>
        </tr>
        <tr>
          <td>O</td>
          <td>
            <Mono>US</Mono>
          </td>
        </tr>
        <tr>
          <td>P</td>
          <td>
            <Mono>B</Mono>
          </td>
        </tr>
        <tr>
          <td>Q</td>
          <td>
            <Mono>AG</Mono>
          </td>
        </tr>
        <tr>
          <td>R</td>
          <td>
            <Mono>IN</Mono>
          </td>
        </tr>
        <tr>
          <td>S</td>
          <td>
            <Mono>IE</Mono>
          </td>
        </tr>
        <tr>
          <td>T</td>
          <td>
            <Mono>L</Mono>
          </td>
        </tr>
        <tr>
          <td>U</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>V</td>
          <td>
            <Mono>N</Mono>
          </td>
        </tr>
        <tr>
          <td>W</td>
          <td>
            <Mono>BL</Mono>
          </td>
        </tr>
        <tr>
          <td>X</td>
          <td>
            <Mono>EW</Mono>
          </td>
        </tr>
        <tr>
          <td>Y</td>
          <td>
            <Mono>ME</Mono>
          </td>
        </tr>
        <tr>
          <td>Z</td>
          <td>
            <Mono>V</Mono>
          </td>
        </tr>
      </StyledTable>
      <p>
        The letters in the final dropquote, which was otherwise unsolvable, can
        now be swapped with the appropriate substitutions:
      </p>
      <StyledDropquote
        labels={makeLabels(LAST_DROPQUOTE.headers, LAST_DROPQUOTE.grid)}
        fill={makeFill(LAST_DROPQUOTE.headers, LAST_DROPQUOTE.grid)}
      />
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
        <Mono>
          <strong>EVENING NEWS</strong>
        </Mono>
        .
      </p>
    </>
  );
};

export default Solution;

import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const StyledTable = styled.table`
  th,
  td {
    padding: 0px 16px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a list of a number of lines of text in
        distinct non-Roman scripts. If they try to translate these, they quickly
        realize that they’re gibberish in the languages to which the scripts
        belong. If instead, taking a hint from the flavor text, one looks at the
        keyboards for these languages, solvers realize that these are typed on
        the language’s keyboard as if they were meant to be typed on a qwerty
        keyboard (i.e. on the Amharic—Ge’ez keyboard, one types “dzongkha”).
        Solvers will also realize that these are actually (almost) typing out
        other languages with scripts represented in the puzzle. To aid in
        identification, solvers will notice that the original list is given in
        alpha order of the language that is being typed.
      </p>
      <p>
        As solvers investigate what was actually typed, they’ll find there was
        one extra key typed on each keyboard. Finding all of these extra keys,
        and taking the language keyboard → language typed mapping as a cyclic
        sort, one will find the phrase:
      </p>
      <p>
        <Mono>type mdkz;ddhd/e[d on title</Mono>
      </p>
      <p>
        The title is “keyboard” typed on the Kannada script keyboard. Following
        this instruction and typing out the given sequence of keys, solvers get
        “ಸ್ಕೆಚ್‌ಪ್ಯಾಡ್”, or <PuzzleAnswer>SKETCHPAD</PuzzleAnswer>. (Note that
        this word is a loan word from English, so hopefully solvers can get most
        of the way there even with an error in a key or two.)
      </p>
      <h3>Full data set</h3>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Order</th>
            <th>Cluephrase letter</th>
            <th>Keyboard</th>
            <th>Typed</th>
            <th>Typed + letter</th>
            <th>Typed + letter on keyboard</th>
          </tr>
          <tr>
            <td>1</td>
            <td>t</td>
            <td>georgian</td>
            <td>odia</td>
            <td>todia</td>
            <td>ტოდია</td>
          </tr>
          <tr>
            <td>2</td>
            <td>y</td>
            <td>fula</td>
            <td>georgian</td>
            <td>geyorgian</td>
            <td>𞤺𞤫𞤴𞤮𞤪𞤺𞤭𞤢𞤲</td>
          </tr>
          <tr>
            <td>3</td>
            <td>p</td>
            <td>malayalam</td>
            <td>fula</td>
            <td>pfula</td>
            <td>ജിഹതോ</td>
          </tr>
          <tr>
            <td>4</td>
            <td>e</td>
            <td>macedonian</td>
            <td>malayalam</td>
            <td>malayalame</td>
            <td>малаѕаламе</td>
          </tr>
          <tr>
            <td>5</td>
            <td>m</td>
            <td>dhivehi</td>
            <td>macedonian</td>
            <td>macedoniman</td>
            <td>މަޗެދޮނިމަނ</td>
          </tr>
          <tr>
            <td>6</td>
            <td>d</td>
            <td>cherokee</td>
            <td>dhivehi</td>
            <td>dhivedhi</td>
            <td>ᏗᎯᎢᎥᎡᏗᎯᎢ</td>
          </tr>
          <tr>
            <td>7</td>
            <td>k</td>
            <td>assamese</td>
            <td>cherokee</td>
            <td>cherokkee</td>
            <td>মপাীদককাা</td>
          </tr>
          <tr>
            <td>8</td>
            <td>z</td>
            <td>hebrew</td>
            <td>assamese</td>
            <td>zassamese</td>
            <td>זשדדשצקדק</td>
          </tr>
          <tr>
            <td>9</td>
            <td>;</td>
            <td>lao</td>
            <td>hebrew</td>
            <td>;hebrew</td>
            <td>ວ້ຳຶພຳໄ</td>
          </tr>
          <tr>
            <td>10</td>
            <td>d</td>
            <td>armenian western</td>
            <td>lao</td>
            <td>laod</td>
            <td>լաոտ</td>
          </tr>
          <tr>
            <td>11</td>
            <td>d</td>
            <td>persian</td>
            <td>armenian western</td>
            <td>armenidan western</td>
            <td>شقپثدهیشد صثسفثقد</td>
          </tr>
          <tr>
            <td>12</td>
            <td>h</td>
            <td>thai</td>
            <td>persian</td>
            <td>pershian</td>
            <td>ยำพห้รฟื</td>
          </tr>
          <tr>
            <td>13</td>
            <td>d</td>
            <td>amharic</td>
            <td>thai</td>
            <td>thadi</td>
            <td>ትሃዲ</td>
          </tr>
          <tr>
            <td>14</td>
            <td>/</td>
            <td>dzongkha</td>
            <td>amharic</td>
            <td>am/haric</td>
            <td>ཏཤཨཕཏངོའ</td>
          </tr>
          <tr>
            <td>15</td>
            <td>e</td>
            <td>santali</td>
            <td>dzongkha</td>
            <td>dezongkha</td>
            <td>ᱚᱟᱷᱫᱞᱩᱠᱯᱳ</td>
          </tr>
          <tr>
            <td>16</td>
            <td>[</td>
            <td>telugu</td>
            <td>santali</td>
            <td>[santali</td>
            <td>డేోలూోతగ</td>
          </tr>
          <tr>
            <td>17</td>
            <td>d</td>
            <td>nepali</td>
            <td>telugu</td>
            <td>teludgu</td>
            <td>तभिगमनग</td>
          </tr>
          <tr>
            <td>18</td>
            <td>o</td>
            <td>khmer</td>
            <td>nepali</td>
            <td>nepoali</td>
            <td>នេផោាលិ</td>
          </tr>
          <tr>
            <td>19</td>
            <td>n</td>
            <td>punjabi</td>
            <td>khmer</td>
            <td>khmner</td>
            <td>ਕਪਸਲਾੀ</td>
          </tr>
          <tr>
            <td>20</td>
            <td>t</td>
            <td>sinhala</td>
            <td>punjabi</td>
            <td>puntjabi</td>
            <td>චමබඑව්ඉස</td>
          </tr>
          <tr>
            <td>21</td>
            <td>i</td>
            <td>greek</td>
            <td>sinhala</td>
            <td>siinhala</td>
            <td>σιινηαλα</td>
          </tr>
          <tr>
            <td>22</td>
            <td>t</td>
            <td>burmese</td>
            <td>greek</td>
            <td>tgreek</td>
            <td>အါမနနု</td>
          </tr>
          <tr>
            <td>23</td>
            <td>l</td>
            <td>inuktitut</td>
            <td>burmese</td>
            <td>burlmese</td>
            <td>ᑕᒥᑭᓗᒪᕿᐅᕿ</td>
          </tr>
          <tr>
            <td>24</td>
            <td>e</td>
            <td>odia</td>
            <td>inuktitut</td>
            <td>inuktitute</td>
            <td>ଗଲହକୂଗୂହୂା</td>
          </tr>
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;

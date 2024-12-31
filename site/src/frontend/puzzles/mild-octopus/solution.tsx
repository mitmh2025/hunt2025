import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const MonoTD = styled.td`
  font-family: var(--monospace-font);
`;

const ScrollWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const Solution = () => {
  return (
    <>
      <p>
        This meta is part of a larger round with a shared group of feeder
        puzzles. This solution will necessarily contain spoilers for the larger
        round.
      </p>

      <p>
        In this puzzle, the solver must back-construct{" "}
        <a href="https://en.wikipedia.org/wiki/Cryptic_crossword#How_cryptic_clues_work">
          cryptic wordplays
        </a>{" "}
        which resolve to the feeder answers. The wordplays have some words
        supplied as well as numbered blanks; all blanks with the same number
        contain the same word. At bottom is a list of parenthesized numbers,
        these are the lengths of the blank-filling words. This list is also in
        alphabetical order by the blank-filling words.
      </p>

      <p>
        Once the list has been constructed, the last long set of blanks can be
        filled in to make one final wordplay which resolves to the answer to
        this meta.
      </p>

      <p>With blanks filled, the clues and feeder solutions are:</p>

      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Cryptic clue</th>
              <th>Wordplay</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Real estate area has mid style and large email sign</td>
              <MonoTD>ACR(_Y_+L+AT)E</MonoTD>
              <MonoTD>ACRYLATE</MonoTD>
            </tr>
            <tr>
              <td>Swiss mountain and one unit of energy inside</td>
              <MonoTD>ALP+(A+CAL)+AND</MonoTD>
              <MonoTD>ALPACALAND</MonoTD>
            </tr>
            <tr>
              <td>
                Email distribution tool picked up by retreating Confederate
              </td>
              <MonoTD>B(LIST)ER←</MonoTD>
              <MonoTD>BLISTER</MonoTD>
            </tr>
            <tr>
              <td>Mountain-ringed area with Swiss domain and novel</td>
              <MonoTD>M(A)T+CH+BOOK</MonoTD>
              <MonoTD>MATCHBOOK</MonoTD>
            </tr>
            <tr>
              <td>Novel openers in total</td>
              <MonoTD>NO_+NET</MonoTD>
              <MonoTD>NONET</MonoTD>
            </tr>
            <tr>
              <td>Mid-sized dash in novel style</td>
              <MonoTD>P(EN)ROSE</MonoTD>
              <MonoTD>PENROSE</MonoTD>
            </tr>
            <tr>
              <td>Novel openers</td>
              <MonoTD>PENROSE*</MonoTD>
              <MonoTD>PENROSE</MonoTD>
            </tr>
          </tbody>
        </table>
      </HScrollTableWrapper>

      <p>This makes the final wordplay:</p>

      <ScrollWrapper>
        {/* prettier-ignore */}
        <pre>Dash, dash, one large and retreating. Energy: total. Email real Swiss openers.</pre>
        {/* prettier-ignore */}
        <pre>    M        I   L     +   (L+I+M)←    E.      T.     E.    R.   S.</pre>
      </ScrollWrapper>
      <PuzzleAnswer>MILLIMETERS</PuzzleAnswer>
      <p>
        <Mono>--</Mono> is M in morse code. One, in roman numerals, is I. Large
        simply becomes L. We echo the MIL in reverse for “and retreating”. The
        remaining five letters are the first letters of the five words preceding
        “openers” – the opener of each word.
      </p>
      <p>For reference, the list of blank-filling words is:</p>
      <ol>
        <li>and</li>
        <li>area</li>
        <li>dash</li>
        <li>email</li>
        <li>energy</li>
        <li>large</li>
        <li>mid</li>
        <li>mountain</li>
        <li>novel</li>
        <li>one</li>
        <li>openers</li>
        <li>real</li>
        <li>retreating</li>
        <li>style</li>
        <li>Swiss</li>
        <li>total</li>
      </ol>
      <h3>How to solve</h3>
      <p>
        Solving this puzzle, especially with a clean forward solve, relies
        largely on examining the feeder answers and thinking how they may be
        clued cryptically, then seeing how that could fit in with the clue
        phrase structure supplied. This does require acting in a more intuitive
        and less deductive mode; trying ideas and seeing what fits, until
        finally everything fits at once. Here is one possible way that this
        could go:
      </p>
      <p>
        The third clue is largely complete, only missing two words. In
        crosswordese, Confederate, especially capitalized, can often clue REBEL
        or REB, and “picked up by” is possibly a container indicator. Looking
        through the list of answers, one sees that REDBUCKET and BLISTER both
        have the letters of REB in order, surrounding other letters. In the case
        of BLISTER, these are backwards and at the edges of the word. The clue
        does not have the structure for putting more letters after Confederate,
        so this makes BLISTER more likely. To do this, REB would have to be
        reversed, and have to be containing LIST, which does feel okay as a
        “distribution tool.”
      </p>
      <p>
        This means word 13 is a reversal indicator and word 4 something that
        goes along with “distribution tool” to have LIST be a good fill-in.
        Considering that in the first clue, word 4 also has to come immediately
        before “sign,” it would be good if “4 sign” was meaningful as well. From
        these constraints we can guess word 4 is “email,” and “email sign” in
        the first clue is cluing AT.
      </p>
      <p>
        Looking at our list of answers for AT we have ACRYLATE, ESCALATION,
        MATCHBOOK. Looking at the rest of the first clue, it starts “12 estate,”
        which suggests that 12 may be “real,” and after “12 estate 2” the first
        clue has “has,” which is another strong container indicator. Looking at
        the list of AT-containing answers, ACRYLATE has in its surroundings
        ACRE, a measure of land area, going along with the idea of real estate.
        From this we can pencil in the first answer as ACRYLATE, 12 as real, and
        likely 2 as area, as well. That leaves 7 14 1 6 to clue “YL”.
      </p>
      <p>The lists at this point are: answers:</p>
      <ol>
        <li>ACRYLATE</li>
        <li>?</li>
        <li>BLISTER</li>
        <li>?</li>
        <li>?</li>
        <li>?</li>
        <li>?</li>
      </ol>
      <p>and filling words:</p>
      <ol>
        <li>(3)</li>
        <li>area</li>
        <li>(4)</li>
        <li>email</li>
        <li>(6)</li>
        <li>(5)</li>
        <li>(3)</li>
        <li>(8)</li>
        <li>(5)</li>
        <li>(3)</li>
        <li>(7)</li>
        <li>real</li>
        <li>[reversal indicator] (10)</li>
        <li>(5)</li>
        <li>(5)</li>
        <li>(5)</li>
      </ol>
      <p>
        At this point it seems likely that both lists are alphabetical, and it
        is reasonable to continue under that assumption. Thinking about a
        reversal indicator, 10 letters long, shortly after “real”
        alphabetically, that goes well on a surface level with “Confederate,” we
        can come upon “retreating.”
      </p>
      <p>
        From the complete list of answers, only ALPACALAND is alphabetically
        between ACRYLATE and BLISTER, so is likely the second answer. The second
        clue ends with “unit of 5 inside,” indicating that there is a unit of
        whatever 5 is in the interior of the answer. “Unit of” may be a
        first-letter indicator, but looking at the string ALPACALAND we see it
        can be taken more literally, as CAL is a unit of energy (standard
        abbreviation for calorie). If word 5 were “energy,” that would also work
        very nicely with it being straight after “email” in the list. Word 1 is
        a short, three-letter word, alphabetically first in the word list, and
        common, appearing four times in the puzzle. This lends itself to “and,”
        which also appears literally in ALPACALAND.
      </p>
      <p>
        That leaves word 10 after “and” in the clue, meaning it is likely part
        of the string contained, “10 unit of energy.” This makes ALPA split
        somewhere so that the first half is clued by 15 8 and the second half by
        10. The split is most likely either ALP/A or AL/PA, as this leaves both
        parts meaningful. A three-letter word near the middle of the alphabet
        that could clue A is “one,” and “and one unit of energy inside” is
        readable on a surface level. This leaves 15 8 to clue ALP. An alp is a
        type of mountain, so perhaps word 8 in mountain, which also works nicely
        in the list order. This would make the fourth clue read, so far,
        “Mountain-ringed area with 15 domain and 9”.
      </p>
      <p>
        With standard abbreviations, “Mountain-ringed area” could clue MAT,
        which is the start of one of the feeder answers, MATCHBOOK. Word 15 is
        now both a word that goes along with mountain to clue ALP, and a word
        that is followed by “domain” to give more of MATCHBOOK. This is “Swiss,”
        as in the Swiss Alps, as well as the top-level domain for Switzerland
        being CH.
      </p>

      <p>
        This completes the second clue, and leaves the fourth clue as
        “Mountain-ringed area with Swiss domain and 9,” where 9 is five letters,
        alphabetically between mountain and one, and clues all on its own the
        string BOOK to complete MATCHBOOK. This all points to “novel.”
      </p>

      <p>
        Novel is a great word for cryptic clues, because it could also be an
        anagram indicator, and it is used in three other clues. In particular,
        the seventh clue is only “Novel 11,” which would be a great anagram
        clue, if there was a seven-letter word alphabetically between “one” and
        “real” that was an anagram for one of the feeder answers that comes
        alphabetically after MATCHBOOK. This is satisfied by “openers”
        anagramming to PENROSE.
      </p>

      <p>Summarizing the current state of play, we have answers:</p>
      <ol>
        <li>ACRYLATE</li>
        <li>ALPACALAND</li>
        <li>BLISTER</li>
        <li>MATCHBOOK</li>
        <li>?</li>
        <li>?</li>
        <li>PENROSE</li>
      </ol>
      <p>and filling words:</p>
      <ol>
        <li>and</li>
        <li>area</li>
        <li>(4)</li>
        <li>email</li>
        <li>energy</li>
        <li>(5)</li>
        <li>(3)</li>
        <li>mountain</li>
        <li>novel</li>
        <li>one</li>
        <li>openers</li>
        <li>real</li>
        <li>retreating</li>
        <li>(5)</li>
        <li>Swiss</li>
        <li>(5)</li>
      </ol>
      <p>The clues that are not fully filled out are:</p>

      <ul>
        <li>Real estate area has 7 14 and 6 email sign = ACRYLATE</li>
        <li>Novel openers in 16 = ?</li>
        <li>7-sized 3 in novel 14 = ?</li>
      </ul>

      <p>
        “Novel openers” has already been used with novel as an indicator and
        openers as fodder, what if this were to be switched around? Then
        “openers” could indicate the first two letters of “novel,” giving NO.
        There’s no space in the clue to turn this around or split it apart and
        still clue other letters, at best “in” could be indicating NO as
        contained in 16, but we have no answers that have an interior NO. What
        we do have is the answer NONET. If this were the answer, “in 16” should
        clue NET, with 16 being five letters long and after Swiss. This lends
        itself to “total.”
      </p>
      <p>
        This means that the answer to the sixth clue needs to be between NONET
        and PENROSE. This would appear to only be satisfied by OPAL, but solvers
        will struggle to find a way to make the sixth clue resolve to OPAL while
        satisfying the other clues as well. One other idea is that this is the
        answer to this puzzle itself, and this sub meta is self-feeding. Another
        possibility is that some answers are used twice, and that the sixth clue
        answer is either NONET or PENROSE again.
      </p>
      <p>
        Looking at the sixth clue, it ends in “in novel 14,” which may be that
        “novel 14” describes the outer casing of the answer. PENROSE has an
        outer casing of PROSE, which is certainly associated with novels. If
        this were the case, EN would need to be clued by “7-sized 3”. Going back
        to the first clue, “7 14 and 6” clues YL, from which it seems likely
        that “7 14” clues Y and 6 clues L. Shuffling these pieces around, we can
        say that PROSE is a novel style, Y is mid style, and EN is a mid-sized
        dash. This leaves 6 as a five-letter word that on its own clues L,
        alphabetically between energy and mid, which leads to “large.”
      </p>
      <p>
        This completes all of the clues which resolve to feeders, giving the
        final clue “Dash, dash, one large and retreating. Energy: total. Email
        real Swiss openers.” which resolves to MILLIMETERS as explained earlier.
      </p>
    </>
  );
};

export default Solution;

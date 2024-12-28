import React from "react";
import { styled } from "styled-components";
import { PuzzleAnswer } from "../../components/StyledUI";

const Table = styled.table`
  max-width: 800px;

  border-collapse: collapse;
  th,
  td {
    padding: 4px;
    border: 1px solid black;
  }
`;

const Recipe = styled.div`
  margin: 16px 0px;
`;

const Solution = () => {
  return (
    <>
      <p>
        There are 7 recipes, using a grand total of 5 feeder answers, as clued
        by the flavortext. These feeders are ESCALATION, MARCUS ODAY, PENROSE,
        PERP, TENET.
      </p>
      <p>
        Each of these recipes involves a series of word transformations,
        resulting in a cake. Specifically, as a constraint, each one is of the
        form “XXX cake” on the{" "}
        <a href="https://en.wikipedia.org/wiki/List_of_cakes">
          Wikipedia “list of cakes”
        </a>
        .
      </p>
      <p>
        These cakes can then be stacked (top to bottom), as per the last
        instruction, and “a slice” can be taken (the 4th letters) to spell out
        the answer SLIVERS.
      </p>
      <div>
        <div>
          TRE<PuzzleAnswer>S</PuzzleAnswer>LECHES
        </div>
        <div>
          LOL<PuzzleAnswer>L</PuzzleAnswer>Y
        </div>
        <div>
          BAT<PuzzleAnswer>I</PuzzleAnswer>K
        </div>
        <div>
          RED<PuzzleAnswer>V</PuzzleAnswer>ELVET
        </div>
        <div>
          CAT<PuzzleAnswer>E</PuzzleAnswer>RPILLAR
        </div>
        <div>
          OPE<PuzzleAnswer>R</PuzzleAnswer>A
        </div>
        <div>
          CAS<PuzzleAnswer>S</PuzzleAnswer>AVA
        </div>
      </div>

      <p>The full recipes are:</p>

      <Recipe>
        <strong>Recipe for TRES LECHES:</strong>
        <Table>
          <thead>
            <tr>
              <th>Step #</th>
              <th>Step</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Start with the ingredient that is a palindrome. Cut out its core
                (you can compost that), and add a letter to the end to make a
                new word.
              </td>
              <td>TENET → TEET → TEETH</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Shift the top of this word back two in the alphabet, and
                carefully fold (move the last two letters to the front) for
                another new word. Remember this technique - the intermediate
                compound you’ve just created will be helpful for another recipe
                later.
              </td>
              <td>THREE</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Now take the first starting ingredient alphabetically, remove
                the first letter and save it for later, and take a muscle from
                the middle of what’s left.
              </td>
              <td>LAT + (E)</td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Take that muscle, double a letter, and add that first letter
                that you previously reserved to form a new word. Pluralize that.
              </td>
              <td>LAT → LATT → LATTE → LATTI</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Combine your two components, translate them both to the same
                language, and enjoy!
              </td>
              <td>THREE LATTI → TRES LECHES</td>
            </tr>
          </tbody>
        </Table>
      </Recipe>

      <Recipe>
        <strong>Recipe for LOLLY</strong>
        <Table>
          <thead>
            <tr>
              <th>Step #</th>
              <th>Step</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Start with the ingredient that begins with an abbreviation for a
                stretch of time. Cut this abbreviation off (keep that for
                later), and also cut the same number of letters from the end
                (discard those).
              </td>
              <td>MARCUSODAY - MAR (save) → CUSODAY - DAY → CUSO</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Reverse what’s left and zest it (take the outside letters).
              </td>
              <td>CUSO → OSUC → OC</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Tick the abbreviation four units forward. Remember this new
                abbreviation for later — you’ll need it again. Take the last
                letter from the abbreviation.
              </td>
              <td>MAR → JUL → L</td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Spice things up by sandwiching the zest between two copies of
                this letter. Add a different letter to make a new word.
              </td>
              <td>LOCL → LOCAL</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Take the last two letters of the non-abbreviated version of the
                abbreviation you saved, and add that to the end to make another
                new word.
              </td>
              <td>LOCALLY</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Remove a chemical element, and enjoy!</td>
              <td>LOLLY</td>
            </tr>
          </tbody>
        </Table>
      </Recipe>

      <Recipe>
        <strong>Recipe for BATIK</strong>
        <Table>
          <thead>
            <tr>
              <th>Step #</th>
              <th>Step</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Start with the ingredient that contains a flower.</td>
              <td>PENROSE</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Peel off an equal number of letters from the front and back (the
                rind). Discard these and keep the rest.
              </td>
              <td>NRO</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Set aside the core (the middle letter) of what’s left to use
                later. Reverse the remainder to get a word, and take its
                opposite.
              </td>
              <td>ON → OFF</td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Double a letter that wasn’t previously doubled, and undouble a
                letter that was doubled.
              </td>
              <td>OFF → OOF</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Add the reserved (core) letter from earlier to get a new word.
              </td>
              <td>ROOF</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Take something found adjacent to this word.</td>
              <td>ROOF → ATTIC</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Misspell this word.</td>
              <td>ATIK</td>
            </tr>
            <tr>
              <td>8</td>
              <td>
                Take the first letter of the next ingredient alphabetically, and
                reflect it across the horizontal axis to get a new letter.
              </td>
              <td>P → b</td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                Add this letter to the beginning of the misspelling from
                earlier, and enjoy!
              </td>
              <td>BATIK</td>
            </tr>
          </tbody>
        </Table>
      </Recipe>

      <Recipe>
        <strong>Recipe for RED VELVET</strong>
        <Table>
          <thead>
            <tr>
              <th>Step #</th>
              <th>Step</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Start with the ingredient that, when reversed, is an important
                step in any cooking endeavor. Reverse it, remove the (new) first
                letter and rotate the (new) last letter to get a new word. Save
                this as a garnish for the last step.
              </td>
              <td>PERP → PREP → REP → REd</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                The first recipe started with a technique you were told you’d
                use later. Now is that time! Make yourself one of those
                intermediate compounds again.
              </td>
              <td>THREE</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Subtract this intermediate compound from the beginning of one of
                the ingredients.
              </td>
              <td>TEN - THREE = SEVEN</td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Slice off the first two letters and the last letter from what
                you got. Put what remains a warm place so it doubles while you
                work on the next component of the recipe.
              </td>
              <td>VE/VE</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Take the first starting ingredient alphabetically, and slice off
                the last letter. Take the middle letter of what’s left and add
                two copies of the last letter of what’s left. Tack on the last
                starting ingredient alphabetically. Mispronounce these two words
                together to get a new word, then take this word’s abbreviation.
              </td>
              <td>LOO TENET = LIEUTENANT → LT</td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                Layer your ingredients: half the doubled dough, then the first
                half of this abbreviation, then the second half of the doubled
                dough, then the second half of the abbreviation.
              </td>
              <td>VELVET</td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                Finish with the garnish you made at the start of the recipe, and
                enjoy!
              </td>
              <td>RED VELVET</td>
            </tr>
          </tbody>
        </Table>
      </Recipe>

      <Recipe>
        <strong>Recipe for CATERPILLAR</strong>
        <Table>
          <thead>
            <tr>
              <th>Step #</th>
              <th>Step</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Start with the first ingredient alphabetically.</td>
              <td>ESCALATION</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Remove three consecutive letters from this ingredient to get a
                word. Hang on to this – you’re going to need to use it in two
                different applications for this recipe.
              </td>
              <td>ELATION</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Take your first instance of this word and replace it with a
                9-letter synonym. Then take the adjective version of this new
                word, reverse it, and reserve it for use later.
              </td>
              <td>ELATION → HAPPINESS → HAPPY → YPPAH</td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Take your second instance of the intermediate mixture and shave
                off the first two letters. Then remove the middle letter from
                what remains.
              </td>
              <td>ELATION → ATION → ATON</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Shift one of the letters in this component one position in the
                alphabet to get a word.
              </td>
              <td>ATOM</td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                Starting at the second letter, cycle through the letters of this
                new component to get another new word.
              </td>
              <td>TOMATO</td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                Now it’s time to roll out your dough! Make a nice long sheet by
                taking the last letter of the word produced in Step 5, adding on
                the first reserved component, and then adding on the newest
                word.
              </td>
              <td>MYPPAHTOMATO</td>
            </tr>
            <tr>
              <td>8</td>
              <td>
                Laminate the dough by folding the second half under the first
                half. This should put the last letter directly under the first.
              </td>
              <td>
                MYPPAH
                <br />
                OTAMOT
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                Laminate again by folding the second half of your stack under
                the first half. You should have four layers now.
              </td>
              <td>
                MYP
                <br />
                OTA
                <br />
                TOM
                <br />
                HAP
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>
                Slice off the left-most end of your dough to use, and discard
                the rest. Run time backwards to get a younger version of this
                creation, and enjoy!
              </td>
              <td>MOTH → CATERPILLAR</td>
            </tr>
          </tbody>
        </Table>
      </Recipe>

      <Recipe>
        <strong>Recipe for OPERA</strong>
        <Table>
          <thead>
            <tr>
              <th>Step #</th>
              <th>Step</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Start with the shortest ingredient.</td>
              <td>PERP</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Slice off the end letter of that ingredient, shift it by 1, and
                add it back to the beginning.
              </td>
              <td>OPER</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Add a letter, and enjoy!</td>
              <td>OPERA</td>
            </tr>
          </tbody>
        </Table>
      </Recipe>

      <Recipe>
        <strong>Recipe for CASSAVA</strong>
        <Table>
          <thead>
            <tr>
              <th>Step #</th>
              <th>Step</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                In an earlier recipe, you removed three consecutive letters from
                a starting ingredient to leave behind a word. Nothing goes to
                waste in this kitchen! Grab those three letters to use in this
                recipe.
              </td>
              <td>SCA (from recipe #5 step 2)</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Cycle the first letter to the end.</td>
              <td>CAS</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Now take the starting ingredient that contains a keyboard key.
                Add what you might want to do before hitting this key to your
                three letters.
              </td>
              <td>CAS+SAVE</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Change one letter, and enjoy!</td>
              <td>CASSAVA</td>
            </tr>
          </tbody>
        </Table>
      </Recipe>
    </>
  );
};

export default Solution;

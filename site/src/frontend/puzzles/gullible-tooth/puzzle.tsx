import React from "react";
import { styled } from "styled-components";

const Recipe = styled.div`
  margin: 16px 0px;
`;

const RecipeLabel = styled.div`
  font-weight: bold;
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        It’s amazing the variety you can make with just five simple ingredients!
      </p>

      <Recipe>
        <RecipeLabel>Recipe #1</RecipeLabel>
        <ol>
          <li>
            Start with the ingredient that is a palindrome. Cut out its core
            (you can compost that), and add a letter to the end to make a new
            word.
          </li>
          <li>
            Shift the top of this word back two in the alphabet, and carefully
            fold (move the last two letters to the front) for another new word.
            Remember this technique – the intermediate compound you’ve just
            created will be helpful for another recipe later.
          </li>
          <li>
            Now take the first starting ingredient alphabetically, remove the
            first letter and save it for later, and take a muscle from the
            middle of what’s left.
          </li>
          <li>
            Take that muscle, double a letter, and add that first letter that
            you previously reserved to form a new word. Pluralize that.
          </li>
          <li>
            Combine your two components, translate them both to the same
            language, and enjoy!
          </li>
        </ol>
      </Recipe>

      <Recipe>
        <RecipeLabel>Recipe #2</RecipeLabel>
        <ol>
          <li>
            Start with the ingredient that begins with an abbreviation for a
            stretch of time. Cut this abbreviation off (keep that for later),
            and also cut the same number of letters from the end (discard
            those).
          </li>
          <li>Reverse what’s left and zest it (take the outside letters).</li>
          <li>
            Tick the abbreviation four units forward. Remember this new
            abbreviation for later – you’ll need it again. Take the last letter
            from the abbreviation.
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </Recipe>

      <Recipe>
        <RecipeLabel>Recipe #3</RecipeLabel>
        <ol>
          <li>Start with the ingredient that contains a flower.</li>
          <li>
            Peel off an equal number of letters from the front and back (the
            rind). Discard these and keep the rest.
          </li>
          <li>
            Set aside the core (the middle letter) of what’s left to use later.
            Reverse the remainder to get a word, and take its opposite.
          </li>
          <li>
            Double a letter that wasn’t previously doubled, and undouble a
            letter that was doubled.
          </li>
          <li>
            Add the reserved (core) letter from earlier to get a new word.
          </li>
          <li>Take something found adjacent to this word.</li>
          <li>Misspell this word.</li>
          <li>
            Take the first letter of the next ingredient alphabetically, and
            reflect it across the horizontal axis to get a new letter.
          </li>
          <li>
            Add this letter to the beginning of the misspelling from earlier,
            and enjoy!
          </li>
        </ol>
      </Recipe>

      <Recipe>
        <RecipeLabel>Recipe #4</RecipeLabel>
        <ol>
          <li>
            Start with the ingredient that, when reversed, is an important step
            in any cooking endeavor. Reverse it, remove the (new) first letter
            and rotate the (new) last letter to get a new word. Save this as a
            garnish for the last step.
          </li>
          <li>
            The first recipe started with a technique you were told you’d use
            later. Now is that time! Make yourself one of those intermediate
            compounds again.
          </li>
          <li>
            Subtract this intermediate compound from the beginning of one of the
            ingredients.
          </li>
          <li>
            Slice off the first two letters and the last letter from what you
            got. Put what remains a warm place so it doubles while you work on
            the next component of the recipe.
          </li>
          <li>
            Take the first starting ingredient alphabetically, and slice off the
            last letter. Take the middle letter of what’s left and add two
            copies of the last letter of what’s left. Tack on the last starting
            ingredient alphabetically. Mispronounce these two words together to
            get a new word, then take this word’s abbreviation.
          </li>
          <li>
            Layer your ingredients: half the doubled dough, then the first half
            of this abbreviation, then the second half of the doubled dough,
            then the second half of the abbreviation.
          </li>
          <li>
            Finish with the garnish you made at the start of the recipe, and
            enjoy!
          </li>
        </ol>
      </Recipe>

      <Recipe>
        <RecipeLabel>Recipe #5</RecipeLabel>
        <ol>
          <li>Start with the first ingredient alphabetically.</li>
          <li>
            Remove three consecutive letters from this ingredient to get a word.
            Hang on to this – you’re going to need to use it in two different
            applications for this recipe.
          </li>
          <li>
            Take your first instance of this word and replace it with a 9-letter
            synonym. Then take the adjective version of this new word, reverse
            it, and reserve it for use later.
          </li>
          <li>
            Take your second instance of the intermediate mixture and shave off
            the first two letters. Then remove the middle letter from what
            remains.
          </li>
          <li>
            Shift one of the letters in this component one position in the
            alphabet to get a word.
          </li>
          <li>
            Starting at the second letter, cycle through the letters of this new
            component to get another new word.
          </li>
          <li>
            Now it’s time to roll out your dough! Make a nice long sheet by
            taking the last letter of the word produced in Step 5, adding on the
            first reserved component, and then adding on the newest word.
          </li>
          <li>
            Laminate the dough by folding the second half under the first half.
            This should put the last letter directly under the first.
          </li>
          <li>
            Laminate again by folding the second half of your stack under the
            first half. You should have four layers now.
          </li>
          <li>
            Slice off the left-most end of your dough to use, and discard the
            rest. Run time backwards to get a younger version of this
            ingredient, and enjoy!
          </li>
        </ol>
      </Recipe>

      <Recipe>
        <RecipeLabel>Recipe #6</RecipeLabel>
        <ol>
          <li>Start with the shortest ingredient.</li>
          <li>
            Slice off the end letter of that ingredient, shift it by 1, and add
            it back to the beginning.
          </li>
          <li>Add a letter, and enjoy!</li>
        </ol>
      </Recipe>

      <Recipe>
        <RecipeLabel>Recipe #7</RecipeLabel>
        <ol>
          <li>
            In an earlier recipe, you removed three consecutive letters from a
            starting ingredient to leave behind a word. Nothing goes to waste in
            this kitchen! Grab those three letters to use in this recipe.
          </li>
          <li>Cycle the first letter to the end.</li>
          <li>
            Now take the starting ingredient that contains a keyboard key. Add
            what you might want to do before hitting this key to your three
            letters.
          </li>
          <li>Change one letter, and enjoy!</li>
        </ol>
      </Recipe>

      <p>
        Now that you’ve practiced making all these recipes, it’s time to make
        your masterpiece! Take one of each and stack them up. Cut yourself a
        slice, and enjoy!
      </p>
    </>
  );
};

export default Puzzle;

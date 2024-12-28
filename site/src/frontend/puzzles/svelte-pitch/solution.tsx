import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid var(--true-black);
  margin-bottom: 1em;
  td {
    padding: 1px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle is presented as a recipe website. There is a very long
        introduction, a lack of actual recipes (“coming soon!”), but a
        functional comment section. The comment section features a number of
        strange recipe substitutions.
      </p>
      <p>
        Skipping to the end, as one might do on a normal recipe website, the
        comments under each recipe describe substitutions to the same original
        recipe with strange intermediate sentences. However, the starting
        recipes are not provided.
      </p>
      <p>
        A quick skim might reveal there are a lot of synonyms of “first,”
        “start,” or “initial” in the introduction text. Reading the first
        letters of the introduction text provides the recipes: “bacon steak
        bread calzone pasta salad taco”. Each series of comment sections uses
        one of these words, in that order, to carry out a series of wordplay
        transformations. There are hints in each to confirm each transformation,
        as well as a final rating (e.g. “perfect 5 out of 7”) that provide a
        final letter extraction from each final word. The final phrase is{" "}
        <Mono>ONE BIT BLENDED IN PAN FIVE FOUR</Mono>, which is wordplay for the
        final answer, <Mono>P(ONEBIT)*AN</Mono>, or{" "}
        <PuzzleAnswer>PINTO BEAN</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <td>
            I took out the blueberries and added in raspberries instead. It came
            out looking like a nut wearing a jaunty cap. But I got kind of
            frustrated with the recipe at this point so I poured the whole thing
            into a hole in my backyard and waited about 30-40 years. Sure,
            something came out of it, but the recipe took too long. 1 out of 7.
          </td>
          <td>bacon</td>
          <td>acorn</td>
          <td>oak tree</td>
          <td>O</td>
        </tr>
        <tr>
          <td>
            I added raisins and stir fried it, but I guess I cooked it too much
            because it came out black. The recipe looks like it’s supposed to be
            a particular shade of crimson, so I added some of the original color
            back and tossed it together. I think this might pair well with some
            chili or barbeque but I don’t really like those anyway so I’d give
            this a 4 out of 9.
          </td>
          <td>bacon</td>
          <td>carbon</td>
          <td>cornbread</td>
          <td>N</td>
        </tr>
        <tr>
          <td>
            I removed the anise and cinnamon and added back in a little bit of
            oatmeal, strawberries, and tofu. I think it made for a more urban
            flair. I took it across the river, and wound up here. 9 out of 9.
          </td>
          <td>bacon</td>
          <td>boston</td>
          <td>cambridge</td>
          <td>E</td>
        </tr>
      </StyledTable>
      <StyledTable>
        <tr>
          <td>
            I left out the salt and tabasco and added in lettuce because I like
            it better that way. Unfortunately the bowl I was using developed a
            crack and everything started dripping out of it, so I had to hurry
            before it all spilled out. I threw in some butter in because butter
            makes everything better, but that wasn’t enough to rescue it. In the
            end the whole experience was kind of dismal. 1 out of 5.
          </td>
          <td>steak</td>
          <td>leak</td>
          <td>bleak</td>
          <td>B</td>
        </tr>
        <tr>
          <td>
            Not sure what came over me when I was making it, but I felt
            compelled to put it in a box and shake it heavily when I was done.
            The results, someone could write an ode about. I added some mint and
            ice and shook it some more, but I don’t think it turned out very
            well. I don’t think I really messed up though, I blame the recipe. 2
            out of 7.
          </td>
          <td>steak</td>
          <td>keats</td>
          <td>mistake</td>
          <td>I</td>
        </tr>
        <tr>
          <td>
            I added some rambutan to the recipe but I don’t know if I’d do that
            again, it stained the pan I was cooking in. I took out the eggplant
            and added celery instead, and replaced the salt with sugar because
            it looks the same. It sort of follows that it didn’t work well,
            although I guess my cat walking over the top and leaving footprints
            while it was cooling also probably didn’t help. 1 out of 6.
          </td>
          <td>steak</td>
          <td>streak</td>
          <td>tracks</td>
          <td>T</td>
        </tr>
      </StyledTable>
      <StyledTable>
        <tr>
          <td>
            I tried the recipe and thought it was pretty good, with a couple of
            modifications. I stirred in an extra bit of salt and stirred it
            really hard - so hard some of it got on my facial hair, and my dad’s
            too! Be careful with that! It was really hot, so to cool it down, I
            stirred in a bit of ice and mixed harder. As an aside, it worked
            pretty well. Perfect 5 out of 7.
          </td>
          <td>bread</td>
          <td>beards</td>
          <td>sidebar</td>
          <td></td>
          <td>B</td>
        </tr>
        <tr>
          <td>
            I don’t really like dill and so I replaced it with a bit of kale. It
            seemed to need more time to cook, so I took a breather. Added some
            quickness into it and I think it could replace my morning Wheaties.
            But I waited a little longer and had it for my next meal and it was
            awful. 1 out of 5.
          </td>
          <td>bread</td>
          <td>break</td>
          <td>breakfast</td>
          <td>lunch</td>
          <td>L</td>
        </tr>
        <tr>
          <td>
            I made this recipe but I didn’t have any daikon, so I added some
            mushroom instead, although that came out a little fishy. I tried to
            fish out the bones, there must have been like 500 of them (or maybe
            480). I took a twentieth of it and added a pinch of sugar, and it
            made a dish fit for a knight! 6 out of 6.
          </td>
          <td>bread</td>
          <td>bream</td>
          <td>ream</td>
          <td>squire</td>
          <td>E</td>
        </tr>
        <tr>
          <td>
            I tried this but didn’t have any beans, because I forgot to buy any.
            I probably should have scanned the recipe more closely. But I felt
            like leaning into it so I topped it with some udon and nutella and
            decided to ignore the rest of the text anyhow. Would not recommend.
            2 out of 6.
          </td>
          <td>bread</td>
          <td>read</td>
          <td>unread</td>
          <td></td>
          <td>N</td>
        </tr>
        <tr>
          <td>
            I didn’t have any eggs so I left them out. I don’t think Mr. Pitt
            likes them much either. But then I accidentally spilled them on the
            floor. The recipe was kinda boring anyway. 1 out of 4.
          </td>
          <td>bread</td>
          <td>brad</td>
          <td>drab</td>
          <td></td>
          <td>D</td>
        </tr>
        <tr>
          <td>
            I didn’t really like the recipe as written here, so I cooked it a
            bit longer, until it was golden brown. Then I tried to scramble it.
            Felt kind of weaselly about that, so I added a little bit of
            eggplant, olives, and pork and stir fried it. Turned out really
            good! Fries are always great. I’d rate it 7 out of 8.
          </td>
          <td>bread</td>
          <td>toast</td>
          <td>stoat</td>
          <td>potatoes</td>
          <td>E</td>
        </tr>
        <tr>
          <td>
            I couldn’t find appropriate cookware so I dug a trench around my
            house, filled it with water, and mixed up the recipe in it. It came
            out...looking kind of cute? I tried but could only get through half.
            Honestly, a bit of a nightmare. 1 out of 5.
          </td>
          <td>bread</td>
          <td>dreamboat (+ moat)</td>
          <td>dream</td>
          <td></td>
          <td>D</td>
        </tr>
      </StyledTable>
      <StyledTable>
        <tr>
          <td>
            I couldn’t find any chilis or zucchini in my local general store, so
            I left them out. I hate living so far from civilization. Also after
            combining everything the okra and napa looked really soggy and so I
            picked them out. I replaced it with some iceberg and vinegar. I
            think my substitutions really helped, they revitalized the whole
            thing! The recipe as written kinda sucks though. 3 out of 5.
          </td>
          <td>calzone</td>
          <td>alone</td>
          <td>alive</td>
          <td>I</td>
        </tr>
        <tr>
          <td>
            I wanted a lighter version of this, so I swapped all the ingredients
            with the no-cal versions, and added a bit of orange. It smelled a
            little like bleach and made my eyes water. I broke off a third of it
            and it was a breath of fresh air. 6 out of 6. Would make again.
          </td>
          <td>calzone</td>
          <td>ozone</td>
          <td>oxygen</td>
          <td>N</td>
        </tr>
      </StyledTable>
      <StyledTable>
        <tr>
          <td>
            I removed some of the avocado and added egg. It got kinda sticky, so
            I added some lychee and saffron. I liked the soft colors when all
            was said and done, though it didn’t taste good so I won’t make it
            again. 1 out of 7.
          </td>
          <td>pasta</td>
          <td>paste</td>
          <td>pastels</td>
          <td>P</td>
        </tr>
        <tr>
          <td>
            I thought this recipe could use a bit of extra zing, so I added some
            lime and ube and stir fried it hard. So hard it broke the utensil I
            was using to flip everything. I fished out the peels and replaced
            them with some coriander, and took out the turnip and replaced it
            with some potato. Stirring everything really hurt my shoulder, but
            it was worth it in the end. 7 out of 7.
          </td>
          <td>pasta</td>
          <td>spatula</td>
          <td>scapula</td>
          <td>A</td>
        </tr>
        <tr>
          <td>
            I took out all of the apple and added in escarole and orzo. I’m
            trying to be more green in the kitchen, so this worked out better
            for me. I have a bit of a sweet tooth, so I also stirred in some
            nougat, ice cream, and malt. This recipe was pretty bad. How did
            this recipe even get published? Maybe the author’s related to
            someone on the recipe website. 1 out of 8.
          </td>
          <td>pasta</td>
          <td>pesto</td>
          <td>nepotism</td>
          <td>N</td>
        </tr>
      </StyledTable>
      <StyledTable>
        <tr>
          <td>
            I removed the lard and anchovies from the recipe. Why were they even
            there in the first place? This recipe is depressing. I also
            substituted the sausage for fennel. My family liked it, but I think
            they’ll forget all about it soon. 1 out of 3.
          </td>
          <td>salad</td>
          <td>sad</td>
          <td>fad</td>
          <td>F</td>
        </tr>
        <tr>
          <td>
            I cut the artichoke and sorrel from this recipe, and tossed it with
            some kale and egg. It gave me the energy to exterminate my foes! I
            kept the leftovers and scrambled them up with some salt, italian
            seasoning, and walnuts. I ate it while sitting on the side of the
            road. 2 out of 8.
          </td>
          <td>salad</td>
          <td>dalek</td>
          <td>sidewalk</td>
          <td>I</td>
        </tr>
        <tr>
          <td>
            I swapped in some vinegar and eggs in place of the dates and asiago.
            Unfortunately in the process of cooking this I burned myself and
            needed to get some ointment. I also swapped out the soy sauce for a
            little bit more vinegar. I love vinegar! I could open up a pipe and
            just pour it into my mouth all day. I’d give this recipe a 1 out of
            5 (or a 4 out of 5 for my version).
          </td>
          <td>salad</td>
          <td>salve</td>
          <td>valve</td>
          <td>V</td>
        </tr>
        <tr>
          <td>
            After making the recipe, I flipped it upside down and added a little
            bit of lemon juice, which gave it a bit of a dramatic kick, though
            also a little aftertaste of soap. I wanted to go back to tweak the
            recipe a bit more but just wound up in a state. Would give this a 2
            out of 5. The recipe size is just too big.
          </td>
          <td>salad</td>
          <td>dallas</td>
          <td>texas</td>
          <td>E</td>
        </tr>
      </StyledTable>
      <StyledTable>
        <tr>
          <td>
            I hate onions so I left them out, and then one thing led to another
            and it kind of got flipped on the ground. I blame my pet. Anyhow I
            think the recipe needed some...butter or oil or something like that,
            but once that was done it was so rich. 1 out of 6, though, don’t
            think I’d do it again.
          </td>
          <td>taco</td>
          <td>cat</td>
          <td>fatcat</td>
          <td>F</td>
        </tr>
        <tr>
          <td>
            I added a little bit of milk and applesauce, like my grandma used to
            make in the pacific northwest. I was watching the network that
            became Paramount Plus while mixing, and it accidentally fell into
            the bowl and got mixed in. Anyway it turned out pretty well!
            Wouldn’t keep this recipe locked away in a dungeon. I’d give it 6
            out of 9.
          </td>
          <td>taco</td>
          <td>tacoma</td>
          <td>catacombs</td>
          <td>O</td>
        </tr>
        <tr>
          <td>
            I didn’t have any carrots so I left those out and just flipped the
            recipe, but unfortunately in doing that I accidentally spilled some
            of my beer into the recipe, giving the whole thing a bit of a
            nautical feel. I fished out an apple and added some ugli fruit
            instead. What, do you want to fight about it or something? 3 out of
            4, could be better.
          </td>
          <td>taco</td>
          <td>boat</td>
          <td>bout</td>
          <td>U</td>
        </tr>
        <tr>
          <td>
            I didn’t have any oil so instead I just tried to scramble it harder.
            Maybe not the smartest thing, but the deed was done. I topped it off
            with some rice and an egg. I showed my family and they were all like
            :O. 1 out of 5.
          </td>
          <td>taco</td>
          <td>act</td>
          <td>react</td>
          <td>R</td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;

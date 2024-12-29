import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";

const RECIPES = [
  [
    "I took out the blueberries and added in raspberries instead. It came out looking like a nut wearing a jaunty cap. But I got kind of frustrated with the recipe at this point so I poured the whole thing into a hole in my backyard and waited about 30-40 years. Sure, something came out of it, but the recipe took too long. 1 out of 7.",
    "I added raisins and stir fried it, but I guess I cooked it too much because it came out black. The recipe looks like it’s supposed to be a particular shade of crimson, so I added some of the original color back and tossed it together. I think this might pair well with some chili or barbeque but I don’t really like those anyway so I’d give this a 4 out of 9.",
    "I removed the anise and cinnamon and added back in a little bit of oatmeal, strawberries, and tofu. I think it made for a more urban flair. I took it across the river, and wound up here. 9 out of 9.",
  ],
  [
    "I left out the salt and tabasco and added in lettuce because I like it better that way. Unfortunately the bowl I was using developed a crack and everything started dripping out of it, so I had to hurry before it all spilled out. I threw in some butter in because butter makes everything better, but that wasn’t enough to rescue it. In the end the whole experience was kind of dismal. 1 out of 5.",
    "Not sure what came over me when I was making it, but I felt compelled to put it in a box and shake it heavily when I was done. The results, someone could write an ode about. I added some mint and ice and shook it some more, but I don’t think it turned out very well. I don’t think I really messed up though, I blame the recipe. 2 out of 7.",
    "I added some rambutan to the recipe but I don’t know if I’d do that again, it stained the pan I was cooking in. I took out the eggplant and added celery instead, and replaced the salt with sugar because it looks the same. It sort of follows that it didn’t work well, although I guess my cat walking over the top and leaving footprints while it was cooling also probably didn’t help. 1 out of 6.",
  ],
  [
    "I tried the recipe and thought it was pretty good, with a couple of modifications. I stirred in an extra bit of salt and stirred it really hard - so hard some of it got on my facial hair, and my dad’s too! Be careful with that! It was really hot, so to cool it down, I stirred in a bit of ice and mixed harder. As an aside, it worked pretty well. Perfect 5 out of 7.",
    "I don’t really like dill and so I replaced it with a bit of kale. It seemed to need more time to cook, so I took a breather. Added some quickness into it and I think it could replace my morning Wheaties. But I waited a little longer and had it for my next meal and it was awful. 1 out of 5.",
    "I made this recipe but I didn’t have any daikon, so I added some mushroom instead, although that came out a little fishy. I tried to fish out the bones, there must have been like 500 of them (or maybe 480). I took a twentieth of it and added a pinch of sugar, and it made a dish fit for a knight! 6 out of 6.",
    "I tried this but didn’t have any beans, because I forgot to buy any. I probably should have scanned the recipe more closely. But I felt like leaning into it so I topped it with some udon and nutella and decided to ignore the rest of the text anyhow. Would not recommend. 2 out of 6.",
    "I didn’t have any eggs so I left them out. I don’t think Mr. Pitt likes them much either. But then I accidentally spilled them on the floor. The recipe was kinda boring anyway. 1 out of 4.",
    "I didn’t really like the recipe as written here, so I cooked it a bit longer, until it was golden brown. Then I tried to scramble it. Felt kind of weaselly about that, so I added a little bit of eggplant, olives, and pork and stir fried it. Turned out really good! Fries are always great. I’d rate it 7 out of 8.",
    "I couldn’t find appropriate cookware so I dug a trench around my house, filled it with water, and mixed up the recipe in it. It came out...looking kind of cute? I tried but could only get through half. Honestly, a bit of a nightmare. 1 out of 5.",
  ],
  [
    "I couldn’t find any chilis or zucchini in my local general store, so I left them out. I hate living so far from civilization. Also after combining everything the okra and napa looked really soggy and so I picked them out. I replaced it with some iceberg and vinegar. I think my substitutions really helped, they revitalized the whole thing! The recipe as written kinda sucks though. 3 out of 5.",
    "I wanted a lighter version of this, so I swapped all the ingredients with the no-cal versions, and added a bit of orange. It smelled a little like bleach and made my eyes water. I broke off a third of it and it was a breath of fresh air. 6 out of 6. Would make again.",
  ],
  [
    "I removed some of the avocado and added egg. It got kinda sticky, so I added some lychee and saffron. I liked the soft colors when all was said and done, though it didn’t taste good so I won’t make it again. 1 out of 7.",
    "I thought this recipe could use a bit of extra zing, so I added some lime and ube and stir fried it hard. So hard it broke the utensil I was using to flip everything. I fished out the peels and replaced them with some coriander, and took out the turnip and replaced it with some potato. Stirring everything really hurt my shoulder, but it was worth it in the end. 7 out of 7.",
    "I took out all of the apple and added in escarole and orzo. I’m trying to be more green in the kitchen, so this worked out better for me. I have a bit of a sweet tooth, so I also stirred in some nougat, ice cream, and malt. This recipe was pretty bad. How did this recipe even get published? Maybe the author’s related to someone on the recipe website. 1 out of 8.",
  ],
  [
    "I removed the lard and anchovies from the recipe. Why were they even there in the first place? This recipe is depressing. I also substituted the sausage for fennel. My family liked it, but I think they’ll forget all about it soon. 1 out of 3.",
    "I cut the artichoke and sorrel from this recipe, and tossed it with some kale and egg. It gave me the energy to exterminate my foes! I kept the leftovers and scrambled them up with some salt, italian seasoning, and walnuts. I ate it while sitting on the side of the road. 2 out of 8.",
    "I swapped in some vinegar and eggs in place of the dates and asiago. Unfortunately in the process of cooking this I burned myself and needed to get some ointment. I also swapped out the soy sauce for a little bit more vinegar. I love vinegar! I could open up a pipe and just pour it into my mouth all day. I’d give this recipe a 1 out of 5 (or a 4 out of 5 for my version).",
    "After making the recipe, I flipped it upside down and added a little bit of lemon juice, which gave it a bit of a dramatic kick, though also a little aftertaste of soap. I wanted to go back to tweak the recipe a bit more but just wound up in a state. Would give this a 2 out of 5. The recipe size is just too big.",
  ],
  [
    "I hate onions so I left them out, and then one thing led to another and it kind of got flipped on the ground. I blame my pet. Anyhow I think the recipe needed some...butter or oil or something like that, but once that was done it was so rich. 1 out of 6, though, don’t think I’d do it again.",
    "I added a little bit of milk and applesauce, like my grandma used to make in the pacific northwest. I was watching the network that became Paramount Plus while mixing, and it accidentally fell into the bowl and got mixed in. Anyway it turned out pretty well! Wouldn’t keep this recipe locked away in a dungeon. I’d give it 6 out of 9.",
    "I didn’t have any carrots so I left those out and just flipped the recipe, but unfortunately in doing that I accidentally spilled some of my beer into the recipe, giving the whole thing a bit of a nautical feel. I fished out an apple and added some ugli fruit instead. What, do you want to fight about it or something? 3 out of 4, could be better.",
    "I didn’t have any oil so instead I just tried to scramble it harder. Maybe not the smartest thing, but the deed was done. I topped it off with some rice and an egg. I showed my family and they were all like :O. 1 out of 5.",
  ],
];

const RecipeWrapper = styled.div`
  margin-bottom: 1em;
`;

const RecipeComments = styled.ul`
  list-style-type: none;
`;

const RecipeComment = styled.li`
  border: 1px solid var(--true-black);
  padding: 8px;
  margin-bottom: 8px;
`;

const PreambleWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Preamble = styled.p`
  width: 760px;
  white-space: pre;
`;

const Recipe = ({
  comments,
  index,
}: {
  comments: string[];
  index: number;
}): JSX.Element => {
  return (
    <RecipeWrapper>
      <div>
        <strong>Recipe {index}:</strong>
      </div>
      <div>Coming soon!</div>
      <div>
        <details>
          <summary>View Comments ({comments.length})</summary>
          <RecipeComments>
            {comments.map((comment, i) => (
              <RecipeComment key={`${index}-${i}`}>{comment}</RecipeComment>
            ))}
          </RecipeComments>
        </details>
      </div>
      <br className={COPY_ONLY_CLASS} />
    </RecipeWrapper>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <PreambleWrapper>
        <Preamble>
          Breakfast has always been my favorite meal. It initially stirs memory
          of holidays past, with my grandfather
          <br />
          at his chalet in the Swiss Alps. Winter mornings, starting a day
          huddled by the fireplace with a cup of hot
          <br />
          chocolate. The aroma of blintzes and crepes beginning to emerge from
          his cast iron pan warming in the
          <br />
          oven. To this day, the smell of the honey of wild bees smeared on
          toasted baguettes triggers these
          <br />
          nascent memories of my youth. My grandfather at the kitchen table
          poring over his first edition copy of
          <br />
          Swann’s Way, the rustle of the dog-eared pages mixing with the roar of
          the fire, was such pleasing music
          <br />
          to my ears. It’s in the spirit of these early, halcyon days, that I
          now present to you my recipe for an
          <br />
          excellent mixture of scrumptious ingredients sure to make even the
          grumpiest Scrooge start turning over
          <br />
          a new leaf. The pleasant blend of herbs and spices begin breathing
          life to this loaf without the need for
          <br />
          kneading. Which reminds me of the time my grandfather rose early and
          over-kneaded his holiday morning
          <br />
          buns, and we sat there chewing until it was time for lunch, our jaws
          too tired to even begin to tear into the
          <br />
          roast duck so sumptuously prepared. My grandfather started laughing,
          an uproarious sound of utter
          <br />
          euphoria, the sputtering sound echoing out to snow-capped peaks. Which
          is why our dish calls for an
          <br />
          amazing topping of shaved ice, an honor to those snowed in during the
          darkest days of the year. Early on,
          <br />
          during those days is when we start to realize how important family is
          to us, our lives, our dreams, and how
          <br />
          cooking together binds us together, the happy unity and synergy of our
          first closest bonds. You will notice
          <br />
          a unique binder in the recipe, primarily tying our dough together,
          giving it a unique crumb, a crumb that
          <br />
          lifts our preparation into the rarified air of the finest arts. For my
          grandfather was also an artist. Early on in
          <br />
          Zurich, during the summers of his youth, he would display his works in
          the little bohemian café, where he
          <br />
          one day would meet my grandmother. Sadly, she was taken from us too
          early, taken by a disease that
          <br />
          now would be easily healed. That is progress for you. But we have also
          started to progress. Now, in the
          <br />
          exact area where my grandparents spent so much of their time together,
          the kitchen. So now we unite the
          <br />
          past and present in one dish in honor of their memory. A simple dish,
          yet one flavored with the nuanced
          <br />
          affectations of familial love. But the past is past. We must also look
          to the future. I now look on my son’s
          <br />
          son, the way my grandfather first looked on me as well. I hope to pass
          on what I have learned, but also try
          <br />
          to incorporate the lessons learned by newer generations. So I
          introduce to the recipe a dash of something
          <br />
          a man like my grandfather never would have dreamed of. It adds a
          certain pizzazz to this otherwise
          <br />
          simple dish. In the kitchen at my humble ranch, nestled in the
          foothills of the Canadian Rockies, there is
          <br />
          a picture of me and my grandfather, and another of me and my grandson.
          Starting the next few weeks,
          <br />
          loaves will grace my oven–some prepared in honor of my cherished
          grandfather, some for my grandson,
          <br />
          and some, just for me. Soon, I will share with you one of these
          recipes. Or will I? I must admit I have my
          <br />
          doubts, sharing what has become such a primary, holy experience with
          you. I jest. But this loaf is holy.
          <br />
          That’s why it’s prepared in a bundt pan. The increased surface area
          results in a more even cooking, thus
          <br />
          a delectable crust. Keeping the oven at the right temperature is key.
          So it might take you a few tries to
          <br />
          crack the crust. Each oven is unique so you will have to learn the
          ways of yours. But I’ve taken up enough
          <br />
          of your time with this brief prologue. Come back next week for the
          actual recipe. Have a wonderful day.
        </Preamble>
      </PreambleWrapper>
      {RECIPES.map((comments, i) => (
        <Recipe key={i} comments={comments} index={i + 1} />
      ))}
    </>
  );
};

export default Puzzle;

import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import puzzle from "./assets/puzzle.png";

const Poem = styled.div`
  margin-bottom: 1em;
`;

const StyledImageWrapper = styled.div`
  width: 50%;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <strong>
          Content warning: this puzzle contains uncensored curse words. This
          warning is not part of the puzzle.
        </strong>
      </p>
      <Poem>
        <div>Sweetie, you know that I love you,</div>
        <div>And that love will never decrease,</div>
        <div>But you drive me fucking insane</div>
        <div>When you act like a wild beast. </div>
      </Poem>
      <Poem>
        <div>Rather than fussing, you’re stoic;</div>
        <div>
          It’s a mystery how you <em>endure</em>.
        </div>
        <div>But please God next time just tell me</div>
        <div>When your pants are full of manure.</div>
      </Poem>
      <Poem>
        <div>
          You love to play <em>follow</em> the leader;
        </div>
        <div>We’re like a mother and her baby geese.</div>
        <div>
          But do you have to do it <em>incessantly</em>?
        </div>
        <div>Just give me a damn moment’s peace!</div>
      </Poem>
      <Poem>
        <div>Next time we’re out shopping together</div>
        <div>
          And you playfully <em>drop out of view</em>,
        </div>
        <div>You get three seconds to stand up</div>
        <div>Or I’ll just fucking leave without you.</div>
      </Poem>
      <Poem>
        <div>I love that you’re proud of your drawings,</div>
        <div>And you add your name and the date!</div>
        <div>
          But, seriously, don’t <em>brag so loudly</em>.
        </div>
        <div>(They’re really not even that great.)</div>
      </Poem>
      <Poem>
        <div>
          It’s kinda cute when you <em>shrink back</em>
        </div>
        <div>
          And peek through your fingers <em>in fright</em>
        </div>
        <div>But PLEASE just take the damn medicine</div>
        <div>So you can go down for the night.</div>
      </Poem>
      <Poem>
        <div>And our kitty and puppy don’t like it</div>
        <div>
          When you <em>take a swat</em> at their tail.
        </div>
        <div>If you keep that shit up I won’t help you</div>
        <div>When they bite you and you start to wail.</div>
      </Poem>
      <Poem>
        <div>You look so cute in your outfits,</div>
        <div>But dressing’s the same tired drill.</div>
        <div>
          So stop with the damn <em>jump and twist</em> act
        </div>
        <div>And please just fucking sit still.</div>
      </Poem>
      <Poem>
        <div>I love that you’re so very active</div>
        <div>
          As you <em>charge</em> so madly about.
        </div>
        <div>
          But the next time you <em>headbutt</em> my kneecap,
        </div>
        <div>I’ll give you a reason to pout.</div>
      </Poem>
      <Poem>
        <div>By the way, the restaurant high chair</div>
        <div>Is NOT your elite soldier’s nest</div>
        <div>
          So don’t <em>shoot</em> your peas or anything else
        </div>
        <div>At every last fucking guest.</div>
      </Poem>
      <Poem>
        <div>So go to your corner and sit there</div>
        <div>While Mommy and I do some shots.</div>
        <div>Consider all of your actions</div>
        <div>And then connect the damn dots!</div>
      </Poem>
      <StyledImageWrapper>
        <LinkedImage
          src={puzzle}
          alt="A bunch of scattered dots labeled with letters."
        />
      </StyledImageWrapper>
    </>
  );
};

export default Puzzle;

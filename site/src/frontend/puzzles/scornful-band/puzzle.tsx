import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import puzzle from "./assets/puzzle.png";

const StyledStanza = styled.div`
  margin-bottom: 1em;
`;

const Stanza = ({ children }: { children: React.ReactNode }) => (
  <>
    <StyledStanza>{children}</StyledStanza>
    <br className={COPY_ONLY_CLASS} />
  </>
);

const StyledImageWrapper = styled.div`
  width: 50%;
`;

const Emphasis = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className={COPY_ONLY_CLASS}>*</span>
    <em>{children}</em>
    <span className={COPY_ONLY_CLASS}>*</span>
  </>
);

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <strong>
          Content warning: this puzzle contains uncensored curse words. This
          warning is not part of the puzzle.
        </strong>
      </p>
      <Stanza>
        <div>Sweetie, you know that I love you,</div>
        <div>And that love will never decrease,</div>
        <div>But you drive me fucking insane</div>
        <div>When you act like a wild beast. </div>
      </Stanza>
      <Stanza>
        <div>Rather than fussing, you’re stoic;</div>
        <div>
          It’s a mystery how you <Emphasis>endure</Emphasis>.
        </div>
        <div>But please God next time just tell me</div>
        <div>When your pants are full of manure.</div>
      </Stanza>
      <Stanza>
        <div>
          You love to play <Emphasis>follow</Emphasis> the leader;
        </div>
        <div>We’re like a mother and her baby geese.</div>
        <div>
          But do you have to do it <Emphasis>incessantly</Emphasis>?
        </div>
        <div>Just give me a damn moment’s peace!</div>
      </Stanza>
      <Stanza>
        <div>Next time we’re out shopping together</div>
        <div>
          And you playfully <Emphasis>drop out of view</Emphasis>,
        </div>
        <div>You get three seconds to stand up</div>
        <div>Or I’ll just fucking leave without you.</div>
      </Stanza>
      <Stanza>
        <div>I love that you’re proud of your drawings,</div>
        <div>And you add your name and the date!</div>
        <div>
          But, seriously, don’t <Emphasis>brag so loudly</Emphasis>.
        </div>
        <div>(They’re really not even that great.)</div>
      </Stanza>
      <Stanza>
        <div>
          It’s kinda cute when you <Emphasis>shrink back</Emphasis>
        </div>
        <div>
          And peek through your fingers <Emphasis>in fright</Emphasis>
        </div>
        <div>But PLEASE just take the damn medicine</div>
        <div>So you can go down for the night.</div>
      </Stanza>
      <Stanza>
        <div>And our kitty and puppy don’t like it</div>
        <div>
          When you <Emphasis>take a swat</Emphasis> at their tail.
        </div>
        <div>If you keep that shit up I won’t help you</div>
        <div>When they bite you and you start to wail.</div>
      </Stanza>
      <Stanza>
        <div>You look so cute in your outfits,</div>
        <div>But dressing’s the same tired drill.</div>
        <div>
          So stop with the damn <Emphasis>jump and twist</Emphasis> act
        </div>
        <div>And please just fucking sit still.</div>
      </Stanza>
      <Stanza>
        <div>I love that you’re so very active</div>
        <div>
          As you <Emphasis>charge</Emphasis> so madly about.
        </div>
        <div>
          But the next time you <Emphasis>headbutt</Emphasis> my kneecap,
        </div>
        <div>I’ll give you a reason to pout.</div>
      </Stanza>
      <Stanza>
        <div>By the way, the restaurant high chair</div>
        <div>Is NOT your elite soldier’s nest</div>
        <div>
          So don’t <Emphasis>shoot</Emphasis> your peas or anything else
        </div>
        <div>At every last fucking guest.</div>
      </Stanza>
      <Stanza>
        <div>So go to your corner and sit there</div>
        <div>While Mommy and I do some shots.</div>
        <div>Consider all of your actions</div>
        <div>And then connect the damn dots!</div>
      </Stanza>
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

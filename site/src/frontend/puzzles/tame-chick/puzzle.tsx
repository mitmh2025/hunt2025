import React from "react";
import { styled } from "styled-components";

export const Highlight = styled.span`
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 255, 0, 0.5) 20%,
    rgba(0, 255, 0, 0.5) 95%,
    rgba(0, 0, 0, 0) 95%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Spacer = styled.div`
  margin-top: 48px;
`;

export const WordBlock = styled.span`
  margin: 0 12px 0 0;
`;

const Innuendo = styled.span``;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        What do you mean, you want to toast the bagel?
      </p>
      <p>
        Hey baby...
        <br />
        ...do you want to whip my meringue?
        <br />
        ...how about we prepare this melon?
        <br />
        ...you look like a pair of kitchen shears.
        <br />
        ...do you want to spatchcock this bird?
        <br />
        ...are you a hammer? Because you could tenderize this beef.
        <br />
        ...you look like you know how to flambe.
        <br />
        ...you look like some very fine coffee.
        <br />
        ...you look like you could use some olive juice in that.
        <br />
        ...do you want to see my fried chicken?
        <br />
        ...can you help me salt this margarita?
        <br />
        ...how about you, me, some bananas, custard, and whipped topping get a
        room?
        <br />
        ...do you want to stick together some novelty ice cream treats?
        <br />
        ...is your name Mary Berry? Because you look a little underbaked.
        <br />
        ...do you want some help juicing lemons?
        <br />
        ...how about I give you a bag of blueberries?
        <br />
        ...do you want to toss some salad?
        <br />
        ...how about some Jamaican food?
        <br />
        ...you seem like you could use a strip of chicken.
        <br />
      </p>
      <Spacer />

      <Innuendo>
        Sure, I’ll help you <WordBlock>B _ _ _</WordBlock>
        <WordBlock>Y _ _ _</WordBlock>
        <WordBlock>
          M _ _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I can{" "}
        <WordBlock>
          B _ _ <Highlight>_</Highlight>
        </WordBlock>
        a <WordBlock>T _ _ _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        <WordBlock>B _ _ _ _ _ _</WordBlock>or{" "}
        <WordBlock>
          T _ _ _ <Highlight>_</Highlight> _?
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I never turn down a{" "}
        <WordBlock>
          C _ _ <Highlight>_</Highlight> _
        </WordBlock>
        <WordBlock>P _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        You know I like it{" "}
        <WordBlock>
          D _ _ <Highlight>_</Highlight> _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        Yeah, give me a{" "}
        <WordBlock>
          F _ _ _ _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I spend a lot of time{" "}
        <WordBlock>
          G <Highlight>_</Highlight> _ _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I do love a good{" "}
        <WordBlock>
          J <Highlight>_</Highlight> _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I’ll put a <WordBlock>M _ _ _ _ _</WordBlock>on your{" "}
        <WordBlock>
          C <Highlight>_</Highlight> _ _ _ _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I’ll take it in my{" "}
        <WordBlock>
          M _ _ _ _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        Yeah, I like a <WordBlock>R _ _</WordBlock>
        <WordBlock>
          J _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I’ve always wanted to try{" "}
        <WordBlock>
          S _ <Highlight>_</Highlight> _ _ _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I’m down to <WordBlock>S _ _ _ _</WordBlock>
        <WordBlock>
          B _ _ <Highlight>_</Highlight> _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I’ll show you my <WordBlock>S _ _ _ _</WordBlock>
        <WordBlock>
          B _ <Highlight>_</Highlight> _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        We’ll have to{" "}
        <WordBlock>
          S _ <Highlight>_</Highlight> _ _ _
        </WordBlock>
        <WordBlock>T _ _</WordBlock>
        <WordBlock>L _ _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        Give them a{" "}
        <WordBlock>
          S _ _ <Highlight>_</Highlight> _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        I’ll give you a{" "}
        <WordBlock>
          S _ _ _ <Highlight>_</Highlight>
        </WordBlock>
        <WordBlock>P _ _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo>
        Only if it’s{" "}
        <WordBlock>
          U _ _ <Highlight>_</Highlight> _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
    </>
  );
};

export default Puzzle;

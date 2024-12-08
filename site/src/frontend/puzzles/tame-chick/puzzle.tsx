import React from "react";
import { styled } from "styled-components";

export const HighlightedSpot = styled.span`
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

      <p>
        Sure, I'll help you B _ _ _ Y _ _ _ M _ _{" "}
        <HighlightedSpot>_</HighlightedSpot>
        <br />I can B _ _ <HighlightedSpot>_</HighlightedSpot> a T _ _ _ _<br />
        B _ _ _ _ _ _ or T _ _ _ <HighlightedSpot>_</HighlightedSpot> _?
        <br />I never turn down a C _ _ <HighlightedSpot>_</HighlightedSpot> _ P
        _ _<br />
        You know I like it D _ _ <HighlightedSpot>_</HighlightedSpot> _<br />
        Yeah, give me a F _ _ _ _ <HighlightedSpot>_</HighlightedSpot>
        <br />I spend a lot of time G <HighlightedSpot>_</HighlightedSpot> _ _ _
        _ _ _<br />I do love a good J <HighlightedSpot>_</HighlightedSpot> _ _
        <br />
        I'll put a M _ _ _ _ _ on your C <HighlightedSpot>_</HighlightedSpot> _
        _ _ _ _ _ _ _<br />
        I'll take it in my M _ _ _ _ <HighlightedSpot>_</HighlightedSpot>
        <br />
        Yeah, I like a R _ _ J _ <HighlightedSpot>_</HighlightedSpot>
        <br />
        I've always wanted to try S _ <HighlightedSpot>_</HighlightedSpot> _ _ _
        _ _ _ _<br />
        I'm down to S _ _ _ _ B _ _ <HighlightedSpot>_</HighlightedSpot> _<br />
        I'll show you my S _ _ _ _ B _ <HighlightedSpot>_</HighlightedSpot> _ _
        _<br />
        We'll have to S _ <HighlightedSpot>_</HighlightedSpot> _ _ _ T _ _ L _ _
        _<br />
        Give them a S _ _ <HighlightedSpot>_</HighlightedSpot> _ _ _<br />
        I'll give you a S _ _ _ <HighlightedSpot>_</HighlightedSpot> P _ _ _
        <br />
        Only if it's U _ _ <HighlightedSpot>_</HighlightedSpot> _ _ _ _ _<br />
      </p>
    </>
  );
};

export default Puzzle;

import React from "react";
import { styled } from "styled-components";
import { CopyableBlanks } from "../../components/Blanks";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import { Errata } from "../../components/StyledUI";

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

const BLANKS = [
  {
    before: "Sure, I’ll help you ",
    blanks: "B___ Y___ M___",
    highlightIndex: 13,
  },
  { before: "I can ", blanks: "B___ a T____", highlightIndex: 3 },
  { before: "", blanks: "B______ or T_____?", highlightIndex: 15 },
  { before: "I never turn down a ", blanks: "C____ P__", highlightIndex: 3 },
  { before: "You know I like it ", blanks: "D____", highlightIndex: 3 },
  { before: "Yeah, give me a ", blanks: "F_____", highlightIndex: 5 },
  { before: "I spend a lot of time ", blanks: "G_______", highlightIndex: 2 },
  { before: "I do love a good ", blanks: "J___", highlightIndex: 1 },
  {
    before: "I’ll put a ",
    blanks: "M_____ on your C_________",
    highlightIndex: 16,
  },
  { before: "I’ll take it in my ", blanks: "M_____", highlightIndex: 5 },
  { before: "Yeah, I like a ", blanks: "R__ J__", highlightIndex: 6 },
  {
    before: "I’ve always wanted to try",
    blanks: "S_________",
    highlightIndex: 2,
  },
  { before: "I’m down to ", blanks: "S____ B____", highlightIndex: 9 },
  { before: "I’ll show you my ", blanks: "S____ B_____", highlightIndex: 8 },
  { before: "We’ll have to ", blanks: "S_____ T__ L___", highlightIndex: 2 },
  { before: "Give them a ", blanks: "S______", highlightIndex: 3 },
  { before: "I’ll give you a ", blanks: "S____ P___", highlightIndex: 4 },
  { before: "Only if it’s ", blanks: "U________", highlightIndex: 2 },
];

const Puzzle = () => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 17th, at 7:00 PM",
            message:
              "On the line which starts “I spend a lot of time”, the first blank after the letter ‘G’ was originally highlighted. That has been changed to the second blank.",
          },
          {
            timestamp: "January 17th at 11:55 PM",
            message:
              "On the line which starts “Only if it’s”, the third blank after the letter ‘U’ was originally highlighted. That has been changed to the second blank.",
          },
        ]}
      />
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

      <Innuendo className={NO_COPY_CLASS}>
        Sure, I’ll help you <WordBlock>B _ _ _</WordBlock>
        <WordBlock>Y _ _ _</WordBlock>
        <WordBlock>
          M _ _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I can{" "}
        <WordBlock>
          B _ _ <Highlight>_</Highlight>
        </WordBlock>
        a <WordBlock>T _ _ _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        <WordBlock>B _ _ _ _ _ _</WordBlock>or{" "}
        <WordBlock>
          T _ _ _ <Highlight>_</Highlight> _?
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I never turn down a{" "}
        <WordBlock>
          C _ _ <Highlight>_</Highlight> _
        </WordBlock>
        <WordBlock>P _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        You know I like it{" "}
        <WordBlock>
          D _ _ <Highlight>_</Highlight> _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        Yeah, give me a{" "}
        <WordBlock>
          F _ _ _ _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I spend a lot of time{" "}
        <WordBlock>
          G _ <Highlight>_</Highlight> _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I do love a good{" "}
        <WordBlock>
          J <Highlight>_</Highlight> _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I’ll put a <WordBlock>M _ _ _ _ _</WordBlock>on your{" "}
        <WordBlock>
          C <Highlight>_</Highlight> _ _ _ _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I’ll take it in my{" "}
        <WordBlock>
          M _ _ _ _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        Yeah, I like a <WordBlock>R _ _</WordBlock>
        <WordBlock>
          J _ <Highlight>_</Highlight>
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I’ve always wanted to try{" "}
        <WordBlock>
          S _ <Highlight>_</Highlight> _ _ _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I’m down to <WordBlock>S _ _ _ _</WordBlock>
        <WordBlock>
          B _ _ <Highlight>_</Highlight> _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I’ll show you my <WordBlock>S _ _ _ _</WordBlock>
        <WordBlock>
          B _ <Highlight>_</Highlight> _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        We’ll have to{" "}
        <WordBlock>
          S _ <Highlight>_</Highlight> _ _ _
        </WordBlock>
        <WordBlock>T _ _</WordBlock>
        <WordBlock>L _ _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        Give them a{" "}
        <WordBlock>
          S _ _ <Highlight>_</Highlight> _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        I’ll give you a{" "}
        <WordBlock>
          S _ _ _ <Highlight>_</Highlight>
        </WordBlock>
        <WordBlock>P _ _ _</WordBlock>
        <br />
      </Innuendo>
      <Innuendo className={NO_COPY_CLASS}>
        Only if it’s{" "}
        <WordBlock>
          U _ <Highlight>_</Highlight> _ _ _ _ _ _
        </WordBlock>
        <br />
      </Innuendo>
      {BLANKS.map(({ before, blanks, highlightIndex }, i) => (
        <>
          <div className={COPY_ONLY_CLASS}>{before}</div>
          <CopyableBlanks
            key={i}
            structure={blanks
              .split("")
              .map((char) => (char === "_" ? char : " "))}
            fill={blanks.split("").map((char) => (char === "_" ? " " : char))}
            fillCopyPosition="above"
            getAdditionalCellStyles={(index) =>
              index === highlightIndex ? { backgroundColor: "#00ff00" } : {}
            }
          />
        </>
      ))}
    </>
  );
};

export default Puzzle;

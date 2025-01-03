import React from "react";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const Solution = () => {
  return (
    <>
      <p>
        This chatbot only accepts words typed in French (hence “chat” + GPT),
        and will respond in a combination of “miaou” and “ronron,” with some
        modifications. It turns out that there are four different ways in which
        data is encoded in the responses:
      </p>

      <ol>
        <li>
          The first letter of each response will be changed. Taking the first
          letters across the different responses will spell the hidden words:{" "}
          <Mono>CINQ SEPT</Mono>.
        </li>

        <li>
          There are eight cat noises in each response, which will either be
          “miaou” or “ronron”. (The first “miaou” will have its first letter
          changed according to rule #1.) Treat “ronron” as 1 and “miaou” as 0,
          and interpret as ASCII. The words hidden by this method are:{" "}
          <Mono>AVEC SUCRE</Mono>.
        </li>

        <li>
          <p>
            At the end of each response is a sequence of exclamation marks,
            question marks, and/or periods.
          </p>
          <p>
            These represent treating the input as a guess in a game of
            Mastermind, where “!” indicates “right letter, right position”, “?”
            indicates “right letter, wrong position”, and “.” indicates
            “unmatched letter.”
          </p>
          <p>
            The word being hidden by this method is <Mono>CHAUFFÉ</Mono>.
          </p>
        </li>

        <li>
          <p>
            Certain words of the response may “glitch out” (written in green
            monospace font with a black background). Which words glitch out will
            depend on the input string and how many valid inputs have been sent
            so far.
          </p>

          <p>
            For the first valid input, the chatbot will look for the letter “c”
            within the first eight letters of the input. As an example, if the
            very first message sent is “la concorde”, the letter ‘c’ appears in
            the third and sixth spots, so the third and sixth cat sounds will be
            glitched.
          </p>

          <p>
            For the second valid input, the chatbot will look for the letter “ô”
            instead, etc. After eleven valid inputs, the chatbot will cycle back
            to “c”. The letters that the chatbot is looking for will spell out
            the hidden words: <Mono>CÔNE TRONQUÉ</Mono>.
          </p>
        </li>
      </ol>

      <p>
        Below the chat interface is a set of blanks. The four sets of hidden
        words can be placed in those blanks to give the clue phrase:{" "}
        <Mono>CÔNE TRONQUÉ AVEC SUCRE CHAUFFÉ (CINQ SEPT)</Mono>. The truncated
        cone with heated sugar is the answer,{" "}
        <PuzzleAnswer>CREME CARAMEL</PuzzleAnswer>. (The more correct{" "}
        <Mono>CRÈME CARAMEL</Mono> is also accepted, but the canonical form of
        the answer does not include the accent grave.)
      </p>
    </>
  );
};

export default Solution;

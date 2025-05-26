import React from "react";
import { renderToString } from "react-dom/server";
import { styled, ServerStyleSheet } from "styled-components";
import wordsJson from "./words.json";

const binaryString = "avecsucre";
const firstLetterString = "cinqsept";
const glitchString = "cônetronqué";
const mastermindString = "chauffé";

const Words = new Set(wordsJson);

const Glitch = styled.span`
  background-color: black;
  color: #00ff00;
  font-family: Courier;
`;

const tokenize = (input: string, unelide: boolean): string[] => {
  let scrubbed = input;
  if (unelide) {
    // 0. clean up apostrophes -- replace all "'" with "e " (because the apostrophe
    //    elides a silent "e" sound)
    //    this is not 100% accurate but is (I think) more permissive than reality
    scrubbed = scrubbed.replace(/'/g, "e ");
  }

  // 0.5. remove the "-t-" interfix wherever it appears.
  //      this is slightly too permissive but I don't think it will cause problems.
  scrubbed = scrubbed.replace(/-t-/g, " ");

  // 1. replace all remaining punctuation with spaces (including hyphens)
  scrubbed = scrubbed.replace(/[-,.:;…!?«»"“”()]/g, " ");

  // 2. lowercase
  scrubbed = scrubbed.toLowerCase();

  // 3. split by whitespace, filter blanks
  return scrubbed.split(/\s/g).filter((w) => w.length > 0);
};

const isFrench = (input: string): boolean => {
  const tokenSets = [tokenize(input, false), tokenize(input, true)];
  return tokenSets.some((tokens) => {
    if (tokens.length === 0) return false;

    const valid = new Array(tokens.length).fill(false);
    // Check if every token is a word, if every pair of tokens is a word, and if
    // every triplet of tokens is a word

    const getToken = (i: number) => tokens[i] ?? "";
    for (let i = 0; i < tokens.length; i++) {
      if (Words.has(getToken(i))) {
        valid[i] = true;
      }
    }

    for (let i = 0; i < tokens.length - 1; i++) {
      if (Words.has(getToken(i) + getToken(i + 1))) {
        valid[i] = valid[i + 1] = true;
      }
    }

    for (let i = 0; i < tokens.length - 2; i++) {
      if (Words.has(getToken(i) + getToken(i + 1) + getToken(i + 2))) {
        valid[i] = valid[i + 1] = valid[i + 2] = true;
      }
    }

    return valid.every((v) => v);
  });
};

const mastermind = (scrubbed: string): string => {
  let correct = 0,
    wrongPlace = 0;
  const consumedSecret = Array(mastermindString.length).fill(false);
  const consumedInput = Array(scrubbed.length).fill(false);

  for (let i = 0; i < mastermindString.length && i < scrubbed.length; i++) {
    if (mastermindString[i] === scrubbed[i]) {
      correct++;
      consumedSecret[i] = true;
      consumedInput[i] = true;
    }
  }

  for (let i = 0; i < mastermindString.length; i++) {
    if (consumedSecret[i]) continue;

    for (let j = 0; j < scrubbed.length; j++) {
      if (consumedInput[j]) continue;

      if (mastermindString[i] === scrubbed[j]) {
        wrongPlace++;
        consumedSecret[i] = true;
        consumedInput[j] = true;
        break;
      }
    }
  }

  const incorrect = consumedSecret.filter((v) => !v).length;

  return `${"!".repeat(correct)}${"?".repeat(wrongPlace)}${".".repeat(incorrect)}`;
};

export const processChat = async ({
  message,
  counter,
}: {
  message: string;
  counter: number;
}): Promise<{ response: string; success: boolean; counter: number }> => {
  // Wait a random amount of time
  const delay = Math.random() * 1000 + 500;
  await new Promise((r) => setTimeout(r, delay));

  if (!isFrench(message)) {
    return { response: "pfffffffft", success: false, counter };
  }

  // Strip non-(French-)letters for glitch and mastermind processing
  const scrubbed = message
    .toLocaleLowerCase("fr-FR")
    .replace(/[^a-zàâäèéêëîïôœùûüÿÇç]/g, "");

  // Generate initial message using binary string
  const binaryLetter = binaryString.charCodeAt(counter % binaryString.length);
  const firstLetterLetter =
    firstLetterString[counter % firstLetterString.length] ?? "";
  const glitchLetter = glitchString[counter % glitchString.length] ?? "";

  const words: React.ReactNode[] = [7, 6, 5, 4, 3, 2, 1, 0].map((bit, i) => {
    let word = binaryLetter & (1 << bit) ? "ronron" : "miaou";
    if (bit === 7) {
      word = `${firstLetterLetter}${word.slice(1)}`;
    }

    const inputLetter = scrubbed[i];
    let glitched: React.ReactNode = word;
    if (inputLetter && inputLetter === glitchLetter) {
      glitched = <Glitch>{word}</Glitch>;
    }
    return glitched;
  });

  words.push(mastermind(scrubbed));

  const sheet = new ServerStyleSheet();
  const responseContent = renderToString(
    sheet.collectStyles(
      <>
        {words.map((w, i) => (
          <>
            {i !== 0 ? " " : ""}
            {w}
          </>
        ))}
      </>,
    ),
  );
  const response = renderToString(
    <>
      {sheet.getStyleElement()}
      <span dangerouslySetInnerHTML={{ __html: responseContent }} />
    </>,
  );

  return {
    response,
    success: true,
    counter: counter + 1,
  };
};

import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import {
  bytesToHex,
  bytesToUtf8,
  hexToBytes,
  utf8ToBytes,
} from "@noble/ciphers/utils";
import { managedNonce } from "@noble/ciphers/webcrypto";
import { type Request, type Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { styled, ServerStyleSheet } from "styled-components";
import { Router } from "websocket-express";
import { z } from "zod";
import wordsJson from "./words.json";

const EncryptionKey = hexToBytes(
  "582e1489b65195459d7f69ca4c1bd9d5a22bdcdbb1256fce1b4a6f2740eb0967",
);
const binaryString = "avecsucre";
const firstLetterString = "cinqsept";
const glitchString = "cônetronqué";
const mastermindString = "chauffé";

const chacha = managedNonce(xchacha20poly1305)(EncryptionKey);

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

const requestBodySchema = z.object({
  message: z.string(),
  state: z.string().optional(),
});
type RequestBodyType = z.TypeOf<typeof requestBodySchema>;

const decryptState = (
  ciphertext?: string,
): { valid: false } | { valid: true; counter: number } => {
  if (!ciphertext) {
    return { valid: true, counter: 0 };
  }

  try {
    const plaintext = bytesToUtf8(chacha.decrypt(hexToBytes(ciphertext)));
    const json = JSON.parse(plaintext) as unknown;
    if (
      !json ||
      typeof json !== "object" ||
      !("counter" in json) ||
      typeof json.counter !== "number"
    ) {
      return { valid: false };
    }

    return { valid: true, counter: json.counter };
  } catch (e) {
    return { valid: false };
  }
};

const serializeResponse = (
  message: string,
  success: boolean,
  counter: number,
): string => {
  const plaintext = { counter };
  const ciphertext = chacha.encrypt(utf8ToBytes(JSON.stringify(plaintext)));

  return JSON.stringify({
    message,
    success,
    state: bytesToHex(ciphertext),
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

const handler = (req: Request, res: Response) => {
  void (async () => {
    let parsedRequest: RequestBodyType;
    try {
      parsedRequest = requestBodySchema.parse(req.body);
    } catch (error) {
      res.status(400).send("Invalid request");
      return;
    }

    const state = decryptState(parsedRequest.state);
    if (!state.valid) {
      res.status(400).send("Invalid request");
      return;
    }

    // Wait a random amount of time
    const delay = Math.random() * 1000 + 500;
    await new Promise((r) => setTimeout(r, delay));

    const { message } = parsedRequest;
    const { counter } = state;

    res.header("Content-Type", "application/json");

    if (!isFrench(message)) {
      res.send(serializeResponse("pfffffffft", false, counter));
      return;
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

    try {
      const sheet = new ServerStyleSheet();
      const message = renderToString(
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
      res.send(
        serializeResponse(
          renderToString(
            <>
              {sheet.getStyleElement()}
              <span dangerouslySetInnerHTML={{ __html: message }} />
            </>,
          ),
          true,
          counter + 1,
        ),
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  })();
};

const router = new Router();
router.post("/chat", handler);
export default router;

import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import {
  bytesToHex,
  bytesToUtf8,
  hexToBytes,
  utf8ToBytes,
} from "@noble/ciphers/utils";
import { managedNonce } from "@noble/ciphers/webcrypto";
import { type Request, type Response } from "express";
import { Router } from "websocket-express";
import { z } from "zod";
import { processChat } from "./logic";

const EncryptionKey = hexToBytes(
  "582e1489b65195459d7f69ca4c1bd9d5a22bdcdbb1256fce1b4a6f2740eb0967",
);

const chacha = managedNonce(xchacha20poly1305)(EncryptionKey);

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

    const { message } = parsedRequest;

    res.header("Content-Type", "application/json");
    try {
      const { response, success, counter } = await processChat({
        message,
        counter: state.counter,
      });
      res.status(200).send(serializeResponse(response, success, counter));
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  })();
};

const router = new Router();
router.post("/chat", handler);
export default router;

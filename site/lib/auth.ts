import type { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { type MutableToken, OAuth2Server } from "oauth2-mock-server";
import {
  type JwtFromRequestFunction,
  type VerifyCallbackWithRequest,
  Strategy as JwtStrategy,
} from "passport-jwt";

export function authentikJwtStrategy(
  jwksUri: string,
  jwtFromRequest: JwtFromRequestFunction,
  verifyCallback: VerifyCallbackWithRequest,
) {
  const jwksClient = new JwksClient({
    jwksUri,
  });
  return new JwtStrategy(
    {
      jwtFromRequest,
      secretOrKey: ((header: JwtHeader, callback: SigningKeyCallback) => {
        jwksClient
          .getSigningKey(header.kid)
          .then((key) => {
            callback(
              null,
              "publicKey" in key ? key.publicKey : key.rsaPublicKey,
            );
          })
          .catch((e: unknown) => {
            callback(e as Error);
          });
      }) as unknown as string, // type of secretOrKey is wrong
      passReqToCallback: true,
    },
    verifyCallback,
  );
}

export async function newMockOAuthServer(port?: number) {
  const server = new OAuth2Server();

  await server.issuer.keys.generate("RS256");

  server.service.on("beforeTokenSigning", (token: MutableToken) => {
    // TODO: Multiple types of token
    token.payload.email = "admin@mitmh2025.com";
    token.payload.name = "Admin User";
    token.payload.nickname = "admin";
    token.payload.admin = true;
    token.payload.ops = true;
  });

  await server.start(port);

  return server;
}

import type { NextFunction, Request } from "express";
import type { WSResponse } from "websocket-express";
import { type TeamState } from "../../../lib/api/client";
import { type RedisClient } from "../../app";

export async function getWsHandler(redisClient?: RedisClient) {
  const subscriber = redisClient && redisClient.duplicate();
  if (subscriber) {
    await subscriber.connect();
  }
  return async function wsHandler(req: Request, res: WSResponse, next: NextFunction) {
    const team = req.teamState?.teamName;
    if (!team) {
      next();
      return;
    }
    const ws = await res.accept();
    if (subscriber) {
      const channel = `team_state.${team}`;
      const listener = (message: string, _channel: string) => {
        try {
          const data = JSON.parse(message) as TeamState;
          ws.send(
            JSON.stringify({
              type: "team_state",
              data,
            }),
          );
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error(
              "received unparseable JSON from Redis",
              channel,
              message,
            );
          }
        }
      };
      await subscriber.subscribe(channel, listener);
      ws.addEventListener("close", () => {
        void subscriber.unsubscribe(channel, listener);
      });
    }
  };
}

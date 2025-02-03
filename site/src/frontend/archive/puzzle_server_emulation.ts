// eslint-disable-next-line import/no-unresolved -- this is pulled in by express, but eslint can't seem to find it
import { type RouteParameters } from "express-serve-static-core";
import { HttpResponse, http, passthrough } from "msw";
import { setupWorker } from "msw/browser";
// It would be nice to just import PUZZLES and work off of that, but that pulls
// all puzzle content into the bundle (and tree-shaking won't slim it down)
import FollowTheRules from "../puzzles/right-palm/server";
import {
  type PuzzleEndpointResponse,
  type PuzzleEndpoint,
} from "../puzzles/types";
import rootUrl from "../utils/rootUrl";

const PUZZLES = {
  follow_the_rules: FollowTheRules,
} satisfies Record<string, PuzzleEndpoint[]>;

class MSWResponseStub implements PuzzleEndpointResponse {
  headers: [string, string][] = [];
  body: string | undefined = undefined;
  statusCode = 200;

  header(field: unknown, value?: string | undefined): this {
    this.headers.push([field as string, value ?? ""]);
    return this;
  }
  set(field: unknown, value?: string | undefined): this {
    return this.header(field, value);
  }

  send(body?: unknown): this {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- we're fine with this
    this.body = body ? body.toString() : undefined;
    return this;
  }

  json(body?: unknown): this {
    this.header("Content-Type", "application/json");
    return this.send(JSON.stringify(body));
  }

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  generateResponse(): HttpResponse {
    return new HttpResponse(this.body, {
      status: this.statusCode,
      headers: this.headers,
    });
  }
}

const worker = setupWorker(
  ...Object.entries(PUZZLES).flatMap(([slug, endpoints]) =>
    endpoints.map((endpoint) =>
      http[endpoint.method](
        `${rootUrl}/puzzles/${slug}${endpoint.route}`,
        async ({ params, request }) => {
          // Do just enough work to take a service worker (fetch-style) Request
          // and Response and turn it into an Express-style Request and Response

          const raw = await request.text();
          let body: unknown;
          if (request.headers.get("Content-Type") === "application/json") {
            body = JSON.parse(raw);
          } else if (
            request.headers.get("Content-Type") ===
            "application/x-www-form-urlencoded"
          ) {
            const searchParams = new URLSearchParams(raw);
            body = Object.fromEntries(searchParams.entries());
          } else {
            body = raw;
          }

          const response = new MSWResponseStub();
          endpoint.handler(
            { params: params as RouteParameters<string>, body },
            response,
          );
          return response.generateResponse();
        },
      ),
    ),
  ),

  // Anything that's not explicitly handled here should just pass through to the
  // server - it's probably statics anyway
  http.all("*", () => passthrough()),
);

const ready = worker.start({
  serviceWorker: {
    url: `${rootUrl}/mockServiceWorker.js`,
  },
});
(window as unknown as { mswWorkerReady: typeof ready }).mswWorkerReady = ready;

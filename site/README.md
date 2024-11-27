# Hunt site

A nodejs app with server-side-rendering for serving the 2025 Mystery Hunt site.
Work in progress.

Puzzles are postprodded in the `src/frontend/puzzles/` folder, where each puzzle's
metadata (including components for how to render the puzzle content and
solution) is placed in a folder matching the Puzzup random name. Puzzle
definitions should include the fields described in `src/frontend/puzzles/types.ts`.

The overall hunt structure (including how puzzles are slotted into the hunt)
lives in `src/huntdata/index.ts`, which should be updated to include each typeset
puzzle. It is incomplete at present, as:

1. most puzzles have yet to be assigned, let alone written
2. we do not yet know how many puzzle slots will sit in each round, and
3. we don't really know what the endgame round(s) will look like.

## Getting started

### Install nodejs (and npm)

Note that you will need at least version **22.2.0**, which is fairly recent.

Download from https://nodejs.org/en/download/prebuilt-binaries and add to your
`$PATH`, or if you're on Linux, use your package manager of choice.

If we really want to pin to specific node versions for both dev and prod
environments, we can shave that yak when we get there.

### Get the code

```sh
git clone git@github.com:mitmh2025/hunt2025
cd hunt2025
```

### Install dependencies

```sh
cd hunt2025/site
npm install
```

### Install/run a redis server (or equivalent)

We use redis pubsub to notify the websocket server about updates to team state,
and to tail activity log and guess submission logs in realtime.

If you already have a redis server installed, feel free to use whatever's
convenient. If you don't already have a redis, it's pretty easy to build.
Drew uses [valkey](https://github.com/valkey-io/valkey).

```sh
cd ~/
git clone https://github.com/valkey-io/valkey
cd valkey
make
./src/valkey-server
```

### Build bundle(s)

```sh
npm run build-dev # or npm run build, for a production build
```

### Run the server

```sh
REDIS_URL=redis://localhost/ node --enable-source-maps dist/server-bundle.js # listens on port 3000
```

And then open http://localhost:3000 in your browser.

At the time of this writing, a fixture allows logging into a `DB_ENV=development`
instance with username: `team` and password: `password`.

If you build the dev bundle, once you "log in" you'll see a pane where you can
easily jump to any round page or (typeset) puzzle. In the fullness of time,
we'll add additional actions for things like granting unlock currency, marking
puzzles as visible or unlocked, or marking interactions as completed.

### Additional notes

Most markup is server-side rendered. If you set `JWT_SECRET` on the
command-line, you can keep your session cookies so you don't have to log-in
again. The usual iteration loop is something like the below:

```sh
cd hunt2025/site
export JWT_SECRET=$(python3 -c "import os; import codecs; print(codecs.encode(os.urandom(16), 'hex').decode('utf-8'))")
rm -rf dist && time npm run build-dev && REDIS_URL=redis://localhost/ node --enable-source-maps dist/server-bundle.js
```

You can also use `start-watch` to set up live-reloading. This will automatically
rebuild the site, restart the server, and then refresh your browser:

```sh
cd hunt2025/site
export JWT_SECRET=$(python3 -c "import os; import codecs; print(codecs.encode(os.urandom(16), 'hex').decode('utf-8'))")
rm -rf dist && REDIS_URL=redis://localhost/ npm run start-watch
```

Note that there is a hard-coded 1000ms delay between when a file changes and
when your browser refreshes; this should be enough time for the dev server to
restart but if you're seeing the old version of the side after reload, you
may need to increase the value of the `livereload -w` flag in the `start-watch`
script.

## Typesetting

First, an admonition: avoid poking around in random folders in
`src/frontend/puzzles/`. We've made no effort to obfuscate answers, solutions,
nor hints (which generally reveal the solve path), and reading how metapuzzles
work may spoil you for playtesting their feeders.

The hunt structure as a whole is defined in `src/huntdata/index.ts`, but most
of your changes will not go there. To make it easy for us to swap puzzles
around later or even during the hunt if needed (if we discover a puzzle is
broken), we typeset puzzles separately in `src/frontend/puzzles/` and bind them
into "slots" in the hunt structure.

A "slot" is a place in the hunt structure where a puzzle needs to eventually
fit. A "slug" is the `lower_case_with_underscores` name that lives in the
puzzle's URL (puzzles are rendered at `/puzzles/$slug`).

To typeset a puzzle:

1. Create a folder under src/frontend/puzzles/ with the Puzzup name for the puzzle being typeset.
2. In that folder, create a file `index.ts` which exports a `PuzzleDefinition`
   object. Our Puzzup instance has a route `/puzzle/<id>/puzzle.ts` which
   provides a useful starting point for the contents of that file. You can
   seed this by visiting e.g.
   https://puzzup.letswriteahunt.com/puzzle/15/puzzle.ts (replace the `15` with
   whatever the appropriate puzzle id is from Puzzup). **You will likely need
   to double-check the contents of this file to verify that all credits are
   being listed, and that all authors have correctly set their Credits name in
   Puzzup.**
3. That newly-created `index.ts` is attempting to import a content and solution
   component from `puzzle.tsx` and `solution.tsx` respectively. Create those
   files in your new folder, and then have each of them define and
   default-export a React function component for that puzzle based on the
   latest puzzle or solution document in Puzzup. You can use
   `styled-components` as needed to
4. You've created a puzzle definition. Now, import that from
   `src/frontend/puzzles/index.ts` and add it to the `PUZZLES` map with a key
   matching the slug from the puzzle definition. (In the future this could
   theoretically be automated.) Now your puzzle can be referenced by the hunt
   definition.
5. Link the puzzle into the hunt definition in `src/huntdata/index.ts` by
   updating the slot where your puzzle goes with `slug: "whatever_your_puzzles_slug_is"`.
6. Rebuild and run the site (`npm run build-dev; node dist/server-main.js`).
   Now you should be able to view your puzzle at
   http://localhost:3000/puzzles/$slug ...assuming that slot is unlocked.  You
   can log in as the `unlocked` user (password `password`), which forces all
   puzzles into the unlocked state.  Similarly, you can view your solution at
   http://localhost:3000/puzzles/$slug/solution .

If your puzzle requires client-side interactivity or custom server-side logic,
additional custom work will be involved. Ping Drew for more details.

## The ops site

To run the ops site:

1. Start running the development server via `build-dev` or `start-watch` as above. This will serve the ops server on localhost:3002 without live reload.
2. In parallel, run `npm run ops:start` to run the Vite dev server. This will run the Vite dev server on localhost:3003. Requests to /api will be proxied to the development server, and all other requests will be handled by the Vite server with hot reloading.

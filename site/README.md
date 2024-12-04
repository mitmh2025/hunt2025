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

### Run the ops tools

For development:

- `export JWT_SECRET=$(python3 -c "import os; import codecs; print(codecs.encode(os.urandom(16), 'hex').decode('utf-8'))")` so you get a fixed JWT secret
- Run the main site as above
- Run the ops site wth `npm run ops:start` (you must have the same `JWT_SECRET` for both the main site and the ops site)
- Now, you should have the ops site dev server running at http://localhost:3002.

For production:

- `npm run ops:build`
- Now, you can run the built ops server with `node dist-ops/server/main.js`

## Typesetting

See [docs/postprodding.md](docs/postprodding.md)

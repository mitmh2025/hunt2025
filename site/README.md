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
cd hunt2025
npm install
```

### Build bundle(s)

```sh
npm run build-dev # or npm run build, for a production build
```

### Run the server

```sh
node dist/server-bundle.js # listens on port 3000
```

And then open http://localhost:3000 in your browser.

At the time of this writing, a fixture allows logging into a `DB_ENV=development`
instance with username: `team` and password: `password`.

If you build the dev bundle, once you "log in" you'll see a pane where you can
easily jump to any round page or (typeset) puzzle. In the fullness of time,
we'll add additional actions for things like granting unlock currency, marking
puzzles as visible or unlocked, or marking interactions as completed.

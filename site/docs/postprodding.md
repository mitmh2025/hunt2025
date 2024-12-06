## Postprodding

So, you've volunteered to postprod puzzles. Thanks so much! We've got a lot
of work to do.

### How this fits into the overall process

The goal of postprodding is to take the puzzle and solution, as playtested, and
produce a representation of them that fits into our production website, with
all the relevant content, assets, canned responses, hints, puzzle-specific
behaviors, layouts.

We do this work after a puzzle's solution has been finalized, when the puzzle
moves from the Finalizing Solution state to the Ready for Postprodding state.
After postprodding, we place the puzzle in the Awaiting Approval After Postprod
state, and responsibility for the next action is transferred to the
author/editors to confirm that they agree that this puzzle, as postprodded, is
a true reproduction of their intent, the puzzle content as-tested, and their
solution explanation.

In practical terms, this means writing some code, some data structures,
checking in final image, audio, or video assets, and doing any markup needed to
format puzzle content appropriately.

### Prerequisites

You will need:

- A GitHub account, with access to the
  [`mitmh2025/hunt2025`](https://github.com/mitmh2025/hunt2025) repo. Ask to
  be added to the "Site Dev/Typesetters" Team in the mitmh2025 org if you are
  not already.
- A Puzzup account with the Postprodder group membership. If you need
  permissions, ask Drew (@zarvox) or Evan (@ebroder) to assign you permissions
  via Puzzup's Django admin interface.
- NodeJS, at version 22.2.0 or higher (we mean it! older versions will fail!
  Run `node --version` and be sure you're up to date)
- A working understanding of Git, HTML5,
  [TypeScript](https://www.typescriptlang.org/), and
  [React](https://react.dev/), and the ability to run code from the command
  line.
- Your text editor of choice

### Get credentialed (probably already done)

You will need access to the hunt2025 git repository. If you can read this, you
probably already have access to the repo in question, since this doc lives in
that repo.

### Get the code

First, a warning: be careful about poking around in random folders in
`src/frontend/puzzles/`. We've made no effort to obfuscate answers, solutions,
nor hints (which generally reveal the solve path), and reading how metapuzzles
work may spoil you a bit when playtesting their feeders.

Please follow the "Getting started" instructions from
https://github.com/mitmh2025/hunt2025/blob/main/site/README.md#getting-started
to set up your development environment.

### Concepts

The hunt structure as a whole is defined in `src/huntdata/index.ts`, but most
of your changes will not go there. To make it easy for us to swap puzzles
around later or even during the hunt if needed (if we discover a puzzle is
broken), we typeset puzzles separately in `src/frontend/puzzles/` and bind them
into "slots" in the hunt structure.

A "slot" is a place in the hunt structure where a puzzle needs to eventually
fit. These can be any string, but in practice in our hunt are assigned
five-character codes: two characters for the round (e.g. `so` for Stakeout,
`pt` for Paper Trail), followed by one letter `p` for a non-meta and `m` for a
meta, and then two digits (starting at `01` and increasing), indicating the
rough expected order in that round's unlock structure.

A "slug" is the `lower_case_with_underscores` name (generally, the
puzzle's title) that lives in the puzzle's URL (puzzles are rendered at
`/puzzles/$slug`).

### Postprod a puzzle

1. Select the puzzle that you want to postprod from the "Puzzles that need a
   postprodder" list in Puzzup: https://puzzup.letswriteahunt.com/postprod .
2. Spoil yourself on that puzzle, if you haven't already.
3. Set yourself as the postprodder for that puzzle. You can do this by going
   to the puzzle page, clicking the "Edit" button next to the "People" header
   on the left side of the page, scrolling down to where it says
   "Postprodders", and selecting yourself. Doing this before attempting to
   code anything will help avoid multiple people trying to postprod the same
   puzzle.
4. In your hunt2025 git checkout, check out a new branch
   `${your-github-username}-${codename}`. We can't use GitHub's branch
   protection features without paying money, so we can't mechanically prevent
   you from pushing directly to main and still let you push changes, but if you
   push directly to `main`, Drew will probably be grumpy at you, so please don't.
5. In your hunt2025 git checkout, create a folder under
   `site/src/frontend/puzzles/` with the Puzzup codename for the puzzle being
   typeset (e.g. `bountiful-maple`). This naming scheme is just a convention
   that ensures that we avoid name collisions, don't have to rename things even
   if puzzle titles change, and it's easy to find a puzzle from a particular
   codename since those seem to be what editors discuss and recognize most
   readily.
6. In that folder, create a file `index.ts` which exports a [`PuzzleDefinition`](https://github.com/mitmh2025/hunt2025/blob/main/site/src/frontend/puzzles/types.ts#L41-L91)
   object. Our Puzzup instance has a route `/puzzle/<id>/puzzle.ts` which
   provides a useful starting point for the contents of that file. You can
   seed this by visiting e.g.
   https://puzzup.letswriteahunt.com/puzzle/15/puzzle.ts (replace the `15` with
   whatever the appropriate puzzle id is from Puzzup). **You will likely need
   to double-check the contents of this file to verify that all credits are
   being listed, and that all authors have correctly set their Credits name in
   Puzzup.** Some things to check and edit:
   - the `slug` field should be `lowercase_with_underscores`, though puzzup will
     by default generate `kebab-case-with-hyphens`.
   - the `initial_description` field should be a non-spoilery description that
     will be shown to solvers before they unlock the puzzle. It should not
     mention which round it's in, but many of the puzzup descriptions do so
     that testsolvers are able to plan around expected solve time, so expect to
     remove "stakeout round" or similar from basically all of these.
   - if there are additional credits that were not input into puzzup, you might
     have to add those. Read through the puzzle's history to get a sense for if
     there are any missing contributions.
7. That newly-created `index.ts` is attempting to import a content and solution
   component from `puzzle.tsx` and `solution.tsx` respectively. Create those
   files in your new folder, and then have each of them define and
   default-export a React function component for that puzzle based on the
   latest puzzle or solution document in Puzzup. You can use
   `styled-components` as needed to apply styles to components. Some additional notes:
   - **DO** read through how the puzzle works from the solution document, so
     you can make sure what you write aligns with the intent of the author.
   - Do **not** include the puzzle title in your puzzle.tsx; that (and the guess
     history widget, etc.) will be handled by the puzzle page layouts.
   - **DO** place any flavortext within a `<p className="puzzle-flavor"></p>`.
     When using styled-components, in production the component names will be
     entirely opaque, but we want to be clear that flavor is flavor.
   - **DO** ensure you are consistently using smart quotes and en-dashes for
     prose. Plain quotes are acceptable only if being the plain quote is
     semantically meaningful (e.g. the material is source code of some sort and
     the code will not copy-paste and execute correctly if the quotes are smart
     quotes, or the artistic style for that puzzle is monospace ASCII font and
     `--` would be more appropriate. Or it's Morse code for `M` or something.)
   - **DO** place assets like images in a subdirectory named `assets` inside
     the puzzle codename folder. Try to minimize file size checked into the
     repo -- if there are .png files, for instance, consider running `pngcrush`
     on them before committing them.
   - Do **not** link to external assets, like JS libraries on CDNs, fonts on
     Google Fonts, files hosted on Google Drive, or docs in Google Sheets or
     Google Docs. Every piece of content that is needed for a puzzle's
     presentation should be checked into the repo and imported where
     appropriate. This is important because we rely on precise knowledge of
     what our assets are to enable content-addressing them for cache and
     performance purposes, and because archival is easier if the site is
     self-contained, and because once we have accepted a postprodded puzzle, we
     consider the postprodded version canonical, so making it possible for the
     puzzle to change outside the repo's version control would make it hard to
     control behavior.
   - Tables will copy-paste into Google sheets better if styles are placed on
     the cells themselves.
8. You've created a puzzle definition. Now, import that from
   `src/frontend/puzzles/index.ts` and add it to the `PUZZLES` map with a key
   matching the slug from the puzzle definition. (In the future this could
   theoretically be automated, but for now it's two lines of boilerplate.) Now
   your puzzle can be referenced by the hunt definition.
9. Link the puzzle into the hunt definition in `src/huntdata/index.ts` by
   updating the slot object where your puzzle goes with `slug: "whatever_your_puzzles_slug_is"`.
   If your puzzle slug is not referenced in the hunt definition, then the server
   will serve a 404 for your puzzle.
10. Rebuild and run the site (`npm run build-dev; node dist/server-main.js`).
    Log in, probably as the `unlocked` user. Now you should be able to view
    your puzzle at http://localhost:3000/puzzles/$slug (where `$slug` is
    replaced with the slug field from your puzzle definition) assuming that
    slot is unlocked. Similarly, you can view your solution at
    http://localhost:3000/puzzles/$slug/solution . You should also be able to
    find your puzzle on the All Puzzles page, and in the round where you bound
    a slot to your puzzle's slug.
11. Once you're satisfied with the appearance of the puzzle and solution pages,
    make sure that you pass all the lints by running `npm run check`.
12. Commit your change with a commit message like: "Postprod ${codename} (${title})"
13. Push your branch (you _did_ do this on a branch, like I said to in step 4,
    right?) to GitHub and create a pull request with your changes and include
    in your PR a screenshot of the puzzle page and the solution page. Request
    review from Drew (`@zarvox`). In general, unless Drew is on vacation, you
    should expect to receive feedback or see your change merged within 24
    hours. If everything looks good, he will merge your changes, possibly
    after fixing them up if there are small nits that aren't worth waiting a
    round-trip. The dev site auto-deploys from the `main` branch on update,
    and takes around 5-10 minutes to roll out after a merge.
14. Once your change is merged and the code update has rolled out to [the dev
    site](https://dev.mitmh2025.com), you should be able to view your puzzle on
    the dev site. If that looks as expected, go back to Puzzup and on that puzzle
    page, change the puzzle state to "Awaiting Approval After Postprod" with a
    comment with a link to the puzzle and solution as viewable from the dev
    server, requesting that the author review your typesetting to ensure that
    it is true to the needs of the puzzle.

If your puzzle requires client-side interactivity (JS in the browser),
additional libraries, or custom server-side logic, additional custom work will
be involved. Ping Drew (@zarvox) for more details, or find a simpler puzzle to
work on in the interim.

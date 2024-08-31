# Hunt definition

It is the nature of writing a hunt that you don't know exactly how things are
going to be structured from the get-go, and you definitely don't know which
puzzles are going to be used where, or how many will be in which round, or what
rounds you'll even have. Since you'll probably have a sense of the round
structure well in advance of having puzzles ready to go, it makes sense to
decouple setting overall Hunt/round structure from typesetting or preparation
of specific puzzles.

To that end, we've split the "hunt and puzzles" definitions into two pieces,
with one central abstraction being the notion of a "slot". A slot is a named
place in the hunt structure into which a puzzle will eventually be fitted.
A puzzle definition can, in theory, be bound to any slot.

## Puzzles

Puzzle definitions are where the actual puzzle **contents** are defined. Each
puzzle is defined by exporting a `PuzzleDefinition`, as defined in
[`src/frontend/puzzles/types.ts`](../src/frontend/puzzles/types.ts). This
includes the puzzle's `title`, the `slug` at which it should appear
(`/puzzles/$slug`), credits information, the puzzle's canonical `answer`,
`hints` provided by the authors, `canned_responses` for particular guess
submissions that are on the right track, and most importantly, the `content`
and `solution`, which are primarily React components which will be rendered as
the children of the `<div id="puzzle-content">` on the puzzle page.

We store each puzzle definition in its own folder under `src/frontend/puzzles`,
named after the puzzup unique names. We do this, rather than naming the folder
after the puzzle, because:

1. The names already exist and are unique, and the authors and editors are broadly familiar with them
2. When we're typesetting it's helpful to keep things consistent, and the postprod queue shows codenames, not puzzle titles
3. If we picked another name more associated with the puzzle content, it's more likely to change over time, which makes tracking the history more annoying
4. This makes it easy to reassign puzzles to different slots without people being confused about where to find them

In fact, we may wish to typeset some puzzles which we never actually use in the
hunt! It's useful to have some floater puzzles with flexible answers or with a
step where after completing a task we simply give the team the answer, so these
can be easily reassigned (with a quick update to their answer in the puzzle
definition) in case we need to replace a broken puzzle. This is another reason
why we try to decouple puzzle definition from its structural function.

## Hunt

We define a Hunt in [`src/huntdata/types.ts`](../src/huntdata/types.ts)
primarily as a collection of rounds, where each round has a collection of
puzzle slots which are canonically part of that round. (Interactions are
currently also included at the top level of the hunt, but I suspect their
definition belongs within Round, so they can be straightforwardly looked up
from the round pages.)

### Slots

Puzzle slots are uniquely identified by their `id` string. For this hunt,
we've named each puzzle slot with a 5-character string like `isp01`. These IDs
are opaque as far as the system implementation is concerned, but for our own
human convenience, we've kept a bit of a structure, where in this case, the
first two characters indicate the round (`is` is Illegal Search), the third
character indicates feeder (`p`) or meta (`m`), and the remaining two
characters are numbers indicating relative unlock order. But again, these slot
names can be anything; we just picked this convention out of convenience.

Puzzle slots can contain some simple boolean conditional logic about when they
unlock or become unlockable, making it possible to express under what
conditions they should be available to solvers. They specify whether the
puzzle is treated like a metapuzzle (which receive some slightly different
default behaviors for the conditional logic, for convenience). This
effectively describes the **structure** of the hunt -- what parts of the hunt
unlock under what conditions. One example of a common condition is the
`unlockable_if: { puzzles_unlocked: number; }` condition, which allows us to
easily make it so that unlocking one puzzle in a round makes the next one
become unlockable.

Slots include a (currently-optional) `slug` field, which allows binding the
slot to a particular puzzle (the one with that same `slug` value in the puzzle
definition). In the absence of a `slug` value, we generate a stub puzzle page
so that we can still exercise the unlock mechanics before we have puzzles to
populate each slot.

### Interactions

We intend to provide some dialogue-tree interactions in the site. These share
the same unlock condition evaluation language as puzzle slots.

### Gates

One more thing that we support is the notion of named completion gates, which
are basically just named boolean progress flags that you can use in
`unlockable_if`/`unlocked_if` conditions on puzzle slots. We place the gate
definitions under a particular round mostly so we could potentially show them
together for our observational tools.

## Additional commentary

Ultimately, by the time our hunt is ready to be played, every PuzzleSlot will
be assigned a `slug`, which binds it to a particular puzzle definitions.
During development, the type definition for the `slug` field marks it as
optional, but once we've set all the puzzles, we'll mark it as mandatory and be
sure that everything still typechecks and we'll thus know that we've bound every
slot to a puzzle.

In practice, the "split hunt from puzzles via slots" abstraction is mostly
useful but occasionally a little leaky:

- you can't easily switch out puzzles without also switching out the answer due to meta structures
- `slug`s still have to be unique amongst typeset puzzles
- `prize` and `unlock_cost` feel like maybe they should be together on the slot, but also
  there are some puzzles (including some where after submitting a correct clue
  phrase, you have to do some sort of interaction with HQ) where we want to give
  out the `prize` once they submit that partial answer. Also, it's slightly
  annoying to do the reverse lookup from puzzle definition back to finding the
  slot where it is used. There are probably reasonable solutions for this, though.

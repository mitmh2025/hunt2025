# In-site Interactions

This directory contains the definitions and scripts associated with the in-site
interactions which take place after solvers complete each of the four
first-round metas.

They are intended to be evocative of
[JRPGs](https://en.wikipedia.org/wiki/History_of_Eastern_role-playing_video_games)
where you frequently see characters engaging in dialog and are presented with
choices as to which line you want your character to say, with reactions and
consequences appropriate to that behavior in that context.

In these interactions, solvers navigate as a group through a dialogue graph
where some nodes in the graph may involve solvers voting on dialog options,
playing minigames, or other behaviors.

## Design constraints

As completing these interactions blocks the unlock path for later rounds (the
side investigations), it is a hard requirement that these have liveness
designed into them. Once started, the interaction state machine should
continue moving forward, even if backends are restarted or there are
disconnections or latency. The show must go on!

We also intend for the choices teams make here to have small but durable
effects, so each team can only run through each interaction once. Because of
this, we want to make sure teams have a chance to fully assemble before they
start this shared real-time interaction, but (in the interest of liveness and
releasing additional puzzle content) we will cap the amount of time they can
wait before starting the interaction automatically.

Because we want (ideally) all participants on a team to get to participate in
each interaction, we restrict teams to running a single interaction at a time,
even if they have multiple interactions theoretically available. The first
interaction to become unlocked will be run to completion before allowing teams
to start a subsequently-unlocked interaction.

We will give affordances to help teams ensure they have all of their members
present before kicking off the interaction.

To try to minimize the risk of network latency or bandwidth negatively
impacting the experience at runtime, we may make some efforts to prefetch image
or audio assets so that they can be immediately displayed and played with
minimal desynchronization.

# Implementation

## Description (static typesetting)

Interactions are described in a TypeScript object which specifies

- the universe of character images,
- the (potentially quite large!) graph of speech nodes,
- the node at which the interaction begins
- the initial state available to interaction nodes when making
  context-sensitive decisions about dialog options or where the dialog should
  go.

Typescript types are used to describe the shape of the state object available
to interaction nodes, as well as the final "result" state object.

Each node specifies:

- the set of character images that should be visible on the screen
- which character is speaking the line text
- the text to be displayed (and possibly stylistic notes on how to display that text)
- an audio file that should play while this node is displayed
- a timeout for how long this node should be displayed for
- exactly one of:
  - the next node that should be displayed after the timeout elapses
  - a set of options solvers can vote on, each specifying the next node that should be displayed if that option wins the vote
  - (TODO: something indicating some other behavior that should be taken by client and server for this node, e.g. some other minigame that should be shown in the client and some other aggregation-of-state function that should determine the next node/state changes)
  - a function that indicates this is a terminal node, which returns the final result of this interaction.

To allow for some statefulness in behavior that doesn't require us to blow up
the state graph (which makes it harder for humans to understand/edit), we allow
the interaction to maintain a state object which can be modified by
`stateEffect` callbacks from vote choices (future work: or other node types).

See `InteractionGraph` from [types.ts](./types.ts) for the exact data
structures used for describing the intended interaction.

## Operation (dynamic)

This has not been fully worked out yet. The exact details of whether we plan
to store state in a data structure server, manage pub/sub of shared runtime
state like votes or other game-specific data, and even what specifically
triggers clients to advance through the state graph are still undetermined.
We'll likely prototype multiple approaches with varying levels of independence
from or integration with the rest of the site or services.

But suffice to say that whatever we do, we'll need some backend-y piece to:

- track which interactions are live for which team
- receive messages from clients about votes or games
- publish messages to clients about votes, games, and state graph transitions (triggering updated images/audio playback)
- durably record the series of decisions made by the team

More details as things become more clear.

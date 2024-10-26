# Data

## Source of truth

We store canonical data in a SQL database. In production, this is PostgreSQL;
in development we allow the use of SQLite to make the developer environment
easier to set up.

Nearly all team-state-related data is stored as an ordered log of events in the
`activity_log` table. This includes:

- currency grants
- round unlocks
- puzzle visibility
- puzzle unlocks
- guess submissions
- puzzle solves
- interaction unlocks
- gate completions
- rate limit resets

Our set of tables is:

- `knex_migrations` and `knex_migrations_lock` are used internally for implementing migrations
- `teams` is the canonical users table.
- `activity_log` is the canonical structured event log.

We use the [knex](https://knexjs.org/) library for accessing the database. It
has some TypeScript integration, via `knex/types/tables`.

## Pubsub

We like web pages that provide real-time updates. While this can be achieved
with polling or in response to user action, we think it's magical to have the
page update in real-time whenever the content that would feed it changes.

To that end, our pages have JS code to connect to a websocket server and
subscribe to particular datasets for changes. We broadcast changes to the
global activity log, and the websocket servers watch these channels for
updates which they will propagate to subscribed browsers as appropriate.

Since the pubsub system is separate from the database, it may fail separately
from primary writes. When we do writes to the database, we wait for the
transaction to commit before issuing messages to the pubsub system, so that
pubsub observers will never observe uncommitted writes or have to deal with
rollback. The flip side of that tradeoff is that this means that the pubsub
system can theoretically miss writes, if the backend fails to publish a
committed write for any reason. To ensure eventual recovery from missed
writes, the websocket servers periodically poll the API endpoints providing the
log from the source-of-truth for updates.

## Cache layer

We use `redis` to store a replica of the activity log, as well as team-specific
indexes and derived state. This data is non-canonical, can be dropped entirely
at any time, and we endeavor to give responses consistent with the current
state of the database whenever possible.

The data in the cache layer is, at the time of this writing:

- A stream `global/activity_log` with id 0-0 which contains a dense replica of
  all `activity_log` entries, in increasing order by id.
- A stream `activity_log/${teamId}` (e.g. for the team with id 1 in the `users`
  table, `activity_log/1`) with id 0-0 which contains a dense replica of all
  `activity_log` entries that are relevant to team id `teamId` -- that is, all
  the entries in `activity_log/1` will either have `team_id: null` or `team_id: 1`.
- A sorted set `activity_log` with `team_id`s as keys and scores of the highest
  global activity log entry that has been processed (and copied into the
  `activity_log/${teamId}` stream, if appropriate) for that team.

Inside each stream, messages have an id of `0-${epoch}` and a body of `{entry: JSON.stringify(entry)}`.

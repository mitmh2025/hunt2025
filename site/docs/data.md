# Data

## Source of truth

We store canonical data in a SQL database. In production, this is PostgreSQL;
in development we allow the use of SQLite to make the developer environment
easier to set up.

Some tables within this database are considered primary sources of truth, and
other tables are treated as effectively materialized views over that primary
source-of-truth which may take into account hunt structure or optimize for
certain access patterns. To wit, the `team_puzzle_guesses` table is considered
the source-of-truth for submitted guesses on puzzles, and the `activity_log` table
is considered the source-of-truth for most other data relevant to hunt progress.

Canonical tables:

- `knex_migrations` and `knex_migrations_lock` are used internally for implementing migrations
- `teams` is the canonical users table.
- `team_puzzle_guesses` is the canonical guess history table.
- `activity_log` is the canonical structured event log.

Derived tables:

- `team_rounds` represents which rounds are expected to be visible to a team.
- `team_puzzles` represents which puzzles are visible, unlockable, or unlocked for a team.

We use the [knex](https://knexjs.org/) library for accessing the database. It
has some TypeScript integration, via `knex/types/tables`, but tends to have a
rough time with sum types or tagged enums, since struct fields wind up getting
split as you select only a subset of columns from the DB, so the lowest DB
layers often have more typecasting than we're really comfortable with.

## Pubsub

We like web pages that provide real-time updates. While this can be achieved
with polling or in response to user action, we think it's magical to have the
page update in real-time whenever the content that would feed it changes.

To that end, our pages have JS code to connect to a websocket server and
subscribe to particular datasets for changes. We broadcast changes to team
state, the global activity log, and the global puzzle guess log, and the
websocket servers watch these channels for updates which they will propagate to
subscribed browsers as appropriate.

Since the pubsub system is separate from the database, it may fail separately
from primary writes. When we do writes to the database, we wait for the
transaction to commit before issuing messages to the pubsub system, so that
pubsub observers will never observe uncommitted writes or have to deal with
rollback. The flip side of that tradeoff is that this means that the pubsub
system can theoretically miss writes, if the backend fails to publish a
committed write for any reason. To ensure eventual recovery from missed
writes, the websocket servers periodically poll the API endpoints providing the
log from the source-of-truth for updates.

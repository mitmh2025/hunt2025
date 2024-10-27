import type { Knex } from "knex";

// Update with your config settings.

const asyncStackTraces = process.env.NODE_ENV === "development";

const config: Record<string, Knex.Config> = {
  memory: {
    client: "better-sqlite3",
    connection: {
      filename: ":memory:",
    },
    debug: true,
    asyncStackTraces,
  },

  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    debug: false,
    asyncStackTraces,
  },

  staging: {
    client: "pg",
    connection:
      process.env.DB_URI ?? "postgresql:///hunt2025?host=/run/postgresql",
    pool: {
      min: 2,
      max: 10,
    },
  },

  ci: {
    client: "pg",
    // N.B. pg has a very different idea of a "connection string" than libpq :(
    // Refer to the source: https://github.com/brianc/node-postgres/blob/master/packages/pg-connection-string/index.js
    connection:
      process.env.DB_URI ?? "postgresql:///hunt2025?host=/run/postgresql",
    asyncStackTraces,
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "pg",
    // N.B. pg has a very different idea of a "connection string" than libpq :(
    // Refer to the source: https://github.com/brianc/node-postgres/blob/master/packages/pg-connection-string/index.js
    connection:
      process.env.DB_URI ?? "postgresql:///hunt2025?host=/run/postgresql",
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;

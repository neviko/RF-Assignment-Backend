// Update with your config settings.
// import * as dotenv from "dotenv";
// dotenv.config({ path: "../.env" });
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

//TODO:fix dotenv to work with knex
export default {
  development: {
    client: "postgresql",
    connection: {
      database: "roundforest", // process.env.POSTGRES_DB,
      user: "postgres", // process.env.POSTGRES_USER,
      password: "postgres", //process.env.POSTGRES_PASSWORD,
      host: "localhost", // process.env.POSTGRES_HOST,
      port: 7000,
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

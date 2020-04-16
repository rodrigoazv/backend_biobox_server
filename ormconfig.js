const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE } = process.env;

module.exports = {
    type: "postgres",

    database: DATABASE,
    host: DATABASE_HOST,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
    username: DATABASE_USER,

    cli: {
      migrationsDir: "src/migrations",
      entitiesDir: "src/entity",
      subscribersDir: "src/subscriber"
    },
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [
        "src/migrations/**/*.ts"
    ],
};
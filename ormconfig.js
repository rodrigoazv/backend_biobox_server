const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE } = process.env;

module.exports = {
    type:"postgres",
    username:DATABASE_USER,
    password:DATABASE_PASSWORD,
    database:DATABASE,
    host:DATABASE_HOST,
    port:DATABASE_PORT,
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
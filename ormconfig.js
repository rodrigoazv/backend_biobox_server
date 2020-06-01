const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE } = process.env;

module.exports = {
    type:"postgres",
    username:DATABASE_USER,
    password:DATABASE_PASSWORD,
    database:DATABASE,
    host:DATABASE_HOST,
    port:DATABASE_PORT,
    cli: {
      migrationsDir: "dist/migrations",
      entitiesDir: "dist/entity",
      subscribersDir: "dist/subscriber"
    },
    entities: [
        "dist/entity/**/*.js"
    ],
    migrations: [
        "dist/migrations/**/*.js"
    ],
};
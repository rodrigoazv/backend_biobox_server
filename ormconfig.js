
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE } = process.env;

module.exports = {
    type:"postgres",
    username:DATABASE_USER,
    password:DATABASE_PASSWORD,
    database:DATABASE,
    host:DATABASE_HOST,
    port:DATABASE_PORT,
    cli: {
      migrationsDir: process.env.NODE_ENV === "test" ? "src/migrations" : "dist/migrations",
      entitiesDir: process.env.NODE_ENV === "test" ? "src/entity" : "dist/entity",
      subscribersDir: process.env.NODE_ENV === "test" ? "src/subscriber" : "dist/subscriber",
    },
    entities: process.env.NODE_ENV === "test" ? [
        "src/entity/**/*.ts"
    ] : [
        "dist/entity/**/*.js"
    ] ,
    migrations:process.env.NODE_ENV === "test" ? [
        "src/migrations/**/*.ts"
    ] : [
        "dist/migrations/**/*.js"
    ],
};
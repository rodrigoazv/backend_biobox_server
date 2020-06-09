
module.exports = {
    type:"postgres",
    username:process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_USER : process.env.DATABASE_USER,
    password:process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_PASSWORD : process.env.DATABASE_PASSWORD,
    database:process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE : process.env.DATABASE,
    host:process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_HOST : process.env.DATABASE_HOST,
    port:process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_PORT : process.env.DATABASE_PORT,
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
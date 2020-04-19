import * as dotenv from "dotenv";

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === "test";

export default {
  name: "V2X Core",
  version: "1.0",
  host: process.env.APP_HOST || "127.0.0.1",
  environment: process.env.NODE_ENV || "development",
  auth: {
    secretKey: process.env.SECRET_KEY || "4C31F7EFD6857D91E729165510520424"
  },

  logging: {
    dir: process.env.LOGGING_DIR || "logs",
    level: process.env.LOGGING_LEVEL || "debug"
  }
};
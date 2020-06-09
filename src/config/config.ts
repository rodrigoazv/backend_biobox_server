import * as dotenv from "dotenv";
dotenv.config({  
  path: ".env"
});

export default {
  name: "V2X Core",
  version: "1.0",
  host: process.env.APP_HOST || "127.0.0.1",
  environment: process.env.NODE_ENV || "development",
  logging: {
    dir: process.env.LOGGING_DIR || "logs",
    level: process.env.LOGGING_LEVEL || "debug"
  },
  mail:{
    host:"smtp.mailtrap.io",
    port:2525,
    user:"ca10b1837bde95",
    password:"68b543a508ebf4"
  }
};
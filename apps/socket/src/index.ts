import { connectDb } from "@workspace/database";
import env from "./config/env.js";
import { startListening } from "./server.js";

connectDb(env.MONGODB_URL, env.DB_NAME)
  .then(() => {
    console.log("Database connected");
    startListening();
  })
  .catch((err: Error) => {
    console.error("Error connecting database: ", err.message);
    process.exit(1);
  });

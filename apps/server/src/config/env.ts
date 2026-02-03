import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  GROQ_API_KEY: z.string(),
  JWT_SECRET: z.string(),
  MONGODB_URL: z.string(),
  DB_NAME: z.string(),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  const message = result.error.issues.map((e) => `${e.path.join(".")} : ${e.message}`).join(", ");
  throw new Error(message);
}

export default result.data;

import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    TOKEN: z.string().min(1, "DISCORD_TOKEN is required"),
    CLIENT_ID: z.string().min(1, "CLIENT_ID is required"),
    CLIENT_SECRET: z.string().min(1, "CLIENT_ID is required"),
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
    OWNER_ID: z.string().min(1, "OWNER_ID is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("❌ Invalid environment variables:", parsedEnv.error.format());
    process.exit(1);
}

const env = parsedEnv.data;

export default env
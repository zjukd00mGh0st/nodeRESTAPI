import dotenv from "dotenv";

dotenv.config()

export const HOST = process.env.HOST as string || "0.0.0.0";
export const PORT = process.env.PORT as string || "8081";
export const DATABASE_URL = process.env.DATABASE_URL as string;

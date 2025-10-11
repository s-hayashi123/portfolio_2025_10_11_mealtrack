import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db";
import { nanoid } from "nanoid";
import { anonymous } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  advanced: {
    database: {
      generateId: () => nanoid(10),
    },
  },
  plugins: [anonymous(), nextCookies()],
});

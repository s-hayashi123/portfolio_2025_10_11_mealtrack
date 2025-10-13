import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { nanoid } from "nanoid";
import { anonymous } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import * as authSchema from "../db/schemas/auth";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  advanced: {
    database: {
      generateId: () => nanoid(10),
    },
  },
  plugins: [anonymous(), nextCookies()],
});

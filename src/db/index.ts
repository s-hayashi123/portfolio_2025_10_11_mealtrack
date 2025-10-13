import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "./schemas/auth";
import * as mealRecordScema from "./schemas/meal";
import * as weightGoalSchema from "./schemas/goal";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({
  client,
  schema: {
    ...authSchema,
    ...mealRecordScema,
    ...weightGoalSchema,
  },
});

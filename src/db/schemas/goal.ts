import { pgTable, real, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const weightGoal = pgTable("weight_goal", {
  weight: real("weight").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

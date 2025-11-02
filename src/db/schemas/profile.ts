import { integer, pgTable, real, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { nanoid } from "nanoid";

export const profile = pgTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  height: real("height").notNull(),
  weight: real("weight").notNull(),
  age: integer("age").notNull(),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),

  targetWeight: real("target_weight").notNull(),
  targetPeriodDays: integer("target_period_days").notNull(),
  activityLevel: real("activity_level").notNull(),

  proteinRatio: real("protein_ratio").notNull(),
  fatRatio: real("fat_ratio").notNull(),
  carbRatio: real("carb_ratio").notNull(),

  targetCalories: integer("target_calories").notNull(),
  calorieGoal: integer("calorie_goal"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

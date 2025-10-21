import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { nanoid } from "nanoid";

export const mealRecords = pgTable("meal_records", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  foodName: text("food_name").notNull(),
  totalKcal: integer("total_kcal").notNull(),
  mealType: text("meal_type").notNull(),
  amount: integer("amount").notNull(),
  unit: text("unit").notNull(),
  totalProtein: integer("total_protein").notNull(),
  totalFat: integer("total_fat").notNull(),
  totalCarbs: integer("total_carbs").notNull(),
  note: text("note"),
  recordedAt: timestamp("recorded_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type MealRecord = typeof mealRecords.$inferSelect;
export type NewMealRecord = typeof mealRecords.$inferInsert;

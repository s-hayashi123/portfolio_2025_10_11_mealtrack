import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const mealType = ["朝食", "昼食", "夕食", "その他"] as const;

export const mealRecords = pgTable("meal_records", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  foodName: text("food_name").notNull(),
  mealType: text("meal_type").notNull(),
  amount: integer("amount").notNull(),
  unit: integer("unit").notNull(),
  totalKcal: integer("total_kcal").notNull(),
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

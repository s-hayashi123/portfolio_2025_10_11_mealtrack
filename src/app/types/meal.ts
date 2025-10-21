import { mealRecords } from "@/db/schemas/meal";

export type Meal = typeof mealRecords.$inferSelect;

export const MEAL_TYPES = {
  BREAKFAST: "breakfast",
  LUNCH: "lunch",
  DINNER: "dinner",
  SNACK: "snack",
} as const;

export type MealType = (typeof MEAL_TYPES)[keyof typeof MEAL_TYPES];

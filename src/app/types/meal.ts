import { mealRecords } from "@/db/schemas/meal";

export type Meal = typeof mealRecords.$inferSelect;

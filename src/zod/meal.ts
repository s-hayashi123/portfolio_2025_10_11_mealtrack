import { mealRecords } from "@/db/schemas/meal";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const mealFormSchema = createInsertSchema(mealRecords, {
  foodName: z
    .string()
    .min(1, "食事名を入力してください。")
    .max(50, "50文字以下で入力してください。"),
  totalKcal: z
    .number()
    .int("整数で入力してください。")
    .min(0, "0以上の数値を入力してください。")
    .max(5000, "5000以下の数値を入力してください。"),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  recordedAt: z.string(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type MealFormSchema = z.infer<typeof mealFormSchema>;

import { mealRecords } from "@/db/schemas/meal";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const mealFormSchema = createInsertSchema(mealRecords, {
  foodName: z
    .string()
    .min(1, "1文字以上入力してください。")
    .max(40, "40文字以下の名前を入力してください。"),
  totalKcal: z
    .number()
    .min(0, "0以上の数値を入力してください。")
    .max(4000, "4000以下の数値を入力してください。"),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  amount: z.number().min(1, "量を入力してください。"),
  unit: z.string().min(1, "単位を入力してください。"),
  totalProtein: z.number().min(0, "タンパク質は0以上で入力してください"),
  totalFat: z.number().min(0, "脂質は0以上で入力してください"),
  totalCarbs: z.number().min(0, "炭水化物は0以上で入力してください"),
  recordedAt: z.date(),
  note: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
  userId: true,
});

export type MealFormSchema = z.infer<typeof mealFormSchema>;

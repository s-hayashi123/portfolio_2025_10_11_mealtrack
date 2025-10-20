import { mealRecords } from "@/db/schemas/meal";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const mealFormSchema = createInsertSchema(mealRecords, {
  foodName: z.coerce
    .string()
    .min(1, "1文字以上入力してください。")
    .max(40, "40文字以下の名前を入力してください。"),

  totalKcal: z.coerce
    .number()
    .min(0, "0以上の数値を入力してください。")
    .max(4000, "4000以下の数値を入力してください。"),
}).omit({
  id: true,
  createdAt: true,
  userId: true,
  note: true,
});

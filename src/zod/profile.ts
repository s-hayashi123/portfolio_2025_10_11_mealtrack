import { profile } from "@/db/schemas/profile";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const weightFormSchema = createInsertSchema(profile, {
  weight: z.coerce
    .number()
    .min(30, "30以上の数値を入力してください。")
    .max(180, "180以下の数値を入力してください。"),
}).omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

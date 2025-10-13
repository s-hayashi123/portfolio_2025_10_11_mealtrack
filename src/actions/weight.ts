"use server";

import { db } from "@/db";
import { weightGoal } from "@/db/schemas/goal";
import { verifiSession } from "@/lib/session";
import { weightFormSchema } from "@/zod/weight";

export async function createWeightGoal(formData: FormData) {
  const raw = { weight: formData.get("weight") };
  const data = weightFormSchema.parse(raw);
  const session = await verifiSession();
  const userId = session.user.id;

  await db.insert(weightGoal).values({ ...data, userId });
}

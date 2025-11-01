import { db } from "@/db";
import { mealRecords } from "@/db/schemas/meal";
import { verifiSessionForAPI } from "@/lib/session";
import { and, eq, gte, lt, sum } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayMeals = await db
    .select({ totalKcal: sum(mealRecords.totalKcal) })
    .from(mealRecords)
    .where(
      and(
        eq(mealRecords.userId, session.user.id),
        gte(mealRecords.recordedAt, today),
        lt(mealRecords.recordedAt, tomorrow)
      )
    );

  const totalCalories = todayMeals[0]?.totalKcal || 0;
  return NextResponse.json({
    totalCalories: Number(totalCalories) || 0,
    date: today.toISOString().split("T")[0],
  });
}

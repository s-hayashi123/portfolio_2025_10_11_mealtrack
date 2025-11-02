import { db } from "@/db";
import { mealRecords } from "@/db/schemas/meal";
import { verifiSessionForAPI } from "@/lib/session";
import { and, eq, gte, lt, sum } from "drizzle-orm";
import { NextResponse } from "next/server";
import { format, toZonedTime, fromZonedTime } from "date-fns-tz";
import { addDays, startOfDay } from "date-fns";

export async function GET() {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );

  const timeZone = "Asia/Tokyo";

  const now = new Date();

  const nowJST = toZonedTime(now, timeZone);

  const startOfTodayJST = startOfDay(nowJST);

  const startOfTomorrowJST = addDays(startOfTodayJST, 1);

  const startOfTodayUST = fromZonedTime(startOfTodayJST, timeZone);
  const startOfTomorrowUST = fromZonedTime(startOfTomorrowJST, timeZone);

  const todayMeals = await db
    .select({ totalKcal: sum(mealRecords.totalKcal) })
    .from(mealRecords)
    .where(
      and(
        eq(mealRecords.userId, session.user.id),
        gte(mealRecords.recordedAt, startOfTodayUST),
        lt(mealRecords.recordedAt, startOfTomorrowUST)
      )
    );

  const totalCalories = todayMeals[0]?.totalKcal || 0;

  const dateString = format(startOfTodayJST, "yyyy-MM-dd");

  return NextResponse.json({
    totalCalories: Number(totalCalories) || 0,
    date: dateString,
  });
}

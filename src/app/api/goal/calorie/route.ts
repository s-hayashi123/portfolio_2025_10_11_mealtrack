import { db } from "@/db";
import { profile } from "@/db/schemas/goal";
import { verifiSessionForAPI } from "@/lib/session";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );

  const goal = await db
    .select()
    .from(profile)
    .where(eq(profile.userId, session.user.id))
    .limit(1);

  if (goal.length === 0) {
    return NextResponse.json({ goal: null });
  }

  return NextResponse.json({ goal: goal[0] });
}

export async function POST(req: Request) {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );
  const data = await req.json();

  const {
    height,
    weight,
    age,
    gender,
    targetWeight,
    targetPeriodDays,
    activityLevel,
    proteinRatio,
    fatRatio,
    carbRatio,
  } = data;

  let bmr: number;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  const tdee = bmr * activityLevel;

  const weightDiff = targetWeight - weight; // kg
  const totalCaloriesDiff = weightDiff * 7700; // 1kg = 7700kcal
  const dailyCaloriesDiff = totalCaloriesDiff / targetPeriodDays;

  const targetCalories = Math.round(tdee + dailyCaloriesDiff);

  const totalRatio = proteinRatio + fatRatio + carbRatio;
  if (Math.abs(totalRatio - 100) > 0.1) {
    return NextResponse.json(
      { error: "PFCバランスの合計が100%になるように設定してください。" },
      { status: 400 }
    );
  }
}

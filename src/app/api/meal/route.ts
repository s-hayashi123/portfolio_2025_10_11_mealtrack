import { db } from "@/db";
import { mealRecords } from "@/db/schemas/meal";
import { verifiSessionForAPI } from "@/lib/session";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function POST(req: Request) {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );

  const data = await req.json();
  const { foodName, totalKcal, note } = data;

  await db.insert(mealRecords).values({
    userId: session.user.id,
    foodName,
    totalKcal,
    note,
  });
  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );

  const allMeals = await db
    .select()
    .from(mealRecords)
    .orderBy(mealRecords.createdAt);
  return NextResponse.json(allMeals);
}

export async function PUT(req: Request) {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );
  const data = await req.json();
  const { id, foodName, totalKcal } = data;
  await db
    .update(mealRecords)
    .set({ foodName, totalKcal })
    .where(eq(mealRecords.id, id) && eq(mealRecords.userId, session.user.id));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );
  const { id } = await req.json();
  await db
    .delete(mealRecords)
    .where(eq(mealRecords.id, id) && eq(mealRecords.userId, session.user.id));
  return NextResponse.json({ success: true });
}

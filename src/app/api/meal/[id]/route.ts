import { db } from "@/db";
import { mealRecords } from "@/db/schemas/meal";
import { verifiSessionForAPI } from "@/lib/session";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );

  const { id } = await params;
  const meal = await db
    .select()
    .from(mealRecords)
    .where(and(eq(mealRecords.id, id), eq(mealRecords.userId, session.user.id)))
    .limit(1);

  if (meal.length === 0) {
    return NextResponse.json(
      { error: "食事記録が見つかりません。" },
      { status: 404 }
    );
  }

  return NextResponse.json(meal[0]);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );
  const data = await req.json();
  const { id } = await params;
  await db
    .update(mealRecords)
    .set(data)
    .where(
      and(eq(mealRecords.id, id), eq(mealRecords.userId, session.user.id))
    );
  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifiSessionForAPI();
  if (!session)
    return NextResponse.json(
      { error: "認証されていません。" },
      { status: 401 }
    );
  const { id } = await params;
  await db
    .delete(mealRecords)
    .where(
      and(eq(mealRecords.id, id), eq(mealRecords.userId, session.user.id))
    );
  return NextResponse.json({ success: true });
}

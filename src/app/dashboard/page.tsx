import { createWeightGoal } from "@/actions/weight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { verifiSession } from "@/lib/session";

export const metadata = {
  title: "ダッシュボード",
};

async function getWeightGoal() {
  const session = await verifiSession();
  const weightGoal = await db.query.weightGoal.findFirst({
    where: (goal, { eq }) => eq(goal.userId, session.user.id),
    orderBy: (goal, { desc }) => desc(goal.createdAt),
  });
  return weightGoal;
}

export default async function Dashboard() {
  const weightGoal = await getWeightGoal();
  return (
    <div className="container my-4">
      <h1 className="text-center font-bold text-3xl">ダッシュボード</h1>
      <h2 className="font-bold text-2xl">目標体重</h2>
      {weightGoal ? (
        <p>{weightGoal.weight} kg</p>
      ) : (
        <p>まだ登録されていません</p>
      )}
      <form action={createWeightGoal}>
        <Input className="mt-4" type="number" name="weight" step="0.1" />
        <Button type="submit" className="w-full my-4">
          送信
        </Button>
      </form>
    </div>
  );
}

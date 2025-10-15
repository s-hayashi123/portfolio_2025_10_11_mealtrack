import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { verifiSession } from "@/lib/session";

export const metadata = {
  title: "ダッシュボード",
};

export default async function Dashboard() {
  return (
    <div className="container my-4">
      <h1 className="text-center font-bold text-3xl">ダッシュボード</h1>
      <h2 className="font-bold text-2xl">目標体重</h2>
    </div>
  );
}

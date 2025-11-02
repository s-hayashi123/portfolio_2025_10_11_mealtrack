"use client";
import MealForm from "@/components/meal-form";
import MealList from "@/components/meal-list";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [todayCalories, setTodayCalories] = useState<number>(0);
  const [targetCalories, setTargetCalories] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [calorieRes, goalRes] = await Promise.all([
          fetch("/api/meal/today"),
          fetch("/api/goal/calorie"),
        ]);

        if (calorieRes.ok) {
          const data = await calorieRes.json();
          setTodayCalories(data.totalCalories || 0);
        }

        if (goalRes.ok) {
          const data = await goalRes.json();
          setTargetCalories(data.targetCalories || null);
        }
      } catch (err) {
        console.error("データの取得に失敗しました。", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const progressPercentage = targetCalories
    ? Math.min((todayCalories / targetCalories) * 100, 100)
    : 0;

  return (
    <div className="container my-4">
      <h1 className="font-bold text-3xl mb-6">ダッシュボード</h1>

      {/* カロリー表示カード */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {/* 今日の摂取カロリーカード */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">今日の摂取カロリー</h2>
          <div className="text-4xl font-bold text-blue-600">
            {loading ? "..." : `${todayCalories}`}
            <span className="text-xl text-gray-500">kcal</span>
          </div>
        </Card>

        {/* 目標カロリーカード */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">目標カロリー</h2>
          <div className="text-4xl font-bold text-green-600">
            {loading ? "..." : targetCalories ? `${targetCalories}` : "未設定"}
            <span className="text-xl text-gray-500">
              {targetCalories ? "kcal" : ""}
            </span>
          </div>

          {/* プログレスバー */}
          {targetCalories && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>進捗</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* 目標未設定時のメッセージ */}
          {!targetCalories && (
            <p className="mt-2 text-sm text-gray-500">
              <a href="/profile" className="text-blue-600 hover:underline">
                プロフィール
              </a>
              で目標を設定してください
            </p>
          )}
        </Card>
      </div>
      <h2 className="font-bold text-2xl text-center">食事管理</h2>

      <MealForm />
      <MealList />
    </div>
  );
}

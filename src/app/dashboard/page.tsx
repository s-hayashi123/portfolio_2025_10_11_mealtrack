"use client";
import { useEffect, useState } from "react";
import type { MealRecord } from "@/db/schemas/meal";

export default function Dashboard() {
  const [meals, setMeals] = useState<MealRecord[]>([]);

  const getMeals = async () => {
    const res = await fetch("/api/meal");
    const data = await res.json();
    setMeals(data);
  };

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center font-bold text-3xl">ダッシュボード</h1>
      <h2 className="font-bold text-2xl">食事管理</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            {meal.foodName} - {meal.totalKcal}
          </li>
        ))}
      </ul>
    </div>
  );
}

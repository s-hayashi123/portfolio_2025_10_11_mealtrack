"use client";
import { useEffect, useState } from "react";
import type { MealRecord } from "@/db/schemas/meal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [meals, setMeals] = useState<MealRecord[]>([]);
  const [foodName, setFoodName] = useState("");
  const [totalKcal, setTotalKcal] = useState("");

  const getMeals = async () => {
    const res = await fetch("/api/meal");
    const data = await res.json();
    setMeals(data);
  };

  useEffect(() => {
    getMeals();
  }, []);

  const addMeals = async () => {
    await fetch("/api/meal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodName, totalKcal: Number(totalKcal) }),
    });
    setFoodName("");
    setTotalKcal("");
    getMeals();
  };

  const deleteMeal = async (id: string) => {
    await fetch(`/api/meal/${id}`, {
      method: "DELETE",
    });
    getMeals();
  };

  return (
    <div className="container my-4">
      <h1 className="text-center font-bold text-3xl">ダッシュボード</h1>
      <h2 className="font-bold text-2xl">食事管理</h2>
      <div className="flex space-x-3 my-4 max-w-md mx-auto">
        <Input
          placeholder="食事名"
          name="foodName"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <Input
          placeholder="カロリー数"
          name="kcal"
          value={totalKcal}
          onChange={(e) => setTotalKcal(e.target.value)}
        />
        <Button onClick={addMeals}>追加</Button>
      </div>

      <ul>
        {meals.map((meal) => (
          <li
            key={meal.id}
            className="flex justify-between mb-3 max-w-md mx-auto"
          >
            {meal.foodName} - {meal.totalKcal}
            <Button onClick={() => deleteMeal(meal.id)}>削除</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

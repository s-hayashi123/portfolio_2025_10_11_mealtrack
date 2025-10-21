"use client";
import { useEffect, useState } from "react";
import type { MealRecord } from "@/db/schemas/meal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MealForm from "@/components/meal-form";

export default function Dashboard() {
  const [meals, setMeals] = useState<MealRecord[]>([]);
  const [foodName, setFoodName] = useState("");
  const [totalKcal, setTotalKcal] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const getMeals = async () => {
    const res = await fetch("/api/meal");
    const data = await res.json();
    setMeals(data);
  };

  useEffect(() => {
    getMeals();
  }, []);

  const deleteMeal = async (id: string) => {
    await fetch(`/api/meal/${id}`, {
      method: "DELETE",
    });
    getMeals();
  };

  const updateMeal = async (
    id: string,
    foodName: string,
    totalKcal: string
  ) => {
    await fetch(`/api/meal/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ foodName, totalKcal: Number(totalKcal) }),
    });
    setEditId(null);
    setFoodName("");
    setTotalKcal("");
    getMeals();
  };

  return (
    <div className="container my-4">
      <h1 className="font-bold text-3xl">ダッシュボード</h1>
      <h2 className="font-bold text-2xl text-center">食事管理</h2>

      <MealForm />

      <ul>
        {meals.map((meal) => {
          const isEditing = editId === meal.id;
          return (
            <li key={meal.id} className="flex justify-between mb-3 mx-auto">
              {isEditing ? (
                <>
                  <div className="flex space-x-3 my-4 w-full">
                    <Input
                      placeholder="食事名"
                      name="foodName"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="カロリー数"
                      name="kcal"
                      value={totalKcal}
                      onChange={(e) => setTotalKcal(e.target.value)}
                    />
                    <Button
                      onClick={() => {
                        if (!editId) return;
                        updateMeal(editId, foodName, totalKcal);
                      }}
                    >
                      保存
                    </Button>
                    <Button
                      onClick={() => {
                        setEditId(null);
                        setFoodName("");
                        setTotalKcal("");
                      }}
                    >
                      キャンセル
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {meal.foodName} - {meal.totalKcal}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setFoodName(meal.foodName);
                        setTotalKcal(String(meal.totalKcal));
                        setEditId(meal.id);
                      }}
                    >
                      編集
                    </Button>
                    <Button
                      onClick={() => deleteMeal(meal.id)}
                      className="bg-red-600"
                    >
                      削除
                    </Button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

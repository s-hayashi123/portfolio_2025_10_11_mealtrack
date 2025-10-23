import { MealRecord } from "@/db/schemas/meal";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MealList() {
  const [meals, setMeals] = useState<MealRecord[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ foodName: "", totalKcal: "" });

  const fetchMeal = async () => {
    try {
      const res = await fetch("/api/meal");
      if (!res.ok) throw new Error("データの取得に失敗しました。");

      const data = await res.json();
      setMeals(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  const deleteMeal = async (id: string) => {
    await fetch(`/api/meal/${id}`, {
      method: "DELETE",
    });
  };

  const updateMeal = async (
    id: string,
    foodName: string,
    totalKcal: string
  ) => {
    const res = await fetch(`/api/meal/${id}`, {
      method: "PUT",
      body: JSON.stringify({ foodName, totalKcal }),
    });
    fetchMeal();
  };

  const handleEdit = (meal: MealRecord) => {
    setEditId(meal.id);
    setEditData({
      foodName: meal.foodName,
      totalKcal: meal.totalKcal.toString(),
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({ foodName: "", totalKcal: "" });
  };

  const handleSave = async (id: string) => {
    await updateMeal(id, editData.foodName, editData.totalKcal);
    setEditId(null);
  };
  return (
    <ul>
      {meals.map((meal) => (
        <li key={meal.id} className="flex justify-between">
          {editId === meal.id ? (
            <div className="flex w-full gap-4">
              <Input
                value={editData.foodName}
                placeholder="食事名"
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, foodName: e.target.value }))
                }
              />
              <Input
                value={editData.totalKcal}
                placeholder="カロリー"
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    totalKcal: e.target.value,
                  }))
                }
              />
              <Button onClick={handleCancel}>キャンセル</Button>
              <Button onClick={() => handleSave(meal.id)}>保存</Button>
            </div>
          ) : (
            <>
              <span>
                {meal.foodName} - {meal.totalKcal}
              </span>
              <div className="flex gap-2">
                <Button
                  className="bg-gray-700"
                  onClick={() => handleEdit(meal)}
                >
                  編集
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => deleteMeal(meal.id)}
                >
                  削除
                </Button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

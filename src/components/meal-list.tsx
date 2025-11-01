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
    await fetchMeal();
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
    await fetchMeal();
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
    <ul className="space-y-3">
      {meals.map((meal) => (
        <li
          key={meal.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          {editId === meal.id ? (
            <div className="flex w-full items-center gap-3">
              <Input
                value={editData.foodName}
                placeholder="食事名"
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, foodName: e.target.value }))
                }
                className="flex-1"
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
                className="w-24"
              />
              <Button onClick={handleCancel} variant="outline">
                キャンセル
              </Button>
              <Button onClick={() => handleSave(meal.id)}>保存</Button>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{meal.foodName}</p>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                  <span>{meal.totalKcal}kcal</span>
                  <span>/</span>
                  <span>{meal.mealType}</span>
                  <span>/</span>
                  <span>
                    {new Date(meal.recordedAt).toLocaleDateString("ja-JP")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(meal)}
                >
                  編集
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
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

import { mealType } from "../db/schemas/meal";

export default function MealForm() {
  type MealFormType = {
    foodName: string;
    mealType: "朝食" | "昼食" | "夕食" | "その他";
    amount: number;
    unit: number;
    totalKcal: number;
    totalProtein: number;
    totalFat: number;
    totalCarbs: number;
    note?: string;
    recordedAt: Date;
  };
}

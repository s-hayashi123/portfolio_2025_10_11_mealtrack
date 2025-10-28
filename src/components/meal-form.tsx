import { mealFormSchema, MealFormSchema } from "@/zod/meal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

export default function MealForm() {
  const mealForm = useForm<MealFormSchema>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      foodName: "",
      totalKcal: 0,
      mealType: "breakfast",
      recordedAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD形式
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = mealForm;

  const onSubmit = async (data: MealFormSchema) => {
    try {
      const res = await fetch("/api/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("エラーが発生しました。");
      reset();
    } catch (err) {
      console.error("送信エラー", err);
    }
  };

  return (
    <Form {...mealForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 my-8 max-w-md mx-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="foodName">食事名</Label>
          <Input
            {...register("foodName")}
            placeholder="例: ハンバーガー"
            aria-invalid={errors.foodName ? "true" : "false"}
          />
          {errors.foodName && (
            <p className="text-red-600 text-sm">{errors.foodName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalKcal">カロリー (kcal)</Label>
          <Input
            {...register("totalKcal", { valueAsNumber: true })}
            type="number"
            placeholder="例: 500"
            aria-invalid={errors.totalKcal ? "true" : "false"}
          />
          {errors.totalKcal && (
            <p className="text-red-600 text-sm">{errors.totalKcal.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealType">食事タイプ</Label>
          <Select
            value={watch("mealType")}
            onValueChange={(value) => setValue("mealType", value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="食事タイプを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">朝食</SelectItem>
              <SelectItem value="lunch">昼食</SelectItem>
              <SelectItem value="dinner">夕食</SelectItem>
              <SelectItem value="snack">間食</SelectItem>
            </SelectContent>
          </Select>
          {errors.mealType && (
            <p className="text-red-600 text-sm">{errors.mealType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="recordedAt">食べた日付</Label>
          <Input
            {...register("recordedAt")}
            type="date"
            aria-invalid={errors.recordedAt ? "true" : "false"}
          />
          {errors.recordedAt && (
            <p className="text-red-600 text-sm">{errors.recordedAt.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
      </form>
    </Form>
  );
}

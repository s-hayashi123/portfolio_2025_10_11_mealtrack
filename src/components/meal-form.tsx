import { mealFormSchema, MealFormSchema } from "@/zod/meal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";

export default function MealForm() {
  const mealForm = useForm<MealFormSchema>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      foodName: "",
      totalKcal: 0,
      mealType: "breakfast",
      amount: 1,
      unit: "g",
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
      recordedAt: new Date(),
      note: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    reset,
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
        className="flex flex-cols gap-4 my-8"
      >
        <Input
          {...register("foodName")}
          placeholder="食事名"
          aria-invalid={errors.foodName ? "true" : "false"}
        />
        {errors.foodName && (
          <p className="text-red-600 text-sm">{errors.foodName.message}</p>
        )}
        <Input
          {...register("totalKcal")}
          placeholder="kcal"
          aria-invalid={errors.totalKcal ? "true" : "false"}
        />
        {errors.totalKcal && (
          <p className="text-red-600 text-sm">{errors.totalKcal.message}</p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
      </form>
    </Form>
  );
}

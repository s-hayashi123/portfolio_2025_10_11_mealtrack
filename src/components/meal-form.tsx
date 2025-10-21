import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { mealFormSchema } from "@/zod/meal";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type MealFormData = z.infer<typeof mealFormSchema>;

export default function MealForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
  });

  const onSubmit = async (data: MealFormData) => {
    await fetch("/api/meal", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        recordedAt: new Date().toISOString(),
      }),
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex space-x-3 mt-4 mb-8 mx-auto"
    >
      <Input
        placeholder="食事名"
        {...register("foodName", { required: "食事名は必須です" })}
      />
      {errors.foodName && (
        <span className="text-red-500">{errors.foodName.message}</span>
      )}

      <Input
        placeholder="カロリー"
        type="number"
        {...register("totalKcal", {
          required: "カロリーは必須です",
          valueAsNumber: true,
        })}
      />

      <Input
        placeholder="タンパク質"
        type="number"
        {...register("totalProtein", { valueAsNumber: true })}
      />

      <Input
        placeholder="脂質"
        type="number"
        {...register("totalFat", { valueAsNumber: true })}
      />

      <Input
        placeholder="炭水化物"
        type="number"
        {...register("totalCarbs", { valueAsNumber: true })}
      />

      <Input
        placeholder="量"
        type="number"
        {...register("amount", { valueAsNumber: true })}
      />

      <Input placeholder="単位" {...register("unit")} />

      <Textarea placeholder="メモ" {...register("note")} />

      <Button type="submit">追加</Button>
    </form>
  );
}

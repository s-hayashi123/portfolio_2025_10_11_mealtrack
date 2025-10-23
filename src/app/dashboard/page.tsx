"use client";
import MealForm from "@/components/meal-form";
import MealList from "@/components/meal-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Dashboard() {
  return (
    <div className="container my-4">
      <h1 className="font-bold text-3xl">ダッシュボード</h1>
      <h2 className="font-bold text-2xl text-center">食事管理</h2>

      <MealForm />
      <MealList />
    </div>
  );
}

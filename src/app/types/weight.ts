import { weightFormSchema } from "@/zod/weight";
import z from "zod";

export type WeightFormData = z.infer<typeof weightFormSchema>;

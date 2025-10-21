ALTER TABLE "meal_records" ADD COLUMN "meal_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_records" ADD COLUMN "amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_records" ADD COLUMN "unit" text NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_records" ADD COLUMN "total_protein" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_records" ADD COLUMN "total_fat" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_records" ADD COLUMN "total_carbs" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_records" ADD COLUMN "recorded_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "meal_records" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
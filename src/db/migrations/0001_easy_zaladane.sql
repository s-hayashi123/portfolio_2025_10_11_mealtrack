CREATE TABLE "meal_records" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"food_name" text NOT NULL,
	"meal_type" text NOT NULL,
	"amount" integer NOT NULL,
	"unit" integer NOT NULL,
	"total_kcal" integer NOT NULL,
	"total_protein" integer NOT NULL,
	"total_fat" integer NOT NULL,
	"total_carbs" integer NOT NULL,
	"note" text,
	"recorded_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_anonymous" boolean;--> statement-breakpoint
ALTER TABLE "meal_records" ADD CONSTRAINT "meal_records_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
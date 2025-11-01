CREATE TABLE "profile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"height" real NOT NULL,
	"weight" real NOT NULL,
	"age" integer NOT NULL,
	"gender" text NOT NULL,
	"target_weight" real NOT NULL,
	"target_period_days" integer NOT NULL,
	"activity_level" real NOT NULL,
	"protein_ratio" real NOT NULL,
	"fat_ratio" real NOT NULL,
	"carb_ratio" real NOT NULL,
	"target_calories" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DROP TABLE IF EXISTS "weight_goal" CASCADE;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
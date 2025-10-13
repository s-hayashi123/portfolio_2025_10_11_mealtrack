CREATE TABLE "weight_goal" (
	"id" text PRIMARY KEY NOT NULL,
	"weight" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "is_anonymous" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "weight_goal" ADD CONSTRAINT "weight_goal_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
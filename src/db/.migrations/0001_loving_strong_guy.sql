CREATE TABLE "goals_completions" (
	"id" text PRIMARY KEY NOT NULL,
	"gols_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "goals_completions" ADD CONSTRAINT "goals_completions_gols_id_goals_id_fk" FOREIGN KEY ("gols_id") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
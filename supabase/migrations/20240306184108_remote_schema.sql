alter table "public"."users" drop column "udpated_at";

alter table "public"."users" add column "updated_at" timestamp with time zone not null default now();



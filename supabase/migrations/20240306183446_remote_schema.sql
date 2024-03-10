drop policy "Only creator of visit can insert" on "public"."season_visit_sins";

alter table "public"."season_visits" drop column "email";

alter table "public"."season_visits" drop column "first_name";

alter table "public"."season_visits" drop column "last_name";

alter table "public"."season_visits" drop column "phone";

alter table "public"."season_visits" drop column "store_email";

alter table "public"."season_visits" add column "user_id" uuid;

alter table "public"."season_visits" alter column "until" drop not null;

alter table "public"."users" drop column "phone";

alter table "public"."users" add column "store_email" boolean not null default false;

alter table "public"."season_visits" add constraint "public_season_visits_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."season_visits" validate constraint "public_season_visits_user_id_fkey";



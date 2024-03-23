alter table "public"."season_calendar_entries" drop constraint "public_season_calendar_entries_season_id_fkey";

alter table "public"."season_calendar_entries" alter column "from" set data type timestamp with time zone using "from"::timestamp with time zone;

alter table "public"."season_calendar_entries" alter column "until" set data type timestamp with time zone using "until"::timestamp with time zone;

alter table "public"."season_calendar_entries" add constraint "season_calendar_entries_season_id_fkey" FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE not valid;

alter table "public"."season_calendar_entries" validate constraint "season_calendar_entries_season_id_fkey";



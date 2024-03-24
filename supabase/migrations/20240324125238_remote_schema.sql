alter table "public"."seasons" drop column "udpated_at";

alter table "public"."seasons" add column "updated_at" timestamp with time zone not null default now();

create or replace view "public"."season_calendar" as  SELECT season_calendar_entries.id,
    season_calendar_entries.season_id,
    season_calendar_entries.title,
    season_calendar_entries."from",
    season_calendar_entries.until,
    season_calendar_entries.description,
    season_calendar_entries.created_at,
    season_calendar_entries.updated_at
   FROM (season_calendar_entries
     JOIN seasons ON ((seasons.id = season_calendar_entries.season_id)))
  WHERE ((seasons."from" < now()) AND (seasons.until > now()));




drop trigger if exists "season_tour_events_compare_from_until" on "public"."season_tour_events";

drop trigger if exists "season_tour_events_set_updated_at" on "public"."season_tour_events";

revoke delete on table "public"."season_tour_events" from "anon";

revoke insert on table "public"."season_tour_events" from "anon";

revoke references on table "public"."season_tour_events" from "anon";

revoke select on table "public"."season_tour_events" from "anon";

revoke trigger on table "public"."season_tour_events" from "anon";

revoke truncate on table "public"."season_tour_events" from "anon";

revoke update on table "public"."season_tour_events" from "anon";

revoke delete on table "public"."season_tour_events" from "authenticated";

revoke insert on table "public"."season_tour_events" from "authenticated";

revoke references on table "public"."season_tour_events" from "authenticated";

revoke select on table "public"."season_tour_events" from "authenticated";

revoke trigger on table "public"."season_tour_events" from "authenticated";

revoke truncate on table "public"."season_tour_events" from "authenticated";

revoke update on table "public"."season_tour_events" from "authenticated";

revoke delete on table "public"."season_tour_events" from "service_role";

revoke insert on table "public"."season_tour_events" from "service_role";

revoke references on table "public"."season_tour_events" from "service_role";

revoke select on table "public"."season_tour_events" from "service_role";

revoke trigger on table "public"."season_tour_events" from "service_role";

revoke truncate on table "public"."season_tour_events" from "service_role";

revoke update on table "public"."season_tour_events" from "service_role";

alter table "public"."season_tour_events" drop constraint "public_season_tour_events_season_tour_id_fkey";

alter table "public"."season_tour_events" drop constraint "season_tour_events_name_key";

alter table "public"."season_tour_events" drop constraint "season_tour_events_pkey";

drop index if exists "public"."season_tour_events_name_key";

drop index if exists "public"."season_tour_events_pkey";

drop table "public"."season_tour_events";

alter table "public"."season_tours" alter column "tour_template_version_id" drop not null;



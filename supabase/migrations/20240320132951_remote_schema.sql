drop trigger if exists "user_staff_roles_set_updated_at" on "public"."user_staff_roles";

drop policy "Only staff can insert" on "public"."audits";

drop policy "Only staff can select" on "public"."audits";

drop policy "Only admins can delete and if responsibility isn't in tour role" on "public"."responsibilities";

drop policy "Only admins can insert" on "public"."responsibilities";

drop policy "Only admins can update" on "public"."responsibilities";

drop policy "Only staff can select" on "public"."responsibilities";

drop policy "Everyone can select" on "public"."season_calendar_entries";

drop policy "Only staff can delete & if event hasn't expired" on "public"."season_calendar_entries";

drop policy "Only staff can insert" on "public"."season_calendar_entries";

drop policy "Only staff can update & if event hasn't expired" on "public"."season_calendar_entries";

drop policy "Only admins can delete" on "public"."season_members";

drop policy "Only admins can insert" on "public"."season_members";

drop policy "Only staff can select" on "public"."season_members";

drop policy "Only admins can delete & template unused & season not started" on "public"."season_templates";

drop policy "Only admins can insert & seasons not started" on "public"."season_templates";

drop policy "Only admins can update & template unused & season not started" on "public"."season_templates";

drop policy "Only staff can select" on "public"."season_templates";

drop policy "Only staff can select" on "public"."season_tour_events";

drop policy "Only admins and tm can delete" on "public"."season_tour_roles";

drop policy "Only admins and tm can insert" on "public"."season_tour_roles";

drop policy "Only admins and tm can update" on "public"."season_tour_roles";

drop policy "Only staff can select" on "public"."season_tour_roles";

drop policy "Only admins can delete & tour not active || nothing booked" on "public"."season_tour_villages";

drop policy "Only admins can insert" on "public"."season_tour_villages";

drop policy "Only admins can update & tour not active || nothing booked" on "public"."season_tour_villages";

drop policy "Only staff can select" on "public"."season_tour_villages";

drop policy "Only admins can delete & tour not active || nothing booked" on "public"."season_tours";

drop policy "Only admins can insert" on "public"."season_tours";

drop policy "Only admins can update & tour not active || nothing booked" on "public"."season_tours";

drop policy "Only staff can select" on "public"."season_tours";

drop policy "Only admins & tm & user himself can select" on "public"."season_visit_sins";

drop policy "Only admins & tm & user himself can update" on "public"."season_visit_sins";

drop policy "Only admins & tm & user himself can select" on "public"."season_visits";

drop policy "Only admins & tm & user himself can update" on "public"."season_visits";

drop policy "Only admins & tm can delete" on "public"."season_visits";

drop policy "Everyone can select" on "public"."seasons";

drop policy "Only admins can delete & nothing booked on season" on "public"."seasons";

drop policy "Only admins can insert" on "public"."seasons";

drop policy "Only admins can update" on "public"."seasons";

drop policy "Only admin can delete & if version in development" on "public"."tour_template_versions";

drop policy "Only admins can insert" on "public"."tour_template_versions";

drop policy "Only admins can update & only when in dev or released" on "public"."tour_template_versions";

drop policy "Only staff can select" on "public"."tour_template_versions";

drop policy "Only admins can delete & no version is released or deprecated" on "public"."tour_templates";

drop policy "Only admins can insert" on "public"."tour_templates";

drop policy "Only admins can update" on "public"."tour_templates";

drop policy "Only staff can select" on "public"."tour_templates";

drop policy "Only admins can insert" on "public"."user_staff_roles";

drop policy "WIP: Only admins can select & user his own data" on "public"."user_staff_roles";

drop policy "WIP: Only admins can update but not themselve" on "public"."user_staff_roles";

drop policy "Only admins can select all" on "public"."users";

drop policy "Only admins can update & user his own data" on "public"."users";

drop policy "Only staff can select all staff" on "public"."users";

drop policy "Only user can delete himself" on "public"."users";

drop policy "Only user can insert if he doesn't already exist" on "public"."users";

drop policy "Only user can select himself" on "public"."users";

drop policy "Only admins can delete and if village isn't used in any tour" on "public"."villages";

drop policy "Only admins can insert" on "public"."villages";

drop policy "Only admins can update" on "public"."villages";

drop policy "Only staff can select" on "public"."villages";

revoke delete on table "public"."user_staff_roles" from "anon";

revoke insert on table "public"."user_staff_roles" from "anon";

revoke references on table "public"."user_staff_roles" from "anon";

revoke select on table "public"."user_staff_roles" from "anon";

revoke trigger on table "public"."user_staff_roles" from "anon";

revoke truncate on table "public"."user_staff_roles" from "anon";

revoke update on table "public"."user_staff_roles" from "anon";

revoke delete on table "public"."user_staff_roles" from "authenticated";

revoke insert on table "public"."user_staff_roles" from "authenticated";

revoke references on table "public"."user_staff_roles" from "authenticated";

revoke select on table "public"."user_staff_roles" from "authenticated";

revoke trigger on table "public"."user_staff_roles" from "authenticated";

revoke truncate on table "public"."user_staff_roles" from "authenticated";

revoke update on table "public"."user_staff_roles" from "authenticated";

revoke delete on table "public"."user_staff_roles" from "service_role";

revoke insert on table "public"."user_staff_roles" from "service_role";

revoke references on table "public"."user_staff_roles" from "service_role";

revoke select on table "public"."user_staff_roles" from "service_role";

revoke trigger on table "public"."user_staff_roles" from "service_role";

revoke truncate on table "public"."user_staff_roles" from "service_role";

revoke update on table "public"."user_staff_roles" from "service_role";

alter table "public"."season_members" drop constraint "public_season_members_season_id_fkey";

alter table "public"."season_members" drop constraint "public_season_members_user_id_fkey";

alter table "public"."user_staff_roles" drop constraint "user_staff_roles_id_fkey";

drop view if exists "public"."all_users_full";

alter table "public"."user_staff_roles" drop constraint "user_staff_roles_pkey";

drop index if exists "public"."user_staff_roles_pkey";

drop table "public"."user_staff_roles";

alter type "public"."staff_roles" rename to "staff_roles__old_version_to_be_dropped";

create type "public"."staff_roles" as enum ('tour_manager', 'staff');

create table "public"."user_admins" (
    "is_admin" boolean not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "id" uuid not null
);


drop type "public"."staff_roles__old_version_to_be_dropped";

alter table "public"."audits" disable row level security;

alter table "public"."responsibilities" disable row level security;

alter table "public"."season_calendar_entries" disable row level security;

alter table "public"."season_members" add column "staff_role" staff_roles not null;

alter table "public"."season_members" disable row level security;

alter table "public"."season_templates" disable row level security;

alter table "public"."season_tour_events" disable row level security;

alter table "public"."season_tour_roles" disable row level security;

alter table "public"."season_tour_villages" disable row level security;

alter table "public"."season_tours" disable row level security;

alter table "public"."season_visit_sins" disable row level security;

alter table "public"."season_visits" disable row level security;

alter table "public"."seasons" disable row level security;

alter table "public"."tour_template_versions" disable row level security;

alter table "public"."tour_templates" disable row level security;

alter table "public"."users" disable row level security;

alter table "public"."villages" disable row level security;

CREATE UNIQUE INDEX user_staff_roles_pkey ON public.user_admins USING btree (id);

alter table "public"."user_admins" add constraint "user_staff_roles_pkey" PRIMARY KEY using index "user_staff_roles_pkey";

alter table "public"."season_members" add constraint "season_members_season_id_fkey" FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE not valid;

alter table "public"."season_members" validate constraint "season_members_season_id_fkey";

alter table "public"."season_members" add constraint "season_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."season_members" validate constraint "season_members_user_id_fkey";

alter table "public"."user_admins" add constraint "user_admins_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_admins" validate constraint "user_admins_id_fkey";

create or replace view "public"."all_users_full" as  SELECT users.id,
    users.first_name,
    users.last_name,
    auth_users.email,
    users.store_email,
    user_admins.is_admin,
    auth_users.created_at,
    auth_users.updated_at
   FROM ((users
     JOIN auth.users auth_users ON ((auth_users.id = users.id)))
     JOIN user_admins ON ((user_admins.id = users.id)));


grant delete on table "public"."user_admins" to "anon";

grant insert on table "public"."user_admins" to "anon";

grant references on table "public"."user_admins" to "anon";

grant select on table "public"."user_admins" to "anon";

grant trigger on table "public"."user_admins" to "anon";

grant truncate on table "public"."user_admins" to "anon";

grant update on table "public"."user_admins" to "anon";

grant delete on table "public"."user_admins" to "authenticated";

grant insert on table "public"."user_admins" to "authenticated";

grant references on table "public"."user_admins" to "authenticated";

grant select on table "public"."user_admins" to "authenticated";

grant trigger on table "public"."user_admins" to "authenticated";

grant truncate on table "public"."user_admins" to "authenticated";

grant update on table "public"."user_admins" to "authenticated";

grant delete on table "public"."user_admins" to "service_role";

grant insert on table "public"."user_admins" to "service_role";

grant references on table "public"."user_admins" to "service_role";

grant select on table "public"."user_admins" to "service_role";

grant trigger on table "public"."user_admins" to "service_role";

grant truncate on table "public"."user_admins" to "service_role";

grant update on table "public"."user_admins" to "service_role";

CREATE TRIGGER user_staff_roles_set_updated_at BEFORE UPDATE ON public.user_admins FOR EACH ROW EXECUTE FUNCTION set_updated_at();



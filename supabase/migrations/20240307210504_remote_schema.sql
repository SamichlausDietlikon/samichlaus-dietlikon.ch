drop policy "Only staff can insert" on "public"."audits";

drop policy "Only staff can select" on "public"."audits";

drop policy "Only admins can delete and if responsibility isn't in tour role" on "public"."responsibilities";

drop policy "Only admins can insert" on "public"."responsibilities";

drop policy "Only admins can update" on "public"."responsibilities";

drop policy "Only staff can select" on "public"."responsibilities";

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

drop policy "Only admins can delete & nothing booked on season" on "public"."seasons";

drop policy "Only admins can insert" on "public"."seasons";

drop policy "Only admins can update" on "public"."seasons";

drop policy "Only admins can insert" on "public"."tour_template_versions";

drop policy "Only admins can update & only when in dev or released" on "public"."tour_template_versions";

drop policy "Only staff can select" on "public"."tour_template_versions";

drop policy "Only admins can delete & no version is released or deprecated" on "public"."tour_templates";

drop policy "Only admins can insert" on "public"."tour_templates";

drop policy "Only admins can update" on "public"."tour_templates";

drop policy "Only staff can select" on "public"."tour_templates";

drop policy "Only admins can select all" on "public"."users";

drop policy "Only admins can update & user his own data" on "public"."users";

drop policy "Only staff can select all staff" on "public"."users";

drop policy "Only user can insert if he doesn't already exist" on "public"."users";

drop policy "Only admins can delete and if village isn't used in any tour" on "public"."villages";

drop policy "Only admins can insert" on "public"."villages";

drop policy "Only admins can update" on "public"."villages";

drop policy "Only staff can select" on "public"."villages";

create table "public"."user_staff_roles" (
    "user_id" uuid not null,
    "staff_role" staff_roles not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."user_staff_roles" enable row level security;

alter table "public"."users" drop column "staff_role";

CREATE UNIQUE INDEX user_staff_roles_pkey ON public.user_staff_roles USING btree (user_id);

alter table "public"."user_staff_roles" add constraint "user_staff_roles_pkey" PRIMARY KEY using index "user_staff_roles_pkey";

alter table "public"."user_staff_roles" add constraint "public_user_staff_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."user_staff_roles" validate constraint "public_user_staff_roles_user_id_fkey";

grant delete on table "public"."user_staff_roles" to "anon";

grant insert on table "public"."user_staff_roles" to "anon";

grant references on table "public"."user_staff_roles" to "anon";

grant select on table "public"."user_staff_roles" to "anon";

grant trigger on table "public"."user_staff_roles" to "anon";

grant truncate on table "public"."user_staff_roles" to "anon";

grant update on table "public"."user_staff_roles" to "anon";

grant delete on table "public"."user_staff_roles" to "authenticated";

grant insert on table "public"."user_staff_roles" to "authenticated";

grant references on table "public"."user_staff_roles" to "authenticated";

grant select on table "public"."user_staff_roles" to "authenticated";

grant trigger on table "public"."user_staff_roles" to "authenticated";

grant truncate on table "public"."user_staff_roles" to "authenticated";

grant update on table "public"."user_staff_roles" to "authenticated";

grant delete on table "public"."user_staff_roles" to "service_role";

grant insert on table "public"."user_staff_roles" to "service_role";

grant references on table "public"."user_staff_roles" to "service_role";

grant select on table "public"."user_staff_roles" to "service_role";

grant trigger on table "public"."user_staff_roles" to "service_role";

grant truncate on table "public"."user_staff_roles" to "service_role";

grant update on table "public"."user_staff_roles" to "service_role";

create policy "Only admins can insert"
on "public"."user_staff_roles"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles_1.user_id
   FROM user_staff_roles user_staff_roles_1
  WHERE (user_staff_roles_1.staff_role = 'admin'::staff_roles))));


create policy "Only admins can select & user his own data"
on "public"."user_staff_roles"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles_1.user_id
   FROM user_staff_roles user_staff_roles_1
  WHERE ((user_staff_roles_1.staff_role = 'admin'::staff_roles) OR (user_staff_roles_1.user_id = auth.uid())))));


create policy "Only admins can update but not themselve"
on "public"."user_staff_roles"
as permissive
for update
to public
using (((auth.uid() IN ( SELECT user_staff_roles_1.user_id
   FROM user_staff_roles user_staff_roles_1
  WHERE (user_staff_roles_1.staff_role = 'admin'::staff_roles))) AND (user_id <> auth.uid())))
with check (((auth.uid() IN ( SELECT user_staff_roles_1.user_id
   FROM user_staff_roles user_staff_roles_1
  WHERE (user_staff_roles_1.staff_role = 'admin'::staff_roles))) AND (user_id <> auth.uid())));


create policy "Only staff can insert"
on "public"."audits"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only staff can select"
on "public"."audits"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins can delete and if responsibility isn't in tour role"
on "public"."responsibilities"
as permissive
for delete
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tour_roles.id
   FROM season_tour_roles
  WHERE (responsibilities.id = season_tour_roles.responsibility_id))))));


create policy "Only admins can insert"
on "public"."responsibilities"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update"
on "public"."responsibilities"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only staff can select"
on "public"."responsibilities"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only staff can delete & if event hasn't expired"
on "public"."season_calendar_entries"
as permissive
for delete
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))) AND ("from" > now())));


create policy "Only staff can insert"
on "public"."season_calendar_entries"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only staff can update & if event hasn't expired"
on "public"."season_calendar_entries"
as permissive
for update
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))) AND ("from" > now())))
with check (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))) AND ("from" > now())));


create policy "Only admins can delete"
on "public"."season_members"
as permissive
for delete
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can insert"
on "public"."season_members"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only staff can select"
on "public"."season_members"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins can delete & template unused & season not started"
on "public"."season_templates"
as permissive
for delete
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tours.id
   FROM season_tours
  WHERE (season_tours.season_id = season_templates.season_id)))) AND (NOT (EXISTS ( SELECT seasons.id
   FROM seasons
  WHERE ((seasons.id = season_templates.season_id) AND (seasons."from" > now())))))));


create policy "Only admins can insert & seasons not started"
on "public"."season_templates"
as permissive
for insert
to public
with check (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT seasons.id
   FROM seasons
  WHERE ((seasons.id = season_templates.season_id) AND (seasons."from" > now())))))));


create policy "Only admins can update & template unused & season not started"
on "public"."season_templates"
as permissive
for update
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tours.id
   FROM season_tours
  WHERE (season_tours.season_id = season_templates.season_id)))) AND (NOT (EXISTS ( SELECT seasons.id
   FROM seasons
  WHERE ((seasons.id = season_templates.season_id) AND (seasons."from" > now())))))))
with check (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tours.id
   FROM season_tours
  WHERE (season_tours.season_id = season_templates.season_id)))) AND (NOT (EXISTS ( SELECT seasons.id
   FROM seasons
  WHERE ((seasons.id = season_templates.season_id) AND (seasons."from" > now())))))));


create policy "Only staff can select"
on "public"."season_templates"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only staff can select"
on "public"."season_tour_events"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins and tm can delete"
on "public"."season_tour_roles"
as permissive
for delete
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles)))));


create policy "Only admins and tm can insert"
on "public"."season_tour_roles"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles)))));


create policy "Only admins and tm can update"
on "public"."season_tour_roles"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles)))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles)))));


create policy "Only staff can select"
on "public"."season_tour_roles"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins can delete & tour not active || nothing booked"
on "public"."season_tour_villages"
as permissive
for delete
to public
using ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tours.id
   FROM season_tours
  WHERE ((season_tours.id = season_tour_villages.season_tour_id) AND (season_tours.active IS TRUE)))))) OR (NOT (EXISTS ( SELECT season_visits.id
   FROM season_visits
  WHERE (season_visits.season_tour_id = season_tour_villages.season_tour_id))))));


create policy "Only admins can insert"
on "public"."season_tour_villages"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update & tour not active || nothing booked"
on "public"."season_tour_villages"
as permissive
for update
to public
using ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tours.id
   FROM season_tours
  WHERE ((season_tours.id = season_tour_villages.season_tour_id) AND (season_tours.active IS TRUE)))))) OR (NOT (EXISTS ( SELECT season_visits.id
   FROM season_visits
  WHERE (season_visits.season_tour_id = season_tour_villages.season_tour_id))))))
with check ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tours.id
   FROM season_tours
  WHERE ((season_tours.id = season_tour_villages.season_tour_id) AND (season_tours.active IS TRUE)))))) OR (NOT (EXISTS ( SELECT season_visits.id
   FROM season_visits
  WHERE (season_visits.season_tour_id = season_tour_villages.season_tour_id))))));


create policy "Only staff can select"
on "public"."season_tour_villages"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins can delete & tour not active || nothing booked"
on "public"."season_tours"
as permissive
for delete
to public
using ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (active IS FALSE)) OR (NOT (EXISTS ( SELECT season_visits.id
   FROM season_visits
  WHERE (season_visits.season_tour_id = season_tours.id))))));


create policy "Only admins can insert"
on "public"."season_tours"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update & tour not active || nothing booked"
on "public"."season_tours"
as permissive
for update
to public
using ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (active IS FALSE)) OR (NOT (EXISTS ( SELECT season_visits.id
   FROM season_visits
  WHERE (season_visits.season_tour_id = season_tours.id))))))
with check ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (active IS FALSE)) OR (NOT (EXISTS ( SELECT season_visits.id
   FROM season_visits
  WHERE (season_visits.season_tour_id = season_tours.id))))));


create policy "Only staff can select"
on "public"."season_tours"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins & tm & user himself can select"
on "public"."season_visit_sins"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))));


create policy "Only admins & tm & user himself can update"
on "public"."season_visit_sins"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))));


create policy "Only admins & tm & user himself can select"
on "public"."season_visits"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))));


create policy "Only admins & tm & user himself can update"
on "public"."season_visits"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))));


create policy "Only admins & tm can delete"
on "public"."season_visits"
as permissive
for delete
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.staff_role = 'tour_manager'::staff_roles)))));


create policy "Only admins can delete & nothing booked on season"
on "public"."seasons"
as permissive
for delete
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_members.id
   FROM season_members
  WHERE (seasons.id = season_members.season_id)))) AND (NOT (EXISTS ( SELECT season_calendar_entries.id
   FROM season_calendar_entries
  WHERE (seasons.id = season_calendar_entries.season_id)))) AND (NOT (EXISTS ( SELECT season_tours.id
   FROM season_tours
  WHERE (seasons.id = season_tours.season_id)))) AND (NOT (EXISTS ( SELECT season_templates.id
   FROM season_templates
  WHERE (seasons.id = season_templates.season_id))))));


create policy "Only admins can insert"
on "public"."seasons"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update"
on "public"."seasons"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can insert"
on "public"."tour_template_versions"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update & only when in dev or released"
on "public"."tour_template_versions"
as permissive
for update
to public
using ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (tag = 'development'::tour_template_tags)) OR (tag = 'released'::tour_template_tags)))
with check ((((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (tag = 'development'::tour_template_tags)) OR (tag = 'released'::tour_template_tags)));


create policy "Only staff can select"
on "public"."tour_template_versions"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins can delete & no version is released or deprecated"
on "public"."tour_templates"
as permissive
for delete
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT tour_template_versions.id
   FROM tour_template_versions
  WHERE ((tour_template_versions.tour_template_id = tour_templates.id) AND (tour_template_versions.tag = ANY (ARRAY['released'::tour_template_tags, 'deprecated'::tour_template_tags]))))))));


create policy "Only admins can insert"
on "public"."tour_templates"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update"
on "public"."tour_templates"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only staff can select"
on "public"."tour_templates"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


create policy "Only admins can select all"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update & user his own data"
on "public"."users"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role = 'admin'::staff_roles) OR (user_staff_roles.user_id = auth.uid())))));


create policy "Only staff can select all staff"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE ((user_staff_roles.staff_role IS NOT NULL) AND (user_staff_roles.staff_role IS NOT NULL)))));


create policy "Only user can insert if he doesn't already exist"
on "public"."users"
as permissive
for insert
to public
with check ((id <> auth.uid()));


create policy "Only admins can delete and if village isn't used in any tour"
on "public"."villages"
as permissive
for delete
to public
using (((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (NOT (EXISTS ( SELECT season_tour_villages.id
   FROM season_tour_villages
  WHERE (villages.id = season_tour_villages.village_id))))));


create policy "Only admins can insert"
on "public"."villages"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only admins can update"
on "public"."villages"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))))
with check ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));


create policy "Only staff can select"
on "public"."villages"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT user_staff_roles.user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role IS NOT NULL))));


CREATE TRIGGER user_staff_roles_set_updated_at BEFORE UPDATE ON public.user_staff_roles FOR EACH ROW EXECUTE FUNCTION set_updated_at();



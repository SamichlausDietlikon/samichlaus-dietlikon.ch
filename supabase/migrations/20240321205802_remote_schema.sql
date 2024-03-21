alter table "public"."season_templates" drop constraint "public_season_templates_season_id_fkey";

alter table "public"."tour_template_versions" drop constraint "public_tour_template_versions_tour_template_id_fkey";

alter table "public"."user_admins" drop constraint "user_admins_id_fkey";

alter table "public"."season_templates" add constraint "season_templates_season_id_fkey" FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE not valid;

alter table "public"."season_templates" validate constraint "season_templates_season_id_fkey";

alter table "public"."season_templates" add constraint "season_templates_tout_template_version_id_fkey" FOREIGN KEY (tout_template_version_id) REFERENCES tour_template_versions(id) ON DELETE CASCADE not valid;

alter table "public"."season_templates" validate constraint "season_templates_tout_template_version_id_fkey";

alter table "public"."tour_template_versions" add constraint "tour_template_versions_tour_template_id_fkey" FOREIGN KEY (tour_template_id) REFERENCES tour_templates(id) ON DELETE CASCADE not valid;

alter table "public"."tour_template_versions" validate constraint "tour_template_versions_tour_template_id_fkey";

alter table "public"."user_admins" add constraint "user_admins_id_fkey" FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."user_admins" validate constraint "user_admins_id_fkey";



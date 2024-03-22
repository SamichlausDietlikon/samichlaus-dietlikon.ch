alter table "public"."season_templates" drop constraint "season_templates_tout_template_version_id_fkey";

alter table "public"."season_templates" drop column "tout_template_version_id";

alter table "public"."season_templates" add column "tour_template_version_id" bigint not null;

alter table "public"."season_templates" add constraint "season_templates_tour_template_version_id_fkey" FOREIGN KEY (tour_template_version_id) REFERENCES tour_template_versions(id) ON DELETE CASCADE not valid;

alter table "public"."season_templates" validate constraint "season_templates_tour_template_version_id_fkey";



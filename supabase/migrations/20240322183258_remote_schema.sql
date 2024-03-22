CREATE UNIQUE INDEX same_template_once_per_season ON public.season_templates USING btree (season_id, tour_template_version_id);

alter table "public"."season_templates" add constraint "same_template_once_per_season" UNIQUE using index "same_template_once_per_season";



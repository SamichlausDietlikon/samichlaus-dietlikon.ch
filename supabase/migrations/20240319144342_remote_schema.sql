drop policy "Only admins can update & only when in dev or released" on "public"."tour_template_versions";

alter table "public"."seasons" alter column "from" set not null;

alter table "public"."seasons" alter column "name" set not null;

alter table "public"."seasons" alter column "until" set not null;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.obey_template_tag_order()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  IF OLD.tag = NEW.tag OR OLD.tag = 'development' AND NEW.tag = 'released' OR OLD.tag = 'released' AND NEW.tag = 'deprecated' THEN
    RETURN NEW;
  ELSE
    RAISE 'Die erlaubte Reihenfolge der Tags wurde nicht eingehalten (development -> released -> deprecated)';
  END IF;
END;$function$
;

create policy "Only admin can delete & if version in development"
on "public"."tour_template_versions"
as permissive
for delete
to public
using (((auth.uid() IN ( SELECT user_staff_roles.id AS user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))) AND (tag = 'development'::tour_template_tags)));


create policy "Only admins can update & only when in dev or released"
on "public"."tour_template_versions"
as permissive
for update
to public
using ((auth.uid() IN ( SELECT user_staff_roles.id AS user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))))
with check ((auth.uid() IN ( SELECT user_staff_roles.id AS user_id
   FROM user_staff_roles
  WHERE (user_staff_roles.staff_role = 'admin'::staff_roles))));




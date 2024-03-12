drop policy "Only staff can select" on "public"."responsibilities";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_staff_users()
 RETURNS SETOF uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    select id 
    from user_staff_roles 
    where staff_role IS NOT NULL
$function$
;

create policy "Only staff can select"
on "public"."responsibilities"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT get_staff_users() AS get_staff_users)));




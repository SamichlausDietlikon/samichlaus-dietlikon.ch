drop policy "Only admins can select & user his own data" on "public"."user_staff_roles";

drop policy "Only admins can update but not themselve" on "public"."user_staff_roles";

drop policy "Only admins can insert" on "public"."user_staff_roles";

create policy "WIP: Only admins can select & user his own data"
on "public"."user_staff_roles"
as permissive
for select
to public
using (((auth.uid() = user_id) AND (staff_role = 'admin'::staff_roles)));


create policy "WIP: Only admins can update but not themselve"
on "public"."user_staff_roles"
as permissive
for update
to public
using (((auth.uid() = user_id) AND (staff_role = 'admin'::staff_roles) AND (user_id <> auth.uid())))
with check (((auth.uid() = user_id) AND (staff_role = 'admin'::staff_roles) AND (user_id <> auth.uid())));


create policy "Only admins can insert"
on "public"."user_staff_roles"
as permissive
for insert
to public
with check (((auth.uid() = user_id) AND (staff_role = 'admin'::staff_roles)));




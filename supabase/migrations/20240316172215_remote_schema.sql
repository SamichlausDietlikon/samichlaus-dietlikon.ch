drop policy "Only user can insert if he doesn't already exist" on "public"."users";

create policy "Only user can insert if he doesn't already exist"
on "public"."users"
as permissive
for insert
to public
with check ((id = auth.uid()));




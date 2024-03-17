create or replace view "public"."all_users_full" as  SELECT users.id,
    users.first_name,
    users.last_name,
    auth_users.email,
    users.store_email,
    user_staff_roles.staff_role,
    auth_users.created_at,
    auth_users.updated_at
   FROM ((users
     JOIN auth.users auth_users ON ((auth_users.id = users.id)))
     JOIN user_staff_roles ON ((user_staff_roles.id = users.id)));




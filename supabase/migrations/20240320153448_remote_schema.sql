alter table "public"."season_members" alter column "season_id" set not null;

alter table "public"."season_members" alter column "user_id" set not null;

create or replace view "public"."all_users_full" as  SELECT users.id,
    users.first_name,
    users.last_name,
    auth_users.email,
    users.store_email,
        CASE
            WHEN (user_admins.is_admin IS TRUE) THEN 'admin'::text
            ELSE NULL::text
        END AS staff_role,
    auth_users.created_at,
    auth_users.updated_at
   FROM ((users
     JOIN auth.users auth_users ON ((auth_users.id = users.id)))
     LEFT JOIN user_admins ON ((user_admins.id = users.id)));




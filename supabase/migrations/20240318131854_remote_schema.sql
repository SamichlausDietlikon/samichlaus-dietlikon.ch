create or replace view "public"."tour_templates_overview" as  SELECT tour_templates.id,
    tour_templates.title,
    tour_templates.description,
    tour_templates.created_at,
    tour_templates.updated_at,
    ( SELECT tour_template_versions.version
           FROM tour_template_versions
          WHERE ((tour_template_versions.tour_template_id = tour_templates.id) AND (tour_template_versions.tag = 'released'::tour_template_tags))
          ORDER BY tour_template_versions.id DESC
         LIMIT 1) AS newest_version,
    ( SELECT tour_template_versions.tag
           FROM tour_template_versions
          WHERE (tour_template_versions.tour_template_id = tour_templates.id)
          ORDER BY tour_template_versions.id DESC
         LIMIT 1) AS latest_tag
   FROM tour_templates;




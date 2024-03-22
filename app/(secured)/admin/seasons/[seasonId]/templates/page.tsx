"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { useEffect, useState } from "react";
import { Tables } from "@/types/database.types";
import { tourTemplateTags } from "@/lib/utils";
import SeasonTemplateFromDialog from "@/components/seasons/templates/season-template-form-dialog";
import { Badge } from "@/components/ui/badge";

export default function SeasonTemplates({ params }: { params: { seasonId: string } }) {
  const [templates, setTemplates] = useState<
    | []
    | (Tables<"season_templates"> & {
        version:
          | (Tables<"tour_template_versions"> & {
              tourTemplate: Tables<"tour_templates"> | null;
            })
          | null;
      })[]
  >([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { loading, user } = useUser();

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("season_templates")
      .select(
        "*, version:tour_template_versions!inner(*, tourTemplate:tour_templates!inner(*))"
      )
      .eq("season_id", params.seasonId)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setTemplates(data);
      });
  }, [refetch, supabase]);

  return loading && templates.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl w-full px-8">
      <h1 className="text-2xl my-8">Saison Vorlagen</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Version</TableHead>
            <TableHead className="text-right">
              {(user as FullUser).staff_role === "admin" && (
                <SeasonTemplateFromDialog refetch={refetch} setRefetch={setRefetch} />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates?.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.version?.tourTemplate?.title}</TableCell>
              <TableCell>{template.version?.tourTemplate?.description ?? "-"}</TableCell>
              <TableCell>
                <Badge>v{template.version?.version}</Badge>
              </TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" && (
                  <SeasonTemplateFromDialog
                    seasonTemplate={template}
                    refetch={refetch}
                    setRefetch={setRefetch}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

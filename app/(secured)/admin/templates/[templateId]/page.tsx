"use client";

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/database.types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUser from "@/hooks/useUser";
import { FullUser } from "@/types/common.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackLink from "@/components/common/back-link";

export default function SingleTemplate() {
  const { templateId } = useParams();

  const { loading, user } = useUser();

  const [template, setTemplate] = useState<
    | null
    | (Tables<"tour_templates"> & {
        tour_template_versions: Tables<"tour_template_versions">[];
      })
  >(null);

  const supabase = createClient();

  useEffect(() => {
    async function getTemplateData() {
      const { data, error } = await supabase
        .from("tour_templates")
        .select("*, tour_template_versions!left(*)")
        .eq("id", parseInt(Array.isArray(templateId) ? templateId[0] : templateId))
        .maybeSingle();
      if (error) {
        toast.error(`Fehler: ${JSON.stringify(error)}`);
        return;
      }

      setTemplate(data);
    }
    getTemplateData();
  }, [supabase]);

  async function handleDelete(versionId: number) {
    const { status, error } = await supabase
      .from("tour_template_versions")
      .delete()
      .eq("id", versionId);

    if (status === 204) {
      toast.success("Version erfolgreich gelöscht");
      const newTemplateVersions = template?.tour_template_versions.filter(
        (version) => version.id !== versionId
      );
      setTemplate({
        ...template!,
        ...{ tour_template_versions: newTemplateVersions || [] },
      });
      return;
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  return (
    template && (
      <section className="max-w-7xl m-auto px-8">
        <BackLink href="/admin/templates" />
        <h1 className="text-2xl my-8">
          Vorlage <strong>{template.title}</strong>
        </h1>
        <p className="text-xl">Beschreibung:</p>
        <p className="text-sm my-1 text-stone-500">{template.description}</p>
        <h2 className="text-xl my-8">Versionen</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Beschreibung</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead className="text-right">
                {(user as FullUser).staff_role === "admin" && (
                  <Link
                    href={`/admin/templates/${template.id}/versions/new`}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3"
                  >
                    + Erstellen
                  </Link>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {template.tour_template_versions.map((version) => (
              <TableRow key={version.id}>
                <TableCell>
                  <Badge variant="default">v{version.version}</Badge>
                </TableCell>
                <TableCell className="max-w-[28ch] text-nowrap overflow-hidden overflow-ellipsis">
                  {version.description ?? "-"}
                </TableCell>
                <TableCell>
                  <Badge variant={version.tag}>{version.tag}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {(user as FullUser).staff_role === "admin" && (
                    <Button
                      variant="link"
                      className="text-red-400 hover:text-red-500"
                      onClick={() => handleDelete(version.id)}
                    >
                      Löschen
                    </Button>
                  )}
                  <Link
                    href={`/admin/templates/${template.id}/versions/${version.id}`}
                    className="text-primary underline-offset-4 hover:underline text-sm font-medium h-9 px-2 py-2"
                  >
                    Bearbeiten
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    )
  );
}

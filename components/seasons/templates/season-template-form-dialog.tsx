"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tables } from "@/types/database.types";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useParams } from "next/navigation";
import RequiredStar from "@/components/common/required-star";

export default function SeasonTemplateFromDialog({
  seasonTemplate,
  refetch,
  setRefetch,
}: {
  seasonTemplate?: Tables<"season_templates">;
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<
    | (Tables<"tour_templates"> & { versions: Tables<"tour_template_versions">[] })[]
    | undefined
  >();
  const [seasonTemplateId, setSeasonTemplateId] = useState<number | undefined>();
  const [seasonTemplateVersionId, setSeasonTemplateVersionId] = useState(
    seasonTemplate?.tour_template_version_id
  );

  const supabase = createClient();
  const params = useParams();

  function setSeasonTemplate(
    templates: (Tables<"tour_templates"> & {
      versions: Tables<"tour_template_versions">[];
    })[]
  ) {
    if (seasonTemplate) {
      setSeasonTemplateId(
        templates.filter((template) =>
          template.versions.filter(
            (version) => version.id == seasonTemplate?.tour_template_version_id
          )
        )[0].id
      );
    }
  }

  function resetAndClose() {
    seasonTemplate ? setSeasonTemplate(templates!) : setSeasonTemplateId(undefined);
    setSeasonTemplateVersionId(seasonTemplate?.tour_template_version_id);
    setOpen(false);
  }

  useEffect(() => {
    async function getTemplates() {
      const { data, error } = await supabase
        .from("tour_templates")
        .select("*, versions:tour_template_versions!inner(*)")
        .eq("versions.tag", "released");

      if (error) {
        console.error(error);
        toast.error(`Fehler: ${JSON.stringify(error)}`);
        return;
      }

      setSeasonTemplate(data);
      setTemplates(data);
    }

    getTemplates();
  }, [refetch, supabase]);

  async function handleCreate() {
    if (!seasonTemplateId || !seasonTemplateVersionId) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    const { status, error } = await supabase.from("season_templates").insert({
      season_id: parseInt(params.seasonId as string),
      tour_template_version_id: seasonTemplateVersionId,
    });

    if (status === 201) {
      toast.success(`Saison Vorlage erfolgreich hinzugegfügt`);
      resetAndClose();
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  async function handleSave() {
    const { status, error } = await supabase
      .from("season_templates")
      .update({
        tour_template_version_id: seasonTemplateVersionId,
      })
      .eq("season_id", seasonTemplate!.season_id);

    if (status === 204) {
      toast.success(`Saison Vorlage erfolgreich gespeichert`);
      setOpen(false);
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {seasonTemplate ? (
          <Button variant="secondary" size="sm">
            Bearbeiten
          </Button>
        ) : (
          <Button size="sm">+ Hinzufügen</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {seasonTemplate ? (
            <DialogTitle>
              Bearbeite{" "}
              <em>
                {
                  templates?.filter((template) => template.id == seasonTemplateId)[0]
                    .title
                }
              </em>
            </DialogTitle>
          ) : (
            <DialogTitle>Füge eine Vorlage zur Saison hinzu</DialogTitle>
          )}
        </DialogHeader>
        {templates && (
          <>
            <div>
              <Label>Vorlage<RequiredStar /></Label>
              <Select
                onValueChange={(template) => setSeasonTemplateId(parseInt(template))}
                defaultValue={seasonTemplateId?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vorlage auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {templates.map((template) => {
                      return (
                        <>
                          <SelectItem value={template.id.toString()}>
                            {template.title}
                          </SelectItem>
                        </>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {seasonTemplateId && (
              <div>
                <Label>Version<RequiredStar /></Label>
                <Select
                  onValueChange={(version) =>
                    setSeasonTemplateVersionId(parseInt(version))
                  }
                  defaultValue={seasonTemplateVersionId?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Version auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* {console.log(templates, seasonTemplateVersionId)} */}
                      {templates
                        .filter((template) => template.id == seasonTemplateId)[0]
                        .versions.map((version) => {
                          return (
                            <>
                              <SelectItem value={version.id.toString()}>
                                v{version.version} - {version.description}
                              </SelectItem>
                            </>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>
            Abbrechen
          </Button>
          {seasonTemplate ? (
            <Button onClick={() => handleSave()}>Speichern</Button>
          ) : (
            <Button onClick={() => handleCreate()}>Hinzufügen</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

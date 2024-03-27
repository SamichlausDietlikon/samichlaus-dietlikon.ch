"use client";

import { Enums, Json, Tables } from "@/types/database.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { tourTemplateTags } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import Editor from "@monaco-editor/react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import RequiredStar from "../common/required-star";
import { validateTourTemplate } from "@/lib/jsonValidator";

export default function VersionForm({
  template,
  tourVersion,
}: {
  template: Tables<"tour_templates">;
  tourVersion?: Tables<"tour_template_versions">;
}) {
  const [version, setVersion] = useState<number | undefined>(undefined);
  const [tag, setTag] = useState<Enums<"tour_template_tags"> | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [versionCode, setVersionCode] = useState<string | undefined>(undefined);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (tourVersion) {
      setVersion(tourVersion.version);
      setTag(tourVersion.tag);
      setDescription(tourVersion.description ?? "");
      setVersionCode(JSON.stringify(tourVersion.template, null, "\t"));
    }
  }, []);

  async function handleCreate() {
    if (!version || !tag || !versionCode) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    try {
      const parsedVersionCode = JSON.parse(versionCode);
      if (!parsedVersionCode && typeof parsedVersionCode !== "object") {
        toast.error("Invalid JSON");
        return;
      }
    } catch (e) {
      toast.error("Invalid JSON");
      return;
    }

    const validTourTemplate = validateTourTemplate(JSON.parse(versionCode));

    if (!validTourTemplate) {
      toast.error(
        `Fehle in der Vorlage: ${validateTourTemplate.errors
          ?.map((error) => {
            if (error.keyword !== "anyOf") return error.message;
          })
          .join(", ")}`
      );
      return;
    }

    const { status, error } = await supabase.from("tour_template_versions").insert({
      tour_template_id: template.id,
      tag,
      version,
      description,
      template: JSON.parse(versionCode),
    });

    if (status === 201) {
      toast.success(`Version v${version} erfolgreich erstellt`);
      return router.push(`/admin/templates/${template.id}`);
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  async function handleSave() {
    if (!version || !tag || !versionCode) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    const { status, error } = await supabase
      .from("tour_template_versions")
      .update({
        tag,
        version,
        description,
        template: JSON.parse(versionCode),
      })
      .eq("id", tourVersion!.id);

    if (status === 204) {
      toast.success(`Version v${version} erfolgreich gespeichert`);
      return router.push(`/admin/templates/${template.id}`);
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  return tourVersion && (!version || !tag || !versionCode) ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex w-full gap-4 items-center">
          {(tourVersion?.tag === "development" || !tourVersion) && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="version">
                Version
                <RequiredStar />
              </Label>
              <Input
                type="number"
                id="version"
                value={version}
                onChange={(e) => setVersion(parseInt(e.target.value))}
                placeholder="2"
              />
            </div>
          )}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">
              Tag
              <RequiredStar />
            </Label>
            <Select
              onValueChange={(tag) => setTag(tag as Enums<"tour_template_tags">)}
              defaultValue={tag}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tag auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(tourTemplateTags)
                    .slice(
                      tourVersion
                        ? Object.keys(tourTemplateTags).findIndex(
                            (t) => t === tourVersion!.tag
                          )
                        : 0,
                      Object.keys(tourTemplateTags).length
                    )
                    .map(([key, value]) => {
                      return (
                        <>
                          <SelectItem value={key}>{value}</SelectItem>
                        </>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          {tourVersion ? (
            <Button onClick={() => handleSave()}>Speichern</Button>
          ) : (
            <Button onClick={() => handleCreate()}>+ Erstellen</Button>
          )}
        </div>
      </div>
      {(tourVersion?.tag === "development" || !tourVersion) && (
        <>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Beschreibung</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Anzahl Personal geändert"
            />
          </div>
          <div className="space-y-1.5">
            <Label>
              Vorlage
              <RequiredStar />
            </Label>
            <Editor
              height="48rem"
              theme="vs-dark"
              width="100%"
              defaultLanguage="json"
              value={versionCode}
              onChange={(code) => setVersionCode(code)}
            />
          </div>
        </>
      )}
    </div>
  );
}

import { Enums, Tables } from "@/types/database.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { tourTemplateTags } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

export default function VersionForm({ tourVersion }: {tourVersion?: Tables<"tour_template_versions">}) {
  const [version, setVersion] = useState<number|undefined>(undefined)
  const [tag, setTag] = useState<Enums<"tour_template_tags">|undefined>(undefined)
  const [description, setDescription] = useState<string|undefined>(undefined)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="version">Version</Label>
          <Input type="number" id="version" value={version} onChange={e => setVersion(parseInt(e.target.value))} placeholder="2"/>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastName">Tag</Label>
          <Select onValueChange={tag => setTag(tag as Enums<"tour_template_tags">)} defaultValue={tag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tag auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(tourTemplateTags).map(([key, value]) => {
                  return (
                    <>
                      <SelectItem value={key}>{value}</SelectItem>
                    </>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 w-full">
        <Label>Beschreibung</Label>
        <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Anzahl Personal geändert" />
      </div>
    </div>
  )
}
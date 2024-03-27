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
import { useParams } from "next/navigation";
import { DateTimePicker } from "@/components/common/datetime-picker";
import { Input } from "@/components/ui/input";
import RequiredStar from "@/components/common/required-star";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/common/multi-select";
import { Separator } from "@/components/ui/separator";

export default function TourFormDialog({
  tour,
  refetch,
  setRefetch,
}: {
  tour?: Tables<"season_tours"> & {
    villages: (Tables<"season_tour_villages"> & {
      village: Tables<"villages"> | null;
    })[];
  };
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tourName, setTourName] = useState(tour?.name);
  const [tourComment, setTourComment] = useState(tour?.comment);
  const [tourFrom, setTourFrom] = useState(tour?.from ? new Date(tour?.from) : null);
  const [tourUntil, setTourUntil] = useState(tour?.until ? new Date(tour?.until) : null);
  const [tourActive, setTourActive] = useState(!!tour?.active);
  const [tourVillages, setTourVillages] = useState<
    { value: string; label: string }[] | undefined
  >(
    tour?.villages.map((village) => ({
      value: village.village_id.toString(),
      label: village.village!.name,
    }))
  );
  const [tourVillageIds, setTourVillageIds] = useState<string[]>(
    tour?.villages.map((village) => village.village_id.toString()) ?? []
  );
  const [tourTemplateVersionId, setTourTemplateVersionId] = useState(
    tour?.tour_template_version_id
  );
  const [seasonTemplates, setSeasonTemplates] = useState<
    | (Tables<"season_templates"> & {
        tour_template_versions:
          | (Tables<"tour_template_versions"> & {
              tour_template: Tables<"tour_templates"> | null;
            })
          | null;
      })[]
    | null
    | undefined
  >(undefined);

  const supabase = createClient();
  const params = useParams();

  useEffect(() => {
    async function getSeasonTemplates() {
      const { data, error } = await supabase
        .from("season_templates")
        .select(
          "*, tour_template_versions!inner(*, tour_template:tour_templates!inner(*))"
        )
        .eq("season_id", parseInt(params.seasonId as string));

      if (error) {
        console.error(error);
        toast.error(`Fehler: ${error}`);
        return;
      }

      const { data: villagesData, error: villagesError } = await supabase
        .from("villages")
        .select("*");

      if (villagesError) {
        console.error(error);
        toast.error(`Fehler: ${villagesError}`);
        return;
      }

      setSeasonTemplates(data);
      setTourVillages(
        villagesData.map((village) => ({
          value: village.id.toString(),
          label: village.name,
        }))
      );
    }
    getSeasonTemplates();
  });

  function resetAndClose(safed?: boolean) {
    setTourName(tour?.name);
    setTourComment(tour?.comment);
    setTourFrom(tour?.from ? new Date(tour?.from) : null);
    setTourUntil(tour?.until ? new Date(tour?.until) : null);
    setTourActive(safed ? tourActive : !!tour?.active);
    setTourVillageIds(
      tour?.villages.map((village) => village.village_id.toString()) ?? []
    );
    setTourTemplateVersionId(tour?.tour_template_version_id);
    setOpen(false);
  }

  async function handleCreate() {
    if (!tourName || !tourFrom || !tourUntil || !tourVillages) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    const {
      data: newTourData,
      status: tourStatus,
      error: tourError,
    } = await supabase
      .from("season_tours")
      .insert({
        name: tourName,
        comment: tourComment,
        from: tourFrom.toISOString(),
        until: tourUntil.toISOString(),
        active: tourActive,
        season_id: parseInt(params.seasonId as string),
        ...(tourTemplateVersionId && { tour_template_version_id: tourTemplateVersionId }),
      })
      .select()
      .single();

    if (tourStatus !== 201) {
      toast.error(`Fehler: ${JSON.stringify(tourError)}`);
      return;
    }

    const { status: tourVillagesStatus, error: tourVillagesError } = await supabase
      .from("season_tour_villages")
      .insert([
        ...tourVillages.map((village) => ({
          season_tour_id: newTourData!.id,
          village_id: parseInt(village.value),
        })),
      ]);

    if (tourVillagesStatus !== 201) {
      toast.error(`Fehler: ${JSON.stringify(tourVillagesError)}`);
      return;
    }

    toast.success(`Saison Tour erfolgreich hinzugegfügt`);
    resetAndClose();
    setRefetch(!refetch);
  }

  async function handleSave(tourId: number) {
    if (!tourName || !tourFrom || !tourUntil || !tourVillages) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    const { status: tourStatus, error: tourError } = await supabase
      .from("season_tours")
      .update({
        name: tourName,
        comment: tourComment,
        from: tourFrom.toISOString(),
        until: tourUntil.toISOString(),
        active: tourActive,
        season_id: parseInt(params.seasonId as string),
        ...(tourTemplateVersionId && { tour_template_version_id: tourTemplateVersionId }),
      })
      .eq("id", tourId);

    if (tourStatus !== 204) {
      toast.error(`Fehler: ${JSON.stringify(tourError)}`);
      return;
    }

    await supabase.from("season_tour_villages").delete().eq("season_tour_id", tourId);

    const { status: tourVillagesStatus, error: tourVillagesError } = await supabase
      .from("season_tour_villages")
      .insert([
        ...tourVillageIds.map((villageId) => ({
          season_tour_id: tourId,
          village_id: parseInt(villageId),
        })),
      ]);

    if (tourVillagesStatus !== 201) {
      toast.error(`Fehler: ${JSON.stringify(tourVillagesError)}`);
      return;
    }

    toast.success(`Saison Tour erfolgreich bearbeitet`);
    resetAndClose(true);
    setRefetch(!refetch);
  }

  return !seasonTemplates ? (
    <div>Loading...</div>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {tour ? (
          <Button variant="secondary" size="sm">
            Bearbeiten
          </Button>
        ) : (
          <Button size="sm">+ Erstellen</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {tour ? (
            <DialogTitle>Bearbeite {tour.name}</DialogTitle>
          ) : (
            <DialogTitle>Erstelle eine neue Tour</DialogTitle>
          )}
        </DialogHeader>
        <div>
          <Label>
            Name
            <RequiredStar />
          </Label>
          <Input
            type="text"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            placeholder="Hausbesuch 1"
          />
        </div>
        <div>
          <Label>Kommentar</Label>
          <Input
            type="text"
            value={tourComment ?? ""}
            onChange={(e) => setTourComment(e.target.value)}
            placeholder="Anstrengender diesmal"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>
              Von
              <RequiredStar />
            </Label>
            <DateTimePicker
              value={{ date: tourFrom, hasTime: true }}
              onChange={(datetime) => setTourFrom(datetime.date)}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>
              Bis
              <RequiredStar />
            </Label>
            <DateTimePicker
              value={{ date: tourUntil, hasTime: true }}
              onChange={(datetime) => setTourUntil(datetime.date)}
            />
          </div>
        </div>
        <div>
          <Label>Dörfer</Label>
          <MultiSelect
            onChange={setTourVillageIds}
            options={tourVillages!}
            selected={tourVillageIds}
          />
        </div>
        <div className="flex space-x-1.5 items-center">
          <Checkbox checked={tourActive} onClick={() => setTourActive(!tourActive)} />
          <Label>Ist Aktiv</Label>
        </div>
        <div className="flex gap-2 items-center">
          <Separator className="shrink" />
          <p className="text-sm text-nowrap text-gray-500">Für buchbare Touren</p>
          <Separator className="shrink" />
        </div>
        <div>
          <Label>Vorlage</Label>
          <Select
            onValueChange={(template) => setTourTemplateVersionId(parseInt(template))}
            defaultValue={tourTemplateVersionId?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Vorlage auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {seasonTemplates.map((template) => {
                  return (
                    <>
                      <SelectItem value={template.id.toString()}>
                        {template.tour_template_versions?.tour_template?.title} - v
                        {template.tour_template_versions?.version} -{" "}
                        <span className="max-w-[28ch] text-nowrap overflow-hidden overflow-ellipsis">
                          {template.tour_template_versions?.description ?? "-"}
                        </span>
                      </SelectItem>
                    </>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>
            Abbrechen
          </Button>
          {tour ? (
            <Button onClick={() => handleSave(tour.id)}>Speichern</Button>
          ) : (
            <Button onClick={() => handleCreate()}>Erstellen</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

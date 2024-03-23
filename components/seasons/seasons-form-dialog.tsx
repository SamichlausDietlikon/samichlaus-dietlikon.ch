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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { DateTimePicker } from "../common/datetime-picker";

export default function SeasonsFromDialog({
  season,
  refetch,
  setRefetch,
}: {
  season?: Tables<"seasons">;
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [seasonName, setSeasonName] = useState(season?.name || "");
  const [seasonFrom, setSeasonFrom] = useState<Date | null>(
    season?.from ? new Date(season?.from) : null
  );
  const [seasonUntil, setSeasonUntil] = useState<Date | null>(
    season?.until ? new Date(season?.until) : null
  );

  const supabase = createClient();

  function resetAndClose() {
    setSeasonName(season?.name || "");
    setSeasonFrom(season?.from ? new Date(season?.from) : null);
    setSeasonUntil(season?.from ? new Date(season?.from) : null);
    setOpen(false);
  }

  async function handleCreate() {
    if (!seasonName || !seasonFrom || !seasonUntil) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    const { status, error } = await supabase.from("seasons").insert({
      // @ts-ignore
      name: seasonName,
      from: seasonFrom.toISOString(),
      until: seasonUntil.toISOString(),
    });

    if (status === 201) {
      toast.success(`Saison ${seasonName} erfolgreich erstellt`);
      resetAndClose();
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  async function handleSave() {
    if (!seasonName || !seasonFrom || !seasonUntil) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    const { status, error } = await supabase
      .from("seasons")
      .update({
        name: seasonName,
        from: seasonFrom.toISOString(),
        until: seasonUntil.toISOString(),
      })
      .eq("id", season!.id);

    if (status === 204) {
      toast.success(`Saison ${seasonName} erfolgreich gespeichert`);
      setOpen(false);
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        {season ? (
          <Button variant="secondary" size="sm">
            Bearbeiten
          </Button>
        ) : (
          <Button size="sm" className="my-1 w-full">
            + Erstellen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {season ? (
            <DialogTitle>
              Bearbeite <em>{season.name}</em>
            </DialogTitle>
          ) : (
            <DialogTitle>Erstelle eine Saison</DialogTitle>
          )}
        </DialogHeader>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            value={seasonName}
            onChange={(e) => setSeasonName(e.target.value)}
            placeholder="2024"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Start</Label>
            <DateTimePicker
              value={{ date: seasonFrom, hasTime: true }}
              onChange={(datetime) => setSeasonFrom(datetime.date)}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Ende</Label>
            <DateTimePicker
              value={{ date: seasonUntil, hasTime: true }}
              onChange={(datetime) => setSeasonUntil(datetime.date)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>
            Abbrechen
          </Button>
          {season ? (
            <Button onClick={() => handleSave()}>Speichern</Button>
          ) : (
            <Button onClick={() => handleCreate()}>Erstellen</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

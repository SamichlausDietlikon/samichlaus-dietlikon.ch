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
import { DateTimePicker } from "@/components/common/datetime-picker";
import { Input } from "@/components/ui/input";

export default function CalendarFormDialog({
  calendarEntry,
  refetch,
  setRefetch,
}: {
  calendarEntry?: Tables<"season_calendar_entries">;
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [calendarTitle, setCalendarTitle] = useState(calendarEntry?.title);
  const [calendarDescription, setCalendarDescription] = useState(
    calendarEntry?.description
  );
  const [calendarFrom, setCalendarFrom] = useState(
    calendarEntry?.from ? new Date(calendarEntry?.from) : null
  );
  const [calendarUntil, setCalendarUntil] = useState(
    calendarEntry?.until ? new Date(calendarEntry?.until) : null
  );

  const supabase = createClient();
  const params = useParams();

  function resetAndClose() {
    setCalendarTitle(calendarEntry?.title);
    setCalendarDescription(calendarEntry?.description);
    setCalendarFrom(calendarEntry?.from ? new Date(calendarEntry?.from) : null);
    setCalendarUntil(calendarEntry?.until ? new Date(calendarEntry?.until) : null);
    setOpen(false);
  }

  async function handleCreate() {
    if (!calendarTitle) {
      toast.error("Bitte fülle alle benötigten Felder aus");
      return;
    }

    const { status, error } = await supabase.from("season_calendar_entries").insert({
      season_id: parseInt(params.seasonId as string),
      title: calendarTitle,
      description: calendarDescription,
      from: calendarFrom ? calendarFrom.toISOString() : null,
      until: calendarUntil ? calendarUntil.toISOString() : null,
    });

    if (status === 201) {
      toast.success(`Saison Kalendereintrag erfolgreich hinzugegfügt`);
      resetAndClose();
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  async function handleSave() {
    const { status, error } = await supabase
      .from("season_calendar_entries")
      .update({
        title: calendarTitle,
        description: calendarDescription,
        from: calendarFrom ? calendarFrom.toISOString() : null,
        until: calendarUntil ? calendarUntil.toISOString() : null,
      })
      .eq("season_id", parseInt(params.seasonId as string));

    if (status === 204) {
      toast.success(`Saison Kalendereintrag erfolgreich gespeichert`);
      setOpen(false);
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {calendarEntry ? (
          <Button variant="secondary" size="sm">
            Bearbeiten
          </Button>
        ) : (
          <Button size="sm">+ Hinzufügen</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {calendarEntry ? (
            <DialogTitle>Bearbeite {calendarEntry.title}</DialogTitle>
          ) : (
            <DialogTitle>Füge einen Kalendereintrag zur Saison hinzu</DialogTitle>
          )}
        </DialogHeader>
        <div>
          <Label>Titel</Label>
          <Input
            type="text"
            value={calendarTitle}
            onChange={(e) => setCalendarTitle(e.target.value)}
            placeholder="Familienbesuche"
          />
        </div>
        <div>
          <Label>Beschreibung</Label>
          <Input
            type="text"
            value={calendarDescription ?? undefined}
            onChange={(e) => setCalendarDescription(e.target.value)}
            placeholder="Gebiet Dietlikon, Wangen-Brüttisellen, Bassersdorf"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Von</Label>
            <DateTimePicker
              value={{ date: calendarFrom, hasTime: true }}
              onChange={(datetime) => setCalendarFrom(datetime.date)}
            />
          </div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Label>Bis</Label>
            <DateTimePicker
              value={{ date: calendarUntil, hasTime: true }}
              onChange={(datetime) => setCalendarUntil(datetime.date)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>
            Abbrechen
          </Button>
          {calendarEntry ? (
            <Button onClick={() => handleSave()}>Speichern</Button>
          ) : (
            <Button onClick={() => handleCreate()}>Hinzufügen</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

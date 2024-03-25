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
import RequiredStar from "../common/required-star";

export default function VillageFormDialog({
  village,
  refetch,
  setRefetch,
}: {
  village?: Tables<"villages">;
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [villageName, setVillageName] = useState(village?.name || "");

  const supabase = createClient();

  function resetAndClose() {
    setVillageName(village?.name || "");
    setOpen(false);
  }

  async function handleCreate() {
    const { status, error } = await supabase
      .from("villages")
      .insert({ name: villageName });

    if (status === 201) {
      toast.success(`Dorf ${villageName} erfolgreich erstellt`);
      resetAndClose();
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  async function handleSave() {
    const { status, error } = await supabase
      .from("villages")
      .update({ name: villageName })
      .eq("id", village!.id);

    if (status === 204) {
      toast.success(`Dorf ${villageName} erfolgreich gespeichert`);
      setOpen(false);
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {village ? (
          <Button variant="secondary" size="sm">
            Bearbeiten
          </Button>
        ) : (
          <Button size="sm" className="my-1">
            + Erstellen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {village ? (
            <DialogTitle>
              Bearbeite <em>{village.name}</em>
            </DialogTitle>
          ) : (
            <DialogTitle>Erstelle ein Dorf</DialogTitle>
          )}
        </DialogHeader>
        <div>
          <Label>
            Name
            <RequiredStar />
          </Label>
          <Input
            type="text"
            value={villageName}
            onChange={(e) => setVillageName(e.target.value)}
            placeholder="Dietlikon"
          />
        </div>
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>
            Abbrechen
          </Button>
          {village ? (
            <Button onClick={() => handleSave()}>Speichern</Button>
          ) : (
            <Button onClick={() => handleCreate()}>Erstellen</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

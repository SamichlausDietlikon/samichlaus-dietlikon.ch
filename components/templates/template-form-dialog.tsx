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
import { Textarea } from "../ui/textarea";
import RequiredStar from "../common/required-star";

export default function TemplateFormDialog({
  refetch,
  setRefetch,
}: {
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState<null | string>(null);
  const [templateDescription, setTemplateDescription] = useState<null | string>(null);

  const supabase = createClient();

  function resetAndClose() {
    setTemplateTitle(null);
    setTemplateDescription(null);
    setOpen(false);
  }

  async function handleCreate() {
    if (!templateTitle) {
      toast.error("Alle benötigte Felder muss ausgefüllt werden");
      return;
    }

    const { status, error } = await supabase
      .from("tour_templates")
      .insert({ title: templateTitle, description: templateDescription });

    if (status === 201) {
      toast.success(`Vorlage ${templateTitle} erfolgreich erstellt`);
      resetAndClose();
      setRefetch(!refetch);
      return;
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" className="my-1">
          + Erstellen
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Erstelle eine Vorlage</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Titel<RequiredStar /></Label>
          <Input
            type="text"
            value={templateTitle ?? ""}
            onChange={(e) => setTemplateTitle(e.target.value)}
            placeholder="Hausbesuche"
          />
        </div>
        <div>
          <Label>Beschreibung</Label>
          <Textarea
            value={templateDescription ?? ""}
            onChange={(e) => setTemplateDescription(e.target.value)}
            placeholder="Für Hausbesuche bei den Kindern"
          />
        </div>
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>
            Abbrechen
          </Button>
          <Button onClick={() => handleCreate()}>Erstellen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

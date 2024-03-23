"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Enums, Tables } from "@/types/database.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { FullUser } from "@/types/common.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { staffRoles } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

export default function UsersFormDialog({
  user,
  refetch,
  setRefetch,
}: {
  user: FullUser;
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.staff_role === "admin");

  const supabase = createClient();

  function resetAndClose() {
    setIsAdmin(user.staff_role === "admin");
    setOpen(false);
  }

  async function handleSave() {
    const { error: roleError } = await supabase.from("user_admins").upsert({
      id: user.id,
      is_admin: isAdmin,
    });

    if (!roleError) {
      toast.success(
        <span>
          <strong>
            ${user.first_name} ${user.last_name}
          </strong>{" "}
          wurde erfolgreich aktualisiert
        </span>
      );
      setOpen(false);
      setRefetch(!refetch);
    } else {
      toast.error(`Fehler: ${JSON.stringify(roleError)}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="secondary" size="sm">
          Bearbeiten
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Bearbeite{" "}
            <em>
              {user.first_name} {user.last_name}
            </em>
          </DialogTitle>
        </DialogHeader>
        <div className="flex space-x-1.5 items-center">
          <Checkbox id="isAdmin" checked={isAdmin} onClick={() => setIsAdmin(!isAdmin)} />
          <Label>Ist Admin</Label>
        </div>
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>
            Abbrechen
          </Button>
          <Button onClick={() => handleSave()}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

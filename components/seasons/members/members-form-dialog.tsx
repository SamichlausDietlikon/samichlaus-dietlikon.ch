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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { seasonStaffRoles } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Combobox } from "../../common/combobox";
import RequiredStar from "@/components/common/required-star";

export default function MembersFormDialog({
  member,
  refetch,
  setRefetch,
}: {
  member?: Tables<"season_members"> & { users: Tables<"users"> | null };
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState(member?.user_id);
  const [staffRole, setStaffRole] = useState(member?.staff_role);
  const [users, setUsers] = useState<{ value: string; label: string }[] | [] | null>(
    null
  );

  const supabase = createClient();
  const params = useParams();

  useEffect(() => {
    async function getUsers() {
      const { data, error } = await supabase
        .from("users")
        .select("id, first_name, last_name, user_admins!left(*)");

      if (error) {
        console.error(error);
        toast.error(`Fehler: ${JSON.stringify(error)}`);
        return;
      }

      setUsers(
        data
          .filter((user) => !user.user_admins)
          .map((user) => {
            return { value: user.id, label: `${user.first_name} ${user.last_name}` };
          })
      );
    }
    getUsers();
  }, [supabase]);

  function resetAndClose() {
    setMemberId(member?.user_id);
    setStaffRole(member?.staff_role);
    setOpen(false);
  }

  async function handleAdd() {
    if (!memberId || !staffRole) {
      toast.error("Mitglied und Rolle muss ausgewählt werden");
      return;
    }

    const { error } = await supabase.from("season_members").insert({
      season_id: parseInt(params.seasonId as string) as number,
      user_id: memberId,
      staff_role: staffRole,
    });

    if (!error) {
      toast.success(<span>Mitglied wurde erfolgreich hinzugefügt</span>);
      setOpen(false);
      setRefetch(!refetch);
      return;
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  async function handleSave() {
    if (!staffRole) {
      toast.error("Rolle muss ausgewählt werden");
      return;
    }

    const { error } = await supabase
      .from("season_members")
      .update({
        staff_role: staffRole,
      })
      .eq("user_id", memberId!);

    if (!error) {
      toast.success(
        <span>
          {member?.users?.first_name || "Unknown"} {member?.users?.last_name || "Unknown"}{" "}
          wurde erfolgreich aktualisiert
        </span>
      );
      setOpen(false);
      setRefetch(!refetch);
      return;
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  return (
    users && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          {member ? (
            <Button variant="secondary" size="sm">
              Bearbeiten
            </Button>
          ) : (
            <Button size="sm">+ Hinzufügen</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {member ? (
              <DialogTitle>Mitglied bearbeiten</DialogTitle>
            ) : (
              <DialogTitle>Mitglied zur Saison hinzufügen</DialogTitle>
            )}
          </DialogHeader>
          {!member && (
            <div className="flex flex-col space-y-1.5">
              <Label>Mitglied<RequiredStar /></Label>
              <Combobox data={users} value={memberId || ""} setValue={setMemberId} />
            </div>
          )}
          <div>
            <Label>Rolle<RequiredStar /></Label>
            <Select
              onValueChange={(role) => setStaffRole(role as Enums<"staff_roles">)}
              defaultValue={staffRole || undefined}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rolle auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(seasonStaffRoles).map(([key, value]) => {
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
          <DialogFooter>
            <Button variant="link" onClick={() => resetAndClose()}>
              Abbrechen
            </Button>
            {member ? (
              <Button onClick={() => handleSave()}>Speichern</Button>
            ) : (
              <Button onClick={() => handleAdd()}>Hinzufügen</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}

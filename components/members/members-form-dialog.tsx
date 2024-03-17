"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Enums, Tables } from "@/types/database.types"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import { createClient } from "@/lib/supabase/client"
import {toast} from "sonner"
import { FullUser } from "@/types/common.types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { staffRoles } from "@/lib/utils"

export default function MembersFormDialog({ member, refetch, setRefetch }: { member: FullUser, refetch: boolean, setRefetch: (value: boolean) => void}) {
  const [open, setOpen] = useState(false)
  const [staffRole, setStaffRole] = useState(member.staff_role)
  
  const supabase = createClient()

  function resetAndClose() {
    setStaffRole(member.staff_role)
    setOpen(false)
  }

  async function handleSave() {
    const {error: roleError} = await supabase.from("user_staff_roles").upsert({
      id: member.id,
      staff_role: staffRole
    })

    if(!roleError) {
      toast.success(<span><strong>${member.first_name} ${member.last_name}</strong> wurde erfolgreich aktualisiert</span>)
      setOpen(false)
      setRefetch(!refetch)
    } else {
      toast.error(`Fehler: ${JSON.stringify(roleError)}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="secondary" size="sm">Bearbeiten</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bearbeite <em>{member.first_name} {member.last_name}</em></DialogTitle>
        </DialogHeader>
        <div>
          <Label>Rolle</Label>
          <Select onValueChange={role => setStaffRole(role as Enums<"staff_roles">)} defaultValue={staffRole || undefined}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rolle auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(staffRoles).map(([key, value]) => {
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
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>Abbrechen</Button>
          <Button onClick={() => handleSave()}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
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
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { createClient } from "@/lib/supabase/client"
import {toast} from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { seasonStaffRoles, staffRoles } from "@/lib/utils"
import { useParams } from "next/navigation"

export default function MembersFormDialog({ member, refetch, setRefetch }: { member?: Tables<"season_members"> & { users: Tables<"users">[]}, refetch: boolean, setRefetch: (value: boolean) => void}) {
  const [open, setOpen] = useState(false)
  const [memberId, setMemberId] = useState(member?.user_id)
  const [staffRole, setStaffRole] = useState(member?.staff_role)
  const [users, setUsers] = useState<Tables<"users">[]|null>(null)
  
  const supabase = createClient()
  const params = useParams()

  useEffect(() => {
    async function getUsers() {
      const {data, error} = await supabase.from("users").select()

      if(error) {
        console.error(error)
        toast.error(`Fehler: ${JSON.stringify(error)}`)
        return
      }

      setUsers(data)
    }
    getUsers()
  })

  function resetAndClose() {
    setMemberId(member?.user_id)
    setStaffRole(member?.staff_role)
    setOpen(false)
  }

  async function handleAdd() {
    if(!memberId || !staffRole) {
      toast.error("Mitglied und Rolle muss ausgewählt werden")
      return
    }

    const {error} = await supabase.from("season_members").insert({
      season_id: parseInt(params.seasonId as string) as number,
      user_id: memberId,
      staff_role: staffRole 
    })

    if(!error) {
      toast.success(<span>Mitglied wurde erfolgreich hinzugefügt</span>)
      setOpen(false)
      setRefetch(!refetch)
      return
    } 

    toast.error(`Fehler: ${JSON.stringify(error)}`)
  }

  async function handleSave() {
    const {error} = await supabase.from("season_members").update({
      staff_role: staffRole
    }).eq("user_id", memberId!)

    if(!error) {
      toast.success(<span>${member?.users[0].first_name} ${member?.users[0].first_name} wurde erfolgreich aktualisiert</span>)
      setOpen(false)
      setRefetch(!refetch)
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`)
    }
  }

  return users && (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="secondary" size="sm">+ Hinzufügen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mitglied zur Saison hinzufügen</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Mitglied</Label>
        </div>
        <div>
          <Label>Rolle</Label>
          <Select onValueChange={role => setStaffRole(role as Enums<"staff_roles">)} defaultValue={staffRole || undefined}>
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
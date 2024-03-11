"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tables } from "@/types/database.types"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import { createClient } from "@/lib/supabase/client"
import {toast} from "sonner"

export default function ResponsibilityFormDialog({ responsibility }: { responsibility?: Tables<"responsibilities"> }) {
  const [open, setOpen] = useState(false)
  const [responsibilityName, setResponsibilityName] = useState(responsibility?.name || "")
  const [responsibilityTimeOverlapping, setResponsibilityTimeOverlapping] = useState(responsibility?.time_overlapping || false)
  
  const supabase = createClient()

  function resetAndClose() {
    setResponsibilityName(responsibility?.name || "")
    setResponsibilityTimeOverlapping(responsibility?.time_overlapping || false)
    setOpen(false)
  }

  async function handleCreate() {
   const {status, error} = await supabase.from("responsibilities").insert({ name: responsibilityName, time_overlapping: responsibilityTimeOverlapping })
   
    if(status === 201) {
      toast.success(`Funktion ${responsibilityName} erfolgreich erstellt`)
      resetAndClose()
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`)
    }
  }

  async function handleSave() {
    const {status, error} = await supabase.from("responsibilities").update({ name: responsibilityName, time_overlapping: responsibilityTimeOverlapping }).eq("id", responsibility!.id)
   
    if(status === 204) {
      toast.success(`Funktion ${responsibilityName} erfolgreich gespeichert`)
      resetAndClose()
    } else {
      toast.error(`Fehler: ${JSON.stringify(error)}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
          {responsibility
            ? <Button variant="secondary" size="sm">Bearbeiten</Button>
            : <Button size="sm" className="my-1">+ Erstellen</Button>
          }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {responsibility
            ? <DialogTitle>Bearbeite <em>{responsibility.name}</em></DialogTitle>
            : <DialogTitle>Erstelle ein Funktion</DialogTitle>
          }
        </DialogHeader>
        <div>
          <Label>Name</Label>
          <Input type="text" value={responsibilityName} onChange={e => setResponsibilityName(e.target.value)} placeholder="Chlaus" />
        </div>
        <div className="flex items-center gap-2">
          <Input type="checkbox" checked={responsibilityTimeOverlapping} onChange={e => setResponsibilityTimeOverlapping(!responsibilityTimeOverlapping)} placeholder="Chlaus" className="w-min shadow-none" />
          <Label>Zeit überlappend</Label>
        </div>
        <DialogFooter>
          <Button variant="link" onClick={() => resetAndClose()}>Abbrechen</Button>
          {responsibility
            ? <Button onClick={() => handleSave()}>Speichern</Button>
            : <Button onClick={() => handleCreate()}>Erstellen</Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import useUser from "@/hooks/useUser"

export default function Setup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const {refetch, setRefetch} = useUser()

  const router = useRouter()

  async function handleSubmit() {
    const supabase = createClient()

    const {status, error} = await supabase.from("users").insert({id: (await supabase.auth.getUser()).data.user!.id, first_name: firstName, last_name: lastName, store_email: true})

    if(status === 201) {
      toast.success("Einrichtung erfolgreich abgeschlossen")
      setRefetch(!refetch)
      return router.push("/admin")
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`)    
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Einrichtung abschliessen</CardTitle>
          <CardDescription>Folgende Daten müssen ergänzt werden um dein Mitglieder Konto zu aktivieren.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="first_name">Vorname</Label>
              <Input type="first_name" id="first_name" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Dein Vorname" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="last_name">Nachname</Label>
              <Input type="last_name" id="last_name" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Dein Nachname" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="float-right">
          <Button onClick={() => handleSubmit()}>Abschliessen</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
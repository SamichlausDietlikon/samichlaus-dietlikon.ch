"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useUser from "@/hooks/useUser"
import { createClient } from "@/lib/supabase/client"
import { FullUser } from "@/types/common.types"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Profile() {
  const supabase = createClient()
  const { loading, user, refetch, setRefetch} = useUser();

  const [firstName, setFirstName] = useState("") 
  const [lastName, setLastName] = useState("") 

  useEffect(() => {
    if(!loading) {
      setFirstName((user as FullUser).first_name)
      setLastName((user as FullUser).last_name)
    }
  }, [loading])

  async function handleSave() {
    if(!firstName || !lastName) {
      toast.error("Alle erforderlichen Felder müssen ausgefüllt werden")
      return
    }

    const {status, error} = await supabase.from("users").update({
      first_name: firstName,
      last_name: lastName
    }).eq("id", user!.id) 

    if(status === 204) {
      toast.success("Deine persönlichen Informationen wurden erfolgreich gespeichert")
      setRefetch(!refetch)
      return
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`)
  }

  return loading ? (
    <div>
      Loading...
    </div>
  ) : (
    <div className="mx-auto my-12 max-w-3xl">
     <Card>
        <CardHeader>
          <CardTitle>Persönliche Informationen</CardTitle>
          <CardDescription>Bearbeite deine persönlichen Informationen.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="firstName">Vorname</Label>
              <Input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Max" />
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="lastName">Vorname</Label>
              <Input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Mustermann" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" onClick={() => handleSave()}>Speichern</Button>
        </CardFooter>
      </Card> 
    </div>
  )
}
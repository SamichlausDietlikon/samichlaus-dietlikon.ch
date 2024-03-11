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

export default function Setup() {
  const [email, setEmail] = useState("")

  async function handleSubmit() {
    const supabase = createClient()

    await supabase.auth.signInWithOtp({
      email
    })
  }  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Einrichtung abschliessen</CardTitle>
          <CardDescription>Folgende Daten müssen ergänzt werden um dein Mitglieder Konto zu aktivieren.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Deine Email Adresse" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Abbrechen</Button>
          <Button onClick={() => handleSubmit()}>Anmelden</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
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

export function LoginForm() {
  const [email, setEmail] = useState("")

  async function handleSubmit() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://127.0.0.1:3000/visits'
      }
    })
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Als Nutzer anmelden</CardTitle>
        <CardDescription>Erhalte einen Anmeldelink per Email umd dich anzumelden.</CardDescription>
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
  )
}

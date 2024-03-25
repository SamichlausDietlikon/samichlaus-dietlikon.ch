"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InfoTooltip from "@/components/common/info-tooltip";
import RequiredStar from "@/components/common/required-star";

export default function Profile() {
  const supabase = createClient();
  const { loading, user, refetch, setRefetch } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [storeEmail, setStoreEmail] = useState(false);

  useEffect(() => {
    if (!loading) {
      setFirstName((user as FullUser).first_name);
      setLastName((user as FullUser).last_name);
      setStoreEmail((user as FullUser).store_email);
    }
  }, [loading]);

  async function handleSave() {
    if (!firstName || !lastName) {
      toast.error("Alle erforderlichen Felder müssen ausgefüllt werden");
      return;
    }

    const { status, error } = await supabase
      .from("users")
      .update({
        first_name: firstName,
        last_name: lastName,
        store_email: storeEmail,
      })
      .eq("id", user!.id);

    if (status === 204) {
      toast.success("Deine persönlichen Informationen wurden erfolgreich gespeichert");
      setRefetch(!refetch);
      return;
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="max-w-7xl m-auto px-8 my-8">
      <Card>
        <CardHeader>
          <CardTitle>Persönliche Informationen</CardTitle>
          <CardDescription>Bearbeite deine persönlichen Informationen.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="firstName">Vorname<RequiredStar /></Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Max"
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="lastName">Nachname<RequiredStar /></Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Mustermann"
              />
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox
              id="store_email"
              checked={storeEmail}
              onClick={() => setStoreEmail(!storeEmail)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="store_email" className="flex items-center gap-1">
                Email darf gespeichert werden
                <InfoTooltip text="Deine Email Adresse darf auch nach der aktuellen Saison gespeichert werden zu Benachrichtigungszwecken." />
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" onClick={() => handleSave()}>
            Speichern
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import VillageFormDialog from "@/components/villages/village-form-dialog";
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { Tables } from "@/types/database.types";
import { useEffect, useState } from "react";
import { toast } from "sonner"

export default function Villages() {
  const [villages, setVillages] = useState<[]|Tables<"villages">[]>([])

  const { loading, user } = useUser();

  useEffect(() => {
    supabase.from("villages").select().then(({ data, error }) => {
      if (error) {
        console.error(error)
        return
      }

      setVillages(data)
    })
  }, [])

  const supabase = createClient()

  async function handleDelete(id: number) {
    const {status} = await supabase.from("villages").delete().eq("id", id)

    if(status === 204) {
      toast.success("Dorf erfolgreich gelöscht")
      setVillages(villages.filter(village => village.id !== id))
    }
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl m-auto px-8">
      <h1 className="text-2xl my-8">Villages</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dorf</TableHead>
            <TableHead className="text-right">
              <VillageFormDialog />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {villages?.map((village) => (
            <TableRow>
              <TableCell>{village.name}</TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" && (
                  <>
                    <VillageFormDialog village={village} />
                    <Button variant="link" className="text-red-400 hover:text-red-500" onClick={() => handleDelete(village.id)}>
                      Löschen 
                    </Button>  
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
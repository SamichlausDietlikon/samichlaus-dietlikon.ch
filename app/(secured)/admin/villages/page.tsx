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
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/database.types";
import { useEffect, useState } from "react";

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
    const {count, data, error, status, statusText} = await supabase.from("villages").delete().eq("id", id)

    if(status === 204) {
      setVillages(villages.filter(village => village.id !== id))
    }
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl m-auto">
      <h1 className="text-2xl my-8">Villages</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dorf</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {villages?.map((village) => (
            <TableRow>
              <TableCell>{village.name}</TableCell>
              {/* TODO */}
              <TableCell className="text-right">
                <Button variant="link" className="text-red-400 hover:text-red-500" onClick={() => handleDelete(village.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
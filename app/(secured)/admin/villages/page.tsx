"use client"

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
              <TableCell className="text-right">Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
"use client"

import UsersFormDialog from "@/components/users/users-form-dialog";
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
import { FullUser } from "@/types/common.types";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<[]|FullUser[]>([])
  const [refetch, setRefetch] = useState<boolean>(false)

  const { loading, user } = useUser();

  const supabase = createClient()
  
  useEffect(() => {
    supabase.from("all_users_full").select().then(({ data, error }) => {
      if (error) {
        console.error(error)
        return
      }

      setUsers(data as FullUser[])
    })
  }, [refetch, supabase])


  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl m-auto px-8">
      <h1 className="text-2xl my-8">Nutzer</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vorname</TableHead>
            <TableHead>Nachname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Admin?</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((appUser) => (
            <TableRow key={appUser.id}>
              <TableCell>{appUser.first_name ?? "-"}</TableCell>
              <TableCell>{appUser.last_name ?? "-"}</TableCell>
              <TableCell>{appUser.email}</TableCell>
              <TableCell>{appUser.staff_role === "admin" ? "Ja" : "Nein"}</TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" && appUser.id !== user?.id && (
                  <UsersFormDialog user={appUser} refetch={refetch} setRefetch={setRefetch} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
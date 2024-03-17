"use client"

import MembersFormDialog from "@/components/members/members-form-dialog";
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
import { staffRoles } from "@/lib/utils";
import { FullUser } from "@/types/common.types";
import { useEffect, useState } from "react";
import { toast } from "sonner"

export default function Members() {
  const [members, setMembers] = useState<[]|FullUser[]>([])
  const [refetch, setRefetch] = useState<boolean>(false)

  const { loading, user } = useUser();

  const supabase = createClient()
  
  useEffect(() => {
    supabase.from("all_users_full").select().then(({ data, error }) => {
      if (error) {
        console.error(error)
        return
      }

      setMembers(data as FullUser[])
    })
  }, [refetch, supabase])


  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl m-auto px-8">
      <h1 className="text-2xl my-8">Mitglieder</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vorname</TableHead>
            <TableHead>Nachname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rolle</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.first_name ?? "-"}</TableCell>
              <TableCell>{member.last_name ?? "-"}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.staff_role ? staffRoles[member.staff_role] : "-"}</TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" && member.id !== user?.id && (
                  <MembersFormDialog member={member} refetch={refetch} setRefetch={setRefetch} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
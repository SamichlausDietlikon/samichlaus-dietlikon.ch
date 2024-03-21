"use client";

import UsersFormDialog from "@/components/users/users-form-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { useEffect, useState } from "react";
import { Tables } from "@/types/database.types";
import { seasonStaffRoles } from "@/lib/utils";
import MembersFormDialog from "@/components/members/members-form-dialog";

export default function Members({ params }: { params: { seasonId: string } }) {
  const [members, setMembers] = useState<
    [] | (Tables<"season_members"> & { users: Tables<"users"> | null })[]
  >([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { loading, user } = useUser();

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("season_members")
      .select("*, users!inner(*)")
      .eq("season_id", params.seasonId)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setMembers(data);
      });
  }, [refetch, supabase]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl w-full px-8">
      <h1 className="text-2xl my-8">Saison Mitglieder</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Vorname</TableHead>
            <TableHead>Nachname</TableHead>
            <TableHead>Rolle</TableHead>
            <TableHead className="text-right">
              {(user as FullUser).staff_role === "admin" && (
                <MembersFormDialog refetch={refetch} setRefetch={setRefetch} />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.users?.first_name ?? "-"}</TableCell>
              <TableCell>{member.users?.last_name ?? "-"}</TableCell>
              <TableCell>{seasonStaffRoles[member.staff_role]}</TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" &&
                  member.users?.id !== user?.id && (
                    <MembersFormDialog
                      member={member}
                      refetch={refetch}
                      setRefetch={setRefetch}
                    />
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

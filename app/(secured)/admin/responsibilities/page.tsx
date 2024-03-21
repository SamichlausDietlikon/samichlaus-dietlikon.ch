"use client";

import ResponsibilityFormDialog from "@/components/responsibilities/responsibility-form-dialog";
import { Button } from "@/components/ui/button";
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
import { Tables } from "@/types/database.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Responsibilities() {
  const [responsibilities, setResponsibilities] = useState<
    [] | Tables<"responsibilities">[]
  >([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { loading, user } = useUser();

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("responsibilities")
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setResponsibilities(data);
      });
  }, [refetch, supabase]);

  async function handleDelete(id: number) {
    const { status } = await supabase.from("responsibilities").delete().eq("id", id);

    if (status === 204) {
      toast.success("Funktion erfolgreich gelöscht");
      setResponsibilities(
        responsibilities.filter((responsibility) => responsibility.id !== id)
      );
    }
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl m-auto px-8">
      <h1 className="text-2xl my-8">Funktionen</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Funktion</TableHead>
            <TableHead>Zeit überlappend</TableHead>
            <TableHead className="text-right">
              {(user as FullUser).staff_role === "admin" && (
                <ResponsibilityFormDialog refetch={refetch} setRefetch={setRefetch} />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responsibilities?.map((responsibility) => (
            <TableRow key={responsibility.id}>
              <TableCell>{responsibility.name}</TableCell>
              <TableCell>{responsibility.time_overlapping ? "Ja" : "Nein"}</TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" && (
                  <>
                    <ResponsibilityFormDialog
                      refetch={refetch}
                      setRefetch={setRefetch}
                      responsibility={responsibility}
                    />
                    <Button
                      variant="link"
                      className="text-red-400 hover:text-red-500"
                      onClick={() => handleDelete(responsibility.id)}
                    >
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
  );
}

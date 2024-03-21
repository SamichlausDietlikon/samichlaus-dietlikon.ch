"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VillageFormDialog from "@/components/villages/village-form-dialog";
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { Tables } from "@/types/database.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Villages() {
  const [villages, setVillages] = useState<[] | Tables<"villages">[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { loading, user } = useUser();

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("villages")
      .select()
      .order("name")
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          toast.error(`Fehler: ${JSON.stringify(error)}`);
          return;
        }

        setVillages(data);
      });
  }, [refetch, supabase]);

  async function handleDelete(id: number) {
    const { status, error } = await supabase.from("villages").delete().eq("id", id);

    if (status === 204) {
      toast.success("Dorf erfolgreich gelöscht");
      setVillages(villages.filter((village) => village.id !== id));
      return;
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl m-auto px-8">
      <h1 className="text-2xl my-8">Dörfer</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dorf</TableHead>
            <TableHead className="text-right">
              {(user as FullUser).staff_role === "admin" && (
                <VillageFormDialog refetch={refetch} setRefetch={setRefetch} />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {villages?.map((village) => (
            <TableRow key={village.id}>
              <TableCell>{village.name}</TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" && (
                  <>
                    <VillageFormDialog
                      refetch={refetch}
                      setRefetch={setRefetch}
                      village={village}
                    />
                    <Button
                      variant="link"
                      className="text-red-400 hover:text-red-500"
                      onClick={() => handleDelete(village.id)}
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

"use client";

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
import MembersFormDialog from "@/components/seasons/members/members-form-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TourFormDialog from "@/components/seasons/tours/tour-form-dialog";

export default function Tours({ params }: { params: { seasonId: string } }) {
  const [tours, setTours] = useState<
    | []
    | (Tables<"season_tours"> & {
        villages: (Tables<"season_tour_villages"> & {
          village: Tables<"villages"> | null;
        })[];
      })[]
  >([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { loading, user } = useUser();

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("season_tours")
      .select("*, villages:season_tour_villages!inner(*, village:villages!inner(*))")
      .eq("season_id", params.seasonId)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(data);

        setTours(data);
      });
  }, [refetch, supabase]);

  // async function handleRemove(memberId: number) {
  //   const { error } = await supabase
  //     .from("season_members")
  //     .delete()
  //     .eq("user_id", memberId!);

  //   if (!error) {
  //     toast.success(<span>Mitglied wurde wurde erfolgreich entfernt</span>);
  //     setRefetch(!refetch);
  //     return;
  //   }

  //   toast.error(`Fehler: ${JSON.stringify(error)}`);
  // }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl w-full px-8">
      <h1 className="text-2xl my-8">Saison Touren</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Von</TableHead>
            <TableHead>Bis</TableHead>
            <TableHead>Dörfer</TableHead>
            <TableHead>Aktiv</TableHead>
            <TableHead className="text-right">
              {(user as FullUser).staff_role === "admin" && (
                <TourFormDialog refetch={refetch} setRefetch={setRefetch} />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours?.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell>{tour.name}</TableCell>
              <TableCell>{new Date(tour.from).toLocaleDateString("de-CH")}</TableCell>
              <TableCell>
                {new Date(tour.from).toLocaleTimeString("de-CH", { timeStyle: "short" })}
              </TableCell>
              <TableCell>
                {new Date(tour.until).toLocaleTimeString("de-CH", {
                  timeStyle: "short",
                })}
              </TableCell>
              <TableCell>
                {tour.villages.map((village) => village.village!.name).join(", ")}
              </TableCell>
              <TableCell>{tour.active ? "Ja" : "Nein"}</TableCell>
              <TableCell className="text-right">
                {/* <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleRemove(member.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Entfernen
                </Button>
                {(user as FullUser).staff_role === "admin" &&
                  member.users?.id !== user?.id && (
                    <MembersFormDialog
                      member={member}
                      refetch={refetch}
                      setRefetch={setRefetch}
                    />
                  )} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

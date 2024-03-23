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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CalendarFormDialog from "@/components/seasons/calendar/calendar-form-dialog";

export default function Calendar({ params }: { params: { seasonId: string } }) {
  const [calendarEntries, setCalendarEntries] = useState<
    [] | Tables<"season_calendar_entries">[]
  >([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { loading, user } = useUser();

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("season_calendar_entries")
      .select("*")
      .eq("season_id", params.seasonId)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setCalendarEntries(data);
      });
  }, [refetch, supabase]);

  async function handleRemove(entryId: number) {
    const { error } = await supabase
      .from("season_calendar_entries")
      .delete()
      .eq("id", entryId);

    if (!error) {
      toast.success("Saison Kalendereintrag wurde erfolgreich entfernt");
      setRefetch(!refetch);
      return;
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`);
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl w-full px-8">
      <h1 className="text-2xl my-8">Saison Kalender</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Von</TableHead>
            <TableHead>Bis</TableHead>
            <TableHead className="text-right">
              {(user as FullUser).staff_role === "admin" && (
                <CalendarFormDialog refetch={refetch} setRefetch={setRefetch} />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calendarEntries?.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.title}</TableCell>
              <TableCell>{entry.description ?? "-"}</TableCell>
              <TableCell>
                {entry.from ? new Date(entry.from).toLocaleString("de-CH") : "-"}
              </TableCell>
              <TableCell>
                {entry.until ? new Date(entry.until).toLocaleString("de-CH") : "-"}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleRemove(entry.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Entfernen
                </Button>
                {(user as FullUser).staff_role === "admin" && (
                  <CalendarFormDialog
                    calendarEntry={entry}
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

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/database.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function getFormattedDate(entry: Tables<"season_calendar">) {
  const { from, until } = entry;

  if (!from) {
    return "";
  }

  let fromDate = new Date(from);

  if (!until) {
    // e.g. 12.12.2024
    if (
      fromDate.getSeconds() === 0 &&
      fromDate.getMinutes() === 0 &&
      fromDate.getHours() === 0
    ) {
      return fromDate.toLocaleDateString("de-CH", { dateStyle: "medium" });
    }

    // e.g. 12.12.2024 09:00
    return fromDate.toLocaleString("de-CH", { dateStyle: "medium", timeStyle: "short" });
  }

  let untilDate = new Date(until);

  // e.g 03.12.2021 - 04.12.2021
  if (
    fromDate.getSeconds() === 0 &&
    fromDate.getMinutes() === 0 &&
    fromDate.getHours() === 0 &&
    untilDate.getSeconds() === 0 &&
    untilDate.getMinutes() === 0 &&
    untilDate.getHours() === 0
  ) {
    return `${fromDate.toLocaleDateString("de-Ch", { dateStyle: "medium" })} - ${untilDate.toLocaleDateString("de-CH", { dateStyle: "medium" })}`;
  }

  // e.g 01.12.2021 09:00 - 01.12.2021 12:00
  return `${fromDate.toLocaleString("de-Ch", { dateStyle: "medium", timeStyle: "short" })} - ${untilDate.toLocaleString("de-CH", { dateStyle: "medium", timeStyle: "short" })}`;
}

export default function Calendar() {
  const [calendarEntries, setCalendarEntries] = useState<Tables<"season_calendar">[]>();

  const supabase = createClient();

  useEffect(() => {
    async function getCalendarEntries() {
      const { data, error } = await supabase.from("season_calendar").select();

      if (error) {
        console.error(error);
        toast.error(`Fehler: ${JSON.stringify(error)}`);
        return;
      }
      console.log(data);
      setCalendarEntries(data);
    }
    getCalendarEntries();
  }, [supabase]);

  return (
    <section className="max-w-4xl m-auto px-8">
      <div className="my-12 space-y-4">
        <h1 className="text-3xl text-center">Kalender</h1>
        {calendarEntries && calendarEntries.length > 0 ? (
          <>
            {calendarEntries.map((entry) => (
              <Card key={entry.id} className="rounded-md border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle>{entry.title}</CardTitle>
                  <CardDescription className="text">
                    {getFormattedDate(entry)}
                  </CardDescription>
                </CardHeader>
                {entry.description && (
                  <CardContent className="text-sm">{entry.description}</CardContent>
                )}
              </Card>
            ))}
          </>
        ) : (
          <>
            {calendarEntries && calendarEntries.length === 0 ? (
              <p className="text-center">Derzeit keine Kalender Einträge vorhanden</p>
            ) : (
              <p className="text-center">Kalender lädt...</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

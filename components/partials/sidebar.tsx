"use client";

import { useEffect, useState } from "react";
import SeasonsFromDialog from "../seasons/seasons-form-dialog";
import { Tables } from "@/types/database.types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function Sidebar() {
  const [seasons, setSeasons] = useState<Tables<"seasons">[] | null>(null);
  const [refetch, setRefetch] = useState(false);
  const [chosenSeason, setChosenSeason] = useState<Tables<"seasons"> | null>(null);

  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const { seasonId } = useParams();

  useEffect(() => {
    async function getChosenSeason(seasonId: number) {
      const { data, error } = await supabase
        .from("seasons")
        .select()
        .eq("id", seasonId)
        .maybeSingle();

      if (error) {
        console.error(error);
        toast.error(`Fehler: ${JSON.stringify(error)}`);
        return;
      }

      setChosenSeason(data);
    }

    if (seasonId) {
      getChosenSeason(parseInt(Array.isArray(seasonId) ? seasonId[0] : seasonId));
    }
  }, [supabase]);

  useEffect(() => {
    async function getSeasons() {
      const { data, error } = await supabase.from("seasons").select();

      if (error) {
        console.error(error);
        toast.error(`Fehler: ${JSON.stringify(error)}`);
        return;
      }

      setSeasons(data);
    }
    getSeasons();
  }, [refetch, supabase]);

  function handleChoose(seasonId: string) {
    setChosenSeason(seasons!.filter((season) => season.id === parseInt(seasonId))[0]);
    // Persist the current season route (e.g. .../members) and only change seasonId
    let redirectTo = pathname.replace(/\/admin\/seasons(\/\d)?/g, "");
    redirectTo = `/admin/seasons/${seasonId}${redirectTo}`;

    return router.push(redirectTo);
  }

  return (
    // Calc 100vh minus 65px because of header height (64px height + 1px border)
    <aside className="min-w-48 h-[calc(100vh-65px)] border-r bg-white border-gray-200 p-4">
      <SeasonsFromDialog refetch={refetch} setRefetch={setRefetch} />
      {seasons && seasons.length > 0 && (
        <div>
          <Select
            onValueChange={(chosenSeason) => handleChoose(chosenSeason)}
            value={chosenSeason?.id.toString()}
            defaultValue={chosenSeason?.id.toString() || undefined}
          >
            <SelectTrigger className="my-2">
              <SelectValue placeholder="Saison auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {seasons.map((season) => {
                  return (
                    <>
                      <SelectItem value={season.id.toString()}>{season.name}</SelectItem>
                    </>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {chosenSeason && seasonId && (
        <ul>
          <li>
            <Link
              href={`/admin/seasons/${seasonId}/tours`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "px-2 h-8 py-2 w-full justify-start"
              )}
            >
              Touren
            </Link>
          </li>
          <li>
            <Link
              href={`/admin/seasons/${seasonId}/visits`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "px-2 h-8 py-2 w-full justify-start"
              )}
            >
              Besuche
            </Link>
          </li>
          <li>
            <Link
              href={`/admin/seasons/${seasonId}/members`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "px-2 h-8 py-2 w-full justify-start"
              )}
            >
              Mitglieder
            </Link>
          </li>
          <li>
            <Link
              href={`/admin/seasons/${seasonId}/templates`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "px-2 h-8 py-2 w-full justify-start"
              )}
            >
              Vorlagen
            </Link>
          </li>
        </ul>
      )}
    </aside>
  );
}

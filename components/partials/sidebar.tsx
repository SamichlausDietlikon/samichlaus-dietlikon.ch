"use client"

import { useEffect, useState } from "react"
import SeasonsFromDialog from "../seasons/seasons-form-dialog"
import { Tables } from "@/types/database.types"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { usePathname, useRouter } from "next/navigation"

export default function Sidebar() {
  const [seasons, setSeasons] = useState<Tables<"seasons">[]|null>(null)
  const [refetch, setRefetch] = useState(false)
  const [chosenSeason, setChosenSeason] = useState<Tables<"seasons">|null>(null)

  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function getSeasons() {
      const {data, error} = await supabase.from("seasons").select()
      
      if(error) {
        console.error(error)
        toast.error(`Fehler: ${JSON.stringify(error)}`)
        return
      }

      setSeasons(data)
    }
    getSeasons()
  }, [refetch, supabase])

  function handleChoose(seasonId: string) {
    setChosenSeason(seasons!.filter(season => season.id === parseInt(seasonId))[0])
    // Persist the current season route (e.g. .../members) and only change seasonId
    let redirectTo = pathname.replace(/\/admin\/seasons(\/\d)?/g,'')
    redirectTo = `/admin/seasons/${seasonId}${redirectTo}`
    
    return router.push(redirectTo)
  }

  return (
    // Calc 100vh minus 65px because of header height (64px height + 1px border)
    <aside className="w-56 h-[calc(100vh-65px)] border-r bg-white border-gray-200 p-4">
      <SeasonsFromDialog refetch={refetch} setRefetch={setRefetch} />
      {seasons && seasons.length > 0 && (
        <div>
          <Select onValueChange={chosenSeason => handleChoose(chosenSeason)} defaultValue={chosenSeason?.id.toString() || undefined}>
            <SelectTrigger className="my-2">
              <SelectValue placeholder="Saison auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {seasons.map(season => {
                  return (
                    <>
                      <SelectItem value={season.id.toString()}>{season.name}</SelectItem>
                    </>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </aside>
  )
}
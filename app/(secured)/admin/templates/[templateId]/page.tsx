"use client"

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/database.types";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useUser from "@/hooks/useUser";
import { FullUser } from "@/types/common.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SingleTemplate() {
  const { templateId } = useParams()

  const {loading, user} = useUser()

  const [template, setTemplate] = useState<null|Tables<"tour_templates"> & { tour_template_versions: Tables<"tour_template_versions">[] }>(null)

  const supabase = createClient()

  useEffect(() => {
    async function getTemplateData() {
      const {data, error} = await supabase.from("tour_templates").select("*, tour_template_versions!left(*)").eq("id", parseInt(Array.isArray(templateId) ? templateId[0] : templateId)).maybeSingle()
      if(error) {
        console.log(error)
        toast.error(`Fehler: ${JSON.stringify(error)}`)
        return
      }
      
      setTemplate(data)
    }
    getTemplateData()
  }, [supabase])

  return template && (
    <section className="max-w-7xl m-auto px-8">
      <Link href="/admin/templates" className="my-8 flex items-center gap-2 text-primary underline-offset-4 hover:underline text-sm font-medium"><ArrowLeftIcon /> Zurück</Link>
      <h1 className="text-2xl my-8">Vorlage <strong>{template.title}</strong></h1>
      <p className="text-xl">Beschreibung:</p>
      <p className="text-sm my-1 text-stone-500">{template.description}</p>
      <h2 className="text-xl my-8">Versionen</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead className="text-right">
              {/* {(user as FullUser).staff_role === "admin" && (
                <TemplateFormDialog refetch={refetch} setRefetch={setRefetch} />
              )} */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {template.tour_template_versions.map((version) => (
            <TableRow key={version.id}>
              <TableCell><Badge variant="default">v{version.version}</Badge></TableCell>
              <TableCell className="max-w-[28ch] text-nowrap overflow-hidden overflow-ellipsis">{version.description ?? "-"}</TableCell>
              <TableCell><Badge variant={version.tag}>{version.tag}</Badge></TableCell>
              <TableCell className="text-right">
                {(user as FullUser).staff_role === "admin" && (
                  <>
                    <Button variant="link" className="text-red-400 hover:text-red-500" >
                      Löschen
                    </Button>
                  </>
                )}
                <Link href={`/admin/versions/${template.id}`} className="text-primary underline-offset-4 hover:underline text-sm font-medium h-9 px-2 py-2">
                  Anzeigen
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
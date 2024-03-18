"use client"

import TemplateFormDialog from "@/components/templates/template-form-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useUser from "@/hooks/useUser"
import { createClient } from "@/lib/supabase/client"
import { FullUser } from "@/types/common.types"
import { Enums, Tables } from "@/types/database.types"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Templates() {
  const [templates, setTemplates] = useState<null|Tables<"tour_templates_overview">[]>(null)
  const [refetch, setRefetch] = useState(false)

  const {loading, user} = useUser()

  const supabase = createClient()
  
  useEffect(() => {
    async function getTemplatesData() {
      const {data, error} = await supabase.from("tour_templates_overview").select()
      
      if(error) {
        console.error(error)
        toast.error(`Fehler: ${JSON.stringify(error)}`)
        return
      }

      setTemplates(data)
    }
    getTemplatesData()
  }, [refetch, supabase])

  async function handleDelete(templateId: number) {
    const {status, error} = await supabase.from("tour_templates").delete().eq("id", templateId)

    if(status === 204) {
      toast.success("Vorlage erfolgreich gelöscht")
      setTemplates(templates!.filter(template => template.id !== templateId))
      return
    }

    toast.error(`Fehler: ${JSON.stringify(error)}`)
  }

  return loading || !templates ? (
    <div>Loading...</div> ) : (
      <section className="max-w-7xl m-auto px-8">
        <h1 className="text-2xl my-8">Vorlagen</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vorlage</TableHead>
              <TableHead>Beschreibung</TableHead>
              <TableHead>Neuste Version</TableHead>
              <TableHead>Letzter Tag</TableHead>
              <TableHead className="text-right">
                {(user as FullUser).staff_role === "admin" && (
                  <TemplateFormDialog refetch={refetch} setRefetch={setRefetch} />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>{template.title}</TableCell>
                <TableCell className="max-w-[28ch] text-nowrap overflow-hidden overflow-ellipsis">{template.description ?? "-"}</TableCell>
                <TableCell>{template.newest_version ? <Badge variant="default">v{template.newest_version}</Badge> : <em>No version released yet</em>}</TableCell>
                <TableCell>{template.latest_tag ? <Badge variant={template.latest_tag}>{template.latest_tag}</Badge> : <em>No version created yet</em>}</TableCell>
                <TableCell className="text-right">
                  {(user as FullUser).staff_role === "admin" && (
                    <>
                      <Button variant="link" className="text-red-400 hover:text-red-500" onClick={() => handleDelete(template.id as number)}>
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
  )
}
"use client"

import BackLink from "@/components/common/back-link"
import VersionForm from "@/components/templates/version-form"
import useUser from "@/hooks/useUser"
import { createClient } from "@/lib/supabase/client"
import { Tables } from "@/types/database.types"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function newVersion() {
  const { templateId } = useParams()

  const {loading, user} = useUser()

  const [template, setTemplate] = useState<null|Tables<"tour_templates"> & { tour_template_versions: Tables<"tour_template_versions">[] }>(null)

  const supabase = createClient()

  useEffect(() => {
    async function getTemplateData() {
      const {data, error} = await supabase.from("tour_templates").select("*, tour_template_versions!left(*)").eq("id", parseInt(Array.isArray(templateId) ? templateId[0] : templateId)).maybeSingle()
      if(error) {
        toast.error(`Fehler: ${JSON.stringify(error)}`)
        return
      }
      
      setTemplate(data)
    }
    getTemplateData()
  }, [supabase])

  return loading || !template ? (
    <div>Loading...</div>
  ) : (
    <section className="max-w-7xl m-auto px-8">
      <BackLink href={`/admin/templates/${templateId}`} />
      <h1 className="text-2xl my-8">Eine neue Version der Vorlage <strong>{template.title}</strong> erstellen</h1>
      <VersionForm />
    </section>
  )
}
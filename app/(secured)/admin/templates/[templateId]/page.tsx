"use client"

import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/database.types";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SingleTemplate() {
  const { templateId } = useParams()

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
    </section>
  )
}
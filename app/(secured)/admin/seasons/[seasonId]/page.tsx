"use client"

import Sidebar from "@/components/partials/sidebar"
import useUser from "@/hooks/useUser"

export default function Season({ params }: {params: {seasonId: string}}) {
  const {loading, user} = useUser()

  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="h-full"> 
    </section>
  )
}
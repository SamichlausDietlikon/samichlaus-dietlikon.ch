"use client"

import Sidebar from "@/components/partials/sidebar"
import useUser from "@/hooks/useUser"

export default function Seasons() {
  const {loading, user} = useUser()
 
  return loading ? (
    <div>Loading...</div>
  ) : (
    <section className="h-full"> 
      <Sidebar />
    </section>
  )
}
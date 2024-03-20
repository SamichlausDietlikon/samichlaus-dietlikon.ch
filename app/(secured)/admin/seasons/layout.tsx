"use client"

import Sidebar from "@/components/partials/sidebar"
import useUser from "@/hooks/useUser"

export default function SeasonLayout({children}: {children: React.ReactNode}) {
  const {loading, user} = useUser()
 
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-full flex"> 
      <Sidebar />
      {children}
    </div>
  )
}
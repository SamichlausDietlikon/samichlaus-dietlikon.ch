"use client"

import Link from "next/link"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="max-w-7xl m-auto px-4 py-4 flex justify-between text-sm">
      St. Nikolaus-Gesellschaft Dietlikon, Wangen-Brüttisellen
      <div className="flex gap-4">
        <Link href="/imprint" className="text-stone-500 hover:underline">Impressum</Link>
        <Link href="/privacy-policy" className="text-stone-500 hover:underline">Datenschutzerklärung</Link>
      </div>
    </footer>
  )
}
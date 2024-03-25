"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 py-4 border-t border-gray-200">
      <div className="max-w-7xl m-auto flex justify-between text-sm">
        St. Nikolaus-Gesellschaft Dietlikon, Wangen-Brüttisellen
        <div className="flex gap-4">
          <Link href="/imprint" className="text-stone-500 hover:underline">
            Impressum
          </Link>
          <Link href="/privacy-policy" className="text-stone-500 hover:underline">
            Datenschutzerklärung
          </Link>
        </div>
      </div>
    </footer>
  );
}

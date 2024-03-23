"use client";

import Logo from "./logo";
import React from "react";
import MainNav from "./navigation/admin-nav";
import { usePathname } from "next/navigation";

const components: { title: string; href: string }[] = [
  {
    title: "Nutzer",
    href: "/admin/users",
  },
  {
    title: "Vorlagen",
    href: "/admin/templates",
  },
  {
    title: "Funktionen",
    href: "/admin/responsibilities",
  },
  {
    title: "Dörfer",
    href: "/admin/villages",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    !pathname.startsWith("/admin/setup") && (
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 w-full">
            <Logo />
            <MainNav components={components} />
          </div>
        </div>
      </nav>
    )
  );
}

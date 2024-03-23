import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
import ProfileDropdwon from "./profile-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function ListItem({ className, title, children, ...props }: { [prop: string]: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

export default function MainNav({
  components,
}: {
  components: { title: string; href: string }[];
}) {
  return (
    <div className="flex justify-between w-full">
      <NavigationMenu className="hidden space-x-4 sm:-my-px sm:flex">
        <NavigationMenuList>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <NavigationMenuLink>Startseite</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link href="/calendar">
              <NavigationMenuLink>Kalender</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className={navigationMenuTriggerStyle()}>
                Anmeldung
                <ChevronDownIcon
                  className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem>
                  <Link href="/apply/family">Familienbesuche</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/apply/business">Schulen & Firmen</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className={navigationMenuTriggerStyle()}>
                Verein
                <ChevronDownIcon
                  className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem>
                  <Link href="/join">Mitglied werden</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact">Kontakt</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ProfileDropdwon />
    </div>
  );
}

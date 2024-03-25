import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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

export default function AdminNav({
  components,
}: {
  components: { title: string; href: string }[];
}) {
  return (
    <div className="flex justify-between w-full">
      <NavigationMenu className="hidden space-x-4 sm:-my-px sm:flex">
        <NavigationMenuList>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link href="/admin/seasons">
              <NavigationMenuLink>Saisons</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navigationMenuTriggerStyle())}>
                Admin
                <ChevronDownIcon
                  className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {components.map((component) => (
                  <DropdownMenuItem key={component.title}>
                    <Link href={component.href} className="w-full">{component.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ProfileDropdwon />
    </div>
  );
}

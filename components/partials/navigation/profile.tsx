"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useUser from "@/hooks/useUser";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function Profile() {
  const { loading, user } = useUser();

  return loading ? (
    <div className="text-sm my-auto">Loading...</div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm">
        My Name
        <ChevronDownIcon
          className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user!.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ProfileDropdwon() {
  const { loading, user } = useUser();

  const supabase = createClient();

  return loading ? (
    <div className="text-sm my-auto">Loading...</div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-baseline my-auto text-sm">
        {(user as FullUser).first_name} {(user as FullUser).last_name}
        <ChevronDownIcon
          className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user!.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

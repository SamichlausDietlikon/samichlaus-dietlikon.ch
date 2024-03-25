"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import useUser from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { FullUser } from "@/types/common.types";
import { ChevronDownIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ProfileDropdwon() {
  const { loading, user } = useUser();

  const supabase = createClient();

  return loading ? (
    <div className="text-sm my-auto">Loading...</div>
  ) : (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className={navigationMenuTriggerStyle()}>
            {(user as FullUser).first_name} {(user as FullUser).last_name}
            <ChevronDownIcon
              className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user!.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(user as FullUser).staff && (
              <DropdownMenuItem>
                <Link href="/admin" className="w-full flex gap-1 items-center">
                  <GearIcon />
                  Admin
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => supabase.auth.signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/auth/login"
          className="text-sm my-auto bg-background hover:bg-accent hover:text-accent-foreground duration-300 px-4 py-2 rounded-md"
        >
          Login
        </Link>
      )}
    </>
  );
}

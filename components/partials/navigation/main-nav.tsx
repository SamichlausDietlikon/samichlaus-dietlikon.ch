import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../../ui/navigation-menu"
import { cn } from "@/lib/utils"
import React from "react"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
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
  )
})

export default function MainNav({ components }: { components: { title: string; href: string}[]} ) {
  return (
    <NavigationMenu className="hidden space-x-4 sm:-my-px sm:ml-6 sm:flex">
      <NavigationMenuList>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link href="/admin/saisons">
            <NavigationMenuLink>
              Saisons
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1.5 p-2 md:grid-cols-2">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
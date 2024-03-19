import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function BackLink({ href }: {href: string}) {
  return (
    <Link href={href} className="my-8 flex items-center gap-2 text-primary underline-offset-4 hover:underline text-sm font-medium"><ArrowLeftIcon /> Zurück</Link>
  )
}
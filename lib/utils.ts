import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const staffRoles = {
  "admin": "Admin",
  "tour_manager": "Touren Management",
  "staff": "Mitglied",
}

export const tourTemplateTags = {
  "development": "Development",
  "released": "Released",
  "deprecated": "Deprecated",
}
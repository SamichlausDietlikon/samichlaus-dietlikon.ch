import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const seasonStaffRoles = {
  tour_manager: "Touren Management",
  staff: "Mitglied",
};

export const globalStaffRoles = {
  admin: "Admin",
};

export const staffRoles = {
  ...globalStaffRoles,
  ...seasonStaffRoles,
};

export const tourTemplateTags = {
  development: "Development",
  released: "Released",
  deprecated: "Deprecated",
};

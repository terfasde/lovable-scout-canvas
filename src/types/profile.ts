import type { Database } from "@/integrations/supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const canEditSeisena = (edad: number) => edad >= 7 && edad <= 10;
export const canEditPatrulla = (edad: number) => edad >= 11 && edad <= 14;
export const canEditPioneros = (edad: number) => edad >= 15 && edad <= 17;
export const canEditRovers = (edad: number) => edad >= 18;
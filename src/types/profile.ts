export interface Profile {
  id: string;
  user_id: string;
  nombre_completo: string;
  telefono: string;
  email: string;
  edad: number;
  seisena?: string;       // 7-10 años
  patrulla?: string;      // 11-14 años
  equipo_pioneros?: string; // 15-17 años
  comunidad_rovers?: string; // 18+ años
  updated_at: string;
  created_at: string;
}

export const canEditSeisena = (edad: number) => edad >= 7 && edad <= 10;
export const canEditPatrulla = (edad: number) => edad >= 11 && edad <= 14;
export const canEditPioneros = (edad: number) => edad >= 15 && edad <= 17;
export const canEditRovers = (edad: number) => edad >= 18;
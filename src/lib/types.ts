export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string | null
          updated_at: string | null
          user_id: string
          nombre_completo: string | null
          telefono: string | null
          email: string
          edad: number | null
          seisena: string | null
          patrulla: string | null
          equipo_pioneros: string | null
          comunidad_rovers: string | null
        }
      }
      eventos: {
        Row: {
          id: string
          created_at: string | null
          titulo: string
          descripcion: string
          fecha_inicio: string
          fecha_fin: string | null
          ubicacion: string | null
          tipo: string
          estado: string
          imagen_url: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
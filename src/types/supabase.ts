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
          created_at: string
          updated_at: string
          user_id: string
          nombre_completo: string
          telefono: string
          edad: number
          seisena: string | null
          patrulla: string | null
          equipo_pioneros: string | null
          comunidad_rovers: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          nombre_completo: string
          telefono: string
          edad?: number
          seisena?: string | null
          patrulla?: string | null
          equipo_pioneros?: string | null
          comunidad_rovers?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          nombre_completo?: string
          telefono?: string
          edad?: number
          seisena?: string | null
          patrulla?: string | null
          equipo_pioneros?: string | null
          comunidad_rovers?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
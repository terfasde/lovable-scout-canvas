import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { getProfile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Settings, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];

const PerfilView = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }
        setUserEmail(user.email || "");
        const p = await getProfile(user.id).catch(() => null);
        setProfile(p ?? null);
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'No se pudo cargar el perfil', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getRamaActual = (edad: number | null) => {
    if (!edad) return "No especificada";
    if (edad >= 21) return "Adulto";
    if (edad >= 18) return "Rover";
    if (edad >= 15) return "Pionero";
    if (edad >= 11) return "Tropa";
    if (edad >= 7) return "Manada";
    return "No especificada";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="h-20"></div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="h-20"></div>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground mb-4">No se encontró perfil.</p>
          <Button onClick={() => navigate('/perfil/editar')}>Crear perfil</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="h-20"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header estilo Instagram */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 pb-8 border-b">
          {/* Avatar */}
          <UserAvatar
            avatarUrl={profile.avatar_url}
            userName={profile.nombre_completo}
            size="xl"
            className="w-32 h-32 md:w-40 md:h-40 text-4xl"
          />

          {/* Info y acciones */}
          <div className="flex-1 min-w-0">
            {/* Username y botones */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <h1 className="text-2xl font-normal">{profile.nombre_completo || 'Usuario Scout'}</h1>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/perfil/editar')}
                className="gap-1"
              >
                <Settings className="w-4 h-4" />
                Editar perfil
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/perfil/compartir')}
                className="gap-1"
              >
                <Share2 className="w-4 h-4" />
                Compartir
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <span className="font-semibold">{profile.edad || '0'}</span>
                <span className="text-muted-foreground ml-1">años</span>
              </div>
              <div className="text-center">
                <span className="font-semibold">{getRamaActual(profile.edad)}</span>
                <span className="text-muted-foreground ml-1">Rama</span>
              </div>
            </div>

            {/* Bio / Info */}
            <div className="space-y-1">
              <p className="font-semibold">{profile.nombre_completo}</p>
              {userEmail && <p className="text-sm text-muted-foreground">{userEmail}</p>}
              {profile.telefono && <p className="text-sm text-muted-foreground">📞 {profile.telefono}</p>}
              {profile.rol_adulto && profile.edad && profile.edad >= 21 && (
                <p className="text-sm">👤 {profile.rol_adulto}</p>
              )}
            </div>
          </div>
        </div>

        {/* Información Scout en grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Información Scout</h2>
            
            {profile.edad && profile.edad >= 7 && profile.edad <= 20 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Manada</h3>
                <p className="text-base">{profile.seisena || 'No especificada'}</p>
              </div>
            )}

            {profile.edad && profile.edad >= 11 && profile.edad <= 20 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Tropa</h3>
                <p className="text-base">{profile.patrulla || 'No especificada'}</p>
              </div>
            )}

            {profile.edad && profile.edad >= 15 && profile.edad <= 20 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Pioneros</h3>
                <p className="text-base">{profile.equipo_pioneros || 'No especificado'}</p>
              </div>
            )}

            {profile.edad && profile.edad >= 18 && profile.edad <= 20 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Rovers</h3>
                <p className="text-base">{profile.comunidad_rovers || 'No especificada'}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Detalles</h2>
            
            {profile.fecha_nacimiento && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Fecha de nacimiento</h3>
                <p className="text-base">{new Date(profile.fecha_nacimiento).toLocaleDateString('es-UY')}</p>
              </div>
            )}

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Rama actual</h3>
              <p className="text-base font-medium">{getRamaActual(profile.edad)}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Perfil</h3>
              <p className="text-base">{(profile as any).is_public ? '🌍 Público' : '🔒 Privado'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilView;

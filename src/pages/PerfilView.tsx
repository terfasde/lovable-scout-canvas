import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];

const PerfilView = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
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
        const p = await getProfile(user.id).catch(() => null);
        setProfile(p ?? null);
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'No se pudo cargar el perfil', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div></div>

  if (!profile) return <div className="min-h-screen flex items-center justify-center">No se encontró perfil.</div>

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{profile.nombre_completo || 'Perfil'}</CardTitle>
          <CardDescription>Vista de tu perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p><strong>Teléfono:</strong> {profile.telefono || '-'}</p>
            <p><strong>Edad:</strong> {profile.edad ?? '-'}</p>
            <p><strong>Seisena:</strong> {profile.seisena || '-'}</p>
            <p><strong>Patrulla:</strong> {profile.patrulla || '-'}</p>
            <p><strong>Equipo Pioneros:</strong> {profile.equipo_pioneros || '-'}</p>
            <p><strong>Comunidad Rovers:</strong> {profile.comunidad_rovers || '-'}</p>
          </div>

          <div className="mt-6 flex gap-2">
            <Button variant="secondary" onClick={() => navigate('/perfil/editar')}>Editar perfil</Button>
            <Button onClick={() => navigate('/perfil/compartir')}>Compartir</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PerfilView;

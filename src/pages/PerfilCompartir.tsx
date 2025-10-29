import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getProfile, setProfilePublic } from "@/lib/api";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];

const PerfilCompartir = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigate('/auth'); return; }
        const p = await getProfile(user.id).catch(() => null);
        setProfile(p ?? null);
        // inferir flag público si existe (campo libre)
        if ((p as any)?.is_public !== undefined) setIsPublic(Boolean((p as any).is_public));
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'No se pudo cargar el perfil', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const togglePublic = async () => {
    if (!profile) return;
    try {
      await setProfilePublic(profile.user_id, !isPublic);
      setIsPublic(!isPublic);
      toast({ title: 'Hecho', description: `Perfil ${!isPublic ? 'publicado' : 'privado'}` });
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'No se pudo cambiar la visibilidad', variant: 'destructive' });
    }
  };

  const copyLink = async () => {
    if (!profile) return;
    const link = `${window.location.origin}/perfil/public/${profile.user_id}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({ title: 'Copiado', description: 'Enlace de perfil copiado al portapapeles' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo copiar el enlace', variant: 'destructive' });
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div></div>

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Compartir perfil</CardTitle>
          <CardDescription>Controla la visibilidad de tu perfil y copia el enlace público</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p><strong>Nombre:</strong> {profile?.nombre_completo || '-'}</p>
            <p><strong>Teléfono:</strong> {profile?.telefono || '-'}</p>
            <div className="flex gap-2 mt-4">
              <Button onClick={togglePublic}>{isPublic ? 'Hacer privado' : 'Hacer público'}</Button>
              <Button onClick={copyLink} variant="secondary">Copiar enlace público</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PerfilCompartir;

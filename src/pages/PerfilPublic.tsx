import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PerfilPublic = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', id)
          .single();
        if (error) throw error;
        // Only show if public flag is set (best-effort: field may be absent)
        if ((data as any).is_public) {
          setProfile(data);
        } else {
          toast({ title: 'No disponible', description: 'Este perfil no es público' });
        }
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'No se pudo cargar el perfil', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div></div>

  if (!profile) return <div className="min-h-screen flex items-center justify-center">Perfil no disponible públicamente.</div>

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{profile.nombre_completo}</CardTitle>
          <CardDescription>Perfil público</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p><strong>Teléfono:</strong> {profile.telefono || '-'}</p>
            <p><strong>Edad:</strong> {profile.edad ?? '-'}</p>
            <p><strong>Seisena:</strong> {profile.seisena || '-'}</p>
            <p><strong>Patrulla:</strong> {profile.patrulla || '-'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PerfilPublic;

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { followUser, getFollowRelation, cancelRequest, unfollowUser } from "@/lib/follows";

const PerfilPublic = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any | null>(null);
  const [relation, setRelation] = useState<any | null>(null);
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
        setProfile(data);
        // try to fetch relation status (if authenticated)
        const rel = await getFollowRelation(id);
        if (!rel.error) setRelation(rel.data);
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'No se pudo cargar el perfil', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const status = useMemo(() => relation?.status as string | undefined, [relation]);

  const handleFollow = async () => {
    if (!id) return;
    const { error } = await followUser(id);
    if (error) return toast({ title: 'Error', description: error.message, variant: 'destructive' });
    toast({ title: 'Solicitud enviada', description: 'Te avisaremos cuando sea aceptada (si es privado).' });
    const rel = await getFollowRelation(id);
    if (!rel.error) setRelation(rel.data);
  };

  const handleCancelOrUnfollow = async () => {
    if (!id) return;
    if (status === 'pending') {
      const { error } = await cancelRequest(id);
      if (error) return toast({ title: 'Error', description: error.message, variant: 'destructive' });
      setRelation(null);
      toast({ title: 'Solicitud cancelada' });
    } else if (status === 'accepted') {
      const { error } = await unfollowUser(id);
      if (error) return toast({ title: 'Error', description: error.message, variant: 'destructive' });
      setRelation(null);
      toast({ title: 'Dejaste de seguir' });
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div></div>

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <p className="mb-3">Este perfil es privado o no tienes acceso.</p>
        {id && (
          <Button onClick={handleFollow} className="gap-2">Solicitar seguir</Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <UserAvatar
              avatarUrl={profile.avatar_url}
              userName={profile.nombre_completo}
              size="lg"
            />
            <div>
              <CardTitle>{profile.nombre_completo}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {(profile as any).is_public ? (
                  <p className="text-sm text-muted-foreground">Perfil público</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Perfil privado</p>
                )}
                {status === 'accepted' && <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Siguiendo</span>}
                {status === 'pending' && <span className="text-xs px-2 py-0.5 rounded-full bg-muted">Pendiente</span>}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            {status === 'accepted' ? (
              <Button variant="outline" size="sm" onClick={handleCancelOrUnfollow}>Dejar de seguir</Button>
            ) : status === 'pending' ? (
              <Button variant="outline" size="sm" onClick={handleCancelOrUnfollow}>Cancelar solicitud</Button>
            ) : (
              <Button size="sm" onClick={handleFollow}>Seguir</Button>
            )}
          </div>
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

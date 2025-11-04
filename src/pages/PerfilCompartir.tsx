import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getProfile, setProfilePublic } from "@/lib/api";
import { getAuthUser } from "@/lib/backend";
import { ArrowLeft, Copy, Globe, Lock, Share2, User } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];

const PerfilCompartir = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const auth = await getAuthUser();
        if (!auth) { navigate('/auth'); return; }
        const p = await getProfile(auth.id).catch(() => null);
        setProfile(p ?? null);
        if ((p as any)?.is_public !== undefined) setIsPublic(Boolean((p as any).is_public));
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'No se pudo cargar el perfil', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const togglePublic = async (checked: boolean) => {
    if (!profile) return;
    setUpdating(true);
    try {
      await setProfilePublic(profile.user_id, checked);
      setIsPublic(checked);
      toast({ 
        title: checked ? '🌍 Perfil público' : '🔒 Perfil privado', 
        description: checked ? 'Tu perfil ahora es visible para todos' : 'Tu perfil ahora es privado' 
      });
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'No se pudo cambiar la visibilidad', variant: 'destructive' });
    } finally {
      setUpdating(false);
    }
  };

  const copyLink = async () => {
    if (!profile) return;
    const link = `${window.location.origin}/perfil/public/${profile.user_id}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({ 
        title: '✅ Enlace copiado', 
        description: 'El enlace de tu perfil se copió al portapapeles' 
      });
    } catch {
      toast({ title: 'Error', description: 'No se pudo copiar el enlace', variant: 'destructive' });
    }
  };

  const getInitials = (nombre: string) => {
    const parts = nombre.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation global en App.tsx */}
        <div className="h-20"></div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation global en App.tsx */}
      <div className="h-20"></div>
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/perfil')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Compartir perfil</h1>
            <p className="text-sm text-muted-foreground">Controla quién puede ver tu información</p>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-card border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                {profile?.nombre_completo ? getInitials(profile.nombre_completo) : <User className="w-10 h-10" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{profile?.nombre_completo || 'Usuario Scout'}</h2>
              <p className="text-sm text-muted-foreground">{profile?.telefono || 'Sin teléfono'}</p>
            </div>
          </div>

          {/* Public/Private Toggle */}
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isPublic ? (
                  <Globe className="w-5 h-5 text-primary" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="public-toggle" className="text-base font-medium cursor-pointer">
                    {isPublic ? 'Perfil público' : 'Perfil privado'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {isPublic 
                      ? 'Cualquiera con el enlace puede ver tu perfil' 
                      : 'Solo tú puedes ver tu perfil'}
                  </p>
                </div>
              </div>
              <Switch
                id="public-toggle"
                checked={isPublic}
                onCheckedChange={togglePublic}
                disabled={updating}
              />
            </div>
          </div>

          {/* Share Link */}
          {isPublic && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Share2 className="w-4 h-4 text-muted-foreground" />
                <code className="flex-1 text-sm truncate">
                  {`${window.location.origin}/perfil/public/${profile?.user_id}`}
                </code>
                <Button size="sm" variant="outline" onClick={copyLink} className="gap-2 shrink-0">
                  <Copy className="w-4 h-4" />
                  Copiar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Comparte este enlace con otros scouts
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Acerca de los perfiles públicos
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
            <li>Los perfiles públicos pueden ser vistos por cualquier persona con el enlace</li>
            <li>Tu información de contacto se mostrará si el perfil es público</li>
            <li>Puedes volver a hacer privado tu perfil en cualquier momento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PerfilCompartir;

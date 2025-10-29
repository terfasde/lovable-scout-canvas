import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { canEditSeisena, canEditPatrulla, canEditPioneros, canEditRovers } from "@/types/profile";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row']
type ProfileInsert = Tables['profiles']['Insert'];
type ProfileUpdate = Tables['profiles']['Update'];

const Perfil = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<{
    nombre_completo: string;
    telefono: string;
    email: string;
    edad: number;
    seisena: string;
    patrulla: string;
    equipo_pioneros: string;
    comunidad_rovers: string;
    password: string;
  }>({
    nombre_completo: "",
    telefono: "",
    email: "",
    edad: 0,
    seisena: "",
    patrulla: "",
    equipo_pioneros: "",
    comunidad_rovers: "",
    password: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Obtener perfil existente o crear uno nuevo
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (profile) {
        setProfile(profile as Profile);
        setFormData({
          ...formData,
          nombre_completo: profile.nombre_completo || user.user_metadata?.nombre || "",
          telefono: profile.telefono || user.user_metadata?.telefono || "",
          email: user.email || "",
          edad: profile.edad || 0,
          seisena: profile.seisena || "",
          patrulla: profile.patrulla || "",
          equipo_pioneros: profile.equipo_pioneros || "",
          comunidad_rovers: profile.comunidad_rovers || "",
          password: ""
        });
      } else {
        // Crear perfil inicial
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            nombre_completo: user.user_metadata?.nombre || "",
            telefono: user.user_metadata?.telefono || "",
            email: user.email
          });
        if (insertError) throw insertError;
        await getProfile(); // Recargar después de crear
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "edad" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      // Actualizar email si cambió
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({ 
          email: formData.email 
        });
        if (emailError) throw emailError;
      }

      // Actualizar contraseña si se proporcionó una nueva
      if (formData.password) {
        const { error: passwordError } = await supabase.auth.updateUser({ 
          password: formData.password 
        });
        if (passwordError) throw passwordError;
      }

      // Actualizar perfil
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          nombre_completo: formData.nombre_completo,
          telefono: formData.telefono,
          edad: formData.edad,
          seisena: canEditSeisena(formData.edad) ? formData.seisena : null,
          patrulla: canEditPatrulla(formData.edad) ? formData.patrulla : null,
          equipo_pioneros: canEditPioneros(formData.edad) ? formData.equipo_pioneros : null,
          comunidad_rovers: canEditRovers(formData.edad) ? formData.comunidad_rovers : null,
          updated_at: new Date().toISOString()
        } as Profile);

      if (profileError) throw profileError;

      toast({
        title: "¡Perfil actualizado!",
        description: "Tus cambios han sido guardados."
      });

      // Limpiar contraseña después de actualizar
      setFormData(prev => ({ ...prev, password: "" }));
    } catch (error: any) {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Tu Perfil Scout</CardTitle>
          <CardDescription>Actualiza tu información personal y scout</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos personales */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Datos Personales</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre_completo">Nombre completo</Label>
                  <Input
                    id="nombre_completo"
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edad">Edad</Label>
                  <Input
                    id="edad"
                    name="edad"
                    type="number"
                    min="7"
                    max="99"
                    value={formData.edad || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Nueva contraseña (opcional)</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Dejar vacío para mantener"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground p-1"
                    >
                      {showPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Datos Scout */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Scout</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {canEditSeisena(formData.edad) && (
                  <div className="space-y-2">
                    <Label htmlFor="seisena">Seisena</Label>
                    <Input
                      id="seisena"
                      name="seisena"
                      value={formData.seisena}
                      onChange={handleChange}
                    />
                  </div>
                )}

                {canEditPatrulla(formData.edad) && (
                  <div className="space-y-2">
                    <Label htmlFor="patrulla">Patrulla</Label>
                    <Input
                      id="patrulla"
                      name="patrulla"
                      value={formData.patrulla}
                      onChange={handleChange}
                    />
                  </div>
                )}

                {canEditPioneros(formData.edad) && (
                  <div className="space-y-2">
                    <Label htmlFor="equipo_pioneros">Equipo de Pioneros</Label>
                    <Input
                      id="equipo_pioneros"
                      name="equipo_pioneros"
                      value={formData.equipo_pioneros}
                      onChange={handleChange}
                    />
                  </div>
                )}

                {canEditRovers(formData.edad) && (
                  <div className="space-y-2">
                    <Label htmlFor="comunidad_rovers">Comunidad Rovers</Label>
                    <Input
                      id="comunidad_rovers"
                      name="comunidad_rovers"
                      value={formData.comunidad_rovers}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Guardar cambios
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Perfil;
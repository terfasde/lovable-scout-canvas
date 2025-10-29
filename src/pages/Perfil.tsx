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
    edad: number;
    fecha_nacimiento: string;
    seisena: string;
    patrulla: string;
    equipo_pioneros: string;
    comunidad_rovers: string;
    rol_adulto: string;
    password: string;
  }>({
    nombre_completo: "",
    telefono: "",
    edad: 0,
    fecha_nacimiento: "",
    seisena: "",
    patrulla: "",
    equipo_pioneros: "",
    comunidad_rovers: "",
    rol_adulto: "",
    password: ""
  });
  const [ramaActual, setRamaActual] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  // Calcular edad automáticamente si hay fecha de nacimiento
  useEffect(() => {
    if (formData.fecha_nacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(formData.fecha_nacimiento);
      let años = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        años--;
      }
      setFormData(prev => ({ ...prev, edad: años }));
    }
  }, [formData.fecha_nacimiento]);

  // Determinar rama actual según edad
  useEffect(() => {
    const edad = formData.edad;
    if (edad >= 21) setRamaActual("Adulto");
    else if (edad >= 18) setRamaActual("Rover");
    else if (edad >= 15) setRamaActual("Pionero");
    else if (edad >= 11) setRamaActual("Tropa");
    else if (edad >= 7) setRamaActual("Manada");
    else setRamaActual("");
  }, [formData.edad]);

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

      console.log('User data:', user);
      console.log('Profile data:', profile);

      // Obtener los datos del usuario
      const userMetadata = user.user_metadata || {};
      const userNombre = userMetadata.nombre || profile?.nombre_completo || "";
      const userTelefono = userMetadata.telefono || profile?.telefono || "";

      if (profile) {
        setProfile(profile as Profile);
        setFormData({
          ...formData,
          nombre_completo: userNombre,
          telefono: userTelefono,
          edad: profile.edad || 0,
          fecha_nacimiento: profile.fecha_nacimiento || "",
          seisena: profile.seisena || "",
          patrulla: profile.patrulla || "",
          equipo_pioneros: profile.equipo_pioneros || "",
          comunidad_rovers: profile.comunidad_rovers || "",
          rol_adulto: profile.rol_adulto || "",
          password: ""
        });
      } else {
        // Crear perfil inicial
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            nombre_completo: userNombre,
            telefono: userTelefono
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "edad" ? parseInt(value) || 0 : value
    }));
  };

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Obtener el email del usuario cuando se carga el componente
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setUserEmail(user.email);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      // Actualizar contraseña si se proporcionó una nueva
      if (formData.password) {
        const { error: passwordError } = await supabase.auth.updateUser({ 
          password: formData.password 
        });
        if (passwordError) throw passwordError;
      }

      // Actualizar perfil
      const profileData: any = {
        user_id: user.id,
        nombre_completo: formData.nombre_completo,
        telefono: formData.telefono,
        edad: formData.edad,
        updated_at: new Date().toISOString()
      };

      // Solo agregar campos si existen en la base de datos
      if (formData.fecha_nacimiento) {
        profileData.fecha_nacimiento = formData.fecha_nacimiento;
      }

      if (formData.edad >= 7 && formData.edad <= 20) {
        profileData.seisena = formData.seisena || null;
      }

      if (formData.edad >= 11 && formData.edad <= 20) {
        profileData.patrulla = formData.patrulla || null;
      }

      if (formData.edad >= 15 && formData.edad <= 20) {
        profileData.equipo_pioneros = formData.equipo_pioneros || null;
      }

      if (formData.edad >= 18 && formData.edad <= 20) {
        profileData.comunidad_rovers = formData.comunidad_rovers || null;
      }

      if (formData.edad >= 21 && formData.rol_adulto) {
        profileData.rol_adulto = formData.rol_adulto;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileData)
        .eq('user_id', user.id);

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
                  <Label htmlFor="fecha_nacimiento">Fecha de nacimiento (opcional)</Label>
                  <Input
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
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
                    disabled={!!formData.fecha_nacimiento}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rama_actual">Rama actual</Label>
                  <Input
                    id="rama_actual"
                    type="text"
                    value={ramaActual}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    disabled
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
                {formData.edad >= 7 && formData.edad <= 20 && (
                  <div className="space-y-2">
                    <Label htmlFor="seisena">Seisena (Manada)</Label>
                    <Input
                      id="seisena"
                      name="seisena"
                      value={formData.seisena}
                      onChange={handleChange}
                      placeholder="Ej: Seisena Roja"
                    />
                  </div>
                )}

                {formData.edad >= 11 && formData.edad <= 20 && (
                  <div className="space-y-2">
                    <Label htmlFor="patrulla">Patrulla (Tropa)</Label>
                    <Input
                      id="patrulla"
                      name="patrulla"
                      value={formData.patrulla}
                      onChange={handleChange}
                      placeholder="Ej: Patrulla Halcón"
                    />
                  </div>
                )}

                {formData.edad >= 15 && formData.edad <= 20 && (
                  <div className="space-y-2">
                    <Label htmlFor="equipo_pioneros">Equipo de Pioneros</Label>
                    <Input
                      id="equipo_pioneros"
                      name="equipo_pioneros"
                      value={formData.equipo_pioneros}
                      onChange={handleChange}
                      placeholder="Ej: Equipo Alpha"
                    />
                  </div>
                )}

                {formData.edad >= 18 && formData.edad <= 20 && (
                  <div className="space-y-2">
                    <Label htmlFor="comunidad_rovers">Comunidad Rovers</Label>
                    <Input
                      id="comunidad_rovers"
                      name="comunidad_rovers"
                      value={formData.comunidad_rovers}
                      onChange={handleChange}
                      placeholder="Ej: Comunidad Caminantes"
                    />
                  </div>
                )}

                {formData.edad >= 21 && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="rol_adulto">Rol en el grupo</Label>
                    <select
                      id="rol_adulto"
                      name="rol_adulto"
                      value={formData.rol_adulto}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="No educador/a">No educador/a</option>
                      <option value="Educador/a">Educador/a</option>
                      <option value="Miembro del Comité">Miembro del Comité</option>
                      <option value="Familiar de Scout">Familiar de Scout</option>
                    </select>
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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserAvatar from "@/components/UserAvatar";
import AvatarCropDialog from "@/components/AvatarCropDialog";
import { ArrowLeft, Eye, EyeOff, Save, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>("");
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  
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
    avatar_url: string | null;
    username: string;
    username_updated_at: string | null;
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
    password: "",
    avatar_url: null,
    username: "",
    username_updated_at: null
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
          password: "",
          avatar_url: profile.avatar_url || null,
          username: (profile as any).username || "",
          username_updated_at: (profile as any).username_updated_at || null
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Archivo inválido",
        description: "Por favor selecciona una imagen",
        variant: "destructive"
      });
      return;
    }

    // Validar tamaño (máx 4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast({
        title: "Archivo muy grande",
        description: "La imagen no debe superar 4MB",
        variant: "destructive"
      });
      return;
    }

    // Crear preview temporal para el crop
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImageSrc(reader.result as string);
      setShowCropDialog(true);
    };
    reader.readAsDataURL(file);
    
    // Resetear el input para permitir seleccionar el mismo archivo
    e.target.value = "";
  };

  const handleCropComplete = (croppedImage: Blob) => {
    // Convertir blob a file
    const fileName = `avatar-${Date.now()}.jpg`;
    const croppedFile = new File([croppedImage], fileName, { type: "image/jpeg" });
    
    setAvatarFile(croppedFile);
    setCroppedBlob(croppedImage);
    
    // Crear preview del crop
    const previewUrl = URL.createObjectURL(croppedImage);
    setAvatarPreview(previewUrl);
  };

  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!avatarFile) return null;

    try {
      setUploadingAvatar(true);

      // Eliminar avatar anterior si existe
      if (formData.avatar_url) {
        const oldPath = formData.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('avatars').remove([`${userId}/${oldPath}`]);
        }
      }

      // Subir nuevo avatar
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Error al subir imagen",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingAvatar(false);
    }
  };

  const removeAvatarPreview = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setCroppedBlob(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      // Subir avatar si hay uno nuevo
      let avatarUrl = formData.avatar_url;
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar(user.id);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

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
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };

      // Agregar username si se proporcionó
      if (formData.username && formData.username.trim()) {
        profileData.username = formData.username.trim().toLowerCase();
      }

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

      // Limpiar contraseña y avatar temporal después de actualizar
      setFormData(prev => ({ ...prev, password: "", avatar_url: avatarUrl }));
      setAvatarFile(null);
      setAvatarPreview(null);
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
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="h-20"></div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="h-20"></div>
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/perfil')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Editar perfil</h1>
            <p className="text-sm text-muted-foreground">Actualiza tu información personal y scout</p>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b">
          <div className="relative">
            <UserAvatar
              avatarUrl={avatarPreview || formData.avatar_url}
              userName={formData.nombre_completo}
              size="xl"
            />
            {avatarPreview && (
              <button
                onClick={removeAvatarPreview}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-medium mb-1">{formData.nombre_completo || 'Usuario Scout'}</h2>
            <p className="text-sm text-muted-foreground mb-3">{userEmail}</p>
            <div className="flex gap-2 justify-center sm:justify-start">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  {formData.avatar_url ? 'Cambiar foto' : 'Subir foto'}
                </div>
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              {formData.avatar_url && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      const { data: { user } } = await supabase.auth.getUser();
                      if (!user) return;
                      
                      await supabase
                        .from("profiles")
                        .update({ avatar_url: null })
                        .eq("user_id", user.id);
                      
                      setFormData(prev => ({ ...prev, avatar_url: null }));
                      toast({
                        title: "Foto eliminada",
                        description: "Tu foto de perfil ha sido eliminada"
                      });
                    } catch (error: any) {
                      toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  Eliminar foto
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">JPG, PNG o GIF. Máximo 4MB</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Datos personales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Personal</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre_completo">Nombre completo</Label>
                <Input
                  id="nombre_completo"
                  name="nombre_completo"
                  value={formData.nombre_completo}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">
                  Nombre de usuario
                  {formData.username_updated_at && (() => {
                    const lastUpdate = new Date(formData.username_updated_at);
                    const daysSince = Math.floor((Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
                    const daysRemaining = 7 - daysSince;
                    
                    if (daysRemaining > 0) {
                      return (
                        <span className="ml-2 text-xs text-muted-foreground font-normal">
                          (podrás cambiar en {daysRemaining} día{daysRemaining !== 1 ? 's' : ''})
                        </span>
                      );
                    }
                    return (
                      <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-normal">
                        (puedes cambiar ahora)
                      </span>
                    );
                  })()}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '');
                      setFormData(prev => ({ ...prev, username: value }));
                    }}
                    placeholder="usuario.ejemplo"
                    pattern="[a-z0-9._-]{3,30}"
                    minLength={3}
                    maxLength={30}
                    className="bg-background pl-8"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  3-30 caracteres. Solo letras, números, puntos, guiones.
                  {!formData.username && " Solo se puede cambiar cada 7 días."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha_nacimiento">Fecha de nacimiento (opcional)</Label>
                <Input
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="bg-background"
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
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rama_actual">Rama actual</Label>
                <Input
                  id="rama_actual"
                  type="text"
                  value={ramaActual}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="password">Nueva contraseña (opcional)</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Dejar vacío para mantener"
                    className="bg-background pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Datos Scout */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Scout</h3>
            
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
                    className="bg-background"
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
                    className="bg-background"
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
                    className="bg-background"
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
                    className="bg-background"
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

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 gap-2" disabled={saving}>
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar cambios
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/perfil')}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>

      {/* Avatar Crop Dialog */}
      <AvatarCropDialog
        open={showCropDialog}
        imageSrc={tempImageSrc}
        onClose={() => setShowCropDialog(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default Perfil;
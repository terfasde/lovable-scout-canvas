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
import type { Database } from "@/integrations/supabase/types";
import { isLocalBackend, uploadImage, getAuthUser } from "@/lib/backend";
import {
  getProfile as getLocalProfile,
  updateProfile as updateLocalProfile,
} from "@/lib/api";

type Tables = Database["public"]["Tables"];
type Profile = Tables["profiles"]["Row"];
type ProfileInsert = Tables["profiles"]["Insert"];
type ProfileUpdate = Tables["profiles"]["Update"];

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
    username_updated_at: null,
  });
  const [originalData, setOriginalData] = useState<typeof formData | null>(
    null,
  );
  const [ramaActual, setRamaActual] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  // Fecha máxima para el datepicker (hoy) evitando desfases UTC
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Calcular edad automáticamente DESDE fecha de nacimiento (edad no editable)
  useEffect(() => {
    if (formData.fecha_nacimiento) {
      const hoy = new Date();
      // Parsear fecha sin conversión UTC para evitar desfase de días
      const [year, month, day] = formData.fecha_nacimiento
        .split("-")
        .map(Number);
      const nacimiento = new Date(year, month - 1, day);
      let años = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        años--;
      }
      setFormData((prev) => ({ ...prev, edad: años }));
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

  const getProfile = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const auth = await getAuthUser();
      if (!auth) {
        navigate("/auth");
        return;
      }
      setUserEmail(auth.email || "");

      // Modo local: obtener desde backend propio
      if (isLocalBackend()) {
        const p: any = await getLocalProfile(auth.id).catch(() => null);
        const profileData = {
          ...formData,
          nombre_completo: p?.nombre_completo || "",
          telefono: p?.telefono || "",
          edad: p?.edad || 0,
          fecha_nacimiento: p?.fecha_nacimiento
            ? p.fecha_nacimiento.split("T")[0]
            : "",
          seisena: p?.seisena || "",
          patrulla: p?.patrulla || "",
          equipo_pioneros: p?.equipo_pioneros || "",
          comunidad_rovers: p?.comunidad_rovers || "",
          rol_adulto: p?.rol_adulto || "",
          password: "",
          avatar_url: p?.avatar_url || null,
          username: (p as any)?.username || "",
          username_updated_at: (p as any)?.username_updated_at || null,
        };
        setFormData(profileData);
        setOriginalData(profileData);
        return;
      }

      // Supabase (fallback)
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", auth.id)
        .single();
      if (error && error.code !== "PGRST116") {
        throw error;
      }
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      const userMetadata = user?.user_metadata || {};
      const userNombre =
        (userMetadata as any).nombre || profile?.nombre_completo || "";
      const userTelefono =
        (userMetadata as any).telefono || profile?.telefono || "";
      if (profile) {
        setProfile(profile as Profile);
        const profileData = {
          ...formData,
          nombre_completo: userNombre,
          telefono: userTelefono,
          edad: (profile as any).edad || 0,
          fecha_nacimiento: (profile as any).fecha_nacimiento
            ? (profile as any).fecha_nacimiento.split("T")[0]
            : "",
          seisena: (profile as any).seisena || "",
          patrulla: (profile as any).patrulla || "",
          equipo_pioneros: (profile as any).equipo_pioneros || "",
          comunidad_rovers: (profile as any).comunidad_rovers || "",
          rol_adulto: (profile as any).rol_adulto || "",
          password: "",
          avatar_url: (profile as any).avatar_url || null,
          username: (profile as any).username || "",
          username_updated_at: (profile as any).username_updated_at || null,
        };
        setFormData(profileData);
        setOriginalData(profileData);
      } else {
        const { error: insertError } = await supabase.from("profiles").insert({
          user_id: auth.id,
          nombre_completo: userNombre,
          telefono: userTelefono,
        });
        if (insertError) throw insertError;
        await getProfile();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Validación específica por campo
    if (name === "telefono") {
      // Solo números y guiones/espacios
      const cleaned = value.replace(/[^\d\s\-+()]/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
      return;
    }

    if (name === "edad") {
      const edad = parseInt(value) || 0;
      if (edad < 0 || edad > 120) {
        toast({
          title: "Edad inválida",
          description: "La edad debe estar entre 0 y 120 años",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: edad }));
      return;
    }

    if (name === "nombre_completo" && value.length > 50) {
      toast({
        title: "Nombre muy largo",
        description: "El nombre no puede exceder 50 caracteres",
        variant: "destructive",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [userEmail, setUserEmail] = useState("");

  // Detectar si hay cambios pendientes
  const hasChanges = () => {
    if (!originalData) return false;
    if (avatarFile) return true; // Hay nuevo avatar
    if (formData.password) return true; // Hay nueva contraseña

    // Comparar campos editables
    return (
      formData.nombre_completo !== originalData.nombre_completo ||
      formData.telefono !== originalData.telefono ||
      formData.edad !== originalData.edad ||
      formData.fecha_nacimiento !== originalData.fecha_nacimiento ||
      formData.seisena !== originalData.seisena ||
      formData.patrulla !== originalData.patrulla ||
      formData.equipo_pioneros !== originalData.equipo_pioneros ||
      formData.comunidad_rovers !== originalData.comunidad_rovers ||
      formData.rol_adulto !== originalData.rol_adulto ||
      formData.username !== originalData.username
    );
  };

  useEffect(() => {
    // Obtener el email del usuario cuando se carga el componente
    (async () => {
      const auth = await getAuthUser();
      if (auth?.email) setUserEmail(auth.email);
    })();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Tipo de archivo inválido",
        description: "Solo se permiten imágenes (JPG, PNG, GIF, WEBP)",
        variant: "destructive",
      });
      return;
    }

    // Validar tamaño (máx 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "Archivo muy grande",
        description: "La imagen no debe superar 5MB",
        variant: "destructive",
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
    const croppedFile = new File([croppedImage], fileName, {
      type: "image/jpeg",
    });

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
      if (isLocalBackend()) {
        // Subir al backend local
        const url = await uploadImage(avatarFile);
        return url;
      }

      // Supabase storage
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Error al subir imagen",
        description: error.message,
        variant: "destructive",
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

    // Validaciones antes de guardar
    if (!formData.nombre_completo.trim()) {
      toast({
        title: "Campo requerido",
        description: "El nombre completo es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (formData.nombre_completo.length < 3) {
      toast({
        title: "Nombre muy corto",
        description: "El nombre debe tener al menos 3 caracteres",
        variant: "destructive",
      });
      return;
    }

    if (formData.telefono && formData.telefono.replace(/\D/g, "").length < 8) {
      toast({
        title: "Teléfono inválido",
        description: "El teléfono debe tener al menos 8 dígitos",
        variant: "destructive",
      });
      return;
    }

    if (!formData.fecha_nacimiento) {
      toast({
        title: "Campo requerido",
        description: "Debes ingresar tu fecha de nacimiento",
        variant: "destructive",
      });
      return;
    }

    if (formData.password && formData.password.length < 6) {
      toast({
        title: "Contraseña débil",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    if (formData.username && formData.username.length < 3) {
      toast({
        title: "Username muy corto",
        description: "El username debe tener al menos 3 caracteres",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const auth = await getAuthUser();
      if (!auth) throw new Error("No hay sesión activa");

      // Subir avatar si hay uno nuevo
      let avatarUrl = formData.avatar_url;
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar(auth.id);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      // Actualizar contraseña: solo soportado en Supabase
      if (!isLocalBackend() && formData.password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.password,
        });
        if (passwordError) throw passwordError;
      }

      // Preparar datos de perfil
      const profileData: any = {
        user_id: auth.id,
        nombre_completo: formData.nombre_completo,
        telefono: formData.telefono,
        edad: formData.edad,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
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

      if (isLocalBackend()) {
        const updated = (await updateLocalProfile(profileData as any)) as any;
        if (updated) {
          // Aplicar respuesta del backend directamente para evitar parpadeos
          const refreshed = {
            ...formData,
            nombre_completo: updated?.nombre_completo || formData.nombre_completo,
            telefono: updated?.telefono ?? formData.telefono,
            fecha_nacimiento: updated?.fecha_nacimiento
              ? String(updated.fecha_nacimiento).split("T")[0]
              : formData.fecha_nacimiento,
            rol_adulto: updated?.rol_adulto ?? formData.rol_adulto,
            seisena: updated?.seisena ?? formData.seisena,
            patrulla: updated?.patrulla ?? formData.patrulla,
            equipo_pioneros: updated?.equipo_pioneros ?? formData.equipo_pioneros,
            comunidad_rovers: updated?.comunidad_rovers ?? formData.comunidad_rovers,
            avatar_url: updated?.avatar_url ?? avatarUrl,
            username: updated?.username ?? formData.username,
            username_updated_at:
              updated?.username_updated_at ?? formData.username_updated_at,
          };
          setFormData(refreshed);
          setOriginalData(refreshed);
        }
      } else {
        const { error: profileError } = await supabase
          .from("profiles")
          .update(profileData)
          .eq("user_id", auth.id);
        if (profileError) throw profileError;
      }

      toast({
        title: "¡Perfil actualizado!",
        description: "Tus cambios han sido guardados.",
      });

  // Recargar perfil desde servidor para reflejar cambios (sin mostrar loading)
  if (!isLocalBackend()) await getProfile(false);

      // Limpiar estados temporales
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (error: any) {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/perfil")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Editar perfil</h1>
            <p className="text-sm text-muted-foreground">
              Actualiza tu información personal y scout
            </p>
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
            <h2 className="text-xl font-medium mb-1">
              {formData.nombre_completo || "Usuario Scout"}
            </h2>
            <p className="text-sm text-muted-foreground mb-3">{userEmail}</p>
            <div className="flex gap-2 justify-center sm:justify-start">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  {formData.avatar_url ? "Cambiar foto" : "Subir foto"}
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
                      const auth = await getAuthUser();
                      if (!auth) return;

                      if (isLocalBackend()) {
                        await updateLocalProfile({
                          user_id: auth.id,
                          avatar_url: null,
                        } as any);
                      } else {
                        await supabase
                          .from("profiles")
                          .update({ avatar_url: null })
                          .eq("user_id", auth.id);
                      }

                      setFormData((prev) => ({ ...prev, avatar_url: null }));
                      setOriginalData((prev) =>
                        prev ? { ...prev, avatar_url: null } : prev,
                      );
                      toast({
                        title: "Foto eliminada",
                        description: "Tu foto de perfil ha sido eliminada",
                      });
                    } catch (error: any) {
                      toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Eliminar foto
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG o GIF. Máximo 4MB
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Datos personales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Personal</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre_completo">Nombre completo *</Label>
                <Input
                  id="nombre_completo"
                  name="nombre_completo"
                  value={formData.nombre_completo}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className={`bg-background ${
                    formData.nombre_completo.length > 0 &&
                    formData.nombre_completo.length < 3
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {formData.nombre_completo.length > 0 &&
                  formData.nombre_completo.length < 3 && (
                    <p className="text-xs text-destructive">
                      Mínimo 3 caracteres
                    </p>
                  )}
                {formData.nombre_completo.length > 90 && (
                  <p className="text-xs text-muted-foreground">
                    {100 - formData.nombre_completo.length} caracteres restantes
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">
                  Nombre de usuario
                  {formData.username_updated_at &&
                    (() => {
                      const lastUpdate = new Date(formData.username_updated_at);
                      const daysSince = Math.floor(
                        (Date.now() - lastUpdate.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      const daysRemaining = 7 - daysSince;

                      if (daysRemaining > 0) {
                        return (
                          <span className="ml-2 text-xs text-muted-foreground font-normal">
                            (podrás cambiar en {daysRemaining} día
                            {daysRemaining !== 1 ? "s" : ""})
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    @
                  </span>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => {
                      const value = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9._-]/g, "");
                      setFormData((prev) => ({ ...prev, username: value }));
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
                  {formData.username.length > 0 &&
                    formData.username.length < 3 && (
                      <span className="block text-destructive mt-1">
                        Mínimo 3 caracteres
                      </span>
                    )}
                  {!formData.username && " Solo se puede cambiar cada 7 días."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha_nacimiento">Fecha de nacimiento *</Label>
                <Input
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="bg-background"
                  required
                  max={maxDate}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  name="edad"
                  type="number"
                  value={formData.edad || ""}
                  disabled
                  className="bg-muted"
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
                  inputMode="email"
                  autoComplete="email"
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
                    onClick={() => setShowPassword((s) => !s)}
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
                    <option value="Miembro del Comité">
                      Miembro del Comité
                    </option>
                    <option value="Familiar de Scout">Familiar de Scout</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={saving || !hasChanges()}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {hasChanges() ? "Guardar cambios" : "Sin cambios"}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (hasChanges()) {
                  if (confirm("¿Descartar los cambios sin guardar?")) {
                    navigate("/perfil");
                  }
                } else {
                  navigate("/perfil");
                }
              }}
            >
              Cancelar
            </Button>
          </div>

          {hasChanges() && (
            <div className="mt-3 p-3 bg-primary/10 border border-primary/20 rounded-md">
              <p className="text-sm text-primary font-medium">
                ⚠️ Tienes cambios sin guardar
              </p>
            </div>
          )}
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

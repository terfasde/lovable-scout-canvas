import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { isLocalBackend, apiFetch, getAuthUser } from "@/lib/backend";
import UserAvatar from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users as UsersIcon,
  SlidersHorizontal,
  UserPlus,
  Settings,
  Crown,
  Shield,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createThread,
  listThreads,
  listComments,
  addComment,
  deleteThread,
  isAdmin,
  type ThreadWithAuthor,
} from "@/lib/threads";
import {
  listGroups,
  createGroup,
  joinGroup,
  leaveGroup,
  type GroupWithMemberCount,
} from "@/lib/groups";
import { Trash2, Image as ImageIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Profile = {
  user_id: string;
  nombre_completo: string | null;
  avatar_url: string | null;
  edad: number | null;
  is_public: boolean | null;
  username?: string | null;
};

const Usuarios = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ramaFilter, setRamaFilter] = useState<string>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("public");
  const [sortBy, setSortBy] = useState<string>("name");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("personas");
  const [threads, setThreads] = useState<ThreadWithAuthor[]>([]);
  const [newThreadText, setNewThreadText] = useState("");
  const [newThreadFile, setNewThreadFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [openThreadId, setOpenThreadId] = useState<string | null>(null);
  const [threadComments, setThreadComments] = useState<any[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [userEmail, setUserEmail] = useState<string>("");

  // Estados para grupos
  const [groups, setGroups] = useState<GroupWithMemberCount[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupCover, setNewGroupCover] = useState<File | null>(null);
  const [groupCoverPreview, setGroupCoverPreview] = useState<string | null>(
    null,
  );
  const [creatingGroup, setCreatingGroup] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const auth = await getAuthUser();
        if (!auth) {
          navigate("/auth");
          return;
        }
        setCurrentUserId(auth.id);
        setUserEmail(auth.email || "");

        let rows: Profile[] = [];
        if (isLocalBackend()) {
          const data = await apiFetch(
            "/profiles/directory?q=&limit=200&offset=0",
          );
          rows = (data as any[]).map((r: any) => ({
            user_id: String(r.user_id),
            nombre_completo: r.nombre_completo ?? null,
            avatar_url: r.avatar_url ?? null,
            edad: r.edad ?? null,
            is_public: r.is_public ?? null,
            username: r.username ?? null,
          }));
        } else {
          // Preferir RPC que lista el directorio completo (bypasa RLS de profiles con SECURITY DEFINER)
          const { data: rpcData, error: rpcError } = await supabase.rpc(
            "list_profiles_directory",
          );
          let data: any[] | null = rpcData as any[] | null;
          if (rpcError) {
            // Fallback a lectura directa (respetando RLS)
            const { data: d2, error: e2 } = await supabase
              .from("profiles")
              .select("user_id, nombre_completo, avatar_url, edad, is_public")
              .order("nombre_completo", { ascending: true });
            if (e2) throw e2;
            data = d2 as any[] | null;
          }
          rows = (data || []).map((r: any) => ({
            user_id: String(r.user_id),
            nombre_completo: r.nombre_completo ?? null,
            avatar_url: r.avatar_url ?? null,
            edad: r.edad ?? null,
            is_public: r.is_public ?? null,
            username: r.username ?? null,
          }));
        }

        setProfiles(rows);
        setFilteredProfiles(rows);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await listThreads(50);
        // Enriquecer con datos del autor
        const enriched: ThreadWithAuthor[] = data.map((thread) => {
          const author = profiles.find((p) => p.user_id === thread.author_id);
          return {
            ...thread,
            author_name: author?.nombre_completo,
            author_username: author?.username,
            author_avatar: author?.avatar_url,
          };
        });
        setThreads(enriched);
      } catch (e) {
        console.error("Error cargando hilos:", e);
      }
    })();
  }, [profiles]);

  // Cargar grupos
  useEffect(() => {
    if (activeTab === "grupos") {
      loadGroups();
    }
  }, [activeTab]);

  const loadGroups = async () => {
    try {
      const data = await listGroups();
      setGroups(data);
    } catch (e) {
      console.error("Error cargando grupos:", e);
    }
  };

  useEffect(() => {
    if (
      !searchTerm.trim() &&
      ramaFilter === "all" &&
      visibilityFilter === "all"
    ) {
      // Apply only sorting
      applySorting(profiles);
      return;
    }

    let filtered = profiles;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((p) =>
        p.nombre_completo?.toLowerCase().includes(term),
      );
    }

    // Filter by rama
    if (ramaFilter !== "all") {
      filtered = filtered.filter((p) => getRamaActual(p.edad) === ramaFilter);
    }

    // Filter by visibility
    if (visibilityFilter === "public") {
      filtered = filtered.filter((p) => p.is_public === true);
    } else if (visibilityFilter === "private") {
      filtered = filtered.filter((p) => p.is_public !== true);
    }

    applySorting(filtered);
  }, [searchTerm, ramaFilter, visibilityFilter, sortBy, profiles]);

  const applySorting = (data: Profile[]) => {
    const sorted = [...data];

    if (sortBy === "name") {
      sorted.sort((a, b) =>
        (a.nombre_completo || "").localeCompare(b.nombre_completo || ""),
      );
    } else if (sortBy === "age-asc") {
      sorted.sort((a, b) => (a.edad || 0) - (b.edad || 0));
    } else if (sortBy === "age-desc") {
      sorted.sort((a, b) => (b.edad || 0) - (a.edad || 0));
    } else if (sortBy === "rama") {
      sorted.sort((a, b) => {
        const ramaOrder: { [key: string]: number } = {
          Manada: 1,
          Tropa: 2,
          Pionero: 3,
          Rover: 4,
          Adulto: 5,
          Scout: 6,
        };
        return (
          (ramaOrder[getRamaActual(a.edad)] || 99) -
          (ramaOrder[getRamaActual(b.edad)] || 99)
        );
      });
    }

    setFilteredProfiles(sorted);
  };

  const submitThread = async () => {
    if (!newThreadText.trim() && !newThreadFile) return;

    // Validación de longitud
    if (newThreadText.length > 500) {
      toast({
        title: "Contenido muy largo",
        description: "El hilo no puede exceder 500 caracteres",
        variant: "destructive",
      });
      return;
    }

    try {
      setPosting(true);
      const thread = await createThread(
        newThreadText.trim(),
        newThreadFile || undefined,
      );

      // Enriquecer con datos del autor actual
      const author = profiles.find((p) => p.user_id === currentUserId);
      const enriched: ThreadWithAuthor = {
        ...thread,
        author_name: author?.nombre_completo,
        author_username: author?.username,
        author_avatar: author?.avatar_url,
      };

      setThreads((prev) => [enriched, ...prev]);
      setNewThreadText("");
      setNewThreadFile(null);
      setImagePreview(null);

      toast({
        title: "Hilo publicado",
        description: "Tu hilo se ha publicado correctamente",
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message || "No se pudo publicar el hilo",
        variant: "destructive",
      });
    } finally {
      setPosting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validación de tipo
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Tipo de archivo no válido",
          description: "Solo se permiten imágenes (JPG, PNG, GIF, WEBP)",
          variant: "destructive",
        });
        return;
      }

      // Validación de tamaño
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: "Archivo muy grande",
          description: "La imagen no puede superar 5MB",
          variant: "destructive",
        });
        return;
      }

      setNewThreadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewThreadFile(null);
    setImagePreview(null);
  };

  const openThread = async (threadId: string) => {
    setOpenThreadId(threadId);
    try {
      const comments = await listComments(threadId);
      setThreadComments(comments);
    } catch (e) {
      console.error(e);
    }
  };

  const sendComment = async () => {
    if (!openThreadId || !newCommentText.trim()) return;
    try {
      const c = await addComment(openThreadId, newCommentText.trim());
      setThreadComments((prev) => [...prev, c]);
      setNewCommentText("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteThread = async (threadId: string) => {
    if (!confirm("¿Estás seguro de eliminar este hilo?")) return;
    try {
      await deleteThread(threadId);
      setThreads((prev) => prev.filter((t) => t.id !== threadId));
      toast({
        title: "Hilo eliminado",
        description: "El hilo se eliminó correctamente",
      });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  // Funciones para grupos
  const handleGroupCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Tipo de archivo no válido",
          description: "Solo se permiten imágenes (JPG, PNG, GIF, WEBP)",
          variant: "destructive",
        });
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "Archivo muy grande",
          description: "La imagen no puede superar 5MB",
          variant: "destructive",
        });
        return;
      }

      setNewGroupCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Campo requerido",
        description: "El nombre del grupo es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      setCreatingGroup(true);
      await createGroup(
        newGroupName.trim(),
        newGroupDescription.trim() || null,
        newGroupCover || undefined,
      );

      toast({
        title: "Grupo creado",
        description: "El grupo se ha creado correctamente",
      });

      setNewGroupName("");
      setNewGroupDescription("");
      setNewGroupCover(null);
      setGroupCoverPreview(null);
      setShowCreateGroup(false);
      await loadGroups();
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message || "No se pudo crear el grupo",
        variant: "destructive",
      });
    } finally {
      setCreatingGroup(false);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      await joinGroup(groupId);
      toast({
        title: "Te has unido al grupo",
        description: "Ahora eres miembro de este grupo",
      });
      await loadGroups();
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    if (!confirm("¿Estás seguro de que quieres salir de este grupo?")) return;

    try {
      await leaveGroup(groupId);
      toast({
        title: "Has salido del grupo",
        description: "Ya no eres miembro de este grupo",
      });
      await loadGroups();
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const getRamaActual = (edad: number | null) => {
    if (!edad) return "Scout";
    if (edad >= 21) return "Adulto";
    if (edad >= 18) return "Rover";
    if (edad >= 15) return "Pionero";
    if (edad >= 11) return "Tropa";
    if (edad >= 7) return "Manada";
    return "Scout";
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
      <div className="h-16 sm:h-20"></div>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-4">
          <UsersIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Comuni 7</h1>
            <p className="text-sm text-muted-foreground">
              Personas y hilos de la comunidad
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="personas">Personas</TabsTrigger>
            <TabsTrigger value="hilos">Hilos</TabsTrigger>
            <TabsTrigger value="grupos">Grupos</TabsTrigger>
          </TabsList>

          <TabsContent value="personas">
            {/* Búsqueda */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filtros y ordenamiento */}
            <div className="grid gap-3 sm:grid-cols-3 mb-6">
              {/* Filtro por rama */}
              <div>
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Rama
                </label>
                <Select value={ramaFilter} onValueChange={setRamaFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todas las ramas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ramas</SelectItem>
                    <SelectItem value="Manada">
                      🐺 Manada (7-10 años)
                    </SelectItem>
                    <SelectItem value="Tropa">⛺ Tropa (11-14 años)</SelectItem>
                    <SelectItem value="Pionero">
                      🏕️ Pioneros (15-17 años)
                    </SelectItem>
                    <SelectItem value="Rover">
                      🎒 Rovers (18-20 años)
                    </SelectItem>
                    <SelectItem value="Adulto">
                      👤 Adultos (21+ años)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por visibilidad */}
              <div>
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Privacidad
                </label>
                <Select
                  value={visibilityFilter}
                  onValueChange={setVisibilityFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos los perfiles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los perfiles</SelectItem>
                    <SelectItem value="public">🌍 Solo públicos</SelectItem>
                    <SelectItem value="private">🔒 Solo privados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ordenamiento */}
              <div>
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Ordenar por
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Nombre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre (A-Z)</SelectItem>
                    <SelectItem value="age-asc">
                      Edad (menor a mayor)
                    </SelectItem>
                    <SelectItem value="age-desc">
                      Edad (mayor a menor)
                    </SelectItem>
                    <SelectItem value="rama">Rama (Manada → Adulto)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtros activos (badges) */}
            {(ramaFilter !== "all" ||
              visibilityFilter !== "all" ||
              searchTerm) && (
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filtros activos:</span>
                </div>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Búsqueda: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {ramaFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {ramaFilter}
                    <button
                      onClick={() => setRamaFilter("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {visibilityFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {visibilityFilter === "public"
                      ? "🌍 Públicos"
                      : "🔒 Privados"}
                    <button
                      onClick={() => setVisibilityFilter("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {(ramaFilter !== "all" ||
                  visibilityFilter !== "all" ||
                  searchTerm) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm("");
                      setRamaFilter("all");
                      setVisibilityFilter("all");
                    }}
                    className="h-6 text-xs"
                  >
                    Limpiar todo
                  </Button>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="mb-6 text-sm text-muted-foreground">
              {filteredProfiles.length === profiles.length ? (
                <p>
                  {profiles.length} {profiles.length === 1 ? "scout" : "scouts"}{" "}
                  en total
                </p>
              ) : (
                <p>
                  {filteredProfiles.length}{" "}
                  {filteredProfiles.length === 1 ? "resultado" : "resultados"}{" "}
                  de {profiles.length}
                </p>
              )}
            </div>

            {/* Grid de usuarios */}
            {filteredProfiles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron scouts.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProfiles.map((profile) => {
                  const isCurrentUser = profile.user_id === currentUserId;
                  return (
                    <Card
                      key={profile.user_id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <UserAvatar
                            avatarUrl={profile.avatar_url}
                            userName={profile.nombre_completo}
                            size="lg"
                            className="w-16 h-16 text-xl flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">
                                {profile.nombre_completo || "Scout"}
                              </h3>
                              {isCurrentUser && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                                  Tú
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <span>{getRamaActual(profile.edad)}</span>
                              {profile.edad && (
                                <span>• {profile.edad} años</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {profile.is_public ? (
                                <span className="text-xs px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                  🌍 Público
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                                  🔒 Privado
                                </span>
                              )}
                            </div>
                            {isCurrentUser ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate("/perfil")}
                              >
                                Ver mi perfil
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={() =>
                                  navigate(`/perfil-public/${profile.user_id}`)
                                }
                              >
                                Ver perfil
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hilos">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <UserAvatar
                    avatarUrl={
                      profiles.find((p) => p.user_id === currentUserId)
                        ?.avatar_url || null
                    }
                    userName={
                      profiles.find((p) => p.user_id === currentUserId)
                        ?.nombre_completo || null
                    }
                    size="md"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="¿Qué está pasando?"
                      value={newThreadText}
                      onChange={(e) => setNewThreadText(e.target.value)}
                      className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
                      maxLength={500}
                    />

                    {newThreadText.length > 0 && (
                      <div
                        className={`text-xs text-right ${
                          newThreadText.length > 450
                            ? "text-destructive font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {newThreadText.length}/500
                      </div>
                    )}

                    {imagePreview && (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="rounded-xl max-h-64 object-cover border"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-full transition-colors">
                          <ImageIcon className="h-5 w-5" />
                          <span className="text-sm font-medium">Imagen</span>
                        </div>
                      </label>

                      <Button
                        onClick={submitThread}
                        disabled={
                          posting || (!newThreadText.trim() && !newThreadFile)
                        }
                        className="rounded-full px-6"
                      >
                        {posting ? "Publicando..." : "Publicar"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {threads.map((t) => {
                const isThreadAuthor = t.author_id === currentUserId;
                const canDelete = isThreadAuthor || isAdmin(userEmail);

                return (
                  <Card
                    key={t.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <UserAvatar
                          avatarUrl={t.author_avatar || null}
                          userName={t.author_name || null}
                          size="md"
                          className="flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold hover:underline cursor-pointer">
                                {t.author_name || "Scout"}
                              </span>
                              {t.author_username && (
                                <span className="text-sm text-muted-foreground">
                                  @{t.author_username}
                                </span>
                              )}
                              <span className="text-sm text-muted-foreground">
                                ·{" "}
                                {new Date(t.created_at).toLocaleDateString(
                                  "es-ES",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                            </div>
                            {canDelete && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteThread(t.id)}
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="text-base whitespace-pre-wrap mb-3">
                            {t.content}
                          </div>

                          {t.image_url && (
                            <div className="rounded-xl border overflow-hidden mb-3">
                              <img
                                src={t.image_url}
                                alt="imagen del hilo"
                                className="w-full max-h-96 object-cover"
                              />
                            </div>
                          )}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openThread(t.id)}
                                className="text-muted-foreground hover:text-primary"
                              >
                                💬 Comentarios
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Comentarios</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-3 max-h-[50vh] overflow-auto">
                                {threadComments.length === 0 ? (
                                  <div className="text-sm text-muted-foreground text-center py-8">
                                    Sé el primero en comentar
                                  </div>
                                ) : (
                                  threadComments.map((c) => {
                                    const commentAuthor = profiles.find(
                                      (p) => p.user_id === c.author_id,
                                    );
                                    return (
                                      <div
                                        key={c.id}
                                        className="flex gap-3 border-b pb-3 last:border-0"
                                      >
                                        <UserAvatar
                                          avatarUrl={
                                            commentAuthor?.avatar_url || null
                                          }
                                          userName={
                                            commentAuthor?.nombre_completo ||
                                            null
                                          }
                                          size="sm"
                                          className="flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm">
                                              {commentAuthor?.nombre_completo ||
                                                "Scout"}
                                            </span>
                                            {commentAuthor?.username && (
                                              <span className="text-xs text-muted-foreground">
                                                @{commentAuthor.username}
                                              </span>
                                            )}
                                            <span className="text-xs text-muted-foreground">
                                              ·{" "}
                                              {new Date(
                                                c.created_at,
                                              ).toLocaleDateString("es-ES", {
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </span>
                                          </div>
                                          <div className="text-sm">
                                            {c.content}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                              <div className="flex gap-2 pt-2 border-t">
                                <Input
                                  placeholder="Escribe un comentario"
                                  value={newCommentText}
                                  onChange={(e) =>
                                    setNewCommentText(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      sendComment();
                                    }
                                  }}
                                />
                                <Button onClick={sendComment}>Enviar</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="grupos">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Grupos de la comunidad</h2>
              <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Crear Grupo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Crear nuevo grupo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Nombre del grupo *
                      </label>
                      <Input
                        placeholder="Ej: Patrulla Águila"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        maxLength={100}
                      />
                      {newGroupName.length > 90 && (
                        <p className="text-xs text-muted-foreground">
                          {100 - newGroupName.length} caracteres restantes
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Descripción</label>
                      <Textarea
                        placeholder="Describe de qué trata el grupo..."
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                        maxLength={500}
                        className="min-h-[100px]"
                      />
                      {newGroupDescription.length > 450 && (
                        <p
                          className={`text-xs ${newGroupDescription.length > 480 ? "text-destructive" : "text-muted-foreground"}`}
                        >
                          {500 - newGroupDescription.length} caracteres
                          restantes
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Imagen de portada
                      </label>
                      {groupCoverPreview ? (
                        <div className="relative">
                          <img
                            src={groupCoverPreview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => {
                              setNewGroupCover(null);
                              setGroupCoverPreview(null);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors">
                            <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Click para subir imagen
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              JPG, PNG, GIF o WEBP (máx. 5MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleGroupCoverChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleCreateGroup}
                        disabled={creatingGroup || !newGroupName.trim()}
                        className="flex-1"
                      >
                        {creatingGroup ? "Creando..." : "Crear Grupo"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowCreateGroup(false);
                          setNewGroupName("");
                          setNewGroupDescription("");
                          setNewGroupCover(null);
                          setGroupCoverPreview(null);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => {
                const isMember = !!group.user_role;
                const isOwner = group.user_role === "owner";
                const isAdmin = group.user_role === "admin";

                return (
                  <Card
                    key={group.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {group.cover_image && (
                      <div className="h-32 overflow-hidden">
                        <img
                          src={group.cover_image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        {isOwner && (
                          <Crown className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        )}
                        {isAdmin && !isOwner && (
                          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        )}
                      </div>

                      {group.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {group.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground">
                          {group.member_count}{" "}
                          {group.member_count === 1 ? "miembro" : "miembros"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(group.created_at).toLocaleDateString(
                            "es-ES",
                            {
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {isMember ? (
                          <>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => navigate(`/grupos/${group.id}`)}
                            >
                              Abrir
                            </Button>
                            {!isOwner && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleLeaveGroup(group.id)}
                              >
                                Salir
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => handleJoinGroup(group.id)}
                          >
                            <UserPlus className="h-4 w-4" />
                            Unirse
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {groups.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No hay grupos aún
                  </p>
                  <Button
                    onClick={() => setShowCreateGroup(true)}
                    className="gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Crear el primer grupo
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Usuarios;

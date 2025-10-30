import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import UserAvatar from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Users as UsersIcon, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Profile = {
  user_id: string;
  nombre_completo: string | null;
  avatar_url: string | null;
  edad: number | null;
  is_public: boolean | null;
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
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // Requiere login
          navigate('/auth');
          return;
        }
        setCurrentUserId(user.id);

        // Preferir RPC que lista el directorio completo (bypasa RLS de profiles con SECURITY DEFINER)
        const { data: rpcData, error: rpcError } = await supabase.rpc('list_profiles_directory');

        let data: any[] | null = rpcData as any[] | null;
        if (rpcError) {
          // Fallback a lectura directa (respetando RLS)
          const { data: d2, error: e2 } = await supabase
            .from('profiles')
            .select('user_id, nombre_completo, avatar_url, edad, is_public')
            .order('nombre_completo', { ascending: true });
          if (e2) throw e2;
          data = d2 as any[] | null;
        }

        const rows: Profile[] = (data || []).map((r: any) => ({
          user_id: String(r.user_id),
          nombre_completo: r.nombre_completo ?? null,
          avatar_url: r.avatar_url ?? null,
          edad: r.edad ?? null,
          is_public: r.is_public ?? null,
        }));

        setProfiles(rows);
        setFilteredProfiles(rows);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim() && ramaFilter === "all" && visibilityFilter === "all") {
      // Apply only sorting
      applySorting(profiles);
      return;
    }

    let filtered = profiles;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.nombre_completo?.toLowerCase().includes(term)
      );
    }

    // Filter by rama
    if (ramaFilter !== "all") {
      filtered = filtered.filter(p => getRamaActual(p.edad) === ramaFilter);
    }

    // Filter by visibility
    if (visibilityFilter === "public") {
      filtered = filtered.filter(p => p.is_public === true);
    } else if (visibilityFilter === "private") {
      filtered = filtered.filter(p => p.is_public !== true);
    }

    applySorting(filtered);
  }, [searchTerm, ramaFilter, visibilityFilter, sortBy, profiles]);

  const applySorting = (data: Profile[]) => {
    let sorted = [...data];
    
    if (sortBy === "name") {
      sorted.sort((a, b) => 
        (a.nombre_completo || "").localeCompare(b.nombre_completo || "")
      );
    } else if (sortBy === "age-asc") {
      sorted.sort((a, b) => (a.edad || 0) - (b.edad || 0));
    } else if (sortBy === "age-desc") {
      sorted.sort((a, b) => (b.edad || 0) - (a.edad || 0));
    } else if (sortBy === "rama") {
      sorted.sort((a, b) => {
        const ramaOrder: { [key: string]: number } = {
          "Manada": 1,
          "Tropa": 2,
          "Pionero": 3,
          "Rover": 4,
          "Adulto": 5,
          "Scout": 6,
        };
        return (ramaOrder[getRamaActual(a.edad)] || 99) - (ramaOrder[getRamaActual(b.edad)] || 99);
      });
    }

    setFilteredProfiles(sorted);
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
      <div className="h-16 sm:h-20"></div>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <UsersIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Scouts del Grupo</h1>
            <p className="text-sm text-muted-foreground">Descubre y conecta con otros scouts</p>
          </div>
        </div>

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
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Rama</label>
            <Select value={ramaFilter} onValueChange={setRamaFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todas las ramas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ramas</SelectItem>
                <SelectItem value="Manada">🐺 Manada (7-10 años)</SelectItem>
                <SelectItem value="Tropa">⛺ Tropa (11-14 años)</SelectItem>
                <SelectItem value="Pionero">🏕️ Pioneros (15-17 años)</SelectItem>
                <SelectItem value="Rover">🎒 Rovers (18-20 años)</SelectItem>
                <SelectItem value="Adulto">👤 Adultos (21+ años)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por visibilidad */}
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Privacidad</label>
            <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
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
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Ordenar por</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Nombre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre (A-Z)</SelectItem>
                <SelectItem value="age-asc">Edad (menor a mayor)</SelectItem>
                <SelectItem value="age-desc">Edad (mayor a menor)</SelectItem>
                <SelectItem value="rama">Rama (Manada → Adulto)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros activos (badges) */}
        {(ramaFilter !== "all" || visibilityFilter !== "all" || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros activos:</span>
            </div>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Búsqueda: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {ramaFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {ramaFilter}
                <button onClick={() => setRamaFilter("all")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {visibilityFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {visibilityFilter === "public" ? "🌍 Públicos" : "🔒 Privados"}
                <button onClick={() => setVisibilityFilter("all")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {(ramaFilter !== "all" || visibilityFilter !== "all" || searchTerm) && (
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
            <p>{profiles.length} {profiles.length === 1 ? 'scout' : 'scouts'} en total</p>
          ) : (
            <p>{filteredProfiles.length} {filteredProfiles.length === 1 ? 'resultado' : 'resultados'} de {profiles.length}</p>
          )}
        </div>

        {/* Grid de usuarios */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron scouts.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map((profile) => {
              const isCurrentUser = profile.user_id === currentUserId;
              return (
                <Card key={profile.user_id} className="hover:shadow-lg transition-shadow">
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
                            {profile.nombre_completo || 'Scout'}
                          </h3>
                          {isCurrentUser && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Tú</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <span>{getRamaActual(profile.edad)}</span>
                          {profile.edad && <span>• {profile.edad} años</span>}
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
                            onClick={() => navigate('/perfil')}
                          >
                            Ver mi perfil
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => navigate(`/perfil-public/${profile.user_id}`)}
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
      </div>
    </div>
  );
};

export default Usuarios;

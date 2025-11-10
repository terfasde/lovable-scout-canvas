import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Calendar,
  TrendingUp,
  Award,
  ArrowLeft,
  UserCheck,
  Activity,
} from "lucide-react";
import { getAuthUser } from "@/lib/backend";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ScoutStats {
  totalScouts: number;
  porRama: {
    manada: number;
    tropa: number;
    pioneros: number;
    rovers: number;
  };
}

const DashboardCoordinador = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [coordinadorProfile, setCoordinadorProfile] = useState<Profile | null>(null);
  const [scouts, setScouts] = useState<Profile[]>([]);
  const [stats, setStats] = useState<ScoutStats>({
    totalScouts: 0,
    porRama: { manada: 0, tropa: 0, pioneros: 0, rovers: 0 },
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const auth = await getAuthUser();
      if (!auth) {
        navigate("/auth");
        return;
      }

      // Obtener perfil del coordinador
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", auth.id)
        .single();

      if (profileError) throw profileError;

      // Verificar que sea educador
      if (!profile || profile.edad < 21 || profile.rol_adulto !== "Educador/a") {
        toast({
          title: "Acceso restringido",
          description: "Solo educadores pueden acceder a este dashboard",
          variant: "destructive",
        });
        navigate("/perfil");
        return;
      }

      setCoordinadorProfile(profile);

      // Obtener scouts según las secciones que coordina
      await loadScouts(profile);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadScouts = async (coordinador: Profile) => {
    try {
      const filters: string[] = [];

      // Construir query según las unidades que coordina
      if (coordinador.seisena) {
        filters.push(`seisena.eq.${coordinador.seisena}`);
      }
      if (coordinador.patrulla) {
        filters.push(`patrulla.eq.${coordinador.patrulla}`);
      }
      if (coordinador.equipo_pioneros) {
        filters.push(`equipo_pioneros.eq.${coordinador.equipo_pioneros}`);
      }
      if (coordinador.comunidad_rovers) {
        filters.push(`comunidad_rovers.eq.${coordinador.comunidad_rovers}`);
      }

      if (filters.length === 0) {
        setScouts([]);
        return;
      }

      // Obtener scouts de las unidades coordinadas
      let query = supabase.from("profiles").select("*");

      // Aplicar filtros OR para cada unidad
      const scoutsData: Profile[] = [];
      
      if (coordinador.seisena) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("seisena", coordinador.seisena)
          .gte("edad", 7)
          .lte("edad", 10);
        if (data) scoutsData.push(...data);
      }

      if (coordinador.patrulla) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("patrulla", coordinador.patrulla)
          .gte("edad", 11)
          .lte("edad", 14);
        if (data) scoutsData.push(...data);
      }

      if (coordinador.equipo_pioneros) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("equipo_pioneros", coordinador.equipo_pioneros)
          .gte("edad", 15)
          .lte("edad", 17);
        if (data) scoutsData.push(...data);
      }

      if (coordinador.comunidad_rovers) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("comunidad_rovers", coordinador.comunidad_rovers)
          .gte("edad", 18)
          .lte("edad", 20);
        if (data) scoutsData.push(...data);
      }

      // Eliminar duplicados por user_id
      const uniqueScouts = Array.from(
        new Map(scoutsData.map((s) => [s.user_id, s])).values()
      );

      setScouts(uniqueScouts);

      // Calcular estadísticas
      const porRama = {
        manada: uniqueScouts.filter((s) => s.edad >= 7 && s.edad <= 10).length,
        tropa: uniqueScouts.filter((s) => s.edad >= 11 && s.edad <= 14).length,
        pioneros: uniqueScouts.filter((s) => s.edad >= 15 && s.edad <= 17).length,
        rovers: uniqueScouts.filter((s) => s.edad >= 18 && s.edad <= 20).length,
      };

      setStats({
        totalScouts: uniqueScouts.length,
        porRama,
      });
    } catch (error: any) {
      toast({
        title: "Error al cargar scouts",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRamaActual = (edad: number | null) => {
    if (!edad) return "Sin rama";
    if (edad >= 21) return "Adulto";
    if (edad >= 18) return "Rover";
    if (edad >= 15) return "Pionero";
    if (edad >= 11) return "Tropa";
    if (edad >= 7) return "Manada";
    return "Sin rama";
  };

  const getRamaBadgeColor = (edad: number | null) => {
    if (!edad) return "secondary";
    if (edad >= 18) return "default";
    if (edad >= 15) return "destructive";
    if (edad >= 11) return "outline";
    if (edad >= 7) return "secondary";
    return "secondary";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-20"></div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="h-20"></div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/perfil")}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Dashboard de Coordinación</h1>
            <p className="text-muted-foreground">
              Panel de gestión para educadores
            </p>
          </div>
        </div>

        {/* Resumen de unidades coordinadas */}
        {coordinadorProfile && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Mis secciones
              </CardTitle>
              <CardDescription>
                Unidades que coordinas actualmente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {coordinadorProfile.seisena && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">
                      Manada
                    </p>
                    <p className="font-semibold">{coordinadorProfile.seisena}</p>
                  </div>
                )}
                {coordinadorProfile.patrulla && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">
                      Tropa
                    </p>
                    <p className="font-semibold">{coordinadorProfile.patrulla}</p>
                  </div>
                )}
                {coordinadorProfile.equipo_pioneros && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">
                      Pioneros
                    </p>
                    <p className="font-semibold">
                      {coordinadorProfile.equipo_pioneros}
                    </p>
                  </div>
                )}
                {coordinadorProfile.comunidad_rovers && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">
                      Rovers
                    </p>
                    <p className="font-semibold">
                      {coordinadorProfile.comunidad_rovers}
                    </p>
                  </div>
                )}
              </div>
              {!coordinadorProfile.seisena &&
                !coordinadorProfile.patrulla &&
                !coordinadorProfile.equipo_pioneros &&
                !coordinadorProfile.comunidad_rovers && (
                  <p className="text-sm text-muted-foreground">
                    No has asignado ninguna sección. Ve a{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => navigate("/perfil/editar")}
                    >
                      editar tu perfil
                    </Button>{" "}
                    para agregar las unidades que coordinas.
                  </p>
                )}
            </CardContent>
          </Card>
        )}

        {/* Estadísticas generales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Scouts
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalScouts}</div>
              <p className="text-xs text-muted-foreground">
                En tus secciones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manada</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.porRama.manada}</div>
              <p className="text-xs text-muted-foreground">7-10 años</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tropa</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.porRama.tropa}</div>
              <p className="text-xs text-muted-foreground">11-14 años</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pioneros/Rovers
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.porRama.pioneros + stats.porRama.rovers}
              </div>
              <p className="text-xs text-muted-foreground">15-20 años</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs con contenido */}
        <Tabs defaultValue="scouts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="scouts">
              <Users className="w-4 h-4 mr-2" />
              Mis Scouts
            </TabsTrigger>
            <TabsTrigger value="stats">
              <TrendingUp className="w-4 h-4 mr-2" />
              Estadísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Listado de Scouts</CardTitle>
                <CardDescription>
                  Scouts en las secciones que coordinas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scouts.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No hay scouts en tus secciones aún
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scouts.map((scout) => (
                      <div
                        key={scout.user_id}
                        className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() =>
                          navigate(`/perfil?userId=${scout.user_id}`)
                        }
                      >
                        <UserAvatar
                          avatarUrl={scout.avatar_url}
                          userName={scout.nombre_completo}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {scout.nombre_completo}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {scout.edad} años
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant={getRamaBadgeColor(scout.edad)}>
                            {getRamaActual(scout.edad)}
                          </Badge>
                          {scout.seisena && (
                            <span className="text-xs text-muted-foreground">
                              {scout.seisena}
                            </span>
                          )}
                          {scout.patrulla && (
                            <span className="text-xs text-muted-foreground">
                              {scout.patrulla}
                            </span>
                          )}
                          {scout.equipo_pioneros && (
                            <span className="text-xs text-muted-foreground">
                              {scout.equipo_pioneros}
                            </span>
                          )}
                          {scout.comunidad_rovers && (
                            <span className="text-xs text-muted-foreground">
                              {scout.comunidad_rovers}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Rama</CardTitle>
                <CardDescription>
                  Cantidad de scouts en cada rama
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Manada (7-10 años)</span>
                      <span className="font-medium">{stats.porRama.manada}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${stats.totalScouts > 0 ? (stats.porRama.manada / stats.totalScouts) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tropa (11-14 años)</span>
                      <span className="font-medium">{stats.porRama.tropa}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${stats.totalScouts > 0 ? (stats.porRama.tropa / stats.totalScouts) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Pioneros (15-17 años)</span>
                      <span className="font-medium">
                        {stats.porRama.pioneros}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{
                          width: `${stats.totalScouts > 0 ? (stats.porRama.pioneros / stats.totalScouts) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rovers (18-20 años)</span>
                      <span className="font-medium">{stats.porRama.rovers}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${stats.totalScouts > 0 ? (stats.porRama.rovers / stats.totalScouts) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardCoordinador;

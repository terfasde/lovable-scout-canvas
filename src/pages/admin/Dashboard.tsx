import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Edit2, Trash2, Users, Shield, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, admins: 0, registradosHoy: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  function computeStats(list: any[]) {
    const admins = list?.filter((u: any) => u.role === "admin").length || 0;
    const registradosHoy = list?.filter((u: any) => u.created_at?.startsWith(new Date().toISOString().slice(0, 10))).length || 0;
    setStats({ total: list?.length || 0, admins, registradosHoy });
  }

  async function fetchData() {
    setLoading(true);
    const { data: usuarios, error } = await supabase.from("profiles").select("*");
    if (error) {
      toast({
        title: "Error al cargar usuarios",
        description: error.message,
        variant: "destructive",
      });
      setUsers([]);
      computeStats([]);
      setLoading(false);
      return;
    }
    setUsers(usuarios || []);
    computeStats(usuarios || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = users.filter(
    (u) =>
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.nombre_completo || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.username || "").toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(u: any) {
    setEditUser(u);
    setEditData({
      user_id: u.user_id,
      email: u.email ?? "",
      nombre_completo: u.nombre_completo ?? "",
      username: u.username ?? "",
      role: u.role ?? "user",
    });
  }
  
  async function handleSaveEdit() {
    if (!editUser) return;
    setSaving(true);
    try {
      const payload = {
        email: editData.email || null,
        nombre_completo: editData.nombre_completo || null,
        username: editData.username || null,
        role: editData.role || "user",
      };
      const { error } = await supabase
        .from("profiles")
        .update(payload)
        .eq("user_id", editUser.user_id);

      if (error) {
        toast({
          title: "No se pudo guardar",
          description: error.message,
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      setUsers((prev) => {
        const updated = prev.map((u) =>
          u.user_id === editUser.user_id ? { ...u, ...payload } : u,
        );
        computeStats(updated);
        return updated;
      });

      toast({
        title: "Cambios guardados",
        description: "El usuario fue actualizado correctamente.",
      });
      setEditUser(null);
      setEditData({});
    } catch (err: any) {
      toast({
        title: "Error inesperado",
        description: err?.message || "No se pudo guardar el usuario.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }
  
  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar usuario? Esta acción no se puede deshacer.")) return;
    try {
      const { error } = await supabase.from("profiles").delete().eq("user_id", id);
      if (error) {
        toast({
          title: "No se pudo eliminar",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      setUsers((prev) => {
        const updated = prev.filter((u) => u.user_id !== id);
        computeStats(updated);
        return updated;
      });
      toast({
        title: "Usuario eliminado",
        description: "El usuario fue eliminado correctamente.",
      });
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast({
        title: "Error inesperado",
        description: "No se pudo eliminar el usuario.",
        variant: "destructive",
      });
    }
  }
  
  function exportCSV() {
    const header = ["ID", "Email", "Nombre", "Username", "Rol", "Fecha de registro"];
    const rows = users.map((u) => [u.user_id, u.email, u.nombre_completo, u.username, u.role || "user", u.created_at?.slice(0, 10)]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv; charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `usuarios-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return <Badge className="bg-red-600 hover:bg-red-700 text-white">Admin</Badge>;
    }
    return <Badge variant="secondary">User</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">Gestiona usuarios y permisos de la plataforma</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="w-5 h-5 text-blue-500" />
                Total de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">Usuarios registrados</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-5 h-5 text-red-500" />
                Administradores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.admins}</div>
              <p className="text-xs text-muted-foreground mt-1">Usuarios con rol admin</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-5 h-5 text-green-500" />
                Registrados Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.registradosHoy}</div>
              <p className="text-xs text-muted-foreground mt-1">Nuevos usuarios hoy</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Buscar por email, nombre o username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button onClick={exportCSV} className="gap-2 whitespace-nowrap">
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Usuarios ({filtered.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Cargando usuarios...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold text-muted-foreground">Email</th>
                      <th className="text-left p-3 font-semibold text-muted-foreground">Nombre</th>
                      <th className="text-left p-3 font-semibold text-muted-foreground">Usuario</th>
                      <th className="text-left p-3 font-semibold text-muted-foreground">Rol</th>
                      <th className="text-right p-3 font-semibold text-muted-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-muted-foreground">
                          No se encontraron usuarios
                        </td>
                      </tr>
                    ) : (
                      filtered.map((u) => (
                        <tr key={u.user_id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="p-3 font-medium">{u.email || "-"}</td>
                          <td className="p-3">{u.nombre_completo || "-"}</td>
                          <td className="p-3 text-muted-foreground">{u.username || "-"}</td>
                          <td className="p-3">
                            {getRoleBadge(u.role || "user")}
                          </td>
                          <td className="p-3 text-right flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(u)}
                              className="gap-1"
                            >
                              <Edit2 className="w-3 h-3" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(u.user_id)}
                              className="gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && !saving && setEditUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editData.email || ""}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="mt-1"
                  disabled={saving}
                />
              </div>
              <div>
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  id="nombre"
                  value={editData.nombre_completo || ""}
                  onChange={(e) => setEditData({ ...editData, nombre_completo: e.target.value })}
                  className="mt-1"
                  disabled={saving}
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editData.username || ""}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  className="mt-1"
                  disabled={saving}
                />
              </div>
              <div>
                <Label htmlFor="role">Rol</Label>
                <Select
                  value={editData.role || "user"}
                  onValueChange={(value) => setEditData({ ...editData, role: value })}
                  disabled={saving}
                >
                  <SelectTrigger id="role" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario Normal</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, admins: 0, registradosHoy: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [editData, setEditData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: usuarios } = await supabase.from("profiles").select("*");
      const admins = usuarios?.filter((u: any) => u.role === "admin").length || 0;
      const registradosHoy = usuarios?.filter((u: any) => u.created_at?.startsWith(new Date().toISOString().slice(0, 10))).length || 0;
      setUsers(usuarios || []);
      setStats({ total: usuarios?.length || 0, admins, registradosHoy });
      setLoading(false);
    }
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
    setEditData(u);
  }
  async function handleSaveEdit() {
    await supabase.from("profiles").update(editData).eq("user_id", editUser.user_id);
    setEditUser(null);
    setEditData({});
    window.location.reload();
  }
  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar usuario?")) return;
    await supabase.from("profiles").delete().eq("user_id", id);
    window.location.reload();
  }
  function exportCSV() {
    const header = ["ID", "Email", "Nombre", "Username", "Rol", "Fecha de registro"];
    const rows = users.map((u) => [u.user_id, u.email, u.nombre_completo, u.username, u.role || "user", u.created_at?.slice(0, 10)]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "usuarios.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Estadísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex gap-8 text-lg">
            <li>Total usuarios: <b>{stats.total}</b></li>
            <li>Admins: <b>{stats.admins}</b></li>
            <li>Registrados hoy: <b>{stats.registradosHoy}</b></li>
          </ul>
        </CardContent>
      </Card>
      <div className="flex gap-4 mb-4">
        <Input placeholder="Buscar usuario..." value={search} onChange={e => setSearch(e.target.value)} />
        <Button onClick={exportCSV}>Exportar CSV</Button>
      </div>
      {loading ? <div>Cargando...</div> : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-2">Email</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Username</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.user_id} className="border-b">
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.nombre_completo}</td>
                  <td className="p-2">{u.username}</td>
                  <td className="p-2">{u.role || "user"}</td>
                  <td className="p-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(u)}>Editar</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(u.user_id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar usuario</h2>
            <label>Email:<br /><Input value={editData.email || ""} onChange={e => setEditData({ ...editData, email: e.target.value })} /></label>
            <label>Nombre:<br /><Input value={editData.nombre_completo || ""} onChange={e => setEditData({ ...editData, nombre_completo: e.target.value })} /></label>
            <label>Username:<br /><Input value={editData.username || ""} onChange={e => setEditData({ ...editData, username: e.target.value })} /></label>
            <label>Rol:<br /><Input value={editData.role || ""} onChange={e => setEditData({ ...editData, role: e.target.value })} /></label>
            <div className="flex gap-4 mt-4">
              <Button onClick={handleSaveEdit}>Guardar</Button>
              <Button variant="outline" onClick={() => setEditUser(null)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSupabaseUser } from '../App';

// Simulación de datos (reemplazar por API real)
const FAKE_USERS = [
  { id: 1, email: 'admin@demo.com', nombre_completo: 'Admin Demo', username: 'admin', created_at: '2025-12-01', role: 'admin' },
  { id: 2, email: 'user1@demo.com', nombre_completo: 'Usuario Uno', username: 'user1', created_at: '2025-12-02', role: 'user' },
  { id: 3, email: 'user2@demo.com', nombre_completo: 'Usuario Dos', username: 'user2', created_at: '2025-12-03', role: 'user' },
];
const FAKE_STATS = {
  totalUsuarios: 3,
  admins: 1,
  registradosHoy: 0,
  actividad: [
    { fecha: '2026-01-05', logins: 2, registros: 0 },
    { fecha: '2026-01-04', logins: 1, registros: 1 },
  ],
};

export default function AdminDashboard() {
  const { user } = useSupabaseUser();
  const isAdmin = user?.email === 'admin@demo.com'; // Simulación: solo ese email es admin
  const [users, setUsers] = useState(FAKE_USERS);
  const [stats, setStats] = useState(FAKE_STATS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  if (!isAdmin) return <Navigate to="/" />;

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.nombre_completo.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  // Eliminar usuario (simulado)
  function handleDeleteUser(id: number) {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
      setSelectedUser(null);
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <h1>Panel de Administración</h1>
      <section style={{ marginBottom: 32 }}>
        <h2>Estadísticas</h2>
        <ul>
          <li>Total de usuarios: {stats.totalUsuarios}</li>
          <li>Admins: {stats.admins}</li>
          <li>Registrados hoy: {stats.registradosHoy}</li>
        </ul>
        <h3>Actividad reciente</h3>
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Logins</th>
              <th>Registros</th>
            </tr>
          </thead>
          <tbody>
            {stats.actividad.map((a, i) => (
              <tr key={i}>
                <td>{a.fecha}</td>
                <td>{a.logins}</td>
                <td>{a.registros}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Usuarios Registrados</h2>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 12, padding: 6, width: 250 }}
        />
        <table border={1} cellPadding={8} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>Rol</th>
              <th>Fecha de registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} style={{ background: selectedUser?.id === u.id ? '#eef' : undefined }}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.nombre_completo}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.created_at}</td>
                <td>
                  <button onClick={() => setSelectedUser(u)}>Ver</button>{' '}
                  <button onClick={() => handleDeleteUser(u.id)} style={{ color: 'red' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <div style={{ marginTop: 24, padding: 16, border: '1px solid #ccc', background: '#fafafa' }}>
            <h3>Detalles de usuario</h3>
            <p><b>ID:</b> {selectedUser.id}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Nombre:</b> {selectedUser.nombre_completo}</p>
            <p><b>Username:</b> {selectedUser.username}</p>
            <p><b>Rol:</b> {selectedUser.role}</p>
            <p><b>Fecha de registro:</b> {selectedUser.created_at}</p>
            <button onClick={() => setSelectedUser(null)}>Cerrar</button>
          </div>
        )}
      </section>
    </div>
  );
}

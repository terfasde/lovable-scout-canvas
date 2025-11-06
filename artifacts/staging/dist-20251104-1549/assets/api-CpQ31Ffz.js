import { i as r, b as s, s as i } from "./index-CQXDJ8Au.js";
function f(e) {
  if (!e) return null;
  try {
    const a = new Date(e);
    if (isNaN(a.getTime())) return null;
    const t = new Date();
    let n = t.getFullYear() - a.getFullYear();
    const o = t.getMonth() - a.getMonth();
    return ((o < 0 || (o === 0 && t.getDate() < a.getDate())) && n--, n);
  } catch {
    return null;
  }
}
async function h(e) {
  if (r()) {
    const n = await s("/profiles/me");
    return (n && n.fecha_nacimiento && (n.edad = f(n.fecha_nacimiento)), n);
  }
  const { data: a, error: t } = await i
    .from("profiles")
    .select()
    .eq("user_id", e)
    .single();
  if (t) throw t;
  return a;
}
async function b(e) {
  if (r()) {
    const t = {};
    (e.nombre_completo !== void 0 && (t.nombre_completo = e.nombre_completo),
      e.telefono !== void 0 && (t.telefono = e.telefono),
      e.is_public !== void 0 && (t.is_public = e.is_public),
      e.avatar_url !== void 0 && (t.avatar_url = e.avatar_url),
      e.fecha_nacimiento !== void 0 &&
        (t.fecha_nacimiento = e.fecha_nacimiento),
      e.rol_adulto !== void 0 && (t.rol_adulto = e.rol_adulto),
      e.seisena !== void 0 && (t.seisena = e.seisena),
      e.patrulla !== void 0 && (t.patrulla = e.patrulla),
      e.equipo_pioneros !== void 0 && (t.equipo_pioneros = e.equipo_pioneros),
      e.comunidad_rovers !== void 0 &&
        (t.comunidad_rovers = e.comunidad_rovers),
      await s("/profiles/me", { method: "PUT", body: JSON.stringify(t) }));
    return;
  }
  const { error: a } = await i
    .from("profiles")
    .update(e)
    .eq("user_id", e.user_id);
  if (a) throw a;
}
async function p() {
  if (r()) return await s("/events");
  const { data: e, error: a } = await i
    .from("eventos")
    .select()
    .order("fecha_inicio", { ascending: !0 });
  if (a) throw a;
  return e;
}
async function v(e, a) {
  if (r()) {
    await s("/profiles/me", {
      method: "PUT",
      body: JSON.stringify({ is_public: a }),
    });
    return;
  }
  const { data: t, error: n } = await i
    .from("profiles")
    .update({ is_public: a })
    .eq("user_id", e)
    .select("user_id");
  if (n) throw n;
  if (!t || t.length === 0) {
    let o = null;
    try {
      o = await h(e);
    } catch {
      o = null;
    }
    const { data: c } = await i.auth.getUser(),
      u = c.user,
      d =
        o?.nombre_completo ||
        u?.user_metadata?.nombre ||
        u?.email ||
        "Perfil sin nombre",
      m = o?.telefono || u?.user_metadata?.telefono || "",
      _ = {
        user_id: e,
        nombre_completo: d,
        telefono: m,
        edad: o?.edad ?? null,
        seisena: o?.seisena ?? null,
        patrulla: o?.patrulla ?? null,
        equipo_pioneros: o?.equipo_pioneros ?? null,
        comunidad_rovers: o?.comunidad_rovers ?? null,
        fecha_nacimiento: o?.fecha_nacimiento ?? null,
        rol_adulto: o?.rol_adulto ?? null,
        is_public: a,
        username: o?.username ?? null,
        username_updated_at: o?.username_updated_at ?? null,
      },
      { error: l } = await i.from("profiles").insert(_);
    if (l) throw l;
  }
}
async function g() {
  if (r()) {
    await s("/users/me", { method: "DELETE" });
    return;
  }
  throw new Error("Eliminar cuenta no disponible en este modo");
}
export { h as a, g as d, p as g, v as s, b as u };

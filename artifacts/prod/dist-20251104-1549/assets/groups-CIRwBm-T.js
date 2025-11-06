import { j as _ } from "./vendor-react-BgpSLK3q.js";
import { a as w } from "./vendor-style--X5BZniO.js";
import { c as h, i as c, b as m, s, p as b } from "./index-wTsEScI4.js";
const y = w(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function S({ className: r, variant: e, ...t }) {
  return _.jsx("div", { className: h(y({ variant: e }), r), ...t });
}
async function j() {
  if (c())
    return (await m("/groups")).map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description ?? null,
      cover_image: a.cover_url ?? null,
      creator_id: a.creator_id,
      created_at: a.created_at,
      updated_at: a.updated_at,
      member_count: void 0,
      user_role: a.my_role ?? void 0,
    }));
  const { data: r, error: e } = await s
    .from("groups")
    .select("*")
    .order("created_at", { ascending: !1 });
  if (e) throw e;
  const {
    data: { user: t },
  } = await s.auth.getUser();
  return await Promise.all(
    (r || []).map(async (u) => {
      const { count: a } = await s
        .from("group_members")
        .select("*", { count: "exact", head: !0 })
        .eq("group_id", u.id);
      let o;
      if (t) {
        const { data: d } = await s
          .from("group_members")
          .select("role")
          .eq("group_id", u.id)
          .eq("user_id", t.id)
          .maybeSingle();
        o = d?.role;
      }
      return { ...u, member_count: a || 0, user_role: o };
    }),
  );
}
async function G(r, e, t) {
  if (c()) {
    let d;
    t && (d = await b(t));
    const i = await m("/groups", {
      method: "POST",
      body: JSON.stringify({ name: r, description: e, cover_url: d }),
    });
    return {
      id: i.id,
      name: i.name,
      description: i.description ?? null,
      cover_image: i.cover_url ?? null,
      creator_id: i.creator_id,
      created_at: i.created_at,
      updated_at: i.updated_at,
    };
  }
  const {
    data: { user: n },
  } = await s.auth.getUser();
  if (!n) throw new Error("No autenticado");
  if (!r.trim() || r.length < 3)
    throw new Error("El nombre del grupo debe tener al menos 3 caracteres");
  if (r.length > 100)
    throw new Error("El nombre del grupo no puede exceder 100 caracteres");
  if (e && e.length > 500)
    throw new Error("La descripción no puede exceder 500 caracteres");
  let u = null;
  if (t) {
    if (
      ![
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ].includes(t.type)
    )
      throw new Error("Solo se permiten imágenes (JPG, PNG, GIF, WEBP)");
    const i = 5 * 1024 * 1024;
    if (t.size > i) throw new Error("La imagen no puede superar 5MB");
    const l = t.name.split(".").pop(),
      p = `${n.id}/${Date.now()}.${l || "jpg"}`,
      { error: g } = await s.storage
        .from("group-covers")
        .upload(p, t, { upsert: !1 });
    if (g) throw g;
    const { data: f } = s.storage.from("group-covers").getPublicUrl(p);
    u = f.publicUrl;
  }
  const { data: a, error: o } = await s
    .from("groups")
    .insert({
      name: r.trim(),
      description: e?.trim() || null,
      cover_image: u,
      creator_id: n.id,
    })
    .select()
    .single();
  if (o) throw o;
  return a;
}
async function $(r) {
  if (c()) {
    await m(`/groups/${r}/join`, { method: "POST" });
    return;
  }
  const {
    data: { user: e },
  } = await s.auth.getUser();
  if (!e) throw new Error("No autenticado");
  const { error: t } = await s
    .from("group_members")
    .insert({ group_id: r, user_id: e.id, role: "member" });
  if (t) throw t;
}
async function N(r) {
  if (c()) {
    await m(`/groups/${r}/leave`, { method: "POST" });
    return;
  }
  const {
    data: { user: e },
  } = await s.auth.getUser();
  if (!e) throw new Error("No autenticado");
  const { error: t } = await s
    .from("group_members")
    .delete()
    .eq("group_id", r)
    .eq("user_id", e.id);
  if (t) throw t;
}
async function P(r) {
  if (c())
    return (await m(`/groups/${r}/members`)).map((o) => ({
      user_id: o.user_id,
      role: o.role,
      joined_at: "",
      nombre_completo: o.username,
      username: o.username,
      avatar_url: null,
    }));
  const { data: e, error: t } = await s
    .from("group_members")
    .select("user_id, role, joined_at")
    .eq("group_id", r)
    .order("joined_at", { ascending: !0 });
  if (t) throw t;
  const n = (e || []).map((a) => a.user_id);
  if (n.length === 0) return [];
  const { data: u } = await s
    .from("profiles")
    .select("user_id, nombre_completo, username, avatar_url")
    .in("user_id", n);
  return (e || []).map((a) => {
    const o = u?.find((d) => d.user_id === a.user_id);
    return {
      ...a,
      nombre_completo: o?.nombre_completo,
      username: o?.username,
      avatar_url: o?.avatar_url,
    };
  });
}
async function T(r, e) {
  if (c()) {
    await m(`/groups/${r}/admins/promote`, {
      method: "POST",
      body: JSON.stringify({ userId: e }),
    });
    return;
  }
  const { error: t } = await s
    .from("group_members")
    .update({ role: "admin" })
    .eq("group_id", r)
    .eq("user_id", e);
  if (t) throw t;
}
async function O(r, e) {
  if (c()) {
    await m(`/groups/${r}/admins/demote`, {
      method: "POST",
      body: JSON.stringify({ userId: e }),
    });
    return;
  }
  const { error: t } = await s
    .from("group_members")
    .update({ role: "member" })
    .eq("group_id", r)
    .eq("user_id", e);
  if (t) throw t;
}
async function k(r, e) {
  if (c()) {
    await m(`/groups/${r}/members/${e}`, { method: "DELETE" });
    return;
  }
  const { error: t } = await s
    .from("group_members")
    .delete()
    .eq("group_id", r)
    .eq("user_id", e);
  if (t) throw t;
}
async function U(r) {
  if (c())
    return (await m(`/groups/${r}/messages`)).map((o) => ({
      id: o.id,
      group_id: o.group_id,
      sender_id: o.user_id,
      content: o.content ?? "",
      image_url: o.image_url ?? null,
      created_at: o.created_at,
      sender_name: o.username,
      sender_username: o.username,
      sender_avatar: null,
    }));
  const { data: e, error: t } = await s
    .from("group_messages")
    .select("*")
    .eq("group_id", r)
    .order("created_at", { ascending: !0 });
  if (t) throw t;
  const n = [...new Set((e || []).map((a) => a.sender_id))];
  if (n.length === 0) return [];
  const { data: u } = await s
    .from("profiles")
    .select("user_id, nombre_completo, username, avatar_url")
    .in("user_id", n);
  return (e || []).map((a) => {
    const o = u?.find((d) => d.user_id === a.sender_id);
    return {
      ...a,
      sender_name: o?.nombre_completo,
      sender_username: o?.username,
      sender_avatar: o?.avatar_url,
    };
  });
}
async function M(r, e, t) {
  if (c()) {
    const i = await m(`/groups/${r}/messages`, {
      method: "POST",
      body: JSON.stringify({ content: e, image_url: void 0 }),
    });
    return {
      id: i.id,
      group_id: i.group_id,
      sender_id: i.user_id,
      content: i.content ?? "",
      image_url: i.image_url ?? null,
      created_at: i.created_at,
    };
  }
  const {
    data: { user: n },
  } = await s.auth.getUser();
  if (!n) throw new Error("No autenticado");
  if (!e.trim()) throw new Error("El mensaje no puede estar vacío");
  let u = null;
  const { data: a, error: o } = await s
    .from("group_messages")
    .insert({ group_id: r, sender_id: n.id, content: e.trim(), image_url: u })
    .select()
    .single();
  if (o) throw o;
  return a;
}
async function B(r) {
  if (c()) throw new Error("No soportado en modo local");
  const { error: e } = await s.from("group_messages").delete().eq("id", r);
  if (e) throw e;
}
async function v(r) {
  const { error: e } = await s.from("groups").delete().eq("id", r);
  if (e) throw e;
}
async function J(r) {
  if (c()) {
    await m(`/groups/${r}`, { method: "DELETE" });
    return;
  }
  const e = (i) => {
      if (!i) return null;
      const l = "/group-covers/",
        p = i.indexOf(l);
      return p === -1 ? null : i.substring(p + l.length);
    },
    [{ data: t, error: n }, { data: u, error: a }] = await Promise.all([
      s.from("groups").select("cover_image").eq("id", r).maybeSingle(),
      s
        .from("group_messages")
        .select("image_url")
        .eq("group_id", r)
        .not("image_url", "is", null),
    ]);
  if (n) throw n;
  if (a) throw a;
  const o = [],
    d = e(t?.cover_image || null);
  if (
    (d && o.push(d),
    (u || []).forEach((i) => {
      const l = e(i.image_url);
      l && o.push(l);
    }),
    o.length > 0)
  ) {
    if (c()) throw new Error("Invitaciones no soportadas en modo local");
    await s.storage.from("group-covers").remove(o);
  }
  await v(r);
}
async function L(r, e) {
  if (!Array.isArray(e) || e.length === 0) return { inserted: 0, skipped: 0 };
  const t = Array.from(new Set(e)),
    { data: n, error: u } = await s
      .from("group_members")
      .select("user_id")
      .eq("group_id", r)
      .in("user_id", t);
  if (u) throw u;
  const a = new Set((n || []).map((f) => f.user_id)),
    o = t.filter((f) => !a.has(f));
  if (o.length === 0) return { inserted: 0, skipped: t.length };
  const d = o.map((f) => ({ group_id: r, user_id: f, role: "member" })),
    { error: i, count: l } = await s
      .from("group_members")
      .insert(d, { count: "exact" });
  if (i) throw i;
  const p = l ?? d.length,
    g = t.length - p;
  return { inserted: p, skipped: g };
}
export {
  S as B,
  N as a,
  U as b,
  G as c,
  P as d,
  O as e,
  J as f,
  B as g,
  L as i,
  $ as j,
  k,
  j as l,
  T as p,
  M as s,
};

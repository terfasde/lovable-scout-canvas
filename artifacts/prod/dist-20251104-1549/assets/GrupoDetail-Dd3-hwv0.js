import {
  r as o,
  j as e,
  g as be,
  a8 as Ne,
  al as P,
  J as K,
  t as _e,
  ao as ye,
  ag as Se,
  a1 as V,
  ap as Ce,
} from "./vendor-react-BgpSLK3q.js";
import {
  c as J,
  u as ke,
  i as Q,
  s as m,
  g as Me,
  b as Ee,
  B as c,
  D as Y,
  r as W,
  d as X,
  f as Z,
  h as ee,
  U as E,
  C as De,
  a as Ae,
} from "./index-wTsEScI4.js";
import { I as se } from "./input-mWpG_fYx.js";
import {
  A as Ie,
  b as Te,
  c as Ue,
  d as ze,
  f as qe,
  g as Ge,
  h as $e,
} from "./alert-dialog-Z5DsgKEN.js";
import { ad as re, ae as Fe } from "./vendor-radix-B3dsqebR.js";
import {
  b as D,
  d as ae,
  B as Le,
  s as Oe,
  p as Re,
  e as Be,
  k as He,
  a as Pe,
  f as Ke,
  i as Ve,
  g as Je,
} from "./groups-CIRwBm-T.js";
import { E as Qe, k as Ye } from "./vendor-MRMtI2Il.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-router-VbqrkW3a.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const te = o.forwardRef(({ className: r, ...u }, n) =>
  e.jsx(re, {
    ref: n,
    className: J(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      r,
    ),
    ...u,
    children: e.jsx(Fe, {
      className: J("flex items-center justify-center text-current"),
      children: e.jsx(be, { className: "h-4 w-4" }),
    }),
  }),
);
te.displayName = re.displayName;
function ls() {
  const { id: r } = Qe(),
    u = Ye(),
    { toast: n } = ke(),
    w = o.useRef(null),
    [ie, ne] = o.useState(!0),
    [x, A] = o.useState(null),
    [f, I] = o.useState([]),
    [T, v] = o.useState([]),
    [b, S] = o.useState(""),
    [g, U] = o.useState(""),
    [p, z] = o.useState(null),
    [oe, le] = o.useState(!1),
    [ce, C] = o.useState(!1),
    [q, G] = o.useState(!1),
    [$, k] = o.useState([]),
    [N, _] = o.useState(new Set()),
    [de, M] = o.useState(!1),
    [F, L] = o.useState("");
  (o.useEffect(() => {
    j();
  }, [r]),
    o.useEffect(() => {
      if (!r) return;
      if (Q()) {
        const a = setInterval(async () => {
          try {
            const i = await D(r);
            (v(i), w.current?.scrollIntoView({ behavior: "smooth" }));
          } catch {}
        }, 1500);
        return () => clearInterval(a);
      }
      const s = m
        .channel(`group_messages:${r}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "group_messages",
            filter: `group_id=eq.${r}`,
          },
          async (a) => {
            const i = a.new,
              { data: t } = await m
                .from("profiles")
                .select("user_id, nombre_completo, username, avatar_url")
                .eq("user_id", i.sender_id)
                .single(),
              d = {
                ...i,
                sender_name: t?.nombre_completo,
                sender_username: t?.username,
                sender_avatar: t?.avatar_url,
              };
            (v((h) => (h.some((y) => y.id === d.id) ? h : [...h, d])),
              setTimeout(() => {
                w.current?.scrollIntoView({ behavior: "smooth" });
              }, 100));
          },
        )
        .subscribe();
      return () => {
        m.removeChannel(s);
      };
    }, [r]));
  const j = async () => {
      if (r)
        try {
          if (Q()) {
            const s = await Me();
            if (!s) {
              u("/auth");
              return;
            }
            U(s.id);
            const a = await Ee(`/groups/${r}`);
            A({ ...a, cover_image: a.cover_url ?? null });
            const i = await ae(r);
            I(i);
            const t = i.find((h) => String(h.user_id) === String(s.id));
            if (!t) {
              (n({
                title: "Acceso denegado",
                description: "No eres miembro de este grupo",
                variant: "destructive",
              }),
                u("/usuarios"));
              return;
            }
            z(t.role);
            const d = await D(r);
            v(d);
          } else {
            const {
              data: { user: s },
            } = await m.auth.getUser();
            if (!s) {
              u("/auth");
              return;
            }
            U(s.id);
            const { data: a, error: i } = await m
              .from("groups")
              .select("*")
              .eq("id", r)
              .single();
            if (i) throw i;
            A(a);
            const { data: t } = await m
              .from("group_members")
              .select("role")
              .eq("group_id", r)
              .eq("user_id", s.id)
              .maybeSingle();
            if (!t) {
              (n({
                title: "Acceso denegado",
                description: "No eres miembro de este grupo",
                variant: "destructive",
              }),
                u("/usuarios"));
              return;
            }
            z(t.role);
            const [d, h] = await Promise.all([ae(r), D(r)]);
            (I(d), v(h));
          }
          setTimeout(() => {
            w.current?.scrollIntoView({ behavior: "auto" });
          }, 100);
        } catch (s) {
          (console.error(s),
            n({
              title: "Error",
              description: s.message,
              variant: "destructive",
            }));
        } finally {
          ne(!1);
        }
    },
    O = async () => {
      if (!r || !b.trim()) return;
      const s = b.trim();
      S("");
      try {
        await Oe(r, s);
      } catch (a) {
        (S(s),
          n({
            title: "Error",
            description: a.message,
            variant: "destructive",
          }));
      }
    },
    me = async (s) => {
      if (r)
        try {
          (await Re(r, s),
            n({ title: "Miembro promovido a administrador" }),
            await j());
        } catch (a) {
          n({ title: "Error", description: a.message, variant: "destructive" });
        }
    },
    ue = async (s) => {
      if (r)
        try {
          (await Be(r, s),
            n({ title: "Administrador degradado a miembro" }),
            await j());
        } catch (a) {
          n({ title: "Error", description: a.message, variant: "destructive" });
        }
    },
    he = async (s) => {
      if (!(!r || !confirm("¿Expulsar a este miembro del grupo?")))
        try {
          (await He(r, s),
            n({ title: "Miembro expulsado del grupo" }),
            await j());
        } catch (a) {
          n({ title: "Error", description: a.message, variant: "destructive" });
        }
    },
    xe = async () => {
      if (
        !(!r || !confirm("¿Estás seguro de que quieres salir de este grupo?"))
      )
        try {
          (await Pe(r), n({ title: "Has salido del grupo" }), u("/usuarios"));
        } catch (s) {
          n({ title: "Error", description: s.message, variant: "destructive" });
        }
    },
    pe = async () => {
      if (r)
        try {
          (await Ke(r), n({ title: "Grupo eliminado" }), u("/usuarios"));
        } catch (s) {
          n({ title: "Error", description: s.message, variant: "destructive" });
        } finally {
          M(!1);
        }
    },
    ge = async () => {
      if (!(!r || !g))
        try {
          const { data: s, error: a } = await m
            .from("follows")
            .select("followed_id, status")
            .eq("follower_id", g)
            .eq("status", "accepted");
          if (a) throw a;
          const { data: i, error: t } = await m
            .from("follows")
            .select("follower_id, status")
            .eq("followed_id", g)
            .eq("status", "accepted");
          if (t) throw t;
          const d = new Set((s || []).map((l) => l.followed_id)),
            h = new Set((i || []).map((l) => l.follower_id)),
            y = [];
          d.forEach((l) => {
            h.has(l) && y.push(l);
          });
          const je = new Set(f.map((l) => l.user_id)),
            B = y.filter((l) => !je.has(l) && l !== g);
          if (B.length === 0) {
            (k([]), _(new Set()));
            return;
          }
          const { data: we, error: H } = await m
            .from("profiles")
            .select("user_id, nombre_completo, username, avatar_url")
            .in("user_id", B);
          if (H) throw H;
          (k(
            (we || []).map((l) => ({
              user_id: l.user_id,
              nombre_completo: l.nombre_completo ?? null,
              username: l.username ?? null,
              avatar_url: l.avatar_url ?? null,
            })),
          ),
            _(new Set()));
        } catch (s) {
          (console.error(s),
            n({
              title: "Error",
              description: s.message,
              variant: "destructive",
            }));
        }
    },
    fe = async () => {
      if (!(!r || N.size === 0)) {
        G(!0);
        try {
          const { inserted: s, skipped: a } = await Ve(r, Array.from(N));
          (n({
            title: "Invitaciones",
            description: `Agregados: ${s}. Omitidos: ${a}.`,
          }),
            await j(),
            C(!1));
        } catch (s) {
          n({ title: "Error", description: s.message, variant: "destructive" });
        } finally {
          G(!1);
        }
      }
    },
    ve = async (s) => {
      if (confirm("¿Eliminar este mensaje?"))
        try {
          (await Je(s),
            v((a) => a.filter((i) => i.id !== s)),
            n({ title: "Mensaje eliminado" }));
        } catch (a) {
          n({ title: "Error", description: a.message, variant: "destructive" });
        }
    };
  if (ie)
    return e.jsxs("div", {
      className: "min-h-screen bg-background",
      children: [
        e.jsx("div", { className: "h-20" }),
        e.jsx("div", {
          className: "flex items-center justify-center py-20",
          children: e.jsx("div", {
            className:
              "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary",
          }),
        }),
      ],
    });
  if (!x) return null;
  const R = p === "owner" || p === "admin";
  return e.jsxs("div", {
    className: "min-h-screen bg-background",
    children: [
      e.jsx("div", { className: "h-16 sm:h-20" }),
      e.jsxs("div", {
        className: "max-w-6xl mx-auto px-4 py-6",
        children: [
          e.jsxs("div", {
            className: "flex items-center gap-4 mb-6",
            children: [
              e.jsx(c, {
                variant: "ghost",
                size: "icon",
                onClick: () => u("/usuarios"),
                children: e.jsx(Ne, { className: "w-5 h-5" }),
              }),
              x.cover_image &&
                e.jsx("img", {
                  src: x.cover_image,
                  alt: x.name,
                  className: "w-20 h-20 object-cover rounded-lg",
                }),
              e.jsxs("div", {
                className: "flex-1",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      e.jsx("h1", {
                        className: "text-2xl font-bold",
                        children: x.name,
                      }),
                      p === "owner" &&
                        e.jsx(P, { className: "h-5 w-5 text-yellow-500" }),
                      p === "admin" &&
                        e.jsx(K, { className: "h-5 w-5 text-blue-500" }),
                    ],
                  }),
                  x.description &&
                    e.jsx("p", {
                      className: "text-sm text-muted-foreground",
                      children: x.description,
                    }),
                  e.jsxs("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: [
                      f.length,
                      " ",
                      f.length === 1 ? "miembro" : "miembros",
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "flex gap-2",
                children: [
                  e.jsxs(Y, {
                    open: oe,
                    onOpenChange: le,
                    children: [
                      e.jsx(W, {
                        asChild: !0,
                        children: e.jsxs(c, {
                          variant: "outline",
                          size: "sm",
                          className: "gap-2",
                          children: [
                            e.jsx(_e, { className: "h-4 w-4" }),
                            "Miembros",
                          ],
                        }),
                      }),
                      e.jsxs(X, {
                        className: "sm:max-w-md",
                        children: [
                          e.jsx(Z, {
                            children: e.jsxs(ee, {
                              children: ["Miembros del grupo (", f.length, ")"],
                            }),
                          }),
                          e.jsx("div", {
                            className: "space-y-2 max-h-[60vh] overflow-auto",
                            children: f.map((s) => {
                              const a = s.user_id === g,
                                i = s.role === "owner",
                                t = s.role === "admin";
                              return e.jsxs(
                                "div",
                                {
                                  className:
                                    "flex items-center gap-3 p-2 rounded hover:bg-muted",
                                  children: [
                                    e.jsx(E, {
                                      avatarUrl: s.avatar_url,
                                      userName: s.nombre_completo,
                                      size: "sm",
                                    }),
                                    e.jsxs("div", {
                                      className: "flex-1 min-w-0",
                                      children: [
                                        e.jsxs("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            e.jsx("span", {
                                              className:
                                                "font-medium text-sm truncate",
                                              children:
                                                s.nombre_completo || "Scout",
                                            }),
                                            i &&
                                              e.jsx(P, {
                                                className:
                                                  "h-4 w-4 text-yellow-500 flex-shrink-0",
                                              }),
                                            t &&
                                              e.jsx(K, {
                                                className:
                                                  "h-4 w-4 text-blue-500 flex-shrink-0",
                                              }),
                                            a &&
                                              e.jsx(Le, {
                                                variant: "secondary",
                                                className: "text-xs",
                                                children: "Tú",
                                              }),
                                          ],
                                        }),
                                        s.username &&
                                          e.jsxs("p", {
                                            className:
                                              "text-xs text-muted-foreground",
                                            children: ["@", s.username],
                                          }),
                                      ],
                                    }),
                                    R &&
                                      !i &&
                                      !a &&
                                      e.jsxs("div", {
                                        className: "flex gap-1",
                                        children: [
                                          t
                                            ? e.jsx(c, {
                                                size: "sm",
                                                variant: "ghost",
                                                onClick: () => ue(s.user_id),
                                                children: "Quitar admin",
                                              })
                                            : e.jsx(c, {
                                                size: "sm",
                                                variant: "ghost",
                                                onClick: () => me(s.user_id),
                                                children: "Hacer admin",
                                              }),
                                          e.jsx(c, {
                                            size: "sm",
                                            variant: "ghost",
                                            className: "text-destructive",
                                            onClick: () => he(s.user_id),
                                            children: e.jsx(ye, {
                                              className: "h-4 w-4",
                                            }),
                                          }),
                                        ],
                                      }),
                                  ],
                                },
                                s.user_id,
                              );
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (p === "owner" || p === "admin") &&
                    e.jsxs(Y, {
                      open: ce,
                      onOpenChange: (s) => {
                        (C(s), s && ge());
                      },
                      children: [
                        e.jsx(W, {
                          asChild: !0,
                          children: e.jsxs(c, {
                            variant: "outline",
                            size: "sm",
                            className: "gap-2",
                            children: [
                              e.jsx(Se, { className: "h-4 w-4" }),
                              "Invitar",
                            ],
                          }),
                        }),
                        e.jsxs(X, {
                          className: "sm:max-w-lg",
                          children: [
                            e.jsx(Z, {
                              children: e.jsx(ee, {
                                children: "Invitar seguidores en común",
                              }),
                            }),
                            e.jsxs("div", {
                              className: "space-y-3 max-h-[60vh] overflow-auto",
                              children: [
                                e.jsxs("div", {
                                  className: "flex gap-2 items-center",
                                  children: [
                                    e.jsx(se, {
                                      placeholder: "Agregar por @username",
                                      value: F,
                                      onChange: (s) => L(s.target.value),
                                    }),
                                    e.jsx(c, {
                                      variant: "outline",
                                      onClick: async () => {
                                        const s = F.trim().replace(/^@/, "");
                                        if (s)
                                          try {
                                            const { data: a, error: i } =
                                              await m
                                                .from("profiles")
                                                .select(
                                                  "user_id, nombre_completo, username, avatar_url",
                                                )
                                                .eq("username", s)
                                                .maybeSingle();
                                            if (i) throw i;
                                            if (!a) {
                                              n({
                                                title: "No encontrado",
                                                description:
                                                  "No existe un usuario con ese username",
                                                variant: "destructive",
                                              });
                                              return;
                                            }
                                            if (
                                              a.user_id === g ||
                                              f.some(
                                                (t) => t.user_id === a.user_id,
                                              )
                                            ) {
                                              n({
                                                title: "Ya es miembro",
                                                description:
                                                  "Este usuario ya está en el grupo o eres tú mismo",
                                                variant: "destructive",
                                              });
                                              return;
                                            }
                                            (k((t) =>
                                              t.some(
                                                (d) => d.user_id === a.user_id,
                                              )
                                                ? t
                                                : [
                                                    ...t,
                                                    {
                                                      user_id: a.user_id,
                                                      nombre_completo:
                                                        a.nombre_completo ??
                                                        null,
                                                      username:
                                                        a.username ?? null,
                                                      avatar_url:
                                                        a.avatar_url ?? null,
                                                    },
                                                  ],
                                            ),
                                              _((t) =>
                                                new Set(t).add(a.user_id),
                                              ),
                                              L(""));
                                          } catch (a) {
                                            n({
                                              title: "Error",
                                              description: a.message,
                                              variant: "destructive",
                                            });
                                          }
                                      },
                                      children: "Añadir",
                                    }),
                                  ],
                                }),
                                $.length === 0
                                  ? e.jsx("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children:
                                        "No tienes seguidores en común disponibles para invitar.",
                                    })
                                  : $.map((s) =>
                                      e.jsxs(
                                        "div",
                                        {
                                          className:
                                            "flex items-center gap-3 p-2 rounded hover:bg-muted",
                                          children: [
                                            e.jsx(E, {
                                              avatarUrl: s.avatar_url,
                                              userName: s.nombre_completo,
                                              size: "sm",
                                            }),
                                            e.jsx("div", {
                                              className: "flex-1 min-w-0",
                                              children: e.jsxs("div", {
                                                className:
                                                  "flex items-center gap-2",
                                                children: [
                                                  e.jsx("span", {
                                                    className:
                                                      "font-medium text-sm truncate",
                                                    children:
                                                      s.nombre_completo ||
                                                      "Scout",
                                                  }),
                                                  s.username &&
                                                    e.jsxs("span", {
                                                      className:
                                                        "text-xs text-muted-foreground truncate",
                                                      children: [
                                                        "@",
                                                        s.username,
                                                      ],
                                                    }),
                                                ],
                                              }),
                                            }),
                                            e.jsx(te, {
                                              checked: N.has(s.user_id),
                                              onCheckedChange: (a) => {
                                                _((i) => {
                                                  const t = new Set(i);
                                                  return (
                                                    a === !0
                                                      ? t.add(s.user_id)
                                                      : t.delete(s.user_id),
                                                    t
                                                  );
                                                });
                                              },
                                            }),
                                          ],
                                        },
                                        s.user_id,
                                      ),
                                    ),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "flex justify-end gap-2",
                              children: [
                                e.jsx(c, {
                                  variant: "outline",
                                  onClick: () => C(!1),
                                  children: "Cancelar",
                                }),
                                e.jsx(c, {
                                  onClick: fe,
                                  disabled: N.size === 0 || q,
                                  children: q
                                    ? "Invitando…"
                                    : "Invitar seleccionados",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  p !== "owner" &&
                    e.jsx(c, {
                      variant: "outline",
                      size: "sm",
                      className: "gap-2 text-destructive",
                      onClick: xe,
                      children: "Salir del grupo",
                    }),
                  p === "owner" &&
                    e.jsxs(e.Fragment, {
                      children: [
                        e.jsxs(c, {
                          variant: "destructive",
                          size: "sm",
                          className: "gap-2",
                          onClick: () => M(!0),
                          children: [
                            e.jsx(V, { className: "h-4 w-4" }),
                            "Eliminar grupo",
                          ],
                        }),
                        e.jsx(Ie, {
                          open: de,
                          onOpenChange: M,
                          children: e.jsxs(Te, {
                            children: [
                              e.jsx(Ue, {
                                children: e.jsxs(ze, {
                                  children: [
                                    '¿Eliminar el grupo "',
                                    x.name,
                                    '"?',
                                  ],
                                }),
                              }),
                              e.jsx("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "Esta acción es permanente y eliminará todos los mensajes y miembros del grupo.",
                              }),
                              e.jsxs(qe, {
                                children: [
                                  e.jsx(Ge, { children: "Cancelar" }),
                                  e.jsx($e, {
                                    className:
                                      "bg-destructive hover:bg-destructive/90",
                                    onClick: pe,
                                    children: "Eliminar definitivamente",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
          e.jsx(De, {
            children: e.jsx(Ae, {
              className: "p-4",
              children: e.jsxs("div", {
                className: "flex flex-col h-[calc(100vh-300px)]",
                children: [
                  e.jsx("div", {
                    className: "flex-1 overflow-auto space-y-3 mb-4",
                    children:
                      T.length === 0
                        ? e.jsx("div", {
                            className: "text-center text-muted-foreground py-8",
                            children:
                              "No hay mensajes aún. ¡Sé el primero en escribir!",
                          })
                        : e.jsxs(e.Fragment, {
                            children: [
                              T.map((s) => {
                                const a = s.sender_id === g,
                                  i = a || R;
                                return e.jsxs(
                                  "div",
                                  {
                                    className: `flex gap-3 ${a ? "flex-row-reverse" : ""}`,
                                    children: [
                                      e.jsx(E, {
                                        avatarUrl: s.sender_avatar || null,
                                        userName: s.sender_name || null,
                                        size: "sm",
                                        className: "flex-shrink-0",
                                      }),
                                      e.jsx("div", {
                                        className: `flex-1 max-w-[75%] ${a ? "text-right" : ""}`,
                                        children: e.jsxs("div", {
                                          className: `inline-block rounded-lg px-3 py-2 ${a ? "bg-primary text-primary-foreground" : "bg-muted"}`,
                                          children: [
                                            !a &&
                                              e.jsx("div", {
                                                className:
                                                  "text-xs opacity-70 mb-1",
                                                children: s.sender_username
                                                  ? `@${s.sender_username}`
                                                  : s.sender_name || "Scout",
                                              }),
                                            e.jsx("div", {
                                              className:
                                                "text-sm whitespace-pre-wrap break-words",
                                              children: s.content,
                                            }),
                                            e.jsxs("div", {
                                              className: `text-xs mt-1 flex items-center gap-2 ${a ? "opacity-70 justify-end" : "opacity-50"}`,
                                              children: [
                                                e.jsx("span", {
                                                  children: new Date(
                                                    s.created_at,
                                                  ).toLocaleTimeString(
                                                    "es-ES",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                    },
                                                  ),
                                                }),
                                                i &&
                                                  e.jsx("button", {
                                                    onClick: () => ve(s.id),
                                                    className:
                                                      "hover:text-destructive transition-colors",
                                                    children: e.jsx(V, {
                                                      className: "h-3 w-3",
                                                    }),
                                                  }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  },
                                  s.id,
                                );
                              }),
                              e.jsx("div", { ref: w }),
                            ],
                          }),
                  }),
                  e.jsxs("div", {
                    className: "flex gap-2 border-t pt-4",
                    children: [
                      e.jsx(se, {
                        placeholder: "Escribe un mensaje...",
                        value: b,
                        onChange: (s) => S(s.target.value),
                        onKeyDown: (s) => {
                          s.key === "Enter" &&
                            !s.shiftKey &&
                            (s.preventDefault(), O());
                        },
                        className: "flex-1",
                      }),
                      e.jsx(c, {
                        onClick: O,
                        disabled: !b.trim(),
                        children: e.jsx(Ce, { className: "h-4 w-4" }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
export { ls as default };

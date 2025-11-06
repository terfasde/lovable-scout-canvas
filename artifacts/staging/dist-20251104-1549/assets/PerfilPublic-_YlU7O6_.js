import {
  r as l,
  j as e,
  af as u,
  g as C,
  a3 as y,
  ag as D,
} from "./vendor-react-BgpSLK3q.js";
import {
  u as S,
  i as A,
  b as E,
  s as U,
  B as m,
  C as k,
  l as P,
  U as F,
  m as T,
  a as _,
} from "./index-CQXDJ8Au.js";
import { f as v, h as L, i as R, u as z } from "./follows-w7rB7DGA.js";
import {
  A as B,
  a as q,
  b as H,
  c as O,
  d as I,
  e as M,
  f as Y,
  g as $,
  h as G,
} from "./alert-dialog-DlB5ihTY.js";
import { E as J } from "./vendor-MRMtI2Il.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-router-VbqrkW3a.js";
import "./vendor-radix-B3dsqebR.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const ie = () => {
  const { id: a } = J(),
    [N, b] = l.useState(!0),
    [i, c] = l.useState(!1),
    [r, p] = l.useState(null),
    [x, d] = l.useState(null),
    [w, f] = l.useState(!1),
    { toast: t } = S();
  l.useEffect(() => {
    (async () => {
      try {
        if (!a) return;
        if (A()) {
          const o = await E(`/profiles/${encodeURIComponent(a)}`);
          p(o);
        } else {
          const { data: o, error: j } = await U.from("profiles")
            .select("*")
            .eq("user_id", a)
            .single();
          if (j) throw j;
          p(o);
        }
        const s = await v(a);
        s.error || d(s.data);
      } catch (s) {
        t({
          title: "Error",
          description: s?.message || "No se pudo cargar el perfil",
          variant: "destructive",
        });
      } finally {
        b(!1);
      }
    })();
  }, [a]);
  const n = l.useMemo(() => x?.status, [x]),
    h = async () => {
      if (!(!a || i)) {
        c(!0);
        try {
          const { error: s } = await L(a);
          if (s) {
            t({
              title: "Error",
              description: s.message,
              variant: "destructive",
            });
            return;
          }
          t({
            title: "Solicitud enviada",
            description: "Te avisaremos cuando sea aceptada (si es privado).",
          });
          const o = await v(a);
          o.error || d(o.data);
        } finally {
          c(!1);
        }
      }
    },
    g = async () => {
      if (!(!a || i)) {
        c(!0);
        try {
          if (n === "pending") {
            const { error: s } = await R(a);
            if (s) {
              t({
                title: "Error",
                description: s.message,
                variant: "destructive",
              });
              return;
            }
            (d(null), t({ title: "Solicitud cancelada" }));
          } else if (n === "accepted") {
            const { error: s } = await z(a);
            if (s) {
              t({
                title: "Error",
                description: s.message,
                variant: "destructive",
              });
              return;
            }
            (d(null), t({ title: "Dejaste de seguir" }), f(!1));
          }
        } finally {
          c(!1);
        }
      }
    };
  return N
    ? e.jsx("div", {
        className:
          "min-h-screen bg-background flex items-center justify-center",
        children: e.jsx("div", {
          className:
            "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary",
        }),
      })
    : r
      ? e.jsx("div", {
          className: "min-h-screen bg-background py-12 px-4",
          children: e.jsxs(k, {
            className: "max-w-2xl mx-auto",
            children: [
              e.jsx(P, {
                children: e.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [
                    e.jsx(F, {
                      avatarUrl: r.avatar_url,
                      userName: r.nombre_completo,
                      size: "lg",
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx(T, { children: r.nombre_completo }),
                        e.jsxs("div", {
                          className: "flex items-center gap-2 mt-1",
                          children: [
                            r.is_public
                              ? e.jsx("p", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Perfil público",
                                })
                              : e.jsx("p", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Perfil privado",
                                }),
                            n === "accepted" &&
                              e.jsx("span", {
                                className:
                                  "text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground",
                                children: "Siguiendo",
                              }),
                            n === "pending" &&
                              e.jsx("span", {
                                className:
                                  "text-xs px-2 py-0.5 rounded-full bg-muted",
                                children: "Pendiente",
                              }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              e.jsxs(_, {
                children: [
                  e.jsx("div", {
                    className: "mb-4 flex gap-2",
                    children:
                      n === "accepted"
                        ? e.jsxs(B, {
                            open: w,
                            onOpenChange: f,
                            children: [
                              e.jsx(q, {
                                asChild: !0,
                                children: e.jsx(m, {
                                  variant: "outline",
                                  size: "sm",
                                  disabled: i,
                                  className: "gap-2",
                                  children: i
                                    ? e.jsx(u, {
                                        className: "h-4 w-4 animate-spin",
                                      })
                                    : e.jsxs(e.Fragment, {
                                        children: [
                                          e.jsx(C, { className: "h-4 w-4" }),
                                          "Siguiendo",
                                        ],
                                      }),
                                }),
                              }),
                              e.jsxs(H, {
                                children: [
                                  e.jsxs(O, {
                                    children: [
                                      e.jsx(I, {
                                        children: "¿Dejar de seguir?",
                                      }),
                                      e.jsxs(M, {
                                        children: [
                                          "Ya no verás las publicaciones de ",
                                          r?.nombre_completo || "este usuario",
                                          " en tu feed.",
                                        ],
                                      }),
                                    ],
                                  }),
                                  e.jsxs(Y, {
                                    children: [
                                      e.jsx($, { children: "Cancelar" }),
                                      e.jsx(G, {
                                        onClick: g,
                                        children: "Dejar de seguir",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                        : n === "pending"
                          ? e.jsx(m, {
                              variant: "outline",
                              size: "sm",
                              onClick: g,
                              disabled: i,
                              className: "gap-2",
                              children: i
                                ? e.jsx(u, {
                                    className: "h-4 w-4 animate-spin",
                                  })
                                : e.jsxs(e.Fragment, {
                                    children: [
                                      e.jsx(y, { className: "h-4 w-4" }),
                                      "Solicitud pendiente",
                                    ],
                                  }),
                            })
                          : e.jsx(m, {
                              size: "sm",
                              onClick: h,
                              disabled: i,
                              className: "gap-2",
                              children: i
                                ? e.jsx(u, {
                                    className: "h-4 w-4 animate-spin",
                                  })
                                : e.jsxs(e.Fragment, {
                                    children: [
                                      e.jsx(D, { className: "h-4 w-4" }),
                                      "Seguir",
                                    ],
                                  }),
                            }),
                  }),
                  e.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      e.jsxs("p", {
                        children: [
                          e.jsx("strong", { children: "Teléfono:" }),
                          " ",
                          r.telefono || "-",
                        ],
                      }),
                      e.jsxs("p", {
                        children: [
                          e.jsx("strong", { children: "Edad:" }),
                          " ",
                          r.edad ?? "-",
                        ],
                      }),
                      e.jsxs("p", {
                        children: [
                          e.jsx("strong", { children: "Seisena:" }),
                          " ",
                          r.seisena || "-",
                        ],
                      }),
                      e.jsxs("p", {
                        children: [
                          e.jsx("strong", { children: "Patrulla:" }),
                          " ",
                          r.patrulla || "-",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        })
      : e.jsx("div", {
          className:
            "min-h-screen flex items-center justify-center px-4 text-center",
          children: e.jsxs("div", {
            children: [
              e.jsx("p", {
                className: "mb-3",
                children: "Este perfil es privado o no tienes acceso.",
              }),
              a &&
                e.jsx(m, {
                  onClick: h,
                  className: "gap-2",
                  children: "Solicitar seguir",
                }),
            ],
          }),
        });
};
export { ie as default };

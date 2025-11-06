import { r as n, j as e, a4 as O, a5 as A } from "./vendor-react-BgpSLK3q.js";
import {
  u as $,
  i as j,
  s as w,
  C as H,
  l as V,
  n as q,
  m as G,
  o as R,
  a as U,
  B as b,
} from "./index-wTsEScI4.js";
import { I as p } from "./input-mWpG_fYx.js";
import { L as h } from "./label-Ctiaxs-G.js";
import { T as D, a as J, b as F, c as z } from "./tabs-BupnlxSv.js";
import { k as W } from "./vendor-MRMtI2Il.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-router-VbqrkW3a.js";
import "./vendor-radix-B3dsqebR.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const ne = () => {
  const [r, N] = n.useState(""),
    [l, C] = n.useState(""),
    [E, k] = n.useState(""),
    [S, I] = n.useState(""),
    [g, B] = n.useState(!1),
    [x, M] = n.useState(!1),
    [c, d] = n.useState(!1),
    u = W(),
    { toast: a } = $();
  n.useEffect(() => {
    if (j()) {
      localStorage.getItem("local_api_token") && u("/");
      return;
    }
    w.auth.getSession().then(({ data: { session: t } }) => {
      t && u("/");
    });
    const {
      data: { subscription: s },
    } = w.auth.onAuthStateChange((t, m) => {
      m && u("/");
    });
    return () => s.unsubscribe();
  }, [u]);
  const P = async (s) => {
      (s.preventDefault(), d(!0));
      try {
        if (j()) {
          const o = "http://localhost:8080",
            i = (S || r.split("@")[0])
              .normalize("NFKD")
              .replace(/[^\w]/g, "_")
              .replace(/_+/g, "_")
              .replace(/^_+|_+$/g, "")
              .slice(0, 32),
            y =
              i.length >= 3
                ? i
                : `user_${Math.random().toString(36).slice(2, 8)}`,
            f = await fetch(`${o}/auth/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: r, password: l, username: y }),
            });
          if (f.ok) {
            const v = await f.json();
            (v?.token && localStorage.setItem("local_api_token", v.token),
              u("/"));
          } else {
            const v = await f.json().catch(() => ({})),
              _ = v?.error || v?.error?.message || `Error ${f.status}`;
            f.status === 409 || String(_).includes("existe")
              ? a({
                  title: "Usuario ya registrado",
                  description:
                    "Este correo ya está registrado. Intenta iniciar sesión.",
                  variant: "destructive",
                })
              : a({
                  title: "Error al registrarse",
                  description: String(_),
                  variant: "destructive",
                });
          }
          return;
        }
        const t = `${window.location.origin}/`,
          { error: m } = await w.auth.signUp({
            email: r,
            password: l,
            options: {
              data: { nombre: S || null, telefono: E || null },
              emailRedirectTo: t,
            },
          });
        m
          ? m.message.includes("already registered")
            ? a({
                title: "Usuario ya registrado",
                description:
                  "Este correo ya está registrado. Intenta iniciar sesión.",
                variant: "destructive",
              })
            : a({
                title: "Error al registrarse",
                description: m.message,
                variant: "destructive",
              })
          : (a({
              title: "Confirma tu correo electrónico",
              description: `Te enviamos un correo a ${r}. Abre ese email y haz clic en el enlace de confirmación (revisa también la carpeta de spam).`,
            }),
            N(""),
            C(""),
            k(""),
            I(""));
      } catch {
        a({
          title: "Error",
          description: "Ocurrió un error inesperado",
          variant: "destructive",
        });
      } finally {
        d(!1);
      }
    },
    L = async (s) => {
      (s.preventDefault(), d(!0));
      try {
        if (j()) {
          const o = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: r, password: l }),
          });
          if (o.ok) {
            const i = await o.json();
            (i?.token && localStorage.setItem("local_api_token", i.token),
              u("/"));
          } else {
            const i = await o.json().catch(() => ({})),
              y = i?.error || i?.error?.message || `Error ${o.status}`;
            o.status === 400 || String(y).toLowerCase().includes("credenciales")
              ? a({
                  title: "Credenciales inválidas",
                  description: "El correo o la contraseña son incorrectos.",
                  variant: "destructive",
                })
              : a({
                  title: "Error al iniciar sesión",
                  description: String(y),
                  variant: "destructive",
                });
          }
          return;
        }
        const { error: t } = await w.auth.signInWithPassword({
          email: r,
          password: l,
        });
        t &&
          (t.message.includes("Invalid login credentials")
            ? a({
                title: "Credenciales inválidas",
                description: "El correo o la contraseña son incorrectos.",
                variant: "destructive",
              })
            : a({
                title: "Error al iniciar sesión",
                description: t.message,
                variant: "destructive",
              }));
      } catch {
        a({
          title: "Error",
          description: "Ocurrió un error inesperado",
          variant: "destructive",
        });
      } finally {
        d(!1);
      }
    },
    T = async () => {
      d(!0);
      try {
        const { error: s } = await w.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/` },
        });
        s &&
          a({ title: "Error", description: s.message, variant: "destructive" });
      } catch {
        a({
          title: "Error",
          description: "Ocurrió un error inesperado",
          variant: "destructive",
        });
      } finally {
        d(!1);
      }
    };
  return e.jsx("div", {
    className:
      "min-h-screen bg-gradient-to-br from-scout-black via-scout-red to-scout-yellow flex items-center justify-center p-4",
    children: e.jsxs(H, {
      className: "w-full max-w-md",
      children: [
        e.jsxs(V, {
          className: "text-center",
          children: [
            e.jsx("div", {
              className: "flex justify-center mb-4",
              children: e.jsx("img", {
                src: q,
                alt: "Grupo Scout Séptimo",
                className: "h-20 w-20",
              }),
            }),
            e.jsx(G, {
              className: "text-2xl font-bold",
              children: "Grupo Scout Séptimo",
            }),
            e.jsx(R, { children: "Únete a nuestra comunidad scout" }),
          ],
        }),
        e.jsx(U, {
          children: e.jsxs(D, {
            defaultValue: "login",
            className: "w-full",
            children: [
              e.jsxs(J, {
                className: "grid w-full grid-cols-2",
                children: [
                  e.jsx(F, { value: "login", children: "Iniciar Sesión" }),
                  e.jsx(F, { value: "signup", children: "Registrarse" }),
                ],
              }),
              e.jsx(z, {
                value: "login",
                children: e.jsxs("form", {
                  onSubmit: L,
                  className: "space-y-4",
                  children: [
                    e.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        e.jsx(h, {
                          htmlFor: "login-email",
                          children: "Correo electrónico",
                        }),
                        e.jsx(p, {
                          id: "login-email",
                          type: "email",
                          inputMode: "email",
                          autoComplete: "email",
                          placeholder: "pepe@email.com",
                          value: r,
                          onChange: (s) => N(s.target.value),
                          required: !0,
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        e.jsx(h, {
                          htmlFor: "login-password",
                          children: "Contraseña",
                        }),
                        e.jsxs("div", {
                          className: "relative",
                          children: [
                            e.jsx(p, {
                              id: "login-password",
                              type: g ? "text" : "password",
                              autoComplete: "current-password",
                              placeholder: "••••••••",
                              value: l,
                              onChange: (s) => C(s.target.value),
                              required: !0,
                            }),
                            e.jsxs("button", {
                              type: "button",
                              "aria-pressed": g,
                              "aria-label": g
                                ? "Ocultar contraseña"
                                : "Ver contraseña",
                              onClick: () => B((s) => !s),
                              className:
                                "absolute right-2 top-1/2 transform -translate-y-1/2 inline-flex items-center text-muted-foreground p-1",
                              children: [
                                g
                                  ? e.jsx(O, { className: "w-4 h-4" })
                                  : e.jsx(A, { className: "w-4 h-4" }),
                                e.jsx("span", {
                                  className: "sr-only",
                                  children: g
                                    ? "Ocultar contraseña"
                                    : "Ver contraseña",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsx(b, {
                      type: "submit",
                      className: "w-full",
                      disabled: c,
                      children: c ? "Iniciando sesión..." : "Iniciar Sesión",
                    }),
                    !j() &&
                      e.jsxs(e.Fragment, {
                        children: [
                          e.jsxs("div", {
                            className: "relative my-4",
                            children: [
                              e.jsx("div", {
                                className: "absolute inset-0 flex items-center",
                                children: e.jsx("span", {
                                  className: "w-full border-t",
                                }),
                              }),
                              e.jsx("div", {
                                className:
                                  "relative flex justify-center text-xs uppercase",
                                children: e.jsx("span", {
                                  className:
                                    "bg-background px-2 text-muted-foreground",
                                  children: "O continúa con",
                                }),
                              }),
                            ],
                          }),
                          e.jsxs(b, {
                            type: "button",
                            variant: "outline",
                            className: "w-full",
                            onClick: T,
                            disabled: c,
                            children: [
                              e.jsxs("svg", {
                                className: "mr-2 h-4 w-4",
                                viewBox: "0 0 24 24",
                                children: [
                                  e.jsx("path", {
                                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                                    fill: "#4285F4",
                                  }),
                                  e.jsx("path", {
                                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                                    fill: "#34A853",
                                  }),
                                  e.jsx("path", {
                                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                                    fill: "#FBBC05",
                                  }),
                                  e.jsx("path", {
                                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                                    fill: "#EA4335",
                                  }),
                                ],
                              }),
                              "Iniciar sesión con Google",
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              }),
              e.jsx(z, {
                value: "signup",
                children: e.jsxs("form", {
                  onSubmit: P,
                  className: "space-y-4",
                  children: [
                    e.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        e.jsx(h, {
                          htmlFor: "signup-nombre",
                          children: "Nombre completo",
                        }),
                        e.jsx(p, {
                          id: "signup-nombre",
                          type: "text",
                          autoComplete: "name",
                          placeholder: "Pepe González",
                          value: S,
                          onChange: (s) => I(s.target.value),
                          required: !0,
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        e.jsx(h, {
                          htmlFor: "signup-telefono",
                          children: "Teléfono",
                        }),
                        e.jsx(p, {
                          id: "signup-telefono",
                          type: "tel",
                          inputMode: "tel",
                          autoComplete: "tel",
                          placeholder: "+598 123 456 789",
                          value: E,
                          onChange: (s) => k(s.target.value),
                          required: !0,
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        e.jsx(h, {
                          htmlFor: "signup-email",
                          children: "Correo electrónico",
                        }),
                        e.jsx(p, {
                          id: "signup-email",
                          type: "email",
                          inputMode: "email",
                          autoComplete: "email",
                          placeholder: "pepe@email.com",
                          value: r,
                          onChange: (s) => N(s.target.value),
                          required: !0,
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        e.jsx(h, {
                          htmlFor: "signup-password",
                          children: "Contraseña",
                        }),
                        e.jsxs("div", {
                          className: "relative",
                          children: [
                            e.jsx(p, {
                              id: "signup-password",
                              type: x ? "text" : "password",
                              autoComplete: "new-password",
                              placeholder: "••••••••",
                              value: l,
                              onChange: (s) => C(s.target.value),
                              required: !0,
                              minLength: 6,
                            }),
                            e.jsxs("button", {
                              type: "button",
                              "aria-pressed": x,
                              "aria-label": x
                                ? "Ocultar contraseña"
                                : "Ver contraseña",
                              onClick: () => M((s) => !s),
                              className:
                                "absolute right-2 top-1/2 transform -translate-y-1/2 inline-flex items-center text-muted-foreground p-1",
                              children: [
                                x
                                  ? e.jsx(O, { className: "w-4 h-4" })
                                  : e.jsx(A, { className: "w-4 h-4" }),
                                e.jsx("span", {
                                  className: "sr-only",
                                  children: x
                                    ? "Ocultar contraseña"
                                    : "Ver contraseña",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsx(b, {
                      type: "submit",
                      className: "w-full",
                      disabled: c,
                      children: c ? "Registrando..." : "Registrarse",
                    }),
                    !j() &&
                      e.jsxs(e.Fragment, {
                        children: [
                          e.jsxs("div", {
                            className: "relative my-4",
                            children: [
                              e.jsx("div", {
                                className: "absolute inset-0 flex items-center",
                                children: e.jsx("span", {
                                  className: "w-full border-t",
                                }),
                              }),
                              e.jsx("div", {
                                className:
                                  "relative flex justify-center text-xs uppercase",
                                children: e.jsx("span", {
                                  className:
                                    "bg-background px-2 text-muted-foreground",
                                  children: "O continúa con",
                                }),
                              }),
                            ],
                          }),
                          e.jsxs(b, {
                            type: "button",
                            variant: "outline",
                            className: "w-full",
                            onClick: T,
                            disabled: c,
                            children: [
                              e.jsxs("svg", {
                                className: "mr-2 h-4 w-4",
                                viewBox: "0 0 24 24",
                                children: [
                                  e.jsx("path", {
                                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                                    fill: "#4285F4",
                                  }),
                                  e.jsx("path", {
                                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                                    fill: "#34A853",
                                  }),
                                  e.jsx("path", {
                                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                                    fill: "#FBBC05",
                                  }),
                                  e.jsx("path", {
                                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                                    fill: "#EA4335",
                                  }),
                                ],
                              }),
                              "Registrarse con Google",
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              }),
            ],
          }),
        }),
      ],
    }),
  });
};
export { ne as default };

import {
  r as l,
  j as e,
  a6 as oe,
  a7 as ne,
  a8 as le,
  X as ie,
  a9 as de,
  a4 as ce,
  a5 as me,
  aa as ue,
} from "./vendor-react-BgpSLK3q.js";
import {
  c as pe,
  D as fe,
  d as he,
  f as ge,
  h as xe,
  k as ve,
  B as D,
  u as be,
  g as M,
  i as q,
  s as N,
  U as je,
  p as _e,
} from "./index-wTsEScI4.js";
import { I as h } from "./input-mWpG_fYx.js";
import { L as u } from "./label-Ctiaxs-G.js";
import { D as Ne, k as we } from "./vendor-MRMtI2Il.js";
import { v as X, w as ye, x as Ce, y as Se } from "./vendor-radix-B3dsqebR.js";
import { a as Ee, u as W } from "./api-otDnumpN.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-router-VbqrkW3a.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const K = l.forwardRef(({ className: x, ...d }, p) =>
  e.jsxs(X, {
    ref: p,
    className: pe(
      "relative flex w-full touch-none select-none items-center",
      x,
    ),
    ...d,
    children: [
      e.jsx(ye, {
        className:
          "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
        children: e.jsx(Ce, { className: "absolute h-full bg-primary" }),
      }),
      e.jsx(Se, {
        className:
          "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      }),
    ],
  }),
);
K.displayName = X.displayName;
const De = (x) =>
  new Promise((d, p) => {
    const m = new Image();
    (m.addEventListener("load", () => d(m)),
      m.addEventListener("error", (v) => p(v)),
      (m.src = x));
  });
async function ke(x, d) {
  const p = await De(x),
    m = document.createElement("canvas"),
    v = m.getContext("2d");
  if (!v) throw new Error("No se pudo crear el contexto del canvas");
  return (
    (m.width = d.width),
    (m.height = d.height),
    v.drawImage(p, d.x, d.y, d.width, d.height, 0, 0, d.width, d.height),
    new Promise((k, F) => {
      m.toBlob(
        (w) => {
          w ? k(w) : F(new Error("Error al crear el blob de la imagen"));
        },
        "image/jpeg",
        0.95,
      );
    })
  );
}
const Fe = ({ open: x, imageSrc: d, onClose: p, onCropComplete: m }) => {
    const [v, k] = l.useState({ x: 0, y: 0 }),
      [F, w] = l.useState(1),
      [b, P] = l.useState(null),
      [y, C] = l.useState(!1),
      O = (f) => {
        k(f);
      },
      U = (f) => {
        w(f);
      },
      z = l.useCallback((f, G) => {
        P(G);
      }, []),
      L = async () => {
        if (b)
          try {
            C(!0);
            const f = await ke(d, b);
            (m(f), p());
          } catch (f) {
            console.error("Error al recortar la imagen:", f);
          } finally {
            C(!1);
          }
      };
    return e.jsx(fe, {
      open: x,
      onOpenChange: p,
      children: e.jsxs(he, {
        className: "max-w-2xl max-h-[90vh] overflow-y-auto",
        children: [
          e.jsx(ge, {
            children: e.jsx(xe, {
              className: "text-base sm:text-lg",
              children: "Ajustar foto de perfil",
            }),
          }),
          e.jsxs("div", {
            className: "space-y-4 sm:space-y-6",
            children: [
              e.jsx("div", {
                className:
                  "relative w-full h-[300px] sm:h-[400px] bg-muted rounded-lg overflow-hidden",
                children: e.jsx(Ne, {
                  image: d,
                  crop: v,
                  zoom: F,
                  aspect: 1,
                  cropShape: "round",
                  showGrid: !1,
                  onCropChange: O,
                  onZoomChange: U,
                  onCropComplete: z,
                }),
              }),
              e.jsxs("div", {
                className: "space-y-2",
                children: [
                  e.jsxs("div", {
                    className:
                      "flex items-center justify-between text-xs sm:text-sm text-muted-foreground",
                    children: [
                      e.jsxs("span", {
                        className: "flex items-center gap-1",
                        children: [
                          e.jsx(oe, { className: "w-3 h-3 sm:w-4 sm:h-4" }),
                          "Zoom",
                        ],
                      }),
                      e.jsx("span", {
                        className: "flex items-center gap-1",
                        children: e.jsx(ne, {
                          className: "w-3 h-3 sm:w-4 sm:h-4",
                        }),
                      }),
                    ],
                  }),
                  e.jsx(K, {
                    value: [F],
                    min: 1,
                    max: 3,
                    step: 0.1,
                    onValueChange: (f) => w(f[0]),
                    className: "w-full",
                  }),
                ],
              }),
              e.jsx("p", {
                className: "text-xs text-muted-foreground text-center",
                children:
                  "Arrastra para mover la imagen y usa el control deslizante para hacer zoom",
              }),
            ],
          }),
          e.jsxs(ve, {
            className: "flex-col sm:flex-row gap-2",
            children: [
              e.jsx(D, {
                variant: "outline",
                onClick: p,
                disabled: y,
                className: "w-full sm:w-auto",
                children: "Cancelar",
              }),
              e.jsx(D, {
                onClick: L,
                disabled: y,
                className: "w-full sm:w-auto",
                children: y
                  ? e.jsxs(e.Fragment, {
                      children: [
                        e.jsx("div", {
                          className:
                            "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2",
                        }),
                        "Procesando...",
                      ],
                    })
                  : "Guardar foto",
              }),
            ],
          }),
        ],
      }),
    });
  },
  $e = () => {
    const [x, d] = l.useState(!0),
      [p, m] = l.useState(!1),
      [v, k] = l.useState(!1),
      [F, w] = l.useState(null),
      [b, P] = l.useState(null),
      [y, C] = l.useState(null),
      [O, U] = l.useState(!1),
      [z, L] = l.useState(!1),
      [f, G] = l.useState(""),
      [Pe, Z] = l.useState(null),
      [a, _] = l.useState({
        nombre_completo: "",
        telefono: "",
        edad: 0,
        fecha_nacimiento: "",
        seisena: "",
        patrulla: "",
        equipo_pioneros: "",
        comunidad_rovers: "",
        rol_adulto: "",
        password: "",
        avatar_url: null,
        username: "",
        username_updated_at: null,
      }),
      [g, B] = l.useState(null),
      [Q, S] = l.useState(""),
      T = we(),
      { toast: c } = be();
    (l.useEffect(() => {
      if (a.fecha_nacimiento) {
        const r = new Date(),
          [s, t, o] = a.fecha_nacimiento.split("-").map(Number),
          n = new Date(s, t - 1, o);
        let A = r.getFullYear() - n.getFullYear();
        const E = r.getMonth() - n.getMonth();
        ((E < 0 || (E === 0 && r.getDate() < n.getDate())) && A--,
          _((I) => ({ ...I, edad: A })));
      }
    }, [a.fecha_nacimiento]),
      l.useEffect(() => {
        const r = a.edad;
        r >= 21
          ? S("Adulto")
          : r >= 18
            ? S("Rover")
            : r >= 15
              ? S("Pionero")
              : r >= 11
                ? S("Tropa")
                : r >= 7
                  ? S("Manada")
                  : S("");
      }, [a.edad]),
      l.useEffect(() => {
        $();
      }, []));
    const $ = async (r = !0) => {
        try {
          r && d(!0);
          const s = await M();
          if (!s) {
            T("/auth");
            return;
          }
          if ((J(s.email || ""), q())) {
            const i = await Ee(s.id).catch(() => null),
              V = {
                ...a,
                nombre_completo: i?.nombre_completo || "",
                telefono: i?.telefono || "",
                edad: i?.edad || 0,
                fecha_nacimiento: i?.fecha_nacimiento
                  ? i.fecha_nacimiento.split("T")[0]
                  : "",
                seisena: i?.seisena || "",
                patrulla: i?.patrulla || "",
                equipo_pioneros: i?.equipo_pioneros || "",
                comunidad_rovers: i?.comunidad_rovers || "",
                rol_adulto: i?.rol_adulto || "",
                password: "",
                avatar_url: i?.avatar_url || null,
                username: i?.username || "",
                username_updated_at: i?.username_updated_at || null,
              };
            (_(V), B(V));
            return;
          }
          const { data: t, error: o } = await N.from("profiles")
            .select("*")
            .eq("user_id", s.id)
            .single();
          if (o && o.code !== "PGRST116") throw o;
          const { data: n } = await N.auth.getUser(),
            E = n?.user?.user_metadata || {},
            I = E.nombre || t?.nombre_completo || "",
            Y = E.telefono || t?.telefono || "";
          if (t) {
            w(t);
            const i = {
              ...a,
              nombre_completo: I,
              telefono: Y,
              edad: t.edad || 0,
              fecha_nacimiento: t.fecha_nacimiento
                ? t.fecha_nacimiento.split("T")[0]
                : "",
              seisena: t.seisena || "",
              patrulla: t.patrulla || "",
              equipo_pioneros: t.equipo_pioneros || "",
              comunidad_rovers: t.comunidad_rovers || "",
              rol_adulto: t.rol_adulto || "",
              password: "",
              avatar_url: t.avatar_url || null,
              username: t.username || "",
              username_updated_at: t.username_updated_at || null,
            };
            (_(i), B(i));
          } else {
            const { error: i } = await N.from("profiles").insert({
              user_id: s.id,
              nombre_completo: I,
              telefono: Y,
            });
            if (i) throw i;
            await $();
          }
        } catch (s) {
          c({ title: "Error", description: s.message, variant: "destructive" });
        } finally {
          r && d(!1);
        }
      },
      j = (r) => {
        const { name: s, value: t } = r.target;
        if (s === "telefono") {
          const o = t.replace(/[^\d\s\-+()]/g, "");
          _((n) => ({ ...n, [s]: o }));
          return;
        }
        if (s === "edad") {
          const o = parseInt(t) || 0;
          if (o < 0 || o > 120) {
            c({
              title: "Edad inválida",
              description: "La edad debe estar entre 0 y 120 años",
              variant: "destructive",
            });
            return;
          }
          _((n) => ({ ...n, [s]: o }));
          return;
        }
        if (s === "nombre_completo" && t.length > 50) {
          c({
            title: "Nombre muy largo",
            description: "El nombre no puede exceder 50 caracteres",
            variant: "destructive",
          });
          return;
        }
        _((o) => ({ ...o, [s]: t }));
      },
      [H, J] = l.useState(""),
      R = () =>
        g
          ? b || a.password
            ? !0
            : a.nombre_completo !== g.nombre_completo ||
              a.telefono !== g.telefono ||
              a.edad !== g.edad ||
              a.fecha_nacimiento !== g.fecha_nacimiento ||
              a.seisena !== g.seisena ||
              a.patrulla !== g.patrulla ||
              a.equipo_pioneros !== g.equipo_pioneros ||
              a.comunidad_rovers !== g.comunidad_rovers ||
              a.rol_adulto !== g.rol_adulto ||
              a.username !== g.username
          : !1;
    l.useEffect(() => {
      (async () => {
        const r = await M();
        r?.email && J(r.email);
      })();
    }, []);
    const ee = (r) => {
        const s = r.target.files?.[0];
        if (!s) return;
        if (
          ![
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
          ].includes(s.type)
        ) {
          c({
            title: "Tipo de archivo inválido",
            description: "Solo se permiten imágenes (JPG, PNG, GIF, WEBP)",
            variant: "destructive",
          });
          return;
        }
        const o = 5 * 1024 * 1024;
        if (s.size > o) {
          c({
            title: "Archivo muy grande",
            description: "La imagen no debe superar 5MB",
            variant: "destructive",
          });
          return;
        }
        const n = new FileReader();
        ((n.onloadend = () => {
          (G(n.result), L(!0));
        }),
          n.readAsDataURL(s),
          (r.target.value = ""));
      },
      ae = (r) => {
        const s = `avatar-${Date.now()}.jpg`,
          t = new File([r], s, { type: "image/jpeg" });
        (P(t), Z(r));
        const o = URL.createObjectURL(r);
        C(o);
      },
      se = async (r) => {
        if (!b) return null;
        try {
          if ((U(!0), q())) return await _e(b);
          const s = b.name.split(".").pop(),
            t = `${Date.now()}.${s}`,
            o = `${r}/${t}`,
            { error: n } = await N.storage
              .from("avatars")
              .upload(o, b, { upsert: !0 });
          if (n) throw n;
          const { data: A } = N.storage.from("avatars").getPublicUrl(o);
          return A.publicUrl;
        } catch (s) {
          return (
            c({
              title: "Error al subir imagen",
              description: s.message,
              variant: "destructive",
            }),
            null
          );
        } finally {
          U(!1);
        }
      },
      re = () => {
        (P(null), C(null), Z(null));
      },
      te = async (r) => {
        if ((r.preventDefault(), !a.nombre_completo.trim())) {
          c({
            title: "Campo requerido",
            description: "El nombre completo es obligatorio",
            variant: "destructive",
          });
          return;
        }
        if (a.nombre_completo.length < 3) {
          c({
            title: "Nombre muy corto",
            description: "El nombre debe tener al menos 3 caracteres",
            variant: "destructive",
          });
          return;
        }
        if (a.telefono && a.telefono.replace(/\D/g, "").length < 8) {
          c({
            title: "Teléfono inválido",
            description: "El teléfono debe tener al menos 8 dígitos",
            variant: "destructive",
          });
          return;
        }
        if (a.edad < 7 || a.edad > 120) {
          c({
            title: "Edad inválida",
            description: "La edad debe estar entre 7 y 120 años",
            variant: "destructive",
          });
          return;
        }
        if (a.password && a.password.length < 6) {
          c({
            title: "Contraseña débil",
            description: "La contraseña debe tener al menos 6 caracteres",
            variant: "destructive",
          });
          return;
        }
        if (a.username && a.username.length < 3) {
          c({
            title: "Username muy corto",
            description: "El username debe tener al menos 3 caracteres",
            variant: "destructive",
          });
          return;
        }
        m(!0);
        try {
          const s = await M();
          if (!s) throw new Error("No hay sesión activa");
          let t = a.avatar_url;
          if (b) {
            const n = await se(s.id);
            n && (t = n);
          }
          if (!q() && a.password) {
            const { error: n } = await N.auth.updateUser({
              password: a.password,
            });
            if (n) throw n;
          }
          const o = {
            user_id: s.id,
            nombre_completo: a.nombre_completo,
            telefono: a.telefono,
            edad: a.edad,
            avatar_url: t,
            updated_at: new Date().toISOString(),
          };
          if (
            (a.username &&
              a.username.trim() &&
              (o.username = a.username.trim().toLowerCase()),
            a.fecha_nacimiento && (o.fecha_nacimiento = a.fecha_nacimiento),
            a.edad >= 7 && a.edad <= 20 && (o.seisena = a.seisena || null),
            a.edad >= 11 && a.edad <= 20 && (o.patrulla = a.patrulla || null),
            a.edad >= 15 &&
              a.edad <= 20 &&
              (o.equipo_pioneros = a.equipo_pioneros || null),
            a.edad >= 18 &&
              a.edad <= 20 &&
              (o.comunidad_rovers = a.comunidad_rovers || null),
            a.edad >= 21 && a.rol_adulto && (o.rol_adulto = a.rol_adulto),
            q())
          )
            await W(o);
          else {
            const { error: n } = await N.from("profiles")
              .update(o)
              .eq("user_id", s.id);
            if (n) throw n;
          }
          (c({
            title: "¡Perfil actualizado!",
            description: "Tus cambios han sido guardados.",
          }),
            await $(!1),
            P(null),
            C(null));
        } catch (s) {
          c({
            title: "Error al actualizar",
            description: s.message,
            variant: "destructive",
          });
        } finally {
          m(!1);
        }
      };
    return x
      ? e.jsxs("div", {
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
        })
      : e.jsxs("div", {
          className: "min-h-screen bg-background",
          children: [
            e.jsx("div", { className: "h-20" }),
            e.jsxs("div", {
              className: "max-w-3xl mx-auto px-4 py-8",
              children: [
                e.jsxs("div", {
                  className: "flex items-center gap-4 mb-8",
                  children: [
                    e.jsx(D, {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => T("/perfil"),
                      children: e.jsx(le, { className: "w-5 h-5" }),
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("h1", {
                          className: "text-2xl font-semibold",
                          children: "Editar perfil",
                        }),
                        e.jsx("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Actualiza tu información personal y scout",
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className:
                    "flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b",
                  children: [
                    e.jsxs("div", {
                      className: "relative",
                      children: [
                        e.jsx(je, {
                          avatarUrl: y || a.avatar_url,
                          userName: a.nombre_completo,
                          size: "xl",
                        }),
                        y &&
                          e.jsx("button", {
                            onClick: re,
                            className:
                              "absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors",
                            type: "button",
                            children: e.jsx(ie, { className: "w-4 h-4" }),
                          }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex-1 text-center sm:text-left",
                      children: [
                        e.jsx("h2", {
                          className: "text-xl font-medium mb-1",
                          children: a.nombre_completo || "Usuario Scout",
                        }),
                        e.jsx("p", {
                          className: "text-sm text-muted-foreground mb-3",
                          children: H,
                        }),
                        e.jsxs("div", {
                          className:
                            "flex gap-2 justify-center sm:justify-start",
                          children: [
                            e.jsx(u, {
                              htmlFor: "avatar-upload",
                              className: "cursor-pointer",
                              children: e.jsxs("div", {
                                className:
                                  "inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium",
                                children: [
                                  e.jsx(de, { className: "w-4 h-4" }),
                                  a.avatar_url ? "Cambiar foto" : "Subir foto",
                                ],
                              }),
                            }),
                            e.jsx(h, {
                              id: "avatar-upload",
                              type: "file",
                              accept: "image/*",
                              onChange: ee,
                              className: "hidden",
                            }),
                            a.avatar_url &&
                              e.jsx(D, {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: async () => {
                                  try {
                                    const r = await M();
                                    if (!r) return;
                                    (q()
                                      ? await W({
                                          user_id: r.id,
                                          avatar_url: null,
                                        })
                                      : await N.from("profiles")
                                          .update({ avatar_url: null })
                                          .eq("user_id", r.id),
                                      _((s) => ({ ...s, avatar_url: null })),
                                      B((s) => s && { ...s, avatar_url: null }),
                                      c({
                                        title: "Foto eliminada",
                                        description:
                                          "Tu foto de perfil ha sido eliminada",
                                      }));
                                  } catch (r) {
                                    c({
                                      title: "Error",
                                      description: r.message,
                                      variant: "destructive",
                                    });
                                  }
                                },
                                children: "Eliminar foto",
                              }),
                          ],
                        }),
                        e.jsx("p", {
                          className: "text-xs text-muted-foreground mt-2",
                          children: "JPG, PNG o GIF. Máximo 4MB",
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("form", {
                  onSubmit: te,
                  className: "space-y-8",
                  children: [
                    e.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        e.jsx("h3", {
                          className: "text-lg font-semibold",
                          children: "Información Personal",
                        }),
                        e.jsxs("div", {
                          className: "grid gap-4 md:grid-cols-2",
                          children: [
                            e.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                e.jsx(u, {
                                  htmlFor: "nombre_completo",
                                  children: "Nombre completo *",
                                }),
                                e.jsx(h, {
                                  id: "nombre_completo",
                                  name: "nombre_completo",
                                  value: a.nombre_completo,
                                  onChange: j,
                                  required: !0,
                                  maxLength: 100,
                                  className: `bg-background ${a.nombre_completo.length > 0 && a.nombre_completo.length < 3 ? "border-destructive focus-visible:ring-destructive" : ""}`,
                                }),
                                a.nombre_completo.length > 0 &&
                                  a.nombre_completo.length < 3 &&
                                  e.jsx("p", {
                                    className: "text-xs text-destructive",
                                    children: "Mínimo 3 caracteres",
                                  }),
                                a.nombre_completo.length > 90 &&
                                  e.jsxs("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: [
                                      100 - a.nombre_completo.length,
                                      " caracteres restantes",
                                    ],
                                  }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                e.jsxs(u, {
                                  htmlFor: "username",
                                  children: [
                                    "Nombre de usuario",
                                    a.username_updated_at &&
                                      (() => {
                                        const r = new Date(
                                            a.username_updated_at,
                                          ),
                                          t =
                                            7 -
                                            Math.floor(
                                              (Date.now() - r.getTime()) /
                                                (1e3 * 60 * 60 * 24),
                                            );
                                        return t > 0
                                          ? e.jsxs("span", {
                                              className:
                                                "ml-2 text-xs text-muted-foreground font-normal",
                                              children: [
                                                "(podrás cambiar en ",
                                                t,
                                                " día",
                                                t !== 1 ? "s" : "",
                                                ")",
                                              ],
                                            })
                                          : e.jsx("span", {
                                              className:
                                                "ml-2 text-xs text-green-600 dark:text-green-400 font-normal",
                                              children:
                                                "(puedes cambiar ahora)",
                                            });
                                      })(),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className: "relative",
                                  children: [
                                    e.jsx("span", {
                                      className:
                                        "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                                      children: "@",
                                    }),
                                    e.jsx(h, {
                                      id: "username",
                                      name: "username",
                                      value: a.username,
                                      onChange: (r) => {
                                        const s = r.target.value
                                          .toLowerCase()
                                          .replace(/[^a-z0-9._-]/g, "");
                                        _((t) => ({ ...t, username: s }));
                                      },
                                      placeholder: "usuario.ejemplo",
                                      pattern: "[a-z0-9._-]{3,30}",
                                      minLength: 3,
                                      maxLength: 30,
                                      className: "bg-background pl-8",
                                    }),
                                  ],
                                }),
                                e.jsxs("p", {
                                  className: "text-xs text-muted-foreground",
                                  children: [
                                    "3-30 caracteres. Solo letras, números, puntos, guiones.",
                                    a.username.length > 0 &&
                                      a.username.length < 3 &&
                                      e.jsx("span", {
                                        className:
                                          "block text-destructive mt-1",
                                        children: "Mínimo 3 caracteres",
                                      }),
                                    !a.username &&
                                      " Solo se puede cambiar cada 7 días.",
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                e.jsx(u, {
                                  htmlFor: "fecha_nacimiento",
                                  children: "Fecha de nacimiento (opcional)",
                                }),
                                e.jsx(h, {
                                  id: "fecha_nacimiento",
                                  name: "fecha_nacimiento",
                                  type: "date",
                                  value: a.fecha_nacimiento,
                                  onChange: j,
                                  className: "bg-background",
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                e.jsx(u, { htmlFor: "edad", children: "Edad" }),
                                e.jsx(h, {
                                  id: "edad",
                                  name: "edad",
                                  type: "number",
                                  min: "7",
                                  max: "99",
                                  value: a.edad || "",
                                  onChange: j,
                                  disabled: !!a.fecha_nacimiento,
                                  required: !0,
                                  className: "bg-background",
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                e.jsx(u, {
                                  htmlFor: "rama_actual",
                                  children: "Rama actual",
                                }),
                                e.jsx(h, {
                                  id: "rama_actual",
                                  type: "text",
                                  value: Q,
                                  disabled: !0,
                                  className: "bg-muted",
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                e.jsx(u, {
                                  htmlFor: "email",
                                  children: "Correo electrónico",
                                }),
                                e.jsx(h, {
                                  id: "email",
                                  type: "email",
                                  inputMode: "email",
                                  autoComplete: "email",
                                  value: H,
                                  disabled: !0,
                                  className: "bg-muted",
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "space-y-2 md:col-span-2",
                              children: [
                                e.jsx(u, {
                                  htmlFor: "password",
                                  children: "Nueva contraseña (opcional)",
                                }),
                                e.jsxs("div", {
                                  className: "relative",
                                  children: [
                                    e.jsx(h, {
                                      id: "password",
                                      name: "password",
                                      type: v ? "text" : "password",
                                      value: a.password,
                                      onChange: j,
                                      placeholder: "Dejar vacío para mantener",
                                      className: "bg-background pr-10",
                                    }),
                                    e.jsx("button", {
                                      type: "button",
                                      onClick: () => k((r) => !r),
                                      className:
                                        "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
                                      children: v
                                        ? e.jsx(ce, { className: "w-4 h-4" })
                                        : e.jsx(me, { className: "w-4 h-4" }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        e.jsx("h3", {
                          className: "text-lg font-semibold",
                          children: "Información Scout",
                        }),
                        e.jsxs("div", {
                          className: "grid gap-4 md:grid-cols-2",
                          children: [
                            a.edad >= 7 &&
                              a.edad <= 20 &&
                              e.jsxs("div", {
                                className: "space-y-2",
                                children: [
                                  e.jsx(u, {
                                    htmlFor: "seisena",
                                    children: "Seisena (Manada)",
                                  }),
                                  e.jsx(h, {
                                    id: "seisena",
                                    name: "seisena",
                                    value: a.seisena,
                                    onChange: j,
                                    placeholder: "Ej: Seisena Roja",
                                    className: "bg-background",
                                  }),
                                ],
                              }),
                            a.edad >= 11 &&
                              a.edad <= 20 &&
                              e.jsxs("div", {
                                className: "space-y-2",
                                children: [
                                  e.jsx(u, {
                                    htmlFor: "patrulla",
                                    children: "Patrulla (Tropa)",
                                  }),
                                  e.jsx(h, {
                                    id: "patrulla",
                                    name: "patrulla",
                                    value: a.patrulla,
                                    onChange: j,
                                    placeholder: "Ej: Patrulla Halcón",
                                    className: "bg-background",
                                  }),
                                ],
                              }),
                            a.edad >= 15 &&
                              a.edad <= 20 &&
                              e.jsxs("div", {
                                className: "space-y-2",
                                children: [
                                  e.jsx(u, {
                                    htmlFor: "equipo_pioneros",
                                    children: "Equipo de Pioneros",
                                  }),
                                  e.jsx(h, {
                                    id: "equipo_pioneros",
                                    name: "equipo_pioneros",
                                    value: a.equipo_pioneros,
                                    onChange: j,
                                    placeholder: "Ej: Equipo Alpha",
                                    className: "bg-background",
                                  }),
                                ],
                              }),
                            a.edad >= 18 &&
                              a.edad <= 20 &&
                              e.jsxs("div", {
                                className: "space-y-2",
                                children: [
                                  e.jsx(u, {
                                    htmlFor: "comunidad_rovers",
                                    children: "Comunidad Rovers",
                                  }),
                                  e.jsx(h, {
                                    id: "comunidad_rovers",
                                    name: "comunidad_rovers",
                                    value: a.comunidad_rovers,
                                    onChange: j,
                                    placeholder: "Ej: Comunidad Caminantes",
                                    className: "bg-background",
                                  }),
                                ],
                              }),
                            a.edad >= 21 &&
                              e.jsxs("div", {
                                className: "space-y-2 md:col-span-2",
                                children: [
                                  e.jsx(u, {
                                    htmlFor: "rol_adulto",
                                    children: "Rol en el grupo",
                                  }),
                                  e.jsxs("select", {
                                    id: "rol_adulto",
                                    name: "rol_adulto",
                                    value: a.rol_adulto,
                                    onChange: j,
                                    className:
                                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                    children: [
                                      e.jsx("option", {
                                        value: "",
                                        children: "Selecciona una opción",
                                      }),
                                      e.jsx("option", {
                                        value: "No educador/a",
                                        children: "No educador/a",
                                      }),
                                      e.jsx("option", {
                                        value: "Educador/a",
                                        children: "Educador/a",
                                      }),
                                      e.jsx("option", {
                                        value: "Miembro del Comité",
                                        children: "Miembro del Comité",
                                      }),
                                      e.jsx("option", {
                                        value: "Familiar de Scout",
                                        children: "Familiar de Scout",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex gap-3 pt-4",
                      children: [
                        e.jsx(D, {
                          type: "submit",
                          className: "flex-1 gap-2",
                          disabled: p || !R(),
                          children: p
                            ? e.jsxs(e.Fragment, {
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin",
                                  }),
                                  "Guardando...",
                                ],
                              })
                            : e.jsxs(e.Fragment, {
                                children: [
                                  e.jsx(ue, { className: "w-4 h-4" }),
                                  R() ? "Guardar cambios" : "Sin cambios",
                                ],
                              }),
                        }),
                        e.jsx(D, {
                          type: "button",
                          variant: "outline",
                          onClick: () => {
                            R()
                              ? confirm(
                                  "¿Descartar los cambios sin guardar?",
                                ) && T("/perfil")
                              : T("/perfil");
                          },
                          children: "Cancelar",
                        }),
                      ],
                    }),
                    R() &&
                      e.jsx("div", {
                        className:
                          "mt-3 p-3 bg-primary/10 border border-primary/20 rounded-md",
                        children: e.jsx("p", {
                          className: "text-sm text-primary font-medium",
                          children: "⚠️ Tienes cambios sin guardar",
                        }),
                      }),
                  ],
                }),
              ],
            }),
            e.jsx(Fe, {
              open: z,
              imageSrc: f,
              onClose: () => L(!1),
              onCropComplete: ae,
            }),
          ],
        });
  };
export { $e as default };

import {
  r as d,
  j as e,
  Y as q,
  Z as P,
  _ as L,
  $ as W,
  a0 as O,
  a1 as R,
  a2 as _,
} from "./vendor-react-BgpSLK3q.js";
import {
  c as z,
  i as N,
  b as I,
  s as x,
  e as G,
  u as M,
  g as K,
  B as j,
  C as H,
  D as J,
  d as X,
  f as Y,
  h as Z,
  j as Q,
  k as V,
} from "./index-wTsEScI4.js";
import { I as ee } from "./input-mWpG_fYx.js";
import { L as se } from "./label-Ctiaxs-G.js";
import "./vendor-MRMtI2Il.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-router-VbqrkW3a.js";
import "./vendor-radix-B3dsqebR.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const T = { square: "1/1", video: "16/9", portrait: "3/4", wide: "21/9" };
function te({
  src: t,
  alt: r,
  blurDataURL: s,
  fallback: o,
  aspectRatio: l = "square",
  loading: i = "lazy",
  containerClassName: n,
  className: y,
  showPlaceholder: w = !0,
  ...c
}) {
  const [u, v] = d.useState("loading"),
    [S, b] = d.useState(t);
  d.useEffect(() => {
    (v("loading"), b(t));
  }, [t]);
  const g = () => {
      v("loaded");
    },
    A = () => {
      (v("error"), o && S !== o && (b(o), v("loading")));
    },
    E = l in T ? T[l] : l;
  return e.jsxs("div", {
    className: z("relative overflow-hidden bg-muted", n),
    style: { aspectRatio: E },
    children: [
      w &&
        u === "loading" &&
        s &&
        e.jsx("img", {
          src: s,
          alt: "",
          "aria-hidden": "true",
          className:
            "absolute inset-0 w-full h-full object-cover blur-lg scale-110",
        }),
      w &&
        u === "loading" &&
        !s &&
        e.jsx("div", {
          className:
            "absolute inset-0 flex items-center justify-center bg-muted animate-pulse",
          children: e.jsx("div", {
            className:
              "w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin",
          }),
        }),
      u === "error" &&
        !o &&
        e.jsxs("div", {
          className:
            "absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground",
          children: [
            e.jsx(q, { className: "w-12 h-12 mb-2" }),
            e.jsx("p", {
              className: "text-sm",
              children: "No se pudo cargar la imagen",
            }),
          ],
        }),
      (u !== "error" || (u === "error" && !!o)) &&
        e.jsx("img", {
          src: S,
          alt: r,
          loading: i,
          onLoad: g,
          onError: A,
          className: z(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            u === "loaded" ? "opacity-100" : "opacity-0",
            y,
          ),
          ...c,
        }),
    ],
  });
}
const f = "gallery";
async function k() {
  try {
    if (N()) return (await I("/gallery/albums")).map((l) => ({ name: l.name }));
    const { data: t, error: r } = await x.storage.from(f).list();
    if (r) throw (console.error("Error listing storage:", r), r);
    if (!t || t.length === 0)
      return (
        console.log("No se encontraron archivos o carpetas en el bucket"),
        []
      );
    console.log("Archivos/carpetas en raíz:", t);
    const s = t.filter(
      (o) => !o.name.includes(".") && o.name !== ".emptyFolderPlaceholder",
    );
    return (
      console.log("Carpetas detectadas:", s),
      s.map((o) => ({ name: o.name.replace(/\/$/, "") }))
    );
  } catch (t) {
    return (console.error("Error listing albums:", t), []);
  }
}
async function $(t) {
  if (N()) return await I(`/gallery/albums/${encodeURIComponent(t)}/images`);
  const { data: r, error: s } = await x.storage.from(f).list(t, { limit: 1e3 });
  if (s) throw s;
  return (r || [])
    .filter((i) => {
      const n = i.name.toLowerCase();
      return (
        !n.endsWith("/") &&
        !n.startsWith(".") &&
        n !== ".keep" &&
        (n.endsWith(".jpg") ||
          n.endsWith(".jpeg") ||
          n.endsWith(".png") ||
          n.endsWith(".gif") ||
          n.endsWith(".webp") ||
          n.endsWith(".svg"))
      );
    })
    .map((i) => ({
      url: x.storage.from(f).getPublicUrl(`${t}/${i.name}`).data.publicUrl,
      path: `${t}/${i.name}`,
    }));
}
async function ae(t) {
  if (N()) {
    await I("/gallery/albums", {
      method: "POST",
      body: JSON.stringify({ name: t }),
    });
    return;
  }
  const r = `${t}/.keep`,
    { error: s } = await x.storage
      .from(f)
      .upload(r, new Blob([""]), { contentType: "text/plain", upsert: !1 });
  if (s && !String(s.message).includes("The resource already exists")) throw s;
}
async function re(t, r) {
  if (N()) {
    const n = new FormData();
    n.append("files", r);
    const y = await G();
    await fetch(
      `http://localhost:8080/gallery/albums/${encodeURIComponent(t)}/images`,
      {
        method: "POST",
        headers: y ? { Authorization: `Bearer ${y}` } : void 0,
        body: n,
      },
    ).then((c) => {
      if (!c.ok) throw new Error("Error al subir imagen");
    });
    return;
  }
  const s = r.name.split(".").pop(),
    o = `${crypto.randomUUID()}.${s}`,
    l = `${t}/${o}`,
    { error: i } = await x.storage
      .from(f)
      .upload(l, r, { cacheControl: "3600", upsert: !1 });
  if (i) throw i;
}
async function oe(t) {
  if (N()) {
    await I(`/gallery/images?path=${encodeURIComponent(t)}`, {
      method: "DELETE",
    });
    return;
  }
  const { error: r } = await x.storage.from(f).remove([t]);
  if (r) throw r;
}
async function ie(t) {
  if (N()) {
    await I(`/gallery/albums/${encodeURIComponent(t)}`, { method: "DELETE" });
    return;
  }
  const { data: r, error: s } = await x.storage.from(f).list(t, { limit: 1e3 });
  if (s) throw s;
  if (!r || r.length === 0) return;
  const o = r.map((i) => `${t}/${i.name}`),
    { error: l } = await x.storage.from(f).remove(o);
  if (l) throw l;
}
const ne = "franciscolorenzo2406@gmail.com"
    .split(",")
    .map((t) => t.trim().toLowerCase()),
  be = () => {
    const [t, r] = d.useState([]),
      [s, o] = d.useState(""),
      [l, i] = d.useState([]),
      [n, y] = d.useState(!0),
      [w, c] = d.useState(!1),
      [u, v] = d.useState(!1),
      [S, b] = d.useState(!1),
      [g, A] = d.useState(""),
      E = d.useRef(null),
      { toast: p } = M();
    (d.useEffect(() => {
      (async () => {
        try {
          const m = (await K())?.email || "";
          (v(ne.includes(m.toLowerCase())), console.log("Cargando álbumes..."));
          const h = await k().catch(
            (C) => (console.error("Error cargando álbumes:", C), []),
          );
          if ((console.log("Álbumes encontrados:", h), h.length)) {
            (r(h), o(h[0].name));
            const C = await $(h[0].name).catch(() => []);
            i(C);
          } else (r([]), i([]));
        } finally {
          y(!1);
        }
      })();
    }, []),
      d.useEffect(() => {
        (async () => {
          if (!s) return;
          c(!0);
          const a = await $(s).catch(() => []);
          (i(a), c(!1));
        })();
      }, [s]));
    const D = async () => {
        if (!g.trim()) {
          p({
            title: "Error",
            description: "El nombre del álbum no puede estar vacío",
            variant: "destructive",
          });
          return;
        }
        try {
          (c(!0), b(!1), await ae(g.trim()));
          const a = await k().catch(() => []);
          (r(a), o(g.trim()));
          const m = await $(g.trim()).catch(() => []);
          (i(m),
            A(""),
            p({
              title: "Álbum creado",
              description: `El álbum "${g.trim()}" se creó exitosamente.`,
            }));
        } catch (a) {
          p({
            title: "Error",
            description: `No se pudo crear el álbum: ${a}`,
            variant: "destructive",
          });
        } finally {
          c(!1);
        }
      },
      B = async (a) => {
        const m = a.target.files;
        if (!m || !s) {
          p({
            title: "Error",
            description: "Primero selecciona un álbum",
            variant: "destructive",
          });
          return;
        }
        try {
          c(!0);
          for (const C of Array.from(m)) await re(s, C);
          const h = await $(s).catch(() => []);
          (i(h),
            p({
              title: "Fotos subidas",
              description: `${m.length} foto(s) subida(s) exitosamente.`,
            }));
        } catch (h) {
          p({
            title: "Error al subir fotos",
            description: `${h}`,
            variant: "destructive",
          });
        } finally {
          (c(!1), E.current && (E.current.value = ""));
        }
      },
      F = async (a) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta imagen?"))
          try {
            (c(!0), await oe(a));
            const m = await $(s).catch(() => []);
            (i(m),
              p({
                title: "Imagen eliminada",
                description: "La imagen se eliminó correctamente.",
              }));
          } catch (m) {
            p({
              title: "Error",
              description: `No se pudo eliminar la imagen: ${m}`,
              variant: "destructive",
            });
          } finally {
            c(!1);
          }
      },
      U = async () => {
        if (
          s &&
          confirm(
            `¿Estás seguro de que quieres eliminar el álbum "${s}" y todas sus fotos?`,
          )
        )
          try {
            (c(!0), await ie(s));
            const a = await k().catch(() => []);
            (r(a),
              o(a.length > 0 ? a[0].name : ""),
              i([]),
              p({
                title: "Álbum eliminado",
                description: `El álbum "${s}" se eliminó correctamente.`,
              }));
          } catch (a) {
            p({
              title: "Error",
              description: `No se pudo eliminar el álbum: ${a}`,
              variant: "destructive",
            });
          } finally {
            c(!1);
          }
      };
    return e.jsxs("div", {
      className: "min-h-screen bg-background",
      children: [
        e.jsx("section", {
          className: "pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6",
          children: e.jsx("div", {
            className: "container mx-auto px-4",
            children: e.jsxs("div", {
              className: "max-w-4xl mx-auto text-center",
              children: [
                e.jsxs("div", {
                  className:
                    "inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full mb-3 sm:mb-4",
                  children: [
                    e.jsx(P, {
                      className: "w-4 h-4 sm:w-5 sm:h-5 text-primary",
                    }),
                    e.jsx("span", {
                      className:
                        "text-primary font-semibold text-xs sm:text-sm",
                      children: "Galería",
                    }),
                  ],
                }),
                e.jsx("h1", {
                  className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-2",
                  children: "Momentos del Grupo",
                }),
                e.jsx("p", {
                  className: "text-sm sm:text-base text-muted-foreground",
                  children: "Explora los álbumes y revive nuestras actividades",
                }),
              ],
            }),
          }),
        }),
        u &&
          e.jsx("section", {
            className: "pb-2 sm:pb-3",
            children: e.jsx("div", {
              className: "container mx-auto px-4",
              children: e.jsxs("div", {
                className:
                  "flex flex-wrap items-center gap-2 sm:gap-3 justify-center",
                children: [
                  e.jsxs(j, {
                    variant: "outline",
                    size: "sm",
                    onClick: () => b(!0),
                    className: "gap-1 sm:gap-2 text-xs sm:text-sm",
                    children: [
                      e.jsx(L, { className: "w-3 h-3 sm:w-4 sm:h-4" }),
                      " Crear álbum",
                    ],
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("input", {
                        ref: E,
                        type: "file",
                        multiple: !0,
                        accept: "image/*",
                        onChange: B,
                        className: "hidden",
                        id: "upload-input",
                      }),
                      e.jsxs(j, {
                        variant: "outline",
                        size: "sm",
                        onClick: () =>
                          document.getElementById("upload-input")?.click(),
                        className: "gap-1 sm:gap-2 text-xs sm:text-sm",
                        disabled: !s,
                        children: [
                          e.jsx(W, { className: "w-3 h-3 sm:w-4 sm:h-4" }),
                          " Subir fotos",
                        ],
                      }),
                    ],
                  }),
                  s &&
                    e.jsxs(j, {
                      variant: "outline",
                      size: "sm",
                      onClick: U,
                      className:
                        "gap-1 sm:gap-2 text-xs sm:text-sm text-destructive hover:text-destructive",
                      children: [
                        e.jsx(O, { className: "w-3 h-3 sm:w-4 sm:h-4" }),
                        " Eliminar",
                      ],
                    }),
                ],
              }),
            }),
          }),
        e.jsx("section", {
          className: "pb-4 sm:pb-6",
          children: e.jsx("div", {
            className: "container mx-auto px-4",
            children:
              !n && t.length === 0
                ? e.jsx("div", {
                    className: "text-center text-muted-foreground py-4",
                    children: e.jsx("p", {
                      className: "text-xs sm:text-sm",
                      children: u
                        ? "No hay álbumes todavía. Crea tu primer álbum arriba."
                        : "No hay álbumes disponibles.",
                    }),
                  })
                : e.jsx("div", {
                    className: "flex flex-wrap gap-2 justify-center",
                    children: t.map((a) =>
                      e.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => o(a.name),
                          disabled: w,
                          "aria-pressed": s === a.name,
                          className: `px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background ${s === a.name ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent/60 border-border"}`,
                          children: a.name,
                        },
                        a.name,
                      ),
                    ),
                  }),
          }),
        }),
        e.jsx("section", {
          className: "pb-12 sm:pb-16",
          children: e.jsx("div", {
            className: "container mx-auto px-1 sm:px-2 md:px-4",
            children: w
              ? e.jsx("div", {
                  className: "flex justify-center py-16 sm:py-20",
                  children: e.jsx("div", {
                    className:
                      "w-8 h-8 sm:w-10 sm:h-10 border-2 border-primary border-t-transparent rounded-full animate-spin",
                  }),
                })
              : l.length
                ? e.jsx("div", {
                    className:
                      "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5 sm:gap-1 md:gap-2",
                    children: l.map((a, m) =>
                      e.jsx(
                        H,
                        {
                          className:
                            "rounded-none overflow-hidden group relative",
                          children: e.jsxs("div", {
                            className: "relative aspect-square",
                            children: [
                              e.jsx(te, {
                                src: a.url,
                                alt: `foto-${m}`,
                                aspectRatio: "square",
                                loading: "lazy",
                                showPlaceholder: !0,
                                className:
                                  "transition-transform duration-300 group-hover:scale-105",
                              }),
                              u &&
                                e.jsx("div", {
                                  className:
                                    "absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100",
                                  children: e.jsx(j, {
                                    variant: "destructive",
                                    size: "icon",
                                    onClick: () => F(a.path),
                                    className:
                                      "rounded-full w-8 h-8 sm:w-10 sm:h-10",
                                    children: e.jsx(R, {
                                      className: "w-3 h-3 sm:w-4 sm:h-4",
                                    }),
                                  }),
                                }),
                            ],
                          }),
                        },
                        m,
                      ),
                    ),
                  })
                : e.jsxs("div", {
                    className:
                      "text-center text-muted-foreground py-16 sm:py-20",
                    children: [
                      e.jsx(_, {
                        className: "w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3",
                      }),
                      e.jsx("p", {
                        className: "text-xs sm:text-sm",
                        children: "No hay imágenes en este álbum todavía.",
                      }),
                    ],
                  }),
          }),
        }),
        e.jsx(J, {
          open: S,
          onOpenChange: b,
          children: e.jsxs(X, {
            children: [
              e.jsxs(Y, {
                children: [
                  e.jsx(Z, { children: "Crear nuevo álbum" }),
                  e.jsx(Q, {
                    children:
                      "Ingresa el nombre del álbum o carpeta para organizar tus fotos.",
                  }),
                ],
              }),
              e.jsx("div", {
                className: "grid gap-4 py-4",
                children: e.jsxs("div", {
                  className: "grid gap-2",
                  children: [
                    e.jsx(se, {
                      htmlFor: "album-name",
                      children: "Nombre del álbum",
                    }),
                    e.jsx(ee, {
                      id: "album-name",
                      placeholder: "Ej: Campamento 2025",
                      value: g,
                      onChange: (a) => A(a.target.value),
                      onKeyDown: (a) => {
                        a.key === "Enter" && D();
                      },
                    }),
                  ],
                }),
              }),
              e.jsxs(V, {
                children: [
                  e.jsx(j, {
                    variant: "outline",
                    onClick: () => b(!1),
                    children: "Cancelar",
                  }),
                  e.jsxs(j, {
                    onClick: D,
                    children: [
                      e.jsx(L, { className: "w-4 h-4 mr-2" }),
                      "Crear álbum",
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  };
export { be as default };

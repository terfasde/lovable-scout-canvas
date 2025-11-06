import {
  j as e,
  r as x,
  k as n,
  y as p,
  P as u,
  a3 as h,
} from "./vendor-react-BgpSLK3q.js";
import { u as g, B as b, C as i, a as c } from "./index-CQXDJ8Au.js";
import { I as m } from "./input-CHZRhJfG.js";
import { T as j } from "./textarea-Do9KBTup.js";
import "./vendor-MRMtI2Il.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-router-VbqrkW3a.js";
import "./vendor-radix-B3dsqebR.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const f = { lat: -34.88597863841296, lng: -56.09309381677225 },
  v = "Volteadores 1753, Montevideo, Uruguay";
function N({ center: o = f, address: s = v, zoom: t = 15 }) {
  const r = "your-maps-api-key-here",
    l = s
      ? `https://www.google.com/maps/embed/v1/place?key=${r}&q=${encodeURIComponent(s)}&zoom=${t}`
      : `https://www.google.com/maps/embed/v1/view?key=${r}&center=${o.lat},${o.lng}&zoom=${t}`;
  return e.jsx("iframe", {
    title: "Mapa de ubicación - Grupo Scout Séptimo Montevideo",
    src: l,
    width: "100%",
    height: "100%",
    style: { border: 0, borderRadius: "0.5rem" },
    allowFullScreen: !0,
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
  });
}
const $ = () => {
  const { toast: o } = g(),
    [s, t] = x.useState({ name: "", email: "", phone: "", message: "" }),
    r = (a) => {
      if ((a.preventDefault(), !s.name || !s.email || !s.message)) {
        o({
          title: "Error",
          description: "Por favor completa todos los campos obligatorios",
          variant: "destructive",
        });
        return;
      }
      (o({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      }),
        t({ name: "", email: "", phone: "", message: "" }));
    },
    l = [
      {
        icon: p,
        title: "Dirección",
        content:
          "Volteadores 1753 entre Av. Italia y Almirón, Montevideo, Uruguay",
      },
      {
        icon: u,
        title: "Teléfono",
        content: "+598 098 138 668 (Pablo Silva, Jefe de Grupo)",
      },
      { icon: n, title: "Email", content: "scoutsseptimo7@gmail.com" },
      { icon: h, title: "Horarios", content: "Sábados 15:00h - 18:00h " },
    ];
  return e.jsxs("div", {
    className: "min-h-screen",
    children: [
      e.jsx("section", {
        className:
          "pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 via-accent/5 to-background",
        children: e.jsx("div", {
          className: "container mx-auto px-4 sm:px-6 lg:px-8",
          children: e.jsxs("div", {
            className: "max-w-3xl mx-auto text-center",
            children: [
              e.jsxs("div", {
                className:
                  "inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-sm",
                children: [
                  e.jsx(n, { className: "w-4 h-4 text-primary" }),
                  e.jsx("span", {
                    className:
                      "text-primary font-semibold text-xs sm:text-sm md:text-base",
                    children: "Contacto",
                  }),
                ],
              }),
              e.jsx("h1", {
                className:
                  "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight",
                children: "¿Quieres unirte al Séptimo?",
              }),
              e.jsx("p", {
                className:
                  "text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed",
                children:
                  "Estamos aquí para responder tus preguntas y ayudarte a formar parte de nuestra comunidad scout.",
              }),
            ],
          }),
        }),
      }),
      e.jsx("section", {
        className: "section-padding",
        children: e.jsx("div", {
          className: "container mx-auto px-4 sm:px-6 lg:px-8",
          children: e.jsxs("div", {
            className:
              "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16",
            children: [
              e.jsxs("div", {
                children: [
                  e.jsx("h2", {
                    className:
                      "text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6",
                    children: "Envíanos un mensaje",
                  }),
                  e.jsx("p", {
                    className:
                      "text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed",
                    children:
                      "Completa el formulario y nos pondremos en contacto contigo a la brevedad.",
                  }),
                  e.jsxs("form", {
                    onSubmit: r,
                    className: "space-y-4 sm:space-y-6",
                    children: [
                      e.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          e.jsx("label", {
                            className: "block text-sm font-semibold",
                            children: "Nombre completo *",
                          }),
                          e.jsx(m, {
                            type: "text",
                            value: s.name,
                            onChange: (a) => t({ ...s, name: a.target.value }),
                            placeholder: "Juan Pérez",
                            className:
                              "transition-all duration-300 focus:ring-2 focus:ring-primary",
                            required: !0,
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          e.jsx("label", {
                            className: "block text-sm font-semibold",
                            children: "Email *",
                          }),
                          e.jsx(m, {
                            type: "email",
                            value: s.email,
                            onChange: (a) => t({ ...s, email: a.target.value }),
                            placeholder: "juan@ejemplo.com",
                            className:
                              "transition-all duration-300 focus:ring-2 focus:ring-primary",
                            required: !0,
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          e.jsx("label", {
                            className: "block text-sm font-semibold",
                            children: "Teléfono",
                          }),
                          e.jsx(m, {
                            type: "tel",
                            value: s.phone,
                            onChange: (a) => t({ ...s, phone: a.target.value }),
                            placeholder: "+598 99 123 456",
                            className:
                              "transition-all duration-300 focus:ring-2 focus:ring-primary",
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          e.jsx("label", {
                            className: "block text-sm font-semibold",
                            children: "Mensaje *",
                          }),
                          e.jsx(j, {
                            value: s.message,
                            onChange: (a) =>
                              t({ ...s, message: a.target.value }),
                            placeholder: "Cuéntanos cómo podemos ayudarte...",
                            rows: 6,
                            className:
                              "transition-all duration-300 focus:ring-2 focus:ring-primary resize-none",
                            required: !0,
                          }),
                        ],
                      }),
                      e.jsxs(b, {
                        type: "submit",
                        size: "lg",
                        variant: "hero",
                        className:
                          "w-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105",
                        children: [
                          e.jsx(n, { className: "mr-2 w-4 h-4 sm:w-5 sm:h-5" }),
                          "Enviar Mensaje",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "space-y-6 sm:space-y-8",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("h2", {
                        className:
                          "text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6",
                        children: "Información de contacto",
                      }),
                      e.jsx("p", {
                        className:
                          "text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed",
                        children:
                          "Encuentra toda la información para comunicarte con nosotros.",
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className: "space-y-3 sm:space-y-4",
                    children: l.map((a, d) =>
                      e.jsx(
                        i,
                        {
                          className:
                            "card-hover border-2 hover:border-primary/50 transition-all duration-500",
                          children: e.jsx(c, {
                            className: "p-4 sm:p-6",
                            children: e.jsxs("div", {
                              className: "flex items-start gap-3 sm:gap-4",
                              children: [
                                e.jsx("div", {
                                  className:
                                    "w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110",
                                  children: e.jsx(a.icon, {
                                    className:
                                      "w-6 h-6 sm:w-7 sm:h-7 text-primary",
                                  }),
                                }),
                                e.jsxs("div", {
                                  className: "flex-1 min-w-0",
                                  children: [
                                    e.jsx("h3", {
                                      className:
                                        "font-bold text-base sm:text-lg mb-1 sm:mb-2",
                                      children: a.title,
                                    }),
                                    e.jsx("p", {
                                      className:
                                        "text-sm sm:text-base text-muted-foreground leading-relaxed break-words",
                                      children: a.content,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        },
                        d,
                      ),
                    ),
                  }),
                  e.jsx(i, {
                    className: "overflow-hidden shadow-xl border-2",
                    children: e.jsx(c, {
                      className: "p-0",
                      children: e.jsx("div", {
                        className:
                          "w-full h-64 sm:h-80 rounded-lg overflow-hidden",
                        children: e.jsx(N, {}),
                      }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
};
export { $ as default };

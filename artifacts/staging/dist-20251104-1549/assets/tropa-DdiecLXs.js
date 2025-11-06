import { j as s } from "./vendor-react-BgpSLK3q.js";
import { C as a, a as e, B as r, v as i } from "./index-CQXDJ8Au.js";
import { L as l } from "./vendor-router-VbqrkW3a.js";
import "./vendor-MRMtI2Il.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-radix-B3dsqebR.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const h = () =>
  s.jsx("div", {
    className: "min-h-screen",
    children: s.jsx("section", {
      className: "section-padding",
      children: s.jsxs("div", {
        className: "container mx-auto px-4",
        children: [
          s.jsx("h1", {
            className: "text-4xl font-bold mb-6",
            children: "Tropa",
          }),
          s.jsxs("div", {
            className: "grid md:grid-cols-2 gap-8",
            children: [
              s.jsx(a, {
                children: s.jsxs(e, {
                  className: "p-8",
                  children: [
                    s.jsx("p", {
                      className: "text-lg text-muted-foreground",
                      children:
                        "Información amplia sobre la Tropa: formación en habilidades, trabajo en equipo, patrullas y proyectos.",
                    }),
                    s.jsxs("ul", {
                      className:
                        "list-disc pl-5 mt-4 text-muted-foreground space-y-2",
                      children: [
                        s.jsx("li", { children: "Edades: 11–14 años" }),
                        s.jsx("li", {
                          children: "Actividades al aire libre y campamentos",
                        }),
                        s.jsx("li", {
                          children: "Desarrollo de habilidades prácticas",
                        }),
                      ],
                    }),
                    s.jsx("div", {
                      className: "mt-6",
                      children: s.jsx(r, {
                        asChild: !0,
                        children: s.jsx(l, {
                          to: "/contacto",
                          children: "Contactar",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              s.jsx("div", {
                children: s.jsx("img", {
                  src: i,
                  alt: "Tropa",
                  className: "rounded-2xl w-full object-cover shadow-lg",
                }),
              }),
            ],
          }),
        ],
      }),
    }),
  });
export { h as default };

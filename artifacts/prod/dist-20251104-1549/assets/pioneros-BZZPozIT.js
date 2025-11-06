import { j as s } from "./vendor-react-BgpSLK3q.js";
import { C as e, a as i, B as r, v as o } from "./index-wTsEScI4.js";
import { L as a } from "./vendor-router-VbqrkW3a.js";
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
            children: "Pioneros",
          }),
          s.jsxs("div", {
            className: "grid md:grid-cols-2 gap-8",
            children: [
              s.jsx(e, {
                children: s.jsxs(i, {
                  className: "p-8",
                  children: [
                    s.jsx("p", {
                      className: "text-lg text-muted-foreground",
                      children:
                        "Información amplia sobre Pioneros: proyectos, liderazgo, planificación y servicio.",
                    }),
                    s.jsxs("ul", {
                      className:
                        "list-disc pl-5 mt-4 text-muted-foreground space-y-2",
                      children: [
                        s.jsx("li", { children: "Edades: 14–17 años" }),
                        s.jsx("li", {
                          children: "Proyectos de servicio y formación",
                        }),
                        s.jsx("li", {
                          children: "Asunción de responsabilidades",
                        }),
                      ],
                    }),
                    s.jsx("div", {
                      className: "mt-6",
                      children: s.jsx(r, {
                        asChild: !0,
                        children: s.jsx(a, {
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
                  src: o,
                  alt: "Pioneros",
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

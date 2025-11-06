import { j as a } from "./vendor-react-BgpSLK3q.js";
import { C as s, a as e, B as i, v as d } from "./index-CQXDJ8Au.js";
import { L as r } from "./vendor-router-VbqrkW3a.js";
import "./vendor-MRMtI2Il.js";
import "./vendor-supabase-DQanAYxp.js";
import "./vendor-radix-B3dsqebR.js";
import "./vendor-style--X5BZniO.js";
import "./vendor-query-DDnmq2va.js";
const p = () =>
  a.jsx("div", {
    className: "min-h-screen",
    children: a.jsx("section", {
      className: "section-padding",
      children: a.jsxs("div", {
        className: "container mx-auto px-4",
        children: [
          a.jsx("h1", {
            className: "text-4xl font-bold mb-6",
            children: "Manada",
          }),
          a.jsxs("div", {
            className: "grid md:grid-cols-2 gap-8",
            children: [
              a.jsx(s, {
                children: a.jsxs(e, {
                  className: "p-8",
                  children: [
                    a.jsx("p", {
                      className: "text-lg text-muted-foreground",
                      children:
                        "Aquí va información amplia sobre la Manada: objetivos, actividades típicas, estructura, liderazgo, edades y cómo participar.",
                    }),
                    a.jsxs("ul", {
                      className:
                        "list-disc pl-5 mt-4 text-muted-foreground space-y-2",
                      children: [
                        a.jsx("li", { children: "Edades: 7–11 años" }),
                        a.jsx("li", { children: "Reuniones semanales" }),
                        a.jsx("li", {
                          children:
                            "Actividades: juegos, descubrimiento, manualidades, campamentos cortos",
                        }),
                      ],
                    }),
                    a.jsx("div", {
                      className: "mt-6",
                      children: a.jsx(i, {
                        asChild: !0,
                        children: a.jsx(r, {
                          to: "/contacto",
                          children: "Contactar",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              a.jsx("div", {
                children: a.jsx("img", {
                  src: d,
                  alt: "Manada",
                  className: "rounded-2xl w-full object-cover shadow-lg",
                }),
              }),
            ],
          }),
        ],
      }),
    }),
  });
export { p as default };

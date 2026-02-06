import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import {
  Archive,
  FileText,
  Image,
  Calendar,
  Newspaper,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";

const secciones = [
  {
    title: "Scoutpedia",
    description:
      "Definiciones, términos y contenidos enciclopédicos del historial scout.",
    to: "/archivo/scoutpedia",
  },
  {
    title: "Compañía",
    description:
      "Historia, actividades y documentación específica de la Compañía.",
    to: "/archivo/compania",
  },
  {
    title: "Miembros y exmiembros",
    description:
      "Listados históricos con revisión de privacidad y consentimiento.",
    to: "/archivo/miembros",
  },
];

const colecciones = [
  {
    title: "Noticias y comunicados",
    description:
      "Publicaciones históricas, comunicados internos y anuncios relevantes del grupo.",
    icon: Newspaper,
  },
  {
    title: "Eventos y actividades",
    description:
      "Calendarios, campamentos, jornadas y registros de actividades pasadas.",
    icon: Calendar,
  },
  {
    title: "Galerías y multimedia",
    description:
      "Fotos, afiches y material audiovisual del grupo.",
    icon: Image,
  },
  {
    title: "Documentos y archivos",
    description:
      "Documentos, actas, reglamentos y archivos descargables.",
    icon: FileText,
  },
];

const Archivo = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-sm">
              <Archive className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">
                Archivo del Grupo
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
              Archivo Histórico
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Este espacio reúne la información histórica del Grupo Scout
              Séptimo. La idea es conservar el contenido, mejorar su
              organización y hacerlo fácil de encontrar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contacto">
                <Button size="lg" className="gap-2">
                  <Layers className="w-4 h-4" />
                  Enviar material
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() =>
                  document
                    .getElementById("colecciones")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <ListChecks className="w-4 h-4" />
                Ver colecciones
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Colecciones */}
      <section
        id="colecciones"
        className="py-12 sm:py-16 bg-gradient-to-b from-background to-muted/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-4 shadow-sm">
                <Archive className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">
                  Colecciones
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Contenido organizado por tipo
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Agrupamos la información para que puedas navegarla fácil y
                encontrar lo que buscás en pocos clics.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {colecciones.map((item, index) => (
                <Reveal key={index}>
                  <Card className="card-hover h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-background via-background to-muted/20">
                    <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
                    <CardContent className="p-5 sm:p-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 sm:mt-12">
              <Reveal className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Secciones destacadas
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Entradas clave del archivo organizadas por temática.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {secciones.map((section, index) => (
                  <Reveal key={index}>
                    <Card className="card-hover border-2 border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 via-background to-accent/5">
                      <CardContent className="p-6">
                        <h4 className="text-lg sm:text-xl font-semibold mb-2">
                          {section.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          {section.description}
                        </p>
                        <Link to={section.to}>
                          <Button size="sm" variant="outline">
                            Abrir sección
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-4xl mx-auto">
            <Card className="card-hover border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-3">
                      <Layers className="w-4 h-4 text-primary" />
                      <span className="text-primary font-semibold text-xs sm:text-sm">
                        Archivo en construcción
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      ¿Tenés material de la página anterior?
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Si querés sumar contenido histórico, escribinos y lo
                      incorporamos al archivo.
                    </p>
                  </div>
                  <Link to="/contacto">
                    <Button size="lg" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Enviar material
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Archivo;

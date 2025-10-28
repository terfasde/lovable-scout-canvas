import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";

const Historia = () => {
  const locales = [
    {
      nombre: "Local Central",
      direccion: "Av. Italia 3456, Montevideo",
      año: "1965",
      descripcion: "Nuestro local principal, donde se realizan las reuniones semanales y actividades regulares de todas las ramas.",
      caracteristicas: ["Salón de reuniones", "Patio amplio", "Depósito de materiales", "Cocina equipada"]
    },
    {
      nombre: "Campo de Campamento",
      direccion: "Ruta 8 Km 45, Canelones",
      año: "1982",
      descripcion: "Espacio natural donde realizamos nuestros campamentos y actividades al aire libre.",
      caracteristicas: ["10 hectáreas", "Zona de fogones", "Arroyos naturales", "Senderos señalizados"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Nuestros Espacios</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Historia de Nuestros Locales
            </h1>
            <p className="text-xl text-muted-foreground">
              Los espacios que han sido testigos de nuestra historia y el crecimiento de generaciones de scouts.
            </p>
          </div>
        </div>
      </section>

      {/* Locales Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {locales.map((local, index) => (
              <Card key={index} className="card-hover overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8">
                      <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-4">
                        <span className="text-primary font-semibold text-sm">Desde {local.año}</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4">{local.nombre}</h2>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground">{local.direccion}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground">Establecido en {local.año}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6">
                        {local.descripcion}
                      </p>

                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Características
                        </h3>
                        <ul className="space-y-2">
                          {local.caracteristicas.map((caracteristica, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-muted-foreground">{caracteristica}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MapPin className="w-16 h-16 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Próximamente: Fotos del local</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Historia adicional */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="card-hover">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Evolución de Nuestros Espacios</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A lo largo de más de 60 años, nuestros locales han sido el corazón del Grupo Scout Séptimo de Montevideo.
                    Desde nuestras primeras reuniones en 1964, hemos trabajado constantemente para mejorar y ampliar
                    nuestras instalaciones.
                  </p>
                  <p>
                    El local central ha sido renovado y adaptado múltiples veces para satisfacer las necesidades
                    cambiantes de nuestras actividades. Cada rincón cuenta historias de campamentos planificados,
                    promesas realizadas y amistades forjadas.
                  </p>
                  <p>
                    Nuestro campo de campamento es un tesoro natural que cuidamos con dedicación. Es el lugar donde
                    nuestros scouts aprenden sobre la naturaleza, desarrollan habilidades de supervivencia y crean
                    recuerdos que durarán toda la vida.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Historia;

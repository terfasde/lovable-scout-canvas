import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-scouts.jpg";

const Rovers = () => {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Rovers</h1>
          <p className="text-xl text-primary font-semibold mb-6">Lema: "Servir"</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-4">
                  Los Rovers, de 18 a 21 años, emprenden su propio camino de crecimiento personal y compromiso social. Es una etapa de madurez, reflexión y servicio al prójimo.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Los proyectos rover apuntan a servir, conocer, viajar y compartir experiencias que consolidan su identidad como ciudadanos activos y solidarios.
                </p>
                <p className="text-lg text-muted-foreground">
                  Ser Rover es aprender a vivir con sentido, con los valores scouts como brújula y con el corazón dispuesto a servir donde haga falta.
                </p>
                <ul className="list-disc pl-5 mt-6 text-muted-foreground space-y-2">
                  <li>Edades: 18–21 años</li>
                  <li>Enfoque en servicio y autonomía</li>
                  <li>Proyectos de crecimiento personal y comunitario</li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/contacto">Contactar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <img
                src={communityImage}
                alt="Grupo Scout Séptimo - Comunidad"
                loading="lazy"
                width="600"
                height="400"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Footer global en App.tsx */}
    </div>
  );
};

export default Rovers;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-scouts.jpg";

const Pioneros = () => {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Pioneros</h1>
          <p className="text-xl text-primary font-semibold mb-6">Lema: "Servir"</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-4">
                  Los Pioneros, jóvenes de 15 a 17 años, viven una etapa de acción, servicio y liderazgo. Es el momento de poner manos a la obra para transformar su entorno: organizan actividades solidarias, proyectos comunitarios y campamentos donde ponen en práctica todo lo aprendido.
                </p>
                <p className="text-lg text-muted-foreground">
                  Con espáritu crático y creativo, buscan dejar huella positiva en su grupo, en su barrio y en sá mismos. Son jóvenes comprometidos con un mundo más justo, solidario y sostenible.
                </p>
                <ul className="list-disc pl-5 mt-6 text-muted-foreground space-y-2">
                  <li>Edades: 15–17 años</li>
                  <li>Proyectos de servicio comunitario</li>
                  <li>Liderazgo y compromiso social</li>
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

export default Pioneros;


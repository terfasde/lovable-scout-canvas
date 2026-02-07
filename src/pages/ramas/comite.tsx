import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-scouts.jpg";

const Comite = () => {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Comité de Padres</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-4">
                  El Comité de Padres es un pilar fundamental del grupo. Formado por madres, padres y familiares, acompañan la labor educativa brindando apoyo logástico, económico y humano.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Organizan eventos, gestionan recursos, mantienen el local y colaboran en cada campamento o actividad importante.
                </p>
                <p className="text-lg text-muted-foreground">
                  Su participación fortalece la comunidad scout y demuestra que, cuando las familias se comprometen, los sueños de los chicos se hacen realidad.
                </p>
                <ul className="list-disc pl-5 mt-6 text-muted-foreground space-y-2">
                  <li>Apoyo logástico y económico</li>
                  <li>Organización de eventos y gestión de recursos</li>
                  <li>Participación activa de padres y familiares</li>
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
                alt="Comité de Padres"
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

export default Comite;


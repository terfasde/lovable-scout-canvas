import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-scouts.jpg";

const Staff = () => {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Educadores</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-4">
                  Los Educadores Scouts son voluntarios que acompañan, guían y sostienen el crecimiento de cada niño, niña y joven del grupo.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Desde la vocación y el compromiso, dedican su tiempo a planificar actividades, capacitarse, formar equipos y vivir el escultismo con alegría y coherencia.
                </p>
                <p className="text-lg text-muted-foreground">
                  Su misión es formar personas libres, responsables y felices, siendo testimonio vivo de los valores que inspiran el Movimiento Scout.
                </p>
                <ul className="list-disc pl-5 mt-6 text-muted-foreground space-y-2">
                  <li>Formación continua de educadores</li>
                  <li>Planificación y coordinación de actividades</li>
                  <li>Acompañamiento personalizado de cada joven</li>
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
                alt="Educadores"
                className="rounded-2xl w-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Footer global en App.tsx */}
    </div>
  );
};

export default Staff;

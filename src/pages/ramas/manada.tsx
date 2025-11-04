import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-scouts.jpg";

const Manada = () => {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Manada</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground">
                  Aquí va información amplia sobre la Manada: objetivos, actividades típicas, estructura, liderazgo, edades y cómo participar.
                </p>
                <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                  <li>Edades: 7–11 años</li>
                  <li>Reuniones semanales</li>
                  <li>Actividades: juegos, descubrimiento, manualidades, campamentos cortos</li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/contacto">Contactar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <img src={communityImage} alt="Manada" className="rounded-2xl w-full object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      {/* Footer global en App.tsx */}
    </div>
  );
};

export default Manada;

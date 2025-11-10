import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-scouts.jpg";

const Manada = () => {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Manada</h1>
          <p className="text-xl text-primary font-semibold mb-6">Lema: "Siempre lo mejor"</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-4">
                  La Manada es el primer paso en la aventura scout. Está integrada por niñas y niños de 7 a 10 años, que descubren el mundo a través del juego, la imaginación y la vida en grupo. Inspirados en El Libro de la Selva, aprenden valores como la amistad, el respeto y la ayuda mutua.
                </p>
                <p className="text-lg text-muted-foreground">
                  Sus actividades están llenas de canciones, exploraciones y desafíos simples que despiertan la curiosidad y el amor por la naturaleza. En la Manada, cada uno encuentra su lugar en la selva y aprende, jugando, a ser mejor persona junto al resto de los integrantes de la manada.
                </p>
                <ul className="list-disc pl-5 mt-6 text-muted-foreground space-y-2">
                  <li>Edades: 7–10 años</li>
                  <li>Reuniones semanales</li>
                  <li>Actividades: juegos, canciones, exploraciones y manualidades</li>
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
                alt="Manada"
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

export default Manada;

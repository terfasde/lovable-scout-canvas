import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community-scouts.jpg";

const Pioneros = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Pioneros</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground">
                  Información amplia sobre Pioneros: proyectos, liderazgo, planificación y servicio.
                </p>
                <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                  <li>Edades: 14–17 años</li>
                  <li>Proyectos de servicio y formación</li>
                  <li>Asunción de responsabilidades</li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/contacto">Contactar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <img src={communityImage} alt="Pioneros" className="rounded-2xl w-full object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pioneros;

import { Shield, Heart, Compass, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import communityImage from "@/assets/community-scouts.jpg";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Compromiso",
      description: "Formamos líderes comprometidos con su comunidad y el mundo",
    },
    {
      icon: Heart,
      title: "Fraternidad",
      description: "Construimos lazos de amistad y apoyo mutuo que duran toda la vida",
    },
    {
      icon: Compass,
      title: "Aventura",
      description: "Exploramos, descubrimos y crecemos a través de experiencias al aire libre",
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Nos esforzamos por dar lo mejor de nosotros en cada actividad",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Quiénes Somos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Más que un grupo scout, una familia
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              El Grupo Scout Séptimo de Montevideo fue fundado en 1957 y desde entonces 
              hemos sido un pilar fundamental en la formación de jóvenes comprometidos 
              con los valores del escultismo.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              A través de actividades al aire libre, campamentos, proyectos comunitarios 
              y eventos como el BAUEN, cultivamos el liderazgo, la autonomía y el 
              servicio en cada uno de nuestros scouts.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="px-4 py-2 bg-primary/5 rounded-lg">
                <div className="font-bold text-primary">200+</div>
                <div className="text-muted-foreground">Miembros activos</div>
              </div>
              <div className="px-4 py-2 bg-accent/5 rounded-lg">
                <div className="font-bold text-accent">50+</div>
                <div className="text-muted-foreground">Eventos al año</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={communityImage}
              alt="Comunidad Scout Séptimo"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="card-hover border-none shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

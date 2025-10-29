import { Shield, Heart, Compass, Award, Tent, Users, Flame, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import communityImage from "@/assets/community-scouts.jpg";

const About = () => {
  const branches = [
    {
      icon: Heart,
      title: "Manada",
      description: "Niños de 7 a 11 años, aprenden jugando y descubriendo el mundo scout"
    },
    {
      icon: Compass,
      title: "Tropa",
      description: "Jóvenes de 11 a 14 años, desarrollan habilidades y trabajo en equipo"
    },
    {
      icon: Tent,
      title: "Pioneros",
      description: "Adolescentes de 14 a 17 años, lideran proyectos y asumen responsabilidades"
    },
    {
      icon: Flame,
      title: "Rovers",
      description: "Jóvenes adultos de 17 a 21 años, servicio a la comunidad y liderazgo"
    },
    {
      icon: Users,
      title: "Staff",
      description: "Educadores scouts que guían y acompañan el desarrollo de las ramas"
    },
    {
      icon: Shield,
      title: "Comité",
      description: "Padres y colaboradores que apoyan la gestión del grupo"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Promesa y Ley Scout",
      description: "Los fundamentos morales y éticos que guían nuestro comportamiento y desarrollo personal"
    },
    {
      icon: Tent,
      title: "Vida en la Naturaleza",
      description: "El contacto directo con el medio ambiente como espacio de aprendizaje y crecimiento"
    },
    {
      icon: Compass,
      title: "Aprendizaje por la Acción",
      description: "Educación activa a través de la experiencia directa y la práctica constante"
    },
    {
      icon: Heart,
      title: "Valores y Virtudes",
      description: "Desarrollo del carácter y la formación integral basada en valores scouts universales"
    }
  ];

  return (
    <section id="historia" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Branches Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16 overflow-x-auto">
          {branches.map((branch, index) => (
            <Card key={index} className="card-hover border-none shadow-sm min-w-[160px] aspect-square">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <branch.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{branch.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3">{branch.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Introduction */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Quienes somos
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              El método scout se sustenta en cuatro pilares fundamentales que guían nuestro desarrollo y actividades. Estos pilares representan la esencia del escultismo y son la base sobre la que construimos el carácter, las habilidades y los valores de nuestros jóvenes.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              La Promesa y la Ley Scout, junto con la vida en la naturaleza, el aprendizaje por la acción y el desarrollo de valores y virtudes, forman un método educativo integral que ha demostrado su efectividad a lo largo de más de un siglo de escultismo mundial.
            </p>
          </div>
          <div className="relative">
            <img src={communityImage} alt="Comunidad Scout Séptimo" className="rounded-2xl shadow-2xl w-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="bg-muted/10 rounded-2xl p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Los Pilares del Escultismo</h3>
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
      </div>
    </section>
  );
};

export default About;
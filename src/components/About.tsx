import { Shield, Heart, Compass, Award, Tent, Users, Flame, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import communityImage from "@/assets/community-scouts.jpg";

const About = () => {
  const branches = [
    {
      icon: Heart,
      title: "Manada",
      description: "Niños de 7 a 11 años, aprenden jugando y descubriendo el mundo scout",
      route: "manada",
  hoverClass: "hover:bg-yellow-200 hover:text-foreground"
    },
    {
      icon: Compass,
      title: "Tropa",
      description: "Jóvenes de 11 a 14 años, desarrollan habilidades y trabajo en equipo",
      route: "tropa",
  hoverClass: "hover:bg-emerald-200 hover:text-foreground"
    },
    {
      icon: Tent,
      title: "Pioneros",
      description: "Adolescentes de 14 a 17 años, lideran proyectos y asumen responsabilidades",
      route: "pioneros",
  hoverClass: "hover:bg-sky-200 hover:text-foreground"
    },
    {
      icon: Flame,
      title: "Rovers",
      description: "Jóvenes adultos de 17 a 21 años, servicio a la comunidad y liderazgo",
      route: "rovers",
  hoverClass: "hover:bg-rose-200 hover:text-foreground"
    },
    {
      icon: Users,
      title: "Staff",
      description: "Educadores scouts que guían y acompañan el desarrollo de las ramas",
      route: "staff",
  hoverClass: "hover:bg-neutral-800 hover:text-white"
    },
    {
      icon: Shield,
      title: "Comité",
      description: "Padres y colaboradores que apoyan la gestión del grupo",
      route: "comite",
  hoverClass: "hover:bg-orange-200 hover:text-foreground"
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
            <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className={`card-hover border-none shadow-sm min-w-[160px] aspect-square cursor-pointer transition-colors duration-200 ${branch.hoverClass}`}>
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                        <branch.icon className="w-6 h-6 text-current" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{branch.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">{branch.description}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl">
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <DialogTitle>{branch.title}</DialogTitle>
                    <DialogDescription>
                      <p className="mt-2 text-muted-foreground">{branch.description}</p>
                      <p className="mt-4 text-muted-foreground">Aquí puedes ampliar con más información sobre la rama: actividades típicas, edades, objetivos y datos de contacto o reuniones.</p>
                    </DialogDescription>
                  </div>

                  <div className="w-full">
                    <img src={communityImage} alt={branch.title} className="w-full rounded-lg object-cover max-h-[420px]" />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3 justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/ramas/${branch.route}`}>Más información</Link>
                  </Button>
                  <DialogClose />
                </div>
              </DialogContent>
            </Dialog>
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
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
      description: "Niños de 7 a 10 años, aprenden jugando y descubriendo el mundo scout",
      route: "manada",
  hoverClass: "hover:bg-[#FEB21A] hover:text-white",
  hoverIconClass: "group-hover:text-white"
    },
    {
      icon: Compass,
      title: "Tropa",
      description: "Jóvenes de 11 a 14 años, desarrollan habilidades y trabajo en equipo",
      route: "tropa",
      hoverClass: "hover:bg-[#344F1F] hover:text-white",
      hoverIconClass: "group-hover:text-white"
    },
    {
      icon: Tent,
      title: "Pioneros",
      description: "Adolescentes de 15 a 17 años, lideran proyectos y asumen responsabilidades",
      route: "pioneros",
      hoverClass: "hover:bg-[#134686] hover:text-white",
      hoverIconClass: "group-hover:text-white"
    },
    {
      icon: Flame,
      title: "Rovers",
      description: "Jóvenes adultos de 18 a 20 años, servicio a la comunidad y liderazgo",
      route: "rovers",
      hoverClass: "hover:bg-[#DD0303] hover:text-white",
      hoverIconClass: "group-hover:text-white"
    },
    {
      icon: Users,
      title: "Staff",
      description: "Educadores scouts que guían y acompañan el desarrollo de las ramas",
      route: "staff",
      hoverClass: "hover:bg-violet-700 hover:text-white",
      hoverIconClass: "group-hover:text-white"
    },
    {
      icon: Shield,
      title: "Comité",
      description: "Padres y colaboradores que apoyan la gestión del grupo",
      route: "comite",
      hoverClass: "hover:bg-orange-600 hover:text-white",
      hoverIconClass: "group-hover:text-white"
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
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Nuestras Ramas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada etapa del escultismo está diseñada para acompañar el crecimiento y desarrollo de nuestros jóvenes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-visible py-4">
            {branches.map((branch, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className={`card-hover border-none shadow-sm min-w-[140px] aspect-square cursor-pointer transition-all duration-300 group ${branch.hoverClass}`}>
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center gap-2">
                      <div className="w-14 h-14 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300">
                        <branch.icon className={`w-7 h-7 text-current transition-colors duration-300 ${branch.hoverIconClass}`} />
                      </div>
                      <h3 className="text-base font-bold transition-colors duration-300">{branch.title}</h3>
                      <p className="text-xs text-muted-foreground group-hover:text-white line-clamp-2 transition-colors duration-300">
                        {branch.description}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div>
                      <DialogTitle className="text-2xl mb-4">{branch.title}</DialogTitle>
                      <DialogDescription className="space-y-4">
                        <p className="text-base">{branch.description}</p>
                        <p>
                          En esta rama desarrollamos actividades específicas diseñadas para la edad y etapa de desarrollo de nuestros scouts. 
                          Cada encuentro está pensado para fomentar el crecimiento personal, el compañerismo y el aprendizaje de habilidades prácticas.
                        </p>
                        <div className="pt-4 border-t">
                          <h4 className="font-semibold mb-2">¿Cuándo nos reunimos?</h4>
                          <p>Consulta los horarios y días de reunión específicos de esta rama.</p>
                        </div>
                      </DialogDescription>
                    </div>

                    <div className="w-full space-y-4">
                      <img 
                        src={communityImage} 
                        alt={branch.title} 
                        className="w-full rounded-lg object-cover aspect-video shadow-lg" 
                      />
                      <div className="flex gap-3 justify-end">
                        <DialogClose asChild>
                          <Button variant="outline" size="sm">Cerrar</Button>
                        </DialogClose>
                        <Button asChild size="sm">
                          <Link to={`/ramas/${branch.route}`}>Más información</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Main Introduction */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Quiénes Somos
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="pt-4">
              <Button asChild size="lg">
                <Link to="/historia">Conoce nuestra historia</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={communityImage} 
                alt="Comunidad Scout Séptimo" 
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" 
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl -z-0"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent rounded-full opacity-20 blur-3xl -z-0"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-3">Los Pilares del Escultismo</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cuatro fundamentos que nos guían en la formación integral de nuestros jóvenes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="card-hover border-none shadow-md bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
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
import {
  Shield,
  Heart,
  Compass,
  Award,
  Tent,
  Users,
  Flame,
  History,
} from "lucide-react";
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
import { Reveal } from "@/components/Reveal";
import communityImage from "@/assets/community-scouts.jpg";

const About = () => {
  const branches = [
    {
      icon: Heart,
      title: "Manada",
      description:
        "Niños de 7 a 10 años, aprenden jugando y descubriendo el mundo scout",
      route: "manada",
      hoverClass: "hover:bg-[#FEB21A] hover:text-white",
      hoverIconClass: "group-hover:text-white",
      detailText:
        "En la Manada los niños descubren el mundo a través del juego, canciones, exploraciones y desafíos simples. Inspirados en El Libro de la Selva, cada encuentro despierta su curiosidad y amor por la naturaleza, aprendiendo valores como la amistad, el respeto y la ayuda mutua en un ambiente divertido y seguro.",
    },
    {
      icon: Compass,
      title: "Tropa",
      description:
        "Jóvenes de 11 a 14 años, desarrollan habilidades y trabajo en equipo",
      route: "tropa",
      hoverClass: "hover:bg-[#344F1F] hover:text-white",
      hoverIconClass: "group-hover:text-white",
      detailText:
        "La Tropa es pura aventura: patrullas, construcciones, campamentos y proyectos donde aprenden a trabajar en equipo, tomar decisiones y asumir responsabilidades. Cada actividad es una oportunidad para vivir la Ley y la Promesa Scout, construyendo carácter y compromiso bajo las estrellas.",
    },
    {
      icon: Tent,
      title: "Pioneros",
      description:
        "Adolescentes de 15 a 17 años, lideran proyectos y asumen responsabilidades",
      route: "pioneros",
      hoverClass: "hover:bg-[#134686] hover:text-white",
      hoverIconClass: "group-hover:text-white",
      detailText:
        "Los Pioneros ponen manos a la obra organizando actividades solidarias, proyectos comunitarios y campamentos de servicio. Con espíritu crítico y creativo, transforman su entorno y dejan huella positiva en su grupo y comunidad, comprometiéndose con un mundo más justo y sostenible.",
    },
    {
      icon: Flame,
      title: "Rovers",
      description:
        "Jóvenes adultos de 18 a 21 años, servicio a la comunidad y liderazgo",
      route: "rovers",
      hoverClass: "hover:bg-[#DD0303] hover:text-white",
      hoverIconClass: "group-hover:text-white",
      detailText:
        "Los Rovers emprenden su propio camino de crecimiento personal a través de proyectos de servicio, viajes y experiencias que consolidan su identidad como ciudadanos activos. Aprenden a vivir con sentido, con los valores scouts como brújula y el corazón dispuesto a servir donde haga falta.",
    },
    {
      icon: Users,
      title: "Educadores",
      description:
        "Educadores scouts que guían y acompañan el desarrollo de las ramas",
      route: "staff",
      hoverClass: "hover:bg-violet-700 hover:text-white",
      hoverIconClass: "group-hover:text-white",
      detailText:
        "Los Educadores Scouts son voluntarios que dedican su tiempo a planificar actividades, capacitarse y acompañar el crecimiento de cada niño y joven. Desde la vocación y el compromiso, son testimonio vivo de los valores scouts, formando personas libres, responsables y felices.",
    },
    {
      icon: Shield,
      title: "Comité de Padres",
      description: "Padres y colaboradores que apoyan la gestión del grupo",
      route: "comite",
      hoverClass: "hover:bg-orange-600 hover:text-white",
      hoverIconClass: "group-hover:text-white",
      detailText:
        "El Comité de Padres organiza eventos, gestiona recursos, mantiene el local y colabora en cada campamento y actividad importante. Su participación fortalece la comunidad scout y demuestra que cuando las familias se comprometen, los sueños de los chicos se hacen realidad.",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Promesa y Ley Scout",
      description:
        "Los fundamentos morales y éticos que guían nuestro comportamiento y desarrollo personal",
    },
    {
      icon: Tent,
      title: "Vida en la Naturaleza",
      description:
        "El contacto directo con el medio ambiente como espacio de aprendizaje y crecimiento",
    },
    {
      icon: Compass,
      title: "Aprendizaje por la Acción",
      description:
        "Educación activa a través de la experiencia directa y la práctica constante",
    },
    {
      icon: Heart,
      title: "Valores y Virtudes",
      description:
        "Desarrollo del carácter y la formación integral basada en valores scouts universales",
    },
  ];

  return (
    <section id="historia" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Main Introduction - FIRST */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <Reveal>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Quiénes Somos
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos un Grupo Scout, una comunidad que acompaña el crecimiento de niños, niñas, jóvenes y adolescentes a través del juego, la aventura, el servicio y la vida al aire libre.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Formamos parte del Movimiento Scout del Uruguay y del Movimiento Scout Mundial, un espacio presente en más de 170 países, que busca contribuir a la construcción de un mundo mejor, donde cada persona viva con sentido, compromiso y alegría.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En nuestro grupo, las distintas unidades —Manada, Rama Scout, Pioneros y Rovers— comparten un mismo camino: aprender haciendo, desarrollar habilidades, fortalecer valores y descubrir el poder del trabajo en equipo.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A través de campamentos, proyectos comunitarios, juegos, construcciones y desafíos personales, cada integrante aprende a ser responsable, solidario, respetuoso y activo en su entorno.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Detrás de todo esto hay un equipo de educadores voluntarios que guía, orienta y acompaña cada etapa, y un Comité de Padres que brinda su apoyo constante para hacer posible cada actividad.
              </p>
              <p className="text-lg text-primary font-semibold leading-relaxed">
                Ser scout es vivir con una sonrisa, con la mochila llena de experiencias y con el corazón dispuesto a servir.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos un grupo que se enorgullece de sus tradiciones, respetando y tomando de la esencia del escultismo lo mejor, llevándolo a nuestros días. Somos un grupo donde la amistad, el respeto y el amor por la naturaleza nos unen en una gran familia que crece cada día, aprende y deja huella.
              </p>
              <div className="pt-6 flex gap-4">
                <Button asChild size="lg">
                  <Link to="/historia">Conoce nuestra historia</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contacto">Únete al grupo</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={communityImage}
                  alt="Comunidad Scout Séptimo"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary rounded-full opacity-20 blur-3xl -z-0"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-accent rounded-full opacity-20 blur-3xl -z-0"></div>
            </div>
          </Reveal>
        </div>

        {/* Branches Grid - SECOND */}
        <div className="mb-20">
          <Reveal className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Nuestras Unidades
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada etapa del escultismo está diseñada para acompañar el
              crecimiento y desarrollo de nuestros jóvenes
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-visible py-4">
            {branches.map((branch, index) => (
              <Reveal key={index}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Card
                      className={`card-hover border-none shadow-sm min-w-[140px] aspect-square cursor-pointer transition-all duration-300 group ${branch.hoverClass}`}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center gap-2">
                        <div className="w-14 h-14 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300">
                          <branch.icon
                            className={`w-7 h-7 text-current transition-colors duration-300 ${branch.hoverIconClass}`}
                          />
                        </div>
                        <h3 className="text-base font-bold transition-colors duration-300">
                          {branch.title}
                        </h3>
                        <p className="text-xs text-muted-foreground group-hover:text-white line-clamp-2 transition-colors duration-300">
                          {branch.description}
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                      <div>
                        <DialogTitle className="text-2xl mb-4">
                          {branch.title}
                        </DialogTitle>
                        <DialogDescription className="space-y-4">
                          <p className="text-base">{branch.description}</p>
                          <p>{branch.detailText}</p>
                          <div className="pt-4 border-t">
                            <h4 className="font-semibold mb-2">
                              ¿Cuándo nos reunimos?
                            </h4>
                            <p>
                              Consulta los horarios y días de reunión
                              específicos de esta rama.
                            </p>
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
                            <Button variant="outline" size="sm">
                              Cerrar
                            </Button>
                          </DialogClose>
                          <Button asChild size="sm">
                            <Link to={`/ramas/${branch.route}`}>
                              Más información
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <Reveal>
          <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Los Pilares del Escultismo
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cuatro fundamentos que nos guían en la formación integral de
                nuestros jóvenes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="card-hover border-none shadow-md bg-card/50 backdrop-blur-sm group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;

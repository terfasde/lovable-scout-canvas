import { Shield, Heart, Compass, Award, Tent, Users, Flame, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import communityImage from "@/assets/community-scouts.jpg";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Compromiso",
      description: "Formamos líderes comprometidos con su comunidad y el mundo"
    },
    {
      icon: Heart,
      title: "Fraternidad",
      description: "Construimos lazos de amistad y apoyo mutuo que duran toda la vida"
    },
    {
      icon: Compass,
      title: "Aventura",
      description: "Exploramos, descubrimos y crecemos a través de experiencias al aire libre"
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Nos esforzamos por dar lo mejor de nosotros en cada actividad"
    }
  ];

  return (
    <section id="historia" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Main Introduction */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Quiénes Somos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Más que un grupo scout, una familia
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              El Grupo Scout Séptimo es una comunidad educativa y de servicio con una historia ininterrumpida desde 1964, formada por cientos de niños, jóvenes y adultos que comparten los valores del escultismo: el servicio, la fraternidad, el respeto por la naturaleza y la búsqueda constante de dejar el mundo mejor de como lo encontramos.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              A lo largo de sus más de 60 años de trayectoria, el Séptimo se ha convertido en uno de los grupos scouts más emblemáticos de Montevideo (Uruguay), con un fuerte espíritu familiar, una rica tradición de campamentos, juegos, cantos y construcciones pioneriles, y una identidad visual marcada por los colores rojo, amarillo y negro.
            </p>
          </div>
          <div className="relative">
            <img src={communityImage} alt="Comunidad Scout Séptimo" className="rounded-2xl shadow-2xl w-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Historia Section */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
          <div className="flex items-center mb-6">
            <History className="w-8 h-8 text-primary mr-3" />
            <h3 className="text-3xl font-bold">Su Historia</h3>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Desde su fundación en 1964, el grupo ha pasado por numerosos locales —como el Colegio Alemán, Elías Regules, Gral. Paz y Rivera, San Pedro, Tomás Gómez, El Cilindro, El Tajamar, Av. Bolivia, el terreno de David, el Baldío del Banco Central, el Club Juan Ferreira, y Volteadores— reflejando su crecimiento y adaptación a lo largo de las décadas.
          </p>
          <p className="text-lg text-muted-foreground">
            El Séptimo ha desarrollado tradiciones propias, entre ellas el legendario BAUEN, una competencia de pionerismo, campismo y cocina, celebrada en el Parque Baroffio. Su nombre proviene del alemán "bauen", que significa construir, y simboliza el espíritu creativo y cooperativo del grupo.
          </p>
        </div>

        {/* Espíritu Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Flame className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Su Espíritu</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Más que un grupo scout, el Séptimo es una familia intergeneracional, donde han convivido varias generaciones de scouts, guiadores y dirigentes. La vida del grupo está llena de anécdotas, desafíos y momentos compartidos en el fogón.
              </p>
              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-semibold text-foreground italic">
                  "Construimos juntos, con alegría y compromiso, el camino del Séptimo."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Hoy</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                En la actualidad, el Grupo Scout Séptimo sigue activo, con sus ramas de Manada, Tropa, Caminantes y Rovers, participando en encuentros nacionales e internacionales, proyectos comunitarios y actividades de integración.
              </p>
              <p className="text-muted-foreground">
                Su historia viva continúa escribiéndose año a año, con nuevas generaciones que heredan la pasión y los valores que lo sostienen desde hace más de seis décadas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
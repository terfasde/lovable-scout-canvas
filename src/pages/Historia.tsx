import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import emblemImage from "@/assets/scout-emblem.jpg";

const Historia = () => {
  const milestones = [
    {
      year: "1964",
      title: "Fundación del Grupo",
      description: "Nace el Grupo Scout Séptimo de Montevideo con un grupo de jóvenes visionarios comprometidos con los valores del escultismo.",
    },
    {
      year: "1965",
      title: "Primer Local Propio",
      description: "Inauguramos nuestro primer local, consolidando nuestra presencia en la comunidad.",
    },
    {
      year: "2004",
      title: "Nace BAUEN",
      description: "Se crea la competencia BAUEN, que se convertirá en el evento más importante del escultismo uruguayo.",
    },
    {
      year: "1990",
      title: "Expansión de Ramas",
      description: "Incorporamos todas las ramas del escultismo, desde castores hasta rovers, ofreciendo formación integral.",
    },
    {
      year: "2007",
      title: "50 Años de Historia",
      description: "Celebramos medio siglo de trayectoria con un campamento histórico que reunió a generaciones de scouts.",
    },
    {
      year: "2020",
      title: "Adaptación Digital",
      description: "Durante la pandemia, innovamos con actividades virtuales manteniendo vivo el espíritu scout.",
    },
    {
      year: "2024",
      title: "Campeones BAUEN 2024",
      description: "Obtuvimos nuestro quinto campeonato en BAUEN, reafirmando nuestro compromiso con la excelencia.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Nuestra Historia</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              61 Años Construyendo Futuro
            </h1>
            <p className="text-xl text-muted-foreground">
              Desde 1964, hemos sido parte fundamental del movimiento scout uruguayo,
              formando generaciones de líderes comprometidos con su comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <img
                src={emblemImage}
                alt="Emblemas Scout"
                className="w-full rounded-lg shadow-lg mb-4"
              />
            </div>
            <div className="md:col-span-2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">El Comienzo de una Tradición</h2>
              <p className="text-lg text-muted-foreground mb-4">
                El Grupo Scout Séptimo de Montevideo fue fundado en 1964 por un grupo de jóvenes
                comprometidos con los ideales de Baden-Powell. Desde entonces, hemos crecido 
                hasta convertirnos en uno de los grupos scouts más reconocidos del Uruguay.
              </p>
              <p className="text-lg text-muted-foreground">
                A lo largo de más de seis décadas, hemos formado a miles de scouts, 
                participado en innumerables campamentos, competencias y proyectos de servicio 
                comunitario. Nuestra historia es la historia de compromiso, fraternidad y 
                crecimiento constante.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <Card className="card-hover">
                      <CardContent className="p-6">
                        <div className="text-4xl font-bold text-primary mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:block w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Historia;

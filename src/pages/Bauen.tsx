// Navigation y Footer son globales en App.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Target, Users, Calendar, Award, Flame } from "lucide-react";

const Bauen = () => {
  const pruebas = [
    {
      icon: Target,
      nombre: "Pruebas de Habilidad",
      descripcion: "Desafíos que ponen a prueba las destrezas scouts individuales y grupales.",
    },
    {
      icon: Flame,
      nombre: "Supervivencia",
      descripcion: "Construcción de refugios, cocina con fuego y técnicas de campismo.",
    },
    {
      icon: Users,
      nombre: "Trabajo en Equipo",
      descripcion: "Actividades que requieren coordinación y cooperación entre patrullas poniendo a prueba distintas habilidades.",
    },
    {
      icon: Award,
      nombre: "Mini Eventos",
      descripcion: "En 2025 tuvimos el placer de tener a Grupo de Coleccionistas Scouts. También tuvimos la posibilidad de contar con equipamiento informático para participar en el JOTA-JOTI.",
    },
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-sm">
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">Competencia Nacional</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
              BAUEN
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              La competencia scout más prestigiosa de Uruguay, creada por nuestro grupo en 2004.
              Un desafío que reúne distintos grupos scouts cada año.
            </p>
            <Button size="lg" className="gap-2 text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              Próxima Edición 2026
            </Button>
          </div>
        </div>
      </section>

      {/* Historia BAUEN */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="card-hover border-2 shadow-xl">
              <CardContent className="p-5 sm:p-6 md:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">La Historia de BAUEN</h2>
                <div className="space-y-4 sm:space-y-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                  <p>
                    En 2004, el Grupo Scout Séptimo de Montevideo decidió crear algo único: una competencia 
                    que pondría a prueba todas las habilidades scouts en un evento de 2 días lleno de desafíos, 
                    camaradería y espíritu scout.
                  </p>
                  <p>
                    Desde entonces, BAUEN se ha convertido en el evento más esperado del calendario scout
                    uruguayo. Cada año, grupos de todo el país se preparan intensamente para competir por
                      el trofeo de la competencia.
                  </p>
                  <p>
                    El nombre BAUEN significa "construir" en alemán, reflejando nuestra filosofía: construir
                    habilidades, construir carácter, construir comunidad. Más que una competencia, BAUEN es
                    una celebración de lo que significa ser scout.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tipos de Pruebas */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Las Pruebas
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              BAUEN desafía a los scouts en múltiples disciplinas, poniendo a prueba su preparación integral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pruebas.map((prueba, index) => {
              const Icon = prueba.icon;
              return (
                <Card key={index} className="card-hover border-2 hover:border-primary/50 transition-all duration-500">
                  <CardContent className="p-5 sm:p-6 lg:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{prueba.nombre}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{prueba.descripcion}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nuestras Ramas */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Nuestras Ramas</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Conoce brevemente qué hace cada rama dentro de nuestro grupo scout.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <Card className="card-hover border-2 hover:border-[#FEB21A]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FEB21A]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#FEB21A]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Manada</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Para los más pequeños: juegos, actividades de descubrimiento y aprendizaje en un entorno 
                    seguro y lúdico que fomenta valores y trabajo en equipo.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#344F1F]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#344F1F]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#344F1F]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Tropa</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Centrada en el desarrollo de habilidades prácticas y sociales: actividades al aire libre, 
                    campamentos y desafíos que fortalecen la autonomía y la cooperación.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#134686]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#134686]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-[#134686]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Pioneros</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Rama orientada a proyectos y liderazgo: planificación de actividades, proyectos de servicio 
                    y formación para asumir mayores responsabilidades.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#DD0303]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#DD0303]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#DD0303]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Rovers</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Jóvenes adultos comprometidos con el servicio comunitario, el desarrollo personal y el apoyo 
                    a las ramas más jóvenes mediante proyectos y mentoría.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer global en App.tsx */}
    </div>
  );
};
export default Bauen;
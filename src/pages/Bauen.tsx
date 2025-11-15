// Navigation y Footer son globales en App.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Target, Users, Calendar, Award, Flame, Instagram, Phone } from "lucide-react";

const Bauen = () => {
  const categorias = [
    {
      icon: Target,
      nombre: "Pionerismo",
      descripcion:
        "Técnicas de construcción y trabajo con cuerdas, aplicando conocimientos de cabuyería y amarres.",
    },
    {
      icon: Flame,
      nombre: "Cabullería",
      descripcion:
        "Dominio de nudos, amarres y construcciones que forman la base del escultismo.",
    },
    {
      icon: Users,
      nombre: "Cocina de Campamento",
      descripcion:
        "Preparación de alimentos al aire libre, uso del fuego y técnicas de cocina scout.",
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
              <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">
                Competencia entre Grupos Scouts
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
              BAUEN
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              La competencia scout más importante del país, creada por
              nuestro grupo en 2004. Un desafío que reúne distintos grupos
              scouts cada año.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="gap-2 text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                Próxima Edición 2026
              </Button>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/bauen.septimo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm sm:text-base">@bauen.septimo</span>
                </a>
                <a
                  href="tel:098138668"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm sm:text-base">098138668</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acerca del Evento */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="card-hover border-2 shadow-xl">
              <CardContent className="p-5 sm:p-6 md:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
                  Acerca del Evento
                </h2>
                <div className="space-y-4 sm:space-y-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                  <p>
                    Bauen significa "construir". El objetivo del Bauen es trabajar en equipo, desarrollando
                    técnicas de pionerismo y, por supuesto, divirtiéndonos, ayudando a continuar construyendo
                    juntos los ideales del Escultismo.
                  </p>
                  <p>
                    Bauen es una excusa para conocer a otros Grupos de nuestro país, otras formas de hacer
                    escultismo, es una instancia para practicar la empatía, la tolerancia y sentir el verdadero
                    espíritu scout del que todos tenemos conocimiento. Si bien es un evento de competencia, no
                    falta el apoyo, el cuidado por el otro, la hermandad y sobre todo la aplicación de todos
                    nuestros valores siempre bajo la mirada de nuestra Ley y promesa scout.
                  </p>
                </div>

                {/* Categorías del evento */}
                <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {categorias.map((categoria, index) => {
                    const Icon = categoria.icon;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center p-4 rounded-lg bg-gradient-to-b from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-base sm:text-lg mb-2">
                          {categoria.nombre}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {categoria.descripcion}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Historia BAUEN */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="card-hover border-2 shadow-xl">
              <CardContent className="p-5 sm:p-6 md:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
                  La Historia de BAUEN
                </h2>
                <div className="space-y-4 sm:space-y-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                  <p>
                    En 2004, el Grupo Scout Séptimo de Montevideo decidió crear
                    algo único: una competencia que pondría a prueba todas las
                    habilidades scouts en un evento de 2 días lleno de desafíos,
                    pionerismo y espíritu scout.
                  </p>
                  <p>
                    Desde entonces, el BAUEN se ha convertido en el evento más
                    esperado del calendario scout. Cada año, grupos de
                    Montevideo/Canelones se preparan intensamente para tener un buen BAUEN.
                  </p>
                  <p>
                    Más que una competencia, BAUEN es una celebración de lo que significa ser scout.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nuestras Ramas */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                Nuestras Ramas
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Conoce las competencias que realiza cada rama en el BAUEN.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <Card className="card-hover border-2 hover:border-[#FEB21A]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FEB21A]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#FEB21A]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    La Manada
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                    Actividad de 1 día. Construcción de cubiles representando personajes del Libro de la Selva.
                  </p>
                  <a 
                    href="https://www.instagram.com/bauen.septimo/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#FEB21A] hover:underline inline-flex items-center gap-1"
                  >
                    <Instagram className="w-4 h-4" />
                    Ver bases en Instagram
                  </a>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#344F1F]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#344F1F]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#344F1F]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    Rama Scout / Tropa
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                    Actividad de 2 días. Competencia de construcciones de Rincones de Patrulla y cocina con fuego.
                  </p>
                  <a 
                    href="https://www.instagram.com/bauen.septimo/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#344F1F] hover:underline inline-flex items-center gap-1"
                  >
                    <Instagram className="w-4 h-4" />
                    Ver bases en Instagram
                  </a>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#134686]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#134686]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-[#134686]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    Pioneros
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                    Actividad de 2 días. Construcción de Trebuchet con técnicas avanzadas de cabuyería. Incluye cena medieval.
                  </p>
                  <a 
                    href="https://www.instagram.com/bauen.septimo/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#134686] hover:underline inline-flex items-center gap-1"
                  >
                    <Instagram className="w-4 h-4" />
                    Ver bases en Instagram
                  </a>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#DD0303]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#DD0303]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#DD0303]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    Rovers
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                    Actividad de 2 días. Competencias de construcciones complejas (torres, barcos, campamentos elevados).
                  </p>
                  <a 
                    href="https://www.instagram.com/bauen.septimo/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[#DD0303] hover:underline inline-flex items-center gap-1"
                  >
                    <Instagram className="w-4 h-4" />
                    Ver bases en Instagram
                  </a>
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

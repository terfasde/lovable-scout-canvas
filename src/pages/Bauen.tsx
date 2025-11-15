// Navigation y Footer son globales en App.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Target, Users, Calendar, Award, Flame } from "lucide-react";

const Bauen = () => {
  const pruebas = [
    {
      icon: Target,
      nombre: "Desarrollo de Habilidades",
      descripcion:
        "Desafíos que ponen a prueba las destrezas scouts individuales y grupales.",
    },
    {
      icon: Flame,
      nombre: "Supervivencia",
      descripcion:
        "Construcción de refugios, cocina con fuego y técnicas de campismo.",
    },
    {
      icon: Users,
      nombre: "Trabajo en Equipo",
      descripcion:
        "Actividades que requieren coordinación y cooperación entre equipos scouts, poniendo a prueba distintas habilidades.",
    },
    {
      icon: Award,
      nombre: "Mini Eventos",
      descripcion:
        "En 2025 tuvimos el placer de tener a Grupo de Coleccionistas Scouts. También tuvimos la posibilidad de contar con equipamiento informático para participar en el JOTA-JOTI.",
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
              La competencia scout, creada por
              nuestro grupo en 2004. Un desafío que reúne distintos grupos
              scouts cada año. El termino Competencia suele ser una excusa para reunir diferentes grupos scouts y crear lazos de amistad entre ellos.
            </p>
            <Button
              size="lg"
              className="gap-2 text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
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
                    Montevideo/Canelones se preparan intensamente, para tener un buen BAUEN.
                  </p>
                  <p>
                    El nombre BAUEN significa "construir" en alemán, reflejando
                    nuestra filosofía: construir habilidades, construir
                    carácter, construir comunidad. Más que una competencia,
                    BAUEN es una celebración de lo que significa ser scout.
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
              Desarrollo de Habilidades
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              BAUEN desafía a los scouts en múltiples disciplinas, poniendo a
              prueba su preparación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pruebas.map((prueba, index) => {
              const Icon = prueba.icon;
              return (
                <Card
                  key={index}
                  className="card-hover border-2 hover:border-primary/50 transition-all duration-500"
                >
                  <CardContent className="p-5 sm:p-6 lg:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                      {prueba.nombre}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {prueba.descripcion}
                    </p>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                Nuestras Ramas
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Conoce brevemente qué hace cada rama dentro del BAUEN.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <Card className="card-hover border-2 hover:border-[#FEB21A]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FEB21A]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#FEB21A]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    La Manada: (Actividad de 1 día).
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    En la Manada realiza construcciones de cubiles. Esta se
                    desarrolla en una sola jornada donde deben presentar sus
                    construcciones que se realizan dentro de un box delimitado.
                    Cada cubil representará a un personaje del Libro de la Selva,
                    elegido por cada seisena, y la elección del mismo no podrá
                    repetirse dentro del mismo Grupo Scout. Con esta propuesta
                    se busca que exploren y se sumerjan en el mundo de las
                    Tierras Vírgenes durante esta actividad. Es una actividad
                    familiar que los Lobatos disfrutan mucho así como los Padres
                    y familia y amigos. <br/>
                    Las bases de esta competencia se encuentran en la descripción 
                    de Instagram del evento: <a href="https://www.instagram.com/bauen.septimo/" style={{color: "yellow"}}>bauen.septimo</a>

                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#344F1F]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#344F1F]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#344F1F]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    Rama Scout / Tropa: (Actividad de 2 días).

                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Es uno de los platos fuertes de este evento ya que nuclear a
                    la mayor cantidad de participantes. A la fecha participan más
                    de 25 Patrullas en la modalidad de competencia de
                    construcciones de Rincones de Patrulla y competencia de
                    Cocina con fuego. En la competencia de Rama Scout/Tropa se
                    puede ver en tiempo real todo lo que los scouts han
                    aprendido a lo largo de su vida scout en la teoría y ponerlo
                    en práctica de la mejor manera posible. Cabuyería, amarres,
                    pionerismo, campismo, cocina, fuego, armado de toldos,
                    armado de mesas y bancos, cuidado y limpieza del rincón.
                    Las bases de esta competencia se encuentran en la descripción de
                    Instagram del evento: <a href="https://www.instagram.com/bauen.septimo/" style={{color: "green"}}>bauen.septimo</a>

                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover border-2 hover:border-[#134686]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#134686]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-[#134686]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    Pioneros: (Actividad de 2 días).
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Sin duda se ha transformado en la actividad del segundo día que
                    mayor atención atrae. La construcción de Trebuchet es una competencia que aplica todo lo referente a cabuyería pero de una forma más compleja. Requiere precisión, técnica y que
                    todos los participantes tengan muy en claro su roll dentro de la
                    competencia. En este caso además se agrega una cena Medieval a la
                    Noche donde todos los scouts de todos los grupos comparten una
                    velada totalmente caracterizados con la época y a la mañana siguiente
                    antes de comenzar la competencia tienen un momento de distinción y
                    juego donde realizan competencias medievales de arquería, etc. <br />
                    Las bases de esta competencia se encuentran en la descripción de Instagram del
                    evento: <a href="https://www.instagram.com/bauen.septimo/" style={{color: "blue"}}>bauen.septimo</a>

                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 hover:border-[#DD0303]/50 transition-all duration-500">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#DD0303]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#DD0303]" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                    Rovers:(Actividad de 2 días)
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Los rovers realiza generalmente competencias de Torres aunque en
                    los últimos años se han realizado otro tipo de competencias como
                    construcciones de barcos, campamentos elevados, juegos mecánicos,
                    etc. En esta Unidad la competencia ha tomado mayor interés ya que
                    Poco a poco más y más Comunidades se anotan a esta competencia.
                    Además se realiza una actividad en la primera noche donde el objetivo
                    es conocerse y dejar la competencia de lado un momento. En esta
                    competencia se nota la diferencia en cuanto a la madurez como scouts
                    y la experiencia. Podemos ver mucho más desarrollado el trabajo en
                    equipo, la práctica de la paciencia y la fraternidad entre comunidades.
                    Es una competencia más distendida debido a la seguridad que
                    manejan los participantes y además la motivación es constante, tanto
                    dentro del equipo como entre competidores. <br />
                    Las bases de esta competencia se encuentran en la descripción de 
                    Instagram del evento: <a href="https://www.instagram.com/bauen.septimo/" style={{color: "red"}}>bauen.septimo</a>

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

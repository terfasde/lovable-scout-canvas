// Navigation y Footer son globales en App.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Target, Users, Calendar, Award, Flame, Instagram, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Bauen = () => {
  const actividades = [
    { nombre: "Pionerismo", icon: "🏗️" },
    { nombre: "Cabullería", icon: "🪢" },
    { nombre: "Cocina", icon: "🔥" },
  ];

  const ramas = [
    {
      nombre: "La Manada",
      color: "#FEB21A",
      duracion: "1 día",
      descripcion: "En la Manada realiza construcciones de cubiles. Esta se desarrolla en una sola jornada donde deben presentar sus construcciones que se realizan dentro de un box delimitado. Cada cubil representará a un personaje del Libro de la Selva, elegido por cada seisena, y la elección del mismo no podrá repetirse dentro del mismo Grupo Scout. Con esta propuesta se busca que exploren y se sumerjan en el mundo de las Tierras Vírgenes durante esta actividad. Es una actividad familiar que los Lobatos disfrutan mucho así como los Padres y familia y amigos.",
    },
    {
      nombre: "Rama Scout / Tropa",
      color: "#344F1F",
      duracion: "2 días",
      descripcion: "Es uno de los platos fuertes de este evento ya que nuclear a la mayor cantidad de participantes. A la fecha participan más de 25 Patrullas en la modalidad de competencia de construcciones de Rincones de Patrulla y competencia de Cocina con fuego. En la competencia de Rama Scout/Tropa se puede ver en tiempo real todo lo que los scouts han aprendido a lo largo de su vida scout en la teoría y ponerlo en práctica de la mejor manera posible. Cabuyería, amarres, pionerismo, campismo, cocina, fuego, armado de toldos, armado de mesas y bancos, cuidado y limpieza del rincón.",
    },
    {
      nombre: "Pioneros",
      color: "#134686",
      duracion: "2 días",
      descripcion: "Sin duda se ha transformado en la actividad del segundo día que mayor atención atrae. La construcción de Trebuchet es una competencia que aplica todo lo referente a cabuyería pero de una forma más compleja. Requiere precisión, técnica y que todos los participantes tengan muy en claro su roll dentro de la competencia. En este caso además se agrega una cena Medieval a la Noche donde todos los scouts de todos los grupos comparten una velada totalmente caracterizados con la época y a la mañana siguiente antes de comenzar la competencia tienen un momento de distinción y juego donde realizan competencias medievales de arquería, etc.",
    },
    {
      nombre: "Rovers",
      color: "#DD0303",
      duracion: "2 días",
      descripcion: "Los rovers realiza generalmente competencias de Torres aunque en los últimos años se han realizado otro tipo de competencias como construcciones de barcos, campamentos elevados, juegos mecánicos, etc. En esta Unidad la competencia ha tomado mayor interés ya que Poco a poco más y más Comunidades se anotan a esta competencia. Además se realiza una actividad en la primera noche donde el objetivo es conocerse y dejar la competencia de lado un momento. En esta competencia se nota la diferencia en cuanto a la madurez como scouts y la experiencia. Podemos ver mucho más desarrollado el trabajo en equipo, la práctica de la paciencia y la fraternidad entre comunidades. Es una competencia más distendida debido a la seguridad que manejan los participantes y además la motivación es constante, tanto dentro del equipo como entre competidores.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorativo global */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 dark:bg-primary/8 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/15"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-sm">
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">
                Desde 2004 - Competencia entre Grupos Scouts
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              BAUEN
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-medium text-primary mb-6">
              Construyendo juntos los ideales del Escultismo
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-4">
              <Button
                size="lg"
                className="gap-2 w-full sm:w-auto"
                onClick={() => window.open('https://www.instagram.com/bauen.septimo/', '_blank')}
              >
                <Instagram className="w-5 h-5" />
                @bauen.septimo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto"
                onClick={() => window.open('tel:098138668', '_blank')}
              >
                <Phone className="w-5 h-5" />
                098 138 668
              </Button>
            </div>

            <Button
              size="lg"
              className="gap-2 text-sm sm:text-base"
              variant="secondary"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              Próxima Edición 2026
            </Button>
          </div>
        </div>
      </section>

      {/* Acerca del Evento */}
      <section className="section-padding bg-gradient-to-b from-background via-muted/20 to-background dark:from-background dark:via-muted/30 dark:to-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent dark:from-accent/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
              Acerca del Evento
            </h2>
            
            <Card className="card-hover border-2 shadow-xl mb-8">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  <span className="font-bold text-primary">Bauen</span> significa <span className="italic">"construir"</span>. 
                  El objetivo del Bauen es trabajar en equipo, desarrollando técnicas de pionerismo y, 
                  por supuesto, divirtiéndonos, ayudando a continuar construyendo juntos los ideales del Escultismo.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  Bauen es una excusa para conocer a otros Grupos de nuestro país, otras formas de hacer escultismo, 
                  es una instancia para practicar la empatía, la tolerancia y sentir el verdadero espíritu scout 
                  del que todos tenemos conocimiento.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Si bien es un evento de competencia, no falta el apoyo, el cuidado por el otro, la hermandad y, 
                  sobre todo, la aplicación de todos nuestros valores siempre bajo la mirada de nuestra Ley y Promesa Scout.
                </p>
              </CardContent>
            </Card>

            {/* Actividades Destacadas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {actividades.map((act, idx) => (
                <Card key={idx} className="text-center card-hover">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{act.icon}</div>
                    <p className="font-semibold text-lg">{act.nombre}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nuestras Ramas - Rediseño */}
      <section className="section-padding bg-gradient-to-b from-background via-primary/5 to-muted/30 dark:from-background dark:via-primary/10 dark:to-muted/40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Nuestras Ramas
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada rama vive BAUEN de una forma única
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {ramas.map((rama, idx) => (
              <Card 
                key={idx} 
                className="card-hover overflow-hidden border-2 hover:shadow-2xl transition-all duration-300"
                style={{ borderColor: rama.color + '40' }}
              >
                <div 
                  className="h-3" 
                  style={{ backgroundColor: rama.color }}
                />
                <CardContent className="p-6">
                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{ color: rama.color }}
                  >
                    {rama.nombre}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      Actividad de {rama.duracion}
                    </Badge>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {rama.descripcion}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      📸 Las bases de esta competencia se encuentran en la descripción de Instagram del evento:{" "}
                      <a 
                        href="https://www.instagram.com/bauen.septimo/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                      >
                        @bauen.septimo
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Información adicional */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <Card className="card-hover border-primary/20">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  ¿Querés participar con tu grupo?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open('https://www.instagram.com/bauen.septimo/', '_blank')}
                  >
                    <Instagram className="w-4 h-4" />
                    Seguinos en Instagram
                  </Button>
                  <Button 
                    className="gap-2"
                    onClick={() => window.open('tel:098138668', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    Contactanos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer global en App.tsx */}
    </div>
  );
};
export default Bauen;

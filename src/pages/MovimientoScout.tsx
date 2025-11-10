import { Card, CardContent } from "@/components/ui/card";
import { Compass, Users, Heart, Trophy } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const MovimientoScout = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm">
                55 Millones de Scouts en el Mundo
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Movimiento Scout
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Un movimiento mundial de educación no formal que forma jóvenes a través de valores, juegos y actividades al aire libre
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* ¿Qué es el Escultismo? */}
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Compass className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      ¿Qué es el Escultismo?
                    </h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base sm:text-lg leading-relaxed">
                      El <strong>escultismo</strong> (del inglés <em>scouting</em>, que significa explorar) es un movimiento infantil y juvenil que busca educar a niños y jóvenes, con base en valores y juegos al aire libre como método de enseñanza no formal.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Actualmente está presente en <strong>165 países y territorios</strong>, con aproximadamente <strong>55.000.000 de miembros</strong> en todo el mundo, agrupados en distintas organizaciones.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Orígenes */}
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Orígenes del Movimiento
                    </h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base sm:text-lg leading-relaxed">
                      El Movimiento Scout nació como una manera de combatir la delincuencia en la Inglaterra de principios del siglo 20, buscando el desarrollo físico, espiritual y mental de los jóvenes para que llegaran a ser <strong>"buenos ciudadanos"</strong> a través de un método específico inspirado en la vida militar y al aire libre.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Sus directrices fueron establecidas en el manual <strong>"Escultismo para muchachos"</strong> (1908), del General británico <strong>Robert Stephenson Smith Baden-Powell of Gilwell</strong>, que en 1909 fue nombrado caballero y recibió el título de Sir, pasando a ser en 1929 <strong>Lord Baden-Powell, I barón de Gilwell</strong>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Primer Campamento */}
            <Reveal>
              <Card className="card-hover border-primary/20">
                <CardContent className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-transparent">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    El Primer Campamento - Isla de Brownsea (1907)
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base sm:text-lg leading-relaxed">
                      En 1907 se realizó el <strong>primer campamento experimental</strong> en la isla de Brownsea, Bahía de Poole, Dorset, en la costa sur de Inglaterra.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Participaron <strong>20 muchachos</strong> separados en cuatro patrullas: <strong>"Lobos, Toros, Chorlitos y Cuervos"</strong>; hijos de conocidos militares que hicieron campaña, en África o Asia, con Baden-Powell y de obreros de Londres.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Como consecuencia del éxito del nuevo sistema, Baden-Powell escribió un libro donde recopilaba experiencias y anécdotas relacionadas con esta práctica, lo que terminó siendo el ya mencionado <em>Escultismo para muchachos</em>.
                    </p>
                    <p className="text-sm text-muted-foreground/80 italic">
                      Posteriormente, el escultismo fue perfeccionado por Vera Barclay y Roland Phillips, entre otros.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Método Scout */}
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      El Método Scout
                    </h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base sm:text-lg leading-relaxed">
                      El Movimiento Scout pone énfasis en:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-base sm:text-lg">
                      <li><strong>Actividades lúdicas</strong> con objetivos educativos</li>
                      <li><strong>Actividades al aire libre</strong></li>
                      <li><strong>Servicio comunitario</strong></li>
                    </ul>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Estas actividades tienen el objeto de <strong>formar el carácter y enseñar de forma práctica valores humanos</strong>, al contrario de la formación académica teórica. Por eso el énfasis recae en el ejemplo del <em>scouter</em> o monitor (según el país y el método aplicado).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Sistema de Ramas */}
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Sistema Educativo
                    </h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base sm:text-lg leading-relaxed">
                      El escultismo toma como base de su sistema educativo:
                    </p>
                    <div className="space-y-3">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">
                          🐺 Lobatismo (8-11 años)
                        </h4>
                        <p className="text-sm sm:text-base">
                          Ambiente de familia feliz para niños entre 8 y 11 años
                        </p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">
                          ⚜️ Sistema de Patrullas
                        </h4>
                        <p className="text-sm sm:text-base">
                          Pequeños grupos de amigos, basado en el concepto de pandilla
                        </p>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed mt-4">
                      Dependiendo del grupo scout y la asociación correspondiente a cada país, existen unidades mayores de jóvenes <strong>Caminantes o Rovers</strong>, así como niños más pequeños como <strong>Castores</strong>, en edades comprendidas entre 6 y 8 años.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer global en App.tsx */}
    </div>
  );
};

export default MovimientoScout;

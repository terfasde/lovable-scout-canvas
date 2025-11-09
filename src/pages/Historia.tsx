// Navigation y Footer son globales en App.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Users, Flame } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const Historia = () => {
  const locales = [
    {
      nombre: "Colegio Alemán",
      direccion: "Colegio Alemán",
      resumen:
        "Lugar de reunión fundacional: aquí se reunió el grupo hasta que se buscó nueva ubicación. En el Colegio Alemán, el grupo se reunió desde que se fundó hasta que nos pidieron que buscásemos nueva ubicación. Fue allí donde los padres de ese momento consiguieron la Elías Regules.",
      detalle: ` `,
    },
    {
      nombre: "Elías Regules",
      direccion: "Entrada por calle Bolivia, cerca de Parque Rivera",
      resumen:
        "Predio de la Sociedad Criolla donde construimos locales de patrullas y realizamos múltiples actividades.",
      detalle: `La Elías Regules era un lugar grandioso para nuestra actividad. Creo que fue la mejor época del Grupo Séptimo tal vez por eso éramos imbatibles e indomables. No sé qué tamaño tiene el terreno, pero calculo que estaría próximo a los 4000 m2 o más. Tiene un camino principal de tosca que llega hasta las construcciones en el centro del terreno. A mano izquierda había una plantación de árboles que llegaba hasta el final del terreno. En ese bosque trabajaban Helga Rauhut y Patricia Lodigiani con las Girl Scouts. A la derecha había un prolijísimo enjardinado y el edificio principal blanco con techo de quincho; detrás estaba el edificio accesorio asignado a nosotros para guardar el equipo. Cada patrulla tenía su espacio delimitado y estantes para guardar todo. Junto a este edificio hay un quincho grande y una lagunita afluente del lago del Parque Rivera. Ese entorno permitió prácticas de campo y construcciones como puentes colgantes y muchas otras actividades.`,
    },
    {
      nombre: "Gral. Paz y Rivera",
      direccion: "General Paz (cerca de Av. Bolivia)",
      resumen:
        "Terreno ubicado sobre General Paz que hoy ya no existe en su forma original.",
      detalle: ` `,
    },
    {
      nombre: "San Pedro",
      direccion:
        "Parroquia San Pedro Apóstol del Buceo — Leguizamón 3684, Montevideo",
      resumen:
        "Parroquia San Pedro Apóstol del Buceo, conocida como la 'iglesia' o 'capilla'.",
      detalle: `Parroquia San Pedro Apóstol del Buceo. Dirección: Leguizamón 3684, 11400 Montevideo. Comúnmente llamada 'iglesia', 'parroquia' o 'capilla'.`,
    },
    {
      nombre: "Tomás Gómez",
      direccion: "Tomás Gómez 3689",
      resumen:
        "Casa de Atilio Oliveri y punto de encuentro con caminatas hacia Fermín Ferreira.",
      detalle: `Tomás Gómez 3689. Casa de Atilio Oliveri y con largas caminatas hasta el ex Fermín Ferreira para encontrar un poco de verde.`,
    },
    {
      nombre: "Parque Rivera",
      direccion: "Parque Rivera",
      resumen:
        "Más que un 'local', fue el lugar principal de actividad y depósito en distintos periodos.",
      detalle: `Hubo una conversación editorial (28-ABR-2023) sobre si considerar Parque Rivera como 'local'. Roberto Lodigiani y Mario Clara coincidieron en que no era un local en el sentido tradicional, sino el espacio donde se realizaban actividades y se guardaba material en un depósito o 'tapera'. Fechas aproximadas de uso: 1972-73, con referencias puntuales en 16-ABR-1973.`,
    },
    {
      nombre: "El Cilindro",
      direccion: "Bajo el tanque de agua del complejo habitacional 4 del BHU",
      resumen: "Lugar donde se realizó un Am Lagerfeuer el 7/JUL/1978.",
      detalle: `Bajo el tanque de agua del complejo habitacional 4 del BHU. Am Lagerfeuer 7/JUL/1978. Referencia: Miguel Testoni.`,
    },
    {
      nombre: "Complejo Habitacional Centenario 4",
      direccion: "Centenario (Dámaso Larrañaga)",
      resumen:
        "Conocido como Centenario o Dámaso Larrañaga según la generación.",
      detalle: `Centenario para los más viejos, Dámaso Larrañaga para los jóvenes. Un local en el periodo del Complejo Habitacional.`,
    },
    {
      nombre: "El Tajamar",
      direccion: "Lieja 6416 — Parque Julio César Grauert, Carrasco",
      resumen:
        "Uno de los locales más importantes: construido en 1942, reunió al grupo bajo techo por muchos años.",
      detalle: `El Tajamar (Lieja 6416) en el Parque Julio César Grauert, Carrasco. Diseñado por el Arq. Juan A. Scasso e inaugurado en 1942; reciclado en 1991 por la Intendencia. Durante ese periodo tuvimos tres 'locales' (parque al lado de CONAPROLE, El Tajamar, y parque atrás del Lawn Tennis). El Tajamar fue el más importante porque permitió reunir al grupo bajo su techo por muchos años. Tras dejar el Tajamar nos reuníamos detrás del Lawn Tennis y luego en otros lugares.`,
    },
    {
      nombre: "Locales Avenida Bolivia",
      direccion: "Avenida Bolivia (varios lugares)",
      resumen:
        "Periodo con uso de contenedor y actividades en terrenos y clubes cercanos.",
      detalle: `Mientras estábamos en el Tajamar, el grupo instaló un contenedor en el fondo del local de David (OCT79). En 1986 dejamos el Tajamar; en 1990 se deja el local y se sigue en el fondo; en 1993 se empezaron actividades en el terreno de al lado (BCU) y luego en el club Fermín Ferreira. En 1997 nos mudamos al local Volteadores.`,
    },
    {
      nombre: "Volteadores",
      direccion: "Volteadores 1753 — Capilla San Jerónimo, Malvín",
      resumen:
        "Capilla San Jerónimo; uso del Parque Baroffio para actividades al aire libre.",
      detalle: `Capilla San Jerónimo. Dirección: Volteadores 1753, Malvín, Montevideo. El Grupo utiliza el Parque Baroffio para actividades al aire libre.`,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm">
                Desde 1964
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Nuestra Historia
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Más de 60 años formando jóvenes con valores scout, desde nuestros
              inicios en el Colegio Alemán hasta nuestros locales actuales.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Nacimiento del grupo */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <Card className="card-hover border-primary/20">
                <CardContent className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                        Nacimiento del Grupo
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3">
                        Nuestro grupo nació en el{" "}
                        <strong>Colegio Alemán en 1964</strong>, cuando un
                        pequeño grupo de jóvenes y guías se reunió con la
                        intención de formar un espacio de encuentro y formación
                        scout.
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Desde esos primeros pasos hemos crecido manteniendo los
                        valores fundacionales y adaptándonos a nuevas
                        generaciones, siempre fieles al espíritu scout.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Locales Section */}
      <section className="py-8 sm:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full mb-3 sm:mb-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-primary font-semibold text-xs sm:text-sm">
                  Nuestros Locales
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
                Un Recorrido por Nuestros Espacios
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Desde 1964 hemos transitado por diversos locales, cada uno con
                su historia y aportes a la formación de generaciones de scouts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {locales.map((local, index) => (
                <Reveal key={index}>
                  <Card className="card-hover h-full">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg mb-1">
                            {local.nombre}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {local.direccion}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                        {local.resumen}
                      </p>
                      <details className="text-xs sm:text-sm text-muted-foreground">
                        <summary className="cursor-pointer text-primary hover:text-primary/80 font-medium">
                          Ver detalles
                        </summary>
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t whitespace-pre-line text-xs leading-relaxed">
                          {local.detalle}
                        </div>
                      </details>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Acontecimientos importantes y Tradiciones */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Acontecimientos importantes */}
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                      Acontecimientos Importantes
                    </h2>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                    <li className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold flex-shrink-0">
                        2004
                      </span>
                      <span>
                        Creación de BAUEN, la competencia nacional organizada
                        por nuestro grupo.
                      </span>
                    </li>
                    <li className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold flex-shrink-0">
                        2014
                      </span>
                      <span>Aniversario y celebración de los 50 años del Grupo Séptimo.</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3">
                      <span className="text-primary font-bold flex-shrink-0">
                        2025
                      </span>
                      <span>
                        Participación en JOTA-JOTI y colaboración con Grupo de
                        Coleccionistas Scouts.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Reveal>

            {/* Am Lagerfeuers */}
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                      Am Lagerfeuer
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                    Nuestra tradición de reuniones nocturnas alrededor del
                    fuego: cantos, historias y reflexión. "Am Lagerfeuer" resume
                    la esencia del compañerismo scout.
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Eventos periódicos en el campo de campamento donde
                    compartimos experiencias y fortalecemos lazos.
                  </p>
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

export default Historia;

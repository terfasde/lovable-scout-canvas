import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Users, Flame } from "lucide-react";

const Historia = () => {
  const locales = [
    {
      nombre: "Colegio Alemán",
      direccion: "Colegio Alemán",
      resumen: "Lugar de reunión fundacional: aquí se reunió el grupo hasta que se buscó nueva ubicación.",
      detalle: `En el Colegio Alemán, el grupo se reunió desde que se fundó hasta que nos pidieron que buscásemos nueva ubicación. Fue allí donde los padres de ese momento consiguieron la Elías Regules.`
    },
    {
      nombre: "Elías Regules",
      direccion: "Entrada por calle Bolivia, cerca de Parque Rivera",
      resumen: "Predio de la Sociedad Criolla donde construimos locales de patrullas y realizamos múltiples actividades.",
      detalle: `La Elías Regules era un lugar grandioso para nuestra actividad. Creo que fue la mejor época del Grupo Séptimo tal vez por eso éramos imbatibles e indomables. No sé qué tamaño tiene el terreno, pero calculo que estaría próximo a los 4000 m2 o más. Tiene un camino principal de tosca que llega hasta las construcciones en el centro del terreno. A mano izquierda había una plantación de árboles que llegaba hasta el final del terreno. En ese bosque trabajaban Helga Rauhut y Patricia Lodigiani con las Girl Scouts. A la derecha había un prolijísimo enjardinado y el edificio principal blanco con techo de quincho; detrás estaba el edificio accesorio asignado a nosotros para guardar el equipo. Cada patrulla tenía su espacio delimitado y estantes para guardar todo. Junto a este edificio hay un quincho grande y una lagunita afluente del lago del Parque Rivera. Ese entorno permitió prácticas de campo y construcciones como puentes colgantes y muchas otras actividades.`
    },
    {
      nombre: "Gral. Paz y Rivera",
      direccion: "General Paz (cerca de Av. Bolivia)",
      resumen: "Terreno ubicado sobre General Paz que hoy ya no existe en su forma original.",
      detalle: `El terreno estaba sobre General Paz, yendo desde la rambla hacia Av. Bolivia, a mano izquierda junto a un almacencito. Hoy (19-SEP-2002) está enajenado y se construyó un edificio de 4 o 5 pisos.`
    },
    {
      nombre: "San Pedro",
      direccion: "Parroquia San Pedro Apóstol del Buceo — Leguizamón 3684, Montevideo",
      resumen: "Parroquia San Pedro Apóstol del Buceo, conocida como la 'iglesia' o 'capilla'.",
      detalle: `Parroquia San Pedro Apóstol del Buceo. Dirección: Leguizamón 3684, 11400 Montevideo. Comúnmente llamada 'iglesia', 'parroquia' o 'capilla'.`
    },
    {
      nombre: "Tomás Gómez",
      direccion: "Tomás Gómez 3689",
      resumen: "Casa de Atilio Oliveri y punto de encuentro con caminatas hacia Fermín Ferreira.",
      detalle: `Tomás Gómez 3689. Casa de Atilio Oliveri y con largas caminatas hasta el ex Fermín Ferreira para encontrar un poco de verde.`
    },
    {
      nombre: "Parque Rivera",
      direccion: "Parque Rivera",
      resumen: "Más que un 'local', fue el lugar principal de actividad y depósito en distintos periodos.",
      detalle: `Hubo una conversación editorial (28-ABR-2023) sobre si considerar Parque Rivera como 'local'. Roberto Lodigiani y Mario Clara coincidieron en que no era un local en el sentido tradicional, sino el espacio donde se realizaban actividades y se guardaba material en un depósito o 'tapera'. Fechas aproximadas de uso: 1972-73, con referencias puntuales en 16-ABR-1973.`
    },
    {
      nombre: "El Cilindro",
      direccion: "Bajo el tanque de agua del complejo habitacional 4 del BHU",
      resumen: "Lugar donde se realizó un Am Lagerfeuer el 7/JUL/1978.",
      detalle: `Bajo el tanque de agua del complejo habitacional 4 del BHU. Am Lagerfeuer 7/JUL/1978. Referencia: Miguel Testoni.`
    },
    {
      nombre: "Complejo Habitacional Centenario 4",
      direccion: "Centenario (Dámaso Larrañaga)",
      resumen: "Conocido como Centenario o Dámaso Larrañaga según la generación.",
      detalle: `Centenario para los más viejos, Dámaso Larrañaga para los jóvenes. Un local en el periodo del Complejo Habitacional.`
    },
    {
      nombre: "El Tajamar",
      direccion: "Lieja 6416 — Parque Julio César Grauert, Carrasco",
      resumen: "Uno de los locales más importantes: construido en 1942, reunió al grupo bajo techo por muchos años.",
      detalle: `El Tajamar (Lieja 6416) en el Parque Julio César Grauert, Carrasco. Diseñado por el Arq. Juan A. Scasso e inaugurado en 1942; reciclado en 1991 por la Intendencia. Durante ese periodo tuvimos tres 'locales' (parque al lado de CONAPROLE, El Tajamar, y parque atrás del Lawn Tennis). El Tajamar fue el más importante porque permitió reunir al grupo bajo su techo por muchos años. Tras dejar el Tajamar nos reuníamos detrás del Lawn Tennis y luego en otros lugares.`
    },
    {
      nombre: "Locales Avenida Bolivia",
      direccion: "Avenida Bolivia (varios lugares)",
      resumen: "Periodo con uso de contenedor y actividades en terrenos y clubes cercanos.",
      detalle: `Mientras estábamos en el Tajamar, el grupo instaló un contenedor en el fondo del local de David (OCT79). En 1986 dejamos el Tajamar; en 1990 se deja el local y se sigue en el fondo; en 1993 se empezaron actividades en el terreno de al lado (BCU) y luego en el club Fermín Ferreira. En 1997 nos mudamos al local Volteadores.`
    },
    {
      nombre: "Volteadores",
      direccion: "Volteadores 1753 — Capilla San Jerónimo, Malvín",
      resumen: "Capilla San Jerónimo; uso del Parque Baroffio para actividades al aire libre.",
      detalle: `Capilla San Jerónimo. Dirección: Volteadores 1753, Malvín, Montevideo. El Grupo utiliza el Parque Baroffio para actividades al aire libre.`
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Nuestros Espacios</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Historia de nuestro grupo
            </h1>
            <p className="text-xl text-muted-foreground">
              El nacimiento en el Colegio Alemán.
            </p>
          </div>
        </div>
      </section>

      {/* Nav de secciones */}
      <nav className="container mx-auto px-4 -mt-8 mb-8">
        <div className="max-w-4xl mx-auto bg-background/50 rounded-lg p-3 flex flex-wrap gap-3 justify-center">
          <a href="#locales" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/10">Locales</a>
          <a href="#nacimiento" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/10">Nacimiento del grupo</a>
          <a href="#acontecimientos" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/10">Acontecimientos importantes</a>
          <a href="#lagerfeuers" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/10">Am Lagerfeuers</a>
        </div>
      </nav>

      {/* Nacimiento del grupo */}
      <section id="nacimiento" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-3">Nacimiento del grupo</h2>
                <p className="text-muted-foreground mb-2">Nuestro grupo nació en el Colegio Alemán en 1964, cuando un pequeño grupo de jóvenes y guías se reunió con la intención de formar un espacio de encuentro y formación scout.</p>
                <p className="text-muted-foreground">Desde esos primeros pasos hemos crecido manteniendo los valores fundacionales y adaptándonos a nuevas generaciones.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Locales Section */}
      <section id="locales" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locales.map((local, index) => (
              <Card key={index} className="card-hover p-3">
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold mb-1">{local.nombre}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{local.direccion}</p>
                  <p className="text-sm text-muted-foreground mb-2">{local.resumen}</p>
                  <details className="text-xs text-muted-foreground">
                    <summary className="cursor-pointer text-primary/80">Leer más</summary>
                    <div className="mt-2 whitespace-pre-line">{local.detalle}</div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Acontecimientos importantes */}
          <div id="acontecimientos" className="mt-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-3">Acontecimientos importantes</h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li><strong>2004:</strong> Creación de BAUEN, la competencia nacional organizada por nuestro grupo.</li>
                  <li><strong>2019:</strong> Ganadores del trofeo BAUEN.</li>
                  <li><strong>2025:</strong> Participación en JOTA-JOTI y colaboración con Grupo de Coleccionistas Scouts.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Am Lagerfeuers */}
          <div id="lagerfeuers" className="mt-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-3">Am Lagerfeuers</h2>
                <p className="text-muted-foreground">Nuestra tradición de reuniones nocturnas alrededor del fuego: cantos, historias y reflexión. "Am Lagerfeuer" resume la esencia del compañerismo scout.</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Flame className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Eventos periódicos en el campo de campamento.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historia adicional */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="card-hover">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Evolución de Nuestros Espacios</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A lo largo de más de 60 años, nuestros locales han sido el corazón del Grupo Scout Séptimo de Montevideo.
                    Desde nuestras primeras reuniones en 1964, hemos trabajado constantemente para mejorar y ampliar
                    nuestras instalaciones.
                  </p>
                  <p>
                    El local central ha sido renovado y adaptado múltiples veces para satisfacer las necesidades
                    cambiantes de nuestras actividades. Cada rincón cuenta historias de campamentos planificados,
                    promesas realizadas y amistades forjadas.
                  </p>
                  <p>
                    Nuestro campo de campamento es un tesoro natural que cuidamos con dedicación. Es el lugar donde
                    nuestros scouts aprenden sobre la naturaleza, desarrollan habilidades de supervivencia y crean
                    recuerdos que durarán toda la vida.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Historia;

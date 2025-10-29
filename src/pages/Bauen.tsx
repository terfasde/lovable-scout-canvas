import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Users, Calendar, Award, Flame } from "lucide-react";
const Bauen = () => {
  
  const pruebas = [{
    icon: Target,
    nombre: "Pruebas de Habilidad",
    descripcion: "Desafíos que ponen a prueba las destrezas scouts individuales y grupales."
  }, {
    icon: Flame,
    nombre: "Supervivencia",
    descripcion: "Construcción de refugios, cocina con fuego y técnicas de campismo."
  }, {
    icon: Users,
    nombre: "Trabajo en Equipo",
    descripcion: "Actividades que requieren coordinación y cooperación entre patrullas poniendo a prueba distintas habilidades."
  }, {
    icon: Award,
    nombre: "Mini Eventos",
    descripcion: "En 2025 tuvimos el placer de tener a Grupo de Coleccionistas Scouts. También tuvimos la posibilidad de contar con equipamiento informático para participar en el JOTA-JOTI."
  }];
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Competencia Nacional</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              BAUEN
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              La competencia scout más prestigiosa de Uruguay, creada por nuestro grupo en 2004.
              Un desafío que reúne distintos grupos scouts cada año.
            </p>
            <Button size="lg" className="gap-2">
              <Calendar className="w-5 h-5" />
              Próxima Edición 2026
            </Button>
          </div>
        </div>
      </section>

      {/* Historia BAUEN */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="card-hover">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">La Historia de BAUEN</h2>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>En 2004, el Grupo Scout Séptimo de Montevideo decidió crear algo único: una competencia que pondría a prueba todas las habilidades scouts en un evento de 2 días lleno de desafíos, camaradería y espíritu scout.</p>
                  <p>
                    Desde entonces, BAUEN se ha convertido en el evento más esperado del calendario scout
                    uruguayo. Cada año, grupos de todo el país se preparan intensamente para competir por
                    el codiciado trofeo BAUEN.
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Las Pruebas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              BAUEN desafía a los scouts en múltiples disciplinas, poniendo a prueba su preparación integral.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pruebas.map((prueba, index) => {
            const Icon = prueba.icon;
            return <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{prueba.nombre}</h3>
                    <p className="text-muted-foreground">{prueba.descripcion}</p>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Nuestras Ramas (mini-secciones) */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Nuestras Ramas</h2>
              <p className="text-lg text-muted-foreground">Conoce brevemente qué hace cada rama dentro de nuestro grupo scout.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Manada</h3>
                  <p className="text-muted-foreground">Para los más pequeños: juegos, actividades de descubrimiento y aprendizaje en un entorno seguro y lúdico que fomenta valores y trabajo en equipo.</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Tropa</h3>
                  <p className="text-muted-foreground">Centrada en el desarrollo de habilidades prácticas y sociales: actividades al aire libre, campamentos y desafíos que fortalecen la autonomía y la cooperación.</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Flame className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pioneros</h3>
                  <p className="text-muted-foreground">Rama orientada a proyectos y liderazgo: planificación de actividades, proyectos de servicio y formación para asumir mayores responsabilidades.</p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Rovers</h3>
                  <p className="text-muted-foreground">Jóvenes adultos comprometidos con el servicio comunitario, el desarrollo personal y el apoyo a las ramas más jóvenes mediante proyectos y mentoría.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Bauen;
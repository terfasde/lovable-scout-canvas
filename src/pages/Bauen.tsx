import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Users, Calendar, Award, Flame } from "lucide-react";

const Bauen = () => {
  const championships = [
    { year: "2024", position: "1° Lugar" },
    { year: "2023", position: "2° Lugar" },
    { year: "2022", position: "1° Lugar" },
    { year: "2021", position: "3° Lugar" },
    { year: "2020", position: "Cancelado - COVID" },
    { year: "2019", position: "1° Lugar" },
  ];

  const pruebas = [
    {
      icon: Target,
      nombre: "Pruebas de Habilidad",
      descripcion: "Desafíos que ponen a prueba las destrezas scouts individuales y grupales."
    },
    {
      icon: Flame,
      nombre: "Supervivencia",
      descripcion: "Construcción de refugios, encendido de fuego y técnicas de campamento."
    },
    {
      icon: Users,
      nombre: "Trabajo en Equipo",
      descripcion: "Actividades que requieren coordinación y cooperación entre patrullas."
    },
    {
      icon: Award,
      nombre: "Conocimientos Scout",
      descripcion: "Preguntas sobre historia, técnicas y valores del movimiento scout."
    }
  ];

  return (
    <div className="min-h-screen">
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
              Un desafío que reúne a los mejores scouts del país cada año.
            </p>
            <Button size="lg" className="gap-2">
              <Calendar className="w-5 h-5" />
              Próxima Edición 2025
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
                  <p>
                    En 2004, el Grupo Scout Séptimo de Montevideo decidió crear algo único: una competencia
                    que pondría a prueba todas las habilidades scouts en un evento de tres días lleno de
                    desafíos, camaradería y espíritu scout.
                  </p>
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
              return (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{prueba.nombre}</h3>
                    <p className="text-muted-foreground">{prueba.descripcion}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nuestros Logros */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros Campeonatos
              </h2>
              <p className="text-xl text-muted-foreground">
                Como creadores de BAUEN, hemos mantenido un alto nivel de excelencia en cada edición.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {championships.map((championship, index) => (
                <Card 
                  key={index} 
                  className={`card-hover text-center ${
                    championship.position.includes("1°") 
                      ? "border-primary/50 bg-primary/5" 
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {championship.year}
                    </div>
                    <div className={`text-lg font-semibold ${
                      championship.position.includes("1°")
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}>
                      {championship.position}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Card className="card-hover bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-2">5 Campeonatos</h3>
                  <p className="text-muted-foreground">
                    El orgullo de haber conquistado el trofeo que nosotros mismos creamos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bauen;

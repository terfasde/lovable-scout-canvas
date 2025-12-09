import Events from "@/components/Events";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Sparkles, Flag } from "lucide-react";

const Eventos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-scout-black to-muted/40">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 border-b border-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-2 text-sm text-muted-foreground">
              <Link to="/">Inicio</Link> <span className="mx-1">/</span> <span className="text-yellow-400 font-semibold">Eventos</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 text-white">
              CARTELERA DE <span className="text-yellow-400">EVENTOS</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-2xl">
              Descubre torneos, watch parties y reuniones de la comunidad. No te pierdas la acción en vivo.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>3 eventos activos</span> 
            </div>
          </div>
        </div>
      </section>

      {/* Cartelera de eventos */}
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <Events />
      </div>

      {/* Sección destacada BAUEN */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="card-hover border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <CardContent className="p-8 sm:p-10 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 backdrop-blur-sm rounded-full mb-4">
                    <Flag className="w-5 h-5 text-primary" />
                    <span className="text-primary font-bold text-sm">Evento Destacado</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    ¿Buscás información sobre BAUEN?
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                    Descubrí todo sobre el evento scout nacional más importante del año. Creado por nuestro grupo en 2004, BAUEN reúne a más de 300 scouts de todo el país.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
                  <Card className="text-center card-hover">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">2004</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Año de creación</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center card-hover">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">+300</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Participantes</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center card-hover">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">4</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Ramas participantes</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Link to="/bauen">
                    <Button size="lg" className="gap-2 text-base sm:text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <Calendar className="w-5 h-5" />
                      Ver toda la información de BAUEN
                      <Flag className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Eventos;

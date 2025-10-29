import { Calendar, MapPin, Flag, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      title: "Campamento de Verano 2026",
      date: "22-26 Enero, 2026",
      location: "Próximamente Revelado",
      participants: "+100 scouts",
      type: "Campamento",
      status: "Confirmado para más adelante",
      color: "primary",
    },
    {
      title: "BAUEN - Competencia Nacional",
      date: "Próximamente Anunciado",
      location: "Parque Barofio, Montevideo",
      participants: "+200 scouts",
      type: "Competencia, Construcción, Hermandad",
      status: "Próximamente",
      color: "primary",
    },
    {
      title: "Lentejeada Solidaria, Servicio Comunitario",
      date: "Próximamente",
      location: "Club de Pesca Ramirez",
      participants: "+30 scouts, Fundación Álvarez Carldeyro Barcia",
      type: "Servicio",
      status: "Confirmado",
      color: "primary",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-5 py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-4 shadow-sm">
            <span className="text-primary font-semibold text-sm md:text-base">Próximos Eventos</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Vive la aventura con nosotros
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Participa en nuestras actividades, campamentos y eventos especiales 
            como el prestigioso BAUEN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="card-hover overflow-hidden border-2 hover:border-primary/50 transition-all duration-500"
            >
              <div className={`h-2 bg-gradient-to-r from-primary to-accent`}></div>
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-primary">
                    {event.type}
                  </span>
                  <span className="text-xs bg-accent/20 text-accent-foreground px-3 py-1.5 rounded-full font-medium">
                    {event.status}
                  </span>
                </div>
                <CardTitle className="text-xl md:text-2xl leading-tight">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start text-muted-foreground group">
                  <Calendar className="w-4 h-4 mr-2 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm leading-relaxed">{event.date}</span>
                </div>
                <div className="flex items-start text-muted-foreground group">
                  <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm leading-relaxed">{event.location}</span>
                </div>
                <div className="flex items-start text-muted-foreground group">
                  <Users className="w-4 h-4 mr-2 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm leading-relaxed">{event.participants}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* BAUEN Special Section */}
        <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/30 shadow-xl">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex items-center">
                  <Flag className="w-10 h-10 md:w-12 md:h-12 text-primary mr-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    BAUEN — Competencia Nacional
                  </h3>
                </div>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  La competencia más importante del escultismo uruguayo. 
                  El Grupo Séptimo ha sido campeón en múltiples ocasiones, 
                  demostrando excelencia en habilidades scout, trabajo en equipo y liderazgo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm md:text-base font-semibold border border-primary/30">
                    5x Campeones
                  </span>
                  <span className="px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm md:text-base font-semibold border border-accent/30">
                    10+ Medallas
                  </span>
                  <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm md:text-base font-semibold border border-muted-foreground/20">
                    Tradición desde 2004
                  </span>
                </div>
              </div>
              <Link to="/bauen" className="group">
                <Button 
                  size="lg" 
                  variant="hero" 
                  className="whitespace-nowrap text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  Ver Historial BAUEN
                  <Flag className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default Events;
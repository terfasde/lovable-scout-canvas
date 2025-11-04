import { useEffect, useState } from "react";
import { Calendar, MapPin, Flag, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getEventos } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      try {
        const rows = await getEventos().catch(() => []);
        if (rows && rows.length) {
          setEvents(rows.map((r: any) => ({
            title: r.title || r.nombre || 'Evento',
            date: r.fecha_inicio || r.date || '',
            location: r.location || '',
            participants: r.participants || '',
            type: r.type || '',
            status: r.status || '',
            color: r.color || 'primary',
          })));
        } else {
          // Fallback a contenido estático si no hay datos en DB
          setEvents([
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
          ]);
        }
      } catch (e: any) {
        toast({ title: 'Error', description: e?.message || 'No se pudieron cargar los eventos', variant: 'destructive' });
      }
    })();
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-3 sm:mb-4 shadow-sm">
            <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">Próximos Eventos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Vive la aventura con nosotros
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Participa en nuestras actividades, campamentos y eventos especiales 
            como el prestigioso BAUEN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="card-hover overflow-hidden border-2 hover:border-primary/50 transition-all duration-500"
            >
              <div className={`h-2 bg-gradient-to-r from-primary to-accent`}></div>
              <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary">
                    {event.type}
                  </span>
                  <span className="text-xs bg-accent/20 text-accent-foreground px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium whitespace-nowrap">
                    {event.status}
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl leading-tight">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="flex items-start text-muted-foreground group">
                  <Calendar className="w-4 h-4 mr-2 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs sm:text-sm leading-relaxed">{event.date}</span>
                </div>
                <div className="flex items-start text-muted-foreground group">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs sm:text-sm leading-relaxed">{event.location}</span>
                </div>
                <div className="flex items-start text-muted-foreground group">
                  <Users className="w-4 h-4 mr-2 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs sm:text-sm leading-relaxed">{event.participants}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* BAUEN Special Section */}
        <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/30 shadow-xl">
          <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="flex-1 space-y-4 sm:space-y-6">
                <div className="flex items-center">
                  <Flag className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mr-3 sm:mr-4 transition-transform duration-300 group-hover:-translate-y-0.5 flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                    BAUEN — Competencia Nacional
                  </h3>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  La competencia más importante del escultismo uruguayo. 
                  El Grupo Séptimo ha sido campeón en múltiples ocasiones, 
                  demostrando excelencia en habilidades scout, trabajo en equipo y liderazgo.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/20 text-primary rounded-full text-xs sm:text-sm md:text-base font-semibold border border-primary/30">
                    5x Campeones
                  </span>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/20 text-accent-foreground rounded-full text-xs sm:text-sm md:text-base font-semibold border border-accent/30">
                    10+ Medallas
                  </span>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm md:text-base font-semibold border border-muted-foreground/20">
                    Tradición desde 2004
                  </span>
                </div>
              </div>
              <Link to="/bauen" className="group w-full md:w-auto">
                <Button 
                  size="lg" 
                  variant="hero" 
                  className="w-full whitespace-nowrap text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  Ver Historial BAUEN
                  <Flag className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
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
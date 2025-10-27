import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Events = () => {
  const events = [{
    title: "Campamento de Verano 2025",
    date: "15-22 Enero, 2025",
    location: "Parque Nacional Santa Teresa",
    participants: "150 scouts",
    type: "Campamento",
    status: "Próximamente",
    color: "primary"
  }, {
    title: "BAUEN - Competencia Nacional",
    date: "5-7 Marzo, 2025",
    location: "Montevideo",
    participants: "200+ scouts",
    type: "Competencia",
    status: "Inscripciones Abiertas",
    color: "accent"
  }, {
    title: "Jornada de Servicio Comunitario",
    date: "20 Abril, 2025",
    location: "Barrio La Teja",
    participants: "80 scouts",
    type: "Servicio",
    status: "Confirmado",
    color: "primary"
  }];
  return <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">Próximos Eventos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Vive la aventura con nosotros
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Participa en nuestras actividades, campamentos y eventos especiales 
            como el prestigioso BAUEN.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {events.map((event, index) => <Card key={index} className="card-hover overflow-hidden">
              <div className={`h-2 bg-${event.color}`}></div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-primary">
                    {event.type}
                  </span>
                  <span className="text-xs bg-accent/20 text-accent-foreground px-3 py-1 rounded-full">
                    {event.status}
                  </span>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.participants}</span>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* BAUEN Special Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <Trophy className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl md:text-3xl font-bold">
                    BAUEN - El Desafío Scout
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  La competencia más importante del escultismo uruguayo. 
                  El Grupo Séptimo ha sido campeón en múltiples ocasiones, 
                  demostrando excelencia en habilidades scout, trabajo en equipo y liderazgo.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                    5x Campeones
                  </span>
                  <span className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm font-semibold">
                    10+ Medallas
                  </span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-semibold">Tradición desde 2003</span>
                </div>
              </div>
              <Button size="lg" variant="hero" className="whitespace-nowrap">
                Ver Historial BAUEN
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>;
};
export default Events;
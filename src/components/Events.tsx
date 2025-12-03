import { useEffect, useState } from "react";
import { Calendar, MapPin, Flag, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
          {events.map((event, index) => {
            // Helper para Google Calendar link

            import { Reveal } from "@/components/Reveal";
            import { Link } from "react-router-dom";

            // Recibe los eventos como prop o desde un hook/estado
            const events = [];

            function getGoogleCalendarUrl(event: any) {
              let start = "";
              let end = "";
              const months = {
                "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04", "Mayo": "05", "Junio": "06",
                "Julio": "07", "Agosto": "08", "Setiembre": "09", "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
              };
              let match = event.date.match(/(\d{1,2})-(\d{1,2})\s+(\w+),\s*(\d{4})/);
              if (match) {
                const year = match[4];
                const month = months[match[3]] || "01";
                start = `${year}${month}${match[1].padStart(2, "0")}T090000`;
                end = `${year}${month}${match[2].padStart(2, "0")}T170000`;
              } else {
                match = event.date.match(/(\d{1,2})\s+(\w+),\s*(\d{4})/);
                if (match) {
                  const year = match[3];
                  const month = months[match[2]] || "01";
                  start = `${year}${month}${match[1].padStart(2, "0")}T090000`;
                  end = `${year}${month}${match[1].padStart(2, "0")}T170000`;
                } else {
                  match = event.date.match(/(\w+)\s*(\d{4})/);
                  if (match) {
                    const year = match[2];
                    const month = months[match[1]] || "01";
                    start = `${year}${month}01T090000`;
                    end = `${year}${month}01T170000`;
                  } else {
                    start = "";
                    end = "";
                  }
                }
              }
              const base = "https://www.google.com/calendar/render?action=TEMPLATE";
              const params = [
                `text=${encodeURIComponent(event.title)}`,
                start && end ? `dates=${start}/${end}` : "",
                `details=${encodeURIComponent("Evento scout organizado por Grupo Séptimo")}`,
                `location=${encodeURIComponent(event.location)}`,
                `sf=true`,
                `output=xml`
              ].filter(Boolean);
              return `${base}&${params.join("&")}`;
            }

            const Events = () => {
              return (
                <section>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                    {events.map((event, index) => {
                      const fechaValida = event.date && event.date !== "A confirmar";
                      return (
                        <Reveal key={index}>
                          <Card className="card-hover overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 group h-full bg-gradient-to-br from-background via-background to-muted/20">
                            <div className="h-3 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x"></div>
                            <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                                  {event.type}
                                </span>
                                <span className="text-xs bg-gradient-to-r from-accent/30 to-accent/20 text-accent-foreground px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold whitespace-nowrap border border-accent/30">
                                  {event.status}
                                </span>
                              </div>
                              <CardTitle className="text-lg sm:text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors">
                                {event.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                              <div className="flex items-start text-muted-foreground group-hover:text-primary transition-colors">
                                <Calendar className="w-4 h-4 mr-2 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-xs sm:text-sm leading-relaxed">
                                  {event.date}
                                </span>
                              </div>
                              <div className="flex items-start text-muted-foreground group-hover:text-primary transition-colors">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-xs sm:text-sm leading-relaxed">
                                  {event.location}
                                </span>
                              </div>
                              <div className="flex items-start text-muted-foreground group-hover:text-primary transition-colors">
                                <Users className="w-4 h-4 mr-2 mt-0.5 sm:mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-xs sm:text-sm leading-relaxed">
                                  {event.participants}
                                </span>
                              </div>
                              {fechaValida && (
                                <div className="mt-4">
                                  <a
                                    href={getGoogleCalendarUrl(event)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button variant="secondary" size="sm">
                                      Añadir a Google Calendar
                                    </Button>
                                  </a>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </Reveal>
                      );
                    })}
                  </div>

                  {/* BAUEN Special Section */}
                  <Reveal>
                    <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/30 shadow-xl group">
                      <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                          <div className="flex-1 space-y-4 sm:space-y-6">
                            <div className="flex items-center">
                              <Flag className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mr-3 sm:mr-4 transition-transform duration-300 group-hover:-translate-y-0.5 flex-shrink-0" />
                              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                                BAUEN — Evento Scout Nacional
                              </h3>
                            </div>
                            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                              El evento más importante del escultismo uruguayo, creado por el Grupo Séptimo en 2004. Un desafío que reúne a grupos scouts de todo el país para compartir experiencias, desarrollar habilidades y fortalecer la hermandad scout.
                            </p>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/20 text-primary rounded-full text-xs sm:text-sm md:text-base font-semibold border border-primary/30 transition-transform duration-300 hover:scale-105">
                                Creado en 2004
                              </span>
                              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/20 text-accent-foreground rounded-full text-xs sm:text-sm md:text-base font-semibold border border-accent/30 transition-transform duration-300 hover:scale-105">
                                +300 Participantes
                              </span>
                              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm md:text-base font-semibold border border-muted-foreground/20 transition-transform duration-300 hover:scale-105">
                                Tradición Nacional
                              </span>
                            </div>
                          </div>
                          <Link to="/bauen" className="group w-full md:w-auto">
                            <Button
                              size="lg"
                              variant="hero"
                              className="w-full whitespace-nowrap text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            >
                              Conoce más sobre BAUEN
                              <Flag className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </section>
              );
            };

            export default Events;
                  color: "primary",

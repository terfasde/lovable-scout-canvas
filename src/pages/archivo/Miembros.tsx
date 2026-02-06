import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Users, FileText, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Miembros = () => {
  return (
    <div className="min-h-screen">
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 bg-gradient-to-b from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm">
                Archivo · Miembros y exmiembros
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Lista de miembros y exmiembros
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Esta sección se migrará con cuidado para respetar la privacidad y
              el consentimiento de las personas.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <ShieldAlert className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                        Migración con consentimiento
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        Antes de publicar datos personales, confirmamos la
                        autorización correspondiente. También podemos anonimizar
                        la información si es necesario.
                      </p>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        Estado: en revisión de privacidad
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                        Enviar listados
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        Si tenés listados históricos, enviálos y los organizamos
                        por secciones y años.
                      </p>
                      <Link to="/contacto">
                        <Button size="sm" className="gap-2">
                          <FileText className="w-4 h-4" />
                          Enviar material
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Miembros;

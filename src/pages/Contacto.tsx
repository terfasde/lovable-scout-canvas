import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Usa MapComponentEmbed si tienes problemas con billing de Google Cloud
// import MapComponent from "../components/MapComponentEmbed";
import MapComponent from "../components/MapComponentEmbed";

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Volteadores 1753 entre Av. Italia y Almirón, Montevideo, Uruguay",
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+598 098 138 668 (Pablo Silva, Jefe de Grupo)",
    },
    {
      icon: Mail,
      title: "Email",
      content: "scoutsseptimo7@gmail.com",
    },
    {
      icon: Clock,
      title: "Horarios",
      content: "Sábados 15:00h - 18:00h ",
    },
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm md:text-base">Contacto</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              ¿Quieres unirte al Séptimo?
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Estamos aquí para responder tus preguntas y ayudarte a formar parte 
              de nuestra comunidad scout.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Envíanos un mensaje</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Completa el formulario y nos pondremos en contacto contigo a la brevedad.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Nombre completo *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Juan Pérez"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="juan@ejemplo.com"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+598 99 123 456"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Mensaje *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={6}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  variant="hero" 
                  className="w-full text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <Mail className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Enviar Mensaje
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Información de contacto</h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  Encuentra toda la información para comunicarte con nosotros.
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="card-hover border-2 hover:border-primary/50 transition-all duration-500">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                          <info.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{info.title}</h3>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{info.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map */}
              <Card className="overflow-hidden shadow-xl border-2">
                <CardContent className="p-0">
                  <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                    <MapComponent />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer global en App.tsx */}
    </div>
  );
};

export default Contacto;

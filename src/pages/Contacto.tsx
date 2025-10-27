import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      content: "Av. 8 de Octubre 1234, Montevideo, Uruguay",
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+598 99 123 456",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contacto@septimo.scout.uy",
    },
    {
      icon: Clock,
      title: "Horarios",
      content: "Sábados 14:00 - 18:00",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Contacto</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ¿Quieres unirte al Séptimo?
            </h1>
            <p className="text-xl text-muted-foreground">
              Estamos aquí para responder tus preguntas y ayudarte a formar parte 
              de nuestra comunidad scout.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre completo *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="juan@ejemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+598 99 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" variant="hero" className="w-full">
                  Enviar Mensaje
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Información de contacto</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{info.title}</h3>
                          <p className="text-muted-foreground">{info.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Mapa de ubicación</p>
                    </div>
                  </div>
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

export default Contacto;

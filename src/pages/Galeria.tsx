import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Images, Users, Mountain, Award, Tent } from "lucide-react";
import heroScouts from "@/assets/hero-scouts.jpg";
import communityScouts from "@/assets/community-scouts.jpg";
import emblemImage from "@/assets/scout-emblem.jpg";

const Galeria = () => {
  const categories = [
    {
      icon: Mountain,
      title: "Campamentos",
      description: "Nuestras aventuras en la naturaleza",
    },
    {
      icon: Award,
      title: "BAUEN",
      description: "Momentos de nuestra competencia",
      count: "180+ fotos"
    },
    {
      icon: Users,
      title: "Actividades Grupales",
      description: "Reuniones y eventos especiales",
      count: "320+ fotos"
    },
    {
      icon: Tent,
      title: "Ceremonias",
      description: "Promesas, investiduras y celebraciones",
      count: "150+ fotos"
    }
  ];

  const featuredImages = [
    {
      src: heroScouts,
      title: "Campamento 2024",
      category: "Campamentos"
    },
    {
      src: communityScouts,
      title: "Actividad Comunitaria",
      category: "Servicio"
    },
    {
      src: emblemImage,
      title: "Nuestros Emblemas",
      category: "Historia"
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
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Nuestra Galería</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Momentos que Inspiran
            </h1>
            <p className="text-xl text-muted-foreground">
              61 años de historia capturados en imágenes. Cada foto cuenta una historia de aventura,
              amistad y crecimiento personal.
            </p>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explora por Categoría
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revive los mejores momentos de nuestras actividades organizadas por tema.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="card-hover cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground mb-2">{category.description}</p>
                    <div className="text-sm text-primary font-semibold">{category.count}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Featured Images Grid */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Destacadas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredImages.map((image, index) => (
                <Card key={index} className="card-hover overflow-hidden group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="text-xs font-semibold text-primary-foreground/80 mb-1">
                            {image.category}
                          </div>
                          <h3 className="text-lg font-bold">{image.title}</h3>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Próximamente */}
          <Card className="card-hover bg-muted/30">
            <CardContent className="p-12 text-center">
              <Images className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Galería Completa Próximamente</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Estamos digitalizando y organizando miles de fotografías que documentan nuestra rica historia.
                Pronto podrás explorar décadas de aventuras, campamentos y momentos inolvidables.
              </p>
              <Button size="lg" className="gap-2">
                <Camera className="w-5 h-5" />
                Notifícame cuando esté lista
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contribuir */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="card-hover">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">¿Tienes Fotos del Grupo?</h2>
                <p className="text-muted-foreground mb-6">
                  Si tienes fotografías de actividades, campamentos o eventos del Grupo Scout Séptimo de Montevideo,
                  nos encantaría que las compartieras con nosotros para completar nuestra galería histórica.
                </p>
                <Button variant="outline" size="lg">
                  Contactar para Compartir Fotos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galeria;

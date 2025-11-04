import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Hand, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-scouts.jpg";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseUser } from "@/App";
const Hero = () => {
  const { toast } = useToast();
  const { user } = useSupabaseUser();
  
  const handleJoinClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (user) {
      // Evita navegar a /auth si ya está logueado
      e.preventDefault();
      toast({
        title: "gracias por se parte de la pagina web oficial del Grupo scout septimo",
      });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Scouts del Séptimo en aventura" 
          className="w-full h-full object-cover scale-[1.02]" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-scout-black/75 via-scout-black/60 to-scout-black/35"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-scout-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-16">
        <div className="max-w-4xl">
          <div className="animate-fade-in space-y-8">
            {/* Main Title */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              <span className="text-primary block mb-2">Grupo Scout Séptimo</span>
              <span className="block text-white drop-shadow-lg">de Montevideo</span>
            </h1>
            
            {/* Description */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-2xl">
              Una comunidad de aventura, valores y formación integral para jóvenes. 
              Construimos un futuro mejor a través del escultismo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/auth" className="group" onClick={handleJoinClick}>
                <Button 
                  size="lg" 
                  variant="hero" 
                  className="text-lg w-full sm:w-auto transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  Registrate en nuestra web
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/historia" className="group">
                <Button 
                  size="lg" 
                  variant="heroSecondary" 
                  className="text-lg w-full sm:w-auto transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <Users className="mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Conoce Nuestra Historia
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
              <div className="group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">+61</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300 mt-1 sm:mt-2 font-medium">Años de historia</div>
              </div>
              <div className="group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent transition-transform duration-300 group-hover:scale-110">+100</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300 mt-1 sm:mt-2 font-medium">Scouts activos</div>
              </div>
              <div className="group col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  <span>1</span>
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300 mt-1 sm:mt-2 font-medium">Locales scouts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Desktop */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center transition-colors duration-300 hover:border-primary">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-xs text-white/60 font-medium">Descubre más</span>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="md:hidden pointer-events-none absolute bottom-20 right-4 z-10 animate-bounce">
        <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-primary/30">
          <Hand className="w-6 h-6 text-primary" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
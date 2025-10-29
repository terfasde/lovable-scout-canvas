import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-scouts.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Scouts del Séptimo en aventura" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-scout-black/80 via-scout-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-3xl">
          <div className="animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Desde 1964 formando líderes</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-primary"> Grupo Scout Séptimo
              <br /></span>
              <span> de Montevideo</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Una comunidad de aventura, valores y formación integral para jóvenes. 
              Construimos un futuro mejor a través del escultismo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" variant="hero" className="text-lg">
                  Únete al Grupo
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              
              <a href="#historia">
                <Button size="lg" variant="heroSecondary" className="text-lg">
                  <Users className="mr-2" />
                  Conoce Nuestra Historia
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">+61</div>
                <div className="text-sm text-gray-300 mt-1">Años de historia</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent">+100</div>
                <div className="text-sm text-gray-300 mt-1">Scouts activos</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>;
};
export default Hero;
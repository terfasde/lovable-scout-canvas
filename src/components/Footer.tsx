import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/grupo-scout-logo.png";

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  return (
    <footer className="bg-scout-black text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Grupo Scout Séptimo" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 hover:scale-110" 
              />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">Grupo Scout Séptimo</div>
                <div className="text-xs sm:text-sm text-gray-400">de Montevideo</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed max-w-md">
              Formando líderes comprometidos desde 1964. Una comunidad de aventura, valores y crecimiento personal.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com/gruposcoutseptimomontevideo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/grupo_scout_septimo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={scrollTop} 
                  className="text-sm sm:text-base hover:text-primary transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Inicio</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/linea-temporal" 
                  onClick={scrollTop} 
                  className="hover:text-primary transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Línea Temporal</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/historia" 
                  onClick={scrollTop} 
                  className="hover:text-primary transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Historia</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/bauen" 
                  onClick={scrollTop} 
                  className="hover:text-primary transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">BAUEN</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/eventos" 
                  onClick={scrollTop} 
                  className="hover:text-primary transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Eventos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/galeria" 
                  onClick={scrollTop} 
                  className="hover:text-primary transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Galería</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  onClick={scrollTop} 
                  className="hover:text-primary transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contacto</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contacto</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start group">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 sm:mt-1 text-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs sm:text-sm leading-relaxed">Volteadores 1753, Montevideo</span>
              </li>
              <li className="flex items-center group">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                <a href="tel:+59898138668" className="text-xs sm:text-sm hover:text-primary transition-colors">+598 098 138 668</a>
              </li>
              <li className="flex items-center group">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-1" />
                <a href="mailto:scoutsseptimo7@gmail.com" className="text-xs sm:text-sm hover:text-primary transition-colors break-all">scoutsseptimo7@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
            © 2025 Grupo Scout Séptimo de Montevideo. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <button className="hover:text-primary transition-colors duration-300">
              Política de Privacidad
            </button>
            <button className="hover:text-primary transition-colors duration-300">
              Términos y Condiciones
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;